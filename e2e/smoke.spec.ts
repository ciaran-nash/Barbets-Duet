import { test, expect } from '@playwright/test';

// Critical-path smoke against the live deployment.
// Public read paths + RBAC gate + Sanity content + a11y skip-link.
// (Auth/donation/T&E-publish flows need test credentials — added separately.)

const publicRoutes = [
  '/',
  '/learning-sites',
  '/learning-sites/london-urban-canopy',
  '/projects',
  '/stories',
  '/blog',
  '/news',
  '/events',
  '/about/team',
  '/get-involved',
  '/support-us',
  '/faq',
];

test.describe('public routes return 200 and render', () => {
  for (const path of publicRoutes) {
    test(`GET ${path}`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res, `no response for ${path}`).not.toBeNull();
      expect(res!.status(), `status for ${path}`).toBeLessThan(400);
      await expect(page.locator('body')).toBeVisible();
    });
  }
});

test('learning-sites renders Sanity-backed content', async ({ page }) => {
  await page.goto('/learning-sites');
  await expect(
    page.getByText(/Woodland Valley|London Urban Canopy|Msichoke|Hannacroix/i).first()
  ).toBeVisible();
});

test('admin route redirects unauthenticated users to login (RBAC)', async ({ page }) => {
  await page.goto('/admin');
  await expect(page).toHaveURL(/\/auth\/login/);
});

test('skip-to-content link is present (a11y)', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('a.skip-to-content')).toHaveCount(1);
});
