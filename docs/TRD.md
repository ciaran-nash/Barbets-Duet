# Technical Requirements Document — Barbets Duet Web Platform

> **Status:** Draft v1.0 · **Date:** 2026-06-25 · **Author:** Engineering (synthesised from project memory + codebase)
> Sections not yet decided in this project are flagged **[REQUIRES CLARIFICATION]** with an expert recommendation.

---

## 1. Project Overview

**Barbets Duet** is a web platform for a global ecological-restoration collective. It exists to make the network's *"learning sites"* (real partner restoration projects across East Africa, the US North-East, UK/Cornwall and India) visible to the public, and to give members a private community space for collaboration, peer review and knowledge-sharing.

The core idea Barbets Duet promotes is **economic systems that reward ecological restoration** — instruments like tradable biodiversity indices and community-controlled carbon experiments. The site blends two surfaces:

1. A **public marketing/editorial site** — storytelling, learning-site profiles, impact data, events, donations, volunteer recruitment.
2. A **members' community network + admin portal** — authenticated forums, Trial-and-Error (T&E) knowledge submissions, a peer-review chain across "Pentangle" geographic clusters, member/role management, and a "Four Returns" impact framework.

**Primary value delivered:** turn a distributed, real-world restoration network into a single credible digital home that (a) earns public trust through transparent measured impact, (b) drives volunteering and donations, and (c) operationally coordinates members through structured peer review and governance.

---

## 2. Target Users & Use Cases

| Audience | Primary goals | Problem solved |
|---|---|---|
| **Public visitors / supporters** | Understand the mission, browse learning sites, read stories, donate, sign up to volunteer | No single trustworthy place explaining the network and its measured impact |
| **Volunteers / prospective members** | Apply to a specific learning site, find events | Application paths were previously missing / 404 |
| **Site Coordinators** (members) | Submit T&E reports, run forums, manage their site's members | No structured way to capture and review field experiments |
| **Junior Members / Barbets' Friends / Local Community** (members) | Participate in forums, view dashboards, contribute | No private collaboration space |
| **Administrators** | Review & publish/reject T&E submissions, assign roles, monitor peer-review chains, manage Pentangle groups | Manual, untracked coordination across geographies |

**Problem statement (overall):** The network's work is real but was digitally fragmented — placeholder data, broken nav, no community layer, no admin tooling. The platform consolidates public credibility and private operations into one App-Router application.

---

## 3. Core Functionality

### Public surface

| # | Feature | Requirements |
|---|---|---|
| F1 | **Marketing home** | RSC landing: Hero, Mission, Impact stats, Learning Sites, Case Studies, FAQ, CTA. Brand-aligned (Scholarly Cycle), motion via `motion/react`. |
| F2 | **Learning Sites** | Index/browse (`/learning-sites`) + detail (`/learning-sites/[slug]`). 13 real sites seeded. Detail sections: Hero, Challenges, Restoration Strategies, Initiatives/Projects, Market Strategies, Impact Grid (ecological + community `ImpactPoint[]`), Future Goals, Gallery, Testimonial, Contact, Explore-other-sites. Geographic `lat/lng` for map. |
| F3 | **Interactive map** | MapLibre GL + `react-map-gl`, Stadia Maps tiles, pins per learning site, links to detail pages. |
| F4 | **Stories / Events / News / Blog** | Index + `[slug]` detail. `Story.content` supports `string \| PortableTextBlock[]` (Sanity rich text). Events carry `siteSlug` to associate with a learning site. |
| F5 | **Projects / Innovation Hub** | `/projects` grid + filters + detail drawer. NOTE: `lib/data/projects.ts` is placeholder content pending real data. |
| F6 | **About cluster** | `/about`, `/about/team` (data from `lib/data/team.ts`), `/about/mission-vision`, `/about/philosophy-history`, `/about/careers`. |
| F7 | **Volunteer application** (`/get-involved`) | ~20-field form, `react-hook-form` + Zod (`lib/schemas/volunteerApplication.schema.ts`). Writes to Firestore `volunteer_applications`; Resend confirmation email (graceful-fail). Site preference resolves against learning sites. |
| F8 | **Donations** (`/support-us`) | Stripe Checkout. `DonationForm` (amount/currency/method), Zod-validated. `/api/checkout` route. |
| F9 | **Photo gallery / bookmarks** | Firestore-backed gallery upload + `SaveButton` bookmarks. *(Legacy Firebase `User.uid` shape — see §11 tech debt.)* |

