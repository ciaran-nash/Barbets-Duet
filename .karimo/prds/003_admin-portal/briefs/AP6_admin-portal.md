# Task Brief: AP6 — Member List + Role Assignment UI

**PRD:** admin-portal
**Wave:** 2 (parallel with AP4/AP5)
**Complexity:** 4/10
**Model:** Sonnet
**Branch:** worktree/admin-portal-AP6
**Base branch:** feature/admin-portal
**Worktree path:** .karimo/.worktrees/admin-portal/AP6

---

## Context

AP4 corrects `admin-auth.ts` to use the correct `profiles.role` column and the correct
`MemberRole` enum (`site_coordinator | junior_member | barbets_friend | local_community`).
AP6 builds on those corrected types.

This page is accessible only to `site_coordinator` role. It lists all members from the
`profiles` table with their current role, allows search by display_name/email, shows
50 per page, and provides an inline role selector for coordinators to reassign roles.
Role elevation to `site_coordinator` requires a confirmation modal (extra guard because
it grants admin-portal access).

**Note on "admin-only" in the prompt:** The PRD called this a "superadmin sub-path" for
"admin elevation". In the actual schema there is only one privileged role: `site_coordinator`.
There is no separate `admin` super-role. This page is therefore accessible to
`site_coordinator` users (same minimum as other admin pages). The "confirm modal for
admin elevation" translates to "confirm modal when assigning `site_coordinator` role"
because that is the highest role available.

---

## Boundary files — do NOT modify

- `lib/firebase.ts`
- `components/AuthProvider.tsx`
- `middleware.ts`
- `lib/supabase/admin-auth.ts` — AP4 has already corrected this; do not re-modify unless
  AP4 is not yet merged (pull `feature/admin-portal` before starting)

---

## Files to Create

| File | Action | Notes |
|------|--------|-------|
| `app/admin/members/page.tsx` | Create | Server Component — fetches paginated members list |
| `app/admin/members/MemberTable.tsx` | Create | `'use client'` — search, pagination, role selector |
| `app/admin/members/RoleConfirmModal.tsx` | Create | `'use client'` — confirmation dialog for coordinator elevation |
| `app/admin/members/actions.ts` | Create | `updateMemberRole` server action |

---

## Database facts (from 20260609000001_community_schema.sql)

```
profiles table columns:
  id            uuid (PK, = auth.users.id)
  email         text
  display_name  text
  avatar_url    text
  role          member_role  -- enum: site_coordinator | junior_member | barbets_friend | local_community
  bio           text
  created_at    timestamptz
  updated_at    timestamptz
```

RLS policy: `profiles_public_read` allows SELECT for all. Coordinators can only self-update
via `profiles_self_update`. Therefore the `updateMemberRole` server action must use the
**service-role key** (or a Supabase admin client) to bypass RLS, OR the RLS policy must
be extended to allow coordinators to update others' roles.

Since we do not add a new migration in this wave, use the **service-role key approach**:
check for `SUPABASE_SERVICE_ROLE_KEY` env var and fall back gracefully if absent.

---

## Deliverables

### 1. `app/admin/members/actions.ts`

```typescript
'use server'

import { createClient } from '@supabase/supabase-js'
import { requireRole } from '@/lib/supabase/admin-auth'
import type { MemberRole } from '@/lib/supabase/admin-auth'
import { revalidatePath } from 'next/cache'

export type UpdateRoleResult =
  | { ok: true; message: string }
  | { ok: false; error: string }

/**
 * Update a member's role in the profiles table.
 *
 * Uses service-role key to bypass RLS (required because
 * profiles_self_update only allows users to update their own rows).
 *
 * Requires the caller to have site_coordinator role.
 */
export async function updateMemberRole(
  userId: string,
  newRole: MemberRole
): Promise<UpdateRoleResult> {
  // Server-side role check
  try {
    await requireRole(['site_coordinator'])
  } catch (err) {
    if (err instanceof Error && err.message === 'NEXT_REDIRECT') throw err
    return { ok: false, error: 'Unauthorised.' }
  }

  const validRoles: MemberRole[] = [
    'site_coordinator',
    'junior_member',
    'barbets_friend',
    'local_community',
  ]
  if (!validRoles.includes(newRole)) {
    return { ok: false, error: 'Invalid role value.' }
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    return {
      ok: false,
      error: 'Service role credentials not configured. Set SUPABASE_SERVICE_ROLE_KEY.',
    }
  }

  // Admin client bypasses RLS
  const adminClient = createClient(url, serviceKey, {
    auth: { persistSession: false },
  })

  const { error } = await adminClient
    .from('profiles')
    .update({ role: newRole })
    .eq('id', userId)

  if (error) {
    console.error('[updateMemberRole] Supabase error:', error.message)
    return { ok: false, error: `Failed to update role: ${error.message}` }
  }

  revalidatePath('/admin/members')
  return { ok: true, message: `Role updated to ${newRole.replace(/_/g, ' ')}.` }
}
```

