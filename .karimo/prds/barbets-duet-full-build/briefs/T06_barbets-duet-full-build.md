# Task Brief: T06

**Title:** Learning site 4 missing page sections
**PRD:** barbets-duet-full-build
**Priority:** must
**Complexity:** 3/10
**Wave:** 2

---

## Objective

Build the four missing section components for the learning site `[slug]` detail pages: SiteTestimonial, SiteContact, SiteRestorationStrategies, and ExploreOtherSites. Add them to `LearningSiteContent.tsx` to complete the site detail page experience.

---

## Context

**Parent Feature:** Barbets Duet — Full Platform Build

The learning site detail page currently renders 7 sections (SiteHero, SiteChallenges, SiteProjects, MarketInventions, ImpactGrid, FutureGoals, SiteGallery). Four more sections are defined in the `LearningSite` type with optional data fields but have no corresponding components built yet.

These sections are critical for:
- **Testimonial** — social proof from site managers/volunteers (trust signal for prospective volunteers)
- **Contact** — direct CTA to engage with the site (needed before launch)
- **RestorationStrategies** — distinct from MarketInventions, covering ecological methods like trait-based management and mosaic rights
- **ExploreOtherSites** — cross-linking between sites to increase engagement and discovery

This task is **Wave 2** — depends on T01 (brand tokens) and T02 (all 13 sites seeded).

---

## Research Context

### Existing Component Pattern (follow exactly)

All existing learning site components follow this structure:

```tsx
// components/learning-sites/SiteHero.tsx pattern
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LearningSite } from '@/types/learning-site';
import { KineticReveal } from '@/components/motion/KineticReveal';
import Image from 'next/image';

export function SiteHero({ site }: { site: LearningSite }) {
  return (
    <section className="pt-XX pb-XX px-6">
      <div className="max-w-[1600px] mx-auto">
        {/* ... */}
        <KineticReveal>
          <h2 className="font-serif font-bold ...">Heading</h2>
        </KineticReveal>
        {/* ... */}
      </div>
    </section>
  );
}
```

**Key patterns:**
- `'use client'` directive on all learning site components
- `{ site: LearningSite }` prop pattern
- `KineticReveal` wrapper on headings and key content
- `max-w-[1600px] mx-auto px-6` layout container
- `font-serif` for headings, `font-sans` for body
- Brand token classes: `text-accent` (Neon Lime), `text-brand` or `bg-viridian` (Viridian)
- `motion` from `framer-motion` for hover/entrance animations

### Type Fields Available

From `types/learning-site.ts`:

```typescript
testimonial?: {
  quote: string;
  authorName: string;
  authorPosition?: string;
  authorAvatar?: string;
}

contact?: {
  intro?: string;
  buttonLabel: string;
  contactLink: string;
}

restorationStrategies?: {
  description?: string;
  tags?: string[];
  image?: string;
}

relatedSitesSlugs?: string[];    // For ExploreOtherSites
```

### Relevant Agent Skills

- `high-end-visual-design` (.agents/skills/) — apply double-bezel nested architecture and spring physics for premium feel on new section builds
- `design-taste-frontend` — apply anti-pattern rules (no generic card hover glows, no lorem ipsum, no 8-column grids)

---

## Requirements

### 1. SiteTestimonial

- Large pull-quote typography (BioRhyme, 2xl+)
- Author name + position (DM Sans, small caps or tracking-wide)
- Optional avatar image in circular crop
- Night Forest background section to create visual contrast between sections
- Guard: only render if `site.testimonial` is defined

### 2. SiteContact

- Short intro paragraph (`site.contact.intro`)
- Prominent CTA button linking to `site.contact.contactLink`
- Button label from `site.contact.buttonLabel`
- Viridian button on Neon Lime background — or inverse — for maximum contrast/urgency
- Guard: only render if `site.contact` is defined

### 3. SiteRestorationStrategies

- Section heading: "Restoration Strategies" or "How We Work With Nature"
- Description paragraph (`site.restorationStrategies.description`)
- Tags displayed as pill badges (`site.restorationStrategies.tags`)
- Optional image
- Content emphasis: ecological methods, not market strategies — trait-based management, mosaic rights, biodiversity corridors
- Guard: only render if `site.restorationStrategies` is defined

### 4. ExploreOtherSites

- Horizontal scrollable or grid carousel of related site cards
- Shows name, location, category for each related site
- Each card links to `/learning-sites/[slug]`
- Source: look up `site.relatedSitesSlugs` from `learningSites` array
- Guard: only render if `site.relatedSitesSlugs` has 1+ entries

---

## Success Criteria

Complete ALL criteria before marking task done:

- [ ] `components/learning-sites/SiteTestimonial.tsx` exists and renders with real site data
- [ ] `components/learning-sites/SiteContact.tsx` exists and renders with real site data
- [ ] `components/learning-sites/SiteRestorationStrategies.tsx` exists and renders with real site data
- [ ] `components/learning-sites/ExploreOtherSites.tsx` exists and renders with real site data
- [ ] All 4 components are imported and rendered in `LearningSiteContent.tsx`
- [ ] All components use `KineticReveal` on headings
- [ ] All components are mobile responsive
- [ ] Components gracefully hide when their optional data is undefined (no crashes, no empty sections)
- [ ] Brand tokens used throughout — no hardcoded hex values
- [ ] `npx tsc --noEmit` passes

---

## Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `components/learning-sites/SiteTestimonial.tsx` | create | Testimonial quote block component |
| `components/learning-sites/SiteContact.tsx` | create | Contact CTA block component |
| `components/learning-sites/SiteRestorationStrategies.tsx` | create | Ecological restoration methods section |
| `components/learning-sites/ExploreOtherSites.tsx` | create | Related sites carousel/grid |
| `app/learning-sites/[slug]/LearningSiteContent.tsx` | modify | Import and render all 4 new components |

### File Ownership Notes

`LearningSiteContent.tsx` is shared by all 13 site pages. The 4 new sections should be inserted after `SiteGallery` and before the `<CTA />` component, in this order: SiteRestorationStrategies → SiteTestimonial → ExploreOtherSites → SiteContact.

---

## Implementation Guidance

### Suggested Section Order in LearningSiteContent.tsx

```tsx
<SiteHero site={site} />
<SiteChallenges site={site} />
<SiteProjects site={site} />
<MarketInventions site={site} />
<SiteRestorationStrategies site={site} />   {/* NEW */}
<ImpactGrid site={site} />
<FutureGoals site={site} />
<SiteGallery site={site} />
<SiteTestimonial site={site} />             {/* NEW */}
<ExploreOtherSites site={site} />           {/* NEW */}
<SiteContact site={site} />                 {/* NEW */}
```

### ExploreOtherSites Data Pattern

```tsx
// components/learning-sites/ExploreOtherSites.tsx
import { learningSites } from '@/lib/data/learning-sites';

export function ExploreOtherSites({ site }: { site: LearningSite }) {
  if (!site.relatedSitesSlugs?.length) return null;

  const relatedSites = site.relatedSitesSlugs
    .map(slug => learningSites.find(s => s.slug === slug))
    .filter(Boolean);

  if (!relatedSites.length) return null;
  // ... render carousel
}
```

### SiteContact Button Style

The contact CTA is a priority conversion point. Use a full-width or prominent button with Neon Lime background and Night Forest text — maximum visibility:

```tsx
<a
  href={site.contact.contactLink}
  className="inline-block bg-accent text-night-forest font-sans font-semibold
             px-8 py-4 rounded-full hover:scale-105 transition-transform"
>
  {site.contact.buttonLabel}
</a>
```

### Typography Reference

- Section labels: `text-[10px] font-mono uppercase tracking-[0.3em] text-accent`
- Testimonial quote: `text-3xl md:text-5xl font-serif italic leading-snug`
- Author name: `text-sm font-sans font-semibold tracking-widest uppercase`
- Tags/pills: `text-xs font-mono px-3 py-1 border border-accent/40 rounded-full`

---

## Boundaries

### Files You MUST NOT Touch

- `.env*`, `firebase-applet-config.json`, `firestore.rules`
- `components/ui/` — shadcn/ui primitives
- `types/learning-site.ts` — type is frozen after T02

### Files Requiring Review

- `app/learning-sites/[slug]/LearningSiteContent.tsx` — only add new imports and component renders, don't change existing section order or remove anything

---

## Dependencies

### Upstream Tasks

| Task | What It Provides | Verify Before Starting |
|------|------------------|------------------------|
| T01 | Brand tokens in globals.css | Confirm `text-accent`, `bg-viridian`, `font-serif` classes resolve |
| T02 | All 13 sites seeded | Confirm `learningSites.length === 13` |

### Downstream Impact

Tasks that depend on this one: T12 (learning sites browse needs complete site pages), T18 (Sanity schema covers all section data)

---

## Commit Guidelines

```
feat(learning-sites): add 4 missing site page sections

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Validation Checklist

- [ ] All success criteria met
- [ ] `npx tsc --noEmit` passes
- [ ] `npm run build` passes
- [ ] Navigate to `/learning-sites/msichoke-seaweed-growers` — all 4 new sections render (if data present)
- [ ] Navigate to a site with no testimonial — no empty section visible
- [ ] Mobile viewport check: sections stack correctly

---

*Generated by KARIMO Brief Writer*
*PRD: barbets-duet-full-build | Task: T06 | Wave: 2*
