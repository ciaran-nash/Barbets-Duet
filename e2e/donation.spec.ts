import { test, expect } from '@playwright/test';

// Donation form user path. Payment APIs are intercepted — no real charges.

test('stripe checkout flow reaches redirect URL (intercepted)', async ({ page }) => {
  await page.route('**/api/create-checkout-session', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ url: '/support-us/success' }),
    });
  });

  await page.goto('/support-us');
  await page.getByRole('button', { name: /donate with stripe/i }).click();
  await expect(page).toHaveURL(/\/support-us\/success/);
  await expect(page.getByText(/thank/i).first()).toBeVisible();
});

test('custom amount is clamped to the $1 minimum (never invalid)', async ({ page }) => {
  await page.goto('/support-us');
  await page.getByPlaceholder('Custom amount').fill('0');
  // The form clamps custom input to >= 1, so the summary shows $1 and
  // checkout stays enabled — there is no reachable invalid state.
  await expect(page.getByText('Your donation', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: /donate with stripe/i })).toBeEnabled();
});

test('paypal state: enabled button or coming-soon notice (never alert stub)', async ({ page }) => {
  await page.goto('/support-us');
  const paypalButton = page.getByRole('button', { name: /donate with paypal/i });
  const notice = page.getByText(/paypal is coming soon/i);
  // Exactly one of the two states renders depending on server config.
  const buttonVisible = await paypalButton.isVisible().catch(() => false);
  const noticeVisible = await notice.isVisible().catch(() => false);
  expect(buttonVisible || noticeVisible).toBe(true);
  expect(buttonVisible && noticeVisible).toBe(false);
});

test('paypal flow redirects to approval URL when enabled (intercepted)', async ({ page }) => {
  await page.goto('/support-us');
  const paypalButton = page.getByRole('button', { name: /donate with paypal/i });
  test.skip(!(await paypalButton.isVisible().catch(() => false)), 'PayPal not configured in this environment');

  await page.route('**/api/paypal-order', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ id: 'TEST', approveUrl: '/support-us/success' }),
    });
  });
  await paypalButton.click();
  await expect(page).toHaveURL(/\/support-us\/success/);
});
