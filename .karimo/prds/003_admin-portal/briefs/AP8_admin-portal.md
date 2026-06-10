# Task Brief: AP8 — Pentangle Group Management

**PRD:** admin-portal
**Wave:** 2 (parallel with AP4-AP7)
**Complexity:** 5/10
**Model:** Sonnet
**Branch:** worktree/admin-portal-AP8
**Base branch:** feature/admin-portal
**Worktree path:** .karimo/.worktrees/admin-portal/AP8

---

## Context

Pentangle groups define the circular peer-review chains across the Barbets Duet network.
This admin page allows coordinators to view, create, edit, and delete pentangle groups.

**Schema** (from `20260609000005_peer_review_schema.sql`):

```sql
CREATE TABLE IF NOT EXISTS pentangle_groups (
  id           text PRIMARY KEY,              -- 'east_african', 'usa_ne', etc.
  label        text NOT NULL,
  sites        text[] NOT NULL DEFAULT '{}',  -- slugs
  review_chain text[] NOT NULL DEFAULT '{}',  -- ordered slugs
  status       text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'forming'))
);
```

Pre-seeded rows: `east_african` (5 sites), `usa_ne` (3 sites), `uk_cornwall` (2 sites),
`india` (2 sites).

**Business rules:**
- Maximum 5 sites per pentangle group (the name "pentangle" refers to 5 sites; groups
  under 5 can be `status = 'forming'`)
- `id` is a human-readable slug (e.g. `east_african`); auto-generated from label on create
- `sites` and `review_chain` are both text arrays of learning site slugs; on create/edit,
  `review_chain` defaults to the same order as `sites` (the chain can be reordered)
