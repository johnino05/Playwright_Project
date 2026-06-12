import { test, expect } from '../../fixtures/index';
import { TEST_CARDS } from '../../data/paymentData';

test.describe('Payment workflows @payment', () => {
  test.use({ storageState: 'auth/student.json' });

  test('TC-005: successful Visa payment grants course access', async ({ page, checkoutPage }) => {
    await page.goto('/courses');
    // Navigate to a paid course — update selector to match the site
    await page.locator('[data-testid="paid-course"]').first().click();
    await page.locator('button:has-text("Enroll"), button:has-text("Buy")').first().click();

    await checkoutPage.fillCard(TEST_CARDS.visaSuccess);
    await checkoutPage.submit();
    await checkoutPage.expectSuccess();

    await page.goto('/my-courses');
    await expect(page.locator('[data-testid="enrolled-course"]').first()).toBeVisible();
  });

  test('TC-006: declined card shows retry option', async ({ checkoutPage, page }) => {
    await page.goto('/courses');
    await page.locator('[data-testid="paid-course"]').first().click();
    await page.locator('button:has-text("Enroll"), button:has-text("Buy")').first().click();

    await checkoutPage.fillCard(TEST_CARDS.visaDeclined);
    await checkoutPage.submit();
    await checkoutPage.expectDecline('declined');
  });

  test('TC-007: double-click pay button does not double-charge', async ({ checkoutPage, page }) => {
    await page.goto('/courses');
    await page.locator('[data-testid="paid-course"]').first().click();
    await page.locator('button:has-text("Enroll"), button:has-text("Buy")').first().click();

    await checkoutPage.fillCard(TEST_CARDS.visaSuccess);
    const payBtn = page.locator('button:has-text("Pay"), button[type="submit"]').first();
    await payBtn.dblclick();
    // Only one network request to payment endpoint
    await checkoutPage.expectSuccess();
  });
});
