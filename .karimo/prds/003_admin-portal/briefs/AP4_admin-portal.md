# Task Brief: AP4 — T&E Submission Review Queue

**PRD:** admin-portal
**Wave:** 2
**Complexity:** 4/10
**Model:** Sonnet
**Branch:** worktree/admin-portal-AP4
**Base branch:** feature/admin-portal
**Worktree path:** .karimo/.worktrees/admin-portal/AP4

---

## Context

Wave 1 built the auth helpers, middleware protection, and admin layout shell. Wave 2 now
builds the CRUD pages that live inside that shell.

T&E submissions are stored in Sanity (document type: `trialAndError`), NOT in Supabase.
The `lib/sanity/queries.ts` file already has `TrialAndErrorEntry` type and read functions.
This task adds the admin-facing queue page that shows submissions awaiting coordinator
review (`status == "pending_review"`) plus a tab to browse published and rejected entries.

**IMPORTANT — Schema correction in this task:**
`lib/supabase/admin-auth.ts` (built in Wave 1) queries `.select('member_role')` from the
`profiles` table. The actual Supabase column is named `role` (not `member_role`). Fix
this as part of this task so Wave 2 pages that call `getSessionUser()` resolve correctly.

---

## Boundary files — do NOT modify

- `lib/firebase.ts`
- `components/AuthProvider.tsx`
- `middleware.ts`
- Any file under `app/` that does not belong to `/admin/*`

---

## Files to Create / Modify

| File | Action | Notes |
|------|--------|-------|
| `lib/supabase/admin-auth.ts` | Modify | Fix `.select('member_role')` → `.select('role')` and `profile?.member_role` → `profile?.role`; fix MemberRole type |
| `lib/sanity/admin-queries.ts` | Create | Admin-only Sanity queries — no CDN cache, uses non-cached fetch |
| `app/admin/submissions/page.tsx` | Create | T&E review queue page |
| `app/admin/submissions/SubmissionTabs.tsx` | Create | `'use client'` tab switcher component |
| `app/admin/submissions/SubmissionRow.tsx` | Create | `'use client'` inline detail expander per row |

---

## Deliverables

### 1. Fix `lib/supabase/admin-auth.ts`

The `profiles` table column is `role`, not `member_role`. Correct admin-auth.ts:

```typescript
// Change in getSessionUser():
// WRONG:
const { data: profile } = await supabase
  .from('profiles')
  .select('member_role')
  .eq('id', user.id)
  .single()
const role: MemberRole = (profile?.member_role as MemberRole) ?? 'member'

// CORRECT:
const { data: profile } = await supabase
  .from('profiles')
  .select('role')
  .eq('id', user.id)
  .single()
const role: MemberRole = (profile?.role as MemberRole) ?? 'local_community'
```

Also correct the `MemberRole` type to match the actual Supabase enum:

```typescript
// WRONG (was spec'd incorrectly in Wave 1):
export type MemberRole = 'member' | 'coordinator' | 'admin'

// CORRECT (matches 20260609000001_community_schema.sql):
export type MemberRole = 'site_coordinator' | 'junior_member' | 'barbets_friend' | 'local_community'
```

Update `requireRole` usages in `app/admin/layout.tsx` accordingly — the layout checks
`user.role === 'member'` which needs updating to `user.role === 'local_community' ||
user.role === 'barbets_friend' || user.role === 'junior_member'`, i.e., redirect unless
`site_coordinator`.

For the admin portal's purposes, treat `site_coordinator` as the minimum required role
(equivalent to "coordinator" in the Wave 1 design intent). Admin-elevation will be handled
in AP6. Update layout.tsx:

```typescript
// app/admin/layout.tsx — update the role guard:
if (user.role !== 'site_coordinator') {
  // Only site_coordinator can access /admin; all others see 403
  // Note: no separate 'admin' super-role in schema — site_coordinator is top level
  redirect('/403')
}
```