### Members' community network (authenticated)

| # | Feature | Requirements |
|---|---|---|
| F10 | **Auth** | Supabase Auth — email/password + Google OAuth. Sign-in/up at `/community/sign-in`, `/community/sign-up`, `/auth/login`. Session via `@supabase/ssr` cookies. |
| F11 | **Member dashboard** | `/community/dashboard`, `/dashboard` — profile, memberships, notifications. |
| F12 | **Forums** | Per-site forums `/community/sites/[slug]/forum` + thread view `[threadId]`. Realtime presence/drafts via **Liveblocks**. Tables `forum_threads`, `forum_posts` with status enums. |
| F13 | **Trial-and-Error (T&E) submissions** | Members document field experiments. Contribution flow `/community/contribute`, browse `/community/trials`. **Stored in Sanity** (not Supabase); admins publish/reject. |
| F14 | **Four Returns framework** | `lib/community/four-returns.ts` — per-site and network-average metrics across the four "returns" (inspiration, social, natural, financial capital). `FourReturnsDisplay` cards. |
| F15 | **Governance** | `/community/governance` — `GovernanceClient` state machine for network decisions. |
| F16 | **Notifications** | `NotificationBell` dropdown, Supabase `notifications` table, optional webhook writes. |

### Admin portal (`/admin`, role-gated)

| # | Feature | Requirements |
|---|---|---|
| F17 | **Auth + RBAC** | Middleware route protection for `/admin` + `/superadmin`. Role check via `lib/supabase/admin-auth.ts` (`requireRole`). |
| F18 | **T&E review queue** | `/admin/submissions` — filter tabs, review queue, publish/reject server actions (writes to Sanity). |
| F19 | **Member management** | `/admin/members` — list + role assignment UI with confirm modal. Roles: `site_coordinator`, `junior_member`, `barbets_friend`, `local_community` (+ `admin`). |
| F20 | **Peer-review chain** | `/admin/peer-review` — ring diagram of the review chain per Pentangle, overdue flagging. Table `peer_reviews`. |
| F21 | **Pentangle group management** | `/admin/pentangles` — create/edit/delete geographic clusters (`east_african`, `usa_ne`, `uk_cornwall`, `india`). |

### Content management

| # | Feature | Requirements |
|---|---|---|
| F22 | **Sanity Studio** | Embedded at `/studio` (Sanity v5, project `xdhl8m8i`, dataset `production`). Schemas: blog, events, news, stories, projects, team, learning-sites, siteSettings. |
| F23 | **On-demand revalidation** | Sanity webhook → `/api/revalidate` for ISR. Image pipeline via `@sanity/image-url` (`urlFor`). |
| F24 | **AI scaffold** | Vercel AI SDK (`ai` v6) + `@ai-sdk/openai` / `@google/genai` present. Semantic search was scaffolded but **unfunded** (OpenRouter credits) — currently dormant. |

---

## 4. User Interface Requirements

| Aspect | Specification |
|---|---|
| **Design style** | "Scholarly Cycle" — modernism × tradition, circular frames, monochrome line art, scientific vernacular; "Dark Nature / Calm System". High-end / Awwwards-tier execution (design by @digitalorchard.design). |
| **Colour scheme** | Strict 5-colour palette: Neon Lime `#DBFF66`, Viridian `#006F53`, Night Forest `#06211A`, White `#FFFFFF`, Platinum `#F4F4F5`. Dark default = Night Forest bg + Neon Lime accents; light = Platinum bg + Viridian accents. |
| **Typography** | BioRhyme (serif/display, SemiBold/ExtraBold), DM Sans (sans/body), JetBrains Mono (mono). Loaded via `next/font`. |
| **Layout** | Multi-page App Router. Public = editorial long-scroll sections; members/admin = dashboard layouts with role-aware sidebar. |
| **Responsive** | Mobile-first; all asymmetric layouts collapse to single-column `<768px`. `min-h-[100dvh]` (not `h-screen`). Floating island nav collapses to full-screen `backdrop-blur` overlay with staggered link reveal. |
| **Implemented design patterns** | Floating island nav pill (`fixed top-6`, `backdrop-blur-xl`); Double-Bezel `Card` (outer shell + `CardInner` inset); `rounded-full` buttons with custom cubic-bezier physics; `.eyebrow` tags; `KineticReveal` blur scroll-reveals. |
| **Key UI components** | Forms (RHF+Zod), data tables (member list, review queue), ring/orbital diagrams (peer review, radial timeline), interactive map, image galleries, impact stat grids, charts for Four Returns, modals, toasts, 3D globe (`react-globe.gl`). |
| **Tailwind** | v4 — **all config in `app/globals.css`** (`@theme`), no `tailwind.config.ts`. shadcn semantic tokens bridged to brand tokens. |

