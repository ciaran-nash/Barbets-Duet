-- ============================================================
-- Community Network Schema — Wave 5, Task A1
-- Barbets Duet / KARIMO community-network PRD
-- ============================================================
-- Tables: profiles, learning_site_memberships
-- Enums:  member_role
-- RLS:    enabled on all tables
-- ============================================================

-- ── Enum: membership tiers ─────────────────────────────────
CREATE TYPE member_role AS ENUM (
  'site_coordinator',   -- Tier 1: site lead / coordinator
  'junior_member',      -- Tier 2: active participant
  'barbets_friend',     -- Tier 3: supporter / donor-adjacent
  'local_community'     -- Tier 4: community-at-large participant
);

-- ── Table: profiles ────────────────────────────────────────
-- One row per authenticated user. References auth.users(id).
CREATE TABLE IF NOT EXISTS profiles (
  id               uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email            text,
  display_name     text,
  avatar_url       text,
  role             member_role NOT NULL DEFAULT 'local_community',
  bio              text,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE profiles IS 'Extended user profile for every authenticated Supabase Auth user. Role field maps to the 4-tier Barbets Duet membership hierarchy.';

-- ── Table: learning_site_memberships ───────────────────────
-- Many-to-many: a member can affiliate with multiple sites.
CREATE TABLE IF NOT EXISTS learning_site_memberships (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  site_slug        text NOT NULL,   -- matches LearningSite.slug in TS codebase
  site_name        text NOT NULL,   -- denormalised for fast display
  pentangle_group  text,            -- 'east_african' | 'usa_ne' | 'uk_cornwall' | 'india' | null
  is_primary       boolean NOT NULL DEFAULT false,
  joined_at        timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, site_slug)
);

COMMENT ON TABLE learning_site_memberships IS 'Affiliations between members and learning sites. A member may belong to multiple sites; is_primary marks their main affiliation.';

-- ── Auto-update updated_at on profiles ────────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ── Row Level Security ─────────────────────────────────────
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_site_memberships ENABLE ROW LEVEL SECURITY;

-- profiles: users can read any profile, edit only their own
CREATE POLICY "profiles_public_read"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "profiles_self_insert"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_self_update"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- learning_site_memberships: public read, self-manage own rows
CREATE POLICY "memberships_public_read"
  ON learning_site_memberships FOR SELECT
  USING (true);

CREATE POLICY "memberships_self_insert"
  ON learning_site_memberships FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "memberships_self_update"
  ON learning_site_memberships FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "memberships_self_delete"
  ON learning_site_memberships FOR DELETE
  USING (auth.uid() = user_id);

-- ── Auto-create profile on new auth.users row ──────────────
-- Supabase fires this trigger after a user signs up via Auth.
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ── Indexes ────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles (role);
CREATE INDEX IF NOT EXISTS idx_memberships_user_id ON learning_site_memberships (user_id);
CREATE INDEX IF NOT EXISTS idx_memberships_site_slug ON learning_site_memberships (site_slug);
CREATE INDEX IF NOT EXISTS idx_memberships_pentangle ON learning_site_memberships (pentangle_group) WHERE pentangle_group IS NOT NULL;
