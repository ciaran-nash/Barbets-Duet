-- ============================================================
-- Firebase → Supabase migration (2026-06-25)
-- ============================================================
-- Replaces the three Firebase features with Supabase equivalents:
--   1. volunteer_applications  (was Firestore 'volunteer_applications')
--   2. saved_events            (was Firestore users/{uid}/saved_events)
--   3. site_gallery + storage  (was Firestore sites/{id}/gallery + Storage)
-- Firebase Auth was already unused (auth is Supabase).
-- ============================================================

-- ── 1. Volunteer applications (public form) ───────────────────
CREATE TABLE IF NOT EXISTS volunteer_applications (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name          text NOT NULL,
  last_name           text NOT NULL,
  email               text NOT NULL,
  location            text NOT NULL,
  preferred_site_slug text NOT NULL,
  availability_start  text NOT NULL,
  duration_weeks      integer,
  skills              text NOT NULL,
  motivation          text NOT NULL,
  linkedin_url        text,
  portfolio_url       text,
  status              text NOT NULL DEFAULT 'pending'
                        CHECK (status IN ('pending','reviewing','accepted','rejected')),
  submitted_at        timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE volunteer_applications ENABLE ROW LEVEL SECURITY;

-- Public form: anyone may submit. Spam is mitigated at the edge by Arcjet.
CREATE POLICY "volunteer_apps_public_insert"
  ON volunteer_applications FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only coordinators / admins can read submissions.
CREATE POLICY "volunteer_apps_staff_read"
  ON volunteer_applications FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('site_coordinator','admin')
    )
  );

-- ── 2. Saved events / bookmarks ───────────────────────────────
CREATE TABLE IF NOT EXISTS saved_events (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  event_id    text NOT NULL,
  title       text,
  event_date  text,
  saved_at    timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, event_id)
);

ALTER TABLE saved_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "saved_events_owner_all"
  ON saved_events FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- ── 3. Site gallery (metadata) ────────────────────────────────
CREATE TABLE IF NOT EXISTS site_gallery (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_slug    text NOT NULL,
  storage_path text NOT NULL,
  url          text NOT NULL,
  added_by     uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_site_gallery_site
  ON site_gallery (site_slug, created_at DESC);

ALTER TABLE site_gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "site_gallery_public_read"
  ON site_gallery FOR SELECT USING (true);

CREATE POLICY "site_gallery_auth_insert"
  ON site_gallery FOR INSERT
  TO authenticated
  WITH CHECK (added_by = auth.uid());

CREATE POLICY "site_gallery_owner_delete"
  ON site_gallery FOR DELETE
  TO authenticated
  USING (added_by = auth.uid());

-- ── 4. Storage bucket for gallery images ──────────────────────
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-gallery', 'site-gallery', true)
ON CONFLICT (id) DO NOTHING;

-- Public read; authenticated upload; uploader may delete their own objects.
CREATE POLICY "site_gallery_storage_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'site-gallery');

CREATE POLICY "site_gallery_storage_insert"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'site-gallery');

CREATE POLICY "site_gallery_storage_delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'site-gallery' AND owner = auth.uid());
