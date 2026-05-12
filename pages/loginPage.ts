import { expect, Locator, Page } from '@playwright/test';
import envConfig from '../config/env';

export class LoginPage {
  readonly page: Page;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.locator(envConfig.loginSelectors.username).first();
    this.passwordField = page.locator(envConfig.loginSelectors.password).first();
    this.submitButton = page.locator(envConfig.loginSelectors.submitButton).first();
  }

  async goto(): Promise<void> {
    await this.page.goto(envConfig.loginPath);
  }

  async login(username: string, password: string): Promise<void> {
    await this.goto();
    await expect(this.usernameField).toBeVisible({ timeout: 10000 });
    await this.usernameField.fill(username);
    await expect(this.passwordField).toBeVisible({ timeout: 10000 });
    await this.passwordField.fill(password);
    await expect(this.submitButton).toBeVisible({ timeout: 10000 });
    await this.submitButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}
