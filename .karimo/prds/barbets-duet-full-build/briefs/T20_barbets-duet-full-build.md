# Task Brief: T20

**Title:** GROQ queries + next-sanity integration
**PRD:** barbets-duet-full-build
**Priority:** must
**Complexity:** 4/10
**Wave:** 5

---

## Objective

Replace `lib/data/*.ts` static imports with GROQ queries via `next-sanity`. All pages that currently read from the static data layer should fetch from Sanity instead, while maintaining exact TypeScript type compatibility and implementing fetch cache tags for on-demand revalidation (T21).

---

## Context

**Parent Feature:** Barbets Duet — Full Platform Build

After Studio setup (T19) and content seeding, the Next.js app must query Sanity instead of reading static files. `next-sanity` provides a `createClient` wrapper compatible with React Server Components and Next.js `fetch` caching. Cache tags are set per content type so that T21's webhook-triggered `revalidateTag()` calls clear only the relevant cache.

The migration must be zero-regression: every page that worked before must continue to work, and TypeScript types must be maintained throughout.

This task is **Wave 5** — depends on T19 (Studio must be running with content).

---

## Requirements

1. Create `lib/sanity/client.ts` — Sanity client for server-side queries
2. Create `lib/sanity/queries.ts` — all GROQ query strings with TypeScript return types
3. Update `app/learning-sites/[slug]/page.tsx` to use Sanity query
4. Update `app/stories/[slug]/page.tsx` to use Sanity query
5. Update `app/events/[slug]/page.tsx` to use Sanity query
6. Update `app/learning-sites/page.tsx` to fetch all sites from Sanity
7. Implement `next: { tags: ['learningSite', ...] }` fetch options on all queries
8. Keep `lib/data/*.ts` as read-only fallbacks until confident Sanity data is complete

---

## Success Criteria

Complete ALL criteria before marking task done:

- [ ] `lib/sanity/client.ts` exports a configured Sanity client
- [ ] `lib/sanity/queries.ts` contains GROQ queries for all content types
- [ ] Learning sites detail pages fetch from Sanity (verify via `console.log` or Network tab)
- [ ] Stories detail pages fetch from Sanity
- [ ] Events detail pages fetch from Sanity
- [ ] All fetch calls include cache tags (`'learningSite'`, `'story'`, `'event'`)
- [ ] TypeScript types maintained — no `any` in query return types
- [ ] No regression: existing pages still work
- [ ] `npx tsc --noEmit` passes

---

## Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `lib/sanity/client.ts` | create | Sanity client for server queries |
| `lib/sanity/queries.ts` | create | All GROQ query strings |
| `app/learning-sites/[slug]/page.tsx` | modify | Fetch site from Sanity instead of lib/data |
| `app/learning-sites/page.tsx` | modify | Fetch all sites from Sanity |
| `app/stories/[slug]/page.tsx` | modify | Fetch story from Sanity |
| `app/events/[slug]/page.tsx` | modify | Fetch event from Sanity |

---

## Implementation Guidance

### Sanity Client

```typescript
// lib/sanity/client.ts
import { createClient } from 'next-sanity';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
});
```

### GROQ Queries

