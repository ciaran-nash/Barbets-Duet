import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// WCAG 2.1 A/AA automated audit on key public pages, in BOTH themes.
// The two-palette system (light: Cultivated Simplicity / dark: Scholarly Cycle)
// is driven by data-theme on <html>, which ThemeProvider reads from the `theme`
// localStorage key. We seed that key before load so each page is scanned in
// light AND dark — the cheapest guard against a light-island-in-dark regression.
//
// GATE: zero `critical` violations (the agreed bar). `serious` issues — chiefly
// brand-palette colour-contrast — are logged for the design team (@digitalorchard)
// to resolve, not auto-failed here (changing the brand colours is a design call).
const pages = ['/', '/learning-sites', '/get-involved', '/support-us', '/about/team', '/blog', '/faq'];
const themes = ['light', 'dark'] as const;

for (const path of pages) {
  for (const theme of themes) {
    test(`a11y: ${path} [${theme}] — no critical WCAG violations`, async ({ page }) => {
      await page.addInitScript((t) => window.localStorage.setItem('theme', t), theme);
      await page.goto(path);
      // Confirm the theme actually applied before scanning.
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      const critical = results.violations.filter((v) => v.impact === 'critical');
      const serious = results.violations.filter((v) => v.impact === 'serious');

      if (serious.length) {
        console.log(
          `\n[a11y] ${path} [${theme}] — serious (design follow-up):\n` +
            serious.map((v) => `  • ${v.id} (${v.nodes.length}): ${v.help}`).join('\n')
        );
      }
      if (critical.length) {
        console.log(
          `\n[a11y] ${path} [${theme}] — CRITICAL:\n` +
            critical.map((v) => `  • ${v.id} (${v.nodes.length}): ${v.help}`).join('\n')
        );
      }

      expect(critical, `critical a11y violations on ${path} [${theme}]`).toEqual([]);
    });
  }
}
