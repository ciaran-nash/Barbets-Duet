'use server'

import { requireRole } from '@/lib/supabase/admin-auth'
import { getAdminWriteClient } from '@/lib/sanity/admin-queries'
import { revalidatePath } from 'next/cache'

export type ActionResult =
  | { ok: true; message: string }
  | { ok: false; error: string }

function isNextRedirect(err: unknown): boolean {
  return (
    err instanceof Error &&
    ((err as { digest?: string }).digest?.startsWith('NEXT_REDIRECT') === true ||
      err.message === 'NEXT_REDIRECT')
  )
}

/**
 * Publish a T&E submission in Sanity.
 *
 * Sets status = 'published' and publishedAt = now() on the trialAndError document.
 * Requires site_coordinator role (re-checked server-side).
 * Calls revalidatePath so the next page load shows updated state.
 */
export async function publishSubmission(
  sanityDocId: string
): Promise<ActionResult> {
  // Role check — first operation, always
  try {
    await requireRole(['site_coordinator'])
  } catch (err) {
    if (isNextRedirect(err)) throw err
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

    revalidatePath('/admin/submissions')
    return { ok: true, message: 'Submission published.' }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('[publishSubmission] Sanity patch failed:', message)
    return { ok: false, error: `Failed to publish: ${message}` }
  }
}

/**
 * Reject a T&E submission in Sanity.
 *
 * Sets status = 'rejected' and stores the rejection reason.
 * Reason is required — returns error if blank.
 * Requires site_coordinator role.
 */
export async function rejectSubmission(
  sanityDocId: string,
  reason: string
): Promise<ActionResult> {
  try {
    await requireRole(['site_coordinator'])
  } catch (err) {
    if (isNextRedirect(err)) throw err
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
        // rejectionReason is not declared in the current Sanity schema but
        // Sanity will accept and store undeclared fields. Harmless if schema
        // is later updated to include this field.
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
