# Task Brief: T12

**Title:** Learning sites browse/index page
**PRD:** barbets-duet-full-build
**Priority:** must
**Complexity:** 4/10
**Wave:** 3

---

## Objective

Build the `/learning-sites` browse page — the primary discovery surface for all 13 Jumuiya learning sites. The page combines a MapLibre GL interactive map (Night Forest themed, built in T13) with a filterable site card grid, with cross-highlighting between map pins and cards on hover.

---

## Context

**Parent Feature:** Barbets Duet — Full Platform Build

The `/learning-sites` browse page is the top of the discovery funnel. Conservation-curious users land here and decide which sites they want to learn more about. Currently this route does not exist — navigating to `/learning-sites` likely returns a 404. The page needs to feel premium and data-rich, communicating the global reach of the Jumuiya network across Kenya, Uganda, Tanzania, UK, and USA.

The `SitesBrowse` component orchestrates the map + grid interaction. The `SitesMap` component wraps the MapLibre instance built in T13. The `SiteCard` component is the grid item.

This task is **Wave 3** — depends on T02 (13 sites seeded), T06 (complete site pages), and T13 (MapLibre setup). T13 must complete before T12 begins.

---

## Research Context

### Required Interaction: Cross-Highlighting

The key UX feature: hovering a site card highlights the corresponding map pin, and clicking a map pin scrolls to / highlights the corresponding site card.

```
User hovers SiteCard[msichoke] → SitesMap pin for msichoke pulses/enlarges
User clicks MapPin[himo] → SiteCard[himo] scrolls into view / gets highlight ring
```

This requires shared state: `hoveredSiteSlug: string | null` lifted to the parent `SitesBrowse` component.

### Site Data Available Post-T02

Each `LearningSite` will have:
- `slug`, `name`, `location`, `category`, `heroImage`, `leadPartners`
- `lat`, `lng` (added in T02) — required for map pins
- Region (derivable: UK/USA = International, KE/TZ/UG = East Africa)

### Map Component (T13 Output)

T13 creates `components/learning-sites/SitesMap.tsx` and `lib/map/style.json`. This task consumes that component. SitesMap must accept:
```typescript
interface SitesMapProps {
  sites: LearningSite[];
  hoveredSlug: string | null;
  onPinClick: (slug: string) => void;
}
```

---

## Requirements

1. Create `app/learning-sites/page.tsx` as a Server Component that passes sites to `SitesBrowse`
2. Create `components/learning-sites/SitesBrowse.tsx` — orchestration component (Client Component)
3. Create `components/learning-sites/SiteCard.tsx` — individual site card
4. Map + grid layout: map on left (sticky), cards on right (scrollable) on desktop; stacked on mobile
5. Region filter: "All Sites" | "East Africa" | "International" toggle buttons
6. Cross-highlighting: hover card → highlight pin; click pin → highlight/scroll to card
7. Site card includes: site name, location, category, hero image, brief overview
8. Each card links to `/learning-sites/[slug]`

---

## Success Criteria

Complete ALL criteria before marking task done:

- [ ] `/learning-sites` page renders without 404
- [ ] All 13 sites appear on map and in card grid
- [ ] Map uses Night Forest dark style (from T13)
- [ ] Region filter works: East Africa shows 11 sites, International shows 2
- [ ] Hover on card → corresponding map pin changes appearance (scale, colour, or glow)
- [ ] Click on map pin → corresponding site card gets highlight ring
- [ ] Mobile layout: map stacks above cards
- [ ] Each card links to its `/learning-sites/[slug]` detail page
- [ ] `npx tsc --noEmit` passes

---

## Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `app/learning-sites/page.tsx` | create | Server component page route |
| `components/learning-sites/SitesBrowse.tsx` | create | Client orchestration: map + grid + filters + cross-highlight |
| `components/learning-sites/SiteCard.tsx` | create | Individual site card component |

---

## Implementation Guidance

### Page Route (Server Component)

