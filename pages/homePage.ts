import { Page, Locator } from '@playwright/test';
import envConfig from '../config/env';

export class HomePage {
  readonly page: Page;
  readonly profileMenu: Locator;
  readonly addNewProfileButton: Locator;
  readonly manufacturerOption: Locator;
  readonly retailerOption: Locator;
  readonly circanaOption: Locator;
  readonly geographyLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileMenu = page.getByRole('link', { name: /profiles/i });
    this.addNewProfileButton = page.getByRole('button', { name: /add new profile/i });
    this.manufacturerOption = page.getByRole('button', { name: /select manufacturer/i });
    this.retailerOption = page.getByRole('button', { name: /select retailer/i });
    this.circanaOption = page.getByRole('button', { name: /select circana profile/i });
    this.geographyLink = page.getByRole('link', { name: /geography/i });
  }

  async goto(): Promise<void> {
    await this.page.goto('/');

    await this.navigateToApplication();
  }

  async navigateToApplication() {
    switch (envConfig.name) {

      case 'dev':
        await this.page.locator('#menu-left').click();
        await this.page.getByText('#menu-Geography-Builder').click();
        break;

      case 'qa':
        await this.page.locator('#menu-left').click();
        await this.page.getByText('#menu-Geography-Builder(qa)').click();
        break;
        break;
    }
  }

  async title(): Promise<string> {
    return this.page.title();
  }

  async openProfiles(): Promise<void> {
    await this.profileMenu.click();
  }

  async openManufacturers(): Promise<void> {
    await this.openProfiles();
    await this.addNewProfileButton.click();
    await this.manufacturerOption.click();
  }

  async openRetailer(): Promise<void> {
    await this.openProfiles();
    await this.addNewProfileButton.click();
    await this.retailerOption.click();
  }

  async openCircana(): Promise<void> {
    await this.openProfiles();
    await this.addNewProfileButton.click();
    await this.circanaOption.click();
  }

  async openGeography(): Promise<void> {
    await this.geographyLink.click();
  }
}
