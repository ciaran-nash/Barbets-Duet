/**
 * Sanity webhook receiver — on-demand revalidation
 *
 * Called by Sanity when content is published. Validates the webhook secret
 * and calls revalidateTag() to clear the Next.js fetch cache for the
 * affected content type, resulting in live site updates within seconds.
 *
 * SETUP:
 * 1. Generate a secret: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
 * 2. Add to .env.local: SANITY_WEBHOOK_SECRET=<your-secret>
 * 3. In Sanity Dashboard → API → Webhooks:
 *    - URL: https://barbetsduet.org/api/revalidate
 *    - Trigger: Create, Update, Delete (all document types)
 *    - HTTP Headers: x-webhook-secret: <your-secret>
 *
 * TESTING (local, with ngrok or localtunnel):
 *   curl -X POST http://localhost:3000/api/revalidate \
 *     -H "Content-Type: application/json" \
 *     -H "x-webhook-secret: your-secret" \
 *     -d '{"_type": "learningSite", "slug": {"current": "msichoke-seaweed-growers"}}'
 */
import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

/**
 * Maps Sanity document types to Next.js cache tags (as defined in lib/sanity/queries.ts).
 * When a document of a given type is published, all listed tags are revalidated.
 */
const TYPE_TO_TAGS: Record<string, string[]> = {
  learningSite: ['learningSite'],
  story: ['story'],
  barbetsEvent: ['event'],
  project: ['project'],
  teamMember: ['teamMember'],
  blogPost: ['blogPost'],
  newsItem: ['newsItem'],
};

export async function POST(request: NextRequest) {
  // 1. Validate webhook secret
  const secret = request.headers.get('x-webhook-secret');

  if (!process.env.SANITY_WEBHOOK_SECRET) {
    console.error('[revalidate] SANITY_WEBHOOK_SECRET not configured');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. Parse the webhook payload
  let body: { _type?: string; slug?: { current?: string } };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  const { _type, slug } = body;

  if (!_type) {
    return NextResponse.json({ error: 'Missing _type in payload' }, { status: 400 });
  }

  // 3. Map type to cache tags
  const tags = TYPE_TO_TAGS[_type];

  if (!tags) {
    // Unknown document type — not an error, just nothing to revalidate
    return NextResponse.json({
      revalidated: false,
      message: `No cache tags mapped for type: ${_type}`,
    });
  }

  // 4. Revalidate all tags for this content type
  const revalidatedTags: string[] = [];

  for (const tag of tags) {
    revalidateTag(tag, 'max');
    revalidatedTags.push(tag);
  }

  // 5. Also revalidate the per-document tag if slug is present
  if (slug?.current) {
    // Map Sanity type to tag prefix
    const tagPrefix = _type === 'barbetsEvent' ? 'event' : _type;
    const specificTag = `${tagPrefix}:${slug.current}`;
    revalidateTag(specificTag, 'max');
    revalidatedTags.push(specificTag);
  }

  console.log(`[revalidate] Revalidated tags: ${revalidatedTags.join(', ')}`);

  return NextResponse.json({
    revalidated: true,
    tags: revalidatedTags,
    timestamp: new Date().toISOString(),
  });
}
