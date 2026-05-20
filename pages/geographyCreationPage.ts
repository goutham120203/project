import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export interface GeographySetDetails {
  name: string;
  version: string;
  summary: string;
  previousSet: string;
  notes: string;

  flowType?: 'custom' | 'ccc';

  // CCC
  customRegionConnection?: string;
  cccPreviousGeographySet?: string;
  cccChainType?: string;
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
  readonly geographyTypeInput: Locator;
  readonly geographyTypeModal: Locator;
  readonly geographyMethodModal: Locator;
  readonly dialogContainer: Locator;
  readonly outlets:  Locator;
  readonly cccSumOfchainsYes: Locator;
  readonly cccSumOfchainsNo: Locator;

  constructor(page: Page) {
    super(page);
    this.deliverableOption = page.getByText(/Available for Manufacturer Use/i);
    this.continueButton = page.getByRole('button', { name: /continue/i });
    this.selectButton = page.getByText('Select', { exact: true }).first();
    this.stateFilter = page.getByRole('combobox', { name: /State/i });
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
    this.geographyTypeInput = page.locator('#geographyType');
    this.dialogContainer = page.locator('div[role="dialog"], .modal-dialog, .modal-content, section[role="dialog"], div.geography-type-selector-modal');
    this.geographyTypeModal = this.dialogContainer.filter({ hasText: /Select Geography Type/i }).first();
    this.geographyMethodModal = this.dialogContainer.filter({ hasText: /Select Geography Creation Method/i }).first();
    this.outlets = page.getByRole('switch');
    this.cccSumOfchainsYes =  page.locator('#sum_yes_1');
    this.cccSumOfchainsNo = page.locator("#sum_no_1");
  }

  async fillGeographySetDetails(details: GeographySetDetails): Promise<void> {
    await this.geographySetNameInput.fill(details.name);
    await this.selectVersion(details.version);
    await this.summaryInput.fill(details.summary);
    if (details.flowType === 'ccc') {
      await this.selectCustomRegionConnection(details.customRegionConnection ?? details.previousSet);
      await this.selectCccPreviousGeographySet(details.cccPreviousGeographySet ?? details.previousSet);
    } else {
      await this.selectPreviousGeographySet(details.previousSet);
    }
    
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

  async selectfirstOutlet(details: GeographySetDetails): Promise<void>{
    await this.outlets.first().click();
    if (details.flowType === 'ccc'){
      await this.cccSumOfchainsYes.click();
    }
  }

  async clickContinue(): Promise<void> {
    await this.safeClickAndWaitForLoader(this.continueButton);
  }

  async clickSelect(): Promise<void> {
    // Give the page time to stabilize after navigation
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle').catch(() => {
      // networkidle might not be necessary, continue anyway
    });
    await this.waitForLoaderToDisappear();
    
    // Wait a bit for any dynamic content to render
    await this.page.waitForTimeout(500);
    
    const selectButton = this.selectButton;

    // Wait for button to appear and be clickable
    await expect(selectButton).toBeVisible({ timeout: 20000 });
    await expect(selectButton).toBeEnabled({ timeout: 10000 });

    // Click it
    await this.safeClick(selectButton);
  }

  async selectState(state: string): Promise<void> {
    await this.waitForLoaderToDisappear();
    const currentUrl = this.page.url();
    console.log(`Current URL before selectState: ${currentUrl}`);
    
    // Wait for the state combobox to be visible
    await expect(this.stateFilter).toBeVisible({ timeout: 30000 });
    
    // Select the state option
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

    const option = await this.getGeographyTypeOption(dialog, type);
    await expect(option).toBeVisible({ timeout: 15000 });
    await option.click();
    await dialog.waitFor({ state: 'hidden', timeout: 5000 });
    return true;
  }

  private async getGeographyTypeOption(dialog: Locator, type: string): Promise<Locator> {
    const normalizedType = type.trim();
    const matchers: Array<string | RegExp> = [normalizedType];

    if (/ccc/i.test(normalizedType)) {
      matchers.push(/Custom Census Chain|CCC/i);
    }

    if (/Custom Region/i.test(normalizedType) === false) {
      matchers.push(/Custom Region/i);
    }

    for (const matcher of matchers) {
      const byText = dialog.getByText(matcher, { exact: typeof matcher === 'string' });
      if (await byText.count().then(count => count > 0) && await byText.isVisible().catch(() => false)) {
        return byText.first();
      }

      const byRoleButton = dialog.getByRole('button', { name: matcher, exact: typeof matcher === 'string' }).first();
      if (await byRoleButton.count().then(count => count > 0) && await byRoleButton.isVisible().catch(() => false)) {
        return byRoleButton;
      }

      const byDiv = dialog.locator('div').filter({ hasText: matcher }).first();
      if (await byDiv.isVisible().catch(() => false)) {
        return byDiv;
      }
    }

    return dialog.locator('div').filter({ hasText: normalizedType }).first();
  }

  async chooseCreationMethod(method: string): Promise<boolean> {
    const dialog = await this.findDialogByTitle(/Select Geography Creation Method/i, 5000);
    if (!dialog) {
      console.log(`[chooseCreationMethod] creation method dialog not displayed`);
      return false;
    }

    console.log(`[chooseCreationMethod] selecting creation method: ${method}`);
    const option = dialog.getByText(method, { exact: true }).first();
    await expect(option).toBeVisible({ timeout: 15000 });
    await expect(option).toBeEnabled({ timeout: 15000 }).catch(() => {
      console.log(`[chooseCreationMethod] option visible but not enabled: ${method}`);
    });
    await option.click();
    await this.waitForLoaderToDisappear();

    try {
      await expect(dialog).toBeHidden({ timeout: 10000 });
      console.log('[chooseCreationMethod] creation method dialog closed successfully');
    } catch {
      console.log('[chooseCreationMethod] creation method dialog did not hide in time');
    }

    return true;
  }

  async chooseAvailableGeographyType(preferredType?: string): Promise<'Custom Region' | 'Custom Census Chain (CCC)' | 'Unknown'> {
    const dialog = await this.findDialogByTitle(/Select Geography Type/i, 3000);
    if (!dialog) {
      return 'Unknown';
    }

    if (preferredType) {
      const preferredOption = await this.getGeographyTypeOption(dialog, preferredType);
      if (await preferredOption.isVisible().catch(() => false)) {
        await preferredOption.click();
        await dialog.waitFor({ state: 'hidden', timeout: 5000 });
        return preferredType as 'Custom Region' | 'Custom Census Chain (CCC)';
      }

      if (/ccc/i.test(preferredType)) {
        const cccOption = dialog.locator('div').filter({ hasText: /Custom Census Chain|CCC/i }).first();
        if (await cccOption.isVisible().catch(() => false)) {
          await cccOption.click();
          await dialog.waitFor({ state: 'hidden', timeout: 5000 });
          return 'Custom Census Chain (CCC)';
        }
      }
    }

    const cccOption = dialog.locator('div').filter({ hasText: /Custom Census Chain|CCC/i }).first();
    if (await cccOption.isVisible().catch(() => false)) {
      await cccOption.click();
      await dialog.waitFor({ state: 'hidden', timeout: 5000 });
      return 'Custom Census Chain (CCC)';
    }

    const customRegionOption = dialog.locator('div').filter({ hasText: /Custom Region/i }).first();
    if (await customRegionOption.isVisible().catch(() => false)) {
      await customRegionOption.click();
      await dialog.waitFor({ state: 'hidden', timeout: 5000 });
      return 'Custom Region';
    }

    return 'Unknown';
  }

  async chooseGeographyTypeIfVisible(preferredType?: string): Promise<boolean> {
    const selectedType = await this.chooseAvailableGeographyType(preferredType);
    return selectedType !== 'Unknown';
  }

  async chooseAvailableCreationMethod(preferredMethod?: 'FIPS Code' | 'ZIP Code'): Promise<'FIPS Code' | 'ZIP Code' | 'Unknown'> {
    const dialog = await this.findDialogByTitle(/Select Geography Creation Method/i, 5000);
    if (!dialog) {
      console.log('[chooseAvailableCreationMethod] creation method dialog not displayed');
      return 'Unknown';
    }

    const clickOption = async (label: 'FIPS Code' | 'ZIP Code'): Promise<boolean> => {
      const option = dialog.getByText(label, { exact: true }).first();
      if (!(await option.isVisible().catch(() => false))) {
        return false;
      }

      console.log(`[chooseAvailableCreationMethod] selecting available method: ${label}`);
      await option.click();
      await this.waitForLoaderToDisappear();

      try {
        await expect(dialog).toBeHidden({ timeout: 10000 });
        console.log('[chooseAvailableCreationMethod] creation method dialog closed successfully');
      } catch {
        console.log('[chooseAvailableCreationMethod] creation method dialog did not hide in time');
      }

      return true;
    };

    if (preferredMethod) {
      if (await clickOption(preferredMethod)) {
        return preferredMethod as 'FIPS Code' | 'ZIP Code';
      }
    }

    if (await clickOption('FIPS Code')) {
      return 'FIPS Code';
    }

    if (await clickOption('ZIP Code')) {
      return 'ZIP Code';
    }

    console.log('[chooseAvailableCreationMethod] no creation method option found');
    return 'Unknown';
  }

  async findDialogByTitle(title: RegExp, timeout = 5000): Promise<Locator | null> {
    const heading = this.page.getByRole('heading', { name: title }).first();
    try {
      await heading.waitFor({ state: 'visible', timeout });
    } catch {
      return null;
    }

    const dialog = heading.locator(
      'xpath=ancestor::div[.//button[normalize-space(.)="Close"] or .//button[normalize-space(.)="Cancel"] or .//button[normalize-space(.)="Continue"] or .//button[normalize-space(.)="Confirm"] or .//button[normalize-space(.)="Save"]][1]'
    );

    if (await dialog.count()) {
      return dialog.first();
    }

    const sectionDialog = heading.locator('xpath=ancestor::section[1]');
    if (await sectionDialog.count()) {
      return sectionDialog.first();
    }

    return heading.locator('xpath=ancestor::div[1]');
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

  async getSelectedGeographyType(): Promise<string> {
    await expect(this.geographyTypeInput).toBeVisible({ timeout: 15000 });
    return this.geographyTypeInput.inputValue();
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





