import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import envConfig from './config/env';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30_000,
  expect: {
    timeout: 10_000
  },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { outputFolder: envConfig.reportFolder, open: 'never' }]],
  globalSetup: './global-setup.ts',
  use: {
    baseURL: envConfig.baseURL,
    storageState: envConfig.authRequired ? envConfig.storageState : undefined,
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10_000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
};

export default config;
