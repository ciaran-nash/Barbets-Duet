# Barbets Duet — Session Handoff Runbook

**Session Date:** 2026-06-09 (Session 2)
**Branch:** feature/barbets-duet-full-build
**Caveman Mode:** Full (active, stats show not registering — keep active)

---

## Overall Goal

Community-network PRD complete. All routes live. Feature branch ready for PR to main.

---

## What Was Accomplished This Session

### PRD: community-network — COMPLETE ✅
- Full interview (5 rounds): problem framing, user tiers, MVP scope, 1-yr vision, blockers, scope, task grouping
- PRD approved, status = `complete`
- 15 tasks across Wave 5 (22pts) + Wave 6 (71pts) = 93 complexity points

### Wave 5 — COMPLETE ✅ (4 commits)
| Task | Commit | What |
|------|--------|------|
| A1 | `660ee4d` | Supabase schema: profiles, roles, memberships, RLS |
| A2 | `e6fc503` | Auth migration Firebase→Supabase, sign-in/up pages, middleware |
| A3 | `760b6a5` | Member dashboard: avatar upload, role badge, site affiliations |
| B1 | `5380731` | 13 sites seeded, Pentangle groups assigned, types extended |

### Wave 6 — COMPLETE ✅ (11 commits)
| Task | Commit | What |
|------|--------|------|
| B3 | `4a232b2` | /community browse page, bento grid, MemberCard |
| B2 | `95273e6` | /community/sites/[slug] 9-section profile, FourReturnsDisplay |
| C1 | `32954a3` | Sanity trialAndError schema + GROQ queries |
| C3 | `fe30436` | T&E feed, /community/trials, /community/members/[id] |
| A2-alt | `1165ecb` | Server-side Supabase session helpers, RSC auth guards |
| C2 | `c70f233` | T&E submission form + Liveblocks collaborative drafting |
| D1 | `1485c9a` | Per-site forum, Supabase schema, Liveblocks presence |
| D2 | `82948ee` | Forum thread view, reply chain, Liveblocks live comments |
| D3 | `c6c7c2f` | Moderation controls, notifications table, webhook handler |
| E1-E2 | `902bd74` | Governance page, RadialOrbitalTimeline chain viz, peer review UI |
| E4 | `52509f7` | 4 Returns calculation service wired into site profiles |

### Infrastructure completed
- `.env.local` fixed (non-ASCII chars stripped, leading spaces removed)
- Supabase migrations pushed (all 5: 001–005, renamed to 14-digit timestamps)
- Dev server running on localhost:3000 (single server, old one killed)
- All community routes verified 200 OK in browser

---

## Current State

### Routes live at localhost:3000
| Route | Status |
|-------|--------|
| `/community` | ✅ 200 — site browse bento grid |
| `/community/trials` | ✅ 200 — T&E feed |
| `/community/governance` | ✅ 200 — Jumuiya governance + peer-review chain |
| `/community/sign-in` | ✅ 200 |
| `/community/sign-up` | ✅ 200 |
| `/community/dashboard` | ✅ 307 → sign-in (auth guard working) |
| `/community/sites/woodland-valley-farm` | ✅ 200 |
| `/community/sites/hannacroix-creek` | ✅ 200 |
| `/community/sites/molo-magode-farm` | ✅ (slug is full name) |

### Supabase (project: qomnuladxmiszlyqtvkx)
- All 5 migrations applied
- Tables live: profiles, learning_site_memberships, learning_sites, forum_threads, forum_posts, notifications, peer_reviews, pentangle_groups
- 13 sites seeded with Pentangle group assignments
- Project was paused → restored this session

### Environment (.env.local)
- `LIVEBLOCKS_SECRET_KEY` ✅ set (dev key)
- `NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY` ✅ set (dev key)
- `SANITY_API_TOKEN` ✅ set (viewer token)
- `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` ✅ set
- `RESEND_API_KEY` ❌ placeholder only (volunteer form emails broken)
- `OPENROUTER_API_KEY` ✅ set (no free credits — search endpoint 500s)
- `SANITY_WRITE_TOKEN` ❌ needed for T&E form submissions
- `SUPABASE_SERVICE_ROLE_KEY` ❌ optional, needed for webhook notification writes

---

## Open Items

### Immediate (before PR to main)

