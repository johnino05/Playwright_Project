import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { VALID_USERS } from '../data/credentials';

const authFile = 'auth/student.json';

setup('authenticate as student', async ({ page }) => {
  const login = new LoginPage(page);
  await login.login(VALID_USERS.student.email, VALID_USERS.student.password);
  await page.context().storageState({ path: authFile });
});
