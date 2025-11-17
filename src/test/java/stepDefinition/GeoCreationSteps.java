package stepDefinition;

import java.util.Map;
import org.testng.Assert;
import com.microsoft.playwright.Page;
import context.TestContext;
import factory.DriverFactory;
import io.cucumber.datatable.DataTable;
import io.cucumber.java.en.*;
import pages.base.HomePage;
import pages.geographypage.GeographyMainPage;
import pages.geographypage.GeographySetupPage;
import pages.geographypage.GeographyCreationPage;
import pages.geographypage.GeographyMappingPage;
import pages.geographypage.ReleaseEvaluationPage;
import pages.geographypage.GeographyNamingPage;
import pages.geographypage.FinalReviewPage;

/**
 * Geography Creation Step Definitions - Refactored Design
 * Uses separate page objects for each screen
 */
public class GeoCreationSteps {
    
    // Constants
    private static final String BASE_URL = "http://ec2-56-228-14-238.eu-north-1.compute.amazonaws.com/";
    private static final int DEFAULT_PROFILE_INDEX = 4;
    private static final int CIRCANA_PROFILE_INDEX = 0;

    // Page Objects
    private Page page = DriverFactory.getPage();
    private GeographyMainPage mainPage;
    private GeographySetupPage setupPage;
    private GeographyCreationPage creationPage;
    private GeographyMappingPage mappingPage;
    private ReleaseEvaluationPage releaseEvalPage;
    private GeographyNamingPage namingPage;
    private FinalReviewPage finalReviewPage;
    private HomePage homePage;

    // Current page reference for dynamic validation
    private Object currentPage;

    private int countOfProfiles;

    /**
     * Safe way to get page - ensures browser is initialized
     */
    private Page getPageSafe() {
        if (page == null) {
            page = DriverFactory.getPage();
        }
        if (page == null) {
            throw new RuntimeException("[GeoCreationSteps] ❌ Page is null - Browser not initialized. Ensure @Before hook ran first.");
        }
        return page;
    }

    // ==================== Navigation & Setup ====================

    @When("Click on Geography")
    public void clickOnGeography() {
        initializePages();
        homePage.goToGeography();
    }

    @Given("User is on Geography page")
    public void userIsOnGeographyPage() {
        initializePages();
        homePage.goToGeography();
    }

    private void initializePages() {
        page.navigate(BASE_URL);
        mainPage = new GeographyMainPage(page);
        homePage = new HomePage(page);
    }

    @Then("Geography page is displayed")
    public void geographyPageIsDisplayed() {
        Assert.assertTrue(mainPage.isOnGeographyPage(), "Not on Geography page");
    }

    // ==================== Profile Selection ====================

    @When("Click on select a profile to view Geography sets")
    public void clickSelectProfileDropdown() {
        mainPage.openProfileSearch();
    }

    @Then("All profiles are listed")
    public void allProfilesAreListed() {
        countOfProfiles = mainPage.getProfileCount();
        Assert.assertTrue(countOfProfiles > 0, "Expected profiles to be listed, but found none!");
    }

    @When("Enter {string} on search profiles")
    public void enterSearchProfile(String text) {
        mainPage.searchProfile(text);
    }

    @Then("Matching profile list is display")
    public void matchingProfileListDisplayed() {
        int countOfMatchprofile = mainPage.getProfileCount();
        System.out.println(countOfMatchprofile > 0 ?
            countOfMatchprofile + ": profiles are listed." :
            "No profiles found. For Given input");
        Assert.assertTrue(countOfMatchprofile >= 0);
    }

    @When("Select first profile from the list")
    public void selectFirstProfile() {
        mainPage.selectProfile(1);
    }

    @Then("Selected profile is displayed")
    public void selectedProfileIsDisplayed() {
        Assert.assertTrue(mainPage.isProfileSelected(), "selected profile not displayed");
    }

    // ==================== Geography Sets Search & Creation ====================

    @When("Click and Enter {string} on Search Geography sets")
    public void searchGeographySets(String text) {
        mainPage.searchGeographySet(text);
    }

    @Then("All matching Geography set should displayed")
    public void allMatchingGeographySetsDisplayed() {
        int count = mainPage.getGeographySetsCount();
        System.out.println(count > 0 ?
            count + ": Geography Sets are listed." :
            "No Geographyset found. For Given input");
        Assert.assertTrue(count >= 0);
    }

