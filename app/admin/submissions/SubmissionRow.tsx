'use client'

import { useState } from 'react'
import { CaretDown, CaretRight, Warning } from '@phosphor-icons/react'
import type { AdminTrialAndErrorEntry } from '@/lib/sanity/admin-queries'
import { publishSubmission, rejectSubmission } from './actions'
import { Toast } from './Toast'

interface SubmissionRowProps {
  entry: AdminTrialAndErrorEntry
}

function hasPromptContent(prompt: unknown): boolean {
  if (!prompt || !Array.isArray(prompt) || prompt.length === 0) return false
  // PortableText block — check if any block has non-empty text
  return (prompt as unknown[]).some((block: unknown) => {
    const b = block as { children?: { text?: string }[] }
    return b.children?.some((child) => child.text && child.text.trim().length > 0)
  })
}

const PROMPT_LABELS = [
  'What have you tried and how did it turn out?',
  'What was your biggest mistake?',
  'What did you learn and what made you laugh?',
  'Who would you include in your Barbet circle and why?',
]

// ─── PendingActions ───────────────────────────────────────────────────────────

interface PendingActionsProps {
  docId: string
}

function PendingActions({ docId }: PendingActionsProps) {
  const [showRejectForm, setShowRejectForm] = useState(false)
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState<'publish' | 'reject' | null>(null)
  const [toast, setToast] = useState<{
    message: string
    variant: 'success' | 'error'
  } | null>(null)

  async function handlePublish() {
    setLoading('publish')
    const result = await publishSubmission(docId)
    setLoading(null)
    setToast({
      message: result.ok ? result.message : result.error,
      variant: result.ok ? 'success' : 'error',
    })
  }

  async function handleReject(e: React.FormEvent) {
    e.preventDefault()
    setLoading('reject')
    const result = await rejectSubmission(docId, reason)
    setLoading(null)
    if (result.ok) {
      setShowRejectForm(false)
      setReason('')
    }
    setToast({
      message: result.ok ? result.message : result.error,
      variant: result.ok ? 'success' : 'error',
    })
  }

  return (
    <div className="pt-2 border-t border-[#06211A]/8">
      {!showRejectForm ? (
        <div className="flex items-center gap-3 flex-wrap">
          {/* Publish */}
          <button
            type="button"
            onClick={handlePublish}
            disabled={loading !== null}
            className={[
              "text-xs font-medium px-3 py-1.5 rounded font-['DM_Sans'] transition-colors",
              'bg-[#06211A] text-[#DBFF66] hover:bg-[#0d3627]',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DBFF66] focus-visible:ring-offset-1',
            ].join(' ')}
          >
            {loading === 'publish' ? 'Publishing...' : 'Publish'}
          </button>

          {/* Reject */}
          <button
            type="button"
            onClick={() => setShowRejectForm(true)}
            disabled={loading !== null}
            className={[
              "text-xs font-medium px-3 py-1.5 rounded font-['DM_Sans'] transition-colors",
              'bg-transparent text-red-600 border border-red-300 hover:bg-red-50',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-1',
            ].join(' ')}
          >
            Reject
          </button>

          {/* Open in Studio */}
          <a
            href={`https://barbetsduet.sanity.studio/desk/trialAndError;${docId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#06211A]/50 hover:text-[#06211A] underline underline-offset-2 font-['DM_Sans'] transition-colors"
          >
            Open in Studio
          </a>
        </div>
      ) : (
        // Rejection form
        <form onSubmit={handleReject} className="space-y-2">
          <label
            htmlFor={`reject-reason-${docId}`}
            className="block text-xs font-medium text-[#06211A]/70 font-['DM_Sans']"
          >
            Rejection reason <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <textarea
            id={`reject-reason-${docId}`}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={2}
            required
            placeholder="Explain why this submission is being rejected..."
            className={[
              'w-full text-xs border border-[#06211A]/20 rounded px-2.5 py-2',
              "font-['DM_Sans'] text-[#06211A] placeholder:text-[#06211A]/30",
              'focus:outline-none focus:ring-2 focus:ring-[#06211A]/30 focus:border-[#06211A]/40',
              'resize-none',
            ].join(' ')}
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading !== null || !reason.trim()}
              className={[
                "text-xs font-medium px-3 py-1.5 rounded font-['DM_Sans'] transition-colors",
                'bg-red-600 text-white hover:bg-red-700',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-1',
              ].join(' ')}
            >
              {loading === 'reject' ? 'Rejecting...' : 'Confirm Reject'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowRejectForm(false)
                setReason('')
              }}
              disabled={loading !== null}
              className="text-xs text-[#06211A]/50 hover:text-[#06211A] font-['DM_Sans'] transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {toast && (
        <Toast
          message={toast.message}
          variant={toast.variant}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  )
}

// ─── SubmissionRow ────────────────────────────────────────────────────────────

export function SubmissionRow({ entry }: SubmissionRowProps) {
  const [expanded, setExpanded] = useState(false)

  const promptsComplete = [
    hasPromptContent(entry.prompt1),
    hasPromptContent(entry.prompt2),
    hasPromptContent(entry.prompt3),
    hasPromptContent(entry.prompt4),
  ]
  const missingCount = promptsComplete.filter((c) => !c).length

  const statusBadgeClass =
    entry.status === 'pending_review'
      ? 'bg-[#2D6A4F]/20 text-[#2D6A4F]'
      : entry.status === 'published'
      ? 'bg-[#DBFF66]/20 text-[#4a5e00]'
      : 'bg-red-100 text-red-700'

  const statusLabel =
    entry.status === 'pending_review'
      ? 'Pending Review'
      : entry.status === 'published'
      ? 'Published'
      : 'Rejected'

  return (
    <li className="border-b border-[#06211A]/8 last:border-0">
      {/* Row header — always visible */}
      <button
        type="button"
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#06211A]/3 transition-colors group"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        <span className="text-[#06211A]/30 group-hover:text-[#06211A]/60 transition-colors mt-0.5 shrink-0">
          {expanded ? (
            <CaretDown size={14} aria-hidden="true" />
          ) : (
            <CaretRight size={14} aria-hidden="true" />
          )}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-[#06211A] font-['DM_Sans'] truncate">
              {entry.title}
            </span>
            {missingCount > 0 && (
              <span className="inline-flex items-center gap-1 text-xs text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded font-['DM_Sans'] shrink-0">
                <Warning size={11} weight="bold" aria-hidden="true" />
                {missingCount} prompt{missingCount > 1 ? 's' : ''} missing
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-0.5 flex-wrap">
            <span className="text-xs text-[#06211A]/50 font-['DM_Sans']">{entry.siteSlug}</span>
            <span className="text-xs text-[#06211A]/40 font-['DM_Sans']">by {entry.authorMemberSlug}</span>
            {entry.submittedAt && (
              <span className="text-xs text-[#06211A]/40 font-['DM_Sans']">
                {new Date(entry.submittedAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            )}
          </div>
        </div>

        <span
          className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium font-['DM_Sans'] shrink-0 ${statusBadgeClass}`}
          aria-label={`Status: ${statusLabel}`}
        >
          {statusLabel}
        </span>
      </button>

      {/* Expanded detail panel */}
      {expanded && (
        <div className="px-10 pb-4 bg-[#06211A]/[0.02]">
          {/* Prompt completeness */}
          <div className="mb-3">
            <p className="text-xs font-medium text-[#06211A]/50 uppercase tracking-widest mb-2 font-['DM_Sans']">
              Prompt completeness
            </p>
            <ul className="space-y-1">
              {PROMPT_LABELS.map((label, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-xs font-['DM_Sans']"
                >
                  <span
                    className={
                      promptsComplete[idx]
                        ? 'text-[#2D6A4F] font-medium'
                        : 'text-red-600 font-medium'
                    }
                    aria-hidden="true"
                  >
                    {promptsComplete[idx] ? '✓' : '✗'}
                  </span>
                  <span
                    className={
                      promptsComplete[idx]
                        ? 'text-[#06211A]/70'
                        : 'text-[#06211A]/40 line-through'
                    }
                  >
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Challenge / intervention tags */}
          {((entry.challengeType?.length ?? 0) > 0 ||
            (entry.interventionType?.length ?? 0) > 0) && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {entry.challengeType?.map((t) => (
                <span
                  key={t}
                  className="text-xs bg-[#06211A]/6 text-[#06211A]/60 px-2 py-0.5 rounded font-['DM_Sans']"
                >
                  {t.replace(/_/g, ' ')}
                </span>
              ))}
            </div>
          )}

          {/* Pending actions — publish/reject buttons */}
          {entry.status === 'pending_review' && (
            <PendingActions docId={entry._id} />
          )}
        </div>
      )}
    </li>
  )
}
