# Task Brief: AP7 — Peer Review Chain Overview + Overdue Flagging

**PRD:** admin-portal
**Wave:** 2 (parallel with AP4/AP5/AP6)
**Complexity:** 5/10
**Model:** Sonnet
**Branch:** worktree/admin-portal-AP7
**Base branch:** feature/admin-portal
**Worktree path:** .karimo/.worktrees/admin-portal/AP7

---

## Context

The Barbets Duet network uses a circular peer-review model: each site in a pentangle
group reviews the next site in the chain (A reviews B, B reviews C, ..., E reviews A).

This admin page gives coordinators a bird's-eye view of:
1. All pentangle groups and their current review chain state (circular ring diagram)
2. All open peer reviews (`status = 'pending' | 'submitted'`) with their due dates
3. Red badge for overdue reviews (due_date < today AND status != 'acknowledged')
4. A bulk reminder button stub (logs to console — email integration is future work)

**Schema** (from `20260609000005_peer_review_schema.sql`):
- `peer_reviews` table: `reviewer_site_slug`, `reviewee_site_slug`, `year`, `status` (pending/submitted/acknowledged), `submitted_at`, `acknowledged_at`, `due_date` — wait, `due_date` is NOT in the peer_reviews table as defined in the migration. The migration has `status`, `submitted_at`, `acknowledged_at`. The "overdue" concept in the PRD spec is based on `submitted_at` being null past a certain date, OR we define overdue as `status == 'pending' AND year == current_year AND current date > June 30`.
- `pentangle_groups` table: `id` (text PK), `label`, `sites` (text[]), `review_chain` (text[]), `status` ('active' | 'forming')

**Resolution on "due_date":** The peer_reviews table has no `due_date` column. Define
overdue as: `status == 'pending' AND year == current_year AND CURRENT_DATE > June 30`.
This is a business-logic threshold — coordinators are expected to submit annual reviews
by mid-year. Implementer can make this threshold configurable as a constant.

---

## Boundary files — do NOT modify

- `lib/firebase.ts`
- `components/AuthProvider.tsx`
- `middleware.ts`

---

## Files to Create

| File | Action | Notes |
|------|--------|-------|
| `app/admin/peer-review/page.tsx` | Create | Server Component — fetches groups + open reviews |
| `app/admin/peer-review/PentangleRing.tsx` | Create | `'use client'` — SVG ring diagram per pentangle |
| `app/admin/peer-review/ReviewList.tsx` | Create | `'use client'` — list of open reviews with overdue badges |

---

## Deliverables

### 1. `app/admin/peer-review/page.tsx`

```typescript
import { requireRole } from '@/lib/supabase/admin-auth'
import { createClient } from '@/lib/supabase/server'
import { PentangleRing } from './PentangleRing'
import { ReviewList } from './ReviewList'

export const dynamic = 'force-dynamic'

interface PentangleGroup {
  id: string
  label: string
  sites: string[]
  review_chain: string[]
  status: 'active' | 'forming'
}

interface PeerReviewRow {
  id: string
  reviewer_site_slug: string
  reviewee_site_slug: string
  year: number
  status: 'pending' | 'submitted' | 'acknowledged'
  submitted_at: string | null
  acknowledged_at: string | null
}

async function getPentangleGroups(): Promise<PentangleGroup[]> {
  const supabase = await createClient()
  if (!supabase) return []
  const { data, error } = await supabase
    .from('pentangle_groups')
    .select('id, label, sites, review_chain, status')
    .order('status', { ascending: false }) // 'forming' before 'active' alphabetically? Use custom order
  if (error) {
    console.error('[peer-review] pentangle_groups error:', error.message)
    return []
  }
  return (data ?? []) as PentangleGroup[]
}

async function getOpenReviews(): Promise<PeerReviewRow[]> {
  const supabase = await createClient()
  if (!supabase) return []
  const currentYear = new Date().getFullYear()
  const { data, error } = await supabase
    .from('peer_reviews')
    .select('id, reviewer_site_slug, reviewee_site_slug, year, status, submitted_at, acknowledged_at')
    .in('status', ['pending', 'submitted'])
    .eq('year', currentYear)
    .order('reviewer_site_slug', { ascending: true })
  if (error) {
    console.error('[peer-review] peer_reviews error:', error.message)
    return []
  }
  return (data ?? []) as PeerReviewRow[]
}

export default async function PeerReviewPage() {
  await requireRole(['site_coordinator'])

  const [groups, openReviews] = await Promise.all([
    getPentangleGroups(),
    getOpenReviews(),
  ])

  const currentYear = new Date().getFullYear()
  // Overdue = pending AND year == current AND past June 30
  const overdueThreshold = new Date(`${currentYear}-06-30`)
  const today = new Date()
  const overdueIds = new Set(
    openReviews
      .filter((r) => r.status === 'pending' && today > overdueThreshold)
      .map((r) => r.id)
  )

  return (
    <div className="p-6 lg:p-8">
      {/* Page header */}
      <div className="mb-6">
        <p className="text-xs font-medium tracking-widest text-[#06211A]/40 uppercase mb-1 font-['DM_Sans']">
          Admin
        </p>
        <h1 className="text-2xl font-semibold text-[#06211A] font-['DM_Sans']">
          Peer Review
        </h1>
        <p className="mt-1 text-sm text-[#06211A]/60 font-['DM_Sans']">
          {currentYear} annual review cycle.{' '}
          {overdueIds.size > 0 && (
            <span className="text-red-600 font-medium">
              {overdueIds.size} review{overdueIds.size > 1 ? 's' : ''} overdue.
            </span>
          )}
        </p>
      </div>

      {/* Pentangle ring diagrams */}
      {groups.length > 0 && (
        <section className="mb-8" aria-label="Pentangle groups">
          <h2 className="text-sm font-semibold text-[#06211A] font-['DM_Sans'] mb-4">
            Groups
          </h2>
          <div className="flex flex-wrap gap-6">
            {groups.map((group) => (
              <PentangleRing
                key={group.id}
                group={group}
                openReviews={openReviews.filter(
                  (r) => group.sites.includes(r.reviewer_site_slug)
                )}
                overdueIds={overdueIds}
              />
            ))}
          </div>
        </section>
      )}

      {/* Open reviews list */}
      <section aria-label="Open reviews">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-[#06211A] font-['DM_Sans']">
            Open Reviews ({openReviews.length})
          </h2>
        </div>
        <div className="bg-white border border-[#06211A]/8 rounded-lg overflow-hidden">
          <ReviewList
            reviews={openReviews}
            overdueIds={overdueIds}
          />
        </div>
      </section>
    </div>
  )
}
```

