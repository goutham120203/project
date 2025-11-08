package stepDefinition;

import java.util.Map;

import org.testng.Assert;

import com.microsoft.playwright.Page;

import context.TestContext;
import factory.DriverFactory;
import io.cucumber.datatable.DataTable;
import io.cucumber.java.en.*;
import pages.base.HomePage;
import pages.geographypage.GeographyPage;

public class GeoCreationSteps {
    private Page page = DriverFactory.getPage();
    private GeographyPage geographyPage;
    private HomePage homePage;

    private int countOfProfiles;
    // private int availableStores;
    // private String geographyName;
    // private static String geographysetNameValue = "testing Geography";   // used for debug of inividual scenario
    // private int selectedStoresCount;
    private int numOfOutletSelected;


    @When("Click on Geography")
    public void Click_on_Geography() {
        page.navigate("http://ec2-56-228-14-238.eu-north-1.compute.amazonaws.com/");
        homePage = new HomePage(page);
        geographyPage = new GeographyPage(page);
        homePage.goToGeography();
    }

    @Then("Geography page is displayed")
    public void Geography_page_is_displayed() {
        Assert.assertTrue(geographyPage.isOnGeographyPage());
    }

    @Given("User is on Geography page")
    public void User_is_on_Geography_page() {
        page.navigate("http://ec2-56-228-14-238.eu-north-1.compute.amazonaws.com/");
        geographyPage = new GeographyPage(page);
        homePage  = new HomePage(page);
        homePage.goToGeography();
    }

    
    @When("Click on select a profile to view Geography sets")
    public void Click_on_select_a_profile_to_view_Geography_sets() {
        geographyPage.clickSearchProfile();
    }

    @Then("All profiles are listed")
    public void All_profiles_are_listed() {
        countOfProfiles = geographyPage.getProfileCount();
        Assert.assertTrue(countOfProfiles > 0, "Expected profiles to be listed, but found none!" );
    }

    @When("Enter {string} on search profiles")
    public void Enter_on_search_profiles(String text) {
        geographyPage.inputSearchProfile(text);
    }

    @Then("Matching profile list is display")
    public void Matching_profile_list_is_display() {
        int countOfMatchprofile = geographyPage.getProfileCount();
        if(countOfMatchprofile > 0){
            System.out.println(countOfMatchprofile+": profiles are listed.");
        } else{
            System.out.println("No profiles found. For Given input");
        }
        Assert.assertTrue(countOfMatchprofile >= 0);
    }

    @When("Select first profile from the list")
    public void Select_the_profile() {
        geographyPage.selectProfiles(1);
    }

    @Then("Selected profile is displayed")
    public void Selected_profile_is_displayed() {
        Assert.assertTrue(geographyPage.isSelectedProfileDisplayed(),"selected profile not displayed");
    }

    @When("Click and Enter {string} on Search Geography sets")
    public void Click_and_Enter_on_Search_Geography_sets(String text) {
        geographyPage.searchGeogeographySets(text);
    }

    @Then("All matching Geography set should displayed")
    public void All_matching_Geography_set_should_displayed() {
        int count = geographyPage.getGeographySetsCount();
        if(count > 0){
            System.out.println(count+": Geography Sets are listed.");
        } else{
            Assert.assertTrue(geographyPage.isSelectedProfileDisplayed());
            System.out.println("No Geographyset found. For Given input");
        }
        Assert.assertTrue(count >= 0);
    }

    @When("Click on Create New Geography Set")
    public void Click_on_Create_New_Geography_Set() {
        geographyPage.clickCreateNewGeographySet();
    }

    @Given("user is on new geography set creation form for retailer")
    public void user_is_on_creation_new_geography_set_for_retailer() {
        geographyPage.clickSearchProfile();
        geographyPage.inputSearchProfile("retailer");
        geographyPage.selectProfiles(3);    // change the value in all screens
        geographyPage.clickCreateNewGeographySet();
    }

