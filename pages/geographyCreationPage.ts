import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export interface GeographySetDetails {
  name: string;
  version: string;
  summary: string;
  previousSet: string;
  notes: string;
  customRegionConnection?: string;
  cccPreviousGeographySet?: string;
}

export class GeographyCreationPage extends BasePage {
  readonly deliverableOption: Locator;
  readonly continueButton: Locator;
  readonly selectButton: Locator;
  readonly stateFilter: Locator;
  readonly geographySetNameInput: Locator;
  readonly geographyNameInput: Locator;
  readonly versionSelect: Locator;
  readonly summaryInput: Locator;
  readonly previousSetSelect: Locator;
  readonly customRegionConnectionSelect: Locator;
  readonly cccPreviousGeoSetSelect: Locator;
  readonly notesInput: Locator;
  readonly moveAllStoresButton: Locator;
  readonly createGeographyButton: Locator;
  readonly saveButton: Locator;
  readonly reviewButton: Locator;
  readonly approveButton: Locator;
  readonly proceedAnywayButton: Locator;
  readonly confirmButton: Locator;
  readonly yesCrmaButton: Locator;
  readonly geographyTypeModal: Locator;
  readonly geographyMethodModal: Locator;
  readonly dialogContainer: Locator;

  constructor(page: Page) {
    super(page);
    this.deliverableOption = page.getByText(/Available for Manufacturer Use/i);
    this.continueButton = page.getByRole('button', { name: /continue/i });
    this.selectButton = page.locator('xpath=//button[normalize-space()="Select"]').first();
    this.stateFilter = page.locator('#state-filter');
    this.geographySetNameInput = page.getByPlaceholder('e.g. 2025 Bottlers');
    this.geographyNameInput = page.locator('#geoName');
    this.versionSelect = page.locator('select[formcontrolname="version"]');
    this.summaryInput = page.getByPlaceholder('e.g. Frito Lay Zones and Markets');
    this.previousSetSelect = page.locator('select[formcontrolname="previousGeoSetId"]');
    this.customRegionConnectionSelect = this.previousSetSelect;
    this.cccPreviousGeoSetSelect = page.locator('select[formcontrolname="cccPreviousGeoSetId"]');
    this.notesInput = page.getByPlaceholder('Enter any additional notes about this geography set');
    this.moveAllStoresButton = page.locator('button.btn-transfer').nth(1);
    this.createGeographyButton = page.getByRole('button', { name: /create geography/i });
    this.saveButton = page.getByRole('button', { name: /save/i });
    this.reviewButton = page.getByRole('button', { name: /Review/i });
    this.approveButton = page.getByRole('button', { name: /approve/i });
    this.proceedAnywayButton = page.getByRole('button', { name: /proceed anyway/i });
    this.confirmButton = page.getByRole('button', { name: /confirm/i });
    this.yesCrmaButton = page.getByRole('button', { name: /Yes, Create CRMA/i });
    this.dialogContainer = page.locator('div[role="dialog"], .modal-dialog, .modal-content, section[role="dialog"]');
    this.geographyTypeModal = this.dialogContainer.filter({ hasText: /Select Geography Type/i }).first();
    this.geographyMethodModal = this.dialogContainer.filter({ hasText: /Select Geography Creation Method/i }).first();
  }

  async fillGeographySetDetails(details: GeographySetDetails): Promise<void> {
    await this.geographySetNameInput.fill(details.name);
    await this.selectVersion(details.version);
    await this.summaryInput.fill(details.summary);
    if (details.customRegionConnection) {
      await this.selectCustomRegionConnection(details.customRegionConnection);
    }
    if (details.cccPreviousGeographySet) {
      await this.selectCccPreviousGeographySet(details.cccPreviousGeographySet);
    }
    await this.selectPreviousGeographySet(details.previousSet);
    await this.notesInput.fill(details.notes);
  }

  async selectVersion(version: string): Promise<void> {
    await expect(this.versionSelect).toBeVisible({ timeout: 15000 });
    await this.versionSelect.selectOption({ label: version });
  }

