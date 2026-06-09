-- ============================================================
-- Learning Sites Table — Wave 5, Task B1
-- ============================================================
-- Stores the 13 learning sites from the CSV data, extended
-- with community fields: member_count, forum_link,
-- peer_review_chain_position, and pentangle_group.
-- ============================================================

CREATE TABLE IF NOT EXISTS learning_sites (
  id                         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                       text NOT NULL UNIQUE,
  name                       text NOT NULL,
  location                   text NOT NULL,
  country                    text NOT NULL,
  lat                        numeric(9, 6),
  lng                        numeric(9, 6),
  category                   text NOT NULL,
  lead_partners              text[] DEFAULT '{}',
  ecological_focus           text,
  economic_activities        text,
  restoration_strategies     text,
  key_achievements           text,
  pentangle_group            text CHECK (pentangle_group IN ('east_african', 'usa_ne', 'uk_cornwall', 'india')),
  member_count               integer NOT NULL DEFAULT 0,
  forum_link                 text,                -- URL to forum thread / Wave 6
  peer_review_chain_position integer,             -- 1-indexed position in pentangle peer-review cycle
  created_at                 timestamptz NOT NULL DEFAULT now(),
  updated_at                 timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE learning_sites IS 'The 13 Barbets Duet learning sites. Extends the static TS data in lib/data/learning-sites.ts with community-facing fields.';
COMMENT ON COLUMN learning_sites.pentangle_group IS 'Geographic cluster: east_african | usa_ne | uk_cornwall | india';
COMMENT ON COLUMN learning_sites.member_count IS 'Cached count of learning_site_memberships rows for this site. Updated by trigger.';
COMMENT ON COLUMN learning_sites.forum_link IS 'URL to the site-specific forum thread (Wave 6). NULL until forums are live.';
COMMENT ON COLUMN learning_sites.peer_review_chain_position IS '1-indexed position in the pentangle peer-review chain. NULL for sites not yet assigned.';

-- Auto-update updated_at
CREATE TRIGGER trg_learning_sites_updated_at
  BEFORE UPDATE ON learning_sites
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger: keep member_count in sync when memberships change
CREATE OR REPLACE FUNCTION sync_site_member_count()
RETURNS TRIGGER AS $$
DECLARE
  target_slug text;
BEGIN
  IF TG_OP = 'DELETE' THEN
    target_slug := OLD.site_slug;
  ELSE
    target_slug := NEW.site_slug;
  END IF;

  UPDATE learning_sites
  SET member_count = (
    SELECT COUNT(*)
    FROM learning_site_memberships
    WHERE site_slug = target_slug
  )
  WHERE slug = target_slug;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_sync_site_member_count
  AFTER INSERT OR UPDATE OR DELETE ON learning_site_memberships
  FOR EACH ROW EXECUTE FUNCTION sync_site_member_count();

-- RLS
ALTER TABLE learning_sites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "learning_sites_public_read"
  ON learning_sites FOR SELECT
  USING (true);

-- Only service role / admin can insert/update/delete
-- (Seed script runs as service role)

-- Indexes
CREATE INDEX IF NOT EXISTS idx_learning_sites_pentangle ON learning_sites (pentangle_group) WHERE pentangle_group IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_learning_sites_slug ON learning_sites (slug);
