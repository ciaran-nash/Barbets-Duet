'use client'

import { useState } from 'react'

interface OpenReview {
  id: string
  reviewer_site_slug: string
  reviewee_site_slug: string
  year: number
  status: 'pending' | 'submitted' | 'acknowledged'
  submitted_at: string | null
}

interface ReviewListProps {
  reviews: OpenReview[]
  overdueIds: Set<string>
}

const STATUS_BADGE: Record<string, string> = {
  pending: 'bg-[#DBFF66]/20 text-[#4a5e00]',
  submitted: 'bg-[#2D6A4F]/15 text-[#2D6A4F]',
  acknowledged: 'bg-[#06211A]/8 text-[#06211A]/50',
}

export function ReviewList({ reviews, overdueIds }: ReviewListProps) {
  const [bulkLoading, setBulkLoading] = useState(false)
  const [bulkDone, setBulkDone] = useState(false)

  function handleBulkReminder() {
    const overdueReviews = reviews.filter((r) => overdueIds.has(r.id))
    console.log(
      '[admin/peer-review] Bulk reminder stub — would send reminders to:',
      overdueReviews.map((r) => r.reviewer_site_slug)
    )
    setBulkLoading(true)
    // Stub: simulate async delay then show acknowledgement
    setTimeout(() => {
      setBulkLoading(false)
      setBulkDone(true)
      setTimeout(() => setBulkDone(false), 4000)
    }, 800)
  }

  if (reviews.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm text-[#06211A]/40 font-['DM_Sans']">
          No open reviews for the current year.
        </p>
      </div>
    )
  }

  const overdueCount = reviews.filter((r) => overdueIds.has(r.id)).length

  return (
    <div>
      {/* Overdue summary + bulk action */}
      {overdueCount > 0 && (
        <div className="flex items-center justify-between px-4 py-3 bg-red-50 border-b border-red-100">
          <p className="text-sm text-red-700 font-['DM_Sans']">
            <span className="font-semibold">{overdueCount}</span> overdue review
            {overdueCount > 1 ? 's' : ''}
          </p>
          <div className="flex items-center gap-3">
            {bulkDone && (
              <span className="text-xs text-[#2D6A4F] font-['DM_Sans']">
                Reminders logged.
              </span>
            )}
            <button
              type="button"
              onClick={handleBulkReminder}
              disabled={bulkLoading || bulkDone}
              className={[
                'text-xs font-medium px-3 py-1.5 rounded font-[\'DM_Sans\']',
                'bg-red-600 text-white hover:bg-red-700 transition-colors',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-1',
              ].join(' ')}
            >
              {bulkLoading ? 'Sending...' : 'Send Reminders'}
            </button>
          </div>
        </div>
      )}

      {/* Reviews table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm" aria-label="Open peer reviews">
          <thead>
            <tr className="border-b border-[#06211A]/8">
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-[#06211A]/50 uppercase tracking-widest font-['DM_Sans']"
              >
                Reviewer site
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-[#06211A]/50 uppercase tracking-widest font-['DM_Sans']"
              >
                Reviewing
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-[#06211A]/50 uppercase tracking-widest font-['DM_Sans']"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-[#06211A]/50 uppercase tracking-widest font-['DM_Sans']"
              >
                Submitted
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#06211A]/8">
            {reviews.map((review) => {
              const isOverdue = overdueIds.has(review.id)
              return (
                <tr
                  key={review.id}
                  className={[
                    'transition-colors hover:bg-[#06211A]/[0.02]',
                    isOverdue ? 'bg-red-50/40' : '',
                  ].join(' ')}
                >
                  <td className="px-4 py-3 font-['DM_Sans'] text-[#06211A]">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span>{review.reviewer_site_slug}</span>
                      {isOverdue && (
                        <span className="inline-block text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-medium">
                          overdue
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-['DM_Sans'] text-[#06211A]/70">
                    {review.reviewee_site_slug}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium font-['DM_Sans'] ${STATUS_BADGE[review.status] ?? ''}`}
                    >
                      {review.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#06211A]/50 font-['DM_Sans']">
                    {review.submitted_at
                      ? new Date(review.submitted_at).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })
                      : '—'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
