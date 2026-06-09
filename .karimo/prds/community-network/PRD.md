# PRD: Community Network
_Slug: community-network_
_Status: DRAFT — Pending Approval_
_Created: 2026-06-09_
_Branch: feature/barbets-duet-full-build_

---

## 1. Problem Statement

Barbets Duet's `/community/*` routes are entirely absent. The nav link is commented out with `TODO(T24)`. There is no digital space for the Jumuiya governance model, member profiles, site-level community pages, network visualizations, or knowledge exchange — leaving the collective's horizontal learning happening off-platform (WhatsApp, informal email) with no searchable archive, no accountability trail, and no way for Barbet's Friends or new members to discover and engage with the network.

---

## 2. Who This Is For

| Tier | Description |
|---|---|
| Site Coordinators | Founding partners. Manage local land experiments, moderate their site's community space, participate in circular peer review as both reviewer and reviewee. |
| Junior Members | Youth. Next-generation integration. Access educational modules, contribute Trial & Error entries, seek internships and fellowships. |
| Barbet's Friends | Global supporters, impact investors, skills-based volunteers. Need a discovery and contribution pathway. |
| Local Communities | Broader audience at and around learning sites. Lowest-friction, non-bureaucratic entry point. |

Governing principles: Give/Gain, Radical Autonomy, Cross-Boundary Equality, Self-Financing.

---

## 3. Core User Journey

1. Visitor discovers `/community` browse page (bento grid + map)
2. Explores site profiles and member cards
3. Signs up / is invited into a membership tier
4. Contributes a Trial & Error entry (4 mandatory prompts)
5. Gets linked into a Pentangle group or site-level forum thread
6. Site Coordinator reviews and approves contributions for their site
7. Network peer review cycle: each site reviews another in a circular chain

---

## 4. Success Criteria

- Member can register and be assigned to one of the 4 tiers
- Member can submit a Trial & Error Sanity CMS entry answering all 4 prompts
- Learning site profiles are browsable and link to their members
- Forum exists per site with real-time Liveblocks features (presence, live comments, collaborative drafting)
- Site Coordinators can moderate their own site spaces
- Circular peer review chain is visible in `/community/governance`
- "4 Returns" metrics (Natural, Social, Financial, Inspiration) display on site profiles

---

## 5. UX Notes & Design Reference

The site profile page structure is defined by the wireframe at:
`./assets/Learning_Sites_Page.jpg`

![Learning Sites Page Wireframe](./assets/Learning_Sites_Page.jpg)

**Page sections (in order):**
1. Site header + hero (name, location, date founded, founder(s), site focus areas, ecological restoration goals)
2. Challenges section (tagged challenge types)
3. Projects & Initiatives (card grid with project type tags)
4. Site-specific restoration strategies (rich text + supporting imagery)
5. Ecological & Community Impact Data — "4 Returns" metrics display:
   - Natural Capital (e.g. 127%)
   - Social Capital (e.g. 132%)
   - Financial Capital (e.g. 161%)
   - Inspiration % (variable)
6. Future Goals
7. Image Gallery (carousel)
8. Quote / testimonial callout
9. Contact + Featured Site + Explore Others

**Design constraints:**
- Reuse `SitesBrowse` 50/50 sticky-map + scrollable-cards layout for `/community` browse
- Fork `SiteCard` → `MemberCard` for member profiles
- Use `RadialOrbitalTimeline` for Pentangle network visualization
- Motion system: `KineticReveal` + `ScrollGlow` (framer-motion ^12)
- Focus rings: `focus:ring-2 focus:ring-viridian` (existing pattern)
- Tailwind v4 — no tailwind.config.js, config in `app/globals.css`

---

## 6. MVP Scope

**In scope:**
- Member auth + roles (4 tiers) via Firebase + Firestore
- Learning site profiles with "4 Returns" metrics display
- Trial & Error CMS entries (Sanity schema, 4 mandatory prompts)
- Forum per site with Liveblocks real-time features
- Circular peer review chain + governance page
- Network browse + Pentangle visualization
- Site Coordinator moderation controls
- Seed data: 13 sites + partners from CSV

