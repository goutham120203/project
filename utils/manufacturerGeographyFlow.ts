import { expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { GeographyCreationPage, GeographySetDetails } from '../pages/geographyCreationPage';
import { GeographyMainPage } from '../pages/geographyMainPage';
import { GeographyMappingPage } from '../pages/geographyMappingPage';
import { ReleaseEvaluationPage } from '../pages/releaseEvaluationPage';
import { GeographyNamingPage } from '../pages/geographyNamingPage';
import { FinalReviewPage } from '../pages/finalReviewPage';
import { testData } from '../utils/testData';

export type ManufacturerFlowType = 'custom' | 'ccc';

export interface ManufacturerGeographyOptions extends GeographySetDetails {
  profileName: string;
  flowType?: ManufacturerFlowType;
  geographyType?: 'Custom Region' | 'Custom Census Chain (CCC)';
  creationMethod?: 'FIPS Code' | 'ZIP Code';
  state: string;
  geographyName: string;
  deliverable: string;
}

export interface ManufacturerFlowResult {
  popupHandled: boolean;
  actualGeographyType: 'Custom Region' | 'Custom Census Chain (CCC)' | 'Unknown';
  actualCreationMethod: 'FIPS Code' | 'ZIP Code' | 'Unknown';
}

export async function openManufacturerGeography(
  homePage: HomePage,
  geographyMainPage: GeographyMainPage,
  profileName?: string
): Promise<void> {
  await homePage.goto();
  await homePage.openGeography();
  await geographyMainPage.openProfileSearch();

  if (profileName) {
    await geographyMainPage.searchProfile(profileName);
    await geographyMainPage.selectProfileByName(profileName);
  } else {
    await geographyMainPage.searchProfile('manufacture');
    await geographyMainPage.selectFirstProfile();
  }

  await geographyMainPage.clickCreateNewGeographySet();
}

export async function setupManufacturerFlow(
  geographyCreationPage: GeographyCreationPage,
  options: ManufacturerGeographyOptions
): Promise<ManufacturerFlowResult> {
  let actualGeographyType: ManufacturerFlowResult['actualGeographyType'] = 'Unknown';
  let actualCreationMethod: ManufacturerFlowResult['actualCreationMethod'] = 'Unknown';
  let popupHandled = false;

  const preferredGeographyType =
    options.flowType === 'custom'
      ? 'Custom Region'
      : 'Custom Census Chain (CCC)';
  

  const typeDialog = await geographyCreationPage.findDialogByTitle(/Select Geography Type/i, 3000);
  if (typeDialog) {
    popupHandled = true;
    const selected =
      await geographyCreationPage.chooseGeographyType(
        preferredGeographyType
      );

     actualGeographyType = selected
      ? preferredGeographyType
      : await geographyCreationPage.chooseAvailableGeographyType();

    } else {
      actualGeographyType = preferredGeographyType;
    }



  await geographyCreationPage.waitForCreationForm();
  const pageGeographyType = await geographyCreationPage.getSelectedGeographyType().catch(() => 'Unknown');
  if (pageGeographyType === 'Custom Region' || pageGeographyType === 'Custom Census Chain (CCC)') {
    actualGeographyType = pageGeographyType;
  }
  
  await geographyCreationPage.fillGeographySetDetails(options);
  await geographyCreationPage.selectfirstOutlet(options);
  await geographyCreationPage.clickContinue();



  const methodDialog = await geographyCreationPage.findDialogByTitle(/Select Geography Creation Method/i, 3000);
  if (methodDialog) {
    popupHandled = true;

    const preferredCreationMethod = options.creationMethod === 'ZIP Code' ? 'ZIP Code' : 'FIPS Code';
    const selected = await geographyCreationPage.chooseCreationMethod(preferredCreationMethod);

    actualCreationMethod = selected
      ? preferredCreationMethod
      : await geographyCreationPage.chooseAvailableCreationMethod();
  } else {
    // No creation method dialog appeared; continue with the provided selection if available.
    actualCreationMethod = options.creationMethod ?? 'Unknown';
    console.log(`[setupManufacturerFlow] no creation method popup detected, using fallback: ${actualCreationMethod}`);
  }

  return {
    popupHandled,
    actualGeographyType,
    actualCreationMethod
  };
}

export async function completeCustomManufacturerApprovalFlow(
  geographyMappingPage: GeographyMappingPage,
  releaseEvaluationPage: ReleaseEvaluationPage,
  geographyNamingPage: GeographyNamingPage,
  finalReviewPage: FinalReviewPage
): Promise<void> {
  await geographyMappingPage.clickSave();
  expect(await geographyMappingPage.verifySaveSuccess(testData.geography.messages.mappingSaved)).toBe(true);
  await geographyMappingPage.approveMappingWorkflow();
  expect(await geographyMappingPage.verifyApprovalSuccess(testData.geography.messages.mappingApproved)).toBe(true);

  await releaseEvaluationPage.clickSave();
  expect(await releaseEvaluationPage.verifySaveSuccess(testData.geography.messages.releaseSaved)).toBe(true);
  await releaseEvaluationPage.clickApprove();
  await releaseEvaluationPage.clickConfirm();
  expect(await releaseEvaluationPage.verifyApprovalSuccess(testData.geography.messages.releaseApproved)).toBe(true);

  await geographyNamingPage.clickApprove();
  await geographyNamingPage.clickConfirm();
  expect(await geographyNamingPage.verifyApprovalSuccess(testData.geography.messages.namingApproved)).toBe(true);

  await finalReviewPage.clickReviewAndApproveAll();
  await finalReviewPage.clickFinalSubmit();
  await finalReviewPage.confirmFinalSubmission();
  expect(await finalReviewPage.isFinalReportVisible()).toBe(true);
}

export async function completeCCCManufacturerApprovalFlow(
  geographyMappingPage: GeographyMappingPage,
  releaseEvaluationPage: ReleaseEvaluationPage,
  geographyNamingPage: GeographyNamingPage,
  finalReviewPage: FinalReviewPage
): Promise<void> {
  
  await releaseEvaluationPage.clickSave();
  expect(await releaseEvaluationPage.verifySaveSuccess(testData.geography.messages.releaseSaved)).toBe(true);
  await releaseEvaluationPage.clickApprove();
  await releaseEvaluationPage.clickConfirm();
  expect(await releaseEvaluationPage.verifyApprovalSuccess(testData.geography.messages.releaseApproveCCC)).toBe(true);

  await geographyMappingPage.clickSave();
  expect(await geographyMappingPage.verifySaveSuccess(testData.geography.messages.mappingSaved)).toBe(true);
  await geographyMappingPage.approveMappingWorkflow();
  expect(await geographyMappingPage.verifyApprovalSuccess(testData.geography.messages.mappingApproved)).toBe(true);

  await geographyNamingPage.clickApprove();
  await geographyNamingPage.clickConfirm();
  expect(await geographyNamingPage.verifyApprovalSuccess(testData.geography.messages.namingApproved)).toBe(true);

  await finalReviewPage.clickReviewAndApproveAll();
  await finalReviewPage.clickFinalSubmit();
  await finalReviewPage.confirmFinalSubmission();
  expect(await finalReviewPage.isFinalReportVisible()).toBe(true);
}

export async function completeManufacturerGeographyCreation(
  geographyCreationPage: GeographyCreationPage,
  options: ManufacturerGeographyOptions
): Promise<void> {
  const preferredGeographyType =
    options.flowType === 'custom'
      ? 'Custom Region'
      : options.flowType === 'ccc'
        ? 'Custom Census Chain (CCC)'
        : options.geographyType;

  await geographyCreationPage.clickSelect();
  await geographyCreationPage.selectState(options.state);
  await geographyCreationPage.fillGeographyName(options.geographyName);
  await geographyCreationPage.moveAllStoresToTarget();
  await geographyCreationPage.clickCreateGeography();

  if (preferredGeographyType) {
    await geographyCreationPage.chooseGeographyTypeIfVisible(preferredGeographyType);
  } else {
    await geographyCreationPage.chooseGeographyTypeIfVisible();
  }

  await geographyCreationPage.clickSave();
  await geographyCreationPage.clickReview();
  await geographyCreationPage.clickApprove();
  await geographyCreationPage.clickConfirm();

}
