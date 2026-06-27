'use client'

import { useState, useMemo } from 'react'
import { updateMemberRole } from './actions'
import { RoleConfirmModal } from './RoleConfirmModal'
import type { MemberRole } from '@/lib/supabase/admin-auth'

interface Member {
  id: string
  email: string | null
  display_name: string | null
  role: MemberRole
  created_at: string
}

interface MemberTableProps {
  members: Member[]
}

const ROLE_OPTIONS: { value: MemberRole; label: string }[] = [
  { value: 'site_coordinator', label: 'Site Coordinator' },
  { value: 'junior_member', label: 'Junior Member' },
  { value: 'barbets_friend', label: 'Barbets Friend' },
  { value: 'local_community', label: 'Local Community' },
]

const ROLE_BADGE: Record<MemberRole, string> = {
  site_coordinator: 'bg-[#DBFF66]/20 text-[#4a5e00]',
  junior_member: 'bg-[#2D6A4F]/15 text-[#2D6A4F]',
  barbets_friend: 'bg-blue-50 text-blue-700',
  local_community: 'bg-[#06211A]/8 text-[#06211A]/60',
  admin: 'bg-red-50 text-red-700',
}

const PAGE_SIZE = 50

export function MemberTable({ members }: MemberTableProps) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; ok: boolean } | null>(null)
  const [confirmPending, setConfirmPending] = useState<{
    memberId: string
    memberName: string
    newRole: MemberRole
  } | null>(null)

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    if (!q) return members
    return members.filter(
      (m) =>
        m.display_name?.toLowerCase().includes(q) ||
        m.email?.toLowerCase().includes(q)
    )
  }, [members, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  function showToast(message: string, ok: boolean) {
    setToast({ message, ok })
    setTimeout(() => setToast(null), 4000)
  }

  function handleSearch(value: string) {
    setSearch(value)
    setPage(0)
  }

  async function applyRoleChange(memberId: string, newRole: MemberRole) {
    setLoadingId(memberId)
    const result = await updateMemberRole(memberId, newRole)
    setLoadingId(null)
    showToast(result.ok ? result.message : result.error, result.ok)
  }

  function handleRoleSelect(member: Member, newRole: MemberRole) {
    if (newRole === member.role) return
    if (newRole === 'site_coordinator') {
      // Require confirmation before elevating to coordinator
      setConfirmPending({
        memberId: member.id,
        memberName: member.display_name ?? member.email ?? member.id,
        newRole,
      })
    } else {
      applyRoleChange(member.id, newRole)
    }
  }

  return (
    <div>
      {/* Search bar */}
      <div className="p-4 border-b border-[#06211A]/8">
        <label htmlFor="member-search" className="sr-only">
          Search members
        </label>
        <input
          id="member-search"
          type="search"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by name or email..."
          className={[
            'w-full max-w-sm px-3 py-2 text-sm border border-[#06211A]/20 rounded-md',
            "font-['DM_Sans'] text-[#06211A] placeholder:text-[#06211A]/35",
            'focus:outline-none focus:ring-2 focus:ring-[#06211A]/20 focus:border-[#06211A]/40',
          ].join(' ')}
        />
      </div>

      {/* Results count */}
      <div className="px-4 py-2 text-xs text-[#06211A]/40 font-['DM_Sans'] border-b border-[#06211A]/8">
        {filtered.length} member{filtered.length !== 1 ? 's' : ''}
        {search && ` matching "${search}"`}
      </div>

      {/* Table / empty state */}
      {pageItems.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-sm text-[#06211A]/40 font-['DM_Sans']">
            {search ? 'No members match your search.' : 'No members found.'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm" aria-label="Member list">
            <thead>
              <tr className="border-b border-[#06211A]/8">
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-[#06211A]/50 uppercase tracking-widest font-['DM_Sans']"
                >
                  Member
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-[#06211A]/50 uppercase tracking-widest font-['DM_Sans']"
                >
                  Current Role
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-[#06211A]/50 uppercase tracking-widest font-['DM_Sans']"
                >
                  Change Role
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-[#06211A]/50 uppercase tracking-widest font-['DM_Sans']"
                >
                  Joined
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#06211A]/8">
              {pageItems.map((member) => (
                <tr
                  key={member.id}
                  className={[
                    'transition-colors hover:bg-[#06211A]/[0.02]',
                    loadingId === member.id ? 'opacity-50' : '',
                  ].join(' ')}
                >
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-[#06211A] font-['DM_Sans']">
                        {member.display_name ?? (
                          <span className="text-[#06211A]/40 italic">No name</span>
                        )}
                      </p>
                      <p className="text-xs text-[#06211A]/50 font-['DM_Sans'] mt-0.5">
                        {member.email ?? '—'}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium font-['DM_Sans'] ${ROLE_BADGE[member.role]}`}
                    >
                      {member.role.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={member.role}
                      onChange={(e) =>
                        handleRoleSelect(member, e.target.value as MemberRole)
                      }
                      disabled={loadingId === member.id}
                      aria-label={`Change role for ${member.display_name ?? member.email ?? 'member'}`}
                      className={[
                        'text-xs border border-[#06211A]/20 rounded px-2 py-1',
                        "font-['DM_Sans'] text-[#06211A] bg-white",
                        'focus:outline-none focus:ring-2 focus:ring-[#06211A]/20',
                        'disabled:opacity-50 disabled:cursor-not-allowed',
                      ].join(' ')}
                    >
                      {ROLE_OPTIONS.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#06211A]/50 font-['DM_Sans']">
                    {new Date(member.created_at).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          className="flex items-center justify-between px-4 py-3 border-t border-[#06211A]/8"
          aria-label="Pagination"
        >
          <p className="text-xs text-[#06211A]/50 font-['DM_Sans']">
            Page {page + 1} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className={[
                'text-xs px-3 py-1.5 rounded border border-[#06211A]/20 font-[\'DM_Sans\']',
                'text-[#06211A]/70 hover:text-[#06211A] hover:bg-[#06211A]/5 transition-colors',
                'disabled:opacity-40 disabled:cursor-not-allowed',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06211A]/30',
              ].join(' ')}
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className={[
                'text-xs px-3 py-1.5 rounded border border-[#06211A]/20 font-[\'DM_Sans\']',
                'text-[#06211A]/70 hover:text-[#06211A] hover:bg-[#06211A]/5 transition-colors',
                'disabled:opacity-40 disabled:cursor-not-allowed',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06211A]/30',
              ].join(' ')}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Toast notification */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={[
            'fixed bottom-6 right-6 z-50 flex items-center gap-2',
            'px-4 py-3 rounded-lg shadow-lg text-sm font-medium font-[\'DM_Sans\']',
            toast.ok ? 'bg-[#06211A] text-[#DBFF66]' : 'bg-red-900 text-red-100',
          ].join(' ')}
        >
          {toast.message}
        </div>
      )}

      {/* Confirmation modal for site_coordinator elevation */}
      {confirmPending && (
        <RoleConfirmModal
          memberName={confirmPending.memberName}
          newRole={confirmPending.newRole}
          onConfirm={() => {
            applyRoleChange(confirmPending.memberId, confirmPending.newRole)
            setConfirmPending(null)
          }}
          onCancel={() => setConfirmPending(null)}
        />
      )}
    </div>
  )
}
