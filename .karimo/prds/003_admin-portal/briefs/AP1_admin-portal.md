# Task Brief: AP1 — Supabase Auth Helper + Role Check Utilities

**PRD:** admin-portal
**Wave:** 1 (first in sequence)
**Complexity:** 2/10
**Model:** Sonnet
**Branch:** worktree/admin-portal-AP1
**Base branch:** feature/admin-portal
**Worktree path:** .karimo/.worktrees/admin-portal/AP1

---

## Context

Barbets Duet has an existing Next.js 15 app with Firebase auth for `/dashboard`. We are
building a separate Supabase-auth-based admin portal at `/admin`. The two auth systems
must coexist without interfering.

PR #9 (now merged to main) added the community-network schema including:
- `profiles` table with `member_role` enum: `'member' | 'coordinator' | 'admin'`
- `contributions`, `peer_review_assignments`, `pentangle_groups` tables
- RLS policies enforcing role-based access

`@supabase/ssr` is NOT yet in package.json. This task installs it and creates the server
utility layer. There is no UI in this task.

**IMPORTANT:** `lib/firebase.ts` and `components/AuthProvider.tsx` are boundary files —
do NOT modify them.

---

## Files to Create / Modify

| File | Action | Notes |
|------|--------|-------|
| `package.json` | Modify | Add `@supabase/ssr` and `@supabase/supabase-js` to dependencies |
| `lib/supabase/client.ts` | Create | Browser-side Supabase client |
| `lib/supabase/server.ts` | Create | Server component Supabase client (reads cookies via `next/headers`) |
| `lib/supabase/admin-auth.ts` | Create | Auth helpers + role utilities |

---

## Deliverables

### 1. `package.json` — install @supabase/ssr

Run in the worktree:
```bash
npm install @supabase/ssr @supabase/supabase-js
```

Both packages should appear under `dependencies`.

### 2. `lib/supabase/client.ts`

Browser-side client for use in Client Components:

```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    // Graceful degradation — credentials not configured
    console.warn('[Supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
    // Return a stub that won't throw at import time
    return null as unknown as ReturnType<typeof createBrowserClient>
  }

  return createBrowserClient(url, key)
}
```

### 3. `lib/supabase/server.ts`

Server-side client for Server Components and Server Actions:

```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.warn('[Supabase] Missing env vars — admin auth will not function')
    return null as unknown as ReturnType<typeof createServerClient>
  }

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // Called from Server Component — cookie setting is read-only, safe to ignore
        }
      },
    },
  })
}
```

### 4. `lib/supabase/admin-auth.ts`

Core auth utilities used by middleware and server components:

```typescript
import { createClient } from './server'
import { redirect } from 'next/navigation'

/**
 * Role values derived from profiles.member_role enum (PR #9 schema).
 * Keep in sync with Supabase migration if enum changes.
 */
export type MemberRole = 'member' | 'coordinator' | 'admin'

/**
 * Returns the authenticated Supabase user + their member_role from profiles.
 * Returns null if no session or if Supabase is not configured.
 */
export async function getSessionUser(): Promise<{
  id: string
  email: string | undefined
  role: MemberRole
} | null> {
  const supabase = await createClient()
  if (!supabase) {
    console.warn('[admin-auth] Supabase not configured — getSessionUser returns null')
    return null
  }

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return null
  }

  // Fetch member_role from profiles table
  const { data: profile } = await supabase
    .from('profiles')
    .select('member_role')
    .eq('id', user.id)
    .single()

  const role: MemberRole = (profile?.member_role as MemberRole) ?? 'member'

  return {
    id: user.id,
    email: user.email,
    role,
  }
}

/**
 * Server-side route guard. Call at the top of any Server Component or Server Action
 * that requires a specific role.
 *
 * Redirects to /auth/login if unauthenticated.
 * Redirects to /403 if authenticated but role not in `allowedRoles`.
 *
 * Usage:
 *   const user = await requireRole(['coordinator', 'admin'])
 */
export async function requireRole(allowedRoles: MemberRole[]) {
  const user = await getSessionUser()

  if (!user) {
    redirect('/auth/login')
  }

  if (!allowedRoles.includes(user.role)) {
    redirect('/403')
  }

  return user
}
```

---

## Acceptance Criteria

- [ ] `@supabase/ssr` and `@supabase/supabase-js` appear in `package.json` dependencies
- [ ] `lib/supabase/client.ts` exports `createClient()` — returns null + logs warning when env vars missing
- [ ] `lib/supabase/server.ts` exports `createClient()` — handles missing env vars gracefully
- [ ] `lib/supabase/admin-auth.ts` exports `MemberRole`, `getSessionUser()`, `requireRole()`
- [ ] `getSessionUser()` returns null when no session (not connected to DB yet — runtime behaviour)
- [ ] `requireRole(['admin'])` would redirect to /403 for coordinator session (logic correct by code inspection)
- [ ] TypeScript strict mode passes: `npx tsc --noEmit`
- [ ] `lib/firebase.ts` not modified
- [ ] `components/AuthProvider.tsx` not modified

---

## Notes for Implementer

- Supabase credentials (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) are
  NOT present in the environment yet. All code must handle `undefined` env vars gracefully
  — warn to console, return null, do not throw at module load time.
- The `createClient()` in `server.ts` is `async` because `cookies()` from `next/headers`
  is async in Next.js 15.
- Do not import from `lib/firebase.ts` in any new file.
- No UI components, no routes — pure utility layer.

---

## Commit Message

```
feat(admin): AP1 — Supabase auth helpers + role check utilities
```
