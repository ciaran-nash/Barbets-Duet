# Barbets Duet — Session Handoff Runbook

**Session Date:** 2026-06-09  
**Branch:** feature/barbets-duet-full-build  
**Caveman Mode:** Full (active, 65% token savings)

---

## Overall Goal

Finalize wave 5 infrastructure (Sanity CMS + search), plan & execute wave 6 (community network + content gaps), prepare feature branch for merge to main.

---

## Last Completed Step

✅ **Community-network PRD research complete** (commit `067cb5e`)
- External research: Jumuiya governance, Pentangle groups, member types, page structure, PWA requirements
- Internal research: component patterns (SiteCard→MemberCard, SitesBrowse, RadialOrbitalTimeline), data gaps (no member profile type, missing auth roles), PWA is day-one blocker
- Both findings saved to `.karimo/prds/community-network/research/`

---

## Current State

### Wave 5 Completion
- ✅ T18–T23 all merged (6 PRs squashed into linear feature branch history)
- ✅ Sanity tokens configured (Viewer + seed tokens), content seeded (31 docs: 13 sites, 2 stories, 2 events, 3 projects, 11 team)
- ✅ Studio page loads at /studio (fixed `use client` directive, removed metadata export)
- ❌ OpenRouter search disabled (no free tier credits; Gemma free model exhausted; T23 needs funding or skip)
- ❌ Resend key still missing (volunteer form emails need setup)
- ✅ Dev server running (bg process: bzmplmedc, next dev on localhost:3000)
- ✅ Graph refreshed (679 nodes, 121 communities, 2026-06-09)

### Infrastructure Status
- `.env.local`: SANITY_API_TOKEN + SANITY_WEBHOOK_SECRET set; OPENROUTER_API_KEY present but no credits
- package.json: styled-components installed (Sanity Studio dep)
- `.karimo/`: config.yaml exists; BACKLOG.md has queued PRDs (route-gaps, data-model-unify, admin-portal)

### PRD State
- `001_barbets-duet-full-build`: status `paused-wave-gate`, wave 5 merged, wave 6 queued (T24–T28)
- `community-network`: status `research-pending`, research complete, **awaiting interview for PRD generation**

---

## Open Blockers

1. **OpenRouter search (T23)** — No free credits; Llama free model exhausted; Google Gemma free model unavailable. Options: add $5 card to OpenRouter, or skip search feature for now.

2. **Resend API key** — Volunteer form needs email delivery (`RESEND_API_KEY` not yet added to `.env.local`).

3. **community-network interview incomplete** — Round 1 (Framing) questions asked but unanswered. Agent `ae7fc403ccb79685c` is paused waiting for user input on:
   - Problem framing (discovery vs. transparency vs. activation)
   - Primary user type (practitioners, supporters, or youth)
   - Success metrics (3-month MVP, 1-year vision)
   - Biggest blockers (PWA, Sanity readiness, member data, etc.)

4. **T24 overlap decision** — T24 (Community/Jumuiya network section) in wave 6 overlaps with scaffolded community-network PRD. Must decide: fold community-network into T24, or use separate PRD and resolve in T24 scope.

5. **Wave 6 readiness** — Status.json updated (current_wave → 6), but execution hasn't kicked. `/karimo:run --prd 001_barbets-duet-full-build` pending.

6. **Feature branch merge** — feature/barbets-duet-full-build at commit `0b1e5c5` (last commit: infrastructure + research). Needs merge to main before or after wave 6, TBD.

---

## Modified/Touched Files

### Changed (committed)
- `app/api/search/route.ts` — switched model to google/gemma-2-9b-it:free (T23)
- `app/studio/[[...tool]]/page.tsx` — added `use client`, removed metadata export (Next 15 compat)
- `package.json` + `package-lock.json` — added styled-components
- `.karimo/BACKLOG.md` — NEW, lists queued PRDs
- `.karimo/prds/community-network/research/` — NEW, internal + external findings

### Untracked (not committed)
- `.env.local` — has SANITY tokens, OPENROUTER_API_KEY (no credentials in git)
- graphify-out/ — refreshed graph (not committed, git-ignored)
- .claude/, .mcp.json, .vscode/, pastebin/ — external files

---

## Immediate Next 3 Steps

### Step 1: Resume Community-Network Interview
**Context:** Agent `ae7fc403ccb79685c` has Round 1 questions pending. Need user answers:
1. Problem framing
2. Primary user type
3. Success metrics (3mo + 1yr)
4. Biggest blockers

**Action:** Use SendMessage with agent ID to continue, or restart interview with `/karimo:plan --prd community-network`.

