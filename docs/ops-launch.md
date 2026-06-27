# Barbets Duet — Launch & Ops Runbook

**Status:** Live in production (2026-06-27). URL: `https://barbets-duet-git-main-barbets.vercel.app`
Vercel team `barbets` · project `barbets-duet` · git-connected to `barbetsduet/barbets-duet` (auto-deploy on push to `main`).

> Deploy gotchas (see also memory `project_vercel_deploy`): commits **must** be authored by `barbetsduet` (else Vercel holds them as `UNKNOWN`/"building"); Arcjet lives in `lib/arcjet.ts` (route handlers), **not** middleware (1 MB Edge limit); push to git, never `vercel deploy` (free-tier upload cap).

---

## What's live & verified
- Public site renders Sanity content (14 learning sites incl. London Urban Canopy, projects, stories, events, blog, news, team) with static fallback.
- Auth + `/admin` RBAC (unauth → `/auth/login`). Supabase migrated, RLS + role-escalation trigger applied.
- CI: `tsc` + lint + Vitest (16) + build, plus Playwright e2e (15) against the live URL.

## Remaining launch checklist (credentials / config — Barbets to action)
1. **Stripe (donations)** — set the real `STRIPE_SECRET_KEY` in Vercel (currently a placeholder; donations fail until set). Also `STRIPE_WEBHOOK_SECRET` if using payment webhooks.
2. **Liveblocks notifications** — set `LIVEBLOCKS_WEBHOOK_SECRET`; in the Liveblocks dashboard add webhook → `https://<domain>/api/liveblocks-webhook`.
3. **Sanity live-edit** — in Sanity → API → Webhooks add `https://<domain>/api/revalidate` with header `x-webhook-secret: $SANITY_WEBHOOK_SECRET`, triggers Create/Update/Delete. (Lets editors publish without a redeploy.)
4. **Custom domain** — add `barbetsduet.org` in Vercel → Domains; then set `NEXT_PUBLIC_BASE_URL` to it (Stripe success/cancel URLs use it).
5. **RLS runtime check** — sign in as a non-admin member and confirm `update profiles set role='admin'` is rejected (the `prevent_profile_role_escalation` trigger).

## Observability
- **Product analytics:** Umami (cookieless, no consent banner needed) — loads in production when `NEXT_PUBLIC_UMAMI_WEBSITE_ID` is set (it is). See `app/layout.tsx`.
- **Runtime logs / errors:** Vercel platform (Deployments → Runtime Logs; Observability tab).
- **Error tracking (Sentry) — opt-in follow-up.** Not wired: `@sentry/nextjs` is a build-integrated SDK and Next 16 support should be confirmed before adding (a bad version can break the build). When ready: create a Sentry project, run `npx @sentry/wizard@latest -i nextjs`, add `SENTRY_DSN` to Vercel, verify `next build` stays green locally before pushing.

## Backups / DR
- **Supabase:** enable **Point-in-Time Recovery** (Project → Settings → Database → PITR — requires a paid Supabase tier). Daily backups are on by default on paid plans.
- **Sanity:** schedule dataset export — `npx sanity dataset export production backup-$(date +%F).tar.gz` (run from a machine with a read token). Store off-site; automate weekly.
- **Code:** GitHub `barbetsduet/barbets-duet` is the source of truth.

## Deferred (post-launch, non-blocking)
- Service-worker offline caching (manifest is live; add SW + verify on prod — a bad SW can serve stale/broken cache, so test carefully).
- Playwright critical-path flows needing test credentials (auth sign-in, donation in Stripe test mode, admin T&E publish).
- Migrate `lib/data/*` static fallback fully into Sanity editorial ownership (currently CMS-first with static fallback).
