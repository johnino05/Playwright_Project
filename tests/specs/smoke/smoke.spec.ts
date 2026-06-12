import { test, expect } from '../../fixtures/index';

test.describe('Smoke @smoke', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Automation Testing Tutorials|QATestAcademy|Playwright & AI Testing/i);
    await expect(page.locator('header').first()).toBeVisible();
    await expect(page.locator('footer').first()).toBeVisible();
  });

  test('login page is accessible and accepts credentials', async ({ loginPage, page }) => {
    await page.goto('/login');
    await expect(page.locator('input[type="email"], input[type="text"]')).toBeVisible();
    await loginPage.fillCredentials('wrong@email.com', 'WrongPass!');
    await expect(page.locator('input[type="submit"]')).toBeVisible();
  });
});
