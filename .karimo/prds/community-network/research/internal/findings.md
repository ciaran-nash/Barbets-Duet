# Internal Research Findings: community-network

## 1. Existing Component Patterns

**What exists:**

- **Card system** (`components/ui/card.tsx`): shadcn Card/CardHeader/CardContent/CardFooter — generic, composable, Tailwind-based. Used by `RadialOrbitalTimeline` for node detail panels.
- **SiteCard** (`components/learning-sites/SiteCard.tsx`): Domain-specific card with hero image, category pill, partner tags, hover/selected states, and ring highlights. Direct ancestor for `MemberCard`.
- **SitesBrowse** (`components/learning-sites/SitesBrowse.tsx`): Map-plus-card-list split layout (50/50 sticky map, scrollable card panel) — directly reusable for `/community` browse.
- **Motion system**: `KineticReveal` (slice reveal for headings) and `ScrollGlow` (atmospheric glow orbs). Both use `framer-motion` ^12.
- **RadialOrbitalTimeline** (`components/ui/radial-orbital-timeline.tsx`): Interactive orbital graph with expandable node connections. Directly usable for Pentangle visualization.
- **Header** (`components/Header.tsx`): Has commented-out `/community` link with `TODO(T24)`. Nav hook point already prepared.
- **Forms**: `VolunteerForm` establishes multi-step pattern. Input/label primitives exist at `components/ui/input.tsx`, `label.tsx`. Focus ring: `focus:ring-2 focus:ring-viridian` (consistent).
- **Tabs** (`components/ui/tabs.tsx`): Available for site community page tabs.

**What's missing:**

- `MemberCard` component
- Modal/overlay component for profile expansion
- Sidebar layout for nested community spaces

**Recommendation:** Fork `SiteCard` → `MemberCard`. Reuse `SitesBrowse` for `/community` browse. Use `RadialOrbitalTimeline` for Pentangle visualization.

**Priority:** SiteCard → MemberCard: blocking. Modal: helpful. Sidebar nav: nice-to-have.

---

## 2. Data Layer Patterns

**What exists:**

- `LearningSite` type (`types/learning-site.ts`): `lat`, `lng`, `leadPartners: string[]`, `relatedSitesSlugs?: string[]`, `founderNames`, `memberNames`, `testimonial`. No `members` array.
- `TeamMember` type (`types/team.ts`): `slug`, `name`, `role`, `bio`, `location`, `siteSlug`, `siteSlugs?: string[]`, `avatar?`, `joinedYear`, `isCoreTeam`. Closest thing to a member profile.
- `Story` type (`types/narrative.ts`): Has `siteSlug?`. No `author` or `contributor` field.
- `BarbetsEvent` type (`types/narrative.ts`): Has `siteSlug?`. No `attendees` or `rsvp`.
- `Project` type (`types/project.ts`): Has `siteSlug`. No `contributors` or `author`.
- `UserProfile` (`DashboardClient.tsx`): `displayName`, `bio`, `createdAt`, `updatedAt` — Firestore document schema at `users/{uid}` already in production.
- `getRelatedSites(slug)` helper: Maps site relationship graph — reusable pattern for network traversal.

**What's missing:**

- `members` field on `LearningSite` — sites have `leadPartners: string[]` (names only).
- No `Contribution` interface (contribution history, Barbet circle entries).
- No `PentangleGroup` type or governance data structure.
- `Story`/`Project`/`Event` types lack `author` or `contributors` fields.
- `TeamMember.avatar` is optional but never populated.

**Recommendation:** Create `types/member.ts` extending `TeamMember` with `contributionHistory`, `siteRoles`, `barbetCircle` prompt field. Create `types/contribution.ts`. Add optional `contributorSlugs?: string[]` to narrative types without breaking existing data.

**Priority:** `types/member.ts` and Firestore member schema: blocking. Contribution type: helpful.

---

## 3. State Management & Auth

**What exists:**

`AuthProvider` (`components/AuthProvider.tsx`) is a React Context wrapper over Firebase Auth, exposing `user: User | null`, `loading: boolean`, `signInWithGoogle()`, `logOut()`. `user` is raw Firebase `User` (uid, displayName, email, photoURL).

`DashboardClient.tsx` pattern: `users/{uid}` Firestore document stores `displayName`, `bio`, `createdAt`, `updatedAt`. Subcollection `users/{uid}/saved_events` already in use.

**What's missing:**

- No `role` field on user or Firestore document — cannot distinguish member, coordinator, friend, or moderator.
- No site-level membership or permissions — no `users/{uid}/sites` subcollection or `siteRoles` map.
- No `profile.siteSlug` linking authenticated user to `LearningSite` or `TeamMember`.

**Recommendation:** Extend Firestore `users/{uid}` with `role: 'member' | 'coordinator' | 'friend'`, `siteSlug?: string`, `memberSlug?: string` (links to TeamMember slug). Expose `profile` object from `AuthProvider` context so components don't re-fetch. Site-level moderation via Firestore security rules checking `siteRoles`.

