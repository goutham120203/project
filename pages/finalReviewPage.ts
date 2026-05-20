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
  readonly finalReviewScreens;

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
    this.finalReviewScreens = page.locator('li.nav-item.pe-2.ng-star-inserted');
  }

  // Not Dynamic for other profiles
  async clickReviewAndApproveAll(): Promise<void> {
    
  //await this.waitForLoaderToDisappear();

  // const screensCount = await this.finalReviewScreens.count();
  
  // console.log(`total screen in final review ${screensCount} `);
  // for (let i = 0; i < screensCount; i++) {

  //   await this.waitForLoaderToDisappear();

  //   const checkbox = this.page.getByRole('checkbox').first();

  //   await checkbox.waitFor({
  //     state: 'visible',
  //     timeout: 10000
  //   });

  //   if (!(await checkbox.isChecked())) {
  //     await checkbox.check();
  //   }

    // after checking, app auto navigates to next screen
  //  await this.waitForLoaderToDisappear();
  //}

    let maxIterations = 20;
    let iteration = 0;

    while (!(await this.finalSubmitButton.isEnabled()) && iteration < maxIterations){
      await this.waitForLoaderToDisappear();

      const checkbox = this.page.getByRole('checkbox').first();
      await expect(checkbox).toBeVisible({ timeout: 15000 });
      
      console.log( `Approving review screen ${iteration + 1}`);

      await checkbox.check();

       await this.waitForLoaderToDisappear();
       await this.page.waitForTimeout(1000);
       iteration++;

      console.log(
        `Final Submit enabled: ${await this.finalSubmitButton.isEnabled()
        }`
      );
    }

    await expect(this.finalSubmitButton).toBeEnabled({timeout: 15000});

    // await this.waitForLoaderToDisappear();
    // await this.ApproverrmaDefinitionReview.click();
    // await this.waitForLoaderToDisappear();
    // await this.ApproveCRMADefinitionReview.click();
    // await this.waitForLoaderToDisappear();
    // await this.ApproveRMACRMACompare.click();
    // await this.waitForLoaderToDisappear();
    // await this.ApproveGeographyHierarchy.click();
    // await this.waitForLoaderToDisappear();
    // await this.ApproveGeographyMapping.click();
    // await this.waitForLoaderToDisappear();
    // await this.ApproveGeographyNaming.click();
    // await this.waitForLoaderToDisappear();
    // await this.ApproveParentage.click();
    // await this.waitForLoaderToDisappear();
    // await this.ApproveReleaseResults.click();
    // await this.waitForLoaderToDisappear();
    // await this.ApproveChangeHighlights.click();
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
