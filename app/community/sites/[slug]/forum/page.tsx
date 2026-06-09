// ============================================================
// /community/sites/[slug]/forum — Site Forum Page
// Wave 6, Task D1
// ============================================================
// Thread list for a specific learning site.
// Auth-aware: authenticated members can post; coordinators moderate.
// ============================================================

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { getLearningSite } from '@/lib/data/learning-sites';
import { getServerProfile } from '@/lib/supabase-server';
import ForumClient from './ForumClient';
import type { ForumThread } from '@/types/forum';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const site = getLearningSite(slug);
  return {
    title: `${site?.name ?? 'Site'} Forum | Barbets Duet Community`,
  };
}

export default async function SiteForumPage({ params }: PageProps) {
  const { slug } = await params;

  const site = getLearningSite(slug);
  if (!site) notFound();

  // Fetch thread list (non-hidden, ordered by pinned then last post)
  const { data: threads } = await supabase
    .from('forum_threads')
    .select(`
      *,
      author:profiles!author_id(display_name, avatar_url, role)
    `)
    .eq('site_slug', slug)
    .neq('status', 'hidden')
    .order('is_pinned', { ascending: false })
    .order('last_post_at', { ascending: false, nullsFirst: false })
    .limit(50);

  // Get current user profile (null if unauthenticated)
  const profile = await getServerProfile();

  return (
    <ForumClient
      siteSlug={slug}
      siteName={site.name}
      threads={(threads ?? []) as ForumThread[]}
      currentProfile={profile}
    />
  );
}
