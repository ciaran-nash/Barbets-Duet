# PRD Review: data-model-unify (C1–C7)

Reviewed: 2026-06-09
Branch: feature/barbets-duet-full-build
Reviewer: KARIMO Brief Reviewer

---

## Critical (must fix before execution)

- [C3] **ImpactGrid.tsx strict-null guidance is inverted — executor may introduce an unnecessary change.**
  C3 brief (line 66) says: "if TypeScript strict mode flags `stat.description` as potentially undefined in JSX, add a fallback: `{stat.description ?? ''}`. Check whether TypeScript raises this error — if it does, fix it."
  TypeScript strict mode does NOT raise an error for `{undefined}` in JSX. Rendering `{stat.description}` where `description` is `string | undefined` is valid TypeScript — React simply renders nothing. The executor may waste time "fixing" a non-existent error, or — worse — introduce `{stat.description ?? ''}` unnecessarily to satisfy a check that never fires. The guidance should be: "No change needed. TypeScript does not flag rendering optional strings in JSX."

- [C4] **`@portabletext/types` is absent from `package.json` but the brief treats this as a "verified" fact from a prior scan.** Confirmed correct — 0 hits for `portabletext` in `package.json`. This is not a finding error, but it means the executor MUST run `npm install @portabletext/types` and commit both `package.json` and `package-lock.json`. The brief is clear on this. However: the brief also says "check package.json again during C4 in case C5 runs concurrently" — C3, C4, and C6 are all Wave 2 and described as "running in parallel." If a parallel executor runs C4 and C6 at the same time, only `package.json` is touched by C4 (C6 does not touch it), so there is no race on `package.json`. But if the orchestrator dispatches C4 and C5 in parallel (they are Wave 2 and Wave 3 respectively, so this should not happen), `package.json` would be modified twice. Confirm the orchestrator respects wave sequencing: C5 must not start until C4 finishes.

- [C5] **`as PortableTextBlock[]` cast guidance is misleading — may confuse executor and obscure a real type error.**
  C5 brief (lines 119, 165) says: "TypeScript may not narrow all the way to `PortableTextBlock[]`… it may infer `PortableTextBlock[] | string[]`." This is incorrect. After `Array.isArray(story.content)` where `story.content: string | PortableTextBlock[]`, TypeScript's control-flow analysis narrows the truthy branch to `PortableTextBlock[]` cleanly. A `string` is not an array, so TS eliminates it in the truthy branch. The cast `as PortableTextBlock[]` is therefore **redundant**, not necessary. This matters because: (1) if the cast is included and ESLint ever gains `@typescript-eslint/no-unnecessary-type-assertion`, it will flag it; (2) the false justification for the cast may make the executor less confident about real type errors elsewhere. Fix: change the guidance to "No cast needed — `Array.isArray` narrows correctly. The `value` prop of `<PortableText>` will accept `PortableTextBlock[]` without a cast."

---

## Warnings (should address)

- [C4 + C5] **Package installs are split across two tasks touching `package.json` sequentially.** C4 installs `@portabletext/types` in Wave 2; C5 installs `@portabletext/react` in Wave 3. Since waves are sequential this is safe — no merge conflict risk. However, combining both installs into C4 (or into a dedicated Wave 1 "install dependencies" step before C2) would eliminate any risk of an executor forgetting the install in C5 and produce a cleaner commit history. As-is it will work, but consider consolidating if the orchestrator supports multi-package installs.

- [C2] **`ImpactMetric.unit` was required (`string`); `ImpactPoint.unit` is optional (`string?`).** The brief addresses the `description` widening in the backward-compat note, but does NOT mention the `unit` widening for `ImpactMetric`. After C2, any code holding an `ImpactMetric` value is now dealing with `unit?: string`. In `CinematicReader.tsx`, `metric.unit` access is already guarded (`{metric.unit && ...}`). In `ProjectCard.tsx` (line 68) and `ProjectDetailDrawer.tsx` (line 93), `{metric.unit}` and `{m.unit}` are rendered inline without a guard — this is safe in JSX (renders nothing for undefined) and TypeScript strict does NOT error on JSX `{undefined}`. Confirm the executor understands this. If a guard is added for consistency, it should be `{metric.unit && <span>{metric.unit}</span>}`, not an inline `??`. Not a failure risk, but the brief omits mentioning the `unit` widening alongside the `description` widening.