**Deferred:**
- PWA offline capability (post-launch)
- WhatsApp API integration (forum-first)
- Convention archives (2009–present)
- Skills-based volunteer matching

---

## 7. Task List

### Wave 5 — Auth, Seed, Foundation (Complexity: ~22 points)

**A1 — Uncomment `/community` nav + scaffold routes** | Complexity: 3 | Model: Sonnet
- Uncomment `communityDropdownData` in `Header.tsx` (line 58–59, `TODO(T24)`)
- Scaffold `app/community/page.tsx`, `app/community/[site-slug]/page.tsx`, `app/community/[site-slug]/members/page.tsx`, `app/community/[member-id]/page.tsx`, `app/community/network/page.tsx`, `app/community/governance/page.tsx`
- All pages return stub with correct metadata

**A2 — Extend Firestore user schema + role-based auth** | Complexity: 7 | Model: Opus
- Extend `users/{uid}` Firestore document: add `role: 'coordinator' | 'junior' | 'friend' | 'local'`, `siteSlug?: string`, `memberSlug?: string`
- Expose `profile` object from `AuthProvider` context (avoid per-component re-fetches)
- Firestore security rules: coordinators can write to their site's subcollections
- Site-level roles map: `users/{uid}/siteRoles: { [siteSlug]: 'moderator' | 'member' }`
- **Touches `components/AuthProvider.tsx` and `firestore.rules` — requires review gate**

**A3 — Member type system + Firestore member collection** | Complexity: 5 | Model: Sonnet
- Create `types/member.ts` extending `TeamMember` with: `contributionHistory`, `siteRoles`, `barbetCirclePrompt`, `joinedAt`, `tier`
- Create `types/contribution.ts` (Trial & Error schema)
- Create `types/pentangle.ts` (PentangleGroup: 5 sites, review chain)
- Extend `LearningSite` type with `members?: string[]`, `fourReturns?: FourReturnsMetrics`
- Add optional `contributorSlugs?: string[]` to `Story`, `Project`, `BarbetsEvent` without breaking existing data
- Create `members` Firestore collection mirroring `team.ts` slugs
- **Avatar field:** add `avatarUrl?: string` to member type; member dashboard includes upload field (Firestore Storage) + mock placeholder image for MVP if no upload provided

**B1 — Seed 13 sites + partner data + Pentangle assignments** | Complexity: 7 | Model: Opus
- Parse `research/internal/Barbets_Duet_Learning_Sites_and_Partners_Overview.csv`
- Write seed script: `scripts/seed-community.ts`
- Populate `members` Firestore collection from existing `team.ts` slugs
- Populate `fourReturns` metrics per site where available in CSV
- **Seed pre-defined Pentangle groups** into `pentangleGroups` Firestore collection with circular review chain assignments:
  - **East African Pentangle:** Mlingotini (TZ), Himo (TZ), Seme (KE), Molo (UG), Lukenya (KE)
  - **USA NE Pentangle:** Hannacroix Creek (NY), Sheffield (VT), Lehigh Gap (PA) _(3-site group — partial pentangle, expand post-launch)_
  - **UK Cornwall Pentangle:** Woodland Valley Farm, Community Garden Cornwall _(2-site group — expand post-launch)_
  - **India Pentangle:** Ahmedabad, Pune _(less developed — seed as `status: 'forming'`)_
- Each group record: `{ id, label, sites: string[], reviewChain: string[], status: 'active' | 'forming' }`
- Validate: every seeded site must be assigned to exactly one Pentangle group
- Idempotent: skip existing documents, log new inserts

---

### Wave 6 — Profiles, Forum, Governance, Peer Review (Complexity: ~65 points)

