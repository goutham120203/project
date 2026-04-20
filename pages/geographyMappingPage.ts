import { Page } from '@playwright/test';
import { BasePage } from './basePage';

export class GeographyMappingPage extends BasePage {
  readonly saveButton = this.page.getByRole('button', { name: /save/i });
  readonly approveButton = this.page.getByRole('button', { name: /approve/i });
  readonly confirmButton = this.page.getByRole('button', { name: /confirm/i });
  readonly header = this.page.locator('//h3[text()="Geography Mapping"]');

  constructor(page: Page) {
    super(page);
  }

  async isMappingScreenDisplayed(): Promise<boolean> {
    return this.header.isVisible();
  }

  async clickSave(): Promise<void> {
    await this.saveButton.click();
  }

  async clickApprove(): Promise<void> {
    await this.approveButton.click();
  }

  async clickConfirm(): Promise<void> {
    await this.confirmButton.click();
  }

  async approveMappingWorkflow(): Promise<void> {
    await this.clickApprove();
    await this.clickConfirm();
  }

  async verifySaveSuccess(): Promise<boolean> {
    return this.verifySuccessMessage('Geography mappings have been saved successfully.');
  }

  async verifyApprovalSuccess(): Promise<boolean> {
    return this.verifySuccessMessage('Geography mapping successfully approved and moved to next stage.');
  }

  async validateProfileData(): Promise<void> {
    await this.page.getByText(/Profile Data/i).first().waitFor({ state: 'visible' });
  }
}