**Priority:** Role field: blocking for governance. Site linkage: blocking for `/community/[member-id]`.

---

## 4. Geospatial & Map Patterns

**What exists:**

`SitesMap` (`components/learning-sites/SitesMap.tsx`) uses `react-map-gl` ^8 over `maplibre-gl` ^5 with Stadia Maps tiles (fallback to open demo tiles). Renders `<Marker>` buttons with `aria-label`, `<Popup>` with close button. Styling: dark night-forest theme, neon-lime active markers with `animate-ping` pulse ring.

Fully componentized: `sites`, `activeSiteSlug`, `onSiteClick`, `onSiteHover`, `popupSiteSlug`, `onPopupClose` props.

`LearningSite.lat` and `LearningSite.lng` are required — all 11 sites have coordinates.

`lib/map/style.json` is a placeholder.

**What's missing:**

- No multi-layer support (corridors, network edges, Pentangle regions).
- No GeoJSON source/layer pattern — marker-only.
- No relationship visualization between sites (no lines for `relatedSitesSlugs`).

**Recommendation:** `SitesMap` is directly reusable for `/community` member-location overview. For Pentangle relationships, add GeoJSON LineLayer connecting sites via `relatedSitesSlugs`. For `/community/network` Pentangle view, use `RadialOrbitalTimeline` (better fit than map).

**Priority:** Current map reuse: blocking. GeoJSON edges: helpful. RadialOrbitalTimeline: blocking for `/community/network`.

---

## 5. Content Model Gaps

| Required | Status |
|---|---|
| Member profile type | Missing — `TeamMember` exists but lacks contribution/role fields |
| User-to-member linkage | Missing — no `memberSlug` on Firebase user |
| Contribution history | Missing |
| Barbet circle prompt | Missing |
| Author/contributor on Story/Project | Missing — `siteSlug` only |
| Site members list | Missing — `leadPartners: string[]` unsorted names only |
| PentangleGroup type | Missing entirely |
| Governance docs | Missing |
| Member avatar | Exists on `TeamMember` but always `undefined` |

`relatedSitesSlugs` and `siteSlugs` demonstrate the codebase already anticipates graph relationships — pattern is established, just not extended to community.

---

## 6. Offline / PWA Patterns

**What exists:** None. No service worker, no Web App Manifest, no `next-pwa` configuration, no `public/` directory.

**What's missing:** Everything PWA-related. Single largest architectural gap for rural accessibility.

**Recommendation:** Install `@ducanh2912/next-pwa` (maintained fork). At minimum: `public/manifest.json`, service worker registration, network-first cache strategy for API routes with offline fallback for static pages. Forms use optimistic UI with local queue (localStorage/IndexedDB) for low-bandwidth submission. Cannot be retrofitted — must be day-one decision.

**Priority:** Blocking for rural accessibility. Dedicated sub-task in T24.

---

## 7. Accessibility Audit

**Good patterns:**

- `aria-label` on map markers: `aria-label={\`${site.name} — ${site.location}\`}`.
- `aria-label` on mobile menu toggles.
- Focus rings: `focus:outline-none focus:ring-2 focus:ring-viridian` (consistent).
- `lang="en"` on `<html>`.
- Alt text on most `<Image>` uses (though some generic: `alt="Gallery item"`).

**Missing:**

- No `tabIndex` or `onKeyDown` on custom interactive elements — `RadialOrbitalTimeline` nodes click-only, not keyboard-navigable. WCAG 2.1 Level AA blocker.
- `role` attribute absent on custom patterns — orbital timeline nodes have no `role="button"` or `role="tab"`.
- Generic alt text: `alt="Gallery ${idx}"`, `alt="Detail"`.
- Color contrast: `text-foreground/50` and `text-foreground/40` need verification against `platinum` and `night-forest` backgrounds.
- No alt text mechanism for community member-uploaded images.

**Recommendation:** Establish accessible card pattern from start: `role="button"` or `role="article"` on cards, `tabIndex={0}` with `onKeyDown` handlers on custom interactive divs. Patch `RadialOrbitalTimeline` with keyboard navigation before use in Pentangle. Add `altText` field to contribution schema for user uploads.

**Priority:** Keyboard navigation on RadialOrbitalTimeline: blocking. Generic alt text: helpful. Color contrast audit: nice-to-have.

---

## Key Architectural Decisions for T24

1. **Member model = Firestore + TeamMember type.** `users/{uid}` Firestore document is auth anchor; new `Member` type bridges to site data. Build `members` Firestore collection mirroring `team.ts` slugs.

2. **SitesBrowse layout is template for `/community`.** Reuse 50/50 sticky-map + scrollable-cards pattern.

3. **RadialOrbitalTimeline is Pentangle visualization.** Already handles orbital relationship graphs. Needs theming and keyboard accessibility before production.

4. **PWA is day-one architectural decision.** No existing foundation. Start T24 with `public/manifest.json` and service worker setup.

5. **Header nav has `/community` hook point.** `communityDropdownData` in `Header.tsx` line 58–59 is commented out with `TODO(T24)` — uncomment as first sub-task.
