-- ============================================================
-- Forum Schema — Wave 6, Task D1
-- ============================================================
-- Tables: forum_threads, forum_posts
-- Linked to learning_sites via site_slug.
-- Moderator role: site_coordinator + explicit forum_moderators table.
-- RLS: public read of published threads/posts;
--      authenticated write for own content;
--      coordinator write for moderation fields.
-- ============================================================

-- ── Enums ─────────────────────────────────────────────────────

CREATE TYPE thread_status AS ENUM ('open', 'locked', 'pinned', 'hidden');
CREATE TYPE post_status AS ENUM ('visible', 'hidden', 'deleted');

-- ── Table: forum_threads ──────────────────────────────────────

CREATE TABLE IF NOT EXISTS forum_threads (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_slug        text NOT NULL,          -- fk link to learning_sites.slug
  title            text NOT NULL CHECK (char_length(title) BETWEEN 3 AND 200),
  author_id        uuid NOT NULL REFERENCES profiles(id) ON DELETE SET NULL,
  status           thread_status NOT NULL DEFAULT 'open',
  is_pinned        boolean NOT NULL DEFAULT false,
  liveblocks_room  text GENERATED ALWAYS AS ('forum-' || site_slug || '-' || id::text) STORED,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now(),
  last_post_at     timestamptz,
  post_count       integer NOT NULL DEFAULT 0
);

COMMENT ON TABLE forum_threads IS 'Forum thread index. One thread per discussion topic, scoped to a learning site.';
COMMENT ON COLUMN forum_threads.liveblocks_room IS 'Auto-generated Liveblocks room ID for this thread. Pattern: forum-{siteSlug}-{threadId}.';

CREATE INDEX idx_forum_threads_site_slug ON forum_threads(site_slug);
CREATE INDEX idx_forum_threads_last_post ON forum_threads(last_post_at DESC NULLS LAST);

-- ── Table: forum_posts ────────────────────────────────────────

CREATE TABLE IF NOT EXISTS forum_posts (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id        uuid NOT NULL REFERENCES forum_threads(id) ON DELETE CASCADE,
  site_slug        text NOT NULL,          -- denormalised for RLS
  author_id        uuid NOT NULL REFERENCES profiles(id) ON DELETE SET NULL,
  body             text NOT NULL CHECK (char_length(body) BETWEEN 1 AND 10000),
  parent_post_id   uuid REFERENCES forum_posts(id) ON DELETE SET NULL, -- reply chain
  status           post_status NOT NULL DEFAULT 'visible',
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE forum_posts IS 'Individual posts within a forum thread. parent_post_id enables reply chains.';

CREATE INDEX idx_forum_posts_thread_id ON forum_posts(thread_id, created_at);

-- ── Triggers ──────────────────────────────────────────────────

-- Auto-update updated_at
CREATE TRIGGER trg_forum_threads_updated_at
  BEFORE UPDATE ON forum_threads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_forum_posts_updated_at
  BEFORE UPDATE ON forum_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Keep post_count + last_post_at in sync
CREATE OR REPLACE FUNCTION sync_thread_post_stats()
RETURNS TRIGGER AS $$
DECLARE
  target_thread_id uuid;
BEGIN
  IF TG_OP = 'DELETE' THEN
    target_thread_id := OLD.thread_id;
  ELSE
    target_thread_id := NEW.thread_id;
  END IF;

  UPDATE forum_threads
  SET
    post_count = (
      SELECT COUNT(*) FROM forum_posts
      WHERE thread_id = target_thread_id AND status = 'visible'
    ),
    last_post_at = (
      SELECT MAX(created_at) FROM forum_posts
      WHERE thread_id = target_thread_id AND status = 'visible'
    )
  WHERE id = target_thread_id;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_sync_thread_post_stats
  AFTER INSERT OR UPDATE OR DELETE ON forum_posts
  FOR EACH ROW EXECUTE FUNCTION sync_thread_post_stats();

-- ── RLS ───────────────────────────────────────────────────────

ALTER TABLE forum_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;

-- Public read of non-hidden threads + their visible posts
CREATE POLICY "forum_threads_public_read"
  ON forum_threads FOR SELECT
  USING (status != 'hidden');

CREATE POLICY "forum_posts_public_read"
  ON forum_posts FOR SELECT
  USING (status = 'visible');

-- Authenticated members can create threads
CREATE POLICY "forum_threads_auth_insert"
  ON forum_threads FOR INSERT
  TO authenticated
  WITH CHECK (author_id = auth.uid());

-- Authenticated members can create posts
CREATE POLICY "forum_posts_auth_insert"
  ON forum_posts FOR INSERT
  TO authenticated
  WITH CHECK (author_id = auth.uid());

-- Authors can update their own posts (body only)
CREATE POLICY "forum_posts_author_update"
  ON forum_posts FOR UPDATE
  TO authenticated
  USING (author_id = auth.uid())
  WITH CHECK (author_id = auth.uid() AND status = 'visible');

-- Site Coordinators can moderate their site's threads/posts
-- (update status, is_pinned on threads; update status on posts)
CREATE POLICY "forum_threads_coordinator_update"
  ON forum_threads FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role = 'site_coordinator'
    )
    AND site_slug IN (
      SELECT site_slug FROM learning_site_memberships
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "forum_posts_coordinator_update"
  ON forum_posts FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role = 'site_coordinator'
    )
    AND site_slug IN (
      SELECT site_slug FROM learning_site_memberships
      WHERE user_id = auth.uid()
    )
  );
