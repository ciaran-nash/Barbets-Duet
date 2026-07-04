import { test, expect } from '@playwright/test';

// AI search dialog user path — /api/search intercepted (no gateway calls).

test('search dialog opens, searches, and links mentioned sites', async ({ page }) => {
  await page.route('**/api/search', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        result: 'For seaweed work, visit the Msichoke Seaweed Growers Cooperative site in Tanzania.',
      }),
    });
  });

  await page.goto('/');
  await page.getByRole('button', { name: 'Search learning sites' }).click();

  const input = page.getByRole('textbox', { name: 'Search query' });
  await expect(input).toBeFocused();
  await input.fill('seaweed restoration');
  await input.press('Enter');

  await expect(page.getByText(/Msichoke Seaweed Growers/).first()).toBeVisible();
  // Mentioned site gets a direct link chip (scoped to the dialog — footer/nav may also match)
  await expect(
    page.getByRole('dialog', { name: 'Search' }).getByRole('link', { name: /Msichoke/i })
  ).toHaveAttribute('href', /\/learning-sites\//);
});

test('search dialog shows graceful error when the API is unavailable', async ({ page }) => {
  await page.route('**/api/search', async (route) => {
    await route.fulfill({
      status: 503,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Search is temporarily unavailable.' }),
    });
  });

  await page.goto('/');
  await page.getByRole('button', { name: 'Search learning sites' }).click();
  const input = page.getByRole('textbox', { name: 'Search query' });
  await input.fill('anything');
  await input.press('Enter');
  await expect(page.getByText(/temporarily unavailable/i)).toBeVisible();
});

test('cmd+k opens the search dialog and Escape closes it', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('ControlOrMeta+k');
  await expect(page.getByRole('dialog', { name: 'Search' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog', { name: 'Search' })).toBeHidden();
});
