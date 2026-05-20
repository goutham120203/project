import { test as baseTest, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { ManageProfilesPage } from '../pages/manageProfilesPage';
import { ManufacturerPage } from '../pages/manufacturerPage';
import { RetailerPage } from '../pages/retailerPage';
import { CircanaPage } from '../pages/circanaPage';
import { GeographyMainPage } from '../pages/geographyMainPage';
import { GeographyCreationPage } from '../pages/geographyCreationPage';
import { GeographyMappingPage } from '../pages/geographyMappingPage';
import { ReleaseEvaluationPage } from '../pages/releaseEvaluationPage';
import { GeographyNamingPage } from '../pages/geographyNamingPage';
import { FinalReviewPage } from '../pages/finalReviewPage';
import { LoginPage } from '../pages/loginPage';

type AppFixtures = {
  homePage: HomePage;
  manageProfilesPage: ManageProfilesPage;
  manufacturerPage: ManufacturerPage;
  circanaPage: CircanaPage;
  retailerPage: RetailerPage;
  geographyMainPage: GeographyMainPage;
  geographyCreationPage: GeographyCreationPage;
  geographyMappingPage: GeographyMappingPage;
  releaseEvaluationPage: ReleaseEvaluationPage;
  geographyNamingPage: GeographyNamingPage;
  finalReviewPage: FinalReviewPage;
  loginPage: LoginPage;
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
  circanaPage: async ({page}, use) => {
    await use(new CircanaPage(page));
  },
  retailerPage: async ({ page }, use) => {
    await use(new RetailerPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  geographyMainPage: async ({ page }, use) => {
    await use(new GeographyMainPage(page));
  },
  geographyCreationPage: async ({ page }, use) => {
    await use(new GeographyCreationPage(page));
  },
  geographyMappingPage: async ({ page }, use) => {
    await use(new GeographyMappingPage(page));
  },
  releaseEvaluationPage: async ({ page }, use) => {
    await use(new ReleaseEvaluationPage(page));
  },
  geographyNamingPage: async ({ page }, use) => {
    await use(new GeographyNamingPage(page));
  },
  finalReviewPage: async ({ page }, use) => {
    await use(new FinalReviewPage(page));
  }
});

export { expect };
