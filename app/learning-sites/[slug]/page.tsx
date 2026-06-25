import React from 'react';
import { notFound } from 'next/navigation';
import { learningSites, getLearningSite } from '@/lib/data/learning-sites';
import { getLearningSiteFromSanity, getAllLearningSitesFromSanity } from '@/lib/sanity/queries';
import type { LearningSite } from '@/types/learning-site';
import LearningSiteContent from './LearningSiteContent';

// Sanity may return a site with null/missing array fields (partial CMS content).
// The presentation components map over these, so fill safe defaults before render.
function withArrayDefaults(s: LearningSite): LearningSite {
  return {
    ...s,
    leadPartners: s.leadPartners ?? [],
    gallery: s.gallery ?? [],
    initiatives: s.initiatives ?? [],
    impactData: {
      ecological: s.impactData?.ecological ?? [],
      community: s.impactData?.community ?? [],
    },
    marketStrategies: s.marketStrategies
      ? { ...s.marketStrategies, strategies: s.marketStrategies.strategies ?? [] }
      : { title: '', description: '', strategies: [] },
  };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Prefer Sanity for static params (covers CMS-added sites);
  // fall back to static data if Sanity not yet configured
  const sanitySites = await getAllLearningSitesFromSanity();
  const sites = sanitySites.length > 0 ? sanitySites : learningSites;
  return sites.map((site) => ({ slug: site.slug }));
}

export default async function LearningSitePage({ params }: PageProps) {
  const { slug } = await params;

  // Try Sanity first, fall back to static data
  const site = (await getLearningSiteFromSanity(slug)) ?? getLearningSite(slug);

  if (!site) {
    notFound();
  }

  return <LearningSiteContent site={withArrayDefaults(site)} />;
}
