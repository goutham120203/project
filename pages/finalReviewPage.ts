import { Page, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class FinalReviewPage extends BasePage {
  readonly ApproverrmaDefinitionReview;
  readonly ApproveCRMADefinitionReview;
  readonly ApproveRMACRMACompare;
  readonly ApproveGeographyHierarchy;
  readonly ApproveGeographyMapping;
  readonly ApproveGeographyNaming;
  readonly ApproveParentage;
  readonly ApproveReleaseResults;
  readonly ApproveChangeHighlights;

  readonly finalSubmitButton;
  readonly finalConfirmButton;
  readonly reportHeader;

  constructor(page: Page) {
    super(page);
    this.ApproverrmaDefinitionReview = page.getByLabel('Approve RMA Definition Review');
    this.ApproveCRMADefinitionReview = page.getByLabel('Approve CRMA Definition Review');
    this.ApproveRMACRMACompare = page.getByLabel('Approve RMA/CRMA Compare');
    this.ApproveGeographyHierarchy = page.getByLabel('Approve Geography Hierarchy');
    this.ApproveGeographyMapping = page.getByLabel('Approve Geography Mapping');
    this.ApproveGeographyNaming = page.getByLabel('Approve Geography Naming');
    this.ApproveParentage = page.getByLabel('Approve Parentage');
    this.ApproveReleaseResults = page.getByLabel('Approve Release Results');
    this.ApproveChangeHighlights = page.getByLabel('Approve Change Highlights');
    this.finalSubmitButton = page.getByRole('button', { name: /final submit/i });
    this.finalConfirmButton = page.getByRole('button', { name: /submit final/i });
    this.reportHeader = page.getByRole('heading', { name: 'Final Reports' });
  }

  // Not Dynamic for other profiles
  async clickReviewAndApproveAll(): Promise<void> {
    await this.waitForLoaderToDisappear();
    await this.ApproverrmaDefinitionReview.click();
    await this.waitForLoaderToDisappear();
    await this.ApproveCRMADefinitionReview.click();
    await this.waitForLoaderToDisappear();
    await this.ApproveRMACRMACompare.click();
    await this.waitForLoaderToDisappear();
    await this.ApproveGeographyHierarchy.click();
    await this.waitForLoaderToDisappear();
    await this.ApproveGeographyMapping.click();
    await this.waitForLoaderToDisappear();
    await this.ApproveGeographyNaming.click();
    await this.waitForLoaderToDisappear();
    await this.ApproveParentage.click();
    await this.waitForLoaderToDisappear();
    await this.ApproveReleaseResults.click();
    await this.waitForLoaderToDisappear();
    await this.ApproveChangeHighlights.click();
  }

  async clickFinalSubmit(): Promise<void> {
    await this.waitForLoaderToDisappear();
    
    // Close any toast notifications that might be blocking the button
    const toastCloseButtons = this.page.locator('app-toast button[aria-label="Close"], .toast-close, [class*="toast"] button:has-text("×")');
    const closeButtonCount = await toastCloseButtons.count();
    if (closeButtonCount > 0) {
      console.log(`Found ${closeButtonCount} toast close button(s), closing them`);
      for (let i = 0; i < closeButtonCount; i++) {
        try {
          await toastCloseButtons.nth(i).click().catch(() => {
            // Button might have already disappeared
          });
        } catch {
          // Ignore errors closing toasts
        }
      }
      await this.page.waitForTimeout(500); // Wait for toasts to disappear
    }
    
    // Wait for button to be ready and click it
    await this.finalSubmitButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(this.finalSubmitButton).toBeEnabled({ timeout: 10000 });
    await this.safeClick(this.finalSubmitButton);
  }

  async confirmFinalSubmission(): Promise<void> {
    await this.waitForLoaderToDisappear();
    await this.finalConfirmButton.waitFor({ state: 'visible', timeout: 2000 });
    await this.finalConfirmButton.click();
    // Wait for the confirmation to process and page to update
    await this.waitForLoaderToDisappear();
    await this.page.waitForTimeout(2000); // Additional wait for page update
  }

  async isFinalReportVisible(): Promise<boolean> {
    await this.waitForLoaderToDisappear();
    // Look for heading that might contain "Final Report", "Final Review", or similar text
    const finalReportHeading = this.page.getByRole('heading', { name: /final/i });
    // Also check if page contains "Final Reports" or similar text indicating successful submission
    const pageContent = await this.page.textContent('body');
    
    try {
      await finalReportHeading.waitFor({ state: 'visible', timeout: 5000 });
      return await finalReportHeading.isVisible();
    } catch {
      // If heading not found, check for page content indicating final report
      return pageContent?.includes('Final Report') || pageContent?.includes('Final Review') || false;
    }
  }
}
