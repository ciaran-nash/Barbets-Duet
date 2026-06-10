# Task Brief: AP2 — Middleware Route Protection

**PRD:** admin-portal
**Wave:** 1 (second in sequence, after AP1)
**Complexity:** 3/10
**Model:** Sonnet
**Branch:** worktree/admin-portal-AP2
**Base branch:** feature/admin-portal
**Worktree path:** .karimo/.worktrees/admin-portal/AP2

---

## REQUIRE_REVIEW BOUNDARY

`middleware.ts` is a require_review boundary file. This PR must be explicitly reviewed by
a human before merge. It is flagged as `needs-human-review` in the PR labels. Do not
auto-merge.

---

## Context

AP1 has created `lib/supabase/admin-auth.ts` with `getSessionUser()` and `requireRole()`.

The existing `middleware.ts` (root of repo) handles Arcjet rate limiting for two API
routes. It must be extended to add Supabase session-based route protection for `/admin/*`
and `/superadmin/*` — WITHOUT breaking existing Arcjet behaviour.

Composition order is critical:
1. Arcjet shield + bot detection (all routes — existing)
2. Arcjet rate limiters for `/api/volunteer` and `/api/create-checkout-session` (existing)
3. NEW: Supabase session check for `/admin/*` and `/superadmin/*`

**Current middleware.ts matcher:**
```typescript
matcher: ["/api/volunteer", "/api/create-checkout-session"]
```

This must be extended to include admin paths.

---

## Files to Create / Modify

| File | Action | Notes |
|------|--------|-------|
| `middleware.ts` | Modify | Extend with Supabase session checks — REQUIRE_REVIEW |
| `app/403/page.tsx` | Create | Access denied page |
| `app/auth/login/page.tsx` | Create | Supabase email+password sign-in form |

---

## Deliverables

### 1. Extended `middleware.ts`

Full replacement of current middleware.ts. Preserve ALL existing Arcjet logic exactly:

```typescript
import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/next";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Base Arcjet instance with shield (common attack protection) and bot detection.
 * Applied to all protected routes.
 */
const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
  ],
});

/**
 * Rate limiter for the volunteer form endpoint.
 * Max 5 submissions per IP per hour to prevent spam applications.
 */
const volunteerLimiter = aj.withRule(
  tokenBucket({
    mode: "LIVE",
    characteristics: ["ip.src"],
    refillRate: 5,
    interval: 3600,
    capacity: 5,
  })
);

/**
 * Rate limiter for the checkout session endpoint.
 * Max 10 requests per IP per hour to prevent payment abuse.
 */
const donationLimiter = aj.withRule(
  tokenBucket({
    mode: "LIVE",
    characteristics: ["ip.src"],
    refillRate: 10,
    interval: 3600,
    capacity: 10,
  })
);

/**
 * Helper: get Supabase session from middleware request cookies.
 * Returns null if Supabase is not configured or no session present.
 * NOTE: Uses createServerClient directly (not lib/supabase/server.ts) because
 * middleware cannot use next/headers — it must read cookies from the request object.
 */
async function getMiddlewareSession(request: NextRequest): Promise<{
  id: string;
  role: "member" | "coordinator" | "admin";
} | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    // Supabase not configured — fail open (do not block admin routes in dev
    // without credentials, but warn)
    console.warn("[middleware] Supabase env vars missing — admin routes unprotected");
    return null;
  }

  // Build a response to collect Set-Cookie headers from Supabase
  const response = NextResponse.next();

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value);
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  // Fetch member_role from profiles
  const { data: profile } = await supabase
    .from("profiles")
    .select("member_role")
    .eq("id", user.id)
    .single();

  const role = (profile?.member_role as "member" | "coordinator" | "admin") ?? "member";

  return { id: user.id, role };
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Arcjet rate limiters (existing — must not regress) ──────────────────
  if (pathname === "/api/volunteer") {
    const decision = await volunteerLimiter.protect(request, { requested: 1 });
    if (decision.isDenied()) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }
  }

  if (pathname === "/api/create-checkout-session") {
    const decision = await donationLimiter.protect(request, { requested: 1 });
    if (decision.isDenied()) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }
  }

  // ── Supabase admin route protection (new) ────────────────────────────────
  const isAdminRoute = pathname.startsWith("/admin");
  const isSuperadminRoute = pathname.startsWith("/superadmin");

  if (isAdminRoute || isSuperadminRoute) {
    const session = await getMiddlewareSession(request);

    if (!session) {
      // Unauthenticated — redirect to login
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/auth/login";
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (isSuperadminRoute && session.role !== "admin") {
      // Insufficient role for superadmin routes
      return NextResponse.redirect(new URL("/403", request.url));
    }

    if (isAdminRoute && session.role === "member") {
      // Members cannot access admin routes
      return NextResponse.redirect(new URL("/403", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/volunteer",
    "/api/create-checkout-session",
    "/admin/:path*",
    "/superadmin/:path*",
  ],
};
```

**Important:** The `fail-open` behaviour when Supabase env vars are missing (line with
`console.warn`) is intentional for dev environments without credentials configured. RLS
at the DB layer is the authoritative security control.

