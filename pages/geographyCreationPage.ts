import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export interface GeographySetDetails {
  name: string;
  version: string;
  summary: string;
  previousSet: string;
  notes: string;
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
  readonly notesInput: Locator;
  readonly moveAllStoresButton: Locator;
  readonly createGeographyButton: Locator;
  readonly saveButton: Locator;
  readonly approveButton: Locator;
  readonly proceedAnywayButton: Locator;
  readonly confirmButton: Locator;
  readonly yesCrmaButton: Locator;

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
    this.notesInput = page.getByPlaceholder('Enter any additional notes about this geography set');
    this.moveAllStoresButton = page.locator('button.btn-transfer').last();
    this.createGeographyButton = page.getByRole('button', { name: /create geography/i });
    this.saveButton = page.getByRole('button', { name: /save/i });
    this.approveButton = page.getByRole('button', { name: /approve/i });
    this.proceedAnywayButton = page.getByRole('button', { name: /proceed anyway/i });
    this.confirmButton = page.getByRole('button', { name: /confirm/i });
    this.yesCrmaButton = page.getByRole('button', { name: /^Yes$/i }).first();
  }

  async fillGeographySetDetails(details: GeographySetDetails): Promise<void> {
    await this.geographySetNameInput.fill(details.name);
    await this.selectVersion(details.version);
    await this.summaryInput.fill(details.summary);
    await this.selectPreviousGeographySet(details.previousSet);
    await this.notesInput.fill(details.notes);
  }

  async selectVersion(version: string): Promise<void> {
    await this.versionSelect.selectOption({ label: version });
  }

  async selectPreviousGeographySet(previousSet: string): Promise<void> {
    await this.previousSetSelect.selectOption({ label: previousSet });
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
    await this.stateFilter.waitFor({ state: 'visible', timeout: 10000 });
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
    return this.page.getByRole('heading', { name: /Geography Creation/i }).isVisible();
  }

  async validateProfileData(): Promise<void> {
    await this.page.getByText(/Profile Data/i).first().waitFor({ state: 'visible' });
  }

  async isMappingStageVisible(): Promise<boolean> {
    return this.page.getByText(/Geography Mapping/i).isVisible();
  }

  async verifySuccessMessage(message: string): Promise<boolean> {
    return this.page.getByText(message).isVisible();
  }
}
