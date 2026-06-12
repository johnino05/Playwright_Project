import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export interface CardDetails {
  number: string;
  expiry: string;
  cvv: string;
  name?: string;
}

export class CheckoutPage extends BasePage {
  private readonly cardNumberInput = this.page.locator('[data-testid="card-number"], input[placeholder*="Card"], iframe[name*="card"]').first();
  private readonly expiryInput = this.page.locator('[data-testid="card-expiry"], input[placeholder*="MM"]').first();
  private readonly cvvInput = this.page.locator('[data-testid="card-cvv"], input[placeholder*="CVV"], input[placeholder*="CVC"]').first();
  private readonly nameInput = this.page.locator('[data-testid="card-name"], input[placeholder*="Name on card"]').first();
  private readonly payButton = this.page.locator('button:has-text("Pay"), button:has-text("Complete"), button[type="submit"]').first();
  private readonly successMessage = this.page.locator('[data-testid="payment-success"], :text("Thank you"), :text("Success")').first();
  private readonly errorMessage = this.page.locator('[data-testid="payment-error"], .payment-error, [class*="error"]').first();

  async fillCard(card: CardDetails) {
    await this.cardNumberInput.fill(card.number);
    await this.expiryInput.fill(card.expiry);
    await this.cvvInput.fill(card.cvv);
    if (card.name) await this.nameInput.fill(card.name);
  }

  async submit() {
    await this.payButton.click();
  }

  async expectSuccess() {
    await expect(this.successMessage).toBeVisible({ timeout: 15_000 });
  }

  async expectDecline(message?: string) {
    await expect(this.errorMessage).toBeVisible({ timeout: 10_000 });
    if (message) await expect(this.errorMessage).toContainText(message);
  }
}
