import { test, expect } from '../fixtures/appFixtures';
import { testData } from '../utils/testData';

test.describe('Manufacturer profile creation', () => {
  test('creates a manufacturer profile with valid data', async ({ homePage, manufacturerPage, page }) => {
    await homePage.goto();
    await homePage.openManufacturers();
    await manufacturerPage.selectClientName(testData.clients.manufacturer.valid);
    await manufacturerPage.fillClientVisibleName(testData.profiles.manufacturer.clientVisibleName);
    await manufacturerPage.chooseCccEligible(testData.profiles.manufacturer.cccEligible.no);
    await manufacturerPage.selectOutlet(testData.outlets.manufacturer.multiOutlet);
    await manufacturerPage.fillNotes(testData.profiles.manufacturer.notes);
    await manufacturerPage.saveProfile();
    await expect(page).toHaveURL(/.*\/profiles/);
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
