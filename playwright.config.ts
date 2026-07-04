import { defineConfig, devices } from '@playwright/test';

// Default: self-contained local run (Next dev server on :3100).
// Set PLAYWRIGHT_BASE_URL to test a deployment instead (no local server started).
const externalURL = process.env.PLAYWRIGHT_BASE_URL;
const baseURL = externalURL || 'http://localhost:3100';

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
  webServer: externalURL
    ? undefined
    : {
        command: 'npm run dev -- -p 3100',
        url: 'http://localhost:3100',
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
