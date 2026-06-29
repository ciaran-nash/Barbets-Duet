'use client';

// ============================================================
// ThreadClient — Wave 6, Task D2
// ============================================================
// Thread view with:
//   - Post chain (flat + reply nesting up to 2 levels)
//   - Post composer (text area, reply mode)
//   - Liveblocks: presence indicators, typing indicator,
//     live new-post notifications via storage
//   - Coordinator: lock/pin/hide controls
// ============================================================

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  ChevronLeft, Reply, Lock, Pin, EyeOff, Loader2,
  CornerDownRight, Users, Check
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { ForumRoomProvider, useForumMyPresence, useForumOthers, useForumStatus } from '@/lib/liveblocks';
import type { ForumThread, ForumPost } from '@/types/forum';
import type { Profile } from '@/types/community';

// ── Helpers ───────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function AvatarBubble({ name, avatarUrl }: { name: string; avatarUrl?: string | null }) {
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        className="w-8 h-8 rounded-full object-cover shrink-0"
      />
    );
  }
  const initial = (name ?? '?')[0]?.toUpperCase() ?? '?';
  return (
    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent text-xs font-serif font-bold shrink-0">
      {initial}
    </div>
  );
}

// ── Presence bar ──────────────────────────────────────────────

function ThreadPresence() {
  const others = useForumOthers();
  const status = useForumStatus();

  if (status !== 'connected') return null;

  // Who's typing?
  const typingUsers = others.filter((o) => o.presence?.typing);

  return (
    <div className="flex items-center gap-3 text-xs font-sans text-foreground/50 mb-4">
      {others.length > 0 && (
        <span className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5" />
          {others.length + 1} here
        </span>
      )}
      {typingUsers.length > 0 && (
        <span className="text-accent animate-pulse">
          {typingUsers[0].info?.name ?? 'Someone'} is typing...
        </span>
      )}
    </div>
  );
}

// ── Post card ─────────────────────────────────────────────────

function PostCard({
  post,
  isCoordinator,
  onReply,
  onModerate,
  depth = 0,
}: {
  post: ForumPost;
  isCoordinator: boolean;
  onReply: (postId: string, authorName: string) => void;
  onModerate: (postId: string, action: 'hide' | 'delete') => void;
  depth?: number;
}) {
  const authorName = post.author?.display_name ?? 'Member';

  return (
    <div
      id={`post-${post.id}`}
      className={[
        'group',
        depth > 0 ? 'ml-8 pl-4 border-l-2 border-foreground/10' : '',
      ].join(' ')}
    >
      <div className="flex gap-3 py-4">
        <AvatarBubble name={authorName} avatarUrl={post.author?.avatar_url} />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-sans font-semibold text-sm">{authorName}</span>
            <span className="text-xs text-foreground/30 font-sans">{formatDate(post.created_at)}</span>
            {post.author?.role === 'site_coordinator' && (
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-accent/10 text-accent">
                Coordinator
              </span>
            )}
          </div>

          <p className="text-sm font-sans leading-relaxed text-foreground/80 whitespace-pre-wrap break-words">
            {post.body}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onReply(post.id, authorName)}
              className="inline-flex items-center gap-1 text-xs text-foreground/40 hover:text-accent transition-colors focus:outline-none focus:ring-1 focus:ring-accent rounded"
            >
              <Reply className="w-3.5 h-3.5" />
              Reply
            </button>
            {isCoordinator && (
              <>
                <button
                  onClick={() => onModerate(post.id, 'hide')}
                  className="inline-flex items-center gap-1 text-xs text-foreground/30 hover:text-amber-500 transition-colors"
                >
                  <EyeOff className="w-3.5 h-3.5" />
                  Hide
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Nested replies */}
      {post.replies?.map((reply) => (
        <PostCard
          key={reply.id}
          post={reply}
          isCoordinator={isCoordinator}
          onReply={onReply}
          onModerate={onModerate}
          depth={depth + 1}
        />
      ))}
    </div>
  );
}