---

## 5. Data Model

### 5.1 Storage split (three systems)

| Store | Purpose | Key entities |
|---|---|---|
| **Supabase Postgres** (`qomnuladxmiszlyqtvkx`) | Auth + relational community data | `profiles`, `learning_site_memberships`, `forum_threads`, `forum_posts`, `peer_reviews`, `notifications`, `learning_sites` |
| **Sanity** (`xdhl8m8i`, `production`) | Editorial content + T&E submissions | blog, events, news, stories, projects, team, learning-sites, siteSettings, T&E docs |
| **Firebase Firestore** | Public-form & media writes | `volunteer_applications`, gallery images, bookmarks |

> **Note:** This is a deliberate polyglot persistence model. Auth identity lives in Supabase; some legacy public features still use Firebase (`User.uid`) and are a known migration target (§11).

### 5.2 Core entities & relationships

- **Profile** `{ id, email, display_name, avatar_url, role: MemberRole, bio, created_at, updated_at }` — 1:N **LearningSiteMembership** `{ user_id, site_slug, site_name, pentangle_group, is_primary, joined_at }`.
- **LearningSite** `{ slug (PK), name, location, founded, category, leadPartners[], lat, lng, hero/overview/challenges/restorationStrategies/initiatives/marketStrategies, impactData{ ecological: ImpactPoint[], community: ImpactPoint[] }, gallery, testimonial?, contact?, pentangleGroup?, peerReviewChainPosition?, projects?: Project[] }`.
- **ImpactPoint** (shared) `{ label, value, unit, icon?, description? }` — single canonical impact type (deprecated aliases removed).
- **Project** `{ slug, title, category, siteSlug, maturity: Idea|Pilot|Scaling|Systemic, impactMetrics: ImpactPoint[], ... }` — N:1 LearningSite via `siteSlug`.
- **Story** `{ slug, title, content: string|PortableTextBlock[], category, impactMetrics, siteSlug? }`; **BarbetsEvent** `{ slug, type, registrationStatus, siteSlug? }`.
- **ForumThread** 1:N **ForumPost** (status enums).
- **PeerReview** — chain ordered by `peerReviewChainPosition` within a Pentangle group; overdue flag derived from dates.

### 5.3 Data types & validation

- TypeScript **strict mode** across the app. Shared types in `types/*` (`community.ts`, `learning-site.ts`, `project.ts`, `narrative.ts`, `forum.ts`, `shared.ts`, `team.ts`).
- Runtime validation: **Zod v4** at all external boundaries (forms, API routes). Schemas in `lib/schemas/`.
- Enums: `MemberRole` (4 community roles; admin-auth extends with `admin`), `PentangleGroup` (`east_african|usa_ne|uk_cornwall|india|null`), `ProjectMaturity`, thread/post status.

### 5.4 Security model

- **Authentication:** Supabase Auth (email/password + Google OAuth), SSR cookie sessions.
- **Authorization:** role on `profiles.role`. Server-side guards (`requireRole`, `requireServerAuth`) + Next.js **middleware** protecting `/admin` and `/superadmin`. Access map: `/admin/*` → `site_coordinator | admin`; `/superadmin/*` → `admin`; community → any authenticated role.
- **Row-Level Security:** **[REQUIRES CLARIFICATION]** — Supabase RLS policy coverage not documented. *Recommendation:* enable RLS on every table and write explicit per-role policies (members read/write own rows; coordinators scoped to their site; admins full) before production launch; never rely on app-layer checks alone.
- **Edge protection:** Arcjet (`@arcjet/next`) middleware for rate-limiting / bot detection.

---

## 6. User Flows

### 6.1 Public supporter
1. **Entry:** Landing `/` or deep link to a learning-site / story (SEO).
2. **Explore:** Browse learning sites (map + grid) → site detail → impact data.
3. **Convert:** Donate (`/support-us` → Stripe Checkout) **or** volunteer (`/get-involved` form).
4. **Edge cases:** Stripe failure → error state, no charge; Resend email failure → submission still succeeds (logged, non-blocking); Zod validation → inline field errors.
5. **Success:** Confirmation screen + email; donation receipt via Stripe.

