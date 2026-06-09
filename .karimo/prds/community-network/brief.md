# PRD Brief: Community Network
_PRD slug: community-network_
_Status: Round 1 complete (pending stakeholder alignment confirmation)_
_Updated: 2026-06-09_

---

## Round 1: Framing

### Problem Statement
Barbets Duet's /community/* routes are entirely missing. The nav link is commented out with TODO(T24). There is no digital space for the Jumuiya governance model, member profiles, site-level community pages, or network visualizations — leaving the collective's horizontal knowledge exchange happening off-platform (WhatsApp, informal email) with no searchable archive.

### Who This Is For
- **Site Coordinators / Founding Partners:** Manage local land experiments, moderate their site's community space, participate in circular peer review
- **Junior Members / Youth:** Access educational modules, contribute Trial & Error entries, seek internships
- **Barbet's Friends:** Global supporters, impact investors, skills-based volunteers — need a discovery and contribution pathway
- **Local Communities:** Broader audience at and around learning sites; non-bureaucratic entry point via "Local Communities" tier

### Core User Journey
1. Visitor discovers /community browse page (bento grid + map)
2. Explores site profiles and member cards
3. Signs up / is invited into a membership tier
4. Contributes a Trial & Error entry (4 mandatory prompts)
5. Gets linked into a Pentangle group or site-level forum thread
6. Site Coordinator reviews + approves contributions for their site

### Success Criteria
- Member can register and be assigned a role (one of 4 tiers)
- Member can submit a Trial & Error CMS entry answering all 4 prompts
- Learning site profiles are browsable and link to their members
- Forum/community chat exists per site (WhatsApp deferred; forum-first)
- Site Coordinators can moderate their own site spaces
- Circular peer review chain is visible in /community/governance

### MVP Scope (confirmed)
**In:** Trial & Error CMS, member auth + roles (4 tiers), learning site profiles, forum/community chat per site
**Deferred:** PWA offline capability, WhatsApp integration

---

## Jumuiya Membership Model (confirmed)

Non-bureaucratic, decentralized. 4 tiers:

| Tier | Description |
|---|---|
| Site Coordinators | Founding partners; manage local experiments; moderate site spaces |
| Junior Members | Youth; next-generation integration; access learning modules |
| Barbet's Friends | Global supporters, investors, volunteers; skills/financial contribution |
| Local Communities | Broader community at/around sites; lowest-friction entry |

Governing principles: Give/Gain, Radical Autonomy, Cross-Boundary Equality, Self-Financing

---

## Data Available

- **Jumuiya data:** 13 sites + partners CSV ready to seed (`research/internal/Barbets_Duet_Learning_Sites_and_Partners_Overview.csv`)
- **Existing auth:** Firebase Auth + Firestore `users/{uid}` (displayName, bio) — role field missing
- **Existing types:** `TeamMember`, `LearningSite`, `Story`, `Project` — all need extension
- **Existing components:** `SiteCard`, `SitesBrowse`, `RadialOrbitalTimeline`, `SitesMap` — all reusable

---

## Blockers Status

| Blocker | Status |
|---|---|
| PWA offline architecture | DEFERRED post-launch |
| Member auth + roles (4 tiers) | IN SCOPE — blocking |
| Jumuiya membership model | RESOLVED (4 tiers defined above) |
| WhatsApp integration | DEFERRED — forum-first |
| Jumuiya site data | READY (CSV provided) |
| Stakeholder alignment (Jumuiya leaders) | TBD — see Round 1 final question |

---

## Research Anchors

- Internal findings: `.karimo/prds/community-network/research/internal/findings.md`
- External findings: `.karimo/prds/community-network/research/external/findings.md`
- Assets: `.karimo/prds/community-network/assets/`

---

## Round 2: Scope
_To be filled after Round 1 stakeholder question is resolved._

---

## Open Questions
- [ ] Stakeholder alignment: Have Jumuiya leaders approved the "4 Returns" framework and circular peer-review model for digital representation?
- [ ] Forum platform: Build custom or embed (e.g., Discourse, Liveblocks, Tiptap)?
- [ ] Trial & Error CMS: Sanity schema or Firestore documents?
- [ ] Pentangle groupings: Are the 5-site groups already defined, or does the platform need to assign them?
- [ ] Member avatar: Upload flow or Google OAuth photo only?
