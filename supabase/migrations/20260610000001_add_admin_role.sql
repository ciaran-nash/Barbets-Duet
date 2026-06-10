-- ============================================================
-- Add 'admin' value to member_role enum
-- Required by admin-portal PRD for /superadmin route gating.
--
-- Role access map:
--   /admin/*       → site_coordinator OR admin
--   /superadmin/*  → admin only
--   community      → any role
-- ============================================================

ALTER TYPE member_role ADD VALUE IF NOT EXISTS 'admin';
