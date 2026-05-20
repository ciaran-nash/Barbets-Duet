# Task Brief: T08

**Title:** Events slug detail page
**PRD:** barbets-duet-full-build
**Priority:** must
**Complexity:** 2/10
**Wave:** 2

---

## Objective

Build the `/events/[slug]` individual event detail page. The events list page exists at `/events` but there is no detail route — clicking an event has nowhere to go. Each event needs a dedicated page with full description, date/time/location, associated learning site link, and a registration CTA.

---

## Context

**Parent Feature:** Barbets Duet — Full Platform Build

Events are a key engagement mechanism — they include Invention Conventions, workshops, and Lab Days hosted at specific Jumuiya learning sites. Currently `lib/data/events.ts` has 2 events and the list page renders them, but `app/events/[slug]/` does not exist. The `BarbetsEvent` type already has a `siteSlug` field that links to a specific learning site.

This task is **Wave 2** — depends only on T01 (brand tokens).

---

## Research Context

### BarbetsEvent Type

```typescript
// types/narrative.ts
export interface BarbetsEvent {
  slug: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'Convention' | 'Workshop' | 'Lab Day' | 'Summit';
  image: string;
  link?: string;                 // external registration URL
  registrationStatus: 'Open' | 'Waitlist' | 'Closed';
  siteSlug?: string;             // associated learning site
}
```

### Pattern to Follow

Follow the same pattern as `app/stories/[slug]/page.tsx`:

```tsx
// app/stories/[slug]/page.tsx pattern
export async function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const story = stories.find(s => s.slug === slug);
  if (!story) { notFound(); }
  // ... render
}
```

### Existing Events List

From `lib/data/events.ts`:
- `invention-convention-2026` — no siteSlug
- `coastal-restoration-summit` — siteSlug: `msichoke-seaweed-growers`

---

## Requirements

0. **Check directory state before creating any files:**
   - Confirm `app/events/[slug]/` does not exist. If it does, check its contents before creating `page.tsx`.
   - Confirm what already exists in `components/events/` — the directory exists but may already contain components relevant to this task. Do not duplicate existing work.
1. Create `app/events/[slug]/page.tsx` with `generateStaticParams` from `events` array
2. Create `components/events/EventDetail.tsx` as the display component (only if it does not already exist)
3. Event detail includes: hero image, title, date/time, location, full description, type badge, registration status
4. If `event.siteSlug` is set, show a "Hosted at [Site Name]" link to `/learning-sites/[siteSlug]`
5. Registration CTA: if `registrationStatus === 'Open'` → green button with link; if `'Waitlist'` → amber badge; if `'Closed'` → greyed out
6. If `event.link` is set, use it for the registration button href

---

## Success Criteria

Complete ALL criteria before marking task done:

- [ ] `app/events/[slug]/page.tsx` created with `generateStaticParams`
- [ ] `components/events/EventDetail.tsx` created
- [ ] Event detail page renders from `lib/data/events.ts`
- [ ] Associated learning site link renders when `siteSlug` is set
- [ ] Registration CTA shows correct state (Open / Waitlist / Closed)
- [ ] Mobile responsive
- [ ] `npx tsc --noEmit` passes

---

## Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `app/events/[slug]/page.tsx` | create | Event detail page route |
| `components/events/EventDetail.tsx` | create | Event detail display component |

---

## Implementation Guidance

### Before Starting — Check Existing State

```bash
# Check if the [slug] directory exists
ls app/events/

# Check what is already in components/events/
ls components/events/
```

The events list page `app/events/page.tsx` exists. The `app/events/[slug]/` detail route is expected to be absent — create it. The `components/events/` directory exists and may have partial work — review its contents before creating `EventDetail.tsx` to avoid duplicating existing components.

### Page Route (follow stories pattern)

```tsx
// app/events/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { events } from '@/lib/data/events';
import EventDetail from '@/components/events/EventDetail';
import Header from '@/components/Header';
import { StickyFooter } from '@/components/ui/sticky-footer';
import CTA from '@/components/CTA';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find(e => e.slug === slug);
  if (!event) return { title: 'Event Not Found' };
  return {
    title: `${event.title} | Barbets Duet`,
    description: event.description,
  };
}

export async function generateStaticParams() {
  return events.map(e => ({ slug: e.slug }));
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const event = events.find(e => e.slug === slug);
  if (!event) { notFound(); }
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <EventDetail event={event} />
      </main>
      <CTA />
      <StickyFooter />
    </div>
  );
}
```

### Registration Status Styling

```tsx
const statusConfig = {
  'Open': { label: 'Registration Open', className: 'bg-viridian text-white' },
  'Waitlist': { label: 'Join Waitlist', className: 'bg-amber-500 text-night-forest' },
  'Closed': { label: 'Registration Closed', className: 'bg-night-forest/40 text-foreground/40 cursor-not-allowed' },
};
```

### Learning Site Backlink

```tsx
import { learningSites } from '@/lib/data/learning-sites';

const site = event.siteSlug ? learningSites.find(s => s.slug === event.siteSlug) : null;

{site && (
  <Link href={`/learning-sites/${site.slug}`} className="...">
    Hosted at: {site.name}
  </Link>
)}
```

### Layout Reference

Use the same layout structure as learning site pages:
- `pt-48 pb-32 px-6` section padding
- `max-w-[1600px] mx-auto` content container
- Event type badge: `text-[10px] font-mono uppercase tracking-[0.3em] text-accent`
- Title: BioRhyme, large (60px+ on desktop)
- Date/time metadata: DM Sans mono-style, small caps or tracking-wide

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
| T01 | Brand tokens | Confirm token classes resolve |

### Downstream Impact

T18 (Sanity schema) will need a `BarbetsEvent` schema — the fields rendered here inform what the schema requires.

---

## Commit Guidelines

```
feat(events): build /events/[slug] detail page with registration CTA

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Validation Checklist

- [ ] All success criteria met
- [ ] `npx tsc --noEmit` passes
- [ ] Navigate to `/events/coastal-restoration-summit` — page renders with Msichoke backlink
- [ ] Navigate to `/events/invention-convention-2026` — page renders (no site link)
- [ ] Both Open and Waitlist registration states display correctly

---

*Generated by KARIMO Brief Writer*
*PRD: barbets-duet-full-build | Task: T08 | Wave: 2*