    @Given("User is on {string} screen for retailer")
    public void user_is_on_geography_creation_screen_for_retailer(String stage) {

        String geographysetNameValue = TestContext.get("Name");
        geographyPage.clickSearchProfile();
        geographyPage.inputSearchProfile("retailer");
        geographyPage.selectProfiles(3);
        geographyPage.searchGeogeographySets(geographysetNameValue);
        geographyPage.selectCardByClientName(geographysetNameValue);
        Assert.assertTrue(geographyPage.isOnScreen(stage));

    }

    @Given("Validate profile data is visible for retailer")
    public void Validate_profile_data_is_visible_and_verify() {
        geographyPage.validateProfileDataInGeoCreation(TestContext.getAll());
        // geographyPage.validateNoOfOutlets(numOfOutletSelected);
    }

    @When("Click on Select button")
    public void Click_on_Select_button() {
        geographyPage.clickOnSelectButton();
    }

    @When("Select {string} as state")
    public void Select_as_state(String state) {
        geographyPage.selectState(state);
    }

    @When("Enter {string} Geography Name field")
    public void Enter_Geography_Name_field(String geoName) {
        // geographyName = geoName;
        geographyPage.enterGeographyName(geoName);
    }

    @When("Select All Available Stroes To Target")
    public void Select_All_Available_Stroes_To_Target() {
        geographyPage.moveAllstroesToTarget();
    }

    @When("Click on Create Geography")
    public void Click_on_Create_Geography() {
        geographyPage.clickCreateGeography();
    }

    @When("Click on Approve button for {string} definition")
    public void Click_on_Approve_button_for_definitiion(String s) {
        geographyPage.clickApproveButton();
    }

    @When("Click on Proceed Anyway")
    public void Click_on_Proceed_Anyway() {
         geographyPage.clickProceedAnyway();
    }

    @When("Click on confirm for RMA definitiion")
    public void Click_on_confirm_for_RMA_definitiion() {
        geographyPage.clickConfirm();
    }

    @When("Click on Yes CRMA Creation step")
    public void Click_on_confirm_CRMA_Creation_step() {
        geographyPage.clickYesForCRMA();
    }

    @When("Click Save button")
    public void Click_Save_button() {
        geographyPage.clickSaveButton();
    }

    @When("Click on confirm CRMA definitiion")
    public void Click_on_confirm_CRMA_definitiion() {
        geographyPage.clickConfirm();
    }

    @Then("{string} successfully message displayed")
    public void successfull_message_displayed(String successfulMessage) {
        Assert.assertTrue(geographyPage.isSuccessfullMessageDisplayed(successfulMessage));
    }

    @Then("Geography Mapping stage is display")
    public void Geography_Mapping_stage_is_display() {
        Assert.assertTrue(geographyPage.isGeoMappingDisplayed());
    }

    @Given("Validate profile data is visible for circana")
    public void Validate_profile_data_is_visible_for_circana() {
        geographyPage.validateProfileDataInGeoCreation(TestContext.getAll());
    }

    @When("Select the {string} Geography type")
    public void Select_the_Geography_type(String geographyType) {
        geographyPage.selectGeographyType(geographyType);
    }

    @When("user fills geography set details")
    public void user_fills_geography_set_details(DataTable table) {
        Map<String, String> data = table.asMaps().get(0);
            TestContext.saveData(data);
            geographyPage.fillGeoSetForm(data);
    }

    @When("no of outlet selected in retailer")
    public void no_of_outlet_selected_in_retailer() {
       numOfOutletSelected = geographyPage.getCountOfOutletsRetailerProfile();
    }

    @When("Select {string} in Deliverable")
    public void Select_in_Date_Governance(String deliverable) {
        if(deliverable.equalsIgnoreCase("Available for Retailer Only")) {
            geographyPage.selectAvailableForRetailerOnly();
        } else if(deliverable.equalsIgnoreCase("Available for Manufacturer Use")) {
            geographyPage.selectAvailableForManufacturerUse();
        }  
    }

    @When("Click on Continue button")
    public void Click_on_Continue_button() {
        geographyPage.clickContinueButton();
    }

    @Then("Geography Creation screen is displayed")
    public void Geography_Creation_Stage_is_displayed() {
        String stage = "geography-creation";
        Assert.assertTrue(geographyPage.isOnScreen(stage));
    }

