import { Locator, Page } from '@playwright/test';

export class ManufacturerPage {
  readonly page: Page;
  readonly clientNameSelect: Locator;
  readonly clientVisibleNameInput: Locator;
  readonly cccEligibleYes: Locator;
  readonly cccEligibleNo: Locator;
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

  async chooseCccEligible(value: 'Yes' | 'No'): Promise<void> {
    if (value === 'Yes') {
      await this.cccEligibleYes.check();
    } else {
      await this.cccEligibleNo.check();
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