**Note on middleware.ts:** middleware.ts also queries `member_role` and uses
`'member' | 'coordinator' | 'admin'` enum values. Do NOT modify middleware.ts — it was
reviewed by the human in Wave 1 (PR #26 with require_review flag). The middleware's role
check is a UX layer only; the layout.tsx server-side check is the authoritative guard.
Log a note in a comment: `// TODO: middleware.ts member_role column mismatch — tracked`

### 2. `lib/sanity/admin-queries.ts`

Admin-only queries that bypass Next.js cache (no `next.tags`) because the admin portal
needs fresh data. Create a separate write-capable client inline.

```typescript
/**
 * Admin-only Sanity queries — bypasses CDN + Next.js cache.
 * Used exclusively by /admin/* server components and server actions.
 *
 * These queries use `cache: 'no-store'` to always fetch fresh data.
 * Env guards match the pattern in lib/sanity/queries.ts.
 */
import { createClient } from 'next-sanity'
import type { TrialAndErrorEntry } from './queries'

// Read-only admin client — bypasses CDN cache for fresh data
function getAdminReadClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

  if (!projectId) return null

  return createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    useCdn: false, // Always bypass CDN in admin context
  })
}

// Write client — requires SANITY_API_TOKEN with editor/admin permissions
export function getAdminWriteClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  const token = process.env.SANITY_API_TOKEN

  if (!projectId || !token) {
    console.warn('[admin-queries] SANITY_API_TOKEN not set — write operations will fail')
    return null
  }

  return createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    token,
    useCdn: false,
  })
}

const T_AND_E_ADMIN_PROJECTION = `{
  _id,
  "slug": slug.current,
  title,
  siteSlug,
  authorMemberSlug,
  prompt1,
  prompt2,
  prompt3,
  prompt4,
  challengeType,
  interventionType,
  propertyRightsRegime,
  status,
  submittedAt,
  publishedAt,
  "images": images[] { "url": asset->url, altText, caption }
}`

export interface AdminTrialAndErrorEntry extends TrialAndErrorEntry {
  _id: string
}

/**
 * Fetch all T&E entries by status for the admin queue.
 * Returns empty array if Sanity not configured.
 */
export async function getSubmissionsByStatus(
  status: 'pending_review' | 'published' | 'rejected'
): Promise<AdminTrialAndErrorEntry[]> {
  const client = getAdminReadClient()
  if (!client) return []

  try {
    return await client.fetch<AdminTrialAndErrorEntry[]>(
      `*[_type == "trialAndError" && status == $status]
        | order(submittedAt desc)
        ${T_AND_E_ADMIN_PROJECTION}`,
      { status },
      { cache: 'no-store' }
    )
  } catch (error) {
    console.error('[admin-queries] getSubmissionsByStatus failed:', error)
    return []
  }
}

/**
 * Count T&E entries by status — for tab badges.
 */
export async function countSubmissionsByStatus(): Promise<{
  pending_review: number
  published: number
  rejected: number
}> {
  const client = getAdminReadClient()
  if (!client) return { pending_review: 0, published: 0, rejected: 0 }

  try {
    const [pending, published, rejected] = await Promise.all([
      client.fetch<number>(`count(*[_type == "trialAndError" && status == "pending_review"])`, {}, { cache: 'no-store' }),
      client.fetch<number>(`count(*[_type == "trialAndError" && status == "published"])`, {}, { cache: 'no-store' }),
      client.fetch<number>(`count(*[_type == "trialAndError" && status == "rejected"])`, {}, { cache: 'no-store' }),
    ])
    return { pending_review: pending, published, rejected }
  } catch {
    return { pending_review: 0, published: 0, rejected: 0 }
  }
}
```

### 3. `app/admin/submissions/SubmissionRow.tsx`

Client component — inline detail expander. Clicking a row reveals prompt preview and
a warning badge if any of the 4 prompts are empty.

```typescript
'use client'

import { useState } from 'react'
import { CaretDown, CaretRight, Warning } from '@phosphor-icons/react'
import type { AdminTrialAndErrorEntry } from '@/lib/sanity/admin-queries'

interface SubmissionRowProps {
  entry: AdminTrialAndErrorEntry
}

function hasPromptContent(prompt: unknown[]): boolean {
  if (!prompt || prompt.length === 0) return false
  // PortableText block — check if any block has text
  return prompt.some((block: unknown) => {
    const b = block as { children?: { text?: string }[] }
    return b.children?.some((child) => child.text && child.text.trim().length > 0)
  })
}

const PROMPT_LABELS = [
  'What have you tried and how did it turn out?',
  'What was your biggest mistake?',
  'What did you learn and what made you laugh?',
  'Who would you include in your Barbet circle and why?',
]

export function SubmissionRow({ entry }: SubmissionRowProps) {
  const [expanded, setExpanded] = useState(false)

  const promptsComplete = [
    hasPromptContent(entry.prompt1 as unknown[]),
    hasPromptContent(entry.prompt2 as unknown[]),
    hasPromptContent(entry.prompt3 as unknown[]),
    hasPromptContent(entry.prompt4 as unknown[]),
  ]
  const missingCount = promptsComplete.filter((c) => !c).length

  const statusBadgeClass =
    entry.status === 'pending_review'
      ? 'bg-[#2D6A4F]/20 text-[#2D6A4F]'
      : entry.status === 'published'
      ? 'bg-[#DBFF66]/20 text-[#4a5e00]'
      : 'bg-red-100 text-red-700'

  const statusLabel =
    entry.status === 'pending_review'
      ? 'Pending Review'
      : entry.status === 'published'
      ? 'Published'
      : 'Rejected'

  return (
    <li className="border-b border-[#06211A]/8 last:border-0">
      {/* Row header — always visible */}
      <button
        type="button"
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#06211A]/3 transition-colors group"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        <span className="text-[#06211A]/30 group-hover:text-[#06211A]/60 transition-colors mt-0.5">
          {expanded ? <CaretDown size={14} /> : <CaretRight size={14} />}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-[#06211A] font-['DM_Sans'] truncate">
              {entry.title}
            </span>
            {missingCount > 0 && (
              <span className="inline-flex items-center gap-1 text-xs text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded font-['DM_Sans']">
                <Warning size={11} weight="bold" />
                {missingCount} prompt{missingCount > 1 ? 's' : ''} missing
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-0.5">
            <span className="text-xs text-[#06211A]/50 font-['DM_Sans']">{entry.siteSlug}</span>
            <span className="text-xs text-[#06211A]/40 font-['DM_Sans']">by {entry.authorMemberSlug}</span>
            {entry.submittedAt && (
              <span className="text-xs text-[#06211A]/40 font-['DM_Sans']">
                {new Date(entry.submittedAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            )}
          </div>
        </div>

        <span
          className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium font-['DM_Sans'] shrink-0 ${statusBadgeClass}`}
        >
          {statusLabel}
        </span>
      </button>

      {/* Expanded detail panel */}
      {expanded && (
        <div className="px-10 pb-4 bg-[#06211A]/2">
          {/* Prompt completeness */}
          <div className="mb-3">
            <p className="text-xs font-medium text-[#06211A]/50 uppercase tracking-widest mb-2 font-['DM_Sans']">
              Prompt completeness
            </p>
            <ul className="space-y-1">
              {PROMPT_LABELS.map((label, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-xs font-['DM_Sans']"
                >
                  <span
                    className={
                      promptsComplete[idx]
                        ? 'text-[#2D6A4F] font-medium'
                        : 'text-red-600 font-medium'
                    }
                  >
                    {promptsComplete[idx] ? '✓' : '✗'}
                  </span>
                  <span
                    className={
                      promptsComplete[idx]
                        ? 'text-[#06211A]/70'
                        : 'text-[#06211A]/50 line-through'
                    }
                  >
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Challenge / intervention tags */}
          {(entry.challengeType?.length > 0 || entry.interventionType?.length > 0) && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {entry.challengeType?.map((t) => (
                <span
                  key={t}
                  className="text-xs bg-[#06211A]/6 text-[#06211A]/60 px-2 py-0.5 rounded font-['DM_Sans']"
                >
                  {t.replace(/_/g, ' ')}
                </span>
              ))}
            </div>
          )}

          {/* Action links for pending items */}
          {entry.status === 'pending_review' && (
            <div className="flex gap-3 pt-2 border-t border-[#06211A]/8">
              <a
                href={`https://barbetsduet.sanity.studio/desk/trialAndError;${entry._id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#06211A]/60 hover:text-[#06211A] underline underline-offset-2 font-['DM_Sans'] transition-colors"
              >
                Open in Sanity Studio
              </a>
            </div>
          )}
        </div>
      )}
    </li>
  )
}
```

### 4. `app/admin/submissions/SubmissionTabs.tsx`

Client component that controls which tab is active. The parent page passes count badges.

```typescript
'use client'

import { useState } from 'react'
import type { AdminTrialAndErrorEntry } from '@/lib/sanity/admin-queries'
import { SubmissionRow } from './SubmissionRow'

type TabKey = 'pending_review' | 'published' | 'rejected'

interface SubmissionTabsProps {
  counts: { pending_review: number; published: number; rejected: number }
  initial: TabKey
  pending: AdminTrialAndErrorEntry[]
  published: AdminTrialAndErrorEntry[]
  rejected: AdminTrialAndErrorEntry[]
}

const TAB_LABELS: { key: TabKey; label: string }[] = [
  { key: 'pending_review', label: 'Pending Review' },
  { key: 'published', label: 'Published' },
  { key: 'rejected', label: 'Rejected' },
]

export function SubmissionTabs({
  counts,
  initial,
  pending,
  published,
  rejected,
}: SubmissionTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>(initial)

  const itemsMap: Record<TabKey, AdminTrialAndErrorEntry[]> = {
    pending_review: pending,
    published,
    rejected,
  }

  const activeItems = itemsMap[activeTab]

  return (
    <div>
      {/* Tab bar */}
      <div
        className="flex gap-1 border-b border-[#06211A]/10 mb-0"
        role="tablist"
        aria-label="Submission status tabs"
      >
        {TAB_LABELS.map(({ key, label }) => {
          const isActive = activeTab === key
          const count = counts[key]
          return (
            <button
              key={key}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${key}`}
              onClick={() => setActiveTab(key)}
              className={[
                'px-4 py-2.5 text-sm font-['DM_Sans'] font-medium transition-colors relative',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DBFF66] focus-visible:ring-offset-1',
                isActive
                  ? 'text-[#06211A] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#06211A]'
                  : 'text-[#06211A]/50 hover:text-[#06211A]/80',
              ].join(' ')}
            >
              {label}
              {count > 0 && (
                <span
                  className={[
                    'ml-2 text-xs font-medium px-1.5 py-0.5 rounded-full',
                    key === 'pending_review'
                      ? 'bg-[#DBFF66] text-[#06211A]'
                      : key === 'rejected'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-[#06211A]/8 text-[#06211A]/60',
                  ].join(' ')}
                >
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Tab panel */}
      <div
        id={`tabpanel-${activeTab}`}
        role="tabpanel"
        aria-label={`${activeTab.replace('_', ' ')} submissions`}
      >
        {activeItems.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-[#06211A]/40 font-['DM_Sans']">
              No submissions in this category.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-[#06211A]/8">
            {activeItems.map((entry) => (
              <SubmissionRow key={entry._id} entry={entry} />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
```

### 5. `app/admin/submissions/page.tsx`

Server component — fetches all tab data server-side, passes to `SubmissionTabs`.

```typescript
import { requireRole } from '@/lib/supabase/admin-auth'
import {
  getSubmissionsByStatus,
  countSubmissionsByStatus,
} from '@/lib/sanity/admin-queries'
import { SubmissionTabs } from './SubmissionTabs'

export const dynamic = 'force-dynamic'

export default async function SubmissionsPage() {
  // Role guard — site_coordinator+ only
  await requireRole(['site_coordinator'])

  // Fetch all tab data in parallel
  const [pending, published, rejected, counts] = await Promise.all([
    getSubmissionsByStatus('pending_review'),
    getSubmissionsByStatus('published'),
    getSubmissionsByStatus('rejected'),
    countSubmissionsByStatus(),
  ])

  return (
    <div className="p-6 lg:p-8">
      {/* Page header */}
      <div className="mb-6">
        <p className="text-xs font-medium tracking-widest text-[#06211A]/40 uppercase mb-1 font-['DM_Sans']">
          Admin
        </p>
        <h1 className="text-2xl font-semibold text-[#06211A] font-['DM_Sans']">
          T&E Submissions
        </h1>
        <p className="mt-1 text-sm text-[#06211A]/60 font-['DM_Sans']">
          Review Trial &amp; Error entries submitted by site members.
        </p>
      </div>

      {/* Tabs + content */}
      <div className="bg-white border border-[#06211A]/8 rounded-lg overflow-hidden">
        <SubmissionTabs
          counts={counts}
          initial="pending_review"
          pending={pending}
          published={published}
          rejected={rejected}
        />
      </div>
    </div>
  )
}
```

---

## Acceptance Criteria

- [ ] `lib/supabase/admin-auth.ts` — `MemberRole` type updated to `site_coordinator | junior_member | barbets_friend | local_community`; `.select('role')` query corrected
- [ ] `app/admin/layout.tsx` — role guard updated: redirect unless `site_coordinator`
- [ ] `lib/sanity/admin-queries.ts` — exports `getSubmissionsByStatus`, `countSubmissionsByStatus`, `getAdminWriteClient`, `AdminTrialAndErrorEntry`
- [ ] `app/admin/submissions/page.tsx` — Server Component, calls `requireRole(['site_coordinator'])`, renders tabs with fetched data
- [ ] Three filter tabs: Pending Review, Published, Rejected with count badges
- [ ] Pending Review tab is active by default
- [ ] Each row shows: title, site slug, author slug, submitted date, status badge
- [ ] Rows with missing prompts show amber warning badge listing count of missing prompts
- [ ] Expanding a row shows prompt completeness checklist
- [ ] Expanding a pending row shows "Open in Sanity Studio" link
- [ ] Empty state: "No submissions in this category." when tab is empty
- [ ] Graceful null-guard when Sanity not configured (env vars absent)
- [ ] WCAG 2.2 AA: all interactive elements ≥ 4.5:1 contrast
- [ ] TypeScript strict mode passes: `npx tsc --noEmit`
- [ ] No emoji in any component

---

## Design Constraints

- Background: `#F4F4F5` content area (inherited from AP3 layout)
- Table/list: white card with `border-[#06211A]/8` border
- Status badges: `#DBFF66`-tinted (published), Viridian-tinted (pending), red-100 (rejected)
- Typography: DM Sans throughout — no BioRhyme
- Interaction states: hover, focus-visible on all interactive elements
- No generic spinners — page is fully SSR, no loading state needed

---

## Notes for Implementer

- `requireRole` in admin-auth.ts was built for `'member' | 'coordinator' | 'admin'` — after
  the MemberRole fix, the layout must guard with `['site_coordinator']` minimum.
- Do NOT modify middleware.ts. It was human-reviewed in Wave 1. Add a TODO comment in
  admin-auth.ts noting the mismatch for future resolution.
- The Sanity write client in admin-queries.ts is created for use by AP5. Create it here
  but do not call it in AP4 — AP5 will import `getAdminWriteClient`.
- Tab switching is client-side only — all data is fetched server-side and passed down.
  This avoids a second round-trip to Sanity on tab switch.
- `export const dynamic = 'force-dynamic'` on the submissions page ensures no caching
  at the route level.
- `@phosphor-icons/react` is already installed (used in AP3). Verify before importing.

---

## Commit Message

```
feat(admin): AP4 — T&E submission review queue with filter tabs
```
