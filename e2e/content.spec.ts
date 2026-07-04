import { test, expect } from '@playwright/test';

// Content templates render with real data (Sanity-first, static fallback).

const detailRoutes = [
  '/learning-sites/london-urban-canopy',
  '/blog',
  '/stories',
  '/news',
  '/events',
  '/research',
];

for (const path of detailRoutes) {
  test(`${path} renders content`, async ({ page }) => {
    const res = await page.goto(path);
    expect(res!.status()).toBeLessThan(400);
    await expect(page.locator('h1').first()).toBeVisible();
  });
}

test('a blog detail page renders from the index', async ({ page }) => {
  await page.goto('/blog');
  const firstPost = page.locator('a[href^="/blog/"]').first();
  await expect(firstPost).toBeVisible();
  await firstPost.click();
  await expect(page).toHaveURL(/\/blog\/.+/);
  await expect(page.locator('article, main').first()).toBeVisible();
});

test('research hub shows the three research areas', async ({ page }) => {
  await page.goto('/research');
  await expect(page.getByText('Ecosystem Finance Models')).toBeVisible();
  await expect(page.getByText('Community Behaviour Change')).toBeVisible();
  await expect(page.getByText('Biodiversity Measurement')).toBeVisible();
});

test('learning site detail shows site content', async ({ page }) => {
  await page.goto('/learning-sites/london-urban-canopy');
  await expect(page.getByText(/london/i).first()).toBeVisible();
});
