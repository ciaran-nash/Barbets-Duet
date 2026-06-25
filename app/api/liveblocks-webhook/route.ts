// ============================================================
// Liveblocks Webhook Handler — Wave 6, Task D3
// ============================================================
// POST /api/liveblocks-webhook
// Receives Liveblocks events and writes Supabase notifications.
// Events handled:
//   - roomEvent (custom: new-post, te-submitted)
// Configure in Liveblocks dashboard:
//   Webhook URL: https://{domain}/api/liveblocks-webhook
//   Events: roomEvent
// ============================================================

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { WebhookHandler } from '@liveblocks/node';
import { createClient } from '@supabase/supabase-js';

// Service-role client for writing notifications (bypasses RLS)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  const rawBody = await request.text();

  // Liveblocks signs webhooks with a dedicated signing secret (svix-style),
  // distinct from LIVEBLOCKS_SECRET_KEY. Constructed lazily so a missing secret
  // does not break the build.
  const secret = process.env.LIVEBLOCKS_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 501 });
  }
  const webhookHandler = new WebhookHandler(secret);

  // Verify webhook signature (svix-style headers from Liveblocks)
  try {
    webhookHandler.verifyRequest({
      headers: {
        'webhook-id': request.headers.get('webhook-id') ?? '',
        'webhook-timestamp': request.headers.get('webhook-timestamp') ?? '',
        'webhook-signature': request.headers.get('webhook-signature') ?? '',
      },
      rawBody,
    });
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  let event: {
    type: string;
    data?: {
      roomId?: string;
      event?: {
        type?: string;
        recipientId?: string;
        title?: string;
        body?: string;
        link?: string;
        notificationType?: string;
      };
    };
  };

  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // Handle room-level custom events
  if (event.type === 'roomEvent' && event.data?.event) {
    const { event: roomEvent, roomId } = event.data;
    const notifType = roomEvent.notificationType ?? roomEvent.type;
    const recipientId = roomEvent.recipientId;

    if (
      recipientId &&
      notifType &&
      ['new_forum_post', 'new_te_submission', 'peer_review_due', 'te_approved', 'te_rejected'].includes(notifType)
    ) {
      const { error } = await supabaseAdmin.from('notifications').insert({
        user_id: recipientId,
        type: notifType,
        title: roomEvent.title ?? 'New notification',
        body: roomEvent.body ?? null,
        link: roomEvent.link ?? null,
      });

      if (error) {
        console.error('[liveblocks-webhook] notification insert error:', error.message);
      }
    }
  }

  return NextResponse.json({ ok: true });
}
