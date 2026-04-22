import { Page } from '@playwright/test';
import { BasePage } from './basePage';

export class ReleaseEvaluationPage extends BasePage {
  readonly saveButton;
  readonly approveButton;
  readonly confirmButton;
  readonly header;

  constructor(page: Page) {
    super(page);
    this.saveButton = page.locator("//h3[normalize-space()='Release Evaluation']//following::button[normalize-space()='Save']");
    this.approveButton = page.locator("//h3[normalize-space()='Release Evaluation']//following::button[normalize-space()='Approve']");
    this.confirmButton = page.getByRole('button', { name: /confirm/i });
    this.header = page.locator('//h3[contains(text(),"Release Evaluation")]');
  }

  async isReleaseEvaluationDisplayed(): Promise<boolean> {

    await this.page.waitForURL(/.*release-evaluation/, { timeout: 20000 });  

     return await this.header.isVisible({ timeout: 10000 });
  }

  async clickSave(): Promise<void> { 
    await this.saveButton.waitFor({ state: 'visible', timeout: 10000 }); 
    await this.waitForDataAndClickRefresh();
    await this.saveButton.click(); 
  }

  async clickApprove(): Promise<void> {
    await this.waitForLoaderToDisappear();
    await this.approveButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.approveButton.click();
  }

  async clickConfirm(): Promise<void> {
    await this.waitForLoaderToDisappear();
    await this.confirmButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.confirmButton.click();
  }

  async verifySaveSuccess(message: string): Promise<boolean> {
    const toast = this.page.locator('body').getByText(message, { exact: false });
    await toast.waitFor({ state: 'visible', timeout: 10000 });
    await this.waitForLoaderToDisappear();
    return await toast.isVisible();
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

