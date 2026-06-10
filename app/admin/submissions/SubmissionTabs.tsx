'use client'

import { useState } from 'react'
import type { AdminTrialAndErrorEntry } from '@/lib/sanity/admin-queries'
import { SubmissionRow } from './SubmissionRow'

type TabKey = 'pending_review' | 'published' | 'rejected'

interface SubmissionTabsProps {
  counts: { pending_review: number; published: number; rejected: number }
  initial: TabKey
  pending: AdminTrialAndErrorEntry[]
  published: AdminTrialAndErrorEntry[]
  rejected: AdminTrialAndErrorEntry[]
}

const TAB_LABELS: { key: TabKey; label: string }[] = [
  { key: 'pending_review', label: 'Pending Review' },
  { key: 'published', label: 'Published' },
  { key: 'rejected', label: 'Rejected' },
]

export function SubmissionTabs({
  counts,
  initial,
  pending,
  published,
  rejected,
}: SubmissionTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>(initial)

  const itemsMap: Record<TabKey, AdminTrialAndErrorEntry[]> = {
    pending_review: pending,
    published,
    rejected,
  }

  const activeItems = itemsMap[activeTab]

  return (
    <div>
      {/* Tab bar */}
      <div
        className="flex gap-0 border-b border-[#06211A]/10"
        role="tablist"
        aria-label="Submission status tabs"
      >
        {TAB_LABELS.map(({ key, label }) => {
          const isActive = activeTab === key
          const count = counts[key]
          return (
            <button
              key={key}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${key}`}
              id={`tab-${key}`}
              onClick={() => setActiveTab(key)}
              className={[
                "px-4 py-2.5 text-sm font-['DM_Sans'] font-medium transition-colors relative",
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#06211A]/30',
                isActive
                  ? 'text-[#06211A] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#06211A]'
                  : 'text-[#06211A]/50 hover:text-[#06211A]/80',
              ].join(' ')}
            >
              {label}
              {count > 0 && (
                <span
                  className={[
                    'ml-2 text-xs font-medium px-1.5 py-0.5 rounded-full',
                    key === 'pending_review'
                      ? 'bg-[#DBFF66] text-[#06211A]'
                      : key === 'rejected'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-[#06211A]/8 text-[#06211A]/60',
                  ].join(' ')}
                  aria-label={`${count} items`}
                >
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Tab panel */}
      <div
        id={`tabpanel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
      >
        {activeItems.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-[#06211A]/40 font-['DM_Sans']">
              No submissions in this category.
            </p>
          </div>
        ) : (
          <ul aria-label={`${activeTab.replace('_', ' ')} submissions`}>
            {activeItems.map((entry) => (
              <SubmissionRow key={entry._id} entry={entry} />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
