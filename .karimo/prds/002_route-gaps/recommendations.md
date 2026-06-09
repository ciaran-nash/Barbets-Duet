# Brief Review Recommendations — PRD: route-gaps
**Reviewed:** 2026-06-09
**Status:** HOLD — 2 critical issues must be corrected before execution

---

## Summary

| Category | Count |
|---|---|
| Critical | 2 |
| Warnings | 3 |
| Observations | 3 |

---

## Critical Findings

### Critical 1 — RG-6: EarthGlobe Has 5 Live Inbound /sites/ References

**Affected Brief:** `briefs/RG-6_route-gaps.md` — Requirements section, step 1
**Actual State:** `components/EarthGlobe.tsx` lines 13–17 contains 5 hardcoded `url: "/sites/nairobi"`, `"/sites/dar-es-salaam"`, `"/sites/kampala"`, `"/sites/london"`, `"/sites/new-york"` values used in a `markersData` array that drives globe marker link navigation.

**Problem:** The brief's grep safety check will find these references and should halt deletion per its own instructions ("If any other files reference `/sites/`, stop and report — do not delete"). The PRD also incorrectly states "zero inbound `href` references found" — this is false. Deleting `app/sites/` will not break any imports (the components are fine), but the EarthGlobe globe markers will silently become broken links pointing to a 404. The agent following this brief will either (a) stop when grep returns hits and report an error stalling the task, or (b) proceed anyway, silently breaking live globe navigation.

**Correction needed for RG-6:** Add a mandatory remediation step: before deleting, update `components/EarthGlobe.tsx` lines 13–17 to replace all five `/sites/{city}` URL values with the correct `/learning-sites/{slug}` equivalents (or `#` if no match yet). The brief must not claim zero references exist — update the pre-condition to say "verify references and update them first". Also update PRD.md line 85 which states "zero inbound `href` references found across all `app/` and `components/` files" — this is factually wrong.

---

### Critical 2 — RG-5: Legal Layout Will Double-Render Header and StickyFooter

**Affected Brief:** `briefs/RG-5_route-gaps.md` — Implementation Guidance, Legal Layout section
**Actual State:** `app/layout.tsx` does NOT render Header or StickyFooter in the root layout — it only wraps with fonts, `AuthProvider`, and `SmoothScroll`. Each existing page (e.g. `app/stories/page.tsx`) renders its own Header and StickyFooter directly in the page component. This is a per-page shell pattern, not a shared-layout pattern.

**Problem:** The brief's proposed `app/legal/layout.tsx` renders Header and StickyFooter in the layout, then each sub-page would render its content inside `{children}`. This is architecturally correct for Next.js nested layouts — the root layout does NOT render these components, so there is no double render. However, the brief template code for `app/legal/layout.tsx` wraps children with `<main className="pt-40 pb-32 px-6">`. If any legal sub-page also wraps itself in `<main>`, there will be nested `<main>` elements (invalid HTML). The sub-page templates in the brief use a `<>` fragment as the return — so this is fine as long as the agent follows the template exactly.

**Revised assessment:** This is not a double-render issue (root layout is clean). It IS a potential nested-`<main>` issue if the agent deviates from the template. Mark as Warning, not Critical — downgraded below.

---

## Revised Critical Count: 1

The legal layout concern is downgraded to Warning after verifying the root layout. Only Critical 1 (EarthGlobe /sites/ references) is a genuine blocker.

---

## Warnings

### Warning 1 — RG-5: Nested <main> Risk in Legal Layout

**Affected Brief:** `briefs/RG-5_route-gaps.md` lines 111–121 (layout code) and lines 141–177 (sub-page code)

**Problem:** The legal layout wraps children in `<main>`. The sub-page templates use `<>` fragments, which is correct. But if the executing agent adds a `<main>` wrapper inside a page component (common pattern elsewhere in the codebase), the result is `<main><main>...</main></main>` which is invalid HTML and may cause layout issues. The brief should add an explicit note: "Do NOT add a `<main>` element in the sub-page components — the layout already provides it."

**Correction:** Add a callout in the Implementation Guidance: "Sub-page components must return a fragment (`<>`) or a non-`<main>` element. The layout at `app/legal/layout.tsx` already provides the `<main>` wrapper."

---

### Warning 2 — RG-6: Wave Ordering Note in RG-5 Is Inconsistent

**Affected Brief:** `briefs/RG-5_route-gaps.md` line 242
**Actual State:** Line 242 reads "None — Wave 2, can start immediately (parallel with RG-3, RG-4, RG-6)." RG-6 is Wave 1, not Wave 2. Listing it as a parallel Wave 2 task is incorrect.

**Problem:** Low execution risk (waves run sequentially), but creates misleading dependency information. An orchestrator reading this might misorder execution.

**Correction:** Change line 242 in RG-5 to remove RG-6 from the parallel list: "None — Wave 2, can start immediately (parallel with RG-3, RG-4)."

---

### Warning 3 — RG-2: Blog7Demo.tsx Line Numbers Are Off By One

**Affected Brief:** `briefs/RG-2_route-gaps.md` — Blog7Demo.tsx Edit section (lines 202–206)
**Actual State:** Grep confirms `buttonUrl: "#"` is on line 9. The brief says "Line 9: buttonUrl" which matches. However it then says lines 19, 29, 39 for the three post urls. The actual file has `url: "#"` at lines 19, 30, 41 (not 29 and 39).

**Problem:** If the agent applies edits by line number rather than by search, lines 29 and 39 are wrong (actual are 30 and 41). Most agents use search-and-replace, so this is low risk, but the line numbers are misleading.

**Correction:** Update RG-2 line number references for post-2 and post-3 URLs to reflect actual line numbers (30 and 41), or remove specific line numbers and rely on content search.

---

## Observations

### Observation 1 — Next.js 15 `await params` Pattern Is Correctly Specified

**Brief:** RG-3 and RG-4 both correctly specify `params: Promise<{ slug: string }>` with `await params` before destructuring. This matches the established pattern in `app/learning-sites/[slug]/page.tsx` line 7 and `app/stories/[slug]/page.tsx` lines 10/14. No correction needed.

---

### Observation 2 — RG-6 Wave 1 Independence From RG-2 Is Correct

The question of whether RG-6 should depend on RG-2 (Header changes) was raised. There is no dependency: RG-6 deletes `app/sites/` and touches no shared files with RG-2 (`Header.tsx`, `Blog7Demo.tsx`). Wave 1 parallel execution is safe for these two tasks.

---

### Observation 3 — Blog7 Named Export Matches Brief Import

RG-3 imports `{ Blog7 }` from `@/components/blocks/blog7`. The file at `components/blocks/blog7.tsx` line 141 uses `export { Blog7 }` (named export). The import pattern in the brief is correct.

---

## Correction Summary

| Finding | Brief to Correct | Required Change |
|---|---|---|
| Critical 1 | `RG-6_route-gaps.md` + `PRD.md` | Add EarthGlobe remediation step; remove "zero references" claim from both files |
| Warning 1 | `RG-5_route-gaps.md` | Add explicit note that sub-pages must NOT contain a `<main>` element |
| Warning 2 | `RG-5_route-gaps.md` line 242 | Remove RG-6 from parallel task list |
| Warning 3 | `RG-2_route-gaps.md` lines 202–206 | Fix Blog7Demo.tsx line numbers for post-2 (30) and post-3 (41) |

---

## Execution Clearance

**Status: HOLD**

RG-6 must not execute until the EarthGlobe `/sites/` references are accounted for. All other tasks (RG-1 through RG-5) are cleared to proceed as written once Critical 1 is addressed.
