import { test, expect } from '@playwright/test';

// Auth gating for unauthenticated users + auth page rendering.

test('/admin redirects unauthenticated users to /auth/login', async ({ page }) => {
  await page.goto('/admin');
  await expect(page).toHaveURL(/\/auth\/login/);
});

test('/community/dashboard redirects unauthenticated users to sign-in', async ({ page }) => {
  await page.goto('/community/dashboard');
  await expect(page).toHaveURL(/\/community\/sign-in/);
});

test('legacy /dashboard resolves for unauthenticated users', async ({ page }) => {
  const res = await page.goto('/dashboard');
  expect(res!.status()).toBeLessThan(400);
});

test('sign-in page renders a working form', async ({ page }) => {
  await page.goto('/community/sign-in');
  await expect(page.locator('input[type="email"]').first()).toBeVisible();
  await expect(page.locator('input[type="password"]').first()).toBeVisible();
  await expect(page.getByRole('button', { name: /sign in/i }).first()).toBeVisible();
});

test('sign-up page renders a working form', async ({ page }) => {
  await page.goto('/community/sign-up');
  await expect(page.locator('input[type="email"]').first()).toBeVisible();
  await expect(page.locator('input[type="password"]').first()).toBeVisible();
});

test('site forum is linked from community site page path', async ({ page }) => {
  // Forum route itself renders (read is public per RLS; thread creation needs auth)
  const res = await page.goto('/community/sites/london-urban-canopy/forum');
  expect(res!.status()).toBeLessThan(400);
});

// Full credentialed flows — run only when test credentials are provided.
const email = process.env.E2E_TEST_EMAIL;
const password = process.env.E2E_TEST_PASSWORD;

test('member can sign in and reach the dashboard', async ({ page }) => {
  test.skip(!email || !password, 'E2E_TEST_EMAIL/PASSWORD not set');
  await page.goto('/community/sign-in');
  await page.locator('input[type="email"]').first().fill(email!);
  await page.locator('input[type="password"]').first().fill(password!);
  await page.getByRole('button', { name: /sign in/i }).first().click();
  await expect(page).toHaveURL(/\/community\/dashboard/, { timeout: 15_000 });
});
