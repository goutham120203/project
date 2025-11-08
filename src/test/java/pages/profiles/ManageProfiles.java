package pages.profiles;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;

public class ManageProfiles {
    private final Page page;

    private final String getProfile = "//h2[text()='Profiles']";
    private final String searchField = "input[placeholder*='Search']";
    private final String profilesList = ".profile-card, .card";
    private final String allProfileDropdown = " //span[text()=' All Profiles ']";
    private final String deleteButton = "//button[text()=' Delete ']";
    private final String cancelButton = "//button[text()=' Cancel ']";
    private final String editButton = "//button[text()=' Edit ']";
    private final String getClientVisibleName = "//*[@id='clientVisibleName']";

    public ManageProfiles(Page page){
        this.page = page;
    }

    public String getProfileName(){
        return page.locator(getProfile).innerText();
    }

    public void searchProfile(String clientName) {
        // page.waitForSelector(searchField);
        page.fill(searchField, clientName);
        page.waitForTimeout(1000);
    }

    public int getprofilesCount(){
        return page.locator(profilesList).count();
    }

    public void clickAllProfilesDropdown(){
        page.click(allProfileDropdown);
    }

    public void selectProfileType(String profileType){

        switch (profileType) {
            case "Retailers":
                // page.waitForSelector("Loading=" + profileType);
                page.getByText(profileType).nth(0).click();
                break;
            case "Manufacturers":
                // page.waitForSelector("Loading=" + profileType);
                page.getByText(profileType).click();
                break;
            case "Circana":
                // page.waitForSelector("Loading=" + profileType);
                page.getByText(profileType).nth(0).click();
                break;
            default:
                throw new IllegalArgumentException("Invalid profile type: " + profileType);
        }

    }

    public boolean verifyFilteredProfiles(String profileType){
        int profileCount = getprofilesCount();
        return profileCount > 0;
    }

    public String selectFirstProfile() {
        page.waitForSelector(profilesList);
        Locator firstProfile = page.locator(profilesList).first();
        String profileName = firstProfile.textContent();
        return profileName.trim();
    }


    public void clickDeleteButton() {
        page.waitForSelector(deleteButton);
        page.locator(deleteButton).first().click();

        page.waitForTimeout(500);
        if(page.locator("//*[@id=\"deleteModal\"]/div/div/div[3]/button[2]").count() > 0){
            page.click("//*[@id=\"deleteModal\"]/div/div/div[3]/button[2]");
        }
    }

    public Boolean messageDisplayed(String expectedMessage){
        return page.textContent("body").contains(expectedMessage);
    }

    public boolean redirectedToProfiles(){
        page.waitForURL("**/profiles");
        return page.url().contains("profiles");
    }

    public void viewFirstProfile() {
        page.waitForSelector(profilesList);
        Locator firstProfile = page.locator(profilesList).first();
        firstProfile.click();
    }

    public boolean isProfileDetailsDisplayed() {
        page.waitForTimeout(500);
        return page.locator(".mb-4, .mb-3").count() > 0;
        
    }

    public void clickCancelButton(){
        page.click(cancelButton);
    }

    public void clickEditButton(){
        page.locator(editButton).first().click();
    }

    public void clientVisibleName(String updatedName){
       page.locator(getClientVisibleName).fill(updatedName);
    }

    public void selectDifferentOutlet(String outlet){
        page.getByText(outlet).click();
    }

    public void updateNotes(String note){
        page.locator("#notes").fill(note);
    }

    public void clickUpdateProfile(){
        page.getByText(" Update Profile ").click();
    }

    public void selectYes() {
        if (!page.locator("#freshlookYes").isChecked()) {
            page.locator("#freshlookYes").click();
        }
    }

    public void selectNo() {
        if (!page.locator("#freshlookNo").isChecked()) {
            page.locator("#freshlookNo").click();
        }
    }

    public void updateOwnerNo(String ownerNo) {
        page.getByPlaceholder("Enter owner number").fill(ownerNo);
    }

    public void updateBannerName(String bannerName){
        page.getByPlaceholder("Enter banner name").fill(bannerName);
    }

    public String errorVisiableClientName(){
        return page.getByText("Client visible name is required.").innerText();
    }


}
