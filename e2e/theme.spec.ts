import { test, expect } from '@playwright/test';

// Theme toggle user path: flips data-theme, persists across navigation.

test('theme toggle flips data-theme and persists across navigation', async ({ page }) => {
  await page.goto('/');
  const html = page.locator('html');
  const initial = await html.getAttribute('data-theme');
  expect(initial).toMatch(/light|dark/);

  await page.getByRole('button', { name: /switch to (dark|light) mode|toggle theme/i }).first().click();
  const flipped = initial === 'dark' ? 'light' : 'dark';
  await expect(html).toHaveAttribute('data-theme', flipped);

  // Persists via localStorage across a full navigation
  await page.goto('/learning-sites');
  await expect(html).toHaveAttribute('data-theme', flipped);
});

test('seeded dark theme applies before content is scanned', async ({ page }) => {
  await page.addInitScript(() => window.localStorage.setItem('theme', 'dark'));
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});
