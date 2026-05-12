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

  await login(page);
  await page.context().storageState({ path: storageStatePath });

  await browser.close();
};
