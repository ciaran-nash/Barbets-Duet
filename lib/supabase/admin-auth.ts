import { createClient } from './server'
import { redirect } from 'next/navigation'

/**
 * Role values derived from profiles.member_role enum (PR #9 schema).
 * Keep in sync with Supabase migration if the enum values change.
 *
 * Role hierarchy (lowest → highest privilege):
 *   member < coordinator < admin
 */
export type MemberRole = 'member' | 'coordinator' | 'admin'

/**
 * Authenticated session user shape returned by getSessionUser().
 */
export interface SessionUser {
  id: string
  email: string | undefined
  role: MemberRole
}

/**
 * Returns the authenticated Supabase user with their member_role from profiles.
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

  // Fetch member_role from profiles table
  const { data: profile } = await supabase
    .from('profiles')
    .select('member_role')
    .eq('id', user.id)
    .single()

  // Default to 'member' if profile not found or role is null
  const role: MemberRole = (profile?.member_role as MemberRole) ?? 'member'

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
 *   const user = await requireRole(['coordinator', 'admin'])
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
