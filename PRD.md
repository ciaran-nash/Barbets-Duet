# Barbets Duet — Product Requirements Document

> Full platform build: discover conservation learning sites → apply as volunteer → sponsor or donate

**Full PRD:** `.karimo/prds/barbets-duet-full-build/PRD_barbets-duet-full-build.md`
**Tasks:** `.karimo/prds/barbets-duet-full-build/tasks.yaml`
**Execution plan:** `.karimo/prds/barbets-duet-full-build/execution_plan.yaml`

---

## What we're building

A full-launch platform for the Barbets Duet Jumuiya network — 13 real conservation Learning Sites across Kenya, Uganda, Tanzania, UK, and USA. The site enables three user journeys:

1. **Discover** — Browse and explore all learning sites on a styled MapLibre map
2. **Join** — Apply as a volunteer to a specific site
3. **Support** — Donate to the organisation or sponsor a specific learning site

Content managed by non-dev Barbets Duet staff via **Sanity CMS**.

---

## 28 Tasks across 6 Waves

| Wave | Name | Tasks | Gate |
|---|---|---|---|
| 1 | Foundation | T01–T05 | Brand tokens, 13 sites seeded, nav clean |
| 2 | Content | T06–T11 | All pages render with real data |
| 3 | Discovery | T12–T13 | /learning-sites browse + map live |
| 4 | Actions | T14–T17 | Volunteer form + donation page in test mode |
| 5 | CMS | T18–T23 | Non-dev staff can publish, instant revalidation |
| 6 | Greenfield | T24–T28 | Community, Research, Blog, Admin, Design System |

**Total complexity:** 72 points · **Longest chain:** T01 → T02 → T06 → T12 → T18 → T20 → T24

---

## Start here

```bash
# Wave 1, Task 1 — Brand audit
# Read: .karimo/prds/barbets-duet-full-build/tasks.yaml (T01)
# Skills: .agents/skills/stitch-design-taste, .agents/skills/design-taste-frontend
```

---

## Tech stack

Next.js 15 · React 19 · TypeScript strict · Tailwind v4 · Firebase · Framer Motion · shadcn/ui · **Sanity CMS** · **MapLibre GL** · **Stripe + PayPal** · **Zod** · **Umami** · **Arcjet** · **Resend**

## Brand

- **Colours:** Neon Lime `#DBFF66` · Viridian `#006F53` · Night Forest `#06211A` · White `#FFFFFF` · Platinum `#F4F4F5`
- **Fonts:** BioRhyme (headings) · DM Sans (body) — both Google Fonts
- **Aesthetic:** Scholarly Cycle — circular frames, monochrome line art, scientific vernacular
