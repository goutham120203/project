import { Page, Locator } from '@playwright/test';

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
    this.manufacturerOption = page.getByText(/manufacturer/i);
    this.retailerOption = page.getByRole('button', { name: /select retailer/i });
    this.circanaOption = page.getByRole('button', { name: /select circana profile/i });
    this.geographyLink = page.getByRole('link', { name: /geography/i });
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
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
