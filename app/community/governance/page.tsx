// ============================================================
// /community/governance — Governance & Peer Review Page
// Wave 6, Task E1-E2
// ============================================================
// Sections:
//   1. Explainer: Mosaic/Column Rights, Utu Net Benefits, Circular Peer Review
//   2. Interactive peer review chain (RadialOrbitalTimeline)
//   3. Coordinator dashboard: submit annual review
//   4. 4 Returns metrics display (FourReturnsDisplay)
// ============================================================

import { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';
import { getServerProfile } from '@/lib/supabase-server';
import GovernanceClient from './GovernanceClient';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const metadata: Metadata = {
  title: 'Governance | Barbets Duet Community',
  description:
    'The Jumuiya governance model — Mosaic & Column rights, Utu Net Benefits, and the circular peer review chain.',
};

export default async function GovernancePage() {
  const profile = await getServerProfile();

  // Fetch pentangle groups for chain visualization
  const { data: pentangleGroups } = await supabase
    .from('pentangle_groups')
    .select('*')
    .eq('status', 'active');

  // Fetch peer reviews for this year (for coordinator dashboard)
  const currentYear = new Date().getFullYear();
  const { data: reviews } = await supabase
    .from('peer_reviews')
    .select('*')
    .eq('year', currentYear);

  // Get coordinator's site slug if applicable
  let coordinatorSiteSlug: string | null = null;
  if (profile?.role === 'site_coordinator') {
    const { data: membership } = await supabase
      .from('learning_site_memberships')
      .select('site_slug')
      .eq('user_id', profile.id)
      .eq('is_primary', true)
      .maybeSingle();
    coordinatorSiteSlug = membership?.site_slug ?? null;
  }

  return (
    <GovernanceClient
      currentProfile={profile}
      pentangleGroups={pentangleGroups ?? []}
      reviews={reviews ?? []}
      currentYear={currentYear}
      coordinatorSiteSlug={coordinatorSiteSlug}
    />
  );
}