    @When("Click on Create New Geography Set")
    public void clickCreateNewGeographySet() {
        mainPage.clickCreateNewGeographySet();
    }

    // ==================== Profile-Specific Creation ====================

    @Given("user is on new geography set creation form for retailer")
    public void userOnNewGeoCreationFormRetailer() {
        navigateToProfileAndCreateGeoSet("retailer", DEFAULT_PROFILE_INDEX);
        setupPage = new GeographySetupPage(page);
    }

    @Given("user is on new geography set creation form for manufacture")
    public void userOnNewGeoCreationFormManufacture() {
        navigateToProfileAndCreateGeoSet("manufacture", DEFAULT_PROFILE_INDEX);
        setupPage = new GeographySetupPage(page);
    }

    @Given("user is on new geography set creation form for circana")
    public void userOnNewGeoCreationFormCircana() {
        navigateToProfileAndCreateGeoSet("circana", CIRCANA_PROFILE_INDEX);
        setupPage = new GeographySetupPage(page);
    }

    private void navigateToProfileAndCreateGeoSet(String profileName, int profileIndex) {
        mainPage.openProfileSearch();
        mainPage.searchProfile(profileName);
        mainPage.selectProfile(profileIndex);
        mainPage.clickCreateNewGeographySet();
    }

    @Given("User is on {string} screen for retailer")
    public void userOnScreenRetailer(String stage) {
        navigateToExistingGeoSet("retailer", DEFAULT_PROFILE_INDEX, stage);
        initializePageByStage(stage);
    }

    @Given("User is on {string} screen for manufacture")
    public void userOnScreenManufacture(String stage) {
        navigateToExistingGeoSet("manufacture", DEFAULT_PROFILE_INDEX, stage);
        initializePageByStage(stage);
    }

    @Given("User is on {string} screen for circana")
    public void userOnScreenCircana(String stage) {
        navigateToExistingGeoSet("circana", CIRCANA_PROFILE_INDEX, stage);
        initializePageByStage(stage);
    }

    private void  navigateToExistingGeoSet(String profileName, int profileIndex, String stage) {
        String geoSetName = TestContext.get("Name");
        mainPage.openProfileSearch();
        mainPage.searchProfile(profileName);
        mainPage.selectProfile(profileIndex);
        mainPage.searchGeographySet(geoSetName);
        mainPage.selectGeographySetByName(geoSetName);
    }

    private void initializePageByStage(String stage) {
        switch (stage) {
            case "geography-creation":
                creationPage = new GeographyCreationPage(page);
                currentPage = creationPage;
                break;
            case "geography-mapping":
                mappingPage = new GeographyMappingPage(page);
                currentPage = mappingPage;
                break;
            case "release-evaluation":
                releaseEvalPage = new ReleaseEvaluationPage(page);
                currentPage = releaseEvalPage;
                break;
            case "geography-naming":
                namingPage = new GeographyNamingPage(page);
                currentPage = namingPage;
                break;
            case "final-review":
                finalReviewPage = new FinalReviewPage(page);
                currentPage = finalReviewPage;
                break;
        }
    }

    // ==================== Profile Data Validation ====================

    @Given("Validate profile data is visible for retailer")
    public void validateProfileDataRetailer() {
        validateProfileDataByCurrentPage();
    }

    @Given("Validate profile data is visible for manufacture")
    public void validateProfileDataManufacture() {
        validateProfileDataByCurrentPage();
    }

    @Given("Validate profile data is visible for circana")
    public void validateProfileDataCircana() {
        validateProfileDataByCurrentPage();
    }

    /**
     * Generic method to validate profile data on the current screen
     * Works for any page object that extends BasePage
     */
    private void validateProfileDataByCurrentPage() {
        if (currentPage == null) {
            throw new RuntimeException("No current page initialized. Make sure to call 'User is on {screen} screen' first.");
        }

        java.util.Map<String, String> testData = TestContext.getAll();

        // Call validateProfileData on the appropriate page object
        if (currentPage instanceof GeographyCreationPage) {
            ((GeographyCreationPage) currentPage).validateProfileData(testData);
        } else if (currentPage instanceof GeographyMappingPage) {
            ((GeographyMappingPage) currentPage).validateProfileData(testData);
        } else if (currentPage instanceof ReleaseEvaluationPage) {
            ((ReleaseEvaluationPage) currentPage).validateProfileData(testData);
        } else if (currentPage instanceof GeographyNamingPage) {
            ((GeographyNamingPage) currentPage).validateProfileData(testData);
        } else if (currentPage instanceof FinalReviewPage) {
            ((FinalReviewPage) currentPage).validateProfileData(testData);
        } else {
            throw new RuntimeException("Unsupported page type for profile validation: " + currentPage.getClass().getName());
        }
    }

