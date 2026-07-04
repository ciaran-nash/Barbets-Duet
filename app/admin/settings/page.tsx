import { requireRole } from '@/lib/supabase/admin-auth'
import { getPayPalConfig } from '@/lib/settings'
import { PayPalSettingsForm } from './SettingsForm'

/**
 * /admin/settings — Integration settings cockpit (admin only).
 *
 * Two halves:
 *  1. Editable NON-SECRET config (PayPal client ID / mode / enabled) stored
 *     in app_settings.
 *  2. Read-only env-var status checklist so an admin can see at a glance
 *     which integrations still need secrets set in Vercel.
 */

interface EnvCheck {
  label: string
  envVar: string
  present: boolean
  note: string
}

function getEnvChecks(): EnvCheck[] {
  const has = (v?: string) => Boolean(v && v.trim())
  return [
    { label: 'Stripe payments', envVar: 'STRIPE_SECRET_KEY', present: has(process.env.STRIPE_SECRET_KEY), note: 'Card donations via Stripe Checkout' },
    { label: 'PayPal secret', envVar: 'PAYPAL_SECRET', present: has(process.env.PAYPAL_SECRET), note: 'Required with the client ID below for PayPal donations' },
    { label: 'PayPal client ID (env fallback)', envVar: 'NEXT_PUBLIC_PAYPAL_CLIENT_ID', present: has(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID), note: 'DB value below overrides this' },
    { label: 'Volunteer emails', envVar: 'RESEND_API_KEY', present: has(process.env.RESEND_API_KEY), note: 'Confirmation emails via Resend' },
    { label: 'Liveblocks notifications', envVar: 'LIVEBLOCKS_WEBHOOK_SECRET', present: has(process.env.LIVEBLOCKS_WEBHOOK_SECRET), note: 'Forum notification webhook' },
    { label: 'Sanity live revalidation', envVar: 'SANITY_WEBHOOK_SECRET', present: has(process.env.SANITY_WEBHOOK_SECRET), note: 'CMS publish → instant page refresh' },
    { label: 'AI search', envVar: 'AI_GATEWAY_API_KEY', present: has(process.env.AI_GATEWAY_API_KEY), note: 'Local/dev only — Vercel uses OIDC automatically' },
    { label: 'Supabase admin actions', envVar: 'SUPABASE_SERVICE_ROLE_KEY', present: has(process.env.SUPABASE_SERVICE_ROLE_KEY), note: 'Role changes, settings writes' },
  ]
}

export default async function AdminSettingsPage() {
  await requireRole(['admin'])
  const paypal = await getPayPalConfig()
  const checks = getEnvChecks()

  return (
    <div className="p-6 lg:p-8 space-y-10">
      <div>
        <p className="text-xs font-medium tracking-widest text-[#06211A]/40 uppercase mb-1 font-['DM_Sans']">
          Settings
        </p>
        <h1 className="text-2xl font-semibold text-[#06211A] font-['DM_Sans']">
          Integrations
        </h1>
      </div>

      {/* PayPal config */}
      <section className="bg-white border border-[#06211A]/8 rounded-lg p-6">
        <h2 className="text-base font-semibold text-[#06211A] font-['DM_Sans'] mb-1">PayPal</h2>
        <p className="text-sm text-[#06211A]/60 font-['DM_Sans'] mb-6">
          The client ID and mode are safe to store here. The API secret must be set as the{' '}
          <code className="text-xs bg-[#06211A]/5 px-1.5 py-0.5 rounded">PAYPAL_SECRET</code>{' '}
          environment variable in Vercel — it is never stored in the database.
        </p>
        <div className={`inline-flex items-center gap-2 text-xs font-medium font-['DM_Sans'] px-3 py-1.5 rounded-full mb-6 ${paypal.ready ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
          <span className={`w-2 h-2 rounded-full ${paypal.ready ? 'bg-green-600' : 'bg-amber-500'}`} />
          {paypal.ready
            ? `PayPal ready (${paypal.mode})`
            : 'Not ready — set PAYPAL_SECRET in Vercel and a client ID below'}
        </div>
        <PayPalSettingsForm
          initial={{
            clientId: paypal.clientId ?? '',
            mode: paypal.mode,
            enabled: paypal.enabled,
          }}
        />
      </section>

      {/* Env status checklist */}
      <section className="bg-white border border-[#06211A]/8 rounded-lg p-6">
        <h2 className="text-base font-semibold text-[#06211A] font-['DM_Sans'] mb-1">
          Environment status
        </h2>
        <p className="text-sm text-[#06211A]/60 font-['DM_Sans'] mb-6">
          Secrets are managed in the Vercel dashboard (Project → Settings → Environment
          Variables). This checklist shows which are currently detected.
        </p>
        <ul className="divide-y divide-[#06211A]/6">
          {checks.map((check) => (
            <li key={check.envVar} className="py-3 flex items-start gap-3">
              <span
                aria-hidden
                className={`mt-1 w-2.5 h-2.5 rounded-full shrink-0 ${check.present ? 'bg-green-600' : 'bg-red-400'}`}
              />
              <div className="min-w-0">
                <p className="text-sm font-medium text-[#06211A] font-['DM_Sans']">
                  {check.label}{' '}
                  <span className={`text-xs font-normal ${check.present ? 'text-green-700' : 'text-red-600'}`}>
                    {check.present ? 'configured' : 'missing'}
                  </span>
                </p>
                <p className="text-xs text-[#06211A]/50 font-['DM_Sans']">
                  <code className="bg-[#06211A]/5 px-1 py-0.5 rounded">{check.envVar}</code> — {check.note}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
