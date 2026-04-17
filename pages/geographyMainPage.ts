import { Locator, Page } from '@playwright/test';

export class GeographyMainPage {
  readonly page: Page;
  readonly geographyNav: Locator;
  readonly profileSearchInput: Locator;
  readonly profileRows: Locator;
  readonly geographySearchInput: Locator;
  readonly createNewGeographyButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.geographyNav = page.getByText(/Geography/i).first();
    this.profileSearchInput = page.locator('input[placeholder*="Search"], input[type="search"]').first();
    this.profileRows = page.locator('.profile-card, .profile-row, .profile-item, .list-group-item');
    this.geographySearchInput = page.locator('input[placeholder*="Search Geography"], input[placeholder*="Search geographies"], input[placeholder*="Search"]');
    this.createNewGeographyButton = page.getByRole('button', { name: /create new geography set/i });
  }

  async openGeography(): Promise<void> {
    await this.geographyNav.click();
  }

  async isOnGeographyPage(): Promise<boolean> {
    return this.page.url().includes('/geography');
  }

  async openProfileSearch(): Promise<void> {
    await this.page.getByText(/select a profile to view Geography sets/i).click();
  }

  async searchProfile(term: string): Promise<void> {
    await this.profileSearchInput.fill(term);
    await this.page.waitForTimeout(500);
  }

  async getProfileCount(): Promise<number> {
    return this.profileRows.count();
  }

  async selectProfile(index: number): Promise<void> {
    await this.profileRows.nth(index - 1).click();
  }

  async searchGeographySet(term: string): Promise<void> {
    await this.geographySearchInput.fill(term);
    await this.page.waitForTimeout(500);
  }

  async selectGeographySetByName(name: string): Promise<void> {
    await this.page.getByText(name).first().click();
  }

  async clickCreateNewGeographySet(): Promise<void> {
    await this.createNewGeographyButton.click();
  }
}
