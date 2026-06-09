import React from 'react';
import { notFound } from 'next/navigation';
import { learningSites, getLearningSite } from '@/lib/data/learning-sites';
import { getLearningSiteFromSanity, getAllLearningSitesFromSanity } from '@/lib/sanity/queries';
import LearningSiteContent from './LearningSiteContent';

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

  return <LearningSiteContent site={site} />;
}
