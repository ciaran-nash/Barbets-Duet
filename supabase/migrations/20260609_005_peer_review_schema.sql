-- ============================================================
-- Peer Review Schema — Wave 6, Task E1-E2
-- ============================================================
-- peerReviews: annual coordinator submissions
-- pentangle_groups: circular review chain definitions
-- RLS: coordinators write for their site, all read published
-- ============================================================

-- ── Enum ──────────────────────────────────────────────────────

CREATE TYPE review_status AS ENUM ('pending', 'submitted', 'acknowledged');

-- ── Table: peer_reviews ───────────────────────────────────────

CREATE TABLE IF NOT EXISTS peer_reviews (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_site_slug    text NOT NULL,   -- site doing the review
  reviewee_site_slug    text NOT NULL,   -- site being reviewed
  year                  integer NOT NULL,
  status                review_status NOT NULL DEFAULT 'pending',

  -- Review findings (structured)
  findings              jsonb,           -- { strengths: string[], challenges: string[], recommendations: string[] }
  goals_progress        text,            -- Free text: self-defined goal progress
  goals_explanation     text,            -- e.g. "poor rainfall caused shortfall"

  -- 4 Returns snapshot at time of review
  natural_score         numeric(5,2),
  social_score          numeric(5,2),
  financial_score       numeric(5,2),
  inspiration_score     numeric(5,2),

  -- Baseline (locked after first submission — see E4)
  baseline_year         integer,
  natural_baseline      numeric(5,2),
  social_baseline       numeric(5,2),
  financial_baseline    numeric(5,2),
  inspiration_baseline  numeric(5,2),
  baseline_notes        text,
  baseline_locked       boolean NOT NULL DEFAULT false,

  -- Metadata
  reviewer_id           uuid REFERENCES profiles(id) ON DELETE SET NULL,
  submitted_at          timestamptz,
  acknowledged_at       timestamptz,
  created_at            timestamptz NOT NULL DEFAULT now(),
  updated_at            timestamptz NOT NULL DEFAULT now(),

  UNIQUE (reviewer_site_slug, reviewee_site_slug, year)
);

COMMENT ON TABLE peer_reviews IS 'Annual peer review submissions from one Barbets Duet site reviewing another in the circular chain.';
COMMENT ON COLUMN peer_reviews.baseline_locked IS 'True after first annual review submission; subsequent reviews calculate % change relative to locked baseline.';

CREATE INDEX idx_peer_reviews_reviewee ON peer_reviews(reviewee_site_slug, year);
CREATE INDEX idx_peer_reviews_reviewer ON peer_reviews(reviewer_site_slug, year);

CREATE TRIGGER trg_peer_reviews_updated_at
  BEFORE UPDATE ON peer_reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ── Table: pentangle_groups ───────────────────────────────────

CREATE TABLE IF NOT EXISTS pentangle_groups (
  id           text PRIMARY KEY,              -- 'east_african', 'usa_ne', etc.
  label        text NOT NULL,
  sites        text[] NOT NULL DEFAULT '{}',  -- slugs
  review_chain text[] NOT NULL DEFAULT '{}',  -- ordered slugs: A reviews B, B reviews C, etc.
  status       text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'forming'))
);

COMMENT ON TABLE pentangle_groups IS 'Pentangle geographic clusters and their circular peer-review chains.';

-- Seed pre-defined pentangle groups
INSERT INTO pentangle_groups (id, label, sites, review_chain, status) VALUES
  (
    'east_african',
    'East African Pentangle',
    ARRAY['mlingotini', 'himo', 'seme', 'molo-magode-farm', 'lukenya-zumula-farm'],
    ARRAY['mlingotini', 'himo', 'seme', 'molo-magode-farm', 'lukenya-zumula-farm'],
    'active'
  ),
  (
    'usa_ne',
    'USA North-East Pentangle',
    ARRAY['hannacroix-creek', 'sheffield-vt', 'lehigh-gap'],
    ARRAY['hannacroix-creek', 'sheffield-vt', 'lehigh-gap'],
    'forming'
  ),
  (
    'uk_cornwall',
    'UK Cornwall Pentangle',
    ARRAY['woodland-valley-farm', 'community-garden-cornwall'],
    ARRAY['woodland-valley-farm', 'community-garden-cornwall'],
    'forming'
  ),
  (
    'india',
    'India Pentangle',
    ARRAY['ahmedabad', 'pune'],
    ARRAY['ahmedabad', 'pune'],
    'forming'
  )
ON CONFLICT (id) DO NOTHING;

-- ── RLS ───────────────────────────────────────────────────────

ALTER TABLE peer_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE pentangle_groups ENABLE ROW LEVEL SECURITY;

-- Public read of peer reviews
CREATE POLICY "peer_reviews_public_read"
  ON peer_reviews FOR SELECT USING (true);

-- Coordinators can insert/update reviews for their own site
CREATE POLICY "peer_reviews_coordinator_insert"
  ON peer_reviews FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles p
      JOIN learning_site_memberships m ON m.user_id = p.id
      WHERE p.id = auth.uid()
        AND p.role = 'site_coordinator'
        AND m.site_slug = reviewer_site_slug
    )
  );

CREATE POLICY "peer_reviews_coordinator_update"
  ON peer_reviews FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      JOIN learning_site_memberships m ON m.user_id = p.id
      WHERE p.id = auth.uid()
        AND p.role = 'site_coordinator'
        AND m.site_slug = reviewer_site_slug
    )
  );

-- Public read of pentangle groups
CREATE POLICY "pentangle_groups_public_read"
  ON pentangle_groups FOR SELECT USING (true);