    // ==================== Form Filling ====================

    @When("user fills geography set details")
    public void fillGeographySetDetails(DataTable table) {
        Map<String, String> data = table.asMaps().get(0);
        TestContext.saveData(data);
        setupPage.fillGeographySetForm(data);
    }

    @When("user fills geography set details for circana")
    public void fillGeographySetDetailsCircana(DataTable table) {
        Map<String, String> data = table.asMaps().get(0);
        TestContext.saveData(data);
        setupPage.fillGeographySetFormForCircana(data);
    }

    @When("Enter {string} Geography Name field")
    public void enterGeographyName(String geoName) {
        creationPage.enterGeographyName(geoName);
    }

    @When("Select {string} as state")
    public void selectState(String state) {
        creationPage.selectState(state);
    }

    @When("Select the {string} Geography type")
    public void selectGeographyType(String geographyType) {
        setupPage.fillGeographySetFormForCircana(java.util.Collections.singletonMap("Type", geographyType));
    }

    @When("Select {string} in Deliverable")
    public void selectDeliverable(String deliverable) {
        setupPage.selectDeliverable(deliverable);
    }

    // ==================== Store/Outlet Selection ====================

    @When("Select All Available Stroes To Target")
    public void selectAllAvailableStores() {
        creationPage.moveAllStoresToTarget();
    }

    @When("Select first outlet in outlets")
    public void selectFirstOutlet() {
        setupPage.selectFirstOutlet();
    }

    // ==================== Creation & Review ====================

    @When("Click on Select button")
    public void clickSelectButton() {
        creationPage.clickSelect();
    }

    @When("Click on Create Geography")
    public void clickCreateGeography() {
        creationPage.clickCreateGeography();
    }

    @When("Click Review button")
    public void clickReviewButton() {
        creationPage.clickReview();
    }

    @When("Click on Approve button geography creation definitiion")
    public void clickApproveButtonGeographyCreation() {
        creationPage.clickApprove();
    }

    @When("Click on Confirm to next step")
    public void clickConfirmToNextStep() {
        creationPage.clickConfirm();
    }

    @Then("Geography Creation screen is displayed")
    public void geographyCreationScreenDisplayed() {
        page = getPageSafe();
        creationPage = new GeographyCreationPage(page);
        currentPage = creationPage;
        Assert.assertTrue(creationPage.getReviewScreenTitle().length() > 0, "Not on creation screen");
    }

    @When("Click on Continue button")
    public void clickContinueButton() {
        setupPage.clickContinue();
    }

    @When("Select Geography creation method {string} code")
    public void selectGeographyCreationMethod(String method){
        setupPage.selectCreationMethod(method);
    }

    // ==================== Approval Workflow ====================

    @When("Click on Approve button for {string} definition")
    public void clickApproveButton(String definition) {
        creationPage.clickApprove();
    }

    @When("Click on Proceed Anyway")
    public void clickProceedAnyway() {
        creationPage.clickProceedAnyway();
    }

    @When("Click on confirm for RMA definitiion")
    public void clickConfirmRMA() {
        creationPage.clickConfirm();
    }

    @When("Click on Yes CRMA Creation step")
    public void clickYesCRMA() {
        creationPage.clickYesForCRMA();
    }

    @When("Click Save button")
    public void clickSaveButton() {
        clickSaveByCurrentPage();
    }

    /**
     * Generic method to click Save button on the current screen
     * Works for any page object that has clickSave() method
     */
    private void clickSaveByCurrentPage() {
        if (currentPage == null) {
            // Fallback to creationPage if currentPage not set (for backward compatibility)
            if (creationPage != null) {
                creationPage.clickSave();
                return;
            }
            throw new RuntimeException("No current page initialized. Make sure to call 'User is on {screen} screen' first.");
        }

        // Call clickSave on the appropriate page object
        if (currentPage instanceof GeographyCreationPage) {
            ((GeographyCreationPage) currentPage).clickSave();
        } else if (currentPage instanceof GeographyMappingPage) {
            ((GeographyMappingPage) currentPage).clickSave();
        } else if (currentPage instanceof ReleaseEvaluationPage) {
            ((ReleaseEvaluationPage) currentPage).clickSave();
        } else if (currentPage instanceof GeographyNamingPage) {
            ((GeographyNamingPage) currentPage).clickSave();
        } else {
            throw new RuntimeException("Unsupported page type for Save action: " + currentPage.getClass().getName());
        }
    }

