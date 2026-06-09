import { createBrowserClient } from '@supabase/ssr'

/**
 * Browser-side Supabase client for use in Client Components.
 * Returns null if NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY
 * are not configured — callers must handle null return.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    // Graceful degradation — credentials not configured in this environment
    console.warn(
      '[Supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. ' +
        'Admin auth will not function until these are set.'
    )
    return null
  }

  return createBrowserClient(url, key)
}
