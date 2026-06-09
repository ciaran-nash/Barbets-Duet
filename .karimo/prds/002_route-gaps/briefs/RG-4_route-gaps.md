# Task Brief: RG-4

**Title:** News index + slug pages
**PRD:** route-gaps
**Priority:** must
**Complexity:** 3/10
**Model:** sonnet
**Wave:** 2
**Feature Issue:** (see GitHub issue for route-gaps PRD)

---

## Objective

Create two new routes: `app/news/page.tsx` (news/announcements index with a hero section and placeholder card grid) and `app/news/[slug]/page.tsx` (stub news item detail view). Both are static with hardcoded data — no Sanity CMS. The slug page must handle unknown slugs with `notFound()`. Structure is parallel to the blog routes (RG-3).

---

## Context

**Parent Feature:** route-gaps PRD — "Stub Missing Sitemap Routes"

`/news` is a sitemap route that does not yet exist. The pattern is identical to the blog — a hero section, a card grid with 3-4 placeholder items, and a detail page. Unlike blog, there is no existing block component for news — use a custom card grid following the same visual language as `app/stories/page.tsx`.

This task is part of **Wave 2** — no hard dependencies on Wave 1 outputs. Can be executed in parallel with RG-3, RG-5.

---

## Requirements

### New file: `app/news/page.tsx`

- Server component (no `'use client'`)
- Export `metadata` with title `"News | Barbets Duet"`
- Hero section: eyebrow label, large serif heading, short description
- Use `KineticReveal` on the h1
- Use `ScrollGlow` ambient decoration
- News card grid: 3-4 hardcoded placeholder items (see data below)
- Cards show: title, date, category label, summary excerpt
- Include `CTA` and `StickyFooter`

### New file: `app/news/[slug]/page.tsx`

- Server component
- Export `generateMetadata` (async, reads `params.slug`)
- Static data map of known slugs
- Call `notFound()` for unknown slugs
- Render: headline, date, category, author (if available), body text (2-3 paragraphs placeholder)
- Header and StickyFooter (no CTA on detail pages)

### Placeholder news items (hardcoded data)

```typescript
const newsItems = {
  'global-summit-2025': {
    title: 'Barbets Duet Announces Global Restoration Summit 2025',
    label: 'Announcements',
    date: '3 Mar 2025',
    author: 'Barbets Duet Team',
    summary: 'We are convening conservation scientists, community leaders, and policy makers for a landmark summit on accelerating ecosystem restoration at scale.',
  },
  'new-partnership-nairobi': {
    title: 'New Partnership Expands Nairobi Reforestation Programme',
    label: 'Partnerships',
    date: '18 Jan 2025',
    author: 'Barbets Duet Team',
    summary: 'A new three-year partnership with local Kenyan NGOs will extend our community-led reforestation work to cover an additional 50,000 hectares of degraded land.',
  },
  'impact-report-2024': {
    title: '2024 Impact Report: Metrics from Across the Network',
    label: 'Reports',
    date: '10 Dec 2024',
    author: 'Research Team',
    summary: 'Our annual impact report captures measurable outcomes across all 12 active learning sites — species recovery, community income, and carbon sequestration data.',
  },
};
```

---

## Success Criteria

Complete ALL criteria before marking task done:

- [ ] `app/news/page.tsx` exists and renders news index at `/news` without 404
- [ ] `/news` shows a grid with at least 3 placeholder news items
- [ ] `app/news/[slug]/page.tsx` exists and renders at `/news/global-summit-2025`
- [ ] `/news/new-partnership-nairobi` and `/news/impact-report-2024` render correctly
- [ ] `/news/unknown-slug` returns 404
- [ ] `generateMetadata` is implemented on the slug page
- [ ] `npx tsc --noEmit` passes
- [ ] No console errors

**All criteria must pass before task is complete.**

---

## Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `app/news/page.tsx` | create | News index route — hero + card grid |
| `app/news/[slug]/page.tsx` | create | News detail route — stub with notFound() |

### File Ownership Notes

No shared files modified. No conflict risk with other wave-2 tasks.

---

## Implementation Guidance

### Page Shell Pattern

