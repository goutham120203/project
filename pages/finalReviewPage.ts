import { Page } from '@playwright/test';
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
    await this.finalSubmitButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.finalSubmitButton.click();
  }

  async confirmFinalSubmission(): Promise<void> {
    await this.waitForLoaderToDisappear();
    await this.finalConfirmButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.finalConfirmButton.click();
  }

  async isFinalReportVisible(): Promise<boolean> {
    await this.waitForLoaderToDisappear();
    return this.reportHeader.isVisible();
  }
}