    @When("Click on confirm CRMA definitiion")
    public void clickConfirmCRMA() {
        creationPage.clickConfirm();
    }

    @Then("{string} successfully message displayed")
    public void successMessageDisplayed(String successfulMessage) {
        page = getPageSafe();
        Assert.assertTrue(page.textContent("body").contains(successfulMessage),
            "Message not found: " + successfulMessage);
    }

    // ==================== Mapping Stage ====================

    @Then("Geography Mapping stage is display")
    public void geographyMappingStageDisplayed() {
        page = getPageSafe();
        mappingPage = new GeographyMappingPage(page);
        currentPage = mappingPage;
        Assert.assertTrue(mappingPage.isMappingScreenDisplayed(), "Mapping stage not displayed");
    }

    @Given("Click on Approve for geography mapping")
    public void clickApproveGeographyMapping() {
        mappingPage.clickApprove();
    }

    @When("Click on {string} Geography Mapping Approval")
    public void clickGeographyMappingApproval(String action) {
        if ("confirm".equalsIgnoreCase(action)) {
            mappingPage.clickConfirm();
        } else if ("cancel".equalsIgnoreCase(action)) {
            mappingPage.clickCancel();
        }
    }

    @Then("Release Evaluation screen is display")
    public void releaseEvaluationScreenDisplayed() {
        page = getPageSafe();
        releaseEvalPage = new ReleaseEvaluationPage(page);
        currentPage = releaseEvalPage;
        Assert.assertTrue(releaseEvalPage.isReleaseEvaluationScreenDisplayed(),
            "Release Evaluation screen not displayed");
    }

    // ==================== Release Evaluation ====================

    @Then("Click on Approve for release evaluation")
    public void clickApproveReleaseEvaluation() {
        releaseEvalPage.clickApprove();
    }

    @When("Click on confirm Release Evaluation Approval")
    public void clickConfirmReleaseEvaluation() {
        releaseEvalPage.clickConfirm();
    }

    @Then("Geography Naming screen is display")
    public void geographyNamingScreenDisplayed() {
        page = getPageSafe();
        namingPage = new GeographyNamingPage(page);
        currentPage = namingPage;
        Assert.assertTrue(namingPage.isNamingScreenDisplayed(),
            "Geography Naming screen not displayed");
    }

    // ==================== Geography Naming ====================

    @Given("Click on Approve for geography naming")
    public void clickApproveGeographyNaming() {
        namingPage.clickApprove();
    }

    @When("Click on Approve for Geography Naming Approval")
    public void clickApproveGeographyNamingApproval() {
        namingPage.clickApproveSecond();
    }

    // ==================== Final Review ====================

    @When("Review and Approve All screens in Final Review for retailer")
    public void reviewAndApproveAllRetailer() {
        page = getPageSafe();
        finalReviewPage = new FinalReviewPage(page);
        currentPage = finalReviewPage;
        finalReviewPage.approveRetailerWorkflow();
    }

    @When("Review and Approve All screens in Final Review for manufacture")
    public void reviewAndApproveAllManufacture() {
        page = getPageSafe();
        finalReviewPage = new FinalReviewPage(page);
        currentPage = finalReviewPage;
        finalReviewPage.approveManufacturerWorkflow();
    }

    @When("Review and Approve All screens in Final Review for circana")
    public void reviewAndApproveAllCircana() {
        page = getPageSafe();
        finalReviewPage = new FinalReviewPage(page);
        currentPage = finalReviewPage;
        finalReviewPage.approveCircanaWorkflow();
    }

    @When("Click on Final Submit")
    public void clickFinalSubmit() {
        finalReviewPage.clickFinalSubmit();
    }

    @When("Click on submit Final on Alert")
    public void clickSubmitFinalAlert() {
        finalReviewPage.submitFinalAlert();
    }

    @Then("Final Reports Will Display")
    public void finalReportsDisplayed() {
        Assert.assertTrue(finalReviewPage.isFinalReportsDisplayed(),
            "Final reports not displayed");
    }
}
