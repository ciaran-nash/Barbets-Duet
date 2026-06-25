// ============================================================
// Supabase Server Client — Wave 6, Task A2-alt
// ============================================================
// Server-side Supabase client for RSC pages and Server Actions.
// Uses @supabase/ssr to read cookies from Next.js headers().
// Call getServerSession() in page.tsx to check auth.
// ============================================================

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { Session, User } from '@supabase/supabase-js';
import type { Profile } from '@/types/community';

// ── Create server client ─────────────────────────────────────

export { createSupabaseServerClient as createClient }

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll called from a Server Component — cookies are read-only
            // in RSC context. The middleware handles session refresh.
          }
        },
      },
    }
  );
}

// ── Session helpers ──────────────────────────────────────────

/**
 * Get the current Supabase session from server cookies.
 * Returns null if unauthenticated.
 */
export async function getServerSession(): Promise<Session | null> {
  const client = await createSupabaseServerClient();
  const {
    data: { session },
  } = await client.auth.getSession();
  return session;
}

/**
 * Get the current authenticated user (more secure than getSession — validates JWT).
 * Returns null if unauthenticated.
 */
export async function getServerUser(): Promise<User | null> {
  const client = await createSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await client.auth.getUser();
  if (error) return null;
  return user;
}

/**
 * Get the authenticated user's profile row from the profiles table.
 * Returns null if unauthenticated or profile not found.
 */
export async function getServerProfile(): Promise<Profile | null> {
  const user = await getServerUser();
  if (!user) return null;

  const client = await createSupabaseServerClient();
  const { data, error } = await client
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    console.error('[getServerProfile]', error.message);
    return null;
  }
  return data as Profile;
}

/**
 * Require authentication in a server component / page.
 * Returns the authenticated user's profile or redirects to sign-in.
 * Usage:
 *   const profile = await requireServerAuth('/community/contribute');
 */
export async function requireServerAuth(
  redirectTo?: string
): Promise<{ user: User; profile: Profile | null }> {
  const user = await getServerUser();
  if (!user) {
    const signInUrl = redirectTo
      ? `/community/sign-in?next=${encodeURIComponent(redirectTo)}`
      : '/community/sign-in';
    redirect(signInUrl);
  }

  const profile = await getServerProfile();
  return { user, profile };
}
