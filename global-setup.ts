import fs from 'fs';
import path from 'path';
import { chromium } from '@playwright/test';
import envConfig from './config/env';
import { login } from './utils/auth';

export default async (): Promise<void> => {
  if (!envConfig.authRequired) {
    return;
  }

  const storageStatePath = path.resolve(envConfig.storageState);
  const storageStateDir = path.dirname(storageStatePath);
  fs.mkdirSync(storageStateDir, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await login(page);
  } catch (err) {
    const currentUrl = page.url();
    const snippet = (await page.content()).slice(0, 2000);
    throw new Error(
      `Failed to authenticate during global setup. Tried ${currentUrl}.\nOriginal error: ${err instanceof Error ? err.message : String(err)}\nPage snippet:\n${snippet}\nPlease verify ${process.cwd()}/.env.${process.env.TEST_ENV ?? process.env.PLAYWRIGHT_ENV ?? 'dev'} and that the server is reachable at the configured BASE_URL/LOGIN_PATH.`
    );
  }

  await page.context().storageState({ path: storageStatePath });

  await browser.close();
};
