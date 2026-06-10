# Task Brief: AP5 — T&E Publish/Reject Server Actions

**PRD:** admin-portal
**Wave:** 2 (depends on AP4 — run after AP4 is merged)
**Complexity:** 4/10
**Model:** Sonnet
**Branch:** worktree/admin-portal-AP5
**Base branch:** feature/admin-portal
**Worktree path:** .karimo/.worktrees/admin-portal/AP5

---

## Context

AP4 built the read-only T&E review queue. This task adds the write-side: server actions
that coordinators use to publish or reject a submission directly from the admin portal.

T&E submissions live in **Sanity** (document type `trialAndError`, field `status`). Writes
use the Sanity HTTP API via the write client created in AP4 (`lib/sanity/admin-queries.ts`).
There is no Supabase involvement in AP5 — role-checking is done via `requireRole` from
`lib/supabase/admin-auth.ts` (as corrected in AP4).

**Secondary concern:** The `app/admin/submissions/SubmissionRow.tsx` built in AP4 shows
an inline "Open in Sanity Studio" link for pending items. AP5 adds publish and reject
action buttons to that same row UI, wired to the server actions.

---

## Dependency

**Must be in the same worktree as AP4's output.** Before starting:
1. Pull `feature/admin-portal` which has AP4 merged
2. `lib/sanity/admin-queries.ts` must exist (created in AP4)
3. `app/admin/submissions/SubmissionRow.tsx` must exist (created in AP4)

---

## Files to Create / Modify

| File | Action | Notes |
|------|--------|-------|
| `app/admin/submissions/actions.ts` | Create | `publishSubmission` + `rejectSubmission` server actions |
| `app/admin/submissions/SubmissionRow.tsx` | Modify | Add publish/reject buttons (pending tab only); add optimistic feedback + toast |
| `app/admin/submissions/Toast.tsx` | Create | `'use client'` micro-toast component |

---

## Deliverables

### 1. `app/admin/submissions/actions.ts`

Server actions. Both actions:
- Re-check role server-side (defense in depth — never trust client)
- Use `getAdminWriteClient()` from `lib/sanity/admin-queries.ts`
- Handle missing Sanity credentials gracefully
- Return a typed result object (no redirect — caller handles UI)

```typescript
'use server'

import { requireRole } from '@/lib/supabase/admin-auth'
import { getAdminWriteClient } from '@/lib/sanity/admin-queries'
import { revalidatePath } from 'next/cache'

export type ActionResult =
  | { ok: true; message: string }
  | { ok: false; error: string }

/**
 * Publish a T&E submission.
 *
 * Sets status = 'published' and publishedAt = now() on the Sanity document.
 * Requires site_coordinator role. Revalidates the submissions page.
 */
export async function publishSubmission(
  sanityDocId: string
): Promise<ActionResult> {
  // Server-side role check — never skip
  try {
    await requireRole(['site_coordinator'])
  } catch {
    return { ok: false, error: 'Unauthorised — coordinator role required.' }
  }

  if (!sanityDocId || typeof sanityDocId !== 'string') {
    return { ok: false, error: 'Invalid document ID.' }
  }

  const client = getAdminWriteClient()
  if (!client) {
    return {
      ok: false,
      error: 'Sanity write client not configured. Set SANITY_API_TOKEN.',
    }
  }

  try {
    await client
      .patch(sanityDocId)
      .set({
        status: 'published',
        publishedAt: new Date().toISOString(),
      })
      .commit()

    // Revalidate admin queue
    revalidatePath('/admin/submissions')

    return { ok: true, message: 'Submission published.' }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('[publishSubmission] Sanity patch failed:', message)
    return { ok: false, error: `Failed to publish: ${message}` }
  }
}

/**
 * Reject a T&E submission.
 *
 * Sets status = 'rejected'. Reason is stored as a comment in Sanity
 * (written to a `rejectionReason` field if it exists; ignored if not).
 * Requires site_coordinator role.
 */
export async function rejectSubmission(
  sanityDocId: string,
  reason: string
): Promise<ActionResult> {
  try {
    await requireRole(['site_coordinator'])
  } catch {
    return { ok: false, error: 'Unauthorised — coordinator role required.' }
  }

  if (!sanityDocId || typeof sanityDocId !== 'string') {
    return { ok: false, error: 'Invalid document ID.' }
  }

  const trimmedReason = (reason ?? '').trim()
  if (!trimmedReason) {
    return { ok: false, error: 'Rejection reason is required.' }
  }

  const client = getAdminWriteClient()
  if (!client) {
    return {
      ok: false,
      error: 'Sanity write client not configured. Set SANITY_API_TOKEN.',
    }
  }

  try {
    await client
      .patch(sanityDocId)
      .set({
        status: 'rejected',
        // rejectionReason field may not exist in schema yet — .set() is safe,
        // Sanity will store it even if the field is not declared in the schema.
        rejectionReason: trimmedReason,
      })
      .commit()

    revalidatePath('/admin/submissions')

    return { ok: true, message: 'Submission rejected.' }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('[rejectSubmission] Sanity patch failed:', message)
    return { ok: false, error: `Failed to reject: ${message}` }
  }
}
```

