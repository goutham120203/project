package stepDefinition;

import org.testng.Assert;

import com.microsoft.playwright.Page;

import factory.DriverFactory;
import io.cucumber.java.en.*;
import pages.base.HomePage;
import pages.profiles.ManufacturePage;

public class ManufacturerSteps {
    private Page page = DriverFactory.getPage();
    private ManufacturePage manufacturePage;
    private HomePage homePage;

    @Given("I am on the manufacturer profile creation form")
    public void i_am_on_the_manufacturer_profile_creation_form() {
        page.navigate("http://ec2-56-228-14-238.eu-north-1.compute.amazonaws.com/");
        homePage = new HomePage(page);
        homePage.goToManufacturer();
        manufacturePage = new ManufacturePage(page);   
    }

    @When("I select {string} in the manufacturer client name field")
    public void i_select_in_the_manufacturer_client_name_field(String clientName) {
        manufacturePage.selectClientName(clientName);
    }

    @When("I enter {string} in the manufacturer client visible field")
    public void i_enter_in_the_manufacturer_client_visible_field(String clientVisibleName) {
        manufacturePage.enterClientName(clientVisibleName);
    }

    @When("I select {string} as manufacturer CCC eligible")
    public void i_select_as_manufacturer_ccc_eligible(String cccOption) {
        if(cccOption.equalsIgnoreCase("Yes")){
            manufacturePage.selectYes();
        } else if(cccOption.equalsIgnoreCase("No")){
            manufacturePage.selectNo();
        }
    }

    @When("I select {string} in the manufacturer outlet section")
    public void i_select_in_the_manufacturer_outlet_section(String outlet) {
        manufacturePage.selectOutlet(outlet);
    }

    @When("I enter manufacturer note {string} in the manufacturer notes field")
    public void i_enter_manufacturer_note_in_the_manufacturer_notes_field(String notes) {
        manufacturePage.enterNotes(notes);
    }

    @When("I click on manufacturer save profile button")
    public void i_click_on_manufacturer_save_profile_button() {
        manufacturePage.saveProfile();
    }

    @Then("I am redirected to the manufacturer profiles page")
    public void i_am_redirected_to_the_manufacturer_profiles_page() {
        Assert.assertTrue(manufacturePage.isOnProfilesPage());
    }

    @When("I leave manufacturer client name empty")
    public void i_leave_manufacturer_client_name_empty() {
        // No action needed - field remains empty
    }

    @When("I leave manufacturer client visible empty")
    public void i_leave_manufacturer_client_visible_empty() {
        // No action needed - field remains empty
    }

    @Then("manufacturer error {string} message is displayed for client name")
    public void manufacturer_error_message_is_displayed_for_client_name(String errorMessage) {
        String actualError = manufacturePage.errorMessageClientName(errorMessage);
        Assert.assertEquals(errorMessage,actualError);
    }

    @Then("manufacturer error {string} message is displayed for client visible name")
    public void manufacturer_error_message_is_displayed_for_client_visible_name(String errorMessage) {
        String actualError = manufacturePage.errorMessageVisiableClientName(errorMessage);
        Assert.assertEquals(errorMessage, actualError);
    }

    @When("I do not select any manufacturer outlet in the outlets section")
    public void i_do_not_select_any_manufacturer_outlet_in_the_outlets_section() {
        // No action needed - no outlet selected
    }

    @Then("manufacturer error {string} message is displayed for outlet")
    public void manufacturer_error_message_is_displayed_for_outlet(String error) {
        String actualError = manufacturePage.errorMessageOutlet(error);
        Assert.assertEquals(error, actualError);
    }

    @Then("the manufacturer {string} radio button for CCC eligible should be selected")
    public void the_manufacturer_radio_button_for_ccc_eligible_should_be_selected(String cccOption) {
        if(cccOption.equalsIgnoreCase("Yes")){
            manufacturePage.isYesSelected();
        } else if(cccOption.equalsIgnoreCase("No")){
            manufacturePage.isNoSelected();
        }
    }

    @Then("manufacturer outlet {string} is selected")
    public void manufacturer_outlet_is_selected(String outlet) {
        Assert.assertTrue(manufacturePage.isOutletSelected(outlet));
    }

    @Then("manufacturer special categories section is displayed")
    public void manufacturer_special_categories_section_is_displayed() {
        Assert.assertTrue(manufacturePage.specialCategoriesDisplayed());
    }

    @Then("manufacturer audit options section is displayed")
    public void manufacturer_audit_options_section_is_displayed() {
        Assert.assertTrue(manufacturePage.AuditOptionsDisplayed());
    }

    @When("I click on manufacturer cancel button")
    public void i_click_on_manufacturer_cancel_button() {
        manufacturePage.clickCancel();
    }

    
}
