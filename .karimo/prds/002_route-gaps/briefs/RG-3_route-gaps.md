# Task Brief: RG-3

**Title:** Blog index + slug pages
**PRD:** route-gaps
**Priority:** must
**Complexity:** 3/10
**Model:** sonnet
**Wave:** 2
**Feature Issue:** (see GitHub issue for route-gaps PRD)

---

## Objective

Create two new routes: `app/blog/page.tsx` (blog index using the existing `Blog7` block component) and `app/blog/[slug]/page.tsx` (stub article detail view). Both are static with hardcoded data — no Sanity CMS. The slug page must handle unknown slugs with `notFound()`.

---

## Context

**Parent Feature:** route-gaps PRD — "Stub Missing Sitemap Routes"

`/blog` is referenced from `Blog7Demo`'s "Explore all posts" button (fixed in RG-2 to `/blog`) and is in the sitemap. The existing `Blog7` block component at `components/blocks/blog7.tsx` renders a polished blog index card grid — the blog index page should use it directly with real href values.

The `[slug]` detail page is a stub: it renders a static article view for a handful of known slugs and calls `notFound()` for anything else.

This task is part of **Wave 2** — it can start after Wave 1 tasks are merged, but it has no hard dependency on any specific Wave 1 output (the Blog7Demo URL fix in RG-2 is a cosmetic improvement, not a blocker).

---

## Requirements

### New file: `app/blog/page.tsx`

- Server component (no `'use client'`)
- Export `metadata` with title `"Blog | Barbets Duet"`
- Hero section above the blog grid: eyebrow label, large serif heading, short description
- Use `KineticReveal` on the h1
- Use `ScrollGlow` ambient decoration
- Render `Blog7` block component (from `@/components/blocks/blog7`) with inline data — same 3 posts as `Blog7Demo` but with corrected `url` values (`/blog/post-1` etc.) and `buttonUrl: "/blog"`
- Include `CTA` section and `StickyFooter`

### New file: `app/blog/[slug]/page.tsx`

- Server component
- Export `generateMetadata` (async, reads `params.slug`)
- Static data object mapping known slugs to article data (same 3 posts as blog index)
- Call `notFound()` from `next/navigation` if slug not in the data map
- Render: hero image area, title, label/category badge, author + date, placeholder body text (2-3 paragraphs)
- Header and StickyFooter
- No CTA on article pages

### Known slugs (hardcoded data)

```typescript
const posts = {
  'post-1': {
    title: 'Restoring the Kenyan Highlands',
    label: 'Ecology',
    author: 'Jane Doe',
    published: '12 Oct 2024',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=1200&h=600',
    summary: 'Learn how our community-led initiatives are bringing back native flora and fauna to the Kenyan highlands, improving water retention and soil health.',
  },
  'post-2': {
    title: 'Sustainable Finance for Conservation',
    label: 'Finance',
    author: 'John Smith',
    published: '28 Sep 2024',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200&h=600',
    summary: 'A deep dive into how we use innovative financing models to support long-term ecosystem restoration projects around the globe.',
  },
  'post-3': {
    title: 'Community Growth in Action',
    label: 'Community',
    author: 'Alice Johnson',
    published: '15 Sep 2024',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200&h=600',
    summary: 'Meet the local leaders driving change in their communities. Their stories are a testament to the power of grassroots conservation efforts.',
  },
};
```

---

## Success Criteria

Complete ALL criteria before marking task done:

- [ ] `app/blog/page.tsx` exists and renders blog index at `/blog`
- [ ] `/blog` shows the Blog7 component with 3 post cards with working hrefs to `/blog/post-1` etc.
- [ ] `app/blog/[slug]/page.tsx` exists and renders article view at `/blog/post-1`
- [ ] `/blog/post-2` and `/blog/post-3` render correctly
- [ ] `/blog/unknown-slug` returns a 404 (Next.js not-found page)
- [ ] `generateMetadata` is implemented on the slug page (title reflects article title)
- [ ] `npx tsc --noEmit` passes
- [ ] No console errors

**All criteria must pass before task is complete.**

---

## Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `app/blog/page.tsx` | create | Blog index route — hero + Blog7 block |
| `app/blog/[slug]/page.tsx` | create | Blog article detail route — stub with notFound() |

### File Ownership Notes

No shared files modified. No conflict risk.

---

## Implementation Guidance

### Blog Index Page Pattern

