import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly usernameInput = this.page.getByRole('textbox', { name: /email|username/i });
  private readonly passwordInput = this.page.getByRole('textbox', { name: /password/i });
  private readonly submitButton = this.page.locator('input[type="submit"]');
  private readonly errorMessage = this.page.locator('[data-testid="auth-error"], .error-message, [class*="error"]').first();
  private readonly lockoutMessage = this.page.locator('[data-testid="lockout-message"], :text("locked")').first();

  async goto() {
    await this.page.goto('/login');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async fillCredentials(email: string, password: string) {
    await this.usernameInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.usernameInput.fill(email);
    await this.passwordInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.submitButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.submitButton.click();
  }

  async login(email: string, password: string) {
    await this.goto();
    await this.fillCredentials(email, password);
    await new Promise(resolve => setTimeout(resolve, 500)); // Small pause before submit
    await this.submit();
  }

  async expectError(message?: string) {
    await expect(this.errorMessage).toBeVisible();
    if (message) await expect(this.errorMessage).toContainText(message);
  }

  async expectLockout() {
    await expect(this.lockoutMessage).toBeVisible();
  }

  async expectRedirectToDashboard() {
    await this.page.waitForURL(/wp-admin|dashboard|home|my-courses/, { timeout: 15_000 });
  }
}
