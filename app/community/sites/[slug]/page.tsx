// ============================================================
// /community/sites/[slug] — Site Profile Page
// Wave 6, Task B2
// ============================================================
// Full 9-section site profile per Learning_Sites_Page.jpg wireframe.
// Wraps the existing learning-sites components + community-specific
// FourReturnsDisplay section.
// ============================================================

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { learningSites, getLearningSite } from '@/lib/data/learning-sites';
import CommunitySiteContent from './CommunitySiteContent';

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

  // Static data layer — live Supabase wiring added in A2-alt
  const site = getLearningSite(slug);
  if (!site) notFound();

  // Placeholder 4 Returns metrics — populated after E4 implements
  // the baseline submission flow. Until then every site shows "Baseline pending".
  const fourReturns = null;

  return <CommunitySiteContent site={site} fourReturns={fourReturns} />;
}
