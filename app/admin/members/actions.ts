'use server'

import { createClient } from '@supabase/supabase-js'
import { requireRole } from '@/lib/supabase/admin-auth'
import type { MemberRole } from '@/lib/supabase/admin-auth'
import { revalidatePath } from 'next/cache'

export type UpdateRoleResult =
  | { ok: true; message: string }
  | { ok: false; error: string }

const VALID_ROLES: MemberRole[] = [
  'site_coordinator',
  'junior_member',
  'barbets_friend',
  'local_community',
]

/**
 * Update a member's role in the profiles table.
 *
 * Uses Supabase service-role key to bypass RLS (required because
 * the profiles_self_update RLS policy only allows users to update their own rows).
 *
 * Requires the caller to have site_coordinator role.
 */
export async function updateMemberRole(
  userId: string,
  newRole: MemberRole
): Promise<UpdateRoleResult> {
  // Server-side role check — first operation, always
  try {
    await requireRole(['site_coordinator'])
  } catch (err) {
    // Re-throw Next.js redirect errors — they are control flow, not real errors
    if (
      err instanceof Error &&
      (err.message === 'NEXT_REDIRECT' || (err as { digest?: string }).digest?.startsWith('NEXT_REDIRECT'))
    ) {
      throw err
    }
    return { ok: false, error: 'Unauthorised.' }
  }

  if (!userId || typeof userId !== 'string') {
    return { ok: false, error: 'Invalid user ID.' }
  }

  if (!VALID_ROLES.includes(newRole)) {
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
  return {
    ok: true,
    message: `Role updated to ${newRole.replace(/_/g, ' ')}.`,
  }
}
