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
  completeManufacturerApprovalFlow
} from '../utils/manufacturerGeographyFlow';

test.setTimeout(60000);

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

  if (result.flowType === 'AUTO') {
    delete result.geographyType;
    delete result.creationMethod;
  }

  return result;
}

test.describe('Manufacturer geography flow', () => {
  test('Complete manufacture flow', async ({ homePage, geographyMainPage, geographyCreationPage, geographyMappingPage, releaseEvaluationPage, geographyNamingPage, finalReviewPage }) => {
    const options = buildManufacturerOptions({
      flowType: 'AUTO',
      name: generateTestData.geographyName('ManufacturerSet'),
      geographyName: generateTestData.geographyName('ManufacturerGeo')
    });

    await openManufacturerGeography(homePage, geographyMainPage);
    const result = await setupManufacturerFlow(geographyCreationPage, options);
    expect(result.actualGeographyType).not.toBe('Unknown');
    expect(result.actualCreationMethod).not.toBe('Unknown');

    await completeManufacturerGeographyCreation(geographyCreationPage, options.state, options.geographyName);
    expect(await geographyCreationPage.verifySuccessMessage(testData.geography.messages.crmaApproved)).toBe(true);

    await completeManufacturerApprovalFlow(
      geographyMappingPage,
      releaseEvaluationPage,
      geographyNamingPage,
      finalReviewPage
    );
  });
});