- [C6] **GROQ insertion-point line numbers will have shifted after C2 runs.** C6 brief says "insert `getProjectsBySite` after line 134 (`getAllLearningSitesFromSanity` closes) and before line 136 (`// ─── Stories` divider)." As of codebase scan, `getAllLearningSitesFromSanity` ends at line 134 and the Stories divider is line 136. After C2 runs, `lib/sanity/queries.ts` is not modified (C2 only touches type files), so the line numbers are accurate. However, the executor should read the file at execution time rather than rely on the stated line numbers, which the brief correctly advises: "Find insertion point; review existing query patterns." No action needed, but confirm the executor reads the file fresh.

- [C7] **`eslint .` success criterion may surface pre-existing warnings that fail the check.** C7 requires `eslint . exits 0 (no new errors)`. The brief acknowledges "pre-existing lint warnings are acceptable if they predate this PRD" but the success criteria checkbox says "eslint . exits 0." If any pre-existing rule has exit-code impact, this criterion as written would fail through no fault of C7. Suggest amending the C7 success criteria to: "eslint . exits 0 OR reports only warnings that existed before this PRD (run `git stash && eslint . 2>&1` to establish baseline)."

---

## Observations (informational)

- [C1] `types/shared.ts` confirmed absent. `ls types/` claim in brief is accurate — the six files listed match the actual directory contents (community.ts, forum.ts, learning-site.ts, narrative.ts, project.ts, team.ts). No surprises.

- [C2] The type alias approach (`export type ImpactStat = ImpactPoint`) will work correctly with TypeScript's structural typing. Because `ImpactPoint` is a structural superset of all three original types, all existing static data (stories.ts, learning-sites.ts, projects.ts) satisfies the new shape. All static data entries that were valid before remain valid after — no data objects need updating.

- [C3] All three files listed in C3 are confirmed: `ImpactGrid.tsx` imports `ImpactStat` by name (line 5), `ProjectCard.tsx` and `ProjectDetailDrawer.tsx` access metrics via the `Project` type only. After C2's alias, `ImpactStat` resolves transparently. C3 is likely a no-op task (verify + optionally update import style). The file boundary between C3 and C5 is clean — C3 must not touch `CinematicReader.tsx`.

- [C5] `CinematicReader.tsx` is confirmed 208 lines. The `<ReactMarkdown>` call is on line 131. The prose wrapper `<div>` spans lines 119–132. All line references in C5 brief are accurate.

- [C6] Circular dependency check: `learning-site.ts` importing `Project` from `project.ts` is safe. `project.ts` has `siteSlug: string` (not a `LearningSite` reference), so no circular type import.

- [C6] The GROQ projection in `getProjectsBySite` includes all required `Project` fields: `slug`, `title`, `description`, `category`, `siteSlug`, `maturity`, `image`, `impactMetrics`, `innovationSummary`, `longDescription`. The optional `featured` field is also included. The `impactMetrics[] { label, value, unit }` sub-projection correctly omits `description` and `trend` (which are `ImpactPoint` optional fields not stored on project impact metrics in Sanity). This projection is correct.

- [C7] `BarbetsEvent.siteSlug` exists on line 32 of `types/narrative.ts`. The GROQ event query (`getEventFromSanity`, line 208) maps `"siteSlug": associatedSite->slug.current`. Static data in `lib/data/events.ts` sets `siteSlug` directly. Both paths confirmed — the JSDoc documentation in C7 is accurate and the comment content is correct.

- [All] `@portabletext/types` and `@portabletext/react` are both confirmed absent from `package.json`. `react-markdown` is present (`"react-markdown": "^10.1.0"`). `npm` with `package-lock.json` is the package manager (no yarn.lock or pnpm-lock.yaml).

---

## Wave/Dependency Map Verification

| Task | Wave | Depends On | Verified |
|------|------|------------|---------|
| C1 | 1 | none | Correct |
| C2 | 1 | C1 | Correct — C1 creates types/shared.ts which C2 imports |
| C3 | 2 | C2 | Correct — aliases must exist before verifying components |
| C4 | 2 | C2 | Correct — types/narrative.ts must have alias before adding PortableTextBlock |
| C5 | 3 | C4 | Correct — Story.content union type must exist before renderer update |
| C6 | 2 | C2 | Correct — types/project.ts alias must exist before LearningSite imports Project |
| C7 | 3 | C3, C5, C6 | Correct — all prior tasks must complete before final validation |

Wave 2 parallelism (C3 + C4 + C6 concurrent) is safe: no two of these tasks write the same file. C4 writes `types/narrative.ts` and `package.json`; C3 writes `components/learning-sites/ImpactGrid.tsx`, `components/projects/ProjectCard.tsx`, `components/projects/ProjectDetailDrawer.tsx`; C6 writes `types/learning-site.ts` and `lib/sanity/queries.ts`. No overlaps.

