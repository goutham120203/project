import { expect, chromium, Page } from '@playwright/test';
import envConfig, { getCredentials } from '../config/env';

export async function login(page: Page): Promise<void> {
  const { username, password } = getCredentials();
  const loginUrl = new URL(envConfig.baseURL).toString();
  await page.goto(loginUrl);
  await page.waitForLoadState('networkidle');

  const usernameLocator = page.locator(envConfig.loginSelectors.username).first();
  const passwordLocator = page.locator(envConfig.loginSelectors.password).first();
  const submitLocator = page.locator(envConfig.loginSelectors.submitButton).first();

  try {
    await usernameLocator.waitFor({ state: 'visible', timeout: 10000 });
  } catch (err) {
    const currentUrl = page.url();
    const snippet = (await page.content()).slice(0, 2000);
    throw new Error(`Username input not found on login page (${currentUrl}). Page content snippet:\n${snippet}`);
  }

  await usernameLocator.fill(username);

  try {
    await passwordLocator.waitFor({ state: 'visible', timeout: 10000 });
  } catch (err) {
    const currentUrl = page.url();
    const snippet = (await page.content()).slice(0, 2000);
    throw new Error(`Password input not found on login page (${currentUrl}). Page content snippet:\n${snippet}`);
  }

  await passwordLocator.fill(password);

  try {
    await submitLocator.waitFor({ state: 'visible', timeout: 10000 });
  } catch (err) {
    const currentUrl = page.url();
    const snippet = (await page.content()).slice(0, 2000);
    throw new Error(`Login submit button not found on login page (${currentUrl}). Page content snippet:\n${snippet}`);
  }

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