  async selectPreviousGeographySet(previousSet: string): Promise<void> {
    await expect(this.previousSetSelect).toBeVisible({ timeout: 15000 });
    await this.previousSetSelect.selectOption({ label: previousSet });
  }

  async selectCustomRegionConnection(option: string): Promise<void> {
    await expect(this.customRegionConnectionSelect).toBeVisible({ timeout: 15000 });
    await this.customRegionConnectionSelect.selectOption({ label: option });
  }

  async selectCccPreviousGeographySet(option: string): Promise<void> {
    await expect(this.cccPreviousGeoSetSelect).toBeVisible({ timeout: 15000 });
    await this.cccPreviousGeoSetSelect.selectOption({ label: option });
  }

  async selectDeliverable(option: string): Promise<void> {
    await this.page.getByText(option).click();
  }

  async clickContinue(): Promise<void> {
    await this.safeClickAndWaitForLoader(this.continueButton);
  }

  async clickSelect(): Promise<void> {
    await this.selectButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.selectButton.click();
  }

  async selectState(state: string): Promise<void> {
    await this.stateFilter.waitFor({ state: 'visible', timeout: 30000 });
    await this.stateFilter.selectOption({ label: state });
  }

  async fillGeographyName(name: string): Promise<void> {
    await this.geographyNameInput.fill(name);
  }

  async moveAllStoresToTarget(): Promise<void> {
    await this.moveAllStoresButton.click();
  }

  async clickCreateGeography(): Promise<void> {
    await this.safeClickAndWaitForLoader(this.createGeographyButton);
  }

  async clickSave(): Promise<void> {
    await this.safeClickAndWaitForLoader(this.saveButton);
  }

  async clickReview(): Promise<void> {
    await this.reviewButton.click();
  }

  async clickApprove(): Promise<void> {
    await this.safeClick(this.approveButton);
  }

  async clickProceedAnyway(): Promise<void> {
    await this.proceedAnywayButton.click();
  }

  async clickConfirm(): Promise<void> {
    await this.confirmButton.click();
  }

  async clickYesForCrma(): Promise<void> {
    await this.yesCrmaButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.yesCrmaButton.click();
  }

  async approveRmaDefinition(): Promise<void> {
    await this.clickApprove();
    await this.clickProceedAnyway();
    await this.clickConfirm();
  }

  async approveCrmaDefinition(): Promise<void> {
    await this.clickYesForCrma();
    await this.waitForLoaderToDisappear();
    
    const currentUrl = this.page.url();
    console.log(`Current URL: ${currentUrl}`);
    
    // Try to wait for any save button visible
    await this.safeClickAndWaitForLoader(this.saveButton);
    await this.safeClickAndWaitForLoader(this.approveButton);
    await this.safeClickAndWaitForLoader(this.confirmButton);
  }

  async isReviewTitleVisible(): Promise<boolean> {
    const heading = this.page.getByRole('heading', { name: /Geography Creation/i });
    await heading.waitFor({ state: 'visible', timeout: 15000 });
    return heading.isVisible();
  }

  async validateProfileData(): Promise<void> {
    await this.page.getByText(/Profile Data/i).first().waitFor({ state: 'visible', timeout: 15000 });
  }

  async chooseGeographyType(type: string): Promise<boolean> {
    const dialog = await this.findDialogByTitle(/Select Geography Type/i, 3000);
    if (!dialog) {
      return false;
    }

    const option = dialog.getByText(type, { exact: false }).first();
    await expect(option).toBeVisible({ timeout: 15000 });
    await option.click();
    return true;
  }

  async chooseCreationMethod(method: string): Promise<boolean> {
    const dialog = await this.findDialogByTitle(/Select Geography Creation Method/i, 3000);
    if (!dialog) {
      return false;
    }

    const option = dialog.getByText(method, { exact: false }).first();
    await expect(option).toBeVisible({ timeout: 15000 });
    await option.click();
    return true;
  }

