import { expect, Locator, Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly dataTable;
  readonly tableRows;
  readonly refreshButton;

  constructor(page: Page) {
    this.page = page;
    this.dataTable = page.locator('table.table');
    this.tableRows = page.locator('table tbody tr');
    this.refreshButton = page.getByRole('button', { name: /refresh/i });
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

  async waitForLoaderToDisappear(timeout = 30000): Promise<void> {
    const loader = this.page.locator('text=Loading..., [aria-busy="true"], .spinner-border, .loading-spinner, .overlay-backdrop').first();

    if ((await loader.count()) === 0) {
      return;
    }

    try {
      await loader.waitFor({ state: 'hidden', timeout });
    } catch {
      // loader may not disappear in time or was never visible
    }
  }

  async waitForElementToBeReady(locator: Locator, timeout = 15000): Promise<void> {
    await expect(locator).toBeVisible({ timeout });
    await expect(locator).toBeEnabled({ timeout });
    await this.page.waitForTimeout(150);
  }

  async safeClick(locator: Locator): Promise<void> {
    await this.waitForLoaderToDisappear();

    const element = locator.first();

    await expect(element).toBeVisible({
      timeout: 15000
    });

    await expect(element).toBeEnabled({
      timeout: 15000
    });

    await element.click();
  }

  async safeClickAndWaitForLoader(locator: Locator): Promise<void> {
    await this.safeClick(locator);
    await this.waitForLoaderToDisappear();
  }

  async waitForButtonReadyAndClick(locator: Locator): Promise<void> {
    await this.waitForLoaderToDisappear();
    await expect(locator).toBeVisible({ timeout: 15000 });
    await expect(locator).toBeEnabled({ timeout: 15000 });
    // Wait for element stability (stops animating/moving)
    await this.page.waitForTimeout(300);
    await locator.click({ force: true });
  }

  async waitForDataAndClickRefresh(): Promise<void> {
    const maxRetries = 10;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {

      await this.waitForLoaderToDisappear();

      const rowCount = await this.tableRows.count();

      if (rowCount > 0) {
        console.log(`Table loaded with ${rowCount} rows`);
        return;
      }

      const refreshVisible = await this.refreshButton.isVisible().catch(() => false);

      if (refreshVisible) {
        console.log(`No data found. Clicking Refresh (${attempt})`);

        try {
          await this.refreshButton.click({ force: true, timeout: 5000 });
        } catch (error) {
          console.log(`Refresh click failed on attempt ${attempt}, retrying...`);
          await this.page.waitForTimeout(1000);
          continue;
        }

        await this.waitForLoaderToDisappear();
      } else {
        console.log(`Waiting for table... attempt ${attempt}`);
        await this.page.waitForTimeout(2000);
      }
    }

    throw new Error('Table data did not load after refresh attempts');
  }


}
