'use server'

import { createClient } from '@supabase/supabase-js'
import { requireRole } from '@/lib/supabase/admin-auth'
import { revalidatePath } from 'next/cache'

export type PentangleActionResult =
  | { ok: true; message: string }
  | { ok: false; error: string }

export interface PentangleInput {
  label: string
  sites: string[]
  review_chain: string[]
  status: 'active' | 'forming'
}

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) return null
  return createClient(url, serviceKey, { auth: { persistSession: false } })
}

function generateId(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '_')
    .slice(0, 40)
}

function isNextRedirect(err: unknown): boolean {
  return (
    err instanceof Error &&
    ((err as { digest?: string }).digest?.startsWith('NEXT_REDIRECT') === true ||
      err.message === 'NEXT_REDIRECT')
  )
}

/**
 * Create a new pentangle group.
 * ID is auto-generated from label.
 */
export async function createPentangleGroup(
  input: PentangleInput
): Promise<PentangleActionResult> {
  try {
    await requireRole(['site_coordinator'])
  } catch (err) {
    if (isNextRedirect(err)) throw err
    return { ok: false, error: 'Unauthorised.' }
  }

  const { label, sites, review_chain, status } = input

  if (!label.trim()) return { ok: false, error: 'Label is required.' }
  if (sites.length === 0) return { ok: false, error: 'At least one site is required.' }
  if (sites.length > 5)
    return { ok: false, error: 'Maximum 5 sites per pentangle group.' }
  if (review_chain.length !== sites.length)
    return {
      ok: false,
      error: 'Review chain must contain the same number of sites as the sites list.',
    }

  const id = generateId(label)
  if (!id) return { ok: false, error: 'Could not generate a valid ID from the label.' }

  const client = getAdminClient()
  if (!client)
    return { ok: false, error: 'Service role credentials not configured.' }

  const { error } = await client.from('pentangle_groups').insert({
    id,
    label: label.trim(),
    sites,
    review_chain,
    status,
  })

  if (error) {
    if (error.code === '23505') {
      return {
        ok: false,
        error: `A group with ID "${id}" already exists. Use a different label.`,
      }
    }
    return { ok: false, error: `Create failed: ${error.message}` }
  }

  revalidatePath('/admin/pentangles')
  return { ok: true, message: `Group "${label.trim()}" created.` }
}

/**
 * Update an existing pentangle group (label, sites, review_chain, status).
 * ID is immutable.
 */
export async function updatePentangleGroup(
  groupId: string,
  input: PentangleInput
): Promise<PentangleActionResult> {
  try {
    await requireRole(['site_coordinator'])
  } catch (err) {
    if (isNextRedirect(err)) throw err
    return { ok: false, error: 'Unauthorised.' }
  }

  if (!groupId) return { ok: false, error: 'Group ID required.' }

  const { label, sites, review_chain, status } = input
  if (!label.trim()) return { ok: false, error: 'Label is required.' }
  if (sites.length > 5)
    return { ok: false, error: 'Maximum 5 sites per pentangle group.' }
  if (review_chain.length !== sites.length)
    return {
      ok: false,
      error: 'Review chain must contain the same number of sites as the sites list.',
    }

  const client = getAdminClient()
  if (!client)
    return { ok: false, error: 'Service role credentials not configured.' }

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
  try {
    await requireRole(['site_coordinator'])
  } catch (err) {
    if (isNextRedirect(err)) throw err
    return { ok: false, error: 'Unauthorised.' }
  }

  if (!groupId) return { ok: false, error: 'Group ID required.' }

  const client = getAdminClient()
  if (!client)
    return { ok: false, error: 'Service role credentials not configured.' }

  // Fetch group sites to check for associated reviews
  const { data: group } = await client
    .from('pentangle_groups')
    .select('sites')
    .eq('id', groupId)
    .single()

  if (group?.sites && Array.isArray(group.sites) && group.sites.length > 0) {
    const { count } = await client
      .from('peer_reviews')
      .select('*', { count: 'exact', head: true })
      .in('reviewer_site_slug', group.sites as string[])

    if ((count ?? 0) > 0) {
      return {
        ok: false,
        error: `Cannot delete: ${count} associated peer review record(s) exist. Archive the reviews first.`,
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
