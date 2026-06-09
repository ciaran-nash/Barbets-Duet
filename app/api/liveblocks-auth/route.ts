// ============================================================
// Liveblocks Auth Endpoint — Wave 6, Task C2 / D1
// ============================================================
// POST /api/liveblocks-auth
// Validates Supabase session and issues a Liveblocks token
// scoped to the requested room. Used by all Liveblocks rooms:
//   - te-draft-{uid}-{timestamp}    (T&E collaborative drafting)
//   - forum-{siteSlug}-{threadId}   (site forum threads)
//   - community-{siteSlug}          (site presence layer)
// ============================================================

import { Liveblocks } from '@liveblocks/node';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getServerUser, getServerProfile } from '@/lib/supabase-server';

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(request: NextRequest) {
  // Verify Supabase session
  const user = await getServerUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const profile = await getServerProfile();
  const displayName = profile?.display_name ?? user.email ?? 'Anonymous';
  const avatarUrl =
    profile?.avatar_url ??
    `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(displayName)}`;

  // Parse room ID from request body
  let roomId: string;
  try {
    const body = await request.json();
    roomId = body.room as string;
    if (!roomId || typeof roomId !== 'string') {
      return NextResponse.json({ error: 'Missing room ID' }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  // Validate room naming convention (security: prevent cross-room access)
  const isAllowed =
    roomId.startsWith(`te-draft-${user.id}`) ||      // own T&E draft room
    roomId.startsWith('te-draft-collab-') ||          // invited collaborator room
    roomId.startsWith('forum-') ||                    // any forum room (auth checked)
    roomId.startsWith('community-') ||                // site presence rooms
    roomId.startsWith('governance-');                 // governance presence

  if (!isAllowed) {
    return NextResponse.json({ error: 'Room access denied' }, { status: 403 });
  }

  // Issue Liveblocks session token
  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name: displayName,
      avatar: avatarUrl,
      role: profile?.role ?? 'local_community',
      email: user.email ?? '',
    },
  });

  // Grant access to the requested room
  session.allow(roomId, session.FULL_ACCESS);

  const { status, body } = await session.authorize();
  return new NextResponse(body, { status });
}
