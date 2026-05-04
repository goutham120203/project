import { expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { GeographyCreationPage, GeographySetDetails } from '../pages/geographyCreationPage';
import { GeographyMainPage } from '../pages/geographyMainPage';
import { GeographyMappingPage } from '../pages/geographyMappingPage';
import { ReleaseEvaluationPage } from '../pages/releaseEvaluationPage';
import { GeographyNamingPage } from '../pages/geographyNamingPage';
import { FinalReviewPage } from '../pages/finalReviewPage';
import { testData } from '../utils/testData';

export type ManufacturerFlowType = 'A' | 'B' | 'C' | 'AUTO';

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

  const preferredGeographyType = options.geographyType;
  const preferredCreationMethod = options.creationMethod;

  const typeDialog = await geographyCreationPage.findDialogByTitle(/Select Geography Type/i, 3000);
  if (typeDialog) {
    popupHandled = true;
    if (preferredGeographyType) {
      const selected = await geographyCreationPage.chooseGeographyType(preferredGeographyType);
      actualGeographyType = selected ? preferredGeographyType : await geographyCreationPage.chooseAvailableGeographyType(preferredGeographyType);
    } else {
      actualGeographyType = await geographyCreationPage.chooseAvailableGeographyType();
    }
  } else {
    actualGeographyType = preferredGeographyType ?? 'Custom Region';
  }

  const methodDialog = await geographyCreationPage.findDialogByTitle(/Select Geography Creation Method/i, 3000);
  if (methodDialog) {
    popupHandled = true;
    if (preferredCreationMethod) {
      const selected = await geographyCreationPage.chooseCreationMethod(preferredCreationMethod);
      actualCreationMethod = selected ? preferredCreationMethod : await geographyCreationPage.chooseAvailableCreationMethod(preferredCreationMethod);
    } else {
      actualCreationMethod = await geographyCreationPage.chooseAvailableCreationMethod();
    }
  } else {
    actualCreationMethod = preferredCreationMethod ?? 'FIPS Code';
  }

  await geographyCreationPage.waitForCreationForm();
  await geographyCreationPage.fillGeographySetDetails(options);
  await geographyCreationPage.selectDeliverable(options.deliverable);
  await geographyCreationPage.clickContinue();

  const confirmationPopupHandled = await geographyCreationPage.handlePopupAction('Continue', /ZIP Code|ZIP|FIPS Code|FIPS|Custom Census Chain|CCC|Confirmation/i);
  popupHandled = popupHandled || confirmationPopupHandled;

  return {
    popupHandled,
    actualGeographyType,
    actualCreationMethod
  };
}

export async function completeManufacturerApprovalFlow(
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

export async function completeManufacturerGeographyCreation(
  geographyCreationPage: GeographyCreationPage,
  state: string,
  geographyName: string
): Promise<void> {
  await geographyCreationPage.clickSelect();
  await geographyCreationPage.selectState(state);
  await geographyCreationPage.fillGeographyName(geographyName);
  await geographyCreationPage.moveAllStoresToTarget();
  await geographyCreationPage.clickCreateGeography();
  await geographyCreationPage.clickSave();
  await geographyCreationPage.clickReview();
}
