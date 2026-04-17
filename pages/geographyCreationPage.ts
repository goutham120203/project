import { Locator, Page } from '@playwright/test';

export class GeographyCreationPage {
  readonly page: Page;
  readonly deliverableOption: Locator;
  readonly continueButton: Locator;
  readonly selectButton: Locator;
  readonly stateFilter: Locator;
  readonly geographyNameInput: Locator;
  readonly moveAllStoresButton: Locator;
  readonly createGeographyButton: Locator;
  readonly saveButton: Locator;
  readonly approveButton: Locator;
  readonly proceedAnywayButton: Locator;
  readonly confirmButton: Locator;
  readonly yesCrmaButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.deliverableOption = page.getByText(/Available for Manufacturer Use/i);
    this.continueButton = page.getByRole('button', { name: /continue/i });
    this.selectButton = page.getByRole('button', { name: /select/i }).first();
    this.stateFilter = page.locator('#state-filter');
    this.geographyNameInput = page.locator('#geoName');
    this.moveAllStoresButton = page.locator('button.btn-transfer').last();
    this.createGeographyButton = page.getByRole('button', { name: /create geography/i });
    this.saveButton = page.getByRole('button', { name: /save/i });
    this.approveButton = page.getByRole('button', { name: /approve/i });
    this.proceedAnywayButton = page.getByRole('button', { name: /proceed anyway/i });
    this.confirmButton = page.getByRole('button', { name: /confirm/i });
    this.yesCrmaButton = page.getByRole('button', { name: /^Yes$/i }).first();
  }

  async selectDeliverable(option: string): Promise<void> {
    await this.page.getByText(option).click();
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  async clickSelect(): Promise<void> {
    await this.selectButton.click();
  }

  async selectState(state: string): Promise<void> {
    await this.stateFilter.selectOption({ label: state });
  }

  async fillGeographyName(name: string): Promise<void> {
    await this.geographyNameInput.fill(name);
  }

  async moveAllStoresToTarget(): Promise<void> {
    await this.moveAllStoresButton.click();
  }

  async clickCreateGeography(): Promise<void> {
    await this.createGeographyButton.click();
  }

  async clickSave(): Promise<void> {
    await this.saveButton.click();
  }

  async clickApprove(): Promise<void> {
    await this.approveButton.click();
  }

  async clickProceedAnyway(): Promise<void> {
    await this.proceedAnywayButton.click();
  }

  async clickConfirm(): Promise<void> {
    await this.confirmButton.click();
  }

  async clickYesForCrma(): Promise<void> {
    await this.yesCrmaButton.click();
  }

  async approveRmaDefinition(): Promise<void> {
    await this.clickApprove();
    await this.clickProceedAnyway();
    await this.clickConfirm();
  }

  async approveCrmaDefinition(): Promise<void> {
    await this.clickYesForCrma();
    await this.clickSave();
    await this.clickApprove();
    await this.clickConfirm();
  }

  async isReviewTitleVisible(): Promise<boolean> {
    return this.page.getByText(/Geography/i).isVisible();
  }
}
