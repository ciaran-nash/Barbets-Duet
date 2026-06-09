// ============================================================
// /community/members/[id] — Member Profile Page
// Wave 6, Task C3
// ============================================================
// Shows member bio, affiliated sites, tier badge, barbet circle
// prompt answer, contribution history (filterable T&E feed).
// Data: Supabase (profile + memberships) + Sanity (contributions).
// ============================================================

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import MemberProfileContent from './MemberProfileContent';
import { getContributionsByMember } from '@/lib/sanity/queries';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('display_name, bio')
    .eq('id', id)
    .single();

  if (!profile) return { title: 'Member Not Found' };

  return {
    title: `${profile.display_name ?? 'Member'} | Barbets Duet Community`,
    description: profile.bio ?? `Community member profile — ${profile.display_name ?? id}`,
  };
}

export default async function MemberProfilePage({ params }: PageProps) {
  const { id } = await params;

  // Fetch profile + memberships
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();

  if (!profile) notFound();

  const { data: memberships } = await supabaseAdmin
    .from('learning_site_memberships')
    .select('*')
    .eq('user_id', id);

  // Fetch published T&E contributions from Sanity
  const contributions = await getContributionsByMember(id);

  return (
    <MemberProfileContent
      profile={profile}
      memberships={memberships ?? []}
      contributions={contributions}
    />
  );
}
