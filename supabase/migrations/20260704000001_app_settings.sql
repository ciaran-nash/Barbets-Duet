-- ============================================================
-- app_settings — admin-editable, NON-SECRET runtime configuration.
--
-- Secrets (PAYPAL_SECRET, STRIPE_SECRET_KEY, …) stay in Vercel env vars.
-- This table holds only non-secret config an admin may change without a
-- deploy: PayPal client ID / mode / enabled toggle, etc.
--
-- Access: admins only (read + write). Server code reads via the
-- service-role client (bypasses RLS), same pattern as admin actions.
-- ============================================================

CREATE TABLE IF NOT EXISTS app_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

-- Admins can read settings (e.g. render the admin settings page client-side)
CREATE POLICY "app_settings_admin_select"
  ON app_settings FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can insert/update settings
CREATE POLICY "app_settings_admin_insert"
  ON app_settings FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "app_settings_admin_update"
  ON app_settings FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