**A2-alt — Wire routes to live data** | Complexity: 7 | Model: Opus
- Connect all scaffolded routes to Firestore/Sanity data sources
- `/community` → seeded sites list + member count stats
- `/community/[site-slug]` → site profile with `fourReturns` metrics
- `/community/[member-id]` → member profile with contribution history
- `/community/network` → Pentangle groups data
- `/community/governance` → peer review chain + governance copy

**B2 — Site profile page** | Complexity: 8 | Model: Opus
- Implement full site profile page per wireframe (`Learning_Sites_Page.jpg`):
  - Site header + hero (name, location, founded, founder(s), focus areas, goals)
  - Challenges section with tagged challenge types
  - Projects & Initiatives card grid
  - Site-specific restoration strategies (rich text)
  - **Ecological & Community Impact Data** — "4 Returns" display: Natural Capital, Social Capital, Financial Capital, Inspiration (animated percentage counters, brand colours)
  - Future Goals section
  - Image Gallery carousel
  - Quote / testimonial callout
  - Contact + Featured Site + Explore Others panels
- Reuse `SiteCard`, `SitesBrowse` patterns
- Keyboard-accessible gallery (WCAG 2.1 AA)

**B3 — Community browse page + MemberCard** | Complexity: 5 | Model: Sonnet
- `/community` bento grid: dynamic media montage, impact dashboard (hectares restored, active sites), global map
- Fork `SiteCard` → `MemberCard`: bio, affiliated sites, tier badge, contribution count, avatar (upload or mock placeholder)
- Reuse `SitesBrowse` 50/50 sticky-map layout
- `SitesMap` reused for member-location overview
- Filter/search by challenge type, intervention type, property rights regime (Mosaic/Column)

**C1 — Trial & Error Sanity schema** | Complexity: 5 | Model: Sonnet
- Define Sanity schema for `TrialAndError` document type
- 4 mandatory prompt fields:
  1. "What have you tried and how did it turn out?"
  2. "What was your biggest mistake?"
  3. "What did you learn and what made you laugh?"
  4. "Who would you include in your own Barbet circle and why?"
- Metadata fields: `siteSlug`, `authorMemberSlug`, `challengeType[]`, `interventionType[]`, `propertyRightsRegime`, `altText` (for any uploaded images)
- Studio validation: all 4 prompts required before publish
- GROQ queries: `getContributionsBySite(slug)`, `getContributionsByMember(slug)`, `searchContributions(query)`

**C2 — Trial & Error submission UI** | Complexity: 6 | Model: Sonnet
- `/community/contribute` multi-step form (4 steps = 4 prompts)
- Reuse `VolunteerForm` multi-step pattern
- Step validation before advancing
- Draft save to Firestore `users/{uid}/drafts` (auto-save on blur)
- Submit → Sanity draft, pending coordinator approval
- **Liveblocks collaborative drafting:** real-time co-editing of T&E entry (presence indicators, cursor tracking, conflict-free editing)
- Combine with D2 for shared Liveblocks room context

**C3 — Contribution discovery + member profiles** | Complexity: 5 | Model: Sonnet
- `/community/[member-id]` profile page:
  - Bio, affiliated sites, tier badge
  - Avatar (uploaded image or mock placeholder)
  - Barbet circle prompt answer (displayed prominently)
  - Contribution history list
- Full-text search across Trial & Error repository (Sanity GROQ + client-side filter)
- Filter by: challenge type, intervention type, Mosaic/Column, site, member tier
- Tag taxonomy rendered as filterable pills