```tsx
// app/learning-sites/page.tsx
import { Metadata } from 'next';
import { learningSites } from '@/lib/data/learning-sites';
import SitesBrowse from '@/components/learning-sites/SitesBrowse';
import Header from '@/components/Header';
import { StickyFooter } from '@/components/ui/sticky-footer';

export const metadata: Metadata = {
  title: 'Learning Sites | Barbets Duet',
  description: 'Discover 13 real conservation learning sites across East Africa, UK, and USA.',
};

export default function LearningStatesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <SitesBrowse sites={learningSites} />
      </main>
      <StickyFooter />
    </div>
  );
}
```

### SitesBrowse State Management

```tsx
// components/learning-sites/SitesBrowse.tsx
'use client';

const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
const [selectedSlug, setSelectedSlug] = useState<string | null>(null);  // pin click
const [regionFilter, setRegionFilter] = useState<'all' | 'east-africa' | 'international'>('all');

const eastAfricaSlugs = [
  'molo-magode-farm', 'lukenya-zumula-farm', 'seme', 'msichoke-seaweed-growers',
  'mwasama-primary-school', 'himo', 'sikia-community-dam', 'arboretum-kajokoby',
  'cichlid-breeding', 'rufiji', 'nkoroi'
];

const filteredSites = sites.filter(s => {
  if (regionFilter === 'east-africa') return eastAfricaSlugs.includes(s.slug);
  if (regionFilter === 'international') return !eastAfricaSlugs.includes(s.slug);
  return true;
});
```

### Layout Pattern

```tsx
<div className="flex flex-col lg:flex-row min-h-screen pt-24">
  {/* Map — sticky on desktop */}
  <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] w-full lg:w-1/2">
    <SitesMap
      sites={filteredSites}
      hoveredSlug={hoveredSlug}
      onPinClick={(slug) => {
        setSelectedSlug(slug);
        // scroll to card ref
      }}
    />
  </div>

  {/* Cards — scrollable */}
  <div className="w-full lg:w-1/2 px-6 py-12 overflow-y-auto">
    {/* Region filter tabs */}
    {/* Site cards grid */}
    <div className="grid gap-6">
      {filteredSites.map(site => (
        <SiteCard
          key={site.slug}
          site={site}
          isHovered={hoveredSlug === site.slug}
          isSelected={selectedSlug === site.slug}
          onHover={() => setHoveredSlug(site.slug)}
          onLeave={() => setHoveredSlug(null)}
        />
      ))}
    </div>
  </div>
</div>
```

### SiteCard

```tsx
// components/learning-sites/SiteCard.tsx
interface SiteCardProps {
  site: LearningSite;
  isHovered: boolean;
  isSelected: boolean;
  onHover: () => void;
  onLeave: () => void;
}
```

Highlight state: when `isSelected`, add `ring-2 ring-accent` border; when `isHovered`, slight scale(1.01).

### Region Classification

- East Africa: Kenya (KE), Tanzania (TZ), Uganda (UG) sites — 11 sites
- International: UK (Woodland Valley Farm), USA (Hannacroix Creek) — 2 sites

---

## Boundaries

### Files You MUST NOT Touch

- `.env*`, `firebase-applet-config.json`, `firestore.rules`
- `components/ui/`
- `types/learning-site.ts` — frozen after T02

---

## Dependencies

### Upstream Tasks

| Task | What It Provides | Verify Before Starting |
|------|------------------|------------------------|
| T02 | All 13 sites with `lat`/`lng` fields | Run `learningSites.every(s => s.lat && s.lng)` |
| T06 | Complete site detail pages | Verify `/learning-sites/msichoke-seaweed-growers` renders all sections |
| T13 | MapLibre map component | `components/learning-sites/SitesMap.tsx` must exist and accept the prop interface above |

### Downstream Impact

T18 (Sanity schema) must support the same data fields that power this browse page.

---

## Commit Guidelines

```
feat(learning-sites): build /learning-sites browse page with map and grid

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Validation Checklist

- [ ] All success criteria met
- [ ] `npx tsc --noEmit` passes
- [ ] `npm run build` passes
- [ ] `/learning-sites` renders 13 cards and map pins
- [ ] East Africa filter shows 11 sites
- [ ] International filter shows 2 sites
- [ ] Hover interaction works between map and cards
- [ ] Mobile: map above, cards below, filter tabs visible

---

*Generated by KARIMO Brief Writer*
*PRD: barbets-duet-full-build | Task: T12 | Wave: 3*