// ── Compose box ───────────────────────────────────────────────

function ComposeBox({
  replyTo,
  onClearReply,
  onSubmit,
  disabled,
}: {
  replyTo: { id: string; authorName: string } | null;
  onClearReply: () => void;
  onSubmit: (body: string, parentId: string | null) => Promise<void>;
  disabled: boolean;
}) {
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [, updatePresence] = useForumMyPresence();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTyping = () => {
    updatePresence({ typing: true, threadId: null, lastSeen: Date.now() });
  };

  const handleBlur = () => {
    updatePresence({ typing: false, threadId: null, lastSeen: Date.now() });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim() || disabled) return;
    setLoading(true);
    await onSubmit(body.trim(), replyTo?.id ?? null);
    setBody('');
    onClearReply();
    setLoading(false);
  };

  if (disabled) return null;

  return (
    <form onSubmit={handleSubmit} className="mt-8 border-t border-foreground/10 pt-6">
      {replyTo && (
        <div className="flex items-center gap-2 mb-3 text-xs font-sans text-foreground/50">
          <CornerDownRight className="w-3.5 h-3.5 shrink-0" />
          Replying to <span className="font-semibold text-foreground/70">{replyTo.authorName}</span>
          <button
            type="button"
            onClick={onClearReply}
            className="ml-1 text-foreground/30 hover:text-foreground transition-colors"
          >
            ✕
          </button>
        </div>
      )}

      <textarea
        ref={textareaRef}
        value={body}
        onChange={(e) => { setBody(e.target.value); handleTyping(); }}
        onBlur={handleBlur}
        rows={4}
        placeholder="Write your reply..."
        className="w-full px-4 py-3 rounded-2xl border border-foreground/10 bg-foreground/5 font-sans text-sm leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-accent"
        maxLength={10000}
      />

      <div className="flex justify-end mt-3">
        <button
          type="submit"
          disabled={loading || !body.trim()}
          className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-accent text-accent-foreground text-sm font-sans font-semibold hover:bg-accent/80 disabled:opacity-40 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
          Post reply
        </button>
      </div>
    </form>
  );
}

// ── Inner thread (needs RoomProvider) ────────────────────────

interface InnerProps {
  siteSlug: string;
  siteName: string;
  thread: ForumThread;
  posts: ForumPost[];
  currentProfile: Profile | null;
}

