// ============================================================
// POST /api/community/submit-contribution
// Wave 6, Task C2
// ============================================================
// Creates a draft trialAndError document in Sanity.
// Requires authenticated Supabase session.
// Returns: { docId, slug }
// ============================================================

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient as createSanityClient } from '@sanity/client';
import { getServerUser } from '@/lib/supabase-server';

const sanityAdmin = createSanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  token: process.env.SANITY_WRITE_TOKEN,  // Write token — server-side only
  apiVersion: '2024-01-01',
  useCdn: false,
});

function toBlocks(text: string) {
  return [
    {
      _type: 'block',
      _key: Math.random().toString(36).slice(2),
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: Math.random().toString(36).slice(2),
          text,
          marks: [],
        },
      ],
      markDefs: [],
    },
  ];
}

export async function POST(request: NextRequest) {
  // Auth check
  const user = await getServerUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: {
    title?: string;
    siteSlug?: string;
    authorMemberSlug?: string;
    prompt1?: string;
    prompt2?: string;
    prompt3?: string;
    prompt4?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { title, siteSlug, prompt1, prompt2, prompt3, prompt4 } = body;

  if (!prompt1 || !prompt2 || !prompt3 || !prompt4) {
    return NextResponse.json(
      { error: 'All 4 prompts are required.' },
      { status: 422 }
    );
  }

  if (!siteSlug) {
    return NextResponse.json({ error: 'siteSlug is required.' }, { status: 422 });
  }

  // Build slug from title or user ID + timestamp
  const slugBase = title
    ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 64)
    : `te-${user.id.slice(0, 8)}-${Date.now()}`;

  try {
    const doc = await sanityAdmin.create({
      _type: 'trialAndError',
      title: title ?? `Trial & Error — ${new Date().toLocaleDateString('en-GB')}`,
      slug: { _type: 'slug', current: slugBase },
      siteSlug,
      authorMemberSlug: user.id,
      prompt1: toBlocks(prompt1),
      prompt2: toBlocks(prompt2),
      prompt3: toBlocks(prompt3),
      prompt4: toBlocks(prompt4),
      status: 'pending_review',
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({ docId: doc._id, slug: slugBase }, { status: 201 });
  } catch (err) {
    console.error('[submit-contribution] Sanity error:', err);
    return NextResponse.json(
      { error: 'Failed to create Sanity document.' },
      { status: 500 }
    );
  }
}
