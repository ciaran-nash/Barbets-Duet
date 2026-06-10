import { getSessionUser } from '@/lib/supabase/admin-auth'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

/**
 * Server action: sign out the current Supabase session.
 * Passed to AdminSidebar as a prop — valid Next.js 15 pattern.
 */
async function handleSignOut() {
  'use server'
  const supabase = await createClient()
  if (supabase) {
    await supabase.auth.signOut()
  }
  redirect('/auth/login')
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getSessionUser()

  // Double-guard: middleware handles the primary redirect, but layout
  // re-checks in case of stale session or direct navigation.
  if (!user) {
    redirect('/auth/login')
  }

  // Only site_coordinator can access the admin portal.
  // All other roles (junior_member, barbets_friend, local_community) are redirected.
  // Note: middleware.ts uses a legacy role model ('member'|'coordinator'|'admin') as
  // the UX redirect layer. This check is the authoritative server-side guard.
  if (user.role !== 'site_coordinator') {
    redirect('/403')
  }

  return (
    <div className="flex min-h-[100dvh] bg-[#F4F4F5]">
      <AdminSidebar
        role={user.role}
        userEmail={user.email ?? ''}
        onSignOut={handleSignOut}
      />
      {/* Content area — lg:ml-0 because sidebar is relatively-positioned on desktop */}
      <main className="flex-1 min-w-0 lg:pl-0">
        {children}
      </main>
    </div>
  )
}
