-- ============================================================
-- Security hardening — RLS / privilege-escalation fix (2026-06-25)
-- ============================================================
-- Closes a privilege-escalation hole: the `profiles_self_update` RLS
-- policy lets an authenticated user update their own row, INCLUDING
-- the `role` column. Because the admin RBAC reads profiles.role, any
-- member could self-promote to 'admin' via a direct client write:
--   supabase.from('profiles').update({ role: 'admin' }).eq('id', myId)
--
-- Fix: a BEFORE UPDATE trigger that blocks role changes unless the
-- caller is already an admin. The legitimate admin path
-- (app/admin/members/actions.ts -> updateMemberRole) uses the
-- service-role key, which has a NULL auth.uid(), so it is allowed
-- through (application code enforces requireRole() before writing).
--
-- Also locks peer-review baselines once set (E4 integrity rule).
-- ============================================================

-- ── Block role self-escalation on profiles ────────────────────
CREATE OR REPLACE FUNCTION prevent_profile_role_escalation()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role IS DISTINCT FROM OLD.role THEN
    -- Service-role / trusted server context has no auth.uid(); allow.
    -- (updateMemberRole already enforces requireRole before writing.)
    IF auth.uid() IS NOT NULL THEN
      IF NOT EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
      ) THEN
        RAISE EXCEPTION
          'Insufficient privilege: members may not change roles'
          USING ERRCODE = 'insufficient_privilege';
      END IF;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS trg_prevent_profile_role_escalation ON profiles;
CREATE TRIGGER trg_prevent_profile_role_escalation
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION prevent_profile_role_escalation();

-- ── Lock peer-review baseline once set (E4 integrity) ─────────
CREATE OR REPLACE FUNCTION enforce_peer_review_baseline_lock()
RETURNS TRIGGER AS $$
BEGIN
  -- Only constrain authenticated (coordinator) writes; service-role
  -- (auth.uid() IS NULL) may correct a baseline if ever required.
  IF OLD.baseline_locked AND auth.uid() IS NOT NULL THEN
    IF NEW.baseline_year        IS DISTINCT FROM OLD.baseline_year
    OR NEW.natural_baseline     IS DISTINCT FROM OLD.natural_baseline
    OR NEW.social_baseline      IS DISTINCT FROM OLD.social_baseline
    OR NEW.financial_baseline   IS DISTINCT FROM OLD.financial_baseline
    OR NEW.inspiration_baseline IS DISTINCT FROM OLD.inspiration_baseline
    OR NEW.baseline_locked = false THEN
      RAISE EXCEPTION
        'Peer review baseline is locked and cannot be modified'
        USING ERRCODE = 'check_violation';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS trg_enforce_peer_review_baseline_lock ON peer_reviews;
CREATE TRIGGER trg_enforce_peer_review_baseline_lock
  BEFORE UPDATE ON peer_reviews
  FOR EACH ROW EXECUTE FUNCTION enforce_peer_review_baseline_lock();
