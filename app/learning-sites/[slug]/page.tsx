import React from 'react';
import { notFound } from 'next/navigation';
import { learningSites, getLearningSite } from '@/lib/data/learning-sites';
import LearningSiteContent from './LearningSiteContent';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return learningSites.map((site) => ({
    slug: site.slug,
  }));
}

export default async function LearningSitePage({ params }: PageProps) {
  const { slug } = await params;
  const site = getLearningSite(slug);

  if (!site) {
    notFound();
  }

  return <LearningSiteContent site={site} />;
}