### 2. `app/admin/members/RoleConfirmModal.tsx`

Confirmation dialog specifically for coordinator elevation. Uses a native `<dialog>` element
for accessibility (focus trap, backdrop, Escape key to close).

```typescript
'use client'

import { useRef, useEffect } from 'react'

interface RoleConfirmModalProps {
  memberName: string
  newRole: string
  onConfirm: () => void
  onCancel: () => void
}

export function RoleConfirmModal({
  memberName,
  newRole,
  onConfirm,
  onCancel,
}: RoleConfirmModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    dialogRef.current?.showModal()
    return () => dialogRef.current?.close()
  }, [])

  function handleBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current) onCancel()
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      onKeyDown={(e) => { if (e.key === 'Escape') onCancel() }}
      className={[
        'rounded-lg p-0 border border-[#06211A]/15 shadow-xl w-full max-w-md',
        'backdrop:bg-black/40',
      ].join(' ')}
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      <div className="p-6">
        <h2
          id="confirm-modal-title"
          className="text-base font-semibold text-[#06211A] font-['DM_Sans'] mb-2"
        >
          Confirm role change
        </h2>
        <p className="text-sm text-[#06211A]/70 font-['DM_Sans'] mb-6">
          You are about to assign{' '}
          <span className="font-medium text-[#06211A]">{memberName}</span> the role of{' '}
          <span className="font-medium text-[#06211A]">
            {newRole.replace(/_/g, ' ')}
          </span>
          . This grants them access to the admin portal.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className={[
              'px-4 py-2 text-sm font-medium font-[\'DM_Sans\'] rounded',
              'text-[#06211A]/70 hover:text-[#06211A] border border-[#06211A]/20',
              'hover:bg-[#06211A]/5 transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06211A]/30',
            ].join(' ')}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={[
              'px-4 py-2 text-sm font-medium font-[\'DM_Sans\'] rounded',
              'bg-[#06211A] text-[#DBFF66] hover:bg-[#0d3627]',
              'transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DBFF66] focus-visible:ring-offset-1',
            ].join(' ')}
            autoFocus
          >
            Confirm
          </button>
        </div>
      </div>
    </dialog>
  )
}
```

### 3. `app/admin/members/MemberTable.tsx`

Client component. Receives the server-fetched members list and handles:
- Client-side search filtering (display_name + email)
- Pagination (50 per page, client-side)
- Inline role selector per row
- Confirmation modal for `site_coordinator` elevation