- Delete is only allowed if the group has no associated `peer_reviews` rows
- RLS: `pentangle_groups_public_read` allows SELECT. There is no write RLS policy —
  writes must use service-role key (same approach as AP6's updateMemberRole)

---

## Boundary files — do NOT modify

- `lib/firebase.ts`
- `components/AuthProvider.tsx`
- `middleware.ts`

---

## Files to Create

| File | Action | Notes |
|------|--------|-------|
| `app/admin/pentangles/page.tsx` | Create | Server Component — list of pentangle groups |
| `app/admin/pentangles/PentangleList.tsx` | Create | `'use client'` — group cards with edit/delete |
| `app/admin/pentangles/PentangleForm.tsx` | Create | `'use client'` — create/edit form (modal or inline) |
| `app/admin/pentangles/actions.ts` | Create | Server actions: create, update, delete |

---

## Deliverables

### 1. `app/admin/pentangles/actions.ts`

```typescript
'use server'

import { createClient } from '@supabase/supabase-js'
import { requireRole } from '@/lib/supabase/admin-auth'
import { revalidatePath } from 'next/cache'

export type PentangleActionResult =
  | { ok: true; message: string }
  | { ok: false; error: string }

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) return null
  return createClient(url, serviceKey, { auth: { persistSession: false } })
}

function generateId(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '_')
    .replace(/-+/g, '_')
    .slice(0, 40)
}

export interface PentangleInput {
  id?: string          // only for update
  label: string
  sites: string[]      // array of site slugs
  review_chain: string[] // ordered site slugs
  status: 'active' | 'forming'
}

/**
 * Create a new pentangle group.
 * id is auto-generated from label if not provided.
 */
export async function createPentangleGroup(
  input: PentangleInput
): Promise<PentangleActionResult> {
  try { await requireRole(['site_coordinator']) }
  catch (err) {
    if (err instanceof Error && err.message === 'NEXT_REDIRECT') throw err
    return { ok: false, error: 'Unauthorised.' }
  }

  const { label, sites, review_chain, status } = input

  if (!label.trim()) return { ok: false, error: 'Label is required.' }
  if (sites.length === 0) return { ok: false, error: 'At least one site is required.' }
  if (sites.length > 5) return { ok: false, error: 'Maximum 5 sites per pentangle group.' }
  if (review_chain.length !== sites.length) {
    return { ok: false, error: 'Review chain must contain the same number of sites.' }
  }

  const id = generateId(label)
  if (!id) return { ok: false, error: 'Could not generate a valid ID from label.' }

  const client = getAdminClient()
  if (!client) return { ok: false, error: 'Service role credentials not configured.' }

  const { error } = await client.from('pentangle_groups').insert({
    id,
    label: label.trim(),
    sites,
    review_chain,
    status,
  })

  if (error) {
    if (error.code === '23505') {
      return { ok: false, error: `A group with ID "${id}" already exists. Use a different label.` }
    }
    return { ok: false, error: `Create failed: ${error.message}` }
  }

  revalidatePath('/admin/pentangles')
  return { ok: true, message: `Group "${label.trim()}" created.` }
}

/**
 * Update an existing pentangle group.
 */
export async function updatePentangleGroup(
  groupId: string,
  input: PentangleInput
): Promise<PentangleActionResult> {
  try { await requireRole(['site_coordinator']) }
  catch (err) {
    if (err instanceof Error && err.message === 'NEXT_REDIRECT') throw err
    return { ok: false, error: 'Unauthorised.' }
  }

  if (!groupId) return { ok: false, error: 'Group ID required.' }

  const { label, sites, review_chain, status } = input
  if (!label.trim()) return { ok: false, error: 'Label is required.' }
  if (sites.length > 5) return { ok: false, error: 'Maximum 5 sites per pentangle group.' }
  if (review_chain.length !== sites.length) {
    return { ok: false, error: 'Review chain must contain the same number of sites.' }
  }

  const client = getAdminClient()
  if (!client) return { ok: false, error: 'Service role credentials not configured.' }

  const { error } = await client
    .from('pentangle_groups')
    .update({ label: label.trim(), sites, review_chain, status })
    .eq('id', groupId)

  if (error) return { ok: false, error: `Update failed: ${error.message}` }

  revalidatePath('/admin/pentangles')
  return { ok: true, message: `Group "${label.trim()}" updated.` }
}

/**
 * Delete a pentangle group.
 * Blocked if the group has associated peer_reviews rows.
 */
export async function deletePentangleGroup(
  groupId: string
): Promise<PentangleActionResult> {
  try { await requireRole(['site_coordinator']) }
  catch (err) {
    if (err instanceof Error && err.message === 'NEXT_REDIRECT') throw err
    return { ok: false, error: 'Unauthorised.' }
  }

  if (!groupId) return { ok: false, error: 'Group ID required.' }

  const client = getAdminClient()
  if (!client) return { ok: false, error: 'Service role credentials not configured.' }

  // Check for associated peer_reviews (check if any site in the group is a reviewer)
  // We check by looking up the group first to get site slugs
  const { data: group } = await client
    .from('pentangle_groups')
    .select('sites')
    .eq('id', groupId)
    .single()

  if (group?.sites && group.sites.length > 0) {
    const { count } = await client
      .from('peer_reviews')
      .select('*', { count: 'exact', head: true })
      .in('reviewer_site_slug', group.sites)

    if ((count ?? 0) > 0) {
      return {
        ok: false,
        error: `Cannot delete: this group has ${count} associated peer review record(s). Archive the reviews first.`,
      }
    }
  }

  const { error } = await client
    .from('pentangle_groups')
    .delete()
    .eq('id', groupId)

  if (error) return { ok: false, error: `Delete failed: ${error.message}` }

  revalidatePath('/admin/pentangles')
  return { ok: true, message: 'Group deleted.' }
}
```

### 2. `app/admin/pentangles/PentangleForm.tsx`

Create/edit form. Inline (not a modal) — opens below the "Create group" button or replaces
the card in edit mode. Sites are entered as a comma-separated textarea for simplicity.
The review_chain is auto-set to match sites order (same array) on submit unless the user
has modified it separately. For this task, review_chain = sites order (no separate
reordering UI — that is future work).

```typescript
'use client'

import { useState } from 'react'
import { createPentangleGroup, updatePentangleGroup } from './actions'
import type { PentangleInput, PentangleActionResult } from './actions'

interface PentangleFormProps {
  existing?: {
    id: string
    label: string
    sites: string[]
    status: 'active' | 'forming'
  }
  onClose: () => void
  onSuccess: (message: string) => void
}

export function PentangleForm({ existing, onClose, onSuccess }: PentangleFormProps) {
  const [label, setLabel] = useState(existing?.label ?? '')
  const [sitesText, setSitesText] = useState(existing?.sites.join(', ') ?? '')
  const [status, setStatus] = useState<'active' | 'forming'>(existing?.status ?? 'forming')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isEdit = !!existing

  function parseSites(raw: string): string[] {
    return raw
      .split(/[,\n]/)
      .map((s) => s.trim().toLowerCase().replace(/\s+/g, '-'))
      .filter(Boolean)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const sites = parseSites(sitesText)

    const input: PentangleInput = {
      label,
      sites,
      review_chain: sites, // same order as sites
      status,
    }

    setLoading(true)
    let result: PentangleActionResult
    if (isEdit) {
      result = await updatePentangleGroup(existing.id, input)
    } else {
      result = await createPentangleGroup(input)
    }
    setLoading(false)

    if (result.ok) {
      onSuccess(result.message)
      onClose()
    } else {
      setError(result.error)
    }
  }

  const siteCount = parseSites(sitesText).length

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-[#F4F4F5] border border-[#06211A]/10 rounded-lg space-y-4"
      aria-label={isEdit ? 'Edit pentangle group' : 'Create pentangle group'}
    >
      <h3 className="text-sm font-semibold text-[#06211A] font-['DM_Sans']">
        {isEdit ? `Edit: ${existing.label}` : 'New Pentangle Group'}
      </h3>

      {/* Label */}
      <div>
        <label
          htmlFor="pf-label"
          className="block text-xs font-medium text-[#06211A]/70 font-['DM_Sans'] mb-1"
        >
          Group label <span className="text-red-500">*</span>
        </label>
        <input
          id="pf-label"
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          required
          placeholder="e.g. West African Pentangle"
          className={[
            'w-full px-3 py-2 text-sm border border-[#06211A]/20 rounded-md bg-white',
            'font-[\'DM_Sans\'] text-[#06211A] placeholder:text-[#06211A]/35',
            'focus:outline-none focus:ring-2 focus:ring-[#06211A]/20 focus:border-[#06211A]/40',
          ].join(' ')}
        />
        {!isEdit && label && (
          <p className="text-xs text-[#06211A]/40 font-['DM_Sans'] mt-0.5">
            ID will be: {label.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '_').slice(0, 40)}
          </p>
        )}
      </div>

      {/* Sites */}
      <div>
        <label
          htmlFor="pf-sites"
          className="block text-xs font-medium text-[#06211A]/70 font-['DM_Sans'] mb-1"
        >
          Site slugs <span className="text-red-500">*</span>
          <span className="ml-1 text-[#06211A]/40 font-normal">(comma or newline separated)</span>
        </label>
        <textarea
          id="pf-sites"
          value={sitesText}
          onChange={(e) => setSitesText(e.target.value)}
          rows={3}
          required
          placeholder="mlingotini, himo, seme, molo-magode-farm, lukenya-zumula-farm"
          className={[
            'w-full px-3 py-2 text-sm border border-[#06211A]/20 rounded-md bg-white resize-none',
            'font-[\'DM_Sans\'] text-[#06211A] placeholder:text-[#06211A]/35',
            'focus:outline-none focus:ring-2 focus:ring-[#06211A]/20 focus:border-[#06211A]/40',
          ].join(' ')}
        />
        <p
          className={[
            'text-xs font-['DM_Sans'] mt-0.5',
            siteCount > 5 ? 'text-red-600 font-medium' : 'text-[#06211A]/40',
          ].join(' ')}
        >
          {siteCount} site{siteCount !== 1 ? 's' : ''}{siteCount > 5 ? ' — maximum is 5' : ''}
        </p>
      </div>

      {/* Status */}
      <div>
        <span className="block text-xs font-medium text-[#06211A]/70 font-['DM_Sans'] mb-1">
          Status
        </span>
        <div className="flex gap-4">
          {(['forming', 'active'] as const).map((s) => (
            <label key={s} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="pf-status"
                value={s}
                checked={status === s}
                onChange={() => setStatus(s)}
                className="accent-[#06211A]"
              />
              <span className="text-sm text-[#06211A] font-['DM_Sans'] capitalize">{s}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="text-xs text-red-600 font-['DM_Sans'] bg-red-50 px-3 py-2 rounded border border-red-100">
          {error}
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-1">
        <button
          type="submit"
          disabled={loading || siteCount > 5 || siteCount === 0}
          className={[
            'px-4 py-2 text-sm font-medium font-[\'DM_Sans\'] rounded transition-colors',
            'bg-[#06211A] text-[#DBFF66] hover:bg-[#0d3627]',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DBFF66] focus-visible:ring-offset-1',
          ].join(' ')}
        >
          {loading ? (isEdit ? 'Saving...' : 'Creating...') : (isEdit ? 'Save Changes' : 'Create Group')}
        </button>
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="px-4 py-2 text-sm font-['DM_Sans'] text-[#06211A]/60 hover:text-[#06211A] transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
```

### 3. `app/admin/pentangles/PentangleList.tsx`

```typescript
'use client'

import { useState } from 'react'
import { deletePentangleGroup } from './actions'
import { PentangleForm } from './PentangleForm'

interface PentangleGroup {
  id: string
  label: string
  sites: string[]
  review_chain: string[]
  status: 'active' | 'forming'
}

interface PentangleListProps {
  groups: PentangleGroup[]
}

const STATUS_BADGE: Record<string, string> = {
  active: 'bg-[#DBFF66]/20 text-[#4a5e00]',
  forming: 'bg-[#06211A]/8 text-[#06211A]/50',
}

export function PentangleList({ groups: initialGroups }: PentangleListProps) {
  const [groups, setGroups] = useState(initialGroups)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; ok: boolean } | null>(null)

  function showToast(message: string, ok: boolean) {
    setToast({ message, ok })
    setTimeout(() => setToast(null), 4000)
  }

  async function handleDelete(group: PentangleGroup) {
    if (!window.confirm(`Delete "${group.label}"? This cannot be undone.`)) return
    setDeletingId(group.id)
    const result = await deletePentangleGroup(group.id)
    setDeletingId(null)
    if (result.ok) {
      setGroups((gs) => gs.filter((g) => g.id !== group.id))
      showToast(result.message, true)
    } else {
      showToast(result.error, false)
    }
  }

  function handleEditSuccess(message: string) {
    setEditingId(null)
    showToast(message, true)
    // Page will revalidate on next navigation due to revalidatePath in action
  }

  function handleCreateSuccess(message: string) {
    setShowCreateForm(false)
    showToast(message, true)
  }

  return (
    <div>
      {/* Create button */}
      <div className="p-4 border-b border-[#06211A]/8">
        {!showCreateForm ? (
          <button
            type="button"
            onClick={() => setShowCreateForm(true)}
            className={[
              'px-4 py-2 text-sm font-medium font-[\'DM_Sans\'] rounded transition-colors',
              'bg-[#06211A] text-[#DBFF66] hover:bg-[#0d3627]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DBFF66] focus-visible:ring-offset-1',
            ].join(' ')}
          >
            Create group
          </button>
        ) : (
          <PentangleForm
            onClose={() => setShowCreateForm(false)}
            onSuccess={handleCreateSuccess}
          />
        )}
      </div>

      {/* Groups */}
      {groups.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-sm text-[#06211A]/40 font-['DM_Sans']">
            No pentangle groups yet.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-[#06211A]/8">
          {groups.map((group) => (
            <li key={group.id} className="p-4">
              {editingId === group.id ? (
                <PentangleForm
                  existing={group}
                  onClose={() => setEditingId(null)}
                  onSuccess={handleEditSuccess}
                />
              ) : (
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-sm font-semibold text-[#06211A] font-['DM_Sans']">
                          {group.label}
                        </h3>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium font-['DM_Sans'] ${STATUS_BADGE[group.status]}`}
                        >
                          {group.status}
                        </span>
                        <span className="text-xs text-[#06211A]/40 font-['DM_Sans']">
                          {group.sites.length}/5 sites
                        </span>
                      </div>
                      <p className="text-xs text-[#06211A]/50 font-['DM_Sans'] font-mono">
                        id: {group.id}
                      </p>
                      {/* Sites list */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {group.sites.map((slug) => (
                          <span
                            key={slug}
                            className="text-xs bg-[#06211A]/6 text-[#06211A]/70 px-2 py-0.5 rounded font-['DM_Sans']"
                          >
                            {slug}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setEditingId(group.id)}
                        className={[
                          'text-xs px-3 py-1.5 rounded border border-[#06211A]/20',
                          'text-[#06211A]/70 hover:text-[#06211A] hover:bg-[#06211A]/5',
                          'font-[\'DM_Sans\'] transition-colors',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06211A]/30',
                        ].join(' ')}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(group)}
                        disabled={deletingId === group.id}
                        className={[
                          'text-xs px-3 py-1.5 rounded border border-red-200',
                          'text-red-600 hover:bg-red-50 transition-colors',
                          'font-[\'DM_Sans\']',
                          'disabled:opacity-50 disabled:cursor-not-allowed',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400',
                        ].join(' ')}
                      >
                        {deletingId === group.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Toast */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={[
            'fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg shadow-lg',
            'text-sm font-medium font-[\'DM_Sans\']',
            toast.ok ? 'bg-[#06211A] text-[#DBFF66]' : 'bg-red-900 text-red-100',
          ].join(' ')}
        >
          {toast.message}
        </div>
      )}
    </div>
  )
}
```

### 4. `app/admin/pentangles/page.tsx`

```typescript
import { requireRole } from '@/lib/supabase/admin-auth'
import { createClient } from '@/lib/supabase/server'
import { PentangleList } from './PentangleList'

