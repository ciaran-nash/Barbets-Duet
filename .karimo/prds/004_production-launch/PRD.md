# PRD: production-launch

**Slug:** production-launch
**Status:** in-progress
**Branch:** feature/admin-portal → main (Wave 0), then per-wave feature branches
**Date:** 2026-06-26
**Priority:** Critical — takes the platform from "built" to "live, verified production"

Canonical plan (source of truth for scope/detail): `~/.claude/plans/can-we-plan-to-jiggly-flame.md`.

---

## 1. Overview

Barbets Duet is feature-complete across four prior PRDs (full-build, community-network, route-gaps, admin-portal) but not production-ready: public content is hardcoded TS (not the intended CMS), no integration is verified against live services, there are no tests/CI, no GDPR consent, no PWA, AI search is dormant, secrets need rotation, and the admin-portal branch is unmerged.

This PRD drives the project to a **verifiable production launch**: `main` deployed to Vercel, all integrations live and smoke-verified, content editable in Sanity, critical flows under CI-gated tests, and GDPR/a11y/PWA baselines met.

## 2. Execution model

KARIMO-style waves with gates. Each wave ends green (`tsc --noEmit` + `next build`) and is committed/PR'd; the wave gate must pass before the next wave starts. Final gate = production sign-off.

| Wave | Goal | Gate |
|---|---|---|
| 0 | Stabilize & merge admin-portal → main | human: build green + branch merged + `london-urban-canopy` resolved |
| 1 | Static content → Sanity (with static fallback) | conditional+human: edit→revalidate works; fallback works |
| 2 | Integrations live + Vercel deploy | human: live smoke + RLS self-promote blocked |
| 3 | GDPR consent + WCAG 2.2 AA + minimal PWA | conditional+human: axe clean, consent-gated analytics, offline works |
| 4 | Vitest + Playwright + required CI check | conditional: tests green in CI |
| 5 | Sentry + analytics + backups + launch | human: prod smoke + sign-off |

## 3. Locked decisions

- `london-urban-canopy`: added as a provisional 14th learning site (flagged in-code for client confirm/replace).
- AI search: wire `/api/search` via Vercel AI Gateway (`"provider/model"` string).
- PWA offline scope: cache app shell + learning-site detail pages.
- Content: migrate `lib/data/*` to Sanity now; keep static as typed fallback.

## 4. Non-goals

- Tradable biodiversity-index / carbon-market product features (long-term vision).
- Internationalisation (deferred unless client confirms multilingual need).
- Decomposing large client components (tracked debt, not launch-blocking).
