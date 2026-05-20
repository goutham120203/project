import { Page } from '@playwright/test';
import { BasePage } from './basePage';

export class GeographyMappingPage extends BasePage {
  readonly saveButton;
  readonly approveButton;
  readonly confirmButton;
  readonly header;
  
  constructor(page: Page) {
    super(page);
    this.saveButton = page.locator("//h3[normalize-space()='Geography Mapping']//following::button[normalize-space()='Save']");
    this.approveButton = page.locator("//h3[normalize-space()='Geography Mapping']//following::button[normalize-space()='Approve']");
    this.confirmButton = page.getByRole('button', { name: /confirm/i });
    this.header = page.locator('h3', { hasText: 'Geography Mapping' });
  }

  async isMappingScreenDisplayed(): Promise<boolean> {

    await this.page.waitForURL(/.*geography-mapping/, { timeout: 20000 });

    return await this.header.isVisible({ timeout: 10000 });

  }

  async clickSave(): Promise<void> {
    await this.page.waitForURL(/.*geography-mapping/, { timeout: 20000 });
    
    // Wait for processing message to disappear
    const processingMessage = this.page.getByText(/Processing Geography Mapping Data|process is in progress/i);
    await processingMessage.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {
      // Message might not always appear, that's OK
    });
    
    // Wait for processing message to disappear (max 60 seconds for data processing)
    await processingMessage.waitFor({ state: 'hidden', timeout: 60000 }).catch(() => {
      console.log('Processing message did not disappear, continuing anyway');
    });
    
    // Now wait for table data to load
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

  async approveMappingWorkflow(): Promise<void> {
    await this.clickApprove();
    await this.clickConfirm();
    await this.waitForLoaderToDisappear();
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

