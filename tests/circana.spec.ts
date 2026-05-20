import { test, expect } from '../fixtures/appFixtures';
import { testData, generateTestData } from '../utils/testData';

test.describe('circana profile creation', () => {
  test('creates a circana profile with valid data', async ({ homePage, circanaPage, page }) => {
    const clientVisibleName = generateTestData.clientVisibleName('circana');

    await homePage.goto();
    await homePage.openCircana();
    await circanaPage.selectClientName(testData.clients.circana.valid);
    await circanaPage.fillClientVisibleName(clientVisibleName);
    await circanaPage.verifyCccEligible(testData.profiles.circana.cccEligible.yes);
    await circanaPage.chooseZipcode(testData.profiles.circana.zipEligible.no);
    await circanaPage.selectOutlet(testData.outlets.circana.walmart);
    await circanaPage.fillNotes(testData.profiles.circana.notes);

    // await circanaPage.saveProfile();
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

  test('shows validation messages when mandatory circana fields are missing', async ({ homePage, circanaPage }) => {
    await homePage.goto();
    await homePage.openCircana();
    await circanaPage.saveProfile();
    expect(await circanaPage.errorClientName()).toContain(testData.errors.client.selectionRequired);
    expect(await circanaPage.errorVisibleName()).toContain(testData.errors.client.visibleNameRequired);
  });

  test('check CCC eligible Yes option', async ({ homePage, circanaPage }) => {
    await homePage.goto();
    await homePage.openCircana();
    expect(await circanaPage.isYesSelected()).toBe(true);
  });
});