```typescript
// lib/sanity/queries.ts
import type { LearningSite } from '@/types/learning-site';
import type { Story, BarbetsEvent } from '@/types/narrative';
import { sanityClient } from './client';

// Fetch a single learning site by slug
export async function getLearningSiteFromSanity(slug: string): Promise<LearningSite | null> {
  return sanityClient.fetch<LearningSite | null>(
    `*[_type == "learningSite" && slug.current == $slug][0]{
      ...,
      "slug": slug.current,
      "heroImage": heroImage.asset->url,
      "gallery": gallery[].asset->url,
      "relatedSitesSlugs": relatedSites[]->slug.current
    }`,
    { slug },
    { next: { tags: ['learningSite', `learningSite:${slug}`] } }
  );
}

// Fetch all learning sites
export async function getAllLearningSites(): Promise<LearningSite[]> {
  return sanityClient.fetch<LearningSite[]>(
    `*[_type == "learningSite"] | order(name asc) {
      ...,
      "slug": slug.current,
      "heroImage": heroImage.asset->url
    }`,
    {},
    { next: { tags: ['learningSite'] } }
  );
}

// Fetch a single story
export async function getStoryFromSanity(slug: string): Promise<Story | null> {
  return sanityClient.fetch<Story | null>(
    `*[_type == "story" && slug.current == $slug][0]{
      ...,
      "slug": slug.current,
      "siteSlug": associatedSite->slug.current
    }`,
    { slug },
    { next: { tags: ['story', `story:${slug}`] } }
  );
}
```

### Updated Page Pattern

```tsx
// app/learning-sites/[slug]/page.tsx — updated version
import { getLearningSiteFromSanity } from '@/lib/sanity/queries';
import { learningSites, getLearningSite } from '@/lib/data/learning-sites'; // fallback

export async function generateStaticParams() {
  // Can still use static data for build-time params, or fetch from Sanity
  return learningSites.map(site => ({ slug: site.slug }));
}

export default async function LearningSitePage({ params }: PageProps) {
  const { slug } = await params;

  // Try Sanity first, fallback to static data
  const site = await getLearningSiteFromSanity(slug)
    ?? getLearningSite(slug);

  if (!site) { notFound(); }

  return <LearningSiteContent site={site} />;
}
```

### Cache Tags Strategy

| Content Type | Tag Used | Revalidated By |
|---|---|---|
| All learning sites | `'learningSite'` | Any site publish in Studio |
| Single site | `'learningSite:${slug}'` | That specific site publish |
| All stories | `'story'` | Any story publish |
| All events | `'event'` | Any event publish |

These tags are used by T21's `revalidateTag()` calls.

### Fallback Pattern During Migration

Keep `lib/data/*.ts` imports available as fallbacks:
```typescript
const site = await getLearningSiteFromSanity(slug) ?? getLearningSite(slug);
```
This ensures zero downtime if Sanity is temporarily unavailable or content is missing.

### TypeScript Return Types

GROQ projections must produce objects that satisfy the TypeScript types. The projection in `getLearningSiteFromSanity` must include all required fields. Test with `tsc --noEmit` to catch type mismatches early.

For Portable Text content (Story.content):
```typescript
// Story.content becomes PortableTextBlock[] in Sanity
// Update types/narrative.ts if needed:
import type { PortableTextBlock } from '@portabletext/types';
export interface Story {
  // ...
  content: string | PortableTextBlock[];  // support both static and Sanity
}
```

---

## Boundaries

### Files You MUST NOT Touch

- `.env*`, `firebase-applet-config.json`, `firestore.rules`
- `types/learning-site.ts` — frozen
- `components/ui/`
- `lib/data/*.ts` — keep as fallbacks, don't delete

---

## Dependencies

### Upstream Tasks

| Task | What It Provides | Verify Before Starting |
|------|------------------|------------------------|
| T19 | Sanity Studio with seed content | Sanity project ID + content available; Studio loads at /studio |

### Downstream Impact

T21 (revalidation) depends on the cache tags defined here. T24–T27 (Wave 6 greenfield) will use the same query patterns.

---

## Commit Guidelines

```
feat(sanity): replace lib/data imports with GROQ queries via next-sanity

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Validation Checklist

- [ ] All success criteria met
- [ ] `npx tsc --noEmit` passes
- [ ] `npm run build` passes
- [ ] Learning site detail page shows Sanity content (modify in Studio, verify on page)
- [ ] Stories page shows Sanity content
- [ ] No 404 regressions on existing routes

---

*Generated by KARIMO Brief Writer*
*PRD: barbets-duet-full-build | Task: T20 | Wave: 5*
