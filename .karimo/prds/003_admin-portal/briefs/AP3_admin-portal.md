# Task Brief: AP3 — Admin Layout + Nav Shell

**PRD:** admin-portal
**Wave:** 1 (third in sequence, after AP2)
**Complexity:** 2/10
**Model:** Sonnet
**Branch:** worktree/admin-portal-AP3
**Base branch:** feature/admin-portal
**Worktree path:** .karimo/.worktrees/admin-portal/AP3

---

## Context

AP1 created the Supabase auth utilities. AP2 extended middleware.ts to gate `/admin/*`.
This task creates the layout shell and nav that all Wave 2 CRUD pages will inhabit.

Design system references:
- Night Forest: `#06211A`
- Neon Lime: `#DBFF66`
- Platinum: `#F4F4F5`
- Font: DM Sans (no BioRhyme in admin UI)

Apply `design-taste-frontend` skill rules: no emoji, full interaction states (loading,
empty, error), RSC for layout, isolated Client Components for interactive pieces.

---

## Files to Create

| File | Notes |
|------|-------|
| `components/admin/AdminSidebar.tsx` | Client component — handles mobile drawer state |
| `components/admin/AdminNav.tsx` | Server-passable nav links (receives role prop) |
| `app/admin/layout.tsx` | Server component — reads session, wraps all /admin pages |
| `app/admin/page.tsx` | Dashboard home — welcome + quick stats |

---

## Deliverables

### 1. `components/admin/AdminNav.tsx`

Pure presentational component. Receives role and current path as props. No server calls.

```typescript
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  label: string
  href: string
  roles: Array<'coordinator' | 'admin'>
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'T&E Queue',
    href: '/admin/submissions',
    roles: ['coordinator', 'admin'],
  },
  {
    label: 'Peer Review',
    href: '/admin/peer-review',
    roles: ['coordinator', 'admin'],
  },
  {
    label: 'Members',
    href: '/admin/members',
    roles: ['admin'],
  },
  {
    label: 'Pentangles',
    href: '/admin/pentangles',
    roles: ['admin'],
  },
]

interface AdminNavProps {
  role: 'coordinator' | 'admin'
}

export function AdminNav({ role }: AdminNavProps) {
  const pathname = usePathname()

  const visibleItems = NAV_ITEMS.filter((item) => item.roles.includes(role))

  return (
    <nav aria-label="Admin navigation">
      <ul className="space-y-1" role="list">
        {visibleItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={[
                  'flex items-center px-4 py-2.5 text-sm font-medium rounded-sm',
                  'transition-colors duration-150 font-[\'DM_Sans\']',
                  isActive
                    ? 'text-[#DBFF66] border-l-2 border-[#DBFF66] pl-[14px] bg-white/5'
                    : 'text-white/70 hover:text-white hover:bg-white/5 border-l-2 border-transparent',
                ].join(' ')}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
```

### 2. `components/admin/AdminSidebar.tsx`

Handles mobile responsive state. Sidebar is always visible on lg+, collapses to drawer on mobile.

