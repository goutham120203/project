import { test as baseTest, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { ManageProfilesPage } from '../pages/manageProfilesPage';
import { ManufacturerPage } from '../pages/manufacturerPage';
import { RetailerPage } from '../pages/retailerPage';
import { GeographyMainPage } from '../pages/geographyMainPage';
import { GeographyCreationPage } from '../pages/geographyCreationPage';

type AppFixtures = {
  homePage: HomePage;
  manageProfilesPage: ManageProfilesPage;
  manufacturerPage: ManufacturerPage;
  retailerPage: RetailerPage;
  geographyMainPage: GeographyMainPage;
  geographyCreationPage: GeographyCreationPage;
};

export const test = baseTest.extend<AppFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  manageProfilesPage: async ({ page }, use) => {
    await use(new ManageProfilesPage(page));
  },
  manufacturerPage: async ({ page }, use) => {
    await use(new ManufacturerPage(page));
  },
  retailerPage: async ({ page }, use) => {
    await use(new RetailerPage(page));
  },
  geographyMainPage: async ({ page }, use) => {
    await use(new GeographyMainPage(page));
  },
  geographyCreationPage: async ({ page }, use) => {
    await use(new GeographyCreationPage(page));
  }
});

export { expect };
