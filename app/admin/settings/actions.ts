'use server'

import { createClient } from '@supabase/supabase-js'
import { requireRole } from '@/lib/supabase/admin-auth'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export type SaveSettingsResult =
  | { ok: true; message: string }
  | { ok: false; error: string }

const paypalSettingsSchema = z.object({
  clientId: z.string().max(200),
  mode: z.enum(['sandbox', 'live']),
  enabled: z.boolean(),
})

/**
 * Save PayPal non-secret config to app_settings. Secrets (PAYPAL_SECRET)
 * are NOT accepted here — they live in Vercel env vars only.
 * Requires admin role. Uses service-role client (same pattern as member actions).
 */
export async function savePayPalSettings(input: {
  clientId: string
  mode: 'sandbox' | 'live'
  enabled: boolean
}): Promise<SaveSettingsResult> {
  try {
    await requireRole(['admin'])
  } catch (err) {
    if (
      err instanceof Error &&
      (err.message === 'NEXT_REDIRECT' || (err as { digest?: string }).digest?.startsWith('NEXT_REDIRECT'))
    ) {
      throw err
    }
    return { ok: false, error: 'Unauthorised.' }
  }

  const parsed = paypalSettingsSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: 'Invalid settings values.' }
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) {
    return { ok: false, error: 'Service role credentials not configured. Set SUPABASE_SERVICE_ROLE_KEY.' }
  }

  const adminClient = createClient(url, serviceKey, { auth: { persistSession: false } })

  const { error } = await adminClient.from('app_settings').upsert({
    key: 'paypal',
    value: parsed.data,
    updated_at: new Date().toISOString(),
  })

  if (error) {
    console.error('[savePayPalSettings] Supabase error:', error.message)
    return { ok: false, error: `Failed to save settings: ${error.message}` }
  }

  revalidatePath('/admin/settings')
  revalidatePath('/support-us')
  return { ok: true, message: 'PayPal settings saved.' }
}
