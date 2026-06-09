# PRD: Admin Portal

**Slug:** `admin-portal`
**Created:** 2026-06-10
**Status:** draft
**Author:** ciaran-nash
**Branch:** feature/barbets-duet-full-build

---

## Executive Summary

Barbets Duet staff currently cannot publish Trial & Error entries, manage member roles, or monitor the peer review chain without developer involvement. This PRD delivers a protected admin portal (`/admin`) that covers the admin-gated side of the community-network feature set: T&E moderation, member role management, peer review oversight, and pentangle group management.

The portal is built on Supabase auth + `member_role` RLS (introduced in PR #9) and extends the existing Arcjet middleware. It does not duplicate the community-facing contribution or display work completed in community-network waves 5–6.

**Success = staff can create, review, and publish a T&E entry end-to-end without a developer.**

---

## Scope Boundary

### In scope (this PRD)

| Feature | Description |
|---|---|
| Auth/role middleware | Gate `/admin` (coordinator+admin), `/superadmin` (admin only) via Supabase session |
| T&E moderation queue | Review draft submissions, enforce 4 mandatory prompts, publish or reject |
| Member role management | List members, assign `coordinator` / `admin` roles via `member_role` enum |
| Peer review oversight | View circular chain, flag overdue self-assessments, view pentangle assignments |
| Pentangle group management | Create, edit, assign sites to pentangle groups |

### Out of scope (future PRDs)

| Feature | Reason |
|---|---|
| PWA offline-first sync | Significant separate effort — PWA PRD |
| GIS map layer editing | Requires GIS tooling — GIS PRD |
| Financial tracking / kitty fund | Finance PRD |
| Convention archive upload | Content PRD |
| Auto-update Impact Dashboard on T&E publish | Phase 2 hook — deferred |
| Impact/GIS data entry | GIS PRD |

---

## Users

| Role | Access | Primary actions |
|---|---|---|
| Admin | `/admin` + `/superadmin` | All operations |
| Coordinator | `/admin` only | T&E moderation, peer review oversight |
| Member | No admin access | N/A |

---

## Auth & Role Model

Source of truth: PR #9 community schema (Supabase migration).

- `member_role` enum values: `member`, `coordinator`, `admin`
- `/admin` routes: require `coordinator` or `admin`
- `/superadmin` routes: require `admin` only
- RLS policies on `contributions`, `profiles`, `peer_review_assignments`, `pentangle_groups` enforce server-side access control
- Supabase session cookie used in middleware; no Firebase auth for admin routes
- Existing `components/AuthProvider.tsx` (Firebase) remains untouched — it serves `/dashboard` only

---

## Requirements

### AP1 — Supabase auth helper + role check utilities

Create `lib/supabase/admin-auth.ts` with:
- `getSessionUser()` — reads Supabase server session from cookies
- `requireRole(roles: MemberRole[])` — throws redirect if session user lacks required role
- `MemberRole` type derived from DB enum

### AP2 — Middleware route protection

Extend `middleware.ts` (currently Arcjet-only) to:
- Match `/admin/*` and `/superadmin/*` paths
- Call Supabase session check
- Redirect unauthenticated users to `/auth/login`
- Redirect insufficient-role users to `/403`
- Compose with existing Arcjet rules (Arcjet runs first, then role check)

Existing Arcjet volunteer/donation rate limiting must not regress.

### AP3 — Admin layout + nav shell

Create `app/admin/layout.tsx`:
- Sidebar nav: T&E Queue, Members, Peer Review, Pentangles
- Role-aware: coordinator sees T&E Queue + Peer Review; admin sees all including Members + Pentangles (superadmin sub-nav)
- Brand tokens: Night Forest bg, Neon Lime active state, DM Sans nav labels
- Responsive: sidebar collapses to top bar on mobile

### AP4 — T&E submission review queue

`app/admin/submissions/page.tsx` + supporting components:

- List all `contributions` where `status = 'draft'`
- Per-submission: author name, site slug, submitted date, prompt completion status (4/4 mandatory)
- Click to expand full submission detail inline
- Show warning badge if any of the 4 mandatory prompts is empty
- Filter tabs: Draft / Published / Rejected

4 mandatory prompts (from community-network T&E schema):
1. What did you try?
2. What happened?
3. What did you learn?
4. What would you do differently?

### AP5 — T&E publish/reject actions

Server actions in `app/admin/submissions/actions.ts`:
- `publishSubmission(id)` — sets `contributions.status = 'published'`, sets `published_at = now()`
- `rejectSubmission(id, reason)` — sets `contributions.status = 'rejected'`, stores reason
- Both protected by RLS + server-side role check (coordinator or admin)
- Optimistic UI update on client after action
- Toast notification on success/failure

Acceptance: rejected submissions show rejection reason to original author in their community profile.

### AP6 — Member list + role assignment UI

`app/admin/members/page.tsx` (admin-only, `/superadmin` sub-path):
- List all profiles with current `member_role`
- Search by name/email
- Inline role selector: `member` | `coordinator` | `admin` (dropdown)
- Role change triggers `UPDATE profiles SET member_role = $1 WHERE id = $2` via server action
- Confirm modal before elevating to `admin`
- Pagination: 50 per page

### AP7 — Peer review chain overview + overdue flagging

`app/admin/peer-review/page.tsx`:
- Visualise circular chain: site A reviews site B reviews site C... (ring diagram using existing community-network peer review schema)
- List all open self-assessments with due date
- Flag overdue: red badge if `due_date < now()` and `status != 'complete'`
- Bulk action: send reminder notification to overdue site (stub — logs to console in this PRD; real notifications are a future PRD)
- Read-only chain view (chain assignment itself is out of scope — managed at DB level)

### AP8 — Pentangle group management

`app/admin/pentangles/page.tsx` (admin-only):
- List existing pentangle groups with member sites
- Create group: name + select up to 5 sites from learning sites list
- Edit group: add/remove sites (max 5)
- Delete group (with confirm)
- Each group links to relevant peer review assignments

---

## Design System

Inherit from project-wide design system (DESIGN.md). Admin-specific overrides:

- **Background:** Night Forest (`#06211A`) for sidebar, Platinum (`#F4F4F5`) for content area
- **Active nav:** Neon Lime (`#DBFF66`) left border + text
- **Status badges:** Neon Lime (published), Viridian (draft), red-500 (overdue/rejected)
- **Typography:** DM Sans throughout admin UI (no BioRhyme in data tables)
- **WCAG 2.2 AA:** all interactive elements meet 4.5:1 contrast ratio

Skills: `design-taste-frontend` applied to all tasks. No `high-end-visual-design` — admin UI is functional, not editorial.

---

## Technical Constraints

- Next.js 15 App Router, TypeScript strict mode
- Supabase client: `@supabase/ssr` for server component + server action patterns
- No Firebase usage in admin routes — Supabase auth only
- Arcjet middleware composition: admin role check added after Arcjet shield/bot rules
- RLS is the authoritative security layer; middleware is a UX redirect layer only
- No new DB migrations in this PRD — all schema comes from PR #9

---

## Dependencies

| Dependency | Type | Notes |
|---|---|---|
| PR #9 (community schema) | Hard blocker | Provides `member_role` enum, `contributions`, `peer_review_assignments`, `pentangle_groups` tables and RLS policies. Must merge before execution. |
| community-network PRD waves 5-6 | Soft dependency | `ContributionFeed.tsx`, T&E submission form, and peer review schema already built. This PRD does not rebuild them. |
| T16 (Arcjet middleware) | Done | Arcjet base installed. AP2 extends it. |
| `@supabase/ssr` package | New install | Not yet in package.json. AP1 installs it. |

---

## Open Questions

| Question | Status |
|---|---|
| Does PR #9 include `due_date` on `peer_review_assignments`? | Assume yes — confirm on execution |
| Should rejected T&E entries be re-submittable by the author? | Out of scope this PRD — flag in community-network backlog |
| Pentangle group size: strictly 5, or up to 5? | Up to 5 (some pentangles may have fewer sites) |
| `/auth/login` — does a Supabase login page exist? | Must be created in AP2 or assumed from PR #9 |

---

## Future PRDs (flagged from Round 1 scope)

- **PWA PRD** — offline-first T&E draft + sync
- **GIS PRD** — map layer editing, Impact Dashboard data entry
- **Finance PRD** — Barbet Travel Fund, corporate sponsorships, revolving kitty fund
- **Content PRD** — convention archive upload (reports, videos, blueprints)
- **Notifications PRD** — peer review reminder emails (stubbed in AP7)
- **Impact Dashboard hook** — auto-update on T&E publish (Phase 2)

---

## Retrospective Notes (from prior PRDs)

- **data-model-unify learning:** Keep RLS policies co-located with migrations, not scattered. PR #9 must include all RLS for admin operations before this executes.
- **route-gaps learning:** Middleware guard must be verified working in isolation before any CRUD UI is built. Gate placed after AP1+AP2+AP3 for this reason.
- **barbets-duet-full-build learning:** Arcjet middleware composition is fragile — test volunteer/donation rate limits still pass after AP2 changes.
- **Boundary rule:** `lib/firebase.ts` and `components/AuthProvider.tsx` are in `require_review`. AP2 touches `middleware.ts` which is adjacent — require human review of middleware changes before proceeding to CRUD tasks.
