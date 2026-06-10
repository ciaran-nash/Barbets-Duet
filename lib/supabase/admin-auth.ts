import { createClient } from './server'
import { redirect } from 'next/navigation'

/**
 * Role values matching the profiles.role column enum defined in:
 *   supabase/migrations/20260609000001_community_schema.sql
 *
 * Role hierarchy (lowest → highest privilege):
 *   local_community < barbets_friend < junior_member < site_coordinator
 *
 * NOTE: middleware.ts (AP2) uses a different MemberRole type ('member'|'coordinator'|'admin')
 * that does not match this schema. That is a known mismatch in the middleware UX layer only.
 * middleware.ts is the human-reviewed boundary (PR #26) and must not be modified.
 * // TODO: middleware.ts member_role column mismatch — tracked, fix in future wave
 */
export type MemberRole =
  | 'site_coordinator'
  | 'junior_member'
  | 'barbets_friend'
  | 'local_community'

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

  // Fetch role from profiles table (column name is 'role', not 'member_role')
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  // Default to 'local_community' if profile not found or role is null
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
 *   const user = await requireRole(['site_coordinator'])
 *
 * Usage in a Server Action:
 *   const user = await requireRole(['site_coordinator'])
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
