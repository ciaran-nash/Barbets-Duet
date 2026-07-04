import { test, expect } from '@playwright/test';

// Megamenu behaviour: panels open with real links, aria state, mobile menu.
// Footer repeats several link names, so assertions use .first() — the
// dropdown/mobile panels render before the footer in the DOM.

test('desktop megamenu opens panels with real links', async ({ page }) => {
  await page.goto('/');

  const aboutTrigger = page.getByRole('button', { name: 'About', exact: true });
  await expect(aboutTrigger).toBeVisible();
  await expect(aboutTrigger).toHaveAttribute('aria-haspopup', 'true');

  await aboutTrigger.hover();
  await expect(aboutTrigger).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('link', { name: 'Mission & Vision' }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Our Team' }).first()).toBeVisible();

  // Switch panel
  await page.getByRole('button', { name: 'Our Work', exact: true }).hover();
  await expect(page.getByRole('link', { name: 'Research Hub' }).first()).toBeVisible();

  // Community panel
  await page.getByRole('button', { name: 'Community', exact: true }).hover();
  await expect(page.getByRole('link', { name: 'Member Dashboard' }).first()).toBeVisible();

  // Discover panel
  await page.getByRole('button', { name: 'Discover', exact: true }).hover();
  await expect(page.getByRole('link', { name: 'Blog', exact: true }).first()).toBeVisible();
});

test('megamenu link navigates', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'About', exact: true }).hover();
  await page.getByRole('link', { name: 'Our Team' }).first().click();
  await expect(page).toHaveURL(/\/about\/team/);
});

test('mobile menu opens and navigates', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  await page.getByRole('button', { name: 'Toggle navigation menu' }).click();
  await page.getByRole('button', { name: 'About', exact: true }).click();
  const teamLink = page.getByRole('link', { name: 'Our Team' }).first();
  await expect(teamLink).toBeVisible();
  await teamLink.click();
  await expect(page).toHaveURL(/\/about\/team/);
});
