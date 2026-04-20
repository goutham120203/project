import { Page } from '@playwright/test';
import { BasePage } from './basePage';

export class FinalReviewPage extends BasePage {
  readonly reviewAndApproveButton = this.page.getByRole('button', { name: /review and approve all/i });
  readonly finalSubmitButton = this.page.getByRole('button', { name: /final submit/i });
  readonly finalConfirmButton = this.page.getByRole('button', { name: /submit final/i });
  readonly reportHeader = this.page.getByText(/Final Reports Will Display/i);

  constructor(page: Page) {
    super(page);
  }

  async clickReviewAndApproveAll(): Promise<void> {
    await this.reviewAndApproveButton.click();
  }

  async clickFinalSubmit(): Promise<void> {
    await this.finalSubmitButton.click();
  }

  async confirmFinalSubmission(): Promise<void> {
    await this.finalConfirmButton.click();
  }

  async isFinalReportVisible(): Promise<boolean> {
    return this.reportHeader.isVisible();
  }
}
