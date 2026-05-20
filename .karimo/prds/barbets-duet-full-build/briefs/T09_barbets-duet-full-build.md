# Task Brief: T09

**Title:** Projects page real structure
**PRD:** barbets-duet-full-build
**Priority:** should
**Complexity:** 2/10
**Wave:** 2

---

## Objective

Refine the `/projects` page (Innovation Hub) to be data-ready for real content, add a `ProjectDetailDrawer` component for project deep-dives, and ensure `siteSlug` links connect projects to their learning sites.

---

## Context

**Parent Feature:** Barbets Duet — Full Platform Build

The `/projects` page renders `InnovationHubContent` which uses placeholder project data from `lib/data/projects.ts`. The data structure is real (proper `Project` type) but the content is fabricated. The UI needs a detail view mechanism — currently there is no way to see a project's `longDescription` or full `impactMetrics`.

The "Innovation Hub" framing is the correct one for Barbets Duet: projects represent systemic innovations (seaweed bio-packaging, pollinator corridors, etc.) that emerge from the learning sites.

This task is **Wave 2** — depends only on T01 (brand tokens).

---

## Research Context

### Project Type

```typescript
// types/project.ts
export interface Project {
  slug: string;
  title: string;
  description: string;
  category: 'Mariculture' | 'Agroforestry' | 'Urban' | 'Bio-Materials';
  siteSlug: string;
  maturity: 'Idea' | 'Pilot' | 'Scaling' | 'Systemic';
  image: string;
  featured?: boolean;
  impactMetrics: ProjectImpact[];
  innovationSummary: string;
  longDescription: string;
}
```

### Existing Setup

- `app/projects/page.tsx` imports `InnovationHubContent` from `./InnovationHubContent`
- `lib/data/projects.ts` has 3 placeholder projects with real `Project` type structure
- `types/project.ts` is the interface — do not change the type

### Known Issues

- ⚠️ **No detail view** — `longDescription` and full `impactMetrics` are never shown
- ⚠️ **siteSlug 'london-urban-canopy'** — one project references a non-existent site slug. After T02, update this to a real site slug or leave as is (the link simply won't resolve).
- ⚠️ **Maturity badge** — the "Idea/Pilot/Scaling/Systemic" maturity stages are Barbets-specific vocabulary and should be displayed prominently

---

## Requirements

1. Add `ProjectDetailDrawer` (shadcn `Sheet` component) that opens on project card click
2. Drawer shows: `longDescription`, all `impactMetrics`, `innovationSummary`, and site link
3. Add site link in drawer: "From [site name] Learning Site" → `/learning-sites/[siteSlug]` (only if site exists in `learningSites`)
4. Filter UI on projects page: filter by category and/or maturity stage
5. Maturity badge on each project card using consistent colour coding

---

## Success Criteria

Complete ALL criteria before marking task done:

- [ ] `ProjectDetailDrawer` opens when a project card is clicked
- [ ] Drawer shows `longDescription`, `impactMetrics`, and `innovationSummary`
- [ ] Learning site backlink renders in drawer when site exists
- [ ] Category filter buttons work to show/hide projects
- [ ] Maturity badges present on all project cards
- [ ] Mobile responsive (drawer slides in from bottom or right)
- [ ] `npx tsc --noEmit` passes

---

## Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `app/projects/InnovationHubContent.tsx` (or `page.tsx`) | modify | Add filter state, click handler to open drawer |
| `components/projects/ProjectDetailDrawer.tsx` | create | Sheet-based detail view for a single project |
| `components/projects/ProjectCard.tsx` | create | Extracted project card component with maturity badge |

---

## Implementation Guidance

### shadcn Sheet Usage

The `Sheet` component from `components/ui/sheet.tsx` is the right primitive for a slide-out drawer. Use it as:

```tsx
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

<Sheet open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
  <SheetContent side="right" className="w-full max-w-[640px] bg-background text-foreground">
    <SheetHeader>
      <SheetTitle className="font-serif text-3xl">{selectedProject?.title}</SheetTitle>
    </SheetHeader>
    {/* project detail content */}
  </SheetContent>
</Sheet>
```

### Maturity Colour Coding

```tsx
const maturityConfig = {
  'Idea':     { label: 'Idea', className: 'text-platinum/50 border-platinum/20' },
  'Pilot':    { label: 'Pilot', className: 'text-accent border-accent/40' },
  'Scaling':  { label: 'Scaling', className: 'text-viridian border-viridian/40' },
  'Systemic': { label: 'Systemic', className: 'text-accent bg-accent/10 border-accent' },
};
```

### Site Backlink Pattern

```tsx
import { learningSites } from '@/lib/data/learning-sites';
const site = learningSites.find(s => s.slug === project.siteSlug);
// Only render link if site exists:
{site && <Link href={`/learning-sites/${site.slug}`}>...</Link>}
```

### Filter State Pattern

```tsx
const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(null);
const [activeMaturityFilter, setActiveMaturityFilter] = useState<string | null>(null);

const filtered = projects.filter(p => {
  if (activeCategoryFilter && p.category !== activeCategoryFilter) return false;
  if (activeMaturityFilter && p.maturity !== activeMaturityFilter) return false;
  return true;
});
```

---

## Boundaries

### Files You MUST NOT Touch

- `.env*`, `firebase-applet-config.json`, `firestore.rules`
- `components/ui/` — use Sheet, Button etc. but don't edit them
- `types/project.ts` — do not change the interface

---

## Dependencies

### Upstream Tasks

| Task | What It Provides | Verify Before Starting |
|------|------------------|------------------------|
| T01 | Brand tokens | Confirm token classes resolve |

### Downstream Impact

T18 (Sanity schema) will need a `Project` content type.

---

## Commit Guidelines

```
feat(projects): add ProjectDetailDrawer and category/maturity filters

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Validation Checklist

- [ ] All success criteria met
- [ ] `npx tsc --noEmit` passes
- [ ] Click on a project card — drawer opens with detail content
- [ ] Category filter buttons toggle project visibility correctly
- [ ] Mobile: drawer usable on 375px viewport

---

*Generated by KARIMO Brief Writer*
*PRD: barbets-duet-full-build | Task: T09 | Wave: 2*
