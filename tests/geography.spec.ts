import { test, expect } from '../fixtures/appFixtures';
import { GeographyCreationPage } from '../pages/geographyCreationPage';
import { GeographyMainPage } from '../pages/geographyMainPage';
import { HomePage } from '../pages/homePage';
import { testData, generateTestData } from '../utils/testData';

async function openRetailerGeography(homePage: HomePage, geographyMainPage: GeographyMainPage) {
  await homePage.goto();
  await homePage.openGeography();
  await geographyMainPage.openProfileSearch();
  await geographyMainPage.searchProfile(testData.search.profiles.retailer);
  await geographyMainPage.selectProfile(1); 
  await geographyMainPage.clickCreateNewGeographySet();
}

async function completeRetailerGeographyCreation(geographyCreationPage: GeographyCreationPage) {
  // await geographyCreationPage.validateProfileData();
  await geographyCreationPage.clickSelect();
  await geographyCreationPage.selectState(testData.geography.states.california);
  await geographyCreationPage.fillGeographyName(testData.geography.names.california);
  await geographyCreationPage.moveAllStoresToTarget();
  await geographyCreationPage.clickCreateGeography();
  await geographyCreationPage.clickSave();
  await geographyCreationPage.clickReview();
  await geographyCreationPage.approveRmaDefinition();
  await geographyCreationPage.approveCrmaDefinition();
}

test.setTimeout(180000);