    @Given("Click on Approve for geography mapping")
    public void Click_on_Approve_geography_mapping() {
        geographyPage.clickApproveButton();
    }

    @When("Click on {string} Geography Mapping Approval")
    public void Click_on_Geography_Mapping_Approval(String approve) {
        
        if(approve.equalsIgnoreCase("confirm")){
            geographyPage.clickConfirm();
        }else if(approve.equalsIgnoreCase("cancel")){
            geographyPage.clickCancel();
        }    
    }

    @Then("Release Evaluation screen is display")
    public void Release_Evaluation_screen_is_display() {
        Assert.assertTrue(geographyPage.isReleaseEvaluationDisplayed());
    }

    @Then("Click on Approve for release evaluation")
    public void Click_on_Approve_for_release_evaluation() {
        geographyPage.clickApproveButton();
    }

    @When("Click on confirm Release Evaluation Approval")
    public void Click_on_confirm_Release_Evaluation_Approval() {
        geographyPage.clickConfirm();
    }

    @Then("Geography Naming screen is display")
    public void Geography_Naming_screen_is_display() {
        Assert.assertTrue(geographyPage.isGeographyNamingDisplayed());
    }

    @Given("Click on Approve for geography naming")
    public void Click_on_Approve_for_geography_naming() {
        geographyPage.clickApproveButton();
    }

    @When("Click on Approve for Geography Naming Approval")
    public void Click_on_Approve_for_Geography_Naming_Approval() {
        geographyPage.clickApprove();
    }

    @When("Review and Approve All screens in Final Review for retailer")
    public void Review_and_Approve_All_screens_in_Final_Review(){
        geographyPage.approveRmaDefinitionReview();
        geographyPage.approveCrmaDefinitionReview();
        geographyPage.approveGeographyHierarchy();
        geographyPage.approveGeographyMapping();
        geographyPage.approveGeographyNaming();
        geographyPage.approveParentage();
        geographyPage.approveReleaseResults();
        geographyPage.approveChageHighlights();
    }

    @When("Click on Final Submit")
    public void Click_on_Final_Submit() {
        geographyPage.clickFinalSubmit();
    }

    @When("Click on submit Final on Alert")
    public void Click_on_submit_Final_on_Alert() {
        geographyPage.submitFinalAlert();
    }

    @Then("Final Reports Will Display")
    public void All_Reports_Will_Display() {
        geographyPage.isFinalReportsDisplayed();
    }

    
    @Given("user is on new geography set creation form for manufacture")
    public void user_is_on_new_geography_set_creation_form_for_manufacture() {
        geographyPage.clickSearchProfile();
        geographyPage.inputSearchProfile("manufacture");
        geographyPage.selectProfiles(3);
        geographyPage.clickCreateNewGeographySet();
    }

    @When("Select first outlet in outlets")
    public void Select_outlet_in_outlets() {
        geographyPage.selectFirstOutlet();
    }

    @Given("User is on {string} screen for manufacture")
    public void user_is_on_geography_creation_screen_for_manufacture(String stage) {
        String geographysetNameValue = TestContext.get("Name");

        geographyPage.clickSearchProfile();
        geographyPage.inputSearchProfile("manufacture");
        geographyPage.selectProfiles(3);
        geographyPage.searchGeogeographySets(geographysetNameValue);
        geographyPage.selectCardByClientName(geographysetNameValue);
        Assert.assertTrue(geographyPage.isOnScreen(stage));
    }

    @Given("Validate profile data is visible for manufacture")
    public void Validate_profile_data_is_visible_for_manufacture() {
        geographyPage.validateProfileDataInGeoCreation(TestContext.getAll());
    }

    @When("Review and Approve All screens in Final Review for manufacture")
    public void Review_and_Approve_All_screens_in_Final_Review_for_manufacture() {
        geographyPage.approveCountyList();
        geographyPage.approveGeographyHierarchy();
        geographyPage.approveGeographyMapping();
        geographyPage.approveGeographyNaming();
        geographyPage.approveReleaseResults();
        geographyPage.approveTotalUs();
    }   


