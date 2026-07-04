import { test, expect } from '@playwright/test';

// Every route reachable from the nav megamenu + footer must resolve (< 400).
// Guards against dead-link regressions after the nav/footer build-out.
const navAndFooterRoutes = [
  // Megamenu — About
  '/about', '/about/mission-vision', '/about/philosophy-history', '/about/team', '/about/careers',
  '/legal/privacy', '/legal/terms', '/legal/accessibility',
  // Megamenu — Our Work
  '/learning-sites', '/projects', '/stories', '/research', '/community/trials', '/faq',
  // Megamenu — Community
  '/community', '/community/dashboard', '/community/sign-up',
  '/community/contribute', '/community/governance', '/get-involved',
  // Megamenu — Discover
  '/blog', '/news', '/events', '/support-us',
  // Footer extras
  '/legal/cookies', '/community/sign-in',
];

test.describe('nav + footer targets resolve', () => {
  for (const path of navAndFooterRoutes) {
    test(`GET ${path}`, async ({ request }) => {
      const res = await request.get(path, { maxRedirects: 5 });
      expect(res.status(), `status for ${path}`).toBeLessThan(400);
    });
  }
});

test('sitemap.xml is served', async ({ request }) => {
  const res = await request.get('/sitemap.xml');
  expect(res.status()).toBe(200);
  expect(await res.text()).toContain('<urlset');
});

test('no href="#" dead links on the homepage', async ({ page }) => {
  await page.goto('/');
  const deadLinks = await page.locator('a[href="#"]').count();
  expect(deadLinks).toBe(0);
});