### 6.2 Member
1. **Entry:** `/community` → sign-in/up (`/community/sign-in`).
2. **Auth:** Supabase email/password or Google OAuth → session cookie.
3. **Main:** Dashboard → site forum (realtime) → submit T&E contribution → view Four Returns.
4. **Edge cases:** Unauthenticated access to gated route → redirect to sign-in with `?next=`; missing Supabase env → graceful degraded mode (auth disabled, warning logged).
5. **Success:** T&E submitted (pending admin review); forum post live in realtime.

### 6.3 Admin
1. **Entry:** `/admin` (middleware verifies role, else 307 redirect / 403).
2. **Main:** Review T&E queue → publish/reject (server action → Sanity) → assign member roles (confirm modal) → inspect peer-review ring → manage Pentangles.
3. **Edge cases:** Role insufficient → `/403`; concurrent edits → server action re-validates.
4. **Success:** Submission published to public/community; role change reflected immediately.

---

## 7. Technical Requirements

### 7.1 Stack (authoritative — from `package.json`)

| Layer | Choice |
|---|---|
| **Framework** | Next.js `^15.4` (App Router, RSC), React `19.2`, TypeScript `5.9` strict |
| **Styling** | Tailwind CSS v4 (`4.1.11`, config in `globals.css`), `@tailwindcss/typography`, `tw-animate-css` |
| **UI primitives** | Radix UI + `class-variance-authority` + `clsx` + `tailwind-merge` (shadcn-style), `lucide-react` + `@phosphor-icons/react` |
| **Animation** | `motion` v12 (`motion/react`), Lenis smooth scroll, `three` + `react-globe.gl` |
| **Auth + relational DB** | Supabase (`@supabase/ssr 0.12`, `supabase-js 2.108`) |
| **CMS** | Sanity v5 + `next-sanity` v13 + Portable Text |
| **Forms / media DB** | Firebase `12.12` (Firestore + Storage) |
| **Realtime** | Liveblocks v3 (client/node/react) |
| **Payments** | Stripe `22.1` + `@stripe/stripe-js` |
| **Email** | Resend `6.12` + `@react-email/components` |
| **Maps** | MapLibre GL `5.24` + `react-map-gl` (Stadia Maps tiles) |
| **Validation** | Zod v4 + `@hookform/resolvers` + react-hook-form |
| **AI** | Vercel AI SDK v6 + `@ai-sdk/openai` + `@google/genai` (scaffold, dormant) |
| **Edge security** | Arcjet `@arcjet/next 1.4` |
| **Analytics** | Umami |
| **Hosting** | Vercel (App Router, Fluid Compute, ISR) |

### 7.2 External integrations
Supabase · Sanity · Firebase · Liveblocks · Stripe · Resend · Stadia Maps · Arcjet · Umami · (AI provider — dormant).

### 7.3 Performance expectations
- RSC/SSR by default; Sanity CDN images via `urlFor`; ISR with on-demand revalidation (Sanity webhook).
- **Specific SLAs/Core Web Vitals: [REQUIRES CLARIFICATION].** *Recommendation:* LCP < 2.5 s (p75), INP < 200 ms, CLS < 0.1; image optimization via `next/image` + Sanity transforms; defer `three`/globe + map to client/lazy boundaries; keep bundle lean (framer-motion + styled-components already removed).

### 7.4 Security considerations
- SSR cookie auth, middleware RBAC, Arcjet rate-limit/bot, Zod boundary validation, Stripe-hosted card capture (no PAN on our servers).
- **Secrets currently committed to `.claude/settings.local.json` / `.mcp.json` (Sanity + Supabase tokens). [REQUIRES CLARIFICATION / ACTION].** *Recommendation:* rotate any exposed tokens, move all secrets to Vercel env vars, ensure these files are git-ignored.
- Outstanding env gaps (from project memory): `SANITY_WRITE_TOKEN` (T&E writes), `RESEND_API_KEY` (email delivery), `SUPABASE_SERVICE_ROLE_KEY` (webhook writes), Liveblocks webhook (configure at deploy).

---

## 8. Accessibility & Compliance

