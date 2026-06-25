import { requireRole } from '@/lib/supabase/admin-auth'
import { createClient } from '@/lib/supabase-server'
import { PentangleRing } from './PentangleRing'
import { ReviewList } from './ReviewList'

export const dynamic = 'force-dynamic'

interface PentangleGroup {
  id: string
  label: string
  sites: string[]
  review_chain: string[]
  status: 'active' | 'forming'
}

interface PeerReviewRow {
  id: string
  reviewer_site_slug: string
  reviewee_site_slug: string
  year: number
  status: 'pending' | 'submitted' | 'acknowledged'
  submitted_at: string | null
}

async function getPentangleGroups(): Promise<PentangleGroup[]> {
  const supabase = await createClient()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('pentangle_groups')
    .select('id, label, sites, review_chain, status')
    .order('label', { ascending: true })

  if (error) {
    console.error('[peer-review] pentangle_groups error:', error.message)
    return []
  }

  return (data ?? []) as PentangleGroup[]
}

async function getOpenReviews(currentYear: number): Promise<PeerReviewRow[]> {
  const supabase = await createClient()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('peer_reviews')
    .select(
      'id, reviewer_site_slug, reviewee_site_slug, year, status, submitted_at'
    )
    .in('status', ['pending', 'submitted'])
    .eq('year', currentYear)
    .order('reviewer_site_slug', { ascending: true })

  if (error) {
    console.error('[peer-review] peer_reviews error:', error.message)
    return []
  }

  return (data ?? []) as PeerReviewRow[]
}

export default async function PeerReviewPage() {
  await requireRole(['site_coordinator'])

  const currentYear = new Date().getFullYear()
  const [groups, openReviews] = await Promise.all([
    getPentangleGroups(),
    getOpenReviews(currentYear),
  ])

  // Overdue = status 'pending' AND year == currentYear AND today past June 30
  // Annual reviews are expected by end of June.
  const overdueThreshold = new Date(`${currentYear}-06-30`)
  const today = new Date()
  const overdueIds = new Set(
    openReviews
      .filter((r) => r.status === 'pending' && today > overdueThreshold)
      .map((r) => r.id)
  )

  return (
    <div className="p-6 lg:p-8">
      {/* Page header */}
      <div className="mb-6">
        <p className="text-xs font-medium tracking-widest text-[#06211A]/40 uppercase mb-1 font-['DM_Sans']">
          Admin
        </p>
        <h1 className="text-2xl font-semibold text-[#06211A] font-['DM_Sans']">
          Peer Review
        </h1>
        <p className="mt-1 text-sm text-[#06211A]/60 font-['DM_Sans']">
          {currentYear} annual review cycle.
          {overdueIds.size > 0 && (
            <span className="text-red-600 font-medium ml-1">
              {overdueIds.size} review{overdueIds.size > 1 ? 's' : ''} overdue.
            </span>
          )}
        </p>
      </div>

      {/* Pentangle ring diagrams */}
      {groups.length > 0 && (
        <section className="mb-8" aria-label="Pentangle groups">
          <h2 className="text-sm font-semibold text-[#06211A] font-['DM_Sans'] mb-4 uppercase tracking-widest text-[#06211A]/50">
            Groups
          </h2>
          <div className="flex flex-wrap gap-8 items-start">
            {groups.map((group) => (
              <PentangleRing
                key={group.id}
                group={group}
                openReviews={openReviews.filter((r) =>
                  group.sites.includes(r.reviewer_site_slug)
                )}
                overdueIds={overdueIds}
              />
            ))}
          </div>
        </section>
      )}

      {/* Open reviews list */}
      <section aria-label="Open reviews">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-[#06211A] font-['DM_Sans'] uppercase tracking-widest text-[#06211A]/50">
            Open Reviews
            {openReviews.length > 0 && (
              <span className="ml-2 text-xs bg-[#06211A]/8 text-[#06211A]/60 px-1.5 py-0.5 rounded-full font-normal">
                {openReviews.length}
              </span>
            )}
          </h2>
        </div>
        <div className="bg-white border border-[#06211A]/8 rounded-lg overflow-hidden">
          <ReviewList reviews={openReviews} overdueIds={overdueIds} />
        </div>
      </section>
    </div>
  )
}