### 2. `app/admin/peer-review/PentangleRing.tsx`

SVG ring diagram. Each site in the review_chain is a node on a circle. An arc between
adjacent nodes (clockwise) represents a review relationship. Arcs are coloured by status.

```typescript
'use client'

interface PentangleGroup {
  id: string
  label: string
  sites: string[]
  review_chain: string[]
  status: 'active' | 'forming'
}

interface OpenReview {
  id: string
  reviewer_site_slug: string
  reviewee_site_slug: string
  status: 'pending' | 'submitted' | 'acknowledged'
}

interface PentangleRingProps {
  group: PentangleGroup
  openReviews: OpenReview[]
  overdueIds: Set<string>
}

const SIZE = 200
const CENTER = SIZE / 2
const RADIUS = 70
const NODE_R = 12
const FONT_SIZE = 7

function truncate(s: string, max = 12): string {
  return s.length > max ? s.slice(0, max) + '…' : s
}

function getNodePosition(index: number, total: number): { x: number; y: number } {
  const angle = (2 * Math.PI * index) / total - Math.PI / 2
  return {
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
  }
}

export function PentangleRing({ group, openReviews, overdueIds }: PentangleRingProps) {
  const chain = group.review_chain
  const n = chain.length
  if (n === 0) return null

  // Build a lookup: reviewer_slug -> review data
  const reviewMap = new Map(
    openReviews.map((r) => [r.reviewer_site_slug, r])
  )

  // Positions for each node
  const positions = chain.map((_, i) => getNodePosition(i, n))

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Label */}
      <p className="text-xs font-medium text-[#06211A] font-['DM_Sans'] text-center max-w-[180px] leading-tight">
        {group.label}
      </p>
      <span
        className={[
          'text-xs px-1.5 py-0.5 rounded-full font-['DM_Sans']',
          group.status === 'active'
            ? 'bg-[#DBFF66]/20 text-[#4a5e00]'
            : 'bg-[#06211A]/8 text-[#06211A]/50',
        ].join(' ')}
      >
        {group.status}
      </span>

      {/* SVG ring */}
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        aria-label={`${group.label} review chain diagram`}
        role="img"
      >
        {/* Arcs: each site reviews the next in chain */}
        {chain.map((reviewerSlug, i) => {
          const nextIdx = (i + 1) % n
          const from = positions[i]
          const to = positions[nextIdx]
          const review = reviewMap.get(reviewerSlug)
          const isOverdue = review ? overdueIds.has(review.id) : false

          // Calculate a slight curve midpoint
          const mx = (from.x + to.x) / 2
          const my = (from.y + to.y) / 2
          const dx = to.x - from.x
          const dy = to.y - from.y
          // Curve towards center
          const curveFactor = 0.15
          const cx = mx + curveFactor * (CENTER - mx)
          const cy = my + curveFactor * (CENTER - my)

          // Adjust start/end to not overlap with node circles
          const len = Math.sqrt(dx * dx + dy * dy)
          const ux = dx / len
          const uy = dy / len
          const startX = from.x + ux * NODE_R
          const startY = from.y + uy * NODE_R
          const endX = to.x - ux * NODE_R
          const endY = to.y - uy * NODE_R

          const arcColor = isOverdue
            ? '#dc2626' // red-600
            : review?.status === 'submitted'
            ? '#2D6A4F' // Viridian
            : review?.status === 'pending'
            ? '#DBFF66' // Neon Lime
            : '#06211A20' // muted — no review record

          return (
            <g key={reviewerSlug}>
              <path
                d={`M ${startX} ${startY} Q ${cx} ${cy} ${endX} ${endY}`}
                fill="none"
                stroke={arcColor}
                strokeWidth={2}
                strokeLinecap="round"
                markerEnd={`url(#arrow-${group.id})`}
              />
            </g>
          )
        })}

        {/* Arrowhead marker */}
        <defs>
          <marker
            id={`arrow-${group.id}`}
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerWidth="4"
            markerHeight="4"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#06211A60" />
          </marker>
        </defs>

        {/* Nodes */}
        {chain.map((siteSlug, i) => {
          const pos = positions[i]
          const review = reviewMap.get(siteSlug)
          const isOverdue = review ? overdueIds.has(review.id) : false
          const nodeFill = isOverdue
            ? '#fee2e2' // red-100
            : review?.status === 'submitted'
            ? '#d1fae5' // green-100
            : '#F4F4F5'

          return (
            <g key={siteSlug}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={NODE_R}
                fill={nodeFill}
                stroke={isOverdue ? '#dc2626' : '#06211A30'}
                strokeWidth={1.5}
              />
              <text
                x={pos.x}
                y={pos.y + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={FONT_SIZE}
                fill="#06211A"
                fontFamily="DM Sans, sans-serif"
              >
                {truncate(siteSlug, 8)}
              </text>
            </g>
          )
        })}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-2 text-xs font-['DM_Sans']">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#DBFF66] inline-block" />
          pending
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#2D6A4F] inline-block" />
          submitted
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-600 inline-block" />
          overdue
        </span>
      </div>
    </div>
  )
}
```

### 3. `app/admin/peer-review/ReviewList.tsx`

```typescript
'use client'

