'use client';

// ============================================================
// ForumClient — Wave 6, Task D1
// ============================================================
// Thread list with Liveblocks presence indicators.
// Shows who's online per site (community-{siteSlug} room).
// New thread creation for authenticated members.
// ============================================================

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, MessageSquare, Pin, Lock, Plus, Users, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { ForumRoomProvider, useForumOthers, useForumStatus } from '@/lib/liveblocks';
import type { ForumThread } from '@/types/forum';
import type { Profile } from '@/types/community';

// ── Presence indicator (needs RoomProvider) ───────────────────

function SitePresence() {
  const others = useForumOthers();
  const status = useForumStatus();
  if (status !== 'connected' || others.length === 0) return null;

  return (
    <div className="flex items-center gap-1.5 text-xs text-viridian font-sans">
      <span className="w-2 h-2 rounded-full bg-viridian animate-pulse" />
      {others.length + 1} online
    </div>
  );
}

// ── Thread status icon ────────────────────────────────────────

function StatusIcon({ status }: { status: ForumThread['status'] }) {
  if (status === 'locked') return <Lock className="w-3.5 h-3.5 text-foreground/30" />;
  if (status === 'pinned') return <Pin className="w-3.5 h-3.5 text-neon-lime" />;
  return null;
}

// ── Thread row ────────────────────────────────────────────────

function ThreadRow({ thread, siteSlug }: { thread: ForumThread; siteSlug: string }) {
  const date = thread.last_post_at
    ? new Date(thread.last_post_at).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short',
      })
    : new Date(thread.created_at).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short',
      });

  return (
    <Link
      href={`/community/sites/${siteSlug}/forum/${thread.id}`}
      className="flex items-start gap-3 p-4 rounded-xl border border-foreground/10 hover:border-viridian/30 bg-night-forest/5 transition-all duration-150 group focus:outline-none focus:ring-2 focus:ring-viridian"
    >
      <MessageSquare className="w-5 h-5 text-foreground/30 group-hover:text-viridian transition-colors mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <StatusIcon status={thread.status} />
          <span className="font-sans font-medium text-sm truncate">
            {thread.title}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-foreground/40 font-sans">
          <span>{thread.author?.display_name ?? 'Member'}</span>
          <span>{thread.post_count} post{thread.post_count !== 1 ? 's' : ''}</span>
          <span>{date}</span>
        </div>
      </div>
    </Link>
  );
}

// ── New thread form ───────────────────────────────────────────

function NewThreadForm({
  siteSlug,
  userId,
  onCreated,
}: {
  siteSlug: string;
  userId: string;
  onCreated: (thread: ForumThread) => void;
}) {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim().length < 3) {
      setError('Title must be at least 3 characters.');
      return;
    }
    setLoading(true);
    setError('');

    const { data, error: err } = await supabase
      .from('forum_threads')
      .insert({
        site_slug: siteSlug,
        title: title.trim(),
        author_id: userId,
      })
      .select('*, author:profiles!author_id(display_name, avatar_url, role)')
      .single();

    setLoading(false);
    if (err) {
      setError('Failed to create thread. Please try again.');
    } else {
      setTitle('');
      onCreated(data as ForumThread);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Start a new discussion..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-foreground/10 bg-foreground/5 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-viridian"
          maxLength={200}
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-viridian text-white text-sm font-sans font-semibold hover:bg-viridian/80 disabled:opacity-50 transition-colors focus:outline-none focus:ring-2 focus:ring-viridian"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          Post
        </button>
      </div>
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </form>
  );
}

// ── Main component ────────────────────────────────────────────

interface ForumClientProps {
  siteSlug: string;
  siteName: string;
  threads: ForumThread[];
  currentProfile: Profile | null;
}

export default function ForumClient({
  siteSlug,
  siteName,
  threads: initialThreads,
  currentProfile,
}: ForumClientProps) {
  const [threads, setThreads] = useState<ForumThread[]>(initialThreads);

  const handleNewThread = (thread: ForumThread) => {
    setThreads((prev) => [thread, ...prev]);
  };

  return (
    <ForumRoomProvider
      id={`community-${siteSlug}`}
      initialPresence={{ typing: false, threadId: null, lastSeen: Date.now() }}
    >
      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Back nav */}
        <Link
          href={`/community/sites/${siteSlug}`}
          className="inline-flex items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground transition-colors font-sans mb-6 focus:outline-none focus:ring-2 focus:ring-viridian rounded"
        >
          <ChevronLeft className="w-4 h-4" />
          {siteName}
        </Link>

        {/* Header */}
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="text-xs font-mono text-viridian uppercase tracking-[0.2em] mb-1">
              Site Forum
            </p>
            <h1 className="font-serif font-bold text-3xl">{siteName}</h1>
          </div>
          <SitePresence />
        </div>

        {/* New thread form */}
        {currentProfile ? (
          <NewThreadForm
            siteSlug={siteSlug}
            userId={currentProfile.id}
            onCreated={handleNewThread}
          />
        ) : (
          <div className="mb-6 p-4 rounded-xl bg-foreground/5 border border-foreground/10 text-center">
            <p className="text-sm text-foreground/50 font-sans">
              <Link href="/community/sign-in" className="text-viridian hover:underline">
                Sign in
              </Link>{' '}
              to start a discussion.
            </p>
          </div>
        )}

        {/* Thread list */}
        {threads.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="w-10 h-10 text-foreground/20 mx-auto mb-3" />
            <p className="text-foreground/40 font-sans text-sm">
              No discussions yet. Be the first to start one.
            </p>
          </div>
        ) : (
          <div className="grid gap-3">
            {threads.map((thread) => (
              <ThreadRow key={thread.id} thread={thread} siteSlug={siteSlug} />
            ))}
          </div>
        )}
      </main>
    </ForumRoomProvider>
  );
}
