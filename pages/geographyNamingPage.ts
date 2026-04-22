import { Page } from '@playwright/test';
import { BasePage } from './basePage';

export class GeographyNamingPage extends BasePage {
  readonly approveButton;
  readonly confirmApproveButton;
  readonly header;

  constructor(page: Page) {
    super(page);
    this.approveButton = page.locator("//h3[normalize-space()='Geography Naming']//following::button[normalize-space()='Approve']");
    this.confirmApproveButton = page.locator("//h5[normalize-space()='Approve Geography Naming']//following::button[@type='button'][normalize-space()='Approve']");
    this.header = page.locator('//h3[contains(text(),"Geography Naming")]');
  }

  async isGeographyNamingDisplayed(): Promise<boolean> {
    await this.waitForLoaderToDisappear();
    await this.approveButton.waitFor({ state: 'visible', timeout: 10000 });
    return this.header.isVisible();
  }

  async clickApprove(): Promise<void> {
    await this.waitForLoaderToDisappear();
    await this.approveButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.approveButton.click();
  }

  async clickConfirm(): Promise<void> {
    await this.waitForLoaderToDisappear();
    await this.confirmApproveButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.confirmApproveButton.click();
  }

  async verifyApprovalSuccess(message: string): Promise<boolean> {
     const toast = this.page.locator('body').getByText(message, { exact: false });
    await toast.waitFor({ state: 'visible', timeout: 10000 });
    await this.waitForLoaderToDisappear();
    return await toast.isVisible();
  }

  async validateProfileData(): Promise<void> {
    await this.page.getByText(/Profile Data/i).first().waitFor({ state: 'visible' });
  }
}
