import { test, expect } from '../fixtures/appFixtures';
import { testData } from '../utils/testData';

test.describe('Manage Profiles', () => {
  test('searches profiles by client name', async ({ homePage, manageProfilesPage }) => {
    await homePage.goto();
    await homePage.openProfiles();
    await manageProfilesPage.searchProfile(testData.clients.retailer.valid.toLowerCase());
    await expect(manageProfilesPage.profileCards.first()).toBeVisible();
  });

  test('filters profiles by type and shows results', async ({ homePage, manageProfilesPage }) => {
    await homePage.goto();
    await homePage.openProfiles();
    await manageProfilesPage.clickAllProfilesDropdown();
    await manageProfilesPage.selectProfileType('Retailers');
    await expect(manageProfilesPage.profileCards.first()).toBeVisible();
  });
});
