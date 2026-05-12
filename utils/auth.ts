import { expect, chromium, Page } from '@playwright/test';
import envConfig, { getCredentials } from '../config/env';

export async function login(page: Page): Promise<void> {
  const { username, password } = getCredentials();

  await page.goto(envConfig.loginPath);

  const usernameLocator = page.locator(envConfig.loginSelectors.username).first();
  const passwordLocator = page.locator(envConfig.loginSelectors.password).first();
  const submitLocator = page.locator(envConfig.loginSelectors.submitButton).first();

  await expect(usernameLocator, 'Username input was not found on the login page').toBeVisible({ timeout: 10000 });
  await usernameLocator.fill(username);

  await expect(passwordLocator, 'Password input was not found on the login page').toBeVisible({ timeout: 10000 });
  await passwordLocator.fill(password);

  await expect(submitLocator, 'Login submit button was not found on the login page').toBeVisible({ timeout: 10000 });
  await submitLocator.click();

  await page.waitForLoadState('networkidle');
}

export async function createAuthenticatedStorageState(): Promise<void> {
  if (!envConfig.authRequired) {
    return;
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await login(page);
  await page.context().storageState({ path: envConfig.storageState });

  await browser.close();
}
