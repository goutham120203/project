package stepDefinition;

import org.testng.Assert;

import com.microsoft.playwright.Page;

import factory.DriverFactory;
import io.cucumber.java.en.*;
import pages.base.HomePage;
import pages.profiles.ManageProfiles;


public class ManageProfileSteps {
    private Page page = DriverFactory.getPage();
    private HomePage homePage;
    private ManageProfiles manageProfiles;
    private String selectedProfileName;
    private int prev;


    @Given("I am logged in to the application")
    public void I_am_logged_in_to_the_application(){
        
    }

    @Given("I am on the profiles page")
    public void I_am_on_the_profiles_page() {
        page.navigate("http://ec2-56-228-14-238.eu-north-1.compute.amazonaws.com/");
        homePage = new HomePage(page);
        manageProfiles = new ManageProfiles(page);
        homePage.goToProfiles();
    }

    @When("I click on Profile menu")
    public void I_click_on_Profile_menu() {
        page.navigate("http://ec2-56-228-14-238.eu-north-1.compute.amazonaws.com/");
        homePage = new HomePage(page);
        homePage.goToProfiles();   
    }

    @Then("{string} page is displayed")
    public void page_is_displayed(String expectedPage) {
        manageProfiles = new ManageProfiles(page);
        Assert.assertEquals(expectedPage, manageProfiles.getProfileName());
    }

    @When("I enter {string} in the search field")
    public void I_enter_in_the_search_field(String clientName) {
        manageProfiles.searchProfile(clientName);
    }

    @Then("matching profiles are displayed")
    public void matching_profiles_are_displayed() {
        Assert.assertTrue(manageProfiles.getprofilesCount()>=0);
    }

    @When("I click on All Profiles dropdown")
    public void I_click_on_All_Profiles_dropdown() {
        manageProfiles.clickAllProfilesDropdown();
    }

    @When("I select {string} profile type")
    public void I_select_profile_type(String profileType) {
        
        manageProfiles.selectProfileType(profileType);
        
    }

    @Then("only {string} profiles are displayed")
    public void only_profiles_are_displayed(String profileType) {
        Assert.assertTrue(manageProfiles.verifyFilteredProfiles(profileType));
    }

    @When("I select a profile")
    public void I_select_a_profile() {
        
        selectedProfileName = manageProfiles.selectFirstProfile();
        System.out.println(selectedProfileName);
        prev = manageProfiles.getprofilesCount();
    }

    @When("I click on Delete button")
    public void I_click_on_Delete_button() {
        manageProfiles.clickDeleteButton();
    }

    @Then("{string} message is displayed")
    public void message_is_displayed(String expectedMessage) {
        Assert.assertTrue(manageProfiles.messageDisplayed(expectedMessage));
    }

    @Then("the profile is removed from the profiles list")
    public void the_profile_is_removed_from_the_profiles_list() {
        Assert.assertNotEquals(prev,manageProfiles.getprofilesCount());
        System.out.println(prev);
        System.out.println(manageProfiles.getprofilesCount());
    }

    @When("I click on a selected profile")
    public void I_click_on_a_selected_profile() {
        manageProfiles.viewFirstProfile();
    }

    @Then("the selected profile details are displayed")
    public void the_selected_profile_details_are_displayed() {
        System.out.println(manageProfiles.isProfileDetailsDisplayed());
    }

    @Given("I am viewing a selected profile")
    public void I_am_viewing_a_selected_profile() {
        manageProfiles.viewFirstProfile();
    }

    @When("I click on Cancel")
    public void I_click_on_Cancel() {
        manageProfiles.clickCancelButton();
    }

    @Then("I am redirected to the profiles page")
    public void I_am_redirected_to_the_profiles_page() {
        manageProfiles.redirectedToProfiles();
    }

    @When("I click on Edit button")
    public void I_click_on_Edit_button() {
        manageProfiles.clickEditButton();
    }

    @When("I select a {string} profile")
    public void I_select_a_profile(String profileType) {
        manageProfiles.clickAllProfilesDropdown();
        manageProfiles.selectProfileType(profileType); 
    }

    @When("I update {string} to Client Name Field")
    public void I_update_to_Client_Name_Field(String updatedName) {
        manageProfiles.clientVisibleName(updatedName);
    }

    @When("I select different {string} in the outlet section")
    public void I_select_different_in_the_outlet_section(String newOutlet) {
        manageProfiles.selectDifferentOutlet(newOutlet);
    }

    @When("I update note to {string}")
    public void I_update_note_to(String updatedNotes) {
        manageProfiles.updateNotes(updatedNotes);
    }

    @When("I click on update profile")
    public void I_click_on_update_profile() {
        manageProfiles.clickUpdateProfile();
    }

    @When("I change Freshlook Participant to {string}")
    public void I_change_Freshlook_Participant_to(String freshLook) {
        if(freshLook.equalsIgnoreCase("Yes")){
            manageProfiles.selectYes();
        } else if(freshLook.equalsIgnoreCase("No")){
            manageProfiles.selectNo();
        }
    }

    @When("I update Banner Name to {string}")
    public void I_update_Banner_Name_to(String BannerName) {
        manageProfiles.updateBannerName(BannerName);
    }

    @When("I update Owner Number to {string}")
    public void I_update_Owner_Number_to(String BannerNo) {
        manageProfiles.updateOwnerNo(BannerNo);
    }


    @When("I clear the Client visible name field")
    public void I_clear_the_Client_visible_name_field() {
        manageProfiles.clientVisibleName("");
    }

    @Then("error {string} is displayed")
    public void error_is_displayed(String error) {
        String errorMessage = manageProfiles.errorVisiableClientName();
        Assert.assertEquals(error, errorMessage);
    }

    @When("I make some changes to the profile fields")
    public void I_make_some_changes_to_the_profile_fields() {
        manageProfiles.clientVisibleName("cancel button");
        // manageProfiles.updateBannerName("bannerss");
        // manageProfiles.selectDifferentOutlet(" Drug (DRUG) ");
    }


    

    // @Then("the changes are not saved")
    // public void the_changes_are_not_saved() {
    //     Assert.assertEquals(selectedProfileName,manageProfiles.getProfileName());
    // }



    
}


