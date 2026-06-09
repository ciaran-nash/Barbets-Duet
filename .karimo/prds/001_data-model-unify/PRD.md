# PRD: data-model-unify

**Slug:** data-model-unify
**Status:** draft
**Branch:** feature/barbets-duet-full-build
**Date:** 2026-06-09
**Priority:** High — schema cleanup before PRD-A route-gaps and PRD-D admin-portal land

---

## 1. Overview

This PRD captures four schema-cleanup tasks identified in BACKLOG.md (PRD-C). They are not new features — they are technical debt corrections that must be resolved before further content types are added to the codebase.

The changes are TypeScript-first: TS interfaces are the source of truth; Sanity schemas and GROQ queries follow.

---

## 2. Problem Statement

Four independent inconsistencies exist in the Barbets Duet data model:

### 2a. Impact type fragmentation
Three parallel impact-metric shapes exist across three different type files:
- `ImpactMetric` in `types/narrative.ts` — `{ label, value, unit }`
- `ImpactStat` in `types/learning-site.ts` — `{ label, value, description, trend? }`
- `ProjectImpact` in `types/project.ts` — `{ label, value, unit? }`

These are conceptually the same entity rendered in different contexts. Having three shapes means:
- Shared utility functions cannot be written
- Components cannot be reused across contexts
- Future content types must pick an arbitrary shape or invent a fourth

### 2b. story.content type mismatch
The Sanity `story` schema defines `content` as `array` (PortableText blocks + images). The TypeScript `Story` interface defines `content: string`. This mismatch means:
- TypeScript provides no safety for PortableText operations
- `CinematicReader.tsx` renders via `ReactMarkdown`, which works only for string/Markdown — not PortableText
- Static fallback data (`lib/data/stories.ts`) stores plain strings; Sanity data returns `PortableText[]`
- Both paths must work until Sanity is fully live

### 2c. Missing reverse link: LearningSite → projects[]
`Project` has `siteSlug: string` (forward link). `LearningSite` has no `projects[]` array. This means:
- Learning site detail pages cannot list their associated projects without a full scan of all projects
- GROQ queries cannot use Sanity's native reference traversal for this relationship

### 2d. BarbetsEvent.siteSlug alignment (documentation/verification gap)
The TS type already has `siteSlug?: string`. The Sanity schema uses a `reference` field (`associatedSite`) and the GROQ query maps it: `"siteSlug": associatedSite->slug.current`. The static data in `lib/data/events.ts` directly uses `siteSlug`. These are aligned — but this alignment is undocumented and could regress. A comment block and test fixture should capture the intent.

---

## 3. Goals

- Single shared `ImpactPoint` type replacing all three impact-metric shapes
- `Story.content` typed as `string | PortableTextBlock[]` with a runtime type guard
- `CinematicReader` renders both string (static fallback) and PortableText (Sanity) without breaking
- `LearningSite.projects[]` optional field with a helper query function
- `BarbetsEvent.siteSlug` alignment documented with a comment block in `narrative.ts`
- TypeScript strict-mode passes cleanly after all changes
- No regressions in existing story, project, or learning-site pages

---

## 4. Non-Goals

- No Sanity content migration (existing documents are not touched)
- No new UI components — only type changes and one renderer update
- No changes to `lib/data/learning-sites.ts` static data (the `projects[]` field is optional)
- No Supabase schema changes
- No new routes

---

## 5. Technical Design

### 5a. Unified impact type

Create `types/shared.ts` (new file):

```typescript
/**
 * Shared impact metric shape used by Story, Project, and LearningSite.
 * `description` and `trend` are optional — only LearningSite impactData uses them.
 */
export interface ImpactPoint {
  label: string;
  value: string;
  unit?: string;
  description?: string;
  trend?: 'up' | 'down';
}
```

Migration:
- `types/narrative.ts`: replace `ImpactMetric` with re-export of `ImpactPoint`; update `Story.impactMetrics: ImpactPoint[]`
- `types/learning-site.ts`: replace `ImpactStat` with re-export of `ImpactPoint`; update `LearningSite.impactData.*`
- `types/project.ts`: replace `ProjectImpact` with re-export of `ImpactPoint`; update `Project.impactMetrics`
- Consumers: `ImpactGrid.tsx`, `ProjectCard.tsx`, `ProjectDetailDrawer.tsx`, `CinematicReader.tsx`