### 2. `app/admin/submissions/Toast.tsx`

Minimal toast notification — no external library. Auto-dismisses after 4 seconds.

```typescript
'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, XCircle } from '@phosphor-icons/react'

interface ToastProps {
  message: string
  variant: 'success' | 'error'
  onDismiss: () => void
}

export function Toast({ message, variant, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 4000)
    return () => clearTimeout(timer)
  }, [onDismiss])

  return (
    <div
      role="status"
      aria-live="polite"
      className={[
        'fixed bottom-6 right-6 z-50 flex items-center gap-3',
        'px-4 py-3 rounded-lg shadow-lg text-sm font-medium font-[\'DM_Sans\']',
        'animate-in slide-in-from-bottom-2 fade-in duration-200',
        variant === 'success'
          ? 'bg-[#06211A] text-[#DBFF66]'
          : 'bg-red-900 text-red-100',
      ].join(' ')}
    >
      {variant === 'success' ? (
        <CheckCircle size={16} weight="bold" className="shrink-0" />
      ) : (
        <XCircle size={16} weight="bold" className="shrink-0" />
      )}
      <span>{message}</span>
    </div>
  )
}
```

**Note on `animate-in`:** Tailwind CSS v4 / tailwindcss-animate may or may not be in the
project. If the animation classes cause TypeScript or build errors, replace with a plain
`transition-all` or remove animation entirely — the component is functional without it.

### 3. Modify `app/admin/submissions/SubmissionRow.tsx`

Add publish/reject UI to the expanded detail panel. Only shown when `status === 'pending_review'`.

**Replace the existing `{entry.status === 'pending_review' && ...}` block** in the
expanded panel with:

```typescript
{entry.status === 'pending_review' && (
  <PendingActions docId={entry._id} />
)}
```