**Estimated time:** 10–15 min for full interview (5 rounds) + PRD generation + approval.

### Step 2: Handle T24 / community-network Overlap
**Decision needed:** After community-network PRD is approved, decide:
- Option A: Fold community-network scope into T24 (merge PRD findings into T24 brief)
- Option B: Keep separate; T24 executes one slice, defer remaining community features to later PRD

**Action:** Review T24 brief scope (if available), compare against community-network PRD, make call.

**Estimated time:** 5 min decision + 15 min integration if Option A.

### Step 3: Finalize Wave 6 & Feature Branch Merge
**Blockers to resolve first:**
- Resend key (for volunteer form test)
- OpenRouter (skip search or add credits?)
- T24/community-network decision

**Action:** Once those clear, kick `/karimo:run --prd 001_barbets-duet-full-build` to execute wave 6. Then merge feature branch to main via PR for review.

**Estimated time:** Wave 6 execution ~4–6 hours (T24–T28, 5 tasks). Merge PR ~30 min review.

---

## Context for Next Session

### Credentials & Environment
- **Sanity:** Project ID in .env.local (Viewer token live, seed token deleted post-seed). Studio at /studio.
- **OpenRouter:** Key present but account has zero free credits. Search endpoint 500-errors on /api/search.
- **Resend:** Not yet configured (needs account + key).
- **Dev server:** Running on localhost:3000 (bg process bzmplmedc, next dev). Studio loads but images need manual upload to Sanity.

### Key Files to Know
- `.karimo/config.yaml` — project config (already detected)
- `.karimo/prds/001_barbets-duet-full-build/` — active PRD, status.json shows wave 6 queued
- `.karimo/prds/community-network/` — new research folder, awaiting interview
- `.karimo/BACKLOG.md` — lists 3 queued PRDs post-wave-6 (route-gaps, data-model-unify, admin-portal)
- `graphify-out/GRAPH_REPORT.md` — refreshed 2026-06-09 (679 nodes, 121 communities)

### Design System & Tokens
- Colors: Viridian (#006F53, primary), Night Forest (#06211A, dark bg), Neon Lime (#DBFF66)
- Fonts: BioRhyme (headings), DM Sans (body)
- Focus ring: `focus:ring-2 focus:ring-viridian` (standardized)
- No PWA setup yet (day-one blocker identified for community features)

### Outstanding Tech Debt
- PWA (Progressive Web App) required for rural offline access — no current foundation
- Member avatar field on TeamMember always `undefined` — never populated
- LearningSite.leadPartners is just name strings, not type-safe references
- No Contribution or member-profile type yet
- Story/Project/Event types lack author/contributor fields

---

## Test Verification Checklist

Before signing off wave 5 complete + moving to wave 6:
- [ ] Sanity Studio loads & displays seeded content (/studio)
- [ ] /api/search returns 500 (expected, no OpenRouter credits)
- [ ] Volunteer form can be accessed (/get-involved)
- [ ] Header nav has /community link (currently commented, to be uncommented in T24)
- [ ] Graph refreshed, sitemap gaps documented

---

## Command Reference for Next Session

```bash
# Resume community-network interview
/karimo:plan --prd community-network

# OR continue paused agent
SendMessage to: ae7fc403ccb79685c

# Execute wave 6 (after PRD approval)
/karimo:run --prd 001_barbets-duet-full-build

# Check PRD status
cat .karimo/prds/001_barbets-duet-full-build/status.json

# Dev server already running (bg)
# Restart if needed: npm run dev
```

---

## Conversation Artifacts

- **Agent ID for community-network interview:** `ae7fc403ccb79685c` (karimo-interviewer, Round 1 pending)
- **Recent commits:**
  - `0b1e5c5` — Wave 5 infrastructure + Studio fix
  - `067cb5e` — community-network research (internal + external)
  - `6a2c60b` — Wave 5 PRs merged (T18–T23 squashed)

---

## Notes for Continuity

- **Caveman mode is ACTIVE** — keep it on (65% token savings). Disable with "stop caveman" if needed.
- **Graph is stale as of 2026-05-20; refreshed 2026-06-09** — next refresh after major route/data changes.
- **Sitemap gaps fixed:** All critical blockers from original audit (siteSlug rename, LS type completion, Header nav) are closed.
- **Wave 6 is greenfield:** No prior execution, T24–T28 are virgin tasks. T24 scope overlaps community-network — resolve before executing.

---

**Session saved:** 2026-06-09 21:30 UTC  
**Ready to resume:** `/karimo:plan --prd community-network` or continue agent `ae7fc403ccb79685c`
