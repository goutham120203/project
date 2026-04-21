import { Page } from '@playwright/test';
import { BasePage } from './basePage';

export class GeographyMappingPage extends BasePage {
  readonly saveButton = this.page.getByRole('button', { name: /save/i });
  readonly approveButton = this.page.getByRole('button', { name: /approve/i });
  readonly confirmButton = this.page.getByRole('button', { name: /confirm/i });
  readonly header = this.page.locator('h3', {hasText: 'Geography Mapping'});

  constructor(page: Page) {
    super(page);
  }

  async isMappingScreenDisplayed(): Promise<boolean> {

    await this.page.waitForURL(/.*geography-mapping/, { timeout: 20000 });

    return await this.header.isVisible({ timeout: 10000 });

  }

  async clickSave(): Promise<void> {
    await this.page.waitForURL(/.*geography-mapping/, { timeout: 20000 });
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

  async verifySaveSuccess(message: string): Promise<boolean> {
    const toast = this.page.locator('body').getByText(message, { exact: false });
    await toast.waitFor({ state: 'visible', timeout: 10000  });
    return await toast.isVisible();
  }

  async verifyApprovalSuccess(message: string): Promise<boolean> {
    const toast = this.page.locator('body').getByText(message, { exact: false });
    await toast.waitFor({ state: 'visible', timeout: 10000  });
    return await toast.isVisible();
  }

  async validateProfileData(): Promise<void> {
    await this.page.getByText(/Profile Data/i).first().waitFor({ state: 'visible' });
  }
}
