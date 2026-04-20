import { Page } from '@playwright/test';
import { BasePage } from './basePage';

export class GeographyNamingPage extends BasePage {
  readonly approveButton = this.page.getByRole('button', { name: /approve/i });
  readonly confirmButton = this.page.getByRole('button', { name: /confirm/i });
  readonly header = this.page.locator('//h3[contains(text(),"Geography Naming")]');

  constructor(page: Page) {
    super(page);
  }

  async isGeographyNamingDisplayed(): Promise<boolean> {
    return this.header.isVisible();
  }

  async clickApprove(): Promise<void> {
    await this.approveButton.click();
  }

  async clickConfirm(): Promise<void> {
    await this.confirmButton.click();
  }

  async verifyApprovalSuccess(): Promise<boolean> {
    return this.verifySuccessMessage('Geography Naming successfully approved and moved to next stage.');
  }

  async validateProfileData(): Promise<void> {
    await this.page.getByText(/Profile Data/i).first().waitFor({ state: 'visible' });
  }
}