    @When("Click Review button")
    public void Click_Review_button() {
        geographyPage.clickReviewButton();
    }

    @When("Click on Approve button geography creation definitiion")
    public void Click_on_Approve_button_geography_creation_definitiion() {
        geographyPage.clickApproveButton();
    }

    @When("Click on Confirm to next step")
    public void Click_on_Confirm_to_next_step() {
        geographyPage.clickConfirm();
    }

    @Given("user is on new geography set creation form for circana")
    public void user_is_on_new_geography_set_creation_form_for_circana() {
        geographyPage.clickSearchProfile();
        geographyPage.inputSearchProfile("circana");
        geographyPage.selectProfiles(0);
        geographyPage.clickCreateNewGeographySet();
    }

    @When("user fills geography set details for circana")
    public void user_fills_geography_set_details_circana(DataTable table) {
        Map<String, String> data = table.asMaps().get(0);
            TestContext.saveData(data);
            geographyPage.fillGeoSetFormForCircana(data);
    }

    
    @Given("User is on {string} screen for circana")
    public void user_is_on_geography_creation_screen_for_circana(String stage) {
        String geographysetNameValue = TestContext.get("Name");

        geographyPage.clickSearchProfile();
        geographyPage.inputSearchProfile("circana");
        geographyPage.selectProfiles(0);
        geographyPage.searchGeogeographySets(geographysetNameValue);
        geographyPage.selectCardByClientName(geographysetNameValue);
        Assert.assertTrue(geographyPage.isOnScreen(stage));
    }

    @When("Review and Approve All screens in Final Review for circana")
    public void Review_and_Approve_All_screens_in_Final_Review_for_circana() {
        geographyPage.approveCountyList();
        geographyPage.approveGeographyHierarchy();
        geographyPage.approveGeographyMapping();
        geographyPage.approveGeographyNaming();
        geographyPage.approveReleaseResults();
        geographyPage.approveTotalUs();
    }

   

    // @When("Leave Geography Set Name empty")
    // public void Leave_Geography_Set_Name_empty() {
    //     geographyPage.enterGeographySetName();
    // }

    // @When("Leave Version empty")
    // public void Leave_Version_empty() {
    //     geographyPage.selectVision();
    // }

    // @When("Leave Previous Geography Set empty")
    // public void LeavePrevious_Geography_Set_empty() {
    //     geographyPage.selectPreviousGeographySet();
    // }

    // @When("Leave Deliverable selection empty")
    // public void Leave_Deliverable_selection_empty() {
    //     // Write code here that turns the phrase above into concrete actions
    // }

    // @Then("Continue button should be disabled")
    // public void Continue_button_should_be_disabled() {
    //     Assert.assertFalse(geographyPage.isContinueButtonEnabled());
    // }

    // @When("Select Geography set number {int}")
    // public void Select_Geography_set_number(int n) {
    //     geographyPage.selectGeographySet(n);
    // }

    // @When("Select the geography card with {string}")
    // public void Select_the_geography_card_with(String status) {
    //     geographyPage.selectCardByState(status);
    // }

    // @When("Select the Stores in Available Stores")
    // public void Select_the_Stores_in_Available_Stores() {
    //     selectedStoresCount = 0;
    //     availableStores = geographyPage.availableStoresCount();
    //         if(availableStores >= 5){
    //             for(int i = 0; i < 5; i++){
    //                 geographyPage.selectTheStores(i);
    //                 selectedStoresCount++;
    //             }
    //         } else if(availableStores > 0) {
    //             for(int i = 0; i < availableStores; i++){
    //                 geographyPage.selectTheStores(i);
    //                 selectedStoresCount++;
    //             }
    //         }
    // }

    // @When("Select above {int} stores in Available Stores")
    // public void Select_above_stores(int n) {
    //    for(int i=1;i<=n;i++){
    //     geographyPage.selectTheStores(i);
    //    }
    // }

    
    

