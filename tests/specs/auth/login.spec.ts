import { test, expect } from '../../fixtures/index';
import { VALID_USERS, INVALID_CREDENTIALS } from '../../data/credentials';
import { AccessLimitPage } from '../../pages/AccessLimitPage';

test.describe('Authentication @auth', () => {
	
  //   test('TC-001: valid student login redirects to dashboard', async ({ loginPage }) => {
  //   await loginPage.login(VALID_USERS.student.email, VALID_USERS.student.password);
  //   await loginPage.expectRedirectToDashboard();
  // });

  // test('TC-002: invalid credentials show error without redirect', async ({ loginPage, page }) => {
  //   await loginPage.login('wrong@email.com', 'WrongPass!');
  //   await loginPage.expectError();
  //   await expect(page).toHaveURL(/wp-login.php/);
  // });

    test('TC-002-1: invalid credentials show access limited error', async ({ loginPage, page }) => {
    await loginPage.login('wrong@email.com', 'WrongPass!');
    const accessPage = new AccessLimitPage(page);
    await accessPage.expectAccessLimited();
    await expect(page).toHaveURL(/wp-login.php/);
  });
  


  // for (const cred of INVALID_CREDENTIALS) {
  //   test(`TC-003: rejects ${cred.label}`, async ({ loginPage }) => {
  //     await loginPage.login(cred.email, cred.password);
  //     await loginPage.expectError();
  //   });
  // }

  // test('TC-004: account locks after 5 failed attempts', async ({ loginPage }) => {
  //   for (let i = 0; i < 5; i++) {
  //     await loginPage.login('target@test.com', 'WrongPass!');
  //   }
  //   await loginPage.expectLockout();
  // });

  // test('TC-005: correct credentials do not bypass lockout', async ({ loginPage }) => {
  //   for (let i = 0; i < 5; i++) {
  //     await loginPage.login('target@test.com', 'WrongPass!');
  //   }
  //   await loginPage.login('target@test.com', VALID_USERS.student.password);
  //   await loginPage.expectLockout();
  // });
});
