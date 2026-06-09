// ============================================================
// /community — Browse Page
// Wave 6, Task B3
// ============================================================
// Bento-grid hero + 50/50 sticky-map + scrollable SiteCard layout.
// Reuses SitesBrowse + SitesMap components from /learning-sites.
// ============================================================

import { Metadata } from 'next';
import CommunityBrowse from './CommunityBrowse';
import { learningSites } from '@/lib/data/learning-sites';

export const metadata: Metadata = {
  title: 'Community Network | Barbets Duet',
  description:
    'Explore the Jumuiya network — 13 learning sites across East Africa, the UK, and the USA practising regenerative land stewardship.',
};

export default function CommunityPage() {
  // Sites are currently served from the static data layer.
  // When Supabase rows are live, replace with a server-side fetch
  // to `learning_sites` table (see A2-alt for the live-data wiring).
  return <CommunityBrowse sites={learningSites} />;
}
