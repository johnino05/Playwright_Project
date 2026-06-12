import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { VALID_USERS } from '../data/credentials';

type TestFixtures = {
  loginPage: LoginPage;
  checkoutPage: CheckoutPage;
  authenticatedPage: Page;
  studentPage: Page;
  instructorPage: Page;
  adminPage: Page;
};

const loginAs = async (page: Page, email: string, password: string) => {
  const login = new LoginPage(page);
  await login.login(email, password);
  await login.expectRedirectToDashboard();
};

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  authenticatedPage: async ({ page }, use) => {
    await loginAs(page, VALID_USERS.student.email, VALID_USERS.student.password);
    await use(page);
  },

  studentPage: async ({ page }, use) => {
    await loginAs(page, VALID_USERS.student.email, VALID_USERS.student.password);
    await use(page);
  },

  instructorPage: async ({ page }, use) => {
    await loginAs(page, VALID_USERS.instructor.email, VALID_USERS.instructor.password);
    await use(page);
  },

  adminPage: async ({ page }, use) => {
    await loginAs(page, VALID_USERS.admin.email, VALID_USERS.admin.password);
    await use(page);
  },
});

export { expect } from '@playwright/test';