    // @Then("{string} screen is display for RMA")
    // public void screen_is_display_for_RMA(String expectedText) {
    //     String actualText = geographyPage.isReviewScreenDisplayed();
    //     Assert.assertTrue(actualText.contains(expectedText));
    // }
    

    

    // @When("Click on Geography Mapping")
    // public void Click_on_Geography_Mapping() {
    //     geographyPage.clickGeoMappingButton();
    //     String stage = "mapping";
    //     Assert.assertTrue(geographyPage.isOnScreen(stage));
    // }

   


    // @Then("Error {string} message is displayed for Previous Geography Set")
    // public void Error_message_is_displayed_for_Previous_Geography_Set(String error) {
    //     String text = geographyPage.errorMessageForPreviousGeo();
    //     Assert.assertEquals(error, text);
    // }

    // @Then("Error {string} message is displayed for Version")
    // public void Error_message_is_displayed_for_Version(String error) {
    //     String text = geographyPage.errorMessageForVersion();
    //     Assert.assertEquals(error, text);
    // }

    // @Then("Error {string} message is displayed for Geography Set Name")
    // public void Error_message_is_displayed_for_Geography_Set_Name(String error) {
    //     String text = geographyPage.errorMessageForGeographySetName();
    //     Assert.assertEquals(error, text);
    // }

    // @Then("Error {string} message is displayed for Duplicate Geography Set Name")
    // public void Error_message_is_displayed_for_Duplicate_Geography_Set_Name(String expectedError) {
    //     String actualError = geographyPage.getDuplicateNameErrorText();
    //     Assert.assertTrue(actualError.contains(expectedError));
    // }

    // @When("Click on RMA Definition in Final Review")
    // public void Click_on_RMA_Definition_in_Final_Review() {
    //     geographyPage.clickRmaDefinitionReview();
    // }

    // @When("Click on Release Evaluation")
    // public void Click_on_Release_Evaluation() {
    //     geographyPage.clickReleaseEvaluationButton();
    //     String stage = "evaluation";
    //     Assert.assertTrue(geographyPage.isOnScreen(stage));
    // }

    

    
    

    // @When("Click on Geography Naming")
    // public void Click_on_Geography_Naming() {
    //     geographyPage.clickGeographyNamingButton();
    //     String stage = "naming";
    //     Assert.assertTrue(geographyPage.isOnScreen(stage));
    // }

    // @When("Click on Final Review")
    // public void Click_on_Final_Review() {
    //     geographyPage.clickFinalReview();
    //     String stage = "review";
    //     Assert.assertTrue(geographyPage.isOnScreen(stage));
    // }

    

    

    // @When("Click on Change Highlights in Final Review")
    // public void Click_on_Change_Highlights_in_Final_Review() {
    //     geographyPage.clickChangeHighlights();
    // }

    

    // @When("Click on Release Results in Final Review")
    // public void Click_on_Release_Results_in_Final_Review() {
    //     geographyPage.clickReleaseResults();
    // }

    

    // @When("Click on Parentage in Final Review")
    // public void Click_on_Parentage_in_Final_Review() {
    //     geographyPage.clickParentage();
    // }

    

    // @When("Click on Geography Naming in Final Review")
    // public void Click_on_Geography_Naming_in_Final_Review() {
    //     geographyPage.clickGeographyNamingReview();
    // }

    

    

    

    

    

    // @Then("{string} screen is display")
    // public void screen_is_display(String text) {
    //     text = " "+text;
    //     String message = geographyPage.verifyRMASpecialHandlingDisplayed();
    //     Assert.assertEquals(message,text);
    // }

    
    // @When("Upload the {string} file in Upload field")
    // public void Upload_the_file_in_Upload_field(String file) {
    //     geographyPage.importRmaFile(file);
    // }

    // @When("Click Validate and Preview Data")
    // public void Click_Validate_and_Preview_Data() {
    //     geographyPage.clickValidatePreviewData();
    // }

    // @When("Click Proceed Without Missing Stroes")
    // public void Click_Proceed_Without_Missing_Stroes() {
    //     geographyPage.clickProceedWithoutMissingStores();
    // }

    


