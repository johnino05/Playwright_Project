import { test, expect } from '../../fixtures/index';

test.describe('Accessibility @a11y', () => {
  const pagesToCheck = [
    { name: 'login', path: '/login' },
    { name: 'home', path: '/' },
    { name: 'courses', path: '/courses' },
  ];

  for (const pg of pagesToCheck) {
    test(`page ${pg.name} has an accessibility snapshot`, async ({ page }) => {
      await page.goto(pg.path);
      const snapshot = await page.accessibility.snapshot();
      expect(snapshot).toBeTruthy();
    });

    test(`${pg.name} page has no images missing alt text`, async ({ page }) => {
      await page.goto(pg.path);
      await expect(page.locator('img:not([alt])')).toHaveCount(0);
    });
  }
});
