import { requireRole } from '@/lib/supabase/admin-auth'
import { createClient } from '@/lib/supabase-server'
import { PentangleList } from './PentangleList'

export const dynamic = 'force-dynamic'

interface PentangleGroup {
  id: string
  label: string
  sites: string[]
  review_chain: string[]
  status: 'active' | 'forming'
}

async function getPentangleGroups(): Promise<PentangleGroup[]> {
  const supabase = await createClient()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('pentangle_groups')
    .select('id, label, sites, review_chain, status')
    .order('label', { ascending: true })

  if (error) {
    console.error('[pentangles/page] query error:', error.message)
    return []
  }

  return (data ?? []) as PentangleGroup[]
}

export default async function PentanglesPage() {
  await requireRole(['site_coordinator'])

  const groups = await getPentangleGroups()

  return (
    <div className="p-6 lg:p-8">
      {/* Page header */}
      <div className="mb-6">
        <p className="text-xs font-medium tracking-widest text-[#06211A]/40 uppercase mb-1 font-['DM_Sans']">
          Admin
        </p>
        <h1 className="text-2xl font-semibold text-[#06211A] font-['DM_Sans']">
          Pentangle Groups
        </h1>
        <p className="mt-1 text-sm text-[#06211A]/60 font-['DM_Sans']">
          Manage geographic pentangle groups and their peer-review chains. Maximum 5 sites per group.
        </p>
      </div>

      <div className="bg-white border border-[#06211A]/8 rounded-lg overflow-hidden">
        <PentangleList groups={groups} />
      </div>
    </div>
  )
}
