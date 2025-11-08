package stepDefinition;

import org.testng.Assert;

import com.microsoft.playwright.Page;

import factory.DriverFactory;
import io.cucumber.java.en.*;
import pages.base.HomePage;
import pages.profiles.CircanaPage;

public class CircanaSteps {
    private Page page = DriverFactory.getPage();
    private HomePage homePage;
    private CircanaPage circanaPage;

    @Given("I am on the Circana profile creation form")
    public void i_am_on_the_circana_profile_creation_form() {
        page.navigate("http://ec2-56-228-14-238.eu-north-1.compute.amazonaws.com/");
        homePage = new HomePage(page);
        homePage.goToCircana();
        circanaPage = new CircanaPage(page);   
    }

    @When("I select {string} in the Circana client name field")
    public void i_select_in_the_circana_client_name_field(String clientName) {
        circanaPage.selectClientName(clientName);
    }

    @When("I enter {string} in the Circana client visible field")
    public void i_enter_in_the_circana_client_visible_field(String clientVisibleName) {
        circanaPage.enterClientName(clientVisibleName);
    }

    @When("I select {string} in the Circana outlet section")
    public void i_select_in_the_circana_outlet_section(String outlet) {
        circanaPage.selectOutlet(outlet);
    }

    @When("I enter Circana note {string} in the Circana notes field")
    public void i_enter_circana_note_in_the_circana_notes_field(String notes) {
        circanaPage.enterNotes(notes);
    }

    @When("I click on Circana save profile button")
    public void i_click_on_circana_save_profile_button() {
        circanaPage.saveProfile();
    }

    @Then("I am redirected to the Circana profiles page")
    public void i_am_redirected_to_the_circana_profiles_page() {
        Assert.assertTrue(circanaPage.isOnProfilesPage());
    }

    @When("I leave Circana client name empty")
    public void i_leave_circana_client_name_empty() {
        // No action needed - field remains empty
    }

    @When("I leave Circana client visible empty")
    public void i_leave_circana_client_visible_empty() {
        // No action needed - field remains empty
    }

    @Then("error {string} message is displayed for client name")
    public void error_message_is_displayed(String error) {
        String errorMessage = circanaPage.errorClientName();
        Assert.assertEquals(error, errorMessage);
    }

    @Then("Circana error {string} is displayed for client visible name")
    public void circana_error_is_displayed_for_client_visible_name(String error) {
        String errorMessage = circanaPage.errorClientVisibleName();
        Assert.assertEquals(error, errorMessage);
    }

    @When("I do not select any Circana outlet in the outlets section")
    public void i_do_not_select_any_circana_outlet_in_the_outlets_section() {
        // No action needed - no outlet selected
    }

    @Then("Circana error {string} is displayed for outlet")
    public void circana_error_is_displayed_for_outlet(String error) {
        // String errorMessage = circanaPage.errorOutletMessage();
        // Assert.assertEquals(error, errorMessage);
    }

    @Then("Circana outlet {string} is selected")
    public void circana_outlet_is_selected(String outlet) {
        Assert.assertTrue(circanaPage.isOutletSelected(outlet));
    }

    @Then("Circana special categories section is displayed")
    public void circana_special_categories_section_is_displayed() {
        Assert.assertTrue(circanaPage.specialCategoriesDisplayed());
    }

    @Then("Circana audit options section is displayed")
    public void circana_audit_options_section_is_displayed() {
        Assert.assertTrue(circanaPage.AuditOptionsDisplayed());
    }

    @When("I click on Circana cancel button")
    public void i_click_on_circana_cancel_button() {
        circanaPage.clickCancel();
    }

    
}
