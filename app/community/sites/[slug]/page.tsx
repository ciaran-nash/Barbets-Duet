// ============================================================
// /community/sites/[slug] — Site Profile Page
// Wave 6, Tasks B2 + A2-alt + E4
// ============================================================
// Augments static site data with live Supabase community fields.
// 4 Returns metrics fetched via getFourReturnsForSite (E4).
// ============================================================

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { learningSites, getLearningSite } from '@/lib/data/learning-sites';
import CommunitySiteContent from './CommunitySiteContent';
import { getFourReturnsForSite } from '@/lib/community/four-returns';
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

  // Run Supabase queries in parallel
  const [liveRowResult, fourReturnsResult] = await Promise.all([
    supabaseServer
      .from('learning_sites')
      .select('member_count, forum_link, peer_review_chain_position')
      .eq('slug', slug)
      .maybeSingle(),
    getFourReturnsForSite(slug),
  ]);

  const liveRow = liveRowResult.data;

  const site: LearningSite = {
    ...staticSite,
    ...(liveRow
      ? {
          memberCount: liveRow.member_count ?? staticSite.memberCount,
          forumLink: liveRow.forum_link ?? staticSite.forumLink ?? `/community/sites/${slug}/forum`,
          peerReviewChainPosition:
            liveRow.peer_review_chain_position ?? staticSite.peerReviewChainPosition,
        }
      : {}),
  };

  return (
    <CommunitySiteContent
      site={site}
      fourReturns={fourReturnsResult.metrics}
      baselinePending={fourReturnsResult.baselinePending}
    />
  );
}
