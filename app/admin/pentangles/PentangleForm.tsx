'use client'

import { useState } from 'react'
import { createPentangleGroup, updatePentangleGroup } from './actions'
import type { PentangleInput } from './actions'

interface ExistingGroup {
  id: string
  label: string
  sites: string[]
  status: 'active' | 'forming'
}

interface PentangleFormProps {
  existing?: ExistingGroup
  onClose: () => void
  onSuccess: (message: string) => void
}

function parseSites(raw: string): string[] {
  return raw
    .split(/[,\n]/)
    .map((s) => s.trim().toLowerCase().replace(/\s+/g, '-'))
    .filter(Boolean)
}

function previewId(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '_')
    .slice(0, 40)
}

export function PentangleForm({ existing, onClose, onSuccess }: PentangleFormProps) {
  const isEdit = !!existing

  const [label, setLabel] = useState(existing?.label ?? '')
  const [sitesText, setSitesText] = useState(existing?.sites.join(', ') ?? '')
  const [status, setStatus] = useState<'active' | 'forming'>(
    existing?.status ?? 'forming'
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sites = parseSites(sitesText)
  const siteCount = sites.length
  const siteCountExceeded = siteCount > 5

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (siteCountExceeded) return
    setError(null)

    const input: PentangleInput = {
      label,
      sites,
      review_chain: sites, // review_chain mirrors sites order
      status,
    }

    setLoading(true)
    const result = isEdit
      ? await updatePentangleGroup(existing.id, input)
      : await createPentangleGroup(input)
    setLoading(false)

    if (result.ok) {
      onSuccess(result.message)
      onClose()
    } else {
      setError(result.error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-[#F4F4F5] border border-[#06211A]/10 rounded-lg space-y-4"
      aria-label={isEdit ? `Edit ${existing.label}` : 'Create pentangle group'}
      noValidate
    >
      <h3 className="text-sm font-semibold text-[#06211A] font-['DM_Sans']">
        {isEdit ? `Edit: ${existing.label}` : 'New Pentangle Group'}
      </h3>

      {/* Label */}
      <div>
        <label
          htmlFor="pf-label"
          className="block text-xs font-medium text-[#06211A]/70 font-['DM_Sans'] mb-1"
        >
          Group label <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          id="pf-label"
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          required
          placeholder="e.g. West African Pentangle"
          className={[
            'w-full px-3 py-2 text-sm border border-[#06211A]/20 rounded-md bg-white',
            "font-['DM_Sans'] text-[#06211A] placeholder:text-[#06211A]/35",
            'focus:outline-none focus:ring-2 focus:ring-[#06211A]/20 focus:border-[#06211A]/40',
          ].join(' ')}
        />
        {!isEdit && label.trim() && (
          <p className="text-xs text-[#06211A]/40 font-['DM_Sans'] mt-0.5 font-mono">
            id: {previewId(label)}
          </p>
        )}
      </div>

      {/* Sites */}
      <div>
        <label
          htmlFor="pf-sites"
          className="block text-xs font-medium text-[#06211A]/70 font-['DM_Sans'] mb-1"
        >
          Site slugs{' '}
          <span className="text-red-500" aria-hidden="true">*</span>
          <span className="ml-1 text-[#06211A]/40 font-normal">
            (comma or newline separated)
          </span>
        </label>
        <textarea
          id="pf-sites"
          value={sitesText}
          onChange={(e) => setSitesText(e.target.value)}
          rows={3}
          required
          placeholder="mlingotini, himo, seme, molo-magode-farm, lukenya-zumula-farm"
          className={[
            'w-full px-3 py-2 text-sm border border-[#06211A]/20 rounded-md bg-white resize-none',
            "font-['DM_Sans'] text-[#06211A] placeholder:text-[#06211A]/30",
            'focus:outline-none focus:ring-2 focus:ring-[#06211A]/20 focus:border-[#06211A]/40',
          ].join(' ')}
          aria-describedby="pf-sites-count"
        />
        <p
          id="pf-sites-count"
          className={[
            "text-xs font-['DM_Sans'] mt-0.5",
            siteCountExceeded ? 'text-red-600 font-medium' : 'text-[#06211A]/40',
          ].join(' ')}
        >
          {siteCount} site{siteCount !== 1 ? 's' : ''}
          {siteCountExceeded ? ' — maximum is 5' : ' (max 5)'}
        </p>
      </div>

      {/* Status */}
      <fieldset>
        <legend className="text-xs font-medium text-[#06211A]/70 font-['DM_Sans'] mb-1">
          Status
        </legend>
        <div className="flex gap-4">
          {(['forming', 'active'] as const).map((s) => (
            <label
              key={s}
              className="flex items-center gap-2 cursor-pointer text-sm text-[#06211A] font-['DM_Sans'] capitalize"
            >
              <input
                type="radio"
                name="pf-status"
                value={s}
                checked={status === s}
                onChange={() => setStatus(s)}
                className="accent-[#06211A]"
              />
              {s}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Error message */}
      {error && (
        <div
          role="alert"
          className="text-xs text-red-600 font-['DM_Sans'] bg-red-50 px-3 py-2 rounded border border-red-100"
        >
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-1">
        <button
          type="submit"
          disabled={loading || siteCountExceeded || siteCount === 0}
          className={[
            "px-4 py-2 text-sm font-medium font-['DM_Sans'] rounded transition-colors",
            'bg-[#06211A] text-[#DBFF66] hover:bg-[#0d3627]',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DBFF66] focus-visible:ring-offset-1',
          ].join(' ')}
        >
          {loading
            ? isEdit
              ? 'Saving...'
              : 'Creating...'
            : isEdit
            ? 'Save Changes'
            : 'Create Group'}
        </button>
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="px-4 py-2 text-sm font-['DM_Sans'] text-[#06211A]/60 hover:text-[#06211A] transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