- **Accessibility target:** **WCAG 2.2 AA** (explicit gate for admin T&E queue + member list; apply site-wide). Includes skip-to-content link, focus-visible rings, semantic landmarks, `prefers-reduced-motion` honouring for the heavy motion system. **[REQUIRES CLARIFICATION]** whether AA is contractually required site-wide — *Recommendation:* commit to AA across all surfaces; audit with axe + manual keyboard/SR passes.
- **Compliance:** **[REQUIRES CLARIFICATION].** Given UK/EU partners and global volunteers, *Recommendation:* GDPR + UK-GDPR compliance — cookie-consent banner gating Umami/analytics, privacy policy (a `/legal/*` cluster exists), data-subject access/erasure process for `profiles`, `volunteer_applications`, donation records. If processing US donors, layer CCPA notice. Charity-specific: if UK donations, evaluate Gift Aid handling.

---

## 9. Examples & Inspiration
- **Aesthetic references:** Linear / Apple-tier execution per the high-end-visual-design system (Double-Bezel cards, island nav, editorial whitespace, custom-bezier motion).
- **Domain framework:** "4 Returns" landscape-restoration framework (return of inspiration, social, natural, financial capital).
- **Specific elements to emulate:** floating glass island nav; concentric "machined hardware" cards; staggered scroll/mask reveals; orbital/ring diagrams for peer-review chains.
- Specific competitor/inspiration URLs: **[REQUIRES CLARIFICATION]** — none recorded. *Recommendation:* capture 2–3 reference sites from the client to lock visual direction.

---

## 10. Implementation Priorities

### Must-have (MVP) — largely built
- Public marketing site, learning sites (index + detail + map), stories/events, volunteer form, donations.
- Community network (auth, dashboard, forums, T&E, Four Returns, governance).
- Admin portal (T&E review, member/role management, peer-review chain, Pentangle management).
- Sanity CMS + Studio + revalidation.

### Nice-to-have (secondary)
- Semantic/AI search (scaffolded, unfunded).
- Notification webhooks (needs `SUPABASE_SERVICE_ROLE_KEY`).
- Richer Four Returns visualisations.

### Future enhancements
- Migrate `lib/data/learning-sites.ts` (~1,443 lines hardcoded) and other `lib/data/*` to Sanity.
- Decompose monolithic client components (>250 LOC: MemberDashboard, GovernanceClient, ThreadClient, ContributeClient, VolunteerForm).
- Tradable biodiversity-index / carbon-market instruments (long-term product vision).
- Internationalisation: **[REQUIRES CLARIFICATION]** (global partners incl. Swahili-speaking regions) — *Recommendation:* evaluate `next-intl` if multilingual content is required.

---

## 11. Additional Context (architecture, deployment, known debt)

**Repository / branches.** Active branch `feature/admin-portal`; admin portal AP1–AP8 complete, pending **Gate 2** (TS strict clean, `next build` clean, WCAG AA spot-check) before PR to `main`.

**Deployment.** Vercel (Next.js App Router, Fluid Compute default, ISR, preview deployments per branch). Node 24 runtime. Configure Liveblocks webhook + all env vars at deploy time.

**Known technical debt (tracked):**
- 8 pre-existing TypeScript errors form the accepted baseline — Firebase `User.uid` vs Supabase `User.id` in `PhotoGallery`/`SaveButton`, Liveblocks `verifyRequest` API drift, `redirect()` non-null narrowing in `lib/supabase-server.ts`. Filter, don't chase; fix as a dedicated Firebase→Supabase cleanup.
- Polyglot persistence (Supabase + Sanity + Firebase) increases operational surface; long-term consolidate Firebase usage into Supabase.

**Testing strategy. [REQUIRES CLARIFICATION]** — no test framework currently in `package.json`. *Recommendation:* Vitest + React Testing Library for units; Playwright (skill already available) for E2E on the critical flows (auth, donation, volunteer submit, admin publish); wire into Vercel CI as a required check.

**Observability / monitoring. [REQUIRES CLARIFICATION]** — *Recommendation:* Vercel Analytics + log drains; Sentry for runtime error tracking; Umami for product analytics behind cookie consent.

**Backups / DR. [REQUIRES CLARIFICATION]** — *Recommendation:* rely on Supabase PITR (paid tier), Sanity dataset exports on a schedule, Firestore scheduled exports.

---

### Open clarifications summary
1. Supabase RLS policy coverage (security-critical).
2. Secret rotation + removal from committed config files (security-critical).
3. Performance SLAs / Core Web Vitals targets.
4. Compliance scope (GDPR/UK-GDPR/CCPA, Gift Aid).
5. Site-wide WCAG AA contractual requirement.
6. Reference/competitor URLs for visual lock.
7. Internationalisation need.
8. Test, observability, and backup/DR strategies.
