# Task Brief: T05

**Title:** Complete Header nav routes
**PRD:** barbets-duet-full-build
**Priority:** must
**Complexity:** 1/10
**Wave:** 1

---

## Objective

Resolve all remaining `href="#"` placeholder links in `components/Header.tsx` so that every navigation item either points to a real route, a confirmed future route with a TODO comment, or is removed from the nav until the target page exists.

---

## Context

**Parent Feature:** Barbets Duet — Full Platform Build

The Header is the primary navigation surface for all three user journeys (discover, volunteer, donate). Silent `href="#"` links that do nothing on click damage trust and create a broken UX. Some routes targeted by the Header have been partially built (e.g. `/support-us` was already added), while others like `/community` and `/research` don't exist yet.

Research confirmed: Header nav hash anchors were previously replaced with real routes in a prior session — but two `href="#"` values remain in `communityDropdownData`.

This task is **Wave 1** — no dependencies, can run in parallel with other Wave 1 tasks.

---

## Research Context

### Current Header State (from code audit)

The following `href="#"` values remain in `components/Header.tsx`:

```typescript
const communityDropdownData: DropdownData = [
  {
    heading: 'Get Involved',
    links: [
      { text: 'Events', href: '/events' },           // REAL — exists
      { text: 'Support Us', href: '/support-us' },   // REAL — exists (built in T15)
      { text: 'Community & Partnerships', href: '#' }, // PLACEHOLDER
    ]
  },
  {
    heading: 'Resources',
    links: [
      { text: 'Education & Resources', href: '#' },  // PLACEHOLDER
      { text: 'Economic Opportunities', href: '#' }, // PLACEHOLDER
    ]
  }
];
```

The `menuItems` array also has:
```typescript
{ label: 'Get Involved', href: '/support-us' }
// This should likely be '/get-involved' (T14) not '/support-us'
```

### Known Issues to Address

- ⚠️ **"Get Involved" menu item points to `/support-us`** — the top-level nav item labelled "Get Involved" should point to `/get-involved` (the volunteer form, built in T14). `/support-us` is the donations page. These are different user journeys.
- ⚠️ **Three `href="#"` links in communityDropdownData** — these need to be either mapped to real upcoming routes or commented out with TODO markers.

---

## Requirements

1. Remove or replace every `href="#"` in `components/Header.tsx`
2. Fix the "Get Involved" menu item to point to `/get-involved`
3. Map remaining placeholder routes:
   - `Community & Partnerships` → `/community` (built in T24, exists as future route)
   - `Education & Resources` → `/research` (built in T25)
   - `Economic Opportunities` → TBD — either remove from nav or map to `/about/philosophy-history`
4. Add `// TODO(T24): build /community page` style comments on future routes
5. No `href="#"` may remain

---

## Success Criteria

Complete ALL criteria before marking task done:

- [ ] Zero instances of `href="#"` in `components/Header.tsx`
- [ ] "Get Involved" top-level menu item `href` is `/get-involved`
- [ ] `Community & Partnerships` link points to `/community` with a `// TODO(T24)` comment
- [ ] `Education & Resources` link points to `/research` with a `// TODO(T25)` comment
- [ ] `Economic Opportunities` either removed or mapped to an existing route
- [ ] All existing working links (`/about`, `/about/mission-vision`, etc.) remain unchanged
- [ ] `npx tsc --noEmit` passes

---

## Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `components/Header.tsx` | modify | Replace all `href="#"` with real routes or remove items |

---

## Implementation Guidance

### Before Starting — Verify Actual File State

Run this command first to confirm exact line numbers and current `href="#"` occurrences:

```bash
grep -n 'href="#"' components/Header.tsx
```

The research context above documents what was found at review time, but the executor must confirm the actual state of the file before making changes. Reference the real line numbers from this output, not assumptions.

Also note: `/learning-sites` in `aboutDropdownData` under "Our Work" is a real link that currently 404s because `app/learning-sites/page.tsx` does not exist yet — it is built in T12 (Wave 3). Do not remove or comment out this link. This is a known pre-existing 404 and is expected.

### Recommended Final Link Structure

```typescript
const communityDropdownData: DropdownData = [
  {
    heading: 'Get Involved',
    links: [
      { text: 'Events', href: '/events' },
      { text: 'Support Us', href: '/support-us' },
      { text: 'Volunteer', href: '/get-involved' },
      // TODO(T24): { text: 'Community & Partnerships', href: '/community' },
    ]
  },
  {
    heading: 'Resources',
    links: [
      // TODO(T25): { text: 'Research Hub', href: '/research' },
      { text: 'About Our Mission', href: '/about/mission-vision' },
    ]
  }
];

const menuItems: MenuItem[] = [
  { label: 'About', dropdownData: aboutDropdownData },
  { label: 'Community', dropdownData: communityDropdownData },
  { label: 'Get Involved', href: '/get-involved' }, // was '/support-us'
];
```

### Important: Don't Break Working Links

The `aboutDropdownData` links (`/about`, `/about/mission-vision`, `/about/philosophy-history`, `/projects`, `/learning-sites`, `/stories`) are all real routes. Do not touch them.

### TODO Comment Style

Use consistent TODO comments so they're findable later:
```typescript
// TODO(T24): Uncomment when /community page is built
// { text: 'Community & Partnerships', href: '/community' },
```

---

## Boundaries

### Files You MUST NOT Touch

- `.env*`, `firebase-applet-config.json`, `firestore.rules`
- `components/ui/`
- `lib/firebase.ts`, `components/AuthProvider.tsx`

---

## Dependencies

### Upstream Tasks

None — no dependencies.

### Downstream Impact

No tasks depend on this one, but fixing `/get-involved` routing ensures T14's new page is discoverable from day one of launch.

---

## Commit Guidelines

```
fix(nav): resolve all href="#" placeholders in Header navigation

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Validation Checklist

- [ ] All success criteria met
- [ ] `npx tsc --noEmit` passes
- [ ] Click-test: every visible nav link either navigates or is commented out
- [ ] No silent dead links remain

---

*Generated by KARIMO Brief Writer*
*PRD: barbets-duet-full-build | Task: T05 | Wave: 1*
