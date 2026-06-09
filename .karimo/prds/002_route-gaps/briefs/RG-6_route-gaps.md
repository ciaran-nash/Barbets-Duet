# Task Brief: RG-6

**Title:** Delete legacy /sites/[id] route
**PRD:** route-gaps
**Priority:** must
**Complexity:** 2/10
**Model:** sonnet
**Wave:** 1
**Feature Issue:** (see GitHub issue for route-gaps PRD)

---

## Objective

Delete the `app/sites/` directory entirely. This removes a legacy stub route (`/sites/[id]`) that predates the `learning-sites` route and uses hardcoded picsum placeholder data. Before deleting, update the 5 hardcoded `/sites/{city}` URLs in `components/EarthGlobe.tsx` to point to `/learning-sites/{slug}` — these are broken links that will 404 after deletion if not fixed first.

---

## Context

**Parent Feature:** route-gaps PRD — "Stub Missing Sitemap Routes"

`app/sites/[id]/page.tsx` is a legacy file that:
- Uses hardcoded picsum.photos image URLs (not real content)
- Imports components (`SaveButton`, `ShareButton`, `PhotoGallery`) that may or may not have other uses
- Has been superseded by the community learning-sites route

`components/EarthGlobe.tsx` lines 13–17 contains 5 hardcoded `url` values in `markersData` that point to `/sites/nairobi`, `/sites/dar-es-salaam`, `/sites/kampala`, `/sites/london`, `/sites/new-york`. These must be updated to `/learning-sites/{slug}` equivalents before the `app/sites/` directory is deleted — otherwise globe marker navigation will silently break.

The task is to fix EarthGlobe URLs, then verify safety and delete. `EarthGlobe.tsx` will be modified as part of this task.

This task is part of **Wave 1** — no dependencies, can start immediately.

---

## Requirements

1. **Fix EarthGlobe marker URLs** — Before deleting, update `components/EarthGlobe.tsx` lines 13–17. Replace all five `/sites/{city}` URL values in `markersData` with the correct `/learning-sites/{slug}` equivalents:
   ```tsx
   { id: '1', ..., url: "/learning-sites/nairobi" },
   { id: '2', ..., url: "/learning-sites/dar-es-salaam" },
   { id: '3', ..., url: "/learning-sites/kampala" },
   { id: '4', ..., url: "/learning-sites/london" },
   { id: '5', ..., url: "/learning-sites/new-york" },
   ```

2. **Grep verification** — After fixing EarthGlobe, run the following search to confirm no remaining inbound references:
   ```bash
   grep -r '/sites/' app/ components/ --include="*.tsx" --include="*.ts" -l
   ```
   The only result should be `app/sites/[id]/page.tsx` itself. Hits in `components/EarthGlobe.tsx` are expected before step 1 — they must be gone after. If any other files still reference `/sites/`, stop and report — do not delete.

3. **Delete the directory** — Remove `app/sites/` entirely (the directory and all contents):
   - `app/sites/[id]/page.tsx`
   - `app/sites/[id]/` directory
   - `app/sites/` directory

4. **Verify no broken imports** — The file imports `SaveButton`, `ShareButton`, and `PhotoGallery`. Confirm these components are used elsewhere in the codebase (they should be) — deleting the page file should not remove the components themselves.

5. **Build check** — Run `next build` to confirm the deletion does not break the build.

---

## Success Criteria

Complete ALL criteria before marking task done:

- [ ] `components/EarthGlobe.tsx` `markersData` URLs updated: all 5 entries use `/learning-sites/{slug}` (no `/sites/` URLs remain)
- [ ] Globe markers link to valid routes — navigating a marker URL does not 404
- [ ] Grep confirms zero inbound references to `/sites/` outside of `app/sites/[id]/page.tsx` before deletion
- [ ] `app/sites/` directory no longer exists
- [ ] `app/sites/[id]/page.tsx` no longer exists
- [ ] `SaveButton`, `ShareButton`, `PhotoGallery` components still exist in `components/` (they were only imported, not owned, by the deleted file)
- [ ] `npx tsc --noEmit` passes
- [ ] `next build` passes
- [ ] No broken imports remain

**All criteria must pass before task is complete.**

---

## Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `components/EarthGlobe.tsx` | modify | Update 5 marker URLs from `/sites/{city}` to `/learning-sites/{slug}` |
| `app/sites/[id]/page.tsx` | delete | Legacy stub — superseded by learning-sites route |
| `app/sites/[id]/` | delete | Empty after page deletion |
| `app/sites/` | delete | Empty after subdirectory deletion |