function ThreadInner({ siteSlug, siteName, thread, posts: initialPosts, currentProfile }: InnerProps) {
  const [posts, setPosts] = useState<ForumPost[]>(initialPosts);
  const [replyTo, setReplyTo] = useState<{ id: string; authorName: string } | null>(null);
  const isCoordinator = currentProfile?.role === 'site_coordinator';
  const isLocked = thread.status === 'locked';

  // Build nested structure: top-level + replies
  const threadedPosts = posts
    .filter((p) => !p.parent_post_id)
    .map((p) => ({
      ...p,
      replies: posts.filter((r) => r.parent_post_id === p.id),
    }));

  const handleSubmit = async (body: string, parentId: string | null) => {
    if (!currentProfile) return;

    const { data, error } = await supabase
      .from('forum_posts')
      .insert({
        thread_id: thread.id,
        site_slug: siteSlug,
        author_id: currentProfile.id,
        body,
        parent_post_id: parentId,
      })
      .select('*, author:profiles!author_id(display_name, avatar_url, role)')
      .single();

    if (!error && data) {
      setPosts((prev) => [...prev, data as ForumPost]);
    }
  };

  const handleModerate = async (postId: string, action: 'hide' | 'delete') => {
    const newStatus = action === 'hide' ? 'hidden' : 'deleted';
    await supabase
      .from('forum_posts')
      .update({ status: newStatus })
      .eq('id', postId);
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  };

  // Coordinator thread controls
  const handleThreadAction = async (action: 'lock' | 'pin' | 'hide') => {
    const updates: Partial<ForumThread> = {};
    if (action === 'lock') updates.status = 'locked';
    if (action === 'pin') updates.is_pinned = !thread.is_pinned;
    if (action === 'hide') updates.status = 'hidden';

    await supabase.from('forum_threads').update(updates).eq('id', thread.id);
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      {/* Back nav */}
      <Link
        href={`/community/sites/${siteSlug}/forum`}
        className="inline-flex items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground transition-colors font-sans mb-6 focus:outline-none focus:ring-2 focus:ring-accent rounded"
      >
        <ChevronLeft className="w-4 h-4" />
        {siteName} Forum
      </Link>

      {/* Thread header */}
      <div className="mb-6">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            {thread.is_pinned && (
              <span className="inline-flex items-center gap-1 text-xs font-mono text-secondary-foreground bg-secondary/10 px-2 py-0.5 rounded mb-2">
                <Pin className="w-3 h-3" />
                Pinned
              </span>
            )}
            {thread.status === 'locked' && (
              <span className="inline-flex items-center gap-1 text-xs font-mono text-foreground/40 bg-foreground/5 px-2 py-0.5 rounded mb-2 ml-2">
                <Lock className="w-3 h-3" />
                Locked
              </span>
            )}
            <h1 className="font-serif font-bold text-2xl">{thread.title}</h1>
            <p className="text-xs text-foreground/40 font-sans mt-1">
              Started by {thread.author?.display_name ?? 'Member'} &bull; {thread.post_count} posts
            </p>
          </div>

          {/* Coordinator controls */}
          {isCoordinator && (
            <div className="flex gap-2">
              <button
                onClick={() => handleThreadAction('pin')}
                title={thread.is_pinned ? 'Unpin thread' : 'Pin thread'}
                className="p-2 rounded-xl bg-foreground/5 hover:bg-foreground/10 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <Pin className="w-4 h-4 text-foreground/50" />
              </button>
              <button
                onClick={() => handleThreadAction('lock')}
                title="Lock thread"
                className="p-2 rounded-xl bg-foreground/5 hover:bg-foreground/10 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <Lock className="w-4 h-4 text-foreground/50" />
              </button>
              <button
                onClick={() => handleThreadAction('hide')}
                title="Hide thread"
                className="p-2 rounded-xl bg-foreground/5 hover:bg-amber-500/10 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <EyeOff className="w-4 h-4 text-foreground/50" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Liveblocks presence */}
      <ThreadPresence />

      {/* Post chain */}
      <div className="divide-y divide-foreground/5">
        {threadedPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            isCoordinator={isCoordinator}
            onReply={(id, name) => setReplyTo({ id, authorName: name })}
            onModerate={handleModerate}
          />
        ))}
      </div>

      {/* Compose */}
      {!isLocked ? (
        currentProfile ? (
          <ComposeBox
            replyTo={replyTo}
            onClearReply={() => setReplyTo(null)}
            onSubmit={handleSubmit}
            disabled={false}
          />
        ) : (
          <div className="mt-8 border-t border-foreground/10 pt-6 text-center">
            <p className="text-sm text-foreground/50 font-sans">
              <Link href="/community/sign-in" className="text-accent hover:underline">
                Sign in
              </Link>{' '}
              to reply.
            </p>
          </div>
        )
      ) : (
        <div className="mt-8 border-t border-foreground/10 pt-6 text-center">
          <p className="text-sm text-foreground/40 font-sans flex items-center justify-center gap-1.5">
            <Lock className="w-4 h-4" />
            This thread is locked.
          </p>
        </div>
      )}
    </main>
  );
}

// ── Main export — with RoomProvider ──────────────────────────

interface ThreadClientProps {
  siteSlug: string;
  siteName: string;
  thread: ForumThread;
  posts: ForumPost[];
  currentProfile: Profile | null;
}

export default function ThreadClient(props: ThreadClientProps) {
  return (
    <ForumRoomProvider
      id={props.thread.liveblocks_room}
      initialPresence={{ typing: false, threadId: props.thread.id, lastSeen: Date.now() }}
    >
      <ThreadInner {...props} />
    </ForumRoomProvider>
  );
}
