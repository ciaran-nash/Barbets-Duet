import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'

/**
 * Role values matching profiles.role enum (community_schema migration + add_admin_role migration).
 *
 * Access map:
 *   /admin/*      → site_coordinator | admin
 *   /superadmin/* → admin only
 *   community     → any role
 */
export type MemberRole =
  | 'site_coordinator'
  | 'junior_member'
  | 'barbets_friend'
  | 'local_community'
  | 'admin'

/**
 * Authenticated session user shape returned by getSessionUser().
 */
export interface SessionUser {
  id: string
  email: string | undefined
  role: MemberRole
}

/**
 * Returns the authenticated Supabase user with their role from profiles.
 *
 * Returns null if:
 *   - Supabase is not configured (missing env vars)
 *   - No valid session cookie present
 *   - Session has expired
 *
 * IMPORTANT: This function makes two DB round-trips (auth.getUser + profiles select).
 * Use sparingly in hot paths. For middleware, see middleware.ts which has its own
 * session helper to avoid importing next/headers.
 */
export async function getSessionUser(): Promise<SessionUser | null> {
  const supabase = await createClient()

  if (!supabase) {
    console.warn('[admin-auth] Supabase not configured — getSessionUser returns null')
    return null
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return null
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const role: MemberRole = (profile?.role as MemberRole) ?? 'local_community'

  return {
    id: user.id,
    email: user.email,
    role,
  }
}

/**
 * Server-side route guard. Verifies the current session has one of the
 * specified roles.
 *
 * Redirects to /auth/login if unauthenticated.
 * Redirects to /403 if authenticated but role not in allowedRoles.
 * Returns the session user if role check passes.
 *
 * Usage in a Server Component:
 *   const user = await requireRole(['site_coordinator', 'admin'])
 *
 * Usage in a Server Action:
 *   const user = await requireRole(['admin'])
 */
export async function requireRole(allowedRoles: MemberRole[]): Promise<SessionUser> {
  const user = await getSessionUser()

  if (!user) {
    redirect('/auth/login')
  }

  if (!allowedRoles.includes(user.role)) {
    redirect('/403')
  }

  return user
}
