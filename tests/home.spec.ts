import { test, expect } from '../fixtures/appFixtures';
import { testData } from '../utils/testData';

test.describe('Home page', () => {
  test('loads application and shows Dashboard title', async ({ homePage }) => {
    await homePage.goto();
    await expect(homePage.page).toHaveTitle(new RegExp(testData.titles.dashboard, 'i'));
  });

  test('opens the Profiles section from the home page', async ({ homePage }) => {
    await homePage.goto();
    await homePage.openProfiles();
    await expect(homePage.page.locator(`h2:has-text("${testData.titles.profiles}")`)).toBeVisible();
  });
});
