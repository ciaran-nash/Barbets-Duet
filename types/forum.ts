// ============================================================
// Forum Types — Wave 6, Task D1
// ============================================================
// Mirrors supabase/migrations/20260609_003_forum_schema.sql
// ============================================================

export type ThreadStatus = 'open' | 'locked' | 'pinned' | 'hidden';
export type PostStatus = 'visible' | 'hidden' | 'deleted';

export interface ForumThread {
  id: string;
  site_slug: string;
  title: string;
  author_id: string;
  status: ThreadStatus;
  is_pinned: boolean;
  liveblocks_room: string;
  created_at: string;
  updated_at: string;
  last_post_at: string | null;
  post_count: number;
  // Joined fields (from author profile)
  author?: {
    display_name: string | null;
    avatar_url: string | null;
    role: string;
  };
}

export interface ForumPost {
  id: string;
  thread_id: string;
  site_slug: string;
  author_id: string;
  body: string;
  parent_post_id: string | null;
  status: PostStatus;
  created_at: string;
  updated_at: string;
  // Joined fields
  author?: {
    display_name: string | null;
    avatar_url: string | null;
    role: string;
  };
  replies?: ForumPost[];
}
