import { defineConfig, devices } from '@playwright/test';

// Runs against the live deployment by default; override with PLAYWRIGHT_BASE_URL.
const baseURL =
  process.env.PLAYWRIGHT_BASE_URL || 'https://barbets-duet-git-main-barbets.vercel.app';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  expect: { timeout: 10_000 },
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
