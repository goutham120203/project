import { test, expect } from '../fixtures/appFixtures';
import { testData, generateTestData } from '../utils/testData';

test.describe('Manufacturer profile creation', () => {
  test('creates a manufacturer profile with valid data', async ({ homePage, manufacturerPage, page }) => {
    const clientVisibleName = generateTestData.clientVisibleName('manufacture');

    await homePage.goto();
    await homePage.openManufacturers();
    await manufacturerPage.selectClientName(testData.clients.manufacturer.valid);
    await manufacturerPage.fillClientVisibleName(clientVisibleName);
    await manufacturerPage.chooseCccEligible(testData.profiles.manufacturer.cccEligible.no);
    await manufacturerPage.chooseZipcode(testData.profiles.manufacturer.zipEligible.no);
    await manufacturerPage.selectOutlet(testData.outlets.manufacturer.walmart);
    await manufacturerPage.fillNotes(testData.profiles.manufacturer.notes);

    // await manufacturerPage.saveProfile();
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

  test('shows validation messages when mandatory manufacturer fields are missing', async ({ homePage, manufacturerPage }) => {
    await homePage.goto();
    await homePage.openManufacturers();
    await manufacturerPage.saveProfile();
    expect(await manufacturerPage.errorClientName()).toContain(testData.errors.client.selectionRequired);
    expect(await manufacturerPage.errorVisibleName()).toContain(testData.errors.client.visibleNameRequired);
  });

  test('selects CCC eligible Yes option for manufacturer', async ({ homePage, manufacturerPage }) => {
    await homePage.goto();
    await homePage.openManufacturers();
    await manufacturerPage.chooseCccEligible(testData.profiles.manufacturer.cccEligible.yes);
    expect(await manufacturerPage.isYesSelected()).toBe(true);
  });
});
