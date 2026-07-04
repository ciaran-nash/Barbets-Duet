'use client'

import { useState, useTransition } from 'react'
import { savePayPalSettings } from './actions'

interface Props {
  initial: { clientId: string; mode: 'sandbox' | 'live'; enabled: boolean }
}

export function PayPalSettingsForm({ initial }: Props) {
  const [clientId, setClientId] = useState(initial.clientId)
  const [mode, setMode] = useState<'sandbox' | 'live'>(initial.mode)
  const [enabled, setEnabled] = useState(initial.enabled)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setError(null)
    startTransition(async () => {
      const result = await savePayPalSettings({ clientId: clientId.trim(), mode, enabled })
      if (result.ok) setMessage(result.message)
      else setError(result.error)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
      <div>
        <label htmlFor="paypal-client-id" className="block text-xs font-medium text-[#06211A]/60 uppercase tracking-widest font-['DM_Sans'] mb-2">
          PayPal Client ID (public)
        </label>
        <input
          id="paypal-client-id"
          type="text"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          placeholder="AbC123… (from PayPal developer dashboard)"
          className="w-full border border-[#06211A]/15 rounded-lg px-3.5 py-2.5 text-sm text-[#06211A] font-['DM_Sans'] focus:outline-none focus:ring-2 focus:ring-[#06211A]/20 bg-white"
        />
      </div>

      <div>
        <label htmlFor="paypal-mode" className="block text-xs font-medium text-[#06211A]/60 uppercase tracking-widest font-['DM_Sans'] mb-2">
          Mode
        </label>
        <select
          id="paypal-mode"
          value={mode}
          onChange={(e) => setMode(e.target.value as 'sandbox' | 'live')}
          aria-label="PayPal environment mode"
          className="w-full border border-[#06211A]/15 rounded-lg px-3.5 py-2.5 text-sm text-[#06211A] font-['DM_Sans'] focus:outline-none focus:ring-2 focus:ring-[#06211A]/20 bg-white"
        >
          <option value="sandbox">Sandbox (test payments)</option>
          <option value="live">Live (real payments)</option>
        </select>
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
          className="w-4 h-4 accent-[#06211A]"
        />
        <span className="text-sm text-[#06211A] font-['DM_Sans']">
          Show PayPal button on the donation page
        </span>
      </label>

      {message && <p className="text-sm text-green-700 font-['DM_Sans']">{message}</p>}
      {error && <p className="text-sm text-red-700 font-['DM_Sans']">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="px-5 py-2.5 bg-[#06211A] text-white text-sm font-medium rounded-lg font-['DM_Sans'] hover:bg-[#06211A]/90 transition-colors disabled:opacity-50"
      >
        {isPending ? 'Saving…' : 'Save PayPal settings'}
      </button>
    </form>
  )
}