Follow `app/stories/page.tsx` for the shell. The key difference is rendering `Blog7` as the content block rather than a custom grid.

```tsx
// app/blog/page.tsx
import { Metadata } from 'next';
import Header from '@/components/Header';
import { StickyFooter } from '@/components/ui/sticky-footer';
import CTA from '@/components/CTA';
import { KineticReveal } from '@/components/motion/KineticReveal';
import { ScrollGlow } from '@/components/motion/ScrollGlow';
import { Blog7 } from '@/components/blocks/blog7';

export const metadata: Metadata = {
  title: 'Blog | Barbets Duet',
  description: 'Latest articles on ecological restoration, sustainable finance, and community conservation from the Barbets Duet team.',
};

const blogData = {
  tagline: 'Latest Updates',
  heading: 'From the Field',
  description: 'Discover the latest news on ecological restoration, community successes, and sustainable finance from the Barbets Duet team.',
  buttonText: 'View all posts',
  buttonUrl: '/blog',
  posts: [/* 3 posts with /blog/post-1 etc. urls */],
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-accent-foreground overflow-x-hidden">
      <Header />
      <main className="relative">
        <ScrollGlow top="5%" right="-10%" opacity={0.15} size={1200} />

        {/* Hero */}
        <section className="pt-48 pb-16 px-6">
          <div className="max-w-[1600px] mx-auto">
            <div className="max-w-4xl">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-accent mb-8 block">
                Barbets Dispatch
              </span>
              <KineticReveal>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold leading-[0.85] tracking-tighter mb-12">
                  Field <br /> Notes
                </h1>
              </KineticReveal>
            </div>
          </div>
        </section>

        {/* Blog7 block */}
        <Blog7 {...blogData} />
      </main>
      <CTA />
      <StickyFooter />
    </div>
  );
}
```

### Slug Page Pattern

```tsx
// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Header from '@/components/Header';
import { StickyFooter } from '@/components/ui/sticky-footer';

const posts = { /* ... data map above ... */ };

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug as keyof typeof posts];
  if (!post) return { title: 'Post Not Found | Barbets Duet' };
  return {
    title: `${post.title} | Barbets Duet Blog`,
    description: post.summary,
  };
}

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = posts[slug as keyof typeof posts];
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      <Header />
      <main>
        {/* Hero image */}
        {/* Article content */}
      </main>
      <StickyFooter />
    </div>
  );
}
```

### Code Style

- Next.js 15 App Router, TypeScript strict
- `params` is a `Promise` in Next.js 15 — always `await params` before destructuring
- Tailwind v4 — use CSS variable tokens
- `notFound()` is called as a function, not thrown

### Edge Cases

- `notFound()` must be called when slug is not in the data map — do not render an empty page
- `params` in Next.js 15 App Router is a Promise — use `await params` (see pattern above)
- The `Blog7` component is a client component internally — the page can remain a server component

---

## Boundaries

### Files You MUST NOT Touch

- `.env*`
- `firebase-applet-config.json`
- `firestore.rules`
- `package-lock.json`
- `.next/`
- `node_modules/`
- `next-env.d.ts`
- `components/Blog7Demo.tsx` (modified in RG-2)
- `components/Header.tsx` (modified in RG-2)

### Files Requiring Review

None touched by this task.

---

## Dependencies

### Upstream Tasks

| Task | What It Provides | Verify Before Starting |
|------|------------------|------------------------|
| RG-2 | Updates Blog7Demo URLs to /blog/post-* | Not a hard blocker — RG-3 can proceed independently. RG-2's Blog7Demo change is cosmetic. |

### Downstream Impact

None — no tasks depend on RG-3.

---

## GitHub Context

**Branch:** `feature/barbets-duet-full-build`
**Brief:** `.karimo/prds/002_route-gaps/briefs/RG-3_route-gaps.md`

---

## Commit Guidelines

```
feat(blog): add /blog index and /blog/[slug] stub pages

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Validation Checklist

Before marking complete:
- [ ] All success criteria met
- [ ] Type check passes: `npx tsc --noEmit`
- [ ] No `never_touch` files modified
- [ ] `/blog` renders in browser
- [ ] `/blog/post-1` renders in browser
- [ ] `/blog/unknown-slug` shows 404 page

---

*Generated by KARIMO Brief Writer*
*PRD: route-gaps | Task: RG-3 | Wave: 2*