export const dynamic = 'force-dynamic'

interface PentangleGroup {
  id: string
  label: string
  sites: string[]
  review_chain: string[]
  status: 'active' | 'forming'
}

async function getPentangleGroups(): Promise<PentangleGroup[]> {
  const supabase = await createClient()
  if (!supabase) return []
  const { data, error } = await supabase
    .from('pentangle_groups')
    .select('id, label, sites, review_chain, status')
    .order('label', { ascending: true })
  if (error) {
    console.error('[pentangles/page] query error:', error.message)
    return []
  }
  return (data ?? []) as PentangleGroup[]
}

export default async function PentanglesPage() {
  await requireRole(['site_coordinator'])
  const groups = await getPentangleGroups()

  return (
    <div className="p-6 lg:p-8">
      {/* Page header */}
      <div className="mb-6">
        <p className="text-xs font-medium tracking-widest text-[#06211A]/40 uppercase mb-1 font-['DM_Sans']">
          Admin
        </p>
        <h1 className="text-2xl font-semibold text-[#06211A] font-['DM_Sans']">
          Pentangle Groups
        </h1>
        <p className="mt-1 text-sm text-[#06211A]/60 font-['DM_Sans']">
          Manage geographic pentangle groups and their peer-review chains.
          Maximum 5 sites per group.
        </p>
      </div>

      <div className="bg-white border border-[#06211A]/8 rounded-lg overflow-hidden">
        <PentangleList groups={groups} />
      </div>
    </div>
  )
}
```

---

## Acceptance Criteria

- [ ] `app/admin/pentangles/page.tsx` — Server Component, calls `requireRole(['site_coordinator'])`
- [ ] Lists all pentangle groups from `pentangle_groups` table ordered by label
- [ ] Each group card shows: label, id, status badge, site count (n/5), site slug tags
- [ ] Create button opens inline `PentangleForm`
- [ ] Edit button replaces group card with inline `PentangleForm` pre-filled
- [ ] Delete button shows `window.confirm` then calls `deletePentangleGroup`
- [ ] Delete blocked if group has associated peer_reviews rows (returns error message in toast)
- [ ] `createPentangleGroup` validates: label required, 1-5 sites, review_chain length matches sites
- [ ] ID auto-generated from label (lowercase, underscores) on create; shown as preview below label input
- [ ] Sites input accepts comma or newline-separated slugs; real-time count shown below textarea
- [ ] Site count > 5 shows red warning + disables submit
- [ ] Status radio: forming / active
- [ ] `review_chain` defaults to same order as sites (no separate reordering UI)
- [ ] Unique ID conflict on create returns user-friendly error "already exists" message
- [ ] All server actions call `requireRole(['site_coordinator'])` as first operation
- [ ] All server actions use service-role key; return `PentangleActionResult`
- [ ] All server actions handle missing credentials gracefully
- [ ] Success toast: Night Forest bg + Neon Lime text
- [ ] Error toast: dark red bg + light text
- [ ] Toast `role="status"` + `aria-live="polite"`
- [ ] Graceful empty state when no groups
- [ ] WCAG 2.2 AA: all interactive elements ≥ 4.5:1 contrast
- [ ] TypeScript strict mode passes: `npx tsc --noEmit`
- [ ] No emoji in any component

---

## Design Constraints

- Group cards: no elevation — flat list with dividers
- Status badge: Neon Lime tint (active), muted (forming)
- Site slugs: small muted tags, mono-style not required
- Create/Edit form: inline, `bg-[#F4F4F5]` panel, not a modal
- Delete: native `window.confirm` dialog (no custom modal needed for delete)

---

## Notes for Implementer

- `window.confirm` is used for delete confirmation — this is intentional for simplicity.
  It is acceptable in an admin-only context.
- After create/edit, `revalidatePath('/admin/pentangles')` is called on the server but
  the client state also needs updating. For creates, the server re-fetches on next load.
  For immediate UI update after create, the `onSuccess` callback closes the form and the
  success toast prompts the user to reload if they want to see the new group immediately.
  Alternatively, the `PentangleList` component can re-fetch data using `router.refresh()`
  from `useRouter` after a successful action. Use `router.refresh()` for the best UX.
- The `PentangleInput` type is exported from `actions.ts` for use in `PentangleForm`.
  Make sure it is exported with `export type`.
- `@phosphor-icons/react` is not used in this task — no icon imports needed.
- The `pentangle_groups` table has no FK to `peer_reviews` — the delete guard is a
  manual check in the server action (select count first).
- RLS has only `pentangle_groups_public_read` (SELECT). Inserts, updates, deletes require
  service-role key or an admin RLS policy. Use service-role key (same as AP6).

---

## Commit Message

```
feat(admin): AP8 — pentangle group management (create/edit/delete)
```