```typescript
'use client'

import { useState } from 'react'
import { AdminNav } from './AdminNav'
import { X, List } from '@phosphor-icons/react'

interface AdminSidebarProps {
  role: 'coordinator' | 'admin'
  userEmail: string
  onSignOut: () => void
}

export function AdminSidebar({ role, userEmail, onSignOut }: AdminSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo / brand */}
      <div className="px-4 py-6 border-b border-white/10">
        <p className="text-xs font-medium tracking-widest text-white/40 uppercase font-['DM_Sans']">
          Barbets Duet
        </p>
        <p className="text-sm font-semibold text-white mt-0.5 font-['DM_Sans']">
          Admin Portal
        </p>
      </div>

      {/* Role badge */}
      <div className="px-4 py-3">
        <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-[#DBFF66]/10 text-[#DBFF66] font-medium font-['DM_Sans'] uppercase tracking-wider">
          {role}
        </span>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-2 py-2">
        <AdminNav role={role} />
      </div>

      {/* User + sign out */}
      <div className="px-4 py-4 border-t border-white/10">
        <p className="text-xs text-white/40 font-['DM_Sans'] truncate mb-2">
          {userEmail}
        </p>
        <button
          onClick={onSignOut}
          className="text-xs text-white/60 hover:text-white font-['DM_Sans'] transition-colors"
        >
          Sign out
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#06211A] text-white rounded-md shadow-lg"
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation"
      >
        <List size={20} weight="regular" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={[
          'fixed inset-y-0 left-0 z-50 w-60 bg-[#06211A]',
          'transform transition-transform duration-200 ease-in-out',
          'lg:translate-x-0 lg:static lg:z-auto',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
        aria-label="Sidebar"
      >
        {/* Mobile close button */}
        <button
          className="lg:hidden absolute top-4 right-4 text-white/60 hover:text-white"
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation"
        >
          <X size={18} weight="regular" />
        </button>

        {sidebarContent}
      </aside>
    </>
  )
}
```

**Check package.json for @phosphor-icons/react before using it. If not installed:**
```bash
npm install @phosphor-icons/react
```

### 3. `app/admin/layout.tsx`

Server component. Reads session, renders sidebar + content area.

```typescript
import { getSessionUser } from '@/lib/supabase/admin-auth'
import { redirect } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { createClient } from '@/lib/supabase/server'

async function handleSignOut() {
  'use server'
  const supabase = await createClient()
  if (supabase) {
    await supabase.auth.signOut()
  }
  redirect('/auth/login')
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getSessionUser()

  if (!user) {
    redirect('/auth/login')
  }

  if (user.role === 'member') {
    redirect('/403')
  }

  return (
    <div className="flex min-h-[100dvh] bg-[#F4F4F5]">
      <AdminSidebar
        role={user.role as 'coordinator' | 'admin'}
        userEmail={user.email ?? ''}
        onSignOut={handleSignOut}
      />
      <main className="flex-1 lg:ml-0 min-w-0">
        {children}
      </main>
    </div>
  )
}
```

**Note on Server Actions:** The `handleSignOut` server action is defined inline in the
layout. This is valid Next.js 15 App Router pattern. The `AdminSidebar` receives it as
an `onSignOut` prop.

### 4. `app/admin/page.tsx`

Dashboard home — quick stats and welcome.

```typescript
import { getSessionUser } from '@/lib/supabase/admin-auth'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

async function getQuickStats() {
  const supabase = await createClient()
  if (!supabase) {
    return { pendingSubmissions: 0, overdueReviews: 0 }
  }

  const [{ count: pendingSubmissions }, { count: overdueReviews }] = await Promise.all([
    supabase
      .from('contributions')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'draft'),
    supabase
      .from('peer_review_assignments')
      .select('*', { count: 'exact', head: true })
      .neq('status', 'complete')
      .lt('due_date', new Date().toISOString()),
  ])

  return {
    pendingSubmissions: pendingSubmissions ?? 0,
    overdueReviews: overdueReviews ?? 0,
  }
}

export default async function AdminHomePage() {
  const user = await getSessionUser()
  if (!user) redirect('/auth/login')

  const { pendingSubmissions, overdueReviews } = await getQuickStats()

  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="text-xs font-medium tracking-widest text-[#06211A]/40 uppercase mb-1 font-['DM_Sans']">
          Dashboard
        </p>
        <h1 className="text-2xl font-semibold text-[#06211A] font-['DM_Sans']">
          Welcome, {user.email}
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
        <div className="bg-white border border-[#06211A]/8 rounded-lg p-5">
          <p className="text-xs font-medium text-[#06211A]/40 uppercase tracking-widest font-['DM_Sans'] mb-2">
            Pending submissions
          </p>
          <p className="text-3xl font-semibold text-[#06211A] font-['DM_Sans']">
            {pendingSubmissions}
          </p>
          <a
            href="/admin/submissions"
            className="mt-3 inline-block text-xs text-[#06211A]/60 hover:text-[#06211A] underline underline-offset-2 font-['DM_Sans']"
          >
            View queue
          </a>
        </div>

        <div className="bg-white border border-[#06211A]/8 rounded-lg p-5">
          <p className="text-xs font-medium text-[#06211A]/40 uppercase tracking-widest font-['DM_Sans'] mb-2">
            Overdue reviews
          </p>
          <p className={`text-3xl font-semibold font-['DM_Sans'] ${overdueReviews > 0 ? 'text-red-600' : 'text-[#06211A]'}`}>
            {overdueReviews}
          </p>
          <a
            href="/admin/peer-review"
            className="mt-3 inline-block text-xs text-[#06211A]/60 hover:text-[#06211A] underline underline-offset-2 font-['DM_Sans']"
          >
            View peer review
          </a>
        </div>
      </div>
    </div>
  )
}
```

