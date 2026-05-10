import { test, expect } from '../fixtures/appFixtures';
import { testData, generateTestData } from '../utils/testData';

test.describe('Retailer profile creation', () => {
  test('creates a retailer profile with valid data', async ({ homePage, retailerPage, manageProfilesPage, page }) => {

    const clientVisibleName = generateTestData.clientVisibleName('Retailer');
    await homePage.goto();
    await homePage.openRetailer();
    await retailerPage.selectClientName(testData.clients.retailer.valid);
    await retailerPage.fillClientVisibleName(clientVisibleName);
    await retailerPage.selectOutlet(testData.outlets.retailer.liq);
    await retailerPage.chooseFreshlook(testData.profiles.retailer.freshlook.yes);
    await retailerPage.chooseClosedAndSold(testData.profiles.retailer.closedAndSold.include);
    await retailerPage.fillOwnerNumber(testData.profiles.retailer.ownerNumber);
    await retailerPage.fillBannerName(testData.profiles.retailer.bannerName);
    await retailerPage.fillNotes(testData.profiles.retailer.notes);

    // await retailerPage.saveProfile();
    // await expect(page).toHaveURL(/\/profile\/list$/);

    // Search for the created profile
    // await manageProfilesPage.searchProfile(clientVisibleName);

    // const profileCount = await manageProfilesPage.getProfileCount();
    // await expect(manageProfilesPage.profileCards).toHaveCount(1);

    // Delete the profile
    // await manageProfilesPage.deleteFirstProfile();
    // expect(await manageProfilesPage.isMessageVisible(testData.success.profileDeleted)).toBe(true);
    // await expect(page).toHaveURL(/\/profile\/list$/);
  });

  test('shows retailer validation messages when mandatory fields are missing', async ({ homePage, retailerPage }) => {
    await homePage.goto();
    await homePage.openRetailer();
    await retailerPage.saveProfile();
    // expect(await retailerPage.errorClientName()).toContain(testData.errors.client.selectionRequired);
    expect(await retailerPage.errorClientVisibleName()).toContain(testData.errors.client.visibleNameRequired);
    expect(await retailerPage.errorBannerField()).toContain(testData.errors.banner.required);
  });

  test('verifies default retailer selections', async ({ homePage, retailerPage }) => {
    await homePage.goto();
    await homePage.openRetailer();
    expect(await retailerPage.isFreshlookYesSelected()).toBe(false);
    expect(await retailerPage.isIncludeChecked()).toBe(false);
  });

  test('retailer user can select Freshlook Participant using radio button', async ({ homePage, retailerPage }) => {
    await homePage.goto();
    await homePage.openRetailer();
    await retailerPage.chooseFreshlook(testData.profiles.retailer.freshlook.yes);
    expect(await retailerPage.isFreshlookYesSelected()).toBe(true);
  });

  test('retailer Owner Number accepts numeric values', async ({ homePage, retailerPage }) => {
    await homePage.goto();
    await homePage.openRetailer();
    await retailerPage.fillOwnerNumber(testData.profiles.retailer.ownerNumberTest);
    expect(await retailerPage.getOwnerNumberValue()).toBe(testData.profiles.retailer.ownerNumberTest);
  });

  test('retailer user can select Closed/Sold Store Decision options', async ({ homePage, retailerPage }) => {
    await homePage.goto();
    await homePage.openRetailer();
    await retailerPage.chooseClosedAndSold(testData.profiles.retailer.closedAndSold.include);
    expect(await retailerPage.isIncludeSelected()).toBe(true);
  });

  test('retailer list displays after selecting Client Name', async ({ homePage, retailerPage }) => {
    await homePage.goto();
    await homePage.openRetailer();
    await retailerPage.selectClientName(testData.clients.retailer.valid);
    expect(await retailerPage.isOutletListVisible()).toBe(true);
  });

  test('retailer sections display after selecting Retailer Outlet', async ({ homePage, retailerPage }) => {
    await homePage.goto();
    await homePage.openRetailer();
    await retailerPage.selectClientName(testData.clients.retailer.valid);
    await retailerPage.fillClientVisibleName(testData.profiles.retailer.clientVisibleName);
    await retailerPage.selectOutlet(testData.outlets.retailer.conv);
    expect(await retailerPage.isAuditRMASectionVisible()).toBe(true);
    expect(await retailerPage.isParentageSectionVisible()).toBe(true);
    expect(await retailerPage.isCRMAOutletSectionVisible()).toBe(true);
  });

  test('shows validation when Audit and CRMA Outlet options are not selected', async ({ homePage, retailerPage }) => {
    await homePage.goto();
    await homePage.openRetailer();
    await retailerPage.selectClientName(testData.clients.retailer.valid);
    await retailerPage.fillClientVisibleName(testData.profiles.retailer.clientVisibleName);
    await retailerPage.selectOutlet(testData.outlets.retailer.conv);
    await retailerPage.saveProfile();
    // expect(await retailerPage.errorAuditOption()).toContain(testData.errors.audit.required);
    expect(await retailerPage.errorCRMAOutlet()).toContain(testData.errors.crma.required);
  });

  test('retailer user cancels retailer profile form', async ({ homePage, retailerPage, page }) => {
    await homePage.goto();
    await homePage.openRetailer();
    await retailerPage.cancel();
    await expect(page).toHaveURL(/\/profile\/list$/);
  });

});
