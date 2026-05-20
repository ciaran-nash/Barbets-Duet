# Task Brief: T25

**Title:** Research knowledge hub
**PRD:** barbets-duet-full-build
**Priority:** should
**Complexity:** 3/10
**Wave:** 6

---

## Objective

Build the `/research` page as a knowledge hub for Barbets Duet's strategic frameworks, the 20-year experiment data, Mosaic Rights documentation, and the Barbets Game rules. Content managed via Sanity CMS.

---

## Context

**Parent Feature:** Barbets Duet — Full Platform Build

Barbets Duet has 20 years of accumulated knowledge about ecological restoration economics. The `/research` page makes this accessible to: researchers, journalists, policy makers, and conservation practitioners who want to understand the Barbets methodology. Content types include strategic frameworks, data publications, Mosaic Rights white papers, and the Barbets Game documentation.

This page primarily serves the "discover" audience who want depth beyond the learning site profiles.

This task is **Wave 6** — depends on T20 (Sanity GROQ queries).

---

## Requirements

1. Create `app/research/page.tsx`
2. Create supporting components in `components/research/`
3. Categories: Strategic Frameworks, Experiment Data, Mosaic Rights, Barbets Game
4. Each document: title, description, category, PDF/link, publication date
5. Filter by category
6. Documents fetched from Sanity (or static fallback if Sanity document type not yet added)

---

## Success Criteria

Complete ALL criteria before marking task done:

- [ ] `/research` page renders
- [ ] Documents displayed in a filterable grid or list
- [ ] Category filter works
- [ ] Each document has a link/download action
- [ ] Barbets Game section present with clear description
- [ ] Mobile responsive
- [ ] `npx tsc --noEmit` passes

---

## Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `app/research/page.tsx` | create | Research hub page |
| `components/research/DocumentGrid.tsx` | create | Document display component |
| `components/research/ResearchFilters.tsx` | create | Category filter component |

---

## Implementation Guidance

### Document Type (Static Fallback)

```typescript
// types/research.ts (create if needed)
export interface ResearchDocument {
  slug: string;
  title: string;
  description: string;
  category: 'Framework' | 'Data' | 'Mosaic Rights' | 'Barbets Game';
  url?: string;        // link or PDF URL
  publishedDate: string;
  featured?: boolean;
}
```

### Static Seed Data (use until Sanity document type added)

```typescript
// lib/data/research.ts
export const researchDocuments: ResearchDocument[] = [
  {
    slug: 'mosaic-rights-framework',
    title: 'Mosaic Rights: A New Framework for Land Stewardship',
    description: 'The foundational framework contrasting Mosaic Rights (footpaths, shared access) with Column Rights (fences, exclusion).',
    category: 'Mosaic Rights',
    publishedDate: '2023',
    featured: true,
  },
  {
    slug: 'barbets-game-guide',
    title: 'The Barbets Game — Facilitator Guide',
    description: 'A structured knowledge exchange game for conservation practitioners. Rules, roles, and outcomes.',
    category: 'Barbets Game',
    publishedDate: '2022',
  },
  {
    slug: '20-year-experiment-data',
    title: '2008–2028: The 20-Year Experiment in Ecological Economics',
    description: 'Annual data from 13 learning sites tracking biodiversity, livelihoods, and ecosystem service values.',
    category: 'Data',
    publishedDate: '2026',
  },
  {
    slug: 'barbet-principles',
    title: 'The Seven Barbet Principles',
    description: 'Operational principles for running a Jumuiya learning site: accountability, reciprocity, and abundance.',
    category: 'Framework',
    publishedDate: '2020',
  },
];
```

### Page Layout

```
Hero: "Research & Knowledge" heading
Introduction: Why Barbets Duet publishes its research openly
Category filters
Document grid
Barbets Game spotlight (featured card)
CTA: Download the Barbets Game guide
```

### Barbets Game Spotlight

The Barbets Game deserves a dedicated feature card with:
- What it is: "A structured knowledge exchange game for ecological learning"
- Who it's for: site managers, volunteers, conservation practitioners
- How to get it: Download link or contact
- Visual: illustration or photo (can use placeholder)

### Document Card

```tsx
// Each document card shows:
<div className="border border-accent/20 rounded-2xl p-6 hover:border-accent/60 transition-colors">
  <span className="text-[10px] font-mono uppercase tracking-widest text-accent">
    {doc.category}
  </span>
  <h3 className="font-serif text-xl mt-3 mb-2">{doc.title}</h3>
  <p className="text-sm font-sans opacity-70">{doc.description}</p>
  <div className="mt-4 flex justify-between items-center">
    <span className="text-xs opacity-40">{doc.publishedDate}</span>
    {doc.url && (
      <Link href={doc.url} className="text-xs font-mono uppercase text-accent">
        Read / Download →
      </Link>
    )}
  </div>
</div>
```

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
| T20 | Sanity GROQ queries | Can use static data as fallback if Sanity document type not yet created |

### Downstream Impact

None directly.

---

## Commit Guidelines

```
feat(research): build /research knowledge hub with document library

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Validation Checklist

- [ ] All success criteria met
- [ ] `npx tsc --noEmit` passes
- [ ] `/research` page renders with document grid
- [ ] Category filter works
- [ ] Barbets Game section visible and prominent

---

*Generated by KARIMO Brief Writer*
*PRD: barbets-duet-full-build | Task: T25 | Wave: 6*