```typescript
'use client'

import { useState, useMemo } from 'react'
import { updateMemberRole } from './actions'
import { RoleConfirmModal } from './RoleConfirmModal'
import type { MemberRole } from '@/lib/supabase/admin-auth'

interface Member {
  id: string
  email: string | null
  display_name: string | null
  role: MemberRole
  created_at: string
}

interface MemberTableProps {
  members: Member[]
}

const ROLE_OPTIONS: { value: MemberRole; label: string }[] = [
  { value: 'site_coordinator', label: 'Site Coordinator' },
  { value: 'junior_member', label: 'Junior Member' },
  { value: 'barbets_friend', label: 'Barbets Friend' },
  { value: 'local_community', label: 'Local Community' },
]

const ROLE_BADGE: Record<MemberRole, string> = {
  site_coordinator: 'bg-[#DBFF66]/20 text-[#4a5e00]',
  junior_member: 'bg-[#2D6A4F]/15 text-[#2D6A4F]',
  barbets_friend: 'bg-blue-50 text-blue-700',
  local_community: 'bg-[#06211A]/8 text-[#06211A]/60',
}

const PAGE_SIZE = 50

export function MemberTable({ members }: MemberTableProps) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; ok: boolean } | null>(null)
  const [confirmPending, setConfirmPending] = useState<{
    memberId: string
    memberName: string
    newRole: MemberRole
  } | null>(null)

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    if (!q) return members
    return members.filter(
      (m) =>
        m.display_name?.toLowerCase().includes(q) ||
        m.email?.toLowerCase().includes(q)
    )
  }, [members, search])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const pageItems = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  // Reset to page 0 when search changes
  function handleSearch(value: string) {
    setSearch(value)
    setPage(0)
  }

  async function applyRoleChange(memberId: string, newRole: MemberRole) {
    setLoadingId(memberId)
    const result = await updateMemberRole(memberId, newRole)
    setLoadingId(null)
    setToast({ message: result.ok ? result.message : result.error, ok: result.ok })
    setTimeout(() => setToast(null), 4000)
  }

  function handleRoleSelect(member: Member, newRole: MemberRole) {
    if (newRole === member.role) return
    if (newRole === 'site_coordinator') {
      // Show confirmation modal for coordinator elevation
      setConfirmPending({
        memberId: member.id,
        memberName: member.display_name ?? member.email ?? member.id,
        newRole,
      })
    } else {
      applyRoleChange(member.id, newRole)
    }
  }

  return (
    <div>
      {/* Search */}
      <div className="p-4 border-b border-[#06211A]/8">
        <label htmlFor="member-search" className="sr-only">
          Search members
        </label>
        <input
          id="member-search"
          type="search"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by name or email..."
          className={[
            'w-full max-w-sm px-3 py-2 text-sm border border-[#06211A]/20 rounded-md',
            'font-[\'DM_Sans\'] text-[#06211A] placeholder:text-[#06211A]/35',
            'focus:outline-none focus:ring-2 focus:ring-[#06211A]/20 focus:border-[#06211A]/40',
          ].join(' ')}
        />
      </div>

      {/* Results count */}
      <div className="px-4 py-2 text-xs text-[#06211A]/40 font-['DM_Sans'] border-b border-[#06211A]/8">
        {filtered.length} member{filtered.length !== 1 ? 's' : ''}
        {search && ` matching "${search}"`}
      </div>

      {/* Table */}
      {pageItems.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-sm text-[#06211A]/40 font-['DM_Sans']">
            {search ? 'No members match your search.' : 'No members found.'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm" aria-label="Member list">
            <thead>
              <tr className="border-b border-[#06211A]/8">
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-[#06211A]/50 uppercase tracking-widest font-['DM_Sans']"
                >
                  Member
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-[#06211A]/50 uppercase tracking-widest font-['DM_Sans']"
                >
                  Current Role
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-[#06211A]/50 uppercase tracking-widest font-['DM_Sans']"
                >
                  Change Role
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-[#06211A]/50 uppercase tracking-widest font-['DM_Sans']"
                >
                  Joined
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#06211A]/8">
              {pageItems.map((member) => (
                <tr
                  key={member.id}
                  className={[
                    'transition-colors hover:bg-[#06211A]/2',
                    loadingId === member.id ? 'opacity-50' : '',
                  ].join(' ')}
                >
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-[#06211A] font-['DM_Sans']">
                        {member.display_name ?? '—'}
                      </p>
                      <p className="text-xs text-[#06211A]/50 font-['DM_Sans'] mt-0.5">
                        {member.email ?? '—'}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium font-['DM_Sans'] ${ROLE_BADGE[member.role]}`}
                    >
                      {member.role.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={member.role}
                      onChange={(e) =>
                        handleRoleSelect(member, e.target.value as MemberRole)
                      }
                      disabled={loadingId === member.id}
                      aria-label={`Change role for ${member.display_name ?? member.email}`}
                      className={[
                        'text-xs border border-[#06211A]/20 rounded px-2 py-1',
                        'font-[\'DM_Sans\'] text-[#06211A] bg-white',
                        'focus:outline-none focus:ring-2 focus:ring-[#06211A]/20',
                        'disabled:opacity-50 disabled:cursor-not-allowed',
                      ].join(' ')}
                    >
                      {ROLE_OPTIONS.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#06211A]/50 font-['DM_Sans']">
                    {new Date(member.created_at).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          className="flex items-center justify-between px-4 py-3 border-t border-[#06211A]/8"
          aria-label="Pagination"
        >
          <p className="text-xs text-[#06211A]/50 font-['DM_Sans']">
            Page {page + 1} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className={[
                'text-xs px-3 py-1.5 rounded border border-[#06211A]/20 font-[\'DM_Sans\']',
                'text-[#06211A]/70 hover:text-[#06211A] hover:bg-[#06211A]/5 transition-colors',
                'disabled:opacity-40 disabled:cursor-not-allowed',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06211A]/30',
              ].join(' ')}
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className={[
                'text-xs px-3 py-1.5 rounded border border-[#06211A]/20 font-[\'DM_Sans\']',
                'text-[#06211A]/70 hover:text-[#06211A] hover:bg-[#06211A]/5 transition-colors',
                'disabled:opacity-40 disabled:cursor-not-allowed',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06211A]/30',
              ].join(' ')}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={[
            'fixed bottom-6 right-6 z-50 flex items-center gap-2',
            'px-4 py-3 rounded-lg shadow-lg text-sm font-medium font-[\'DM_Sans\']',
            toast.ok ? 'bg-[#06211A] text-[#DBFF66]' : 'bg-red-900 text-red-100',
          ].join(' ')}
        >
          {toast.message}
        </div>
      )}

      {/* Confirmation modal */}
      {confirmPending && (
        <RoleConfirmModal
          memberName={confirmPending.memberName}
          newRole={confirmPending.newRole}
          onConfirm={() => {
            applyRoleChange(confirmPending.memberId, confirmPending.newRole)
            setConfirmPending(null)
          }}
          onCancel={() => setConfirmPending(null)}
        />
      )}
    </div>
  )
}
```

### 4. `app/admin/members/page.tsx`

Server component — fetches all members, sorts by created_at desc, passes to MemberTable.

```typescript
import { requireRole } from '@/lib/supabase/admin-auth'
import { createClient } from '@/lib/supabase/server'
import { MemberTable } from './MemberTable'
import type { MemberRole } from '@/lib/supabase/admin-auth'