**D1 — Per-site forum with Liveblocks** | Complexity: 6 | Model: Sonnet
- Custom Next.js forum under `/community/[site-slug]/forum`
- Thread model: `threads` Firestore collection (`siteSlug`, `title`, `authorMemberSlug`, `createdAt`, `locked`)
- Post model: `threads/{id}/posts` subcollection
- **Liveblocks integration:**
  - Real-time presence indicators (who's reading/typing per thread)
  - Live comment threads (Liveblocks Comments API)
  - Typing indicators on compose area
  - Online member avatars in thread header
- Site Coordinator moderation: lock/delete threads, pin posts
- Liveblocks auth endpoint: `app/api/liveblocks-auth/route.ts`
- Requires: Liveblocks API keys (provided)

**D2 — Collaborative T&E drafting (Liveblocks)** | Complexity: 7 | Model: Opus
- Liveblocks collaborative room for T&E entry drafting
- Room ID: `te-draft-{uid}-{timestamp}`
- Shared draft state: 4 prompt fields synced in real-time
- Presence: co-author avatars, cursor positions, field focus indicators
- Permission model: owner + invited collaborators (coordinator can co-author)
- Merge strategy: last-write-wins per field (CRDT via Liveblocks Storage)
- On submit: serialize final state to Sanity draft
- **Combines C2 and D2 into unified contribution workflow**

**D3 — Liveblocks presence + notifications** | Complexity: 6 | Model: Sonnet
- Global Liveblocks presence layer for `/community/*` routes
- Notification system: new post in site forum, new T&E entry awaiting review, peer review due
- In-app notification bell (Firestore `users/{uid}/notifications` subcollection)
- Liveblocks webhooks → Firestore notification writes
- Coordinator notification: new contribution in their site awaiting approval
- Browser notification permission prompt (optional, gated on user preference)

**E1-E2 — Peer-Review UI + Governance Implementation** | Complexity: 8 | Model: Opus
_(Consolidated — single pass, no gate)_
- `/community/governance` page:
  - Explainer: Mosaic vs Column Rights, Utu Net Benefits, Circular Peer Review
  - Interactive peer review chain visualization (which site reviews which)
  - Coordinator dashboard: submit annual review for assigned peer site
- Peer review data model: `peerReviews` Firestore collection (`reviewerSiteSlug`, `revieweeSiteSlug`, `year`, `status`, `findings`, `goals`)
- Review form: self-defined goal progress + explanation field (e.g., "poor rainfall caused shortfall")
- "4 Returns" metrics display on governance page: Natural Capital %, Social Capital %, Financial Capital %, Inspiration %
- Circular chain assignment derived from `pentangleGroups` seeded in B1
- Coordinator-only write access enforced via Firestore rules
- Status badges: pending / submitted / acknowledged

**E4 — "4 Returns" peer-review metrics display** | Complexity: 8 | Model: Opus
_(No gate — implement full logic in Wave 6)_
- "4 Returns" metric calculation service: `lib/community/four-returns.ts`
- Inputs: seeded site data + annual coordinator submissions
- Output: `{ natural: number, social: number, financial: number, inspiration: number }` (percentages relative to baseline)
- **Baseline metrics:** year-zero figures are established via coordinator input during peer-review implementation. E4 must include a **coordinator interview checklist** embedded in the governance dashboard:
  - Prompt coordinators to enter baseline figures per metric (Natural, Social, Financial, Inspiration) when submitting their first annual review
  - Checklist fields: `baselineYear`, `naturalBaseline`, `socialBaseline`, `financialBaseline`, `inspirationBaseline`, `baselineNotes`
  - Baseline locked after first submission; subsequent reviews calculate % change relative to locked baseline
  - Display "Baseline pending" state on site profile until coordinator has submitted baseline
- Display component: `components/community/FourReturnsDisplay.tsx`
  - Animated percentage counters (framer-motion)
  - Visual treatment matching wireframe section 5 of `Learning_Sites_Page.jpg`
  - Accessible: `aria-label` per metric, keyboard-navigable
- Integrated on: B2 site profile page, E1-E2 governance page
- Coordinator can update metrics via governance dashboard (annual cadence)

---

## 8. Dependencies & Integration Points

| Task | Depends On | External |
|---|---|---|
| A2 | Firebase Auth (existing) | Firestore rules update |
| A3 | A2 (role model defined) | — |
| B1 | A3 (types defined) | CSV: `research/internal/Barbets_Duet_Learning_Sites_and_Partners_Overview.csv` |
| A2-alt | A2, B1 | — |
| B2 | A2-alt, B1, E4 | Wireframe: `assets/Learning_Sites_Page.jpg` |
| B3 | A2-alt, A3 | — |
| C1 | A3 | Sanity CMS (existing) |
| C2 | C1, D2 | Liveblocks API |
| C3 | C1 | Sanity GROQ |
| D1 | A2, A3 | Liveblocks API |
| D2 | C1, D1 | Liveblocks API |
| D3 | D1, D2 | Liveblocks webhooks |
| E1-E2 | B1, A2 | — |
| E4 | B1, E1-E2 | — |
| B2 | E4 | — |

**Requires review (touches `require_review` files):**
- A2 touches `components/AuthProvider.tsx` and `firestore.rules` — human review required before merge

**External credentials needed:**
- Liveblocks API keys (provided — store in `.env.local` as `LIVEBLOCKS_SECRET_KEY`, `NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY`)
- Sanity project ID + dataset (existing — `NEXT_PUBLIC_SANITY_PROJECT_ID`)
- Firebase config (existing — `firebase-applet-config.json`, never touch)

---

## 9. Open Questions

- [x] **RESOLVED** — Pentangle groupings: pre-defined geographic groups (East African, USA NE, UK Cornwall, India). B1 seeds them directly; no algorithmic assignment needed.
- [x] **RESOLVED** — Member avatar: upload flow (Firestore Storage) + mock placeholder for MVP. A3 adds `avatarUrl?` field; dashboard includes upload field with placeholder fallback.
- [x] **RESOLVED** — "4 Returns" baselines: coordinator input via interview checklist embedded in E4 governance dashboard. Baseline locked after first submission; "Baseline pending" state displayed until set.
- [ ] Liveblocks plan tier: check whether free tier covers expected concurrent users at launch
- [ ] Forum moderation: does "lock thread" require a soft-delete pattern or hard Firestore delete?

---

## 10. Complexity Assessment

```
Wave 5:
  A1: 3 (Sonnet)
  A2: 7 (Opus) — require_review
  A3: 5 (Sonnet)
  B1: 7 (Opus)
  Wave 5 total: 22 points

Wave 6:
  A2-alt: 7 (Opus)
  B2:     8 (Opus)
  B3:     5 (Sonnet)
  C1:     5 (Sonnet)
  C2:     6 (Sonnet)
  C3:     5 (Sonnet)
  D1:     6 (Sonnet)
  D2:     7 (Opus)
  D3:     6 (Sonnet)
  E1-E2:  8 (Opus)
  E4:     8 (Opus)
  Wave 6 total: 71 points

Grand total: 93 points
Sonnet tasks: A1, A3, B3, C1, C2, C3, D1, D3 (8 tasks)
Opus tasks: A2, B1, A2-alt, B2, D2, E1-E2, E4 (7 tasks)
High-risk (7+): A2, B1, A2-alt, B2, D2, E1-E2, E4 (7 tasks)
```

No slicing required (93 points < 100). A2 requires human review gate due to `AuthProvider.tsx` + `firestore.rules` boundary.

---

## 11. Orchestration Notes

- **Integration cadence:** per-wave (Wave 5 → review → Wave 6)
- **Review cadence:** per-wave, scope = wave-diff
- **A2 gate:** pause before merge — human review of `AuthProvider.tsx` and `firestore.rules` changes
- **E3 gate:** REMOVED — Jumuiya leaders have approved "4 Returns" framing + circular peer-review model
- **Wave 6 E4:** no gate — implement full peer-review logic + "4 Returns" display in single pass
- **Parallel execution:** Wave 6 can run 2 agents in parallel (e.g., B-track: B2/B3/C-track vs D-track: D1/D2/D3)

---

## 12. Research References

- Internal findings: `.karimo/prds/community-network/research/internal/findings.md`
- External findings: `.karimo/prds/community-network/research/external/findings.md`
- Seed data CSV: `research/internal/Barbets_Duet_Learning_Sites_and_Partners_Overview.csv`
- Wireframe: `.karimo/prds/community-network/assets/Learning_Sites_Page.jpg`
