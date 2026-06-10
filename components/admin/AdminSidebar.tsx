'use client'

import { useState } from 'react'
import { AdminNav } from './AdminNav'
import { List, X } from '@phosphor-icons/react'

interface AdminSidebarProps {
  role: 'coordinator' | 'admin'
  userEmail: string
  onSignOut: () => Promise<void>
}

export function AdminSidebar({ role, userEmail, onSignOut }: AdminSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Brand header */}
      <div className="px-4 py-6 border-b border-white/10">
        <p className="text-xs font-medium tracking-widest text-white/40 uppercase font-['DM_Sans']">
          Barbets Duet
        </p>
        <p className="text-sm font-semibold text-white mt-0.5 font-['DM_Sans']">
          Admin Portal
        </p>
      </div>

      {/* Role indicator */}
      <div className="px-4 py-3">
        <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-[#DBFF66]/10 text-[#DBFF66] font-medium font-['DM_Sans'] uppercase tracking-wider">
          {role}
        </span>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-2 py-2 overflow-y-auto">
        <AdminNav role={role} />
      </div>

      {/* User + sign out */}
      <div className="px-4 py-4 border-t border-white/10">
        <p className="text-xs text-white/40 font-['DM_Sans'] truncate mb-2" title={userEmail}>
          {userEmail}
        </p>
        <form action={onSignOut}>
          <button
            type="submit"
            className="text-xs text-white/60 hover:text-white font-['DM_Sans'] transition-colors
                       underline underline-offset-2"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile toggle — only shown below lg breakpoint */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#06211A] text-white
                   rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-[#DBFF66]"
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={mobileOpen}
        aria-controls="admin-sidebar"
      >
        <List size={20} weight="regular" aria-hidden="true" />
      </button>

      {/* Mobile backdrop overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar — static on desktop, slide-out drawer on mobile */}
      <aside
        id="admin-sidebar"
        className={[
          'fixed inset-y-0 left-0 z-50 w-60 bg-[#06211A]',
          'transform transition-transform duration-200 ease-in-out',
          'lg:relative lg:translate-x-0 lg:z-auto lg:flex-shrink-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
        aria-label="Admin sidebar navigation"
      >
        {/* Mobile close button */}
        <button
          className="lg:hidden absolute top-4 right-4 text-white/60 hover:text-white
                     focus:outline-none focus:ring-2 focus:ring-[#DBFF66] rounded"
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation menu"
        >
          <X size={18} weight="regular" aria-hidden="true" />
        </button>

        {sidebarContent}
      </aside>
    </>
  )
}
