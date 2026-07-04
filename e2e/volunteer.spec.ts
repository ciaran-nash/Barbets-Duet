import { test, expect } from '@playwright/test';

// Volunteer application form (multi-step) — validation gate + first-step UX.

test('get-involved renders the volunteer form', async ({ page }) => {
  await page.goto('/get-involved');
  await expect(page.getByText('First name').first()).toBeVisible();
  await expect(page.getByText('Email address').first()).toBeVisible();
});

test('empty step submission surfaces validation errors', async ({ page }) => {
  await page.goto('/get-involved');
  await page.getByRole('button', { name: 'Continue' }).click();
  // Zod validation should block progression and show at least one error message
  await expect(page.getByText(/required|enter|least/i).first()).toBeVisible();
});

test('valid step 1 advances to the next step', async ({ page }) => {
  await page.goto('/get-involved');
  const textInputs = page.locator('form input[type="text"], form input:not([type])');
  await textInputs.nth(0).fill('Test');
  await textInputs.nth(1).fill('Volunteer');
  await page.locator('form input[type="email"]').first().fill('test@example.com');
  // Location field
  const location = page.locator('form input').nth(3);
  await location.fill('Nairobi, Kenya');
  await page.getByRole('button', { name: 'Continue' }).click();
  // Step 2 should reveal the site preference / availability section
  await expect(page.getByText(/Preferred learning site|Availability/i).first()).toBeVisible();
});
