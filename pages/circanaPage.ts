import { Locator, Page, expect } from '@playwright/test';

export class CircanaPage {
  readonly page: Page;
  readonly clientNameSelect: Locator;
  readonly clientVisibleNameInput: Locator;
  readonly cccEligibleYes: Locator;
  readonly cccEligibleNo: Locator;
  readonly zipcodeEligibleYes: Locator;
  readonly zipcodeEligibleNo: Locator;
  readonly notesInput: Locator;
  readonly saveProfileButton: Locator;
  readonly cancelButton: Locator;
  readonly outletLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.clientNameSelect = page.locator('#clientName');
    this.clientVisibleNameInput = page.locator('#clientVisibleName');
    this.cccEligibleYes = page.locator('#cccEligibleYes');
    this.cccEligibleNo = page.locator('#cccEligibleNo');
    this.zipcodeEligibleYes = page.locator('#zipCodeEligibleYes');
    this.zipcodeEligibleNo = page.locator('#zipCodeEligibleNo');
    this.notesInput = page.locator('#notes');
    this.saveProfileButton = page.getByRole('button', { name: /save profile/i });
    this.cancelButton = page.getByRole('button', { name: /cancel/i });
    this.outletLabel = page.locator('text=/^(Multi Outlet \(MULO\)|Walmart \(WALM\)|Drug \(DRUG\)|Food \(FOOD\)|Convenience \(CONV\))$/i');
  }

  async selectClientName(clientName: string): Promise<void> {
    await this.clientNameSelect.selectOption({ label: clientName });
  }

  async fillClientVisibleName(name: string): Promise<void> {
    await this.clientVisibleNameInput.fill(name);
  }

  async verifyCccEligible(value: string): Promise<void> {
    const normalized = value.toLowerCase();

    if (normalized === 'yes') {
      await expect(this.cccEligibleYes).toBeChecked();
    } else if (normalized === 'no') {
      await expect(this.cccEligibleNo).toBeChecked();
    } else {
      throw new Error(`Invalid value for ccc: ${value}`);
    }
  }


  async chooseZipcode(value: String): Promise<void>{
    const normalized = value.toLowerCase();

    if (normalized == 'yes') {
      await this.zipcodeEligibleYes.check();
    }else if (normalized == 'no'){
      await this.zipcodeEligibleNo.check();
    } else {
      throw new Error(`Invalid value for zipEligible: ${value}`);
    }
  }
  
  async selectOutlet(outlet: string): Promise<void> {
    await this.page.getByText(outlet).click();
  }

  async fillNotes(notes: string): Promise<void> {
    await this.notesInput.fill(notes);
  }

  async saveProfile(): Promise<void> {
    await this.saveProfileButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  async errorClientName(): Promise<string> {
    return this.page.getByText(/Client selection is required\./i).innerText();
  }

  async errorVisibleName(): Promise<string> {
    return this.page.getByText(/Client visible name is required\./i).innerText();
  }

  async errorOutlets(): Promise<string> {
    return this.page.getByText(/Please select at least one outlet\./i).innerText();
  }

  async isYesSelected(): Promise<boolean> {
    return this.cccEligibleYes.isChecked();
  }

  async isOutletSelected(outlet: string): Promise<boolean> {
    return this.page.getByText(outlet).isVisible();
  }

  async isSpecialCategoriesVisible(): Promise<boolean> {
    return this.page.getByText(/Special Categories/i).isVisible();
  }

  async isAuditOptionsVisible(): Promise<boolean> {
    return this.page.getByText(/Audit Options/i).isVisible();
  }
}