Backward compatibility: the new shape is a superset of all three — no data loss. The only addition is optional fields.

### 5b. story.content type + renderer

Update `types/narrative.ts`:

```typescript
import type { PortableTextBlock } from '@portabletext/types';

export interface Story {
  // ...
  content: string | PortableTextBlock[];
  // ...
}
```

Update `CinematicReader.tsx`:
- Add `isPortableText` type guard: `Array.isArray(content) && content[0]?._type === 'block'`
- Render PortableText path with `@portabletext/react` `<PortableText>` component
- Keep `ReactMarkdown` path for static fallback string content

Sanity schema: already correct — no change needed.
GROQ query: already returns raw `content` (PortableText array) — no change needed.

### 5c. LearningSite.projects[] reverse link

Update `types/learning-site.ts`:

```typescript
import type { Project } from '@/types/project';

export interface LearningSite {
  // ... existing fields ...
  /**
   * Projects associated with this learning site.
   * Populated from GROQ query via reverse reference traversal.
   * Optional — may be omitted in static data and list-view queries.
   */
  projects?: Project[];
}
```

Add GROQ query helper in `lib/sanity/queries.ts`:

```typescript
export async function getProjectsBySite(siteSlug: string): Promise<Project[]>
```

Uses: `*[_type == "project" && associatedSite->slug.current == $siteSlug]`

### 5d. BarbetsEvent.siteSlug documentation

Add JSDoc comment to `BarbetsEvent.siteSlug` in `types/narrative.ts` explaining the Sanity mapping:

```typescript
/**
 * Slug of the associated learning site.
 * In Sanity: resolved from `associatedSite` reference via GROQ projection.
 * In static data (lib/data/events.ts): set directly as a string.
 */
siteSlug?: string;
```

---

## 6. File Change Map

| File | Change |
|------|--------|
| `types/shared.ts` | NEW — `ImpactPoint` interface |
| `types/narrative.ts` | Replace `ImpactMetric` with `ImpactPoint` re-export; update `Story.content` type; add JSDoc to `siteSlug` |
| `types/learning-site.ts` | Replace `ImpactStat` with `ImpactPoint` re-export; add optional `projects?: Project[]` |
| `types/project.ts` | Replace `ProjectImpact` with `ImpactPoint` re-export |
| `components/learning-sites/ImpactGrid.tsx` | Update import from `ImpactStat` to `ImpactPoint` |
| `components/projects/ProjectCard.tsx` | Update import from `ProjectImpact` (implicit) to `ImpactPoint` |
| `components/projects/ProjectDetailDrawer.tsx` | Update import if needed |
| `components/stories/CinematicReader.tsx` | Add PortableText renderer with type guard; keep Markdown fallback |
| `lib/sanity/queries.ts` | Add `getProjectsBySite()` helper |

---

## 7. Acceptance Criteria (Global)

- `npx tsc --noEmit` passes with zero errors after all changes
- `eslint .` passes with zero new errors
- `npm run build` completes without error
- Story pages render correctly for both static (`string`) and Sanity (`PortableText[]`) content
- Learning site pages render `ImpactGrid` without regression
- Project cards render impact metrics without regression
- No TypeScript `any` casts introduced

---

## 8. Open Questions

- Should `@portabletext/react` be added as a new dependency, or is it already present? (Check `package.json` before C3 task execution.)
- Should `ImpactPoint` live in `types/shared.ts` or be co-located in `types/impact.ts`? Recommend `types/shared.ts` to keep the shared-types surface visible.
- The `LearningSite.projects[]` field: should list-view queries (`getAllLearningSitesFromSanity`) include a trimmed project list, or only the detail-view query? Recommend detail-view only to keep list payloads small.

---

## 9. Retrospective Notes (from barbets-duet-full-build + community-network)

- Static data files (`lib/data/`) are the fallback path for all Sanity queries — any type change must maintain backward compatibility with existing static data shapes
- Strict TypeScript is enforced; avoid `as any` workarounds
- Sanity schemas use `reference` fields; GROQ projections map them to slug strings for the TS interface — document this mapping explicitly
- Wave discipline from prior PRDs: keep tasks atomic and independently deployable