Follow `app/stories/page.tsx` and `app/events/page.tsx` exactly. Both use the same wrapper:

```tsx
<div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-accent-foreground overflow-x-hidden">
  <Header />
  <main className="relative">
    <ScrollGlow ... />
    {/* hero section */}
    {/* content section */}
  </main>
  <CTA />
  <StickyFooter />
</div>
```

### News Card Grid

No existing block component for news — build a simple inline grid. Use `shadcn/ui` Card primitives if available, or plain `div` with Tailwind classes matching the site's card style.

Suggested card layout:
- 3-column grid on desktop, 1 column on mobile
- Card: category badge (top), title (serif), date (mono small), summary (muted), "Read more →" link

```tsx
<section className="pb-48 px-6">
  <div className="max-w-[1600px] mx-auto grid md:grid-cols-3 gap-8">
    {Object.entries(newsItems).map(([slug, item]) => (
      <article key={slug} className="border border-border rounded-2xl p-8 flex flex-col gap-4">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent">
          {item.label}
        </span>
        <h2 className="text-2xl font-serif font-bold leading-tight">{item.title}</h2>
        <p className="text-sm font-mono text-muted-foreground">{item.date}</p>
        <p className="text-muted-foreground leading-relaxed flex-1">{item.summary}</p>
        <a href={`/news/${slug}`} className="text-sm font-mono text-accent hover:underline">
          Read more →
        </a>
      </article>
    ))}
  </div>
</section>
```

### Slug Page Pattern

```tsx
// app/news/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Header from '@/components/Header';
import { StickyFooter } from '@/components/ui/sticky-footer';

const newsItems = { /* ... data map above ... */ };

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const item = newsItems[slug as keyof typeof newsItems];
  if (!item) return { title: 'Not Found | Barbets Duet' };
  return {
    title: `${item.title} | Barbets Duet News`,
    description: item.summary,
  };
}

export default async function NewsItemPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const item = newsItems[slug as keyof typeof newsItems];
  if (!item) notFound();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      <Header />
      <main className="pt-48 pb-32 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent mb-6 block">
            {item.label}
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-6">
            {item.title}
          </h1>
          <p className="text-sm font-mono text-muted-foreground mb-12">
            {item.date} · {item.author}
          </p>
          <div className="prose prose-lg max-w-none text-foreground">
            <p>{item.summary}</p>
            <p>
              {/* Placeholder body */}
              This article is a placeholder. Full content will be added once the Sanity CMS
              integration is complete. Check back for the full story.
            </p>
          </div>
        </div>
      </main>
      <StickyFooter />
    </div>
  );
}
```

### Code Style

- Next.js 15 App Router, TypeScript strict
- `params` is a `Promise` in Next.js 15 — always `await params`
- Tailwind v4 — use CSS variable tokens (`bg-background`, `text-foreground`, `text-muted-foreground`, `text-accent`, `border-border`)
- `notFound()` is called as a function and halts rendering (no return needed after it)
- Keep data co-located in the page files for now (no separate lib file needed)

### Edge Cases

- `notFound()` must be called — do not render an empty/broken page for unknown slugs
- `params` Promise pattern is mandatory for Next.js 15 (differs from Next.js 13/14)

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

### Files Requiring Review

None touched by this task.

---

## Dependencies

### Upstream Tasks

None — Wave 2 tasks have no hard dependency on specific Wave 1 outputs for this task.

### Downstream Impact

None — no tasks depend on RG-4.

---

## GitHub Context

**Branch:** `feature/barbets-duet-full-build`
**Brief:** `.karimo/prds/002_route-gaps/briefs/RG-4_route-gaps.md`

---

## Commit Guidelines

```
feat(news): add /news index and /news/[slug] stub pages

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Validation Checklist

Before marking complete:
- [ ] All success criteria met
- [ ] Type check passes: `npx tsc --noEmit`
- [ ] No `never_touch` files modified
- [ ] `/news` renders in browser
- [ ] `/news/global-summit-2025` renders in browser
- [ ] `/news/unknown-slug` shows 404 page

---

*Generated by KARIMO Brief Writer*
*PRD: route-gaps | Task: RG-4 | Wave: 2*