import { useState } from 'react'

interface OpenReview {
  id: string
  reviewer_site_slug: string
  reviewee_site_slug: string
  year: number
  status: 'pending' | 'submitted' | 'acknowledged'
  submitted_at: string | null
}

interface ReviewListProps {
  reviews: OpenReview[]
  overdueIds: Set<string>
}

const STATUS_BADGE: Record<string, string> = {
  pending: 'bg-[#DBFF66]/20 text-[#4a5e00]',
  submitted: 'bg-[#2D6A4F]/15 text-[#2D6A4F]',
  acknowledged: 'bg-[#06211A]/8 text-[#06211A]/50',
}

export function ReviewList({ reviews, overdueIds }: ReviewListProps) {
  const [bulkLoading, setBulkLoading] = useState(false)

  function handleBulkReminder() {
    const overdueReviews = reviews.filter((r) => overdueIds.has(r.id))
    console.log(
      '[admin/peer-review] Bulk reminder stub — would send reminders to:',
      overdueReviews.map((r) => r.reviewer_site_slug)
    )
    setBulkLoading(true)
    // Simulate async (real email integration is future work)
    setTimeout(() => {
      setBulkLoading(false)
      alert(`Reminder logged for ${overdueReviews.length} overdue review(s). Email integration pending.`)
    }, 800)
  }

  if (reviews.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm text-[#06211A]/40 font-['DM_Sans']">
          No open reviews for the current year.
        </p>
      </div>
    )
  }

  const overdueCount = reviews.filter((r) => overdueIds.has(r.id)).length

  return (
    <div>
      {/* Overdue summary + bulk action */}
      {overdueCount > 0 && (
        <div className="flex items-center justify-between px-4 py-3 bg-red-50 border-b border-red-100">
          <p className="text-sm text-red-700 font-['DM_Sans']">
            <span className="font-semibold">{overdueCount}</span> overdue review
            {overdueCount > 1 ? 's' : ''}
          </p>
          <button
            type="button"
            onClick={handleBulkReminder}
            disabled={bulkLoading}
            className={[
              'text-xs font-medium px-3 py-1.5 rounded font-[\'DM_Sans\']',
              'bg-red-600 text-white hover:bg-red-700 transition-colors',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-1',
            ].join(' ')}
          >
            {bulkLoading ? 'Sending...' : 'Send Reminders'}
          </button>
        </div>
      )}

      {/* Reviews table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm" aria-label="Open peer reviews">
          <thead>
            <tr className="border-b border-[#06211A]/8">
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-[#06211A]/50 uppercase tracking-widest font-['DM_Sans']"
              >
                Reviewer
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-[#06211A]/50 uppercase tracking-widest font-['DM_Sans']"
              >
                Reviewee
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-[#06211A]/50 uppercase tracking-widest font-['DM_Sans']"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-[#06211A]/50 uppercase tracking-widest font-['DM_Sans']"
              >
                Submitted
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#06211A]/8">
            {reviews.map((review) => {
              const isOverdue = overdueIds.has(review.id)
              return (
                <tr
                  key={review.id}
                  className={[
                    'transition-colors hover:bg-[#06211A]/2',
                    isOverdue ? 'bg-red-50/50' : '',
                  ].join(' ')}
                >
                  <td className="px-4 py-3 font-['DM_Sans'] text-[#06211A]">
                    <div className="flex items-center gap-2">
                      {review.reviewer_site_slug}
                      {isOverdue && (
                        <span className="inline-block text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-medium">
                          overdue
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-['DM_Sans'] text-[#06211A]/70">
                    {review.reviewee_site_slug}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium font-['DM_Sans'] ${STATUS_BADGE[review.status]}`}
                    >
                      {review.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#06211A]/50 font-['DM_Sans']">
                    {review.submitted_at
                      ? new Date(review.submitted_at).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })
                      : '—'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
```

---

## Acceptance Criteria

- [ ] `app/admin/peer-review/page.tsx` — Server Component, calls `requireRole(['site_coordinator'])`
- [ ] Page fetches `pentangle_groups` (all) and `peer_reviews` (status pending/submitted, current year)
- [ ] Overdue badge in page header showing count when `> 0`
- [ ] Overdue defined as: `status == 'pending' AND year == currentYear AND today > June 30`
- [ ] `PentangleRing` renders SVG ring diagram with one node per site in `review_chain`
- [ ] Arc arrows connect each node to next (circular); arrowhead direction indicates reviewer → reviewee
- [ ] Arc colour: red = overdue, Viridian = submitted, Neon Lime = pending, muted = no record
- [ ] Node colour matches overdue/submitted/default state
- [ ] SVG has `role="img"` and `aria-label` for accessibility
- [ ] `ReviewList` shows table: Reviewer, Reviewee, Status, Submitted columns
- [ ] Overdue rows have subtle red-50 background + "overdue" red badge in Reviewer cell
- [ ] Overdue summary bar with count + "Send Reminders" button (visible only if overdueCount > 0)
- [ ] "Send Reminders" clicks → `console.log` with reviewer slugs → `alert` with stub message
- [ ] "Send Reminders" shows "Sending..." during 800ms stub delay
- [ ] Empty state: "No open reviews for the current year." when reviews array is empty
- [ ] Graceful null-guard when Supabase not configured
- [ ] TypeScript strict mode passes: `npx tsc --noEmit`
- [ ] No emoji in any component

---

## Design Constraints

- Ring diagram: 200×200 SVG, nodes at radius=70, node circle r=12
- Overdue = red-600 arcs + red-100 node fill
- Submitted = Viridian (#2D6A4F) arcs + green-100 node fill
- Pending = Neon Lime (#DBFF66) arcs + default fill
- No arc = muted (#06211A20) line
- Legend below each ring
- DM Sans for all text including SVG text elements
- Alert in bulk reminder is acceptable for the stub (no toast library required here)

---

## Notes for Implementer

- `peer_reviews` table may have 0 rows in dev (no Supabase connected). All queries
  must return empty arrays gracefully.
- The ring diagram uses inline SVG (no charting library). Keep it purely presentational.
- `review_chain` in `pentangle_groups` is a `text[]` Postgres array. Supabase returns
  it as a JavaScript `string[]` — no special parsing needed.
- The pentangle groups query uses `.order('status')` which returns 'active' before
  'forming' alphabetically. If the product wants active-first, add a secondary sort
  or sort in JS after fetch.
- Self-assessment mention in the original prompt was unclear. The `peer_reviews` schema
  has `reviewer_site_slug != reviewee_site_slug` entries. There is no "self-assessment"
  concept in the current schema — omit it. The page shows only site-to-site reviews.
- The "circular chain ring diagram" in the PRD refers to a visual representation of
  the circular review chain — not a self-assessment radar chart.

---

## Commit Message

```
feat(admin): AP7 — peer review chain overview with ring diagram + overdue flagging
```
