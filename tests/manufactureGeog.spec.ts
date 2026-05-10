import { test, expect } from '../fixtures/appFixtures';
import { GeographyCreationPage } from '../pages/geographyCreationPage';
import { GeographyMainPage } from '../pages/geographyMainPage';
import { HomePage } from '../pages/homePage';
import { testData, generateTestData } from '../utils/testData';
import {
  ManufacturerGeographyOptions,
  openManufacturerGeography,
  setupManufacturerFlow,
  completeManufacturerGeographyCreation,
  completeCustomManufacturerApprovalFlow,
  completeCCCManufacturerApprovalFlow
} from '../utils/manufacturerGeographyFlow';

test.setTimeout(180000);

const manufacturerProfileName = testData.clients.manufacturer.valid;

function buildManufacturerOptions(overrides: Partial<ManufacturerGeographyOptions>): ManufacturerGeographyOptions {
  const defaults: ManufacturerGeographyOptions = {
    profileName: manufacturerProfileName,
    geographyType: 'Custom Region',
    creationMethod: 'FIPS Code',
    name: generateTestData.geographyName('ManufacturerSet'),
    version: testData.geography.versions.v50,
    summary: testData.geography.summaries.test,
    previousSet: testData.geography.previousSets.none,
    notes: testData.geography.notes.test,
    state: testData.geography.states.california,
    geographyName: generateTestData.geographyName('ManufacturerGeo'),
    deliverable: testData.geography.deliverables.manufacturerUse
  };

  const result = { ...defaults, ...overrides };

  if (result.flowType === 'custom') {
    result.geographyType = 'Custom Region';
  }

  if (result.flowType === 'ccc') {
    result.geographyType = 'Custom Census Chain (CCC)';
  }

  return result;
}

test.describe('Manufacturer geography flow', () => {
    test('Complete custom flow with fips', async ({ homePage, geographyMainPage, geographyCreationPage, geographyMappingPage, releaseEvaluationPage, geographyNamingPage, finalReviewPage }) => {
    const options = buildManufacturerOptions({
      flowType: 'custom',
      name: generateTestData.geographyName('ManufacturerSet'),
      geographyName: generateTestData.geographyName('ManufacturerGeo'),
      creationMethod: 'FIPS Code'
    });

    await openManufacturerGeography(homePage, geographyMainPage, "manufacture def testing");
    const result = await setupManufacturerFlow(geographyCreationPage, options);
    expect(result.actualGeographyType).not.toBe('Unknown');
    expect(result.actualCreationMethod).not.toBe('Unknown');

    await completeManufacturerGeographyCreation(geographyCreationPage, options);
    expect(await geographyCreationPage.verifySuccessMessage(testData.geography.messages.GeographyApproved)).toBe(true);

    await completeCustomManufacturerApprovalFlow(
      geographyMappingPage,
      releaseEvaluationPage,
      geographyNamingPage,
      finalReviewPage
    );
  });
  
  // test('Complete custom flow with zips', async ({ homePage, geographyMainPage, geographyCreationPage, geographyMappingPage, releaseEvaluationPage, geographyNamingPage, finalReviewPage }) => {
  //   const options = buildManufacturerOptions({
  //     flowType: 'custom',
  //     name: generateTestData.geographyName('ManufacturerSet'),
  //     geographyName: generateTestData.geographyName('ManufacturerGeo'),
  //     creationMethod:'ZIP Code'
  //   });

  //   await openManufacturerGeography(homePage, geographyMainPage, "manufacturer");
  //   const result = await setupManufacturerFlow(geographyCreationPage, options);
  //   expect(result.actualGeographyType).not.toBe('Unknown');
  //   expect(result.actualCreationMethod).not.toBe('Unknown');

  //   await completeManufacturerGeographyCreation(geographyCreationPage, options);
  //   expect(await geographyCreationPage.verifySuccessMessage(testData.geography.messages.crmaApproved)).toBe(true);

  //   await completeManufacturerApprovalFlow(
  //     geographyMappingPage,
  //     releaseEvaluationPage,
  //     geographyNamingPage,
  //     finalReviewPage
  //   );
  // });

  test('Complete ccc flow', async ({ homePage, geographyMainPage, geographyCreationPage, geographyMappingPage, releaseEvaluationPage, geographyNamingPage, finalReviewPage }) => {
    const options = buildManufacturerOptions({
      flowType: 'ccc',
      name: generateTestData.geographyName('ManufacturerSet'),
      geographyName: generateTestData.geographyName('ManufacturerGeo')
    });

    await openManufacturerGeography(homePage, geographyMainPage, "manufacturer");
    const result = await setupManufacturerFlow(geographyCreationPage, options);
    expect(result.actualGeographyType).not.toBe('Unknown');
    expect(result.actualCreationMethod).not.toBe('Unknown');

    await completeManufacturerGeographyCreation(geographyCreationPage, options);
    expect(await geographyCreationPage.verifySuccessMessage(testData.geography.messages.GeographyApproved)).toBe(true);

    await completeCCCManufacturerApprovalFlow(
      geographyMappingPage,
      releaseEvaluationPage,
      geographyNamingPage,
      finalReviewPage
    );
  });
});
