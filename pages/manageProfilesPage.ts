import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class ManageProfilesPage extends BasePage{
  readonly page: Page;
  readonly heading: Locator;
  readonly searchField: Locator;
  readonly profileCards: Locator;
  readonly allProfilesDropdown: Locator;
  readonly deleteButton: Locator;
  readonly cancelButton: Locator;
  readonly editButton: Locator;
  readonly clientVisibleNameField: Locator;
  readonly notesField: Locator;
  readonly updateProfileButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.heading = page.locator('h2:has-text("Profiles")');
    this.searchField = page.locator('input[placeholder*="Search"]');
    this.profileCards = page.locator('div.card.profile-card.h-100.shadow-sm.p-2.rounded-4.clickable-card');
    this.allProfilesDropdown = page.getByText(/all profiles/i);
    this.deleteButton = page.locator('button.btn.btn-danger.btn-sm.text-xs.rounded-3:visible');
    this.cancelButton = page.getByRole('button', { name: /cancel/i });
    this.editButton = page.getByRole('button', { name: /edit/i });
    this.clientVisibleNameField = page.locator('#clientVisibleName');
    this.notesField = page.locator('#notes');
    this.updateProfileButton = page.getByRole('button', { name: /update profile/i });
  }

  async searchProfile(clientName: string): Promise<void> {
    await this.searchField.fill(clientName);
    await this.page.waitForTimeout(500);
  }

  async getProfileCount(): Promise<number> {
    return this.profileCards.count();
  }

  async clickAllProfilesDropdown(): Promise<void> {
    await this.allProfilesDropdown.click();
  }

  async selectProfileType(profileType: string): Promise<void> {
    await this.page.getByText(new RegExp(profileType, 'i')).first().click();
  }

  async selectFirstProfile(): Promise<string> {
    await this.profileCards.first().click();
    return (await this.profileCards.first().textContent())?.trim() ?? '';
  }

  async deleteFirstProfile(): Promise<void> {
    await this.deleteButton.first().click();

    await this.waitForLoaderToDisappear();
    const confirmButton = this.page.locator('div.modal-footer.border-0').locator('button').nth(1);
    if (await confirmButton.count()) {
      await confirmButton.click();
    await this.waitForLoaderToDisappear();
    }
  }

  async isMessageVisible(expectedMessage: string): Promise<boolean> {
    return this.page.locator(`text=${expectedMessage}`).first().isVisible();
  }

  async isOnProfilesPage(): Promise<boolean> {
    return this.page.url().includes('/profiles');
  }

  async viewFirstProfile(): Promise<void> {
    await this.profileCards.first().click();
  }

  async clickCancel(): Promise<void> {
    await this.cancelButton.click();
  }

  async clickEdit(): Promise<void> {
    await this.editButton.first().click();
  }

  async updateClientVisibleName(updatedName: string): Promise<void> {
    await this.clientVisibleNameField.fill(updatedName);
  }

  async selectDifferentOutlet(outlet: string): Promise<void> {
    await this.page.getByText(outlet).click();
  }

  async updateNotes(note: string): Promise<void> {
    await this.notesField.fill(note);
  }

  async clickUpdateProfile(): Promise<void> {
    await this.updateProfileButton.click();
  }

  async selectFreshlookYes(): Promise<void> {
    const yesOption = this.page.locator('#freshlookYes');
    if (!(await yesOption.isChecked())) {
      await yesOption.click();
    }
  }

  async updateOwnerNumber(ownerNo: string): Promise<void> {
    await this.page.locator('[placeholder="Enter owner number"]').fill(ownerNo);
  }

  async updateBannerName(bannerName: string): Promise<void> {
    await this.page.locator('[placeholder="Enter banner name"]').fill(bannerName);
  }

  async getClientNameError(): Promise<string> {
    return this.page.getByText('Client visible name is required.').innerText();
  }
}