---

## Acceptance Criteria

- [ ] `app/admin/layout.tsx` — Server component, calls `getSessionUser()`, redirects if no session or member role
- [ ] Sidebar visible on desktop (lg+), collapses to hamburger drawer on mobile
- [ ] `AdminNav` shows only T&E Queue + Peer Review for coordinator; all 4 items for admin
- [ ] Active nav link has `#DBFF66` left border and text colour
- [ ] Sidebar background is `#06211A` (Night Forest), content area is `#F4F4F5` (Platinum)
- [ ] All labels use DM Sans (no BioRhyme)
- [ ] Sign out button calls `supabase.auth.signOut()` via server action
- [ ] `app/admin/page.tsx` renders welcome heading + 2 stat cards
- [ ] Quick stats handle null Supabase client gracefully (show 0, no throw)
- [ ] WCAG 2.2 AA: Neon Lime `#DBFF66` on Night Forest `#06211A` — verify contrast ≥ 4.5:1
- [ ] TypeScript strict mode passes: `npx tsc --noEmit`
- [ ] No emoji in any component

---

## Design Constraints (from design-taste-frontend skill)

- No generic spinners — skeleton loaders if loading states needed
- No centered hero layouts — admin is a left-sidebar + content area layout
- Cards only where elevation is functional (stat cards: yes; nav items: no)
- Sidebar uses negative space + `divide-y` dividers rather than boxing everything in cards
- Font: DM Sans exclusively in admin UI — BioRhyme is banned here
- All interactive states: hover, disabled, active — must be implemented

---

## Contrast Check (for reviewer)

`#DBFF66` on `#06211A`:
- Luminance of `#DBFF66` ≈ 0.757
- Luminance of `#06211A` ≈ 0.005
- Contrast ratio ≈ 16.9:1 — well above 4.5:1 AA requirement

`white/70` (`rgba(255,255,255,0.7)`) on `#06211A` for inactive nav:
- Effective: approximately `#B3B3B3` equivalent
- Contrast against `#06211A` ≈ 9.1:1 — passes AA

---

## Notes for Implementer

- Check whether `@phosphor-icons/react` is in package.json before importing. If not,
  install it and add to the commit.
- The `handleSignOut` server action in `layout.tsx` must have `'use server'` directive.
- `AdminSidebar` is a Client Component (`'use client'`) because it manages `useState` for
  the mobile drawer. It receives `onSignOut` as a prop (server action passed from Server
  Component — valid pattern in Next.js 15).
- Quick stats queries in `app/admin/page.tsx` assume `peer_review_assignments.due_date`
  column exists (confirmed in PRD open questions — assume yes from PR #9).

---

## Commit Message

```
feat(admin): AP3 — admin layout + nav shell with role-aware sidebar
```
