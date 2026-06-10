'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { deletePentangleGroup } from './actions'
import { PentangleForm } from './PentangleForm'

interface PentangleGroup {
  id: string
  label: string
  sites: string[]
  review_chain: string[]
  status: 'active' | 'forming'
}

interface PentangleListProps {
  groups: PentangleGroup[]
}

const STATUS_BADGE: Record<string, string> = {
  active: 'bg-[#DBFF66]/20 text-[#4a5e00]',
  forming: 'bg-[#06211A]/8 text-[#06211A]/50',
}

export function PentangleList({ groups: initialGroups }: PentangleListProps) {
  const router = useRouter()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; ok: boolean } | null>(null)

  function showToast(message: string, ok: boolean) {
    setToast({ message, ok })
    setTimeout(() => setToast(null), 4000)
  }

  async function handleDelete(group: PentangleGroup) {
    if (!window.confirm(`Delete "${group.label}"? This cannot be undone.`)) return
    setDeletingId(group.id)
    const result = await deletePentangleGroup(group.id)
    setDeletingId(null)
    if (result.ok) {
      showToast(result.message, true)
      router.refresh() // re-fetch groups after delete
    } else {
      showToast(result.error, false)
    }
  }

  function handleEditSuccess(message: string) {
    setEditingId(null)
    showToast(message, true)
    router.refresh()
  }

  function handleCreateSuccess(message: string) {
    setShowCreateForm(false)
    showToast(message, true)
    router.refresh()
  }

  return (
    <div>
      {/* Create group button / inline form */}
      <div className="p-4 border-b border-[#06211A]/8">
        {!showCreateForm ? (
          <button
            type="button"
            onClick={() => setShowCreateForm(true)}
            className={[
              "px-4 py-2 text-sm font-medium font-['DM_Sans'] rounded transition-colors",
              'bg-[#06211A] text-[#DBFF66] hover:bg-[#0d3627]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DBFF66] focus-visible:ring-offset-1',
            ].join(' ')}
          >
            Create group
          </button>
        ) : (
          <PentangleForm
            onClose={() => setShowCreateForm(false)}
            onSuccess={handleCreateSuccess}
          />
        )}
      </div>

      {/* Groups list */}
      {initialGroups.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-sm text-[#06211A]/40 font-['DM_Sans']">
            No pentangle groups yet.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-[#06211A]/8" aria-label="Pentangle groups">
          {initialGroups.map((group) => (
            <li key={group.id} className="p-4">
              {editingId === group.id ? (
                <PentangleForm
                  existing={group}
                  onClose={() => setEditingId(null)}
                  onSuccess={handleEditSuccess}
                />
              ) : (
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      {/* Header row */}
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-sm font-semibold text-[#06211A] font-['DM_Sans']">
                          {group.label}
                        </h3>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium font-['DM_Sans'] ${STATUS_BADGE[group.status] ?? ''}`}
                        >
                          {group.status}
                        </span>
                        <span className="text-xs text-[#06211A]/40 font-['DM_Sans']">
                          {group.sites.length}/5 sites
                        </span>
                      </div>

                      {/* Group ID */}
                      <p className="text-xs text-[#06211A]/40 font-['DM_Sans'] font-mono mb-2">
                        id: {group.id}
                      </p>

                      {/* Site slug tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {group.sites.map((slug) => (
                          <span
                            key={slug}
                            className="text-xs bg-[#06211A]/6 text-[#06211A]/70 px-2 py-0.5 rounded font-['DM_Sans']"
                          >
                            {slug}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Edit + Delete actions */}
                    <div className="flex gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setShowCreateForm(false)
                          setEditingId(group.id)
                        }}
                        className={[
                          "text-xs px-3 py-1.5 rounded border border-[#06211A]/20 font-['DM_Sans']",
                          'text-[#06211A]/70 hover:text-[#06211A] hover:bg-[#06211A]/5 transition-colors',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06211A]/30',
                        ].join(' ')}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(group)}
                        disabled={deletingId === group.id}
                        className={[
                          "text-xs px-3 py-1.5 rounded border border-red-200 font-['DM_Sans']",
                          'text-red-600 hover:bg-red-50 transition-colors',
                          'disabled:opacity-50 disabled:cursor-not-allowed',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400',
                        ].join(' ')}
                      >
                        {deletingId === group.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Toast */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={[
            'fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg shadow-lg',
            "text-sm font-medium font-['DM_Sans']",
            toast.ok ? 'bg-[#06211A] text-[#DBFF66]' : 'bg-red-900 text-red-100',
          ].join(' ')}
        >
          {toast.message}
        </div>
      )}
    </div>
  )
}
