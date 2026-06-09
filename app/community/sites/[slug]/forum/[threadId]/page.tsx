// ============================================================
// /community/sites/[slug]/forum/[threadId] — Thread View
// Wave 6, Task D2
// ============================================================
// Full thread view: post chain + live comments + reply composer.
// Auth-aware: authenticated users can post; coordinators moderate.
// ============================================================

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { getLearningSite } from '@/lib/data/learning-sites';
import { getServerProfile } from '@/lib/supabase-server';
import ThreadClient from './ThreadClient';
import type { ForumThread, ForumPost } from '@/types/forum';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface PageProps {
  params: Promise<{ slug: string; threadId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { threadId } = await params;
  const { data: thread } = await supabase
    .from('forum_threads')
    .select('title')
    .eq('id', threadId)
    .single();

  return {
    title: `${thread?.title ?? 'Thread'} | Barbets Duet Forum`,
  };
}

export default async function ThreadPage({ params }: PageProps) {
  const { slug, threadId } = await params;

  const site = getLearningSite(slug);
  if (!site) notFound();

  // Fetch thread
  const { data: thread } = await supabase
    .from('forum_threads')
    .select('*, author:profiles!author_id(display_name, avatar_url, role)')
    .eq('id', threadId)
    .eq('site_slug', slug)
    .neq('status', 'hidden')
    .single();

  if (!thread) notFound();

  // Fetch posts (visible only)
  const { data: posts } = await supabase
    .from('forum_posts')
    .select('*, author:profiles!author_id(display_name, avatar_url, role)')
    .eq('thread_id', threadId)
    .eq('status', 'visible')
    .order('created_at', { ascending: true });

  const profile = await getServerProfile();

  return (
    <ThreadClient
      siteSlug={slug}
      siteName={site.name}
      thread={thread as ForumThread}
      posts={(posts ?? []) as ForumPost[]}
      currentProfile={profile}
    />
  );
}
