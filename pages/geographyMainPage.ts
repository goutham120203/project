import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class GeographyMainPage extends BasePage {
  readonly geographyNav: Locator;
  readonly searchProfileButton: Locator;
  readonly profileSearchInput: Locator;
  readonly profileRows: Locator;
  readonly geographySearchInput: Locator;
  readonly createNewGeographyButton: Locator;

  constructor(page: Page) {
    super(page);
    this.geographyNav = page.getByText(/Geography/i).first();
    this.searchProfileButton = page.locator('//*[@id="profileSelect"]');
    this.profileSearchInput = page.locator('//*[@id="profileSelect"]//input');
    this.profileRows = page.locator('//*[@id="profileSelect_list"]/p-selectitem/li');
    this.geographySearchInput = page.locator('//input[@placeholder="Search geography sets..."]');
    this.createNewGeographyButton = page.getByText('Create New Geography Set');
  }

  async openGeography(): Promise<void> {
    await this.geographyNav.click();
  }

  async isOnGeographyPage(): Promise<boolean> {
    await this.page.waitForURL('**/geographies**');
    return this.isOnScreenByURL('geographies');
  }

  async openProfileSearch(): Promise<void> {
    await this.searchProfileButton.click();
  }

  async searchProfile(profileName: string): Promise<void> {
    const input = this.profileSearchInput;
    await expect(input).toBeVisible({ timeout: 15000 });
    await input.fill(profileName);
    await input.press('Enter');
    await this.page.waitForTimeout(300);
  }

  async getProfileCount(): Promise<number> {
    return this.getElementCount('//*[@id="profileSelect_list"]/p-selectitem/li');
  }

  async selectProfileByName(profileName: string): Promise<void> {
    const profileOption = this.page.locator('//*[@id="profileSelect_list"]/p-selectitem/li').filter({ hasText: profileName });
    await expect(profileOption.first()).toBeVisible({ timeout: 15000 });
    await profileOption.first().click();
  }

  async selectFirstProfile(): Promise<void> {
    const firstProfile = this.page.locator('//*[@id="profileSelect_list"]/p-selectitem/li').first();
    // const firstProfile = this.page.locator('//*[@id="profileSelect_list"]/p-selectitem/li').nth(2);
    await expect(firstProfile).toBeVisible({ timeout: 15000 });
    await firstProfile.click();
  }

  async selectProfile(index: number): Promise<void> {
    await this.page.locator('//*[@id="profileSelect_list"]/p-selectitem/li').nth(index).click();
  }

  async searchGeographySet(term: string): Promise<void> {
    await this.geographySearchInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.geographySearchInput.fill(term);
  }

  async selectGeographySetByName(name: string): Promise<void> {
    await this.page.getByText(name).first().click();
  }

  async clickCreateNewGeographySet(): Promise<void> {
    await this.createNewGeographyButton.click();
  }
}