1. **A2 gate review** — `components/AuthProvider.tsx` + `firestore.rules` need manual review before merging auth changes. AuthProvider.tsx fully migrated to Supabase, Firestore retained for non-auth uses.

2. **SANITY_WRITE_TOKEN missing** — T&E submission form (C2) needs write token to create Sanity draft entries. Get from sanity.io dashboard → API tokens → add write token.

3. **Liveblocks webhook** — Configure in Liveblocks dashboard: URL `https://{domain}/api/liveblocks-webhook`, event `roomEvent`. Skip until deployment (localhost OK without it).

4. **SUPABASE_SERVICE_ROLE_KEY** — Optional for notification writes (D3). Webhook handler falls back to anon key without it.

### Post-merge
5. **Feature branch merge** — `feature/barbets-duet-full-build` → PR to main. Review A2 gate first.
6. **Vercel deployment** — Add all .env.local vars to Vercel environment.
7. **Search (T23)** — Still broken (no OpenRouter credits). Decide: add $5 to account, or skip.
8. **Resend API key** — Volunteer form email delivery needs `RESEND_API_KEY`.

---

## Supabase Site Slugs

All 13 sites from CSV:
- `woodland-valley-farm` (UK Cornwall Pentangle)
- `hannacroix-creek` (USA NE Pentangle)
- `molo-magode-farm` (East African Pentangle)
- `lukenya-zumula-farm` (East African Pentangle)
- `seme` (East African Pentangle)
- `msichoke-seaweed-growers` (East African Pentangle)
- `mwasama-primary-school` (East African Pentangle)
- `himo` (East African Pentangle)
- `sikia-community-dam`
- `arboretum-kajokoby`
- `cichlid-breeding`
- `rufiji`
- `nkoroi`

---

## Membership Tiers (Supabase `member_role` enum)
1. `site_coordinator` — founding partners, moderators
2. `junior_member` — youth cohort
3. `barbets_friend` — global supporters
4. `local_community` — surrounding neighbours

---

## Token & Environment Notes

- Context hit 54% by end of session (messages: 91k). Next session start fresh with /clear.
- Caveman mode stats not registering (hook active but output shows "not active"). Still save on output tokens by keeping caveman phrasing.
- Semble MCP used for code search — 1 call saves ~5k tokens vs investigator agent spawns.
- `.env.local` had non-ASCII box-drawing chars in comments — fixed with Python byte replacement. Do not re-add unicode in comments.

---

## Immediate Next 3 Steps

### Step 1: Add missing env vars
```bash
# Add to .env.local:
SANITY_WRITE_TOKEN=sk...  # from sanity.io dashboard → API → Tokens
SUPABASE_SERVICE_ROLE_KEY=eyJ... # from supabase.co → project → Settings → API
```

### Step 2: Review A2 gate
- Read `components/AuthProvider.tsx` — confirm Supabase Auth complete, no Firebase auth calls remain
- Read `firestore.rules` — confirm still valid for non-auth Firestore usage
- If OK, mark gate cleared in status.json

### Step 3: Create PR to main
```bash
git checkout -b pr/community-network-wave5-6
# or merge directly
gh pr create --title "feat(community): community-network PRD — Wave 5+6 complete"
```

---

## Key Files

| File | Purpose |
|------|---------|
| `components/AuthProvider.tsx` | Supabase Auth provider (A2 gate) |
| `supabase/migrations/` | All 5 migrations (001-005) |
| `supabase/seeds/001_learning_sites.sql` | 13 sites + Pentangle assignments |
| `app/community/` | All community routes |
| `app/api/liveblocks-auth/route.ts` | Liveblocks auth endpoint |
| `app/api/liveblocks-webhook/route.ts` | Notifications webhook |
| `lib/community/four-returns.ts` | 4 Returns calculation service |
| `types/community.ts` | MemberRole, PentangleGroup, Profile types |
| `.karimo/prds/community-network/PRD.md` | Full PRD |
| `.karimo/prds/community-network/status.json` | status: complete |

---

## Design System (unchanged)
- Viridian: `#006F53` (primary)
- Night Forest: `#06211A` (dark bg)
- Neon Lime: `#DBFF66` (accent)
- BioRhyme (headings), DM Sans (body)
- Focus ring: `focus:ring-2 focus:ring-viridian`

---

**Session saved:** 2026-06-09  
**Ready to resume:** Review A2 gate → add missing env vars → PR to main
