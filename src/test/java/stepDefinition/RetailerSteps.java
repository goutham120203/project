package stepDefinition;

import org.testng.Assert;

import com.microsoft.playwright.Page;

import factory.DriverFactory;
import io.cucumber.java.en.*;
import pages.base.HomePage;
import pages.profiles.RetailerPage;

public class RetailerSteps {
    private Page page = DriverFactory.getPage();
    private RetailerPage retailerPage;
    private HomePage homePage;

    @Given("I am on the retailer profile creation form")
    public void i_am_on_the_retailer_profile_creation_form(){
        page.navigate("http://ec2-56-228-14-238.eu-north-1.compute.amazonaws.com/");
        homePage = new HomePage(page);
        homePage.goToRetailer();
        retailerPage = new RetailerPage(page);
    }

    @When("I select {string} in the retailer client name field")
    public void i_select_in_the_retailer_client_name_field(String clientName) {
        retailerPage.selectClientName(clientName);
    }

    @When("I enter {string} in the retailer client visible field")
    public void i_enter_in_the_retailer_client_visible_field(String clientVisibleName) {
        retailerPage.enterClientName(clientVisibleName);
    }

    @When("I select {string} in the retailer outlet field")
    public void i_select_in_the_retailer_outlet_field(String retailerOutlet) {
        retailerPage.selectRetailerOutlet(retailerOutlet);
    }

    @When("I select {string} as retailer freshlook participant")
    public void i_select_as_retailer_freshlook_participant(String freshlook) {
        if(freshlook.equalsIgnoreCase("Yes")){
            retailerPage.selectYes();
        } else if(freshlook.equalsIgnoreCase("No")){
            retailerPage.selectNo();
        }
    }

    @When("I select {string} as retailer closed and sold store decision")
    public void i_select_as_retailer_closed_and_sold_store_decision(String decision) {
        if(decision.equalsIgnoreCase("INCLUDE")){
            retailerPage.includeClosedStores();
        } else if(decision.equalsIgnoreCase("EXCLUDE")){
            retailerPage.excludeClosedStores();
        }
    }

    @When("I enter {int} in the retailer owner number field")
    public void i_enter_in_the_retailer_owner_number_field(int ownerNo) {
        retailerPage.enterOwnerNo(ownerNo);
    }

    @When("I enter {string} in the retailer banner name field")
    public void i_enter_in_the_retailer_banner_name_field(String bannerName) {
        retailerPage.enterBannerName(bannerName);
    }

    @When("I enter retailer note {string} in the retailer notes field")
    public void i_enter_retailer_note_in_the_retailer_notes_field(String notes) {
        retailerPage.enterNotes(notes);
    }

    @When("I click on retailer save profile button")
    public void i_click_on_retailer_save_profile_button() {
        retailerPage.saveProfile();
    }

    @Then("I am redirected to the retailer profiles page")
    public void i_am_redirected_to_the_retailer_profiles_page() {
        Assert.assertTrue(retailerPage.isOnProfilesPage());
    }

    @When("I leave retailer client name empty")
    public void i_leave_retailer_client_name_empty() {
        // No action needed - field remains empty
    }

    @When("I leave retailer client visible empty")
    public void i_leave_retailer_client_visible_empty() {
        // No action needed - field remains empty
    }

    @When("I leave retailer outlet empty")
    public void i_leave_retailer_outlet_empty() {
        // No action needed - field remains empty
    }

    @When("I leave retailer banner field empty")
    public void i_leave_retailer_banner_field_empty() {
        // No action needed - field remains empty
    }

    @Then("retailer error {string} message for client name is displayed")
    public void retailer_error_message_for_client_name_is_displayed(String error) {
        String errorMessage = retailerPage.errorClientName();
        Assert.assertEquals(error, errorMessage);
    }

    @Then("retailer error {string} message for client visible name is displayed")
    public void retailer_error_message_for_client_visible_name_is_displayed(String error) {
        String errorMessage = retailerPage.errorVisiableClientName();
        Assert.assertEquals(error, errorMessage);
    }

    @Then("retailer error {string} message for outlet is displayed")
    public void retailer_error_message_for_outlet_is_displayed(String error) {
        String errorMessage = retailerPage.errorRetailerOutlet();
        Assert.assertEquals(error, errorMessage);
    }

    @Then("retailer error {string} message for banner is displayed")
    public void retailer_error_message_for_banner_is_displayed(String error) {
        String errorMessage = retailerPage.errorBannerField();
        Assert.assertEquals(error, errorMessage);
    }

    @Then("No is the retailer default selection for freshlook participant")
    public void no_is_the_retailer_default_selection_for_freshlook_participant() {
        Assert.assertTrue(retailerPage.isNoSelected());
    }

    @Then("EXCLUDE closed stores is the retailer default selection for closed and sold store decision")
    public void exclude_closed_stores_is_the_retailer_default_selection_for_closed_and_sold_store_decision() {
        Assert.assertTrue(retailerPage.isExcludeChecked());
    }

    @When("I leave retailer banner name empty")
    public void i_leave_retailer_banner_name_empty() {
        // No action needed - field remains empty
    }

    @Then("the retailer {string} radio button for freshlook should be selected")
    public void the_retailer_radio_button_for_freshlook_should_be_selected(String freshLook) {
        if(freshLook.equalsIgnoreCase("Yes")){
            Assert.assertTrue(retailerPage.isYesSelected());
        } else if(freshLook.equalsIgnoreCase("No")){
            Assert.assertTrue(retailerPage.isNoSelected());
        }
    }

    @Then("the retailer owner number field should display {int}")
    public void the_retailer_owner_number_field_should_display(int number) {
        Assert.assertFalse(retailerPage.isErrorBannerDisplayed());
    }

    @Then("retailer {string} should be selected for closed and sold store decision")
    public void retailer_should_be_selected_for_closed_and_sold_store_decision(String closeStores) {
        if(closeStores.equalsIgnoreCase("INCLUDE")){
            Assert.assertTrue(retailerPage.isIncludeChecked());
        } else if(closeStores.equalsIgnoreCase("EXCLUDE")){
            Assert.assertTrue(retailerPage.isExcludeChecked());
        }
    }

    @Then("the retailer outlet list is displayed")
    public void the_retailer_outlet_list_is_displayed() {
        Assert.assertTrue(retailerPage.isRetailerOutletListVisible());
    }

    @Then("retailer audit RMA section is displayed")
    public void retailer_audit_rma_section_is_displayed() {
        Assert.assertTrue(retailerPage.isAuditRMASectionDisplayed());
    }

    @Then("retailer parentage section is displayed")
    public void retailer_parentage_section_is_displayed() {
        Assert.assertTrue(retailerPage.isParentageSectionDisplayed());
    }

    @Then("retailer CRMA outlets single and combines section is displayed")
    public void retailer_crma_outlets_single_and_combines_section_is_displayed() {
        Assert.assertTrue(retailerPage.isCRMAOutletDisplayed());
    }

    @Then("retailer error {string} is displayed for audit section")
    public void retailer_error_is_displayed_for_audit_section(String error) {
        String errorMsg = retailerPage.isErrorAuditRMADisplayed();
        Assert.assertEquals(error, errorMsg);
    }

    @Then("retailer error {string} is displayed for CRMA outlet section")
    public void retailer_error_is_displayed_for_crma_outlet_section(String error) {
        String errorMsg = retailerPage.isErrorCRMAOutletDisplay();
        Assert.assertEquals(error, errorMsg);
    }

    @When("I click on retailer cancel button")
    public void i_click_on_retailer_cancel_button() {
        retailerPage.clickCancel();
    }
}