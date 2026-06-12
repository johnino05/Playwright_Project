import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { VALID_USERS } from '../data/credentials';

type TestFixtures = {
  loginPage: LoginPage;
  checkoutPage: CheckoutPage;
  authenticatedPage: Page;
};

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  // Pre-authenticated page — skips login for tests that don't test auth
  authenticatedPage: async ({ page }, use) => {
    const login = new LoginPage(page);
    await login.login(VALID_USERS.student.email, VALID_USERS.student.password);
    await login.expectRedirectToDashboard();
    await use(page);
  },
});

export { expect } from '@playwright/test';
