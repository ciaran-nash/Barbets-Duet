import { getSessionUser } from '@/lib/supabase/admin-auth'
import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'

/**
 * Fetches quick-stat counts for the admin dashboard home.
 * Returns zeroes if Supabase is not configured — graceful fallback.
 */
async function getQuickStats() {
  const supabase = await createClient()
  if (!supabase) {
    return { pendingSubmissions: 0, overdueReviews: 0 }
  }

  const [submissionsResult, reviewsResult] = await Promise.all([
    supabase
      .from('contributions')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'draft'),
    supabase
      .from('peer_review_assignments')
      .select('*', { count: 'exact', head: true })
      .neq('status', 'complete')
      .lt('due_date', new Date().toISOString()),
  ])

  return {
    pendingSubmissions: submissionsResult.count ?? 0,
    overdueReviews: reviewsResult.count ?? 0,
  }
}

export default async function AdminHomePage() {
  const user = await getSessionUser()
  if (!user) redirect('/auth/login')

  const { pendingSubmissions, overdueReviews } = await getQuickStats()

  return (
    <div className="p-6 lg:p-8">
      {/* Page header */}
      <div className="mb-8">
        <p className="text-xs font-medium tracking-widest text-[#06211A]/40 uppercase mb-1 font-['DM_Sans']">
          Dashboard
        </p>
        <h1 className="text-2xl font-semibold text-[#06211A] font-['DM_Sans']">
          Welcome, {user.email}
        </h1>
      </div>

      {/* Quick-stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
        <div className="bg-white border border-[#06211A]/8 rounded-lg p-5">
          <p className="text-xs font-medium text-[#06211A]/40 uppercase tracking-widest font-['DM_Sans'] mb-2">
            Pending submissions
          </p>
          <p className="text-3xl font-semibold text-[#06211A] font-['DM_Sans'] tabular-nums">
            {pendingSubmissions}
          </p>
          <a
            href="/admin/submissions"
            className="mt-3 inline-block text-xs text-[#06211A]/60 hover:text-[#06211A]
                       underline underline-offset-2 font-['DM_Sans'] transition-colors"
          >
            View queue
          </a>
        </div>

        <div className="bg-white border border-[#06211A]/8 rounded-lg p-5">
          <p className="text-xs font-medium text-[#06211A]/40 uppercase tracking-widest font-['DM_Sans'] mb-2">
            Overdue reviews
          </p>
          <p
            className={[
              'text-3xl font-semibold font-[\'DM_Sans\'] tabular-nums',
              overdueReviews > 0 ? 'text-red-600' : 'text-[#06211A]',
            ].join(' ')}
          >
            {overdueReviews}
          </p>
          <a
            href="/admin/peer-review"
            className="mt-3 inline-block text-xs text-[#06211A]/60 hover:text-[#06211A]
                       underline underline-offset-2 font-['DM_Sans'] transition-colors"
          >
            View peer review
          </a>
        </div>
      </div>
    </div>
  )
}
