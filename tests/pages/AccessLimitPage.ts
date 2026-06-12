import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccessLimitPage extends BasePage {
  private readonly heading = this.page.getByRole('heading', { name: /Your access to this site has been temporarily limited by the site owner/i, level: 1 });

  async expectAccessLimited() {
    await expect(this.heading).toBeVisible();
    await expect(this.heading).toContainText('Your access to this site has been temporarily limited by the site owner');
  }
}
