import { requireRole } from '@/lib/supabase/admin-auth'
import { createClient } from '@/lib/supabase/server'
import { MemberTable } from './MemberTable'
import type { MemberRole } from '@/lib/supabase/admin-auth'

export const dynamic = 'force-dynamic'

interface ProfileRow {
  id: string
  email: string | null
  display_name: string | null
  role: MemberRole
  created_at: string
}

async function getMembers(): Promise<ProfileRow[]> {
  const supabase = await createClient()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, display_name, role, created_at')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[members/page] profiles query error:', error.message)
    return []
  }

  return (data ?? []) as ProfileRow[]
}

export default async function MembersPage() {
  await requireRole(['site_coordinator'])

  const members = await getMembers()

  return (
    <div className="p-6 lg:p-8">
      {/* Page header */}
      <div className="mb-6">
        <p className="text-xs font-medium tracking-widest text-[#06211A]/40 uppercase mb-1 font-['DM_Sans']">
          Admin
        </p>
        <h1 className="text-2xl font-semibold text-[#06211A] font-['DM_Sans']">
          Members
        </h1>
        <p className="mt-1 text-sm text-[#06211A]/60 font-['DM_Sans']">
          View and manage member roles across the Barbets Duet community.
        </p>
      </div>

      <div className="bg-white border border-[#06211A]/8 rounded-lg overflow-hidden">
        <MemberTable members={members} />
      </div>
    </div>
  )
}
