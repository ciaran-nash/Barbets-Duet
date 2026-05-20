# Task Brief: T21

**Title:** On-demand revalidation via Sanity webhooks
**PRD:** barbets-duet-full-build
**Priority:** must
**Complexity:** 3/10
**Wave:** 5

---

## Objective

Configure a Sanity webhook that fires on document publish events. Build a Next.js API route that receives the webhook, validates it with a shared secret, and calls `revalidateTag()` to clear the appropriate Next.js cache — resulting in live site updates within 5 seconds of a staff member publishing in Sanity Studio.

---

## Context

**Parent Feature:** Barbets Duet — Full Platform Build

When a non-dev Barbets Duet staff member publishes a learning site update in Sanity Studio, the live website should update immediately. Without revalidation, Next.js caches fetch responses indefinitely (or until the next deployment). `revalidateTag()` + Sanity webhooks provides instant invalidation.

The webhook fires on Sanity's `publish` event for each document type. The API route maps document types to cache tags (defined in T20) and calls `revalidateTag()` for each.

This task is **Wave 5** — depends on T20 (cache tags must be defined in queries).

---

## Requirements

1. Create `app/api/revalidate/route.ts` — webhook receiver
2. Validate webhook secret (`SANITY_WEBHOOK_SECRET`)
3. Map Sanity document `_type` to Next.js cache tags
4. Call `revalidateTag()` for the affected content type
5. Configure the Sanity webhook in the Sanity dashboard to point to the deployed `/api/revalidate` URL
6. Return 200 OK on success

---

## Success Criteria

Complete ALL criteria before marking task done:

- [ ] `app/api/revalidate/route.ts` created
- [ ] Webhook secret validated — unauthorized requests return 401
- [ ] Publishing a LearningSite in Studio triggers revalidation of `'learningSite'` tag
- [ ] Publishing a Story triggers revalidation of `'story'` tag
- [ ] Live site updates within 5 seconds of Sanity publish
- [ ] `SANITY_WEBHOOK_SECRET` documented in `.env.local.example`
- [ ] `npx tsc --noEmit` passes

---

## Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `app/api/revalidate/route.ts` | create | Sanity webhook receiver + revalidation |
| `.env.local.example` | modify | Document `SANITY_WEBHOOK_SECRET` |

---

## Implementation Guidance

### Webhook Handler

```typescript
// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

const TYPE_TO_TAG_MAP: Record<string, string[]> = {
  learningSite: ['learningSite'],
  story: ['story'],
  event: ['event'],
  project: ['project'],
  teamMember: ['teamMember'],
};

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-webhook-secret');

  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { _type, slug } = body;

    const tags = TYPE_TO_TAG_MAP[_type];
    if (!tags) {
      return NextResponse.json({ message: `Unknown type: ${_type}` }, { status: 200 });
    }

    for (const tag of tags) {
      revalidateTag(tag);
    }

    // Also revalidate the specific document tag if slug is available
    if (slug?.current) {
      revalidateTag(`${_type}:${slug.current}`);
    }

    return NextResponse.json({
      revalidated: true,
      tags,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 });
  }
}
```

### Sanity Webhook Configuration

In the Sanity dashboard:
1. Go to API → Webhooks → New Webhook
2. Name: "Next.js Revalidation"
3. URL: `https://barbetsduet.org/api/revalidate`
4. Dataset: production
5. Trigger on: Create, Update, Delete
6. HTTP method: POST
7. Secret: generate a strong random string → store in `SANITY_WEBHOOK_SECRET`
8. HTTP headers: `x-webhook-secret: [your-secret]`

### Webhook Secret Generation

```bash
# Generate a secure random secret:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Testing the Webhook Locally

Use `ngrok` or `localtunnel` to expose `localhost:3000` for webhook testing:
```bash
npx localtunnel --port 3000
# Update webhook URL temporarily to the tunnel URL
```

Or test manually:
```bash
curl -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -H "x-webhook-secret: your-secret" \
  -d '{"_type": "learningSite", "slug": {"current": "msichoke-seaweed-growers"}}'
```

---

## Boundaries

### Files You MUST NOT Touch

- `.env*` actual files
- `firebase-applet-config.json`, `firestore.rules`
- `components/ui/`

---

## Dependencies

### Upstream Tasks

| Task | What It Provides | Verify Before Starting |
|------|------------------|------------------------|
| T20 | Cache tags defined in GROQ queries | Confirm tags like `'learningSite'` are set in `fetch()` options |

### Downstream Impact

None — this is the final step in the Sanity pipeline.

---

## Commit Guidelines

```
feat(sanity): add on-demand revalidation webhook handler

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Validation Checklist

- [ ] All success criteria met
- [ ] `npx tsc --noEmit` passes
- [ ] Unauthorized POST to `/api/revalidate` returns 401
- [ ] Authorized POST with `_type: 'learningSite'` returns 200 with revalidated tags
- [ ] Publish a site in Studio → page updates within 5 seconds

---

*Generated by KARIMO Brief Writer*
*PRD: barbets-duet-full-build | Task: T21 | Wave: 5*