export const dynamic = 'force-dynamic'

interface ProfileRow {
  id: string
  email: string | null
  display_name: string | null
  role: MemberRole
  created_at: string
}

async function getMembers(): Promise<ProfileRow[]> {
  const supabase = await createClient()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, display_name, role, created_at')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[members/page] profiles query error:', error.message)
    return []
  }

  return (data ?? []) as ProfileRow[]
}

export default async function MembersPage() {
  await requireRole(['site_coordinator'])

  const members = await getMembers()

  return (
    <div className="p-6 lg:p-8">
      {/* Page header */}
      <div className="mb-6">
        <p className="text-xs font-medium tracking-widest text-[#06211A]/40 uppercase mb-1 font-['DM_Sans']">
          Admin
        </p>
        <h1 className="text-2xl font-semibold text-[#06211A] font-['DM_Sans']">
          Members
        </h1>
        <p className="mt-1 text-sm text-[#06211A]/60 font-['DM_Sans']">
          View and manage member roles across the Barbets Duet community.
        </p>
      </div>

      <div className="bg-white border border-[#06211A]/8 rounded-lg overflow-hidden">
        <MemberTable members={members} />
      </div>
    </div>
  )
}
```

---

## Acceptance Criteria

- [ ] `app/admin/members/page.tsx` — Server Component, calls `requireRole(['site_coordinator'])`
- [ ] Members list fetches `id, email, display_name, role, created_at` from `profiles` table using correct column name `role`
- [ ] Search filters by display_name and email client-side (no re-fetch)
- [ ] Results count shown below search input
- [ ] Table columns: Member (name + email), Current Role, Change Role, Joined
- [ ] Role badge colours: site_coordinator = Neon Lime tint, junior_member = Viridian tint, barbets_friend = blue, local_community = muted
- [ ] Inline role `<select>` per row; options are all 4 role values with human-readable labels
- [ ] Selecting `site_coordinator` opens `RoleConfirmModal` before applying
- [ ] Other role changes apply immediately via `updateMemberRole` server action
- [ ] Loading state: row opacity-50, select disabled while action pending
- [ ] Success toast: Night Forest bg + Neon Lime text, 4-second auto-dismiss
- [ ] Error toast: dark red bg + light text
- [ ] `RoleConfirmModal` uses native `<dialog>` element with `showModal()`; closes on Escape or backdrop click
- [ ] Confirmation button is `autoFocus` in modal
- [ ] Pagination: 50 per page, prev/next buttons, page count
- [ ] Empty state message when no results / no members
- [ ] `updateMemberRole` server action uses service-role key; returns `UpdateRoleResult`
- [ ] `updateMemberRole` handles missing credentials gracefully
- [ ] WCAG 2.2 AA: all interactive elements ≥ 4.5:1 contrast
- [ ] TypeScript strict mode passes: `npx tsc --noEmit`
- [ ] No emoji in any component

---

## Design Constraints

- Table: white bg, `border-[#06211A]/8` outer border, `divide-[#06211A]/8` row dividers
- No zebra striping — hover state provides visual affordance
- Pagination controls: small, right-aligned, subtle border buttons
- Modal: native `<dialog>`, white bg, `border-[#06211A]/15`, shadow-xl

---

## Notes for Implementer

- The `createClient()` from `lib/supabase/server.ts` uses the anon key and respects RLS.
  For reading profiles (public read policy), this is sufficient.
- For writing (`updateMemberRole`), RLS blocks updates to other users' rows via anon key.
  Use `@supabase/supabase-js` `createClient` with `SUPABASE_SERVICE_ROLE_KEY` directly
  in the server action (not `lib/supabase/server.ts` which uses anon key).
- Client-side search + pagination keeps data fresh from server while avoiding extra
  round-trips for search queries.
- `export const dynamic = 'force-dynamic'` prevents caching of the members list.
- `@phosphor-icons/react` is already installed. No reinstall needed.

---

## Commit Message

```
feat(admin): AP6 — member list + role assignment UI with confirm modal
```