**Add the `PendingActions` component** inline in the same file (or as a separate import —
implementer's choice). This component manages local state for the rejection form:

```typescript
'use client'

// Add this import at the top of SubmissionRow.tsx:
import { publishSubmission, rejectSubmission } from './actions'
import { Toast } from './Toast'

// Add PendingActions component (can be at bottom of same file):
interface PendingActionsProps {
  docId: string
}

function PendingActions({ docId }: PendingActionsProps) {
  const [showRejectForm, setShowRejectForm] = useState(false)
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState<'publish' | 'reject' | null>(null)
  const [toast, setToast] = useState<{ message: string; variant: 'success' | 'error' } | null>(null)

  async function handlePublish() {
    setLoading('publish')
    const result = await publishSubmission(docId)
    setLoading(null)
    setToast({
      message: result.ok ? result.message : result.error,
      variant: result.ok ? 'success' : 'error',
    })
  }

  async function handleReject(e: React.FormEvent) {
    e.preventDefault()
    setLoading('reject')
    const result = await rejectSubmission(docId, reason)
    setLoading(null)
    if (result.ok) {
      setShowRejectForm(false)
      setReason('')
    }
    setToast({
      message: result.ok ? result.message : result.error,
      variant: result.ok ? 'success' : 'error',
    })
  }

  return (
    <div className="pt-2 border-t border-[#06211A]/8">
      {!showRejectForm ? (
        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={handlePublish}
            disabled={loading !== null}
            className={[
              'text-xs font-medium px-3 py-1.5 rounded font-[\'DM_Sans\'] transition-colors',
              'bg-[#06211A] text-[#DBFF66] hover:bg-[#0d3627]',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DBFF66] focus-visible:ring-offset-1',
            ].join(' ')}
          >
            {loading === 'publish' ? 'Publishing...' : 'Publish'}
          </button>

          <button
            type="button"
            onClick={() => setShowRejectForm(true)}
            disabled={loading !== null}
            className={[
              'text-xs font-medium px-3 py-1.5 rounded font-[\'DM_Sans\'] transition-colors',
              'bg-transparent text-red-600 border border-red-300 hover:bg-red-50',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-1',
            ].join(' ')}
          >
            Reject
          </button>

          <a
            href={`https://barbetsduet.sanity.studio/desk/trialAndError;${docId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#06211A]/50 hover:text-[#06211A] underline underline-offset-2 font-['DM_Sans'] transition-colors"
          >
            Open in Studio
          </a>
        </div>
      ) : (
        <form onSubmit={handleReject} className="space-y-2">
          <label
            htmlFor={`reject-reason-${docId}`}
            className="block text-xs font-medium text-[#06211A]/70 font-['DM_Sans']"
          >
            Rejection reason <span className="text-red-500">*</span>
          </label>
          <textarea
            id={`reject-reason-${docId}`}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={2}
            required
            placeholder="Explain why this submission is being rejected..."
            className={[
              'w-full text-xs border border-[#06211A]/20 rounded px-2.5 py-2',
              'font-[\'DM_Sans\'] text-[#06211A] placeholder:text-[#06211A]/30',
              'focus:outline-none focus:ring-2 focus:ring-[#06211A]/30 focus:border-[#06211A]/40',
              'resize-none',
            ].join(' ')}
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading !== null || !reason.trim()}
              className={[
                'text-xs font-medium px-3 py-1.5 rounded font-[\'DM_Sans\'] transition-colors',
                'bg-red-600 text-white hover:bg-red-700',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-1',
              ].join(' ')}
            >
              {loading === 'reject' ? 'Rejecting...' : 'Confirm Reject'}
            </button>
            <button
              type="button"
              onClick={() => { setShowRejectForm(false); setReason('') }}
              disabled={loading !== null}
              className="text-xs text-[#06211A]/50 hover:text-[#06211A] font-['DM_Sans'] transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {toast && (
        <Toast
          message={toast.message}
          variant={toast.variant}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  )
}
```

---

## Acceptance Criteria

- [ ] `app/admin/submissions/actions.ts` — `'use server'` directive, exports `publishSubmission(id)` and `rejectSubmission(id, reason)`
- [ ] Both actions call `requireRole(['site_coordinator'])` as first operation
- [ ] `publishSubmission` sets `status = 'published'` and `publishedAt = now()` via Sanity patch
- [ ] `rejectSubmission` sets `status = 'rejected'` and stores `rejectionReason`
- [ ] Both actions return `ActionResult` — never throw to the client
- [ ] `rejectSubmission` validates reason is non-empty and returns error if blank
- [ ] Both actions call `revalidatePath('/admin/submissions')`
- [ ] Actions handle missing `SANITY_API_TOKEN` gracefully (return `ok: false` with message)
- [ ] Publish button shows loading state `'Publishing...'` while pending
- [ ] Reject button reveals inline form; "Confirm Reject" disabled until reason typed
- [ ] Success toast: Night Forest bg + Neon Lime text; auto-dismisses after 4 seconds
- [ ] Error toast: dark red bg + light text
- [ ] Toast has `role="status"` + `aria-live="polite"` for screen reader support
- [ ] After publish/reject: `revalidatePath` causes server to re-fetch — row disappears from Pending tab
- [ ] Optimistic feedback via disabled states during async call
- [ ] TypeScript strict mode passes: `npx tsc --noEmit`
- [ ] No emoji in any component

---

## Design Constraints

- Publish button: Night Forest bg + Neon Lime text — primary action
- Reject button: transparent with red-300 border, red-600 text — destructive action
- Both buttons: 4.5:1 minimum contrast ratio on their respective backgrounds
- Rejection textarea: 2 rows, full width, subtle border
- Form layout: no card elevation — inline within the expanded row panel

---

## Notes for Implementer

- The `'use server'` directive must be at the top of `actions.ts` (file-level), not
  inside individual functions.
- `revalidatePath` in a server action invalidates the Next.js route cache and causes
  the next navigation to the page to re-fetch data from Sanity. This provides the
  "optimistic UI" — after publish, a page reload shows the item in the Published tab.
  For true instant removal without reload, a more complex approach (useOptimistic) is
  out of scope for this task.
- `requireRole` in admin-auth.ts calls `redirect()` internally when unauthenticated.
  Wrap in try/catch in the server action to convert to an `ActionResult` return instead.
  (The redirect from requireRole throws a Next.js redirect error — catch it and re-throw
  only if it IS a redirect, otherwise convert to error result.)

  Correct pattern:
  ```typescript
  try {
    await requireRole(['site_coordinator'])
  } catch (err) {
    // Re-throw Next.js redirect errors (they are not real errors)
    if (err instanceof Error && err.message === 'NEXT_REDIRECT') throw err
    return { ok: false, error: 'Unauthorised.' }
  }
  ```
- The `animate-in` class on Toast comes from `tailwindcss-animate`. If not installed,
  remove the animation classes — functionality is unaffected.
- `@phosphor-icons/react` is already installed (AP3). No reinstall needed.

---

## Commit Message

```
feat(admin): AP5 — T&E publish/reject server actions with optimistic UI
```