  async chooseAvailableGeographyType(preferredType?: string): Promise<'Custom Region' | 'Custom Census Chain (CCC)' | 'Unknown'> {
    const dialog = await this.findDialogByTitle(/Select Geography Type/i, 3000);
    if (!dialog) {
      return 'Unknown';
    }

    if (preferredType) {
      const preferredOption = dialog.getByText(preferredType, { exact: false }).first();
      if (await preferredOption.isVisible().catch(() => false)) {
        await preferredOption.click();
        return preferredType as 'Custom Region' | 'Custom Census Chain (CCC)';
      }
    }

    const customRegionOption = dialog.getByText(/Custom Region/i).first();
    if (await customRegionOption.isVisible().catch(() => false)) {
      await customRegionOption.click();
      return 'Custom Region';
    }

    const cccOption = dialog.getByText(/Custom Census Chain|CCC/i).first();
    if (await cccOption.isVisible().catch(() => false)) {
      await cccOption.click();
      return 'Custom Census Chain (CCC)';
    }

    return 'Unknown';
  }

  async chooseAvailableCreationMethod(preferredMethod?: string): Promise<'FIPS Code' | 'ZIP Code' | 'Unknown'> {
    const dialog = await this.findDialogByTitle(/Select Geography Creation Method/i, 3000);
    if (!dialog) {
      return 'Unknown';
    }

    if (preferredMethod) {
      const preferredOption = dialog.getByText(preferredMethod, { exact: false }).first();
      if (await preferredOption.isVisible().catch(() => false)) {
        await preferredOption.click();
        return preferredMethod as 'FIPS Code' | 'ZIP Code';
      }
    }

    const fipsOption = dialog.getByText(/FIPS Code/i).first();
    if (await fipsOption.isVisible().catch(() => false)) {
      await fipsOption.click();
      return 'FIPS Code';
    }

    const zipOption = dialog.getByText(/ZIP Code/i).first();
    if (await zipOption.isVisible().catch(() => false)) {
      await zipOption.click();
      return 'ZIP Code';
    }

    return 'Unknown';
  }

  async findDialogByTitle(title: RegExp, timeout = 5000): Promise<Locator | null> {
    const dialog = this.dialogContainer.filter({ hasText: title }).first();
    try {
      await dialog.waitFor({ state: 'visible', timeout });
      return dialog;
    } catch {
      return null;
    }
  }

  async getDialogByTitle(title: RegExp, timeout = 15000): Promise<Locator> {
    const dialog = this.dialogContainer.filter({ hasText: title }).first();
    await expect(dialog).toBeVisible({ timeout });
    return dialog;
  }

  async handlePopupAction(actionLabel: string = 'Continue', popupHeadingRegex?: RegExp): Promise<boolean> {
    const dialogBase = this.page.locator('div[role="dialog"], .modal-dialog, .modal-content, section[role="dialog"]');
    const dialog = popupHeadingRegex ? dialogBase.filter({ hasText: popupHeadingRegex }).first() : dialogBase.first();
    if (!(await dialog.count())) {
      return false;
    }

    if (!(await dialog.isVisible())) {
      return false;
    }

    const actionButton = dialog.getByRole('button', { name: actionLabel, exact: false }).first();
    if (await actionButton.count() > 0) {
      await actionButton.click();
      await this.waitForLoaderToDisappear();
      return true;
    }

    const fallback = dialog.getByText(actionLabel, { exact: false }).first();
    if (await fallback.count() > 0) {
      await fallback.click();
      await this.waitForLoaderToDisappear();
      return true;
    }

    return false;
  }

  async waitForCreationForm(): Promise<void> {
    await expect(this.geographySetNameInput).toBeVisible({ timeout: 15000 });
    await this.waitForLoaderToDisappear();
  }

  async isMappingStageVisible(): Promise<boolean> {
    return this.page.getByText(/Geography Mapping/i).isVisible();
  }

  async verifySuccessMessage(message: string): Promise<boolean> {
    const toast = this.page.locator('body').getByText(message, { exact: false });
    console.log(toast);
    await toast.waitFor({ state: 'visible', timeout: 10000 });
    return await toast.isVisible();
  }
}





