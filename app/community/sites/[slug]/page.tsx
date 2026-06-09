// ============================================================
// /community/sites/[slug] — Site Profile Page
// Wave 6, Tasks B2 + A2-alt
// ============================================================
// Augments static site data with live Supabase community fields
// (member_count, forum_link, peer_review_chain_position).
// 4 Returns metrics are populated by E4; null until baseline set.
// ============================================================

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { learningSites, getLearningSite } from '@/lib/data/learning-sites';
import CommunitySiteContent from './CommunitySiteContent';
import type { LearningSite } from '@/types/learning-site';

const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return learningSites.map((site) => ({ slug: site.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const site = getLearningSite(slug);
  if (!site) return { title: 'Site Not Found' };

  return {
    title: `${site.name} | Barbets Duet Community`,
    description:
      site.overview ??
      `${site.name} — a Barbets Duet learning site in ${site.location}.`,
  };
}

export default async function CommunitySitePage({ params }: PageProps) {
  const { slug } = await params;

  const staticSite = getLearningSite(slug);
  if (!staticSite) notFound();

  // Augment static data with live Supabase community fields
  const { data: liveRow } = await supabaseServer
    .from('learning_sites')
    .select('member_count, forum_link, peer_review_chain_position')
    .eq('slug', slug)
    .maybeSingle();

  const site: LearningSite = {
    ...staticSite,
    ...(liveRow
      ? {
          memberCount: liveRow.member_count ?? staticSite.memberCount,
          forumLink: liveRow.forum_link ?? staticSite.forumLink,
          peerReviewChainPosition:
            liveRow.peer_review_chain_position ?? staticSite.peerReviewChainPosition,
        }
      : {}),
  };

  // 4 Returns metrics populated after E4 implements baseline flow.
  // Null until Site Coordinator submits their first annual review.
  const fourReturns = null;

  return <CommunitySiteContent site={site} fourReturns={fourReturns} />;
}
