import { Page } from '@playwright/test';
import { BasePage } from './basePage';

export class ReleaseEvaluationPage extends BasePage {
  readonly saveButton = this.page.getByRole('button', { name: /save/i });
  readonly approveButton = this.page.getByRole('button', { name: /approve/i });
  readonly confirmButton = this.page.getByRole('button', { name: /confirm/i });
  readonly header = this.page.locator('//h3[contains(text(),"Release Evaluation")]');

  constructor(page: Page) {
    super(page);
  }

  async isReleaseEvaluationDisplayed(): Promise<boolean> {

    await this.page.waitForURL(/.*release-evaluation/, { timeout: 20000 });  

     return await this.header.isVisible({ timeout: 10000 });
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

  async verifySaveSuccess(): Promise<boolean> {
    return this.verifySuccessMessage('Release evaluation have been saved successfully.');
  }

  async verifyApprovalSuccess(): Promise<boolean> {
    return this.verifySuccessMessage('Release evaluation approved. Redirecting to Geography Naming...');
  }

  async validateProfileData(): Promise<void> {
    await this.page.getByText(/Profile Data/i).first().waitFor({ state: 'visible' });
  }
}