### 2. `app/403/page.tsx`

```typescript
export default function AccessDeniedPage() {
  return (
    <main className="min-h-[100dvh] flex items-center justify-center bg-[#F4F4F5]">
      <div className="text-center max-w-md px-6">
        <p className="text-sm font-medium tracking-widest text-[#06211A]/40 uppercase mb-4 font-['DM_Sans']">
          403
        </p>
        <h1 className="text-3xl font-semibold text-[#06211A] mb-3 font-['DM_Sans']">
          Access denied
        </h1>
        <p className="text-base text-[#06211A]/60 leading-relaxed font-['DM_Sans']">
          You do not have permission to view this page. Contact your administrator
          if you believe this is an error.
        </p>
        <a
          href="/"
          className="mt-8 inline-block text-sm font-medium text-[#06211A] underline underline-offset-4 font-['DM_Sans']"
        >
          Return to home
        </a>
      </div>
    </main>
  )
}
```

### 3. `app/auth/login/page.tsx`

Supabase email+password sign-in. Uses `'use client'` because it handles form submission.

```typescript
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') ?? '/admin'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()
    if (!supabase) {
      setError('Authentication service is not configured.')
      setLoading(false)
      return
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      setError(signInError.message)
      setLoading(false)
      return
    }

    router.push(next)
    router.refresh()
  }

  return (
    <main className="min-h-[100dvh] flex items-center justify-center bg-[#F4F4F5]">
      <div className="w-full max-w-sm px-6">
        <div className="mb-8">
          <p className="text-xs font-medium tracking-widest text-[#06211A]/40 uppercase mb-2 font-['DM_Sans']">
            Admin portal
          </p>
          <h1 className="text-2xl font-semibold text-[#06211A] font-['DM_Sans']">
            Sign in
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#06211A] mb-1.5 font-['DM_Sans']"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 text-sm bg-white border border-[#06211A]/20 rounded-md
                         text-[#06211A] placeholder:text-[#06211A]/30 font-['DM_Sans']
                         focus:outline-none focus:ring-2 focus:ring-[#DBFF66] focus:border-transparent
                         transition-shadow"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#06211A] mb-1.5 font-['DM_Sans']"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2.5 text-sm bg-white border border-[#06211A]/20 rounded-md
                         text-[#06211A] font-['DM_Sans']
                         focus:outline-none focus:ring-2 focus:ring-[#DBFF66] focus:border-transparent
                         transition-shadow"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 font-['DM_Sans']">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-[#06211A] text-[#DBFF66] text-sm font-medium
                       rounded-md font-['DM_Sans'] transition-opacity
                       hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

          {/* TODO: Google OAuth — add when Supabase OAuth provider configured */}
        </form>
      </div>
    </main>
  )
}
```

---

## Acceptance Criteria

- [ ] `middleware.ts` extended: `/admin/:path*` and `/superadmin/:path*` added to matcher
- [ ] Unauthenticated request to `/admin` would redirect to `/auth/login?next=/admin`
- [ ] Request to `/superadmin` with coordinator role would redirect to `/403`
- [ ] Arcjet rate limiter paths (`/api/volunteer`, `/api/create-checkout-session`) still in matcher
- [ ] Missing Supabase env vars: middleware warns but fails open (does not block routes in dev)
- [ ] `app/403/page.tsx` renders "Access denied" with brand colours (Night Forest + Platinum)
- [ ] `app/auth/login/page.tsx` renders email+password form with Supabase sign-in logic
- [ ] Login form handles missing Supabase client gracefully (error message, not throw)
- [ ] TypeScript strict mode passes: `npx tsc --noEmit`
- [ ] PR labelled `needs-human-review` — middleware.ts is a require_review boundary

---

## REQUIRE_REVIEW Flag for PR

When creating the PR, add this to the PR body:

```
> REQUIRE_REVIEW: middleware.ts modified
>
> This PR modifies middleware.ts, a require_review boundary file.
> Human review is mandatory before merge.
>
> Checklist for reviewer:
> - [ ] Arcjet volunteer/donation limiters still in matcher
> - [ ] /admin/* redirect logic correct (unauth → /auth/login, member role → /403)
> - [ ] /superadmin/* redirect logic correct (non-admin → /403)
> - [ ] fail-open behaviour (missing env vars) is acceptable for dev
> - [ ] No Firebase imports added to middleware.ts
```

---

## Notes for Implementer

- Do NOT import from `lib/supabase/server.ts` in middleware. Middleware cannot use
  `next/headers`. Create the `createServerClient` directly inside `getMiddlewareSession()`
  reading cookies from the `NextRequest` object.
- The `getMiddlewareSession()` function makes a DB round-trip to read `profiles.member_role`.
  This is acceptable given admin-portal traffic is staff-only (very low volume).
- `lib/firebase.ts` and `components/AuthProvider.tsx` must not be touched.

---

## Commit Message

```
feat(admin): AP2 — middleware route protection for /admin + /superadmin
```
