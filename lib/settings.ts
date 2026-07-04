import 'server-only';
import { createClient } from '@supabase/supabase-js';

/**
 * Server-side reader for the app_settings table (admin-editable, non-secret
 * runtime config). Falls back to env vars when the table/row is absent, so
 * the app works before the migration is applied or the admin has saved
 * anything.
 *
 * Secrets are NEVER stored here — they stay in Vercel env vars.
 */

export interface PayPalConfig {
  /** PayPal enabled toggle — button only shows when true AND secret present */
  enabled: boolean;
  clientId: string | null;
  mode: 'sandbox' | 'live';
  /** true when PAYPAL_SECRET + client ID are both available server-side */
  ready: boolean;
}

async function readSetting(key: string): Promise<Record<string, unknown> | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;

  try {
    const admin = createClient(url, serviceKey, { auth: { persistSession: false } });
    const { data, error } = await admin
      .from('app_settings')
      .select('value')
      .eq('key', key)
      .maybeSingle();
    if (error) return null;
    return (data?.value as Record<string, unknown>) ?? null;
  } catch {
    return null;
  }
}

export async function getPayPalConfig(): Promise<PayPalConfig> {
  const db = await readSetting('paypal');

  const clientId =
    (typeof db?.clientId === 'string' && db.clientId.trim()) ||
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ||
    null;
  const mode: 'sandbox' | 'live' = db?.mode === 'live' ? 'live' : 'sandbox';
  // Enabled defaults to true when a client ID exists; admin can switch it off.
  const enabled = db?.enabled === undefined ? Boolean(clientId) : db.enabled === true;
  const ready = Boolean(clientId && process.env.PAYPAL_SECRET);

  return { enabled, clientId, mode, ready };
}
