# Task Brief: T07

**Title:** Stories slug detail page
**PRD:** barbets-duet-full-build
**Priority:** must
**Complexity:** 2/10
**Wave:** 2

---

## Objective

Upgrade the `/stories/[slug]` detail page to render story content properly, support rich text (at minimum markdown), and link back to the associated learning site.

**IMPORTANT: `app/stories/[slug]/page.tsx` ALREADY EXISTS and should NOT be recreated.** It is a complete, functioning page with `generateStaticParams`, `generateMetadata`, and a `CinematicReader` render. The entire scope of this task is upgrading `components/stories/CinematicReader.tsx` — the page route file itself is out of scope.

The `CinematicReader` component currently renders `story.content` as a plain string — real Barbets stories will be long-form narratives requiring proper formatting.

---

## Context

**Parent Feature:** Barbets Duet — Full Platform Build

The stories section is a critical discovery and trust-building surface. Conservation stories from Msichoke, Himo, Hannacroix, and other sites are long-form narratives with multiple paragraphs, potentially images inline, and metric callouts. Currently `story.content` is a plain string that gets rendered in a single paragraph — this will break completely with real content.

The `CinematicReader` component (`components/stories/CinematicReader.tsx`) handles the page-level layout with a fullscreen hero image + title. The content body below needs to be upgraded to support rich text rendering.

**Task scope — three upgrades to `CinematicReader.tsx` only:**
1. Upgrade the content body to support rich text / markdown
2. Add a `siteSlug` backlink to the associated learning site
3. Ensure `impactMetrics` render in a styled callout block

Do not touch `app/stories/[slug]/page.tsx` — that file is already complete.

This task is **Wave 2** — depends only on T01 (brand tokens).

---

## Research Context

### Existing CinematicReader Structure

`components/stories/CinematicReader.tsx` already implements:
- Fullscreen hero image with parallax feel
- Large BioRhyme heading (`text-6xl` to `text-9xl`)
- Subtitle (italic serif)
- Read time + date metadata
- The content area below needs the rich text upgrade

### Story Type

```typescript
// types/narrative.ts
export interface Story {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string;     // currently plain string — upgrade to support markdown
  image: string;
  category: 'Restoration' | 'Community' | 'Innovation';
  date: string;
  readTime: string;
  impactMetrics: ImpactMetric[];
  siteSlug?: string;   // link to associated learning site
}
```

### Known Issues to Address

- ⚠️ **`story.content` is a plain string** — When real stories are seeded, the content will be long-form text with paragraphs and formatting. It must render as parsed markdown, not a raw string dump.
- ⚠️ **No learning site backlink** — If `story.siteSlug` is set, the reader should show a link to the associated learning site page.
- ⚠️ **No impact metrics display** — `story.impactMetrics` is populated but not rendered in CinematicReader.

---

## Requirements

1. Install `react-markdown` (or `marked` + DOMPurify) for markdown rendering
2. Upgrade `CinematicReader` content body to render `story.content` as markdown
3. Add `siteSlug` backlink: "From the [Site Name] Learning Site" → links to `/learning-sites/[siteSlug]`
4. Add impact metrics display: show `impactMetrics` as a highlighted callout block in the story body
5. Ensure typography inside the prose area follows brand styles (BioRhyme for h2/h3, DM Sans for p)

---

## Success Criteria

Complete ALL criteria before marking task done:

- [ ] `react-markdown` (or equivalent) installed in `package.json`
- [ ] `story.content` renders as formatted markdown (paragraphs, headings, lists, bold, italic)
- [ ] If `story.siteSlug` is set, a "Learning Site" backlink renders in the story
- [ ] Impact metrics render as a styled callout block
- [ ] Story page passes accessibility check (headings hierarchy: h1 title → h2/h3 in content)
- [ ] Styled prose: `p` tags use DM Sans body font, `h2`/`h3` in content use BioRhyme
- [ ] `npx tsc --noEmit` passes

---

## Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `package.json` | modify | Add `react-markdown` dependency |
| `components/stories/CinematicReader.tsx` | modify | Add markdown rendering, site link, impact metrics display |
| `types/narrative.ts` | modify | If `content` type needs widening (it likely stays `string`, just rendered differently) |
| `app/stories/[slug]/page.tsx` | DO NOT TOUCH | Already exists and is complete — out of scope for this task |

---

## Implementation Guidance

### Markdown Rendering Pattern

```tsx
// components/stories/CinematicReader.tsx
import ReactMarkdown from 'react-markdown';

// In the content body:
<div className="prose prose-invert max-w-[720px] mx-auto
                prose-headings:font-serif prose-p:font-sans prose-p:text-lg prose-p:leading-relaxed">
  <ReactMarkdown>{story.content}</ReactMarkdown>
</div>
```

Install: `npm install react-markdown`

If Tailwind Typography (`@tailwindcss/typography`) is not installed, install it: `npm install @tailwindcss/typography` and add it to the Tailwind config.

### Site Backlink Pattern

```tsx
// Lookup the learning site name for the backlink label
import { learningSites } from '@/lib/data/learning-sites';

const associatedSite = story.siteSlug
  ? learningSites.find(s => s.slug === story.siteSlug)
  : null;

// Render:
{associatedSite && (
  <Link
    href={`/learning-sites/${associatedSite.slug}`}
    className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em]
               text-accent hover:opacity-70 transition-opacity border-b border-accent/30 pb-1"
  >
    <ArrowRight className="w-3 h-3" />
    From: {associatedSite.name} Learning Site
  </Link>
)}
```

### Impact Metrics Block

```tsx
{story.impactMetrics.length > 0 && (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 my-16 p-8 border border-accent/20 rounded-2xl">
    {story.impactMetrics.map((metric, i) => (
      <div key={i} className="text-center">
        <div className="text-4xl font-serif font-bold text-accent">{metric.value}{metric.unit}</div>
        <div className="text-xs font-mono uppercase tracking-widest opacity-60 mt-2">{metric.label}</div>
      </div>
    ))}
  </div>
)}
```

### Prose Styling Reference

Night Forest background with Platinum text. For the content area:
- `prose-p:text-platinum/80` for body text
- `prose-headings:text-platinum` for section headings
- `prose-strong:text-accent` for bold/emphasis
- `prose-a:text-accent` for links

---

## Boundaries

### Files You MUST NOT Touch

- `.env*`, `firebase-applet-config.json`, `firestore.rules`
- `components/ui/`

---

## Dependencies

### Upstream Tasks

| Task | What It Provides | Verify Before Starting |
|------|------------------|------------------------|
| T01 | Brand tokens | Confirm `text-accent`, `font-serif` resolve |

### Downstream Impact

T18 (Sanity schema) will define a `Story` content type — the structure here informs what the schema needs (particularly rich text field type for `content`).

---

## Commit Guidelines

```
feat(stories): add markdown rendering and site backlink to CinematicReader

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Validation Checklist

- [ ] All success criteria met
- [ ] `npx tsc --noEmit` passes
- [ ] Navigate to `/stories/the-seaweed-pioneers` — content renders with proper formatting
- [ ] Site backlink appears (msichoke-seaweed-growers story has siteSlug set)
- [ ] Impact metrics block renders

---

*Generated by KARIMO Brief Writer*
*PRD: barbets-duet-full-build | Task: T07 | Wave: 2*
