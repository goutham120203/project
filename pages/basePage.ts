import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickElement(selector: string): Promise<void> {
    await this.page.locator(selector).first().click();
  }

  async clickElementByText(text: string): Promise<void> {
    await this.page.getByText(text).first().click();
  }

  async clickAndEnter(selector: string, text: string): Promise<void> {
    const element = this.page.locator(selector).first();
    await element.click();
    await element.fill(text);
  }

  async fillText(selector: string, text: string): Promise<void> {
    await this.page.locator(selector).fill(text);
  }

  async selectOption(selector: string, label: string): Promise<void> {
    await this.page.locator(selector).selectOption({ label });
  }

  async getElementCount(selector: string): Promise<number> {
    return this.page.locator(selector).count();
  }

  async isElementVisible(selector: string): Promise<boolean> {
    return this.page.locator(selector).isVisible();
  }

  async isOnScreenByURL(fragment: string): Promise<boolean> {
    return this.page.url().includes(fragment);
  }

  async verifySuccessMessage(message: string): Promise<boolean> {
    return this.page.getByText(message).isVisible();
  }

  async waitForStableState(timeout = 500): Promise<void> {
    await this.page.waitForTimeout(timeout);
  }
}
