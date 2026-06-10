import { requireRole } from '@/lib/supabase/admin-auth'
import {
  getSubmissionsByStatus,
  countSubmissionsByStatus,
} from '@/lib/sanity/admin-queries'
import { SubmissionTabs } from './SubmissionTabs'

export const dynamic = 'force-dynamic'

export default async function SubmissionsPage() {
  // Role guard — site_coordinator only
  await requireRole(['site_coordinator'])

  // Fetch all tab data in parallel (all server-side, no client round-trips)
  const [pending, published, rejected, counts] = await Promise.all([
    getSubmissionsByStatus('pending_review'),
    getSubmissionsByStatus('published'),
    getSubmissionsByStatus('rejected'),
    countSubmissionsByStatus(),
  ])

  return (
    <div className="p-6 lg:p-8">
      {/* Page header */}
      <div className="mb-6">
        <p className="text-xs font-medium tracking-widest text-[#06211A]/40 uppercase mb-1 font-['DM_Sans']">
          Admin
        </p>
        <h1 className="text-2xl font-semibold text-[#06211A] font-['DM_Sans']">
          T&amp;E Submissions
        </h1>
        <p className="mt-1 text-sm text-[#06211A]/60 font-['DM_Sans']">
          Review Trial &amp; Error entries submitted by site members.
        </p>
      </div>

      {/* Tabs + content */}
      <div className="bg-white border border-[#06211A]/8 rounded-lg overflow-hidden">
        <SubmissionTabs
          counts={counts}
          initial="pending_review"
          pending={pending}
          published={published}
          rejected={rejected}
        />
      </div>
    </div>
  )
}
