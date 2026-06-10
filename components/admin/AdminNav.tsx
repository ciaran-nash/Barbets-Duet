'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { MemberRole } from '@/lib/supabase/admin-auth'

interface NavItem {
  label: string
  href: string
  roles: MemberRole[]
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'T&E Queue',
    href: '/admin/submissions',
    roles: ['site_coordinator', 'admin'],
  },
  {
    label: 'Peer Review',
    href: '/admin/peer-review',
    roles: ['site_coordinator', 'admin'],
  },
  {
    label: 'Members',
    href: '/admin/members',
    roles: ['admin'],
  },
  {
    label: 'Pentangles',
    href: '/admin/pentangles',
    roles: ['admin'],
  },
]

interface AdminNavProps {
  role: MemberRole
}

export function AdminNav({ role }: AdminNavProps) {
  const pathname = usePathname()

  const visibleItems = NAV_ITEMS.filter((item) => item.roles.includes(role))

  return (
    <nav aria-label="Admin navigation">
      <ul className="space-y-0.5" role="list">
        {visibleItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={[
                  'flex items-center px-4 py-2.5 text-sm font-medium',
                  "font-['DM_Sans'] transition-colors duration-150",
                  isActive
                    ? "text-[#DBFF66] border-l-2 border-[#DBFF66] pl-[14px] bg-white/5"
                    : "text-white/70 hover:text-white hover:bg-white/5 border-l-2 border-transparent",
                ].join(' ')}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
