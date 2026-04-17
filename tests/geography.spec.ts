import { test, expect } from '../fixtures/appFixtures';
import { testData } from '../utils/testData';

test.describe('Geography creation flows', () => {
  test('navigates to the Geography page and displays geography content', async ({ homePage, geographyMainPage }) => {
    await homePage.goto();
    await homePage.openGeography();
    expect(await geographyMainPage.isOnGeographyPage()).toBe(true);
  });

  test('searches profiles from the Geography page', async ({ homePage, geographyMainPage }) => {
    await homePage.goto();
    await homePage.openGeography();
    await geographyMainPage.openProfileSearch();
    await geographyMainPage.searchProfile(testData.search.profiles.manufacturer);
    expect(await geographyMainPage.getProfileCount()).toBeGreaterThan(0);
  });

  test('starts the geography creation flow for a retailer profile', async ({ homePage, geographyMainPage, geographyCreationPage }) => {
    await homePage.goto();
    await homePage.openGeography();
    await geographyMainPage.openProfileSearch();
    await geographyMainPage.searchProfile(testData.search.profiles.retailer);
    await geographyMainPage.selectProfile(1);
    await geographyMainPage.clickCreateNewGeographySet();
    await geographyCreationPage.selectDeliverable(testData.geography.deliverables.manufacturerUse);
    await geographyCreationPage.clickContinue();
    expect(await geographyCreationPage.isReviewTitleVisible()).toBe(true);
  });
});