    // @When("Error section is displayed")
    // public void Error_section_is_displayed() {
    //     Assert.assertTrue(geographyPage.isErrorDisplayedForInvalidFile());
    // }

    // @When("click on edit button")
    // public void click_on_edit_button() {
    //     geographyPage.clickEditButtonForCrma();
    // }

    // @When("Click single greater symbol")
    // public void Click_single_greater_symbol() {
    //     geographyPage.moveSelectedStroesToTarget();
    // }

    // @Then("All selected stores should move to target")
    // public void All_selected_stores_should_move_to_target() {

    //     int targetStores = geographyPage.targetStoresCount();

    //     Assert.assertEquals(targetStores,selectedStoresCount);
        
    // }

    // @Then("Tree is formed with geography name")
    // public void Tree_is_formed_with_geography_name() {
    //     String actualText = geographyPage.getGeographyTreeinnerText(geographyName);
    //     Assert.assertEquals(actualText, geographyName);
    // }

    // @Then("Duplicate Geography Name Detected screen display")
    // public void Duplicate_Geography_Name_Detected_screen_display() {
    //     Assert.assertTrue(geographyPage.isDuplicateGeographySceenDisplayed());
    // }

    // @When("click on {string} node")
    // public void click_on_node(String rootNode) {
    //     geographyPage.clickHighLevelNode(rootNode);
    // }

    // @When("click on create aggregation icon")
    // public void click_on_create_aggregation_icon() {
    //     geographyPage.clickAggregateButton();
    // }

    // @When("Enter the {string} in Aggregate Name field")
    // public void Enter_the_in_Aggregate_Name_field(String aggName) {
    //     geographyPage.enterAggregateName(aggName);
    // }

    // @When("Click on create button")
    // public void Click_on_create_button() {
    //     geographyPage.clickCreateButtonAggregate();
    // }

    // @Then("This {string} is top level Node")
    // public void Node_is_top_level_Node(String expected) {
    //     String actualText = geographyPage.getGeographyTreeinnerText(expected);
    //     Assert.assertEquals(actualText, expected);
    // }


    // @Given("Download Button should be visiable")
    // public void Download_Button_should_be_visiable() {
    //     geographyPage.isDownloadBtnVisible();
    // }

    // @Then("the file should be downloading")
    // public void the_file_should_be_downloading() {
    //     geographyPage.isDownloadedFileExist();
    // }

    // @When("Click on download button")
    // public void Click_on_download_button() {
    //     geographyPage.clickDownloadBtn();
    // }

    // @When("Click on download button for Geography Naming")
    // public void Click_on_download_button_for_Geography_Naming() {
    //     geographyPage.clickDownloadBtnGeoNaming();
    // }

    // @When("Click the print button")
    // public void Clicks_the_print_button() {
    //     geographyPage.clickPrintButton();
    // }

    // @Then("the print dialog should open")
    // public void the_print_dialog_should_open() {
    //     Assert.assertTrue(geographyPage.isPrintTriggered());
    // }

    // @When("Click on Custom Region")
    // public void Click_on_Custon_Region() {
    //     geographyPage.clickCustomRegion();
    // }

    // @When("Click on Custom Census Chain")
    // public void Click_on_Custom_Census_Chain() {
    //     geographyPage.clickCustomCensusChain();
    // }

    // @Then("Select button visiable")
    // public void Select_button_visiable() {
    //     Assert.assertTrue(geographyPage.isSelectButtonVisible());
    // }

    // @Then("Approve button is visiable")
    // public void Edit_button_is_visiable_and_enable() {
    //    Assert.assertTrue(geographyPage.isApproveVisible());
    // }
    
    // @When("Click on CRMA Definition in Final Review")
    // public void Click_on_CRMA_Definition_in_Final_Review() {
    //     geographyPage.clickCrmaDefinitionReview();
    // }

    // @When("Click on Geography Mapping in Final Review")
    // public void Click_on_Geography_Mapping_in_Final_Review() {
    //     geographyPage.clickGeographyMappingReview();
    // }
    

    
    

    

    

    

    

    

    

    

    

    

    

    

    






    

   











    

    
    







    





















 
    
}
