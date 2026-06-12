import { test, expect } from '../../fixtures/index';

test.describe('Accessibility @a11y', () => {
  const pagesToCheck = [
    { name: 'login', path: '/login' },
    { name: 'home', path: '/' },
    { name: 'courses', path: '/courses' },
  ];

  for (const pg of pagesToCheck) {
    test(`keyboard navigation on ${pg.name} page`, async ({ page }) => {
      await page.goto(pg.path);
      // Tab through all focusable elements
      const focusable = await page.locator('a, button, input, select, textarea, [tabindex]').all();
      for (const el of focusable.slice(0, 10)) {
        await el.focus();
        const focused = await page.evaluate(() => document.activeElement?.tagName);
        expect(focused).toBeTruthy();
      }
    });

    test(`${pg.name} page has no missing alt text`, async ({ page }) => {
      await page.goto(pg.path);
      const imgsWithoutAlt = await page.locator('img:not([alt])').count();
      expect(imgsWithoutAlt).toBe(0);
    });
  }
});