test.describe('Geography creation flows for retailer profile', () => {
  test('creates a new geography set with valid details for retailer profiles', async ({ homePage, geographyMainPage, geographyCreationPage }) => {
    const geographySetName = generateTestData.geographyName('AutoGeo_Create');
    await openRetailerGeography(homePage, geographyMainPage);
    await geographyCreationPage.fillGeographySetDetails({
      name: geographySetName,
      version: testData.geography.versions.v50,
      summary: testData.geography.summaries.test,
      previousSet: testData.geography.previousSets.none,
      notes: testData.geography.notes.test
    });
    console.log(geographySetName);
    await geographyCreationPage.selectDeliverable(testData.geography.deliverables.manufacturerUse);
    await geographyCreationPage.clickContinue();
    expect(await geographyCreationPage.isReviewTitleVisible()).toBe(true);
  });

  test('completes geography creation with valid details for retailer profile', async ({ homePage, geographyMainPage, geographyCreationPage }) => {
    const geographySetName = generateTestData.geographyName('AutoGeo_Complete');
    await openRetailerGeography(homePage, geographyMainPage);
    await geographyCreationPage.fillGeographySetDetails({
      name: geographySetName,
      version: testData.geography.versions.v50,
      summary: testData.geography.summaries.test,
      previousSet: testData.geography.previousSets.none,
      notes: testData.geography.notes.test
    });
    await geographyCreationPage.selectDeliverable(testData.geography.deliverables.manufacturerUse);
    await geographyCreationPage.clickContinue();
    await completeRetailerGeographyCreation(geographyCreationPage);
    expect(await geographyCreationPage.verifySuccessMessage(testData.geography.messages.crmaApproved)).toBe(true);
  });

  test('approves geography mapping for retailer profiles', async ({ homePage, geographyMainPage, geographyCreationPage, geographyMappingPage }) => {
    const geographySetName = generateTestData.geographyName('AutoGeo_Mapping');
    await openRetailerGeography(homePage, geographyMainPage);
    await geographyCreationPage.fillGeographySetDetails({
      name: geographySetName,
      version: testData.geography.versions.v50,
      summary: testData.geography.summaries.test,
      previousSet: testData.geography.previousSets.none,
      notes: testData.geography.notes.test
    });
    await geographyCreationPage.selectDeliverable(testData.geography.deliverables.manufacturerUse);
    await geographyCreationPage.clickContinue();
    await completeRetailerGeographyCreation(geographyCreationPage);
    expect(await geographyMappingPage.isMappingScreenDisplayed()).toBe(true);
    // await geographyMappingPage.validateProfileData();
    await geographyMappingPage.clickSave();
    expect(await geographyMappingPage.verifySaveSuccess(testData.geography.messages.mappingSaved)).toBe(true);
    await geographyMappingPage.approveMappingWorkflow();
    expect(await geographyMappingPage.verifyApprovalSuccess(testData.geography.messages.mappingApproved)).toBe(true);
  });

  test('approves release evaluation for retailer profile', async ({ homePage, geographyMainPage, geographyCreationPage, geographyMappingPage, releaseEvaluationPage }) => {
    const geographySetName = generateTestData.geographyName('AutoGeo_Release');
    await openRetailerGeography(homePage, geographyMainPage);
    await geographyCreationPage.fillGeographySetDetails({
      name: geographySetName,
      version: testData.geography.versions.v50,
      summary: testData.geography.summaries.test,
      previousSet: testData.geography.previousSets.none,
      notes: testData.geography.notes.test
    });
    await geographyCreationPage.selectDeliverable(testData.geography.deliverables.manufacturerUse);
    await geographyCreationPage.clickContinue();
    await completeRetailerGeographyCreation(geographyCreationPage);
    await geographyMappingPage.clickSave();
    await geographyMappingPage.approveMappingWorkflow();
    expect(await releaseEvaluationPage.isReleaseEvaluationDisplayed()).toBe(true);
    //  await releaseEvaluationPage.validateProfileData();
    await releaseEvaluationPage.clickSave();
    expect(await releaseEvaluationPage.verifySaveSuccess(testData.geography.messages.releaseSaved)).toBe(true);
    await releaseEvaluationPage.clickApprove();
    await releaseEvaluationPage.clickConfirm();
    expect(await releaseEvaluationPage.verifyApprovalSuccess(testData.geography.messages.releaseApproved)).toBe(true);
  });

  test('approves geography naming for retailer profile', async ({ homePage, geographyMainPage, geographyCreationPage, geographyMappingPage, releaseEvaluationPage, geographyNamingPage }) => {
    const geographySetName = generateTestData.geographyName('AutoGeo_Naming');
    await openRetailerGeography(homePage, geographyMainPage);
    await geographyCreationPage.fillGeographySetDetails({
      name: geographySetName,
      version: testData.geography.versions.v50,
      summary: testData.geography.summaries.test,
      previousSet: testData.geography.previousSets.none,
      notes: testData.geography.notes.test
    });
    await geographyCreationPage.selectDeliverable(testData.geography.deliverables.manufacturerUse);
    await geographyCreationPage.clickContinue();
    await completeRetailerGeographyCreation(geographyCreationPage);
    await geographyMappingPage.clickSave();
    await geographyMappingPage.approveMappingWorkflow();
    await releaseEvaluationPage.clickSave();
    await releaseEvaluationPage.clickApprove();
    await releaseEvaluationPage.clickConfirm();
    expect(await geographyNamingPage.isGeographyNamingDisplayed()).toBe(true);
    // await geographyNamingPage.validateProfileData();
    await geographyNamingPage.clickApprove();
    await geographyNamingPage.clickConfirm();
    expect(await geographyNamingPage.verifyApprovalSuccess(testData.geography.messages.namingApproved)).toBe(true);
  });

  test('final submit geography creation for retailer profile', async ({ homePage, geographyMainPage, geographyCreationPage, geographyMappingPage, releaseEvaluationPage, geographyNamingPage, finalReviewPage }) => {
    const geographySetName = generateTestData.geographyName('AutoGeo_FinalSubmit');
    await openRetailerGeography(homePage, geographyMainPage);
    await geographyCreationPage.fillGeographySetDetails({
      name: geographySetName,
      version: testData.geography.versions.v50,
      summary: testData.geography.summaries.test,
      previousSet: testData.geography.previousSets.none,
      notes: testData.geography.notes.test
    });
    await geographyCreationPage.selectDeliverable(testData.geography.deliverables.manufacturerUse);
    await geographyCreationPage.clickContinue();
    await completeRetailerGeographyCreation(geographyCreationPage);
    await geographyMappingPage.clickSave();
    await geographyMappingPage.approveMappingWorkflow();
    await releaseEvaluationPage.clickSave();
    await releaseEvaluationPage.clickApprove();
    await releaseEvaluationPage.clickConfirm();
    await geographyNamingPage.clickApprove();
    await geographyNamingPage.clickConfirm();
    await finalReviewPage.clickReviewAndApproveAll();
    await finalReviewPage.clickFinalSubmit();
    await finalReviewPage.confirmFinalSubmission();
    expect(await finalReviewPage.isFinalReportVisible()).toBe(true);
  });
});