### File Ownership Notes

`components/EarthGlobe.tsx` must be modified before deletion. The only file deleted is `app/sites/[id]/page.tsx`. The components it imported (`SaveButton`, `ShareButton`, `PhotoGallery`) live in `components/` and are not deleted.

---

## Implementation Guidance

### Step 1: Fix EarthGlobe Marker URLs

Open `components/EarthGlobe.tsx`. At lines 13–17 the `markersData` array has 5 entries with hardcoded `/sites/{city}` URL values. Update each entry:

```tsx
const markersData = [
  { id: '1', lat: -1.2921, lng: 36.8219, title: "Nairobi, Kenya", subtitle: "Eco-tourism & Reforestation", url: "/learning-sites/nairobi" },
  { id: '2', lat: -6.7924, lng: 39.2083, title: "Dar es Salaam, Tanzania", subtitle: "Sustainable Agriculture Markets", url: "/learning-sites/dar-es-salaam" },
  { id: '3', lat: 0.3476, lng: 32.5825, title: "Kampala, Uganda", subtitle: "Wetland Protection Incentives", url: "/learning-sites/kampala" },
  { id: '4', lat: 51.5074, lng: -0.1278, title: "London, UK", subtitle: "Global Convention 2024", url: "/learning-sites/london" },
  { id: '5', lat: 40.7128, lng: -74.0060, title: "New York, USA", subtitle: "Climate Conference 2023", url: "/learning-sites/new-york" },
];
```

No other changes to `EarthGlobe.tsx`.

### Step 2: Safety Check Before Deleting

After fixing EarthGlobe, run this grep to verify zero remaining inbound references:

```bash
grep -r 'href.*\/sites\/' /Users/ciarannash/Documents/Barbets/Barbets-Duet/app/ \
     /Users/ciarannash/Documents/Barbets/Barbets-Duet/components/ \
     --include="*.tsx" --include="*.ts"
```

Also check for any import of the page itself:

```bash
grep -r 'sites/\[id\]\|sites/\[' /Users/ciarannash/Documents/Barbets/Barbets-Duet/app/ \
     /Users/ciarannash/Documents/Barbets/Barbets-Duet/components/ \
     --include="*.tsx" --include="*.ts"
```

If either grep returns hits outside of `app/sites/[id]/page.tsx`, stop and report the references before proceeding.

### Step 3: Delete the Directory

In the worktree, delete the files:

```bash
rm app/sites/[id]/page.tsx
rmdir app/sites/[id]
rmdir app/sites
```

Or as a single command:

```bash
rm -rf app/sites/
```

### Step 4: Verify Components Still Exist

After deletion, confirm the imported components are still present:

```bash
ls components/SaveButton.tsx
ls components/ShareButton.tsx
ls components/PhotoGallery.tsx
```

All should exist (they are used elsewhere in the codebase).

### Step 5: Build Verification

```bash
npx tsc --noEmit
next build
```

Both must pass cleanly.

### Code Style

No code is written for this task. The work is deletion + verification.

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
- `components/SaveButton.tsx` — do not delete (used elsewhere)
- `components/ShareButton.tsx` — do not delete (used elsewhere)
- `components/PhotoGallery.tsx` — do not delete (used elsewhere)

### Files Requiring Review

None touched by this task.

---

## Dependencies

### Upstream Tasks

None — Wave 1, can start immediately.

### Downstream Impact

None — no tasks depend on RG-6. Deleting the route cannot cause import errors in other files (confirmed by grep).

---

## GitHub Context

**Branch:** `feature/barbets-duet-full-build`
**Brief:** `.karimo/prds/002_route-gaps/briefs/RG-6_route-gaps.md`

---

## Commit Guidelines

```
chore(sites): delete legacy /sites/[id] stub route

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Validation Checklist

Before marking complete:
- [ ] `components/EarthGlobe.tsx` updated — all 5 `markersData` URLs use `/learning-sites/{slug}`
- [ ] Grep confirmed zero inbound `/sites/` references outside `app/sites/[id]/page.tsx`
- [ ] `app/sites/` directory is gone
- [ ] `SaveButton`, `ShareButton`, `PhotoGallery` still exist in `components/`
- [ ] Type check passes: `npx tsc --noEmit`
- [ ] Build passes: `next build`
- [ ] No `never_touch` files modified

---

*Generated by KARIMO Brief Writer*
*PRD: route-gaps | Task: RG-6 | Wave: 1*
