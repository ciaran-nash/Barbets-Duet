-- ============================================================
-- Notifications Schema — Wave 6, Task D3
-- ============================================================
-- Per-user notification queue for community events.
-- Written by Supabase triggers + Liveblocks webhook handler.
-- ============================================================

CREATE TYPE notification_type AS ENUM (
  'new_forum_post',         -- New post in a site forum thread
  'new_te_submission',      -- New T&E entry awaiting coordinator review
  'peer_review_due',        -- Annual peer review cycle opened
  'te_approved',            -- Coordinator approved member's T&E entry
  'te_rejected',            -- Coordinator rejected member's T&E entry
  'thread_locked',          -- Thread was locked (notifies thread author)
  'mention'                 -- @mention in a post
);

CREATE TABLE IF NOT EXISTS notifications (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type         notification_type NOT NULL,
  title        text NOT NULL,
  body         text,
  link         text,               -- Deep link to the relevant content
  is_read      boolean NOT NULL DEFAULT false,
  created_at   timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE notifications IS 'In-app notification queue. Written by triggers and Liveblocks webhooks.';

CREATE INDEX idx_notifications_user_unread
  ON notifications(user_id, is_read, created_at DESC)
  WHERE NOT is_read;

-- RLS: users can only read/update their own notifications
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "notifications_owner_select"
  ON notifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "notifications_owner_update"
  ON notifications FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- ── Trigger: notify coordinator on new T&E pending review ────

CREATE OR REPLACE FUNCTION notify_coordinator_on_te_submission()
RETURNS TRIGGER AS $$
DECLARE
  site_slug_val text;
  coordinator_id uuid;
BEGIN
  -- Only fires when status changes to 'pending_review'
  IF NEW.status != 'pending_review' THEN
    RETURN NEW;
  END IF;

  -- This trigger is for Supabase-side notifications only.
  -- In practice, T&E submissions go to Sanity. This is a placeholder
  -- for when a Supabase te_submissions table is added in future.
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ── Trigger: notify thread author when their thread is locked ─

CREATE OR REPLACE FUNCTION notify_on_thread_locked()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status != 'locked' AND NEW.status = 'locked' THEN
    INSERT INTO notifications (user_id, type, title, body, link)
    VALUES (
      NEW.author_id,
      'thread_locked',
      'Your thread was locked',
      'A Site Coordinator locked your thread: ' || NEW.title,
      '/community/sites/' || NEW.site_slug || '/forum/' || NEW.id
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_notify_thread_locked
  AFTER UPDATE ON forum_threads
  FOR EACH ROW
  WHEN (OLD.status IS DISTINCT FROM NEW.status)
  EXECUTE FUNCTION notify_on_thread_locked();
