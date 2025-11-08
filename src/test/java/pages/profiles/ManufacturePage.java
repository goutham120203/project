package pages.profiles;

import org.testng.Assert;


import com.microsoft.playwright.Page;
import com.microsoft.playwright.options.SelectOption;

public class ManufacturePage {
    private final Page page;
    private final String clientVisibleName = "//*[@id='clientVisibleName']";
    private final String notes = "//*[@id='notes']";
    private final String btnSaveProfile = "//button[text() = ' Save Profile ']";
    private final String txtErrorClientName = "//small[text() = ' Client selection is required. ']";
    private final String txtErrorClientVisibleName = "//small[text() = ' Client visible name is required. ']";
    private final String txtErrorOutlets = "//div[text() = ' Please select at least one outlet. ']";

    public ManufacturePage(Page page){
        this.page = page;
    }
    
    public void selectClientName(String clientName){
        String optionSelector = String.format("#clientName option:has-text('%s')", clientName);
    
        boolean isDisabled = page.locator(optionSelector).isDisabled();
    
        if (isDisabled) {
            throw new RuntimeException(
             String.format("Cannot select '%s' - This client already has an active manufacturer profile", clientName)
            );
        }
        page.selectOption("#clientName", new SelectOption().setLabel(clientName));
    }

    public void enterClientName(String text){
        page.locator(clientVisibleName).fill(text);
    }

    public void selectYes(){
        page.locator("#cccEligibleYes").click();
    }

    public void selectNo(){
        page.locator("#cccEligibleNo").click();
    }

    public void selectOutlet(String outlet){
        System.out.println(outlet);
        page.getByText(outlet).click();
    }

    public void enterNotes(String text){
        page.locator(notes).fill(text);
    }

    public void saveProfile(){
        page.locator(btnSaveProfile).click();
    }

    public boolean isOnProfilesPage(){
        return page.url().contains("/profiles");
    }

    public String errorMessageClientName(String errorMessage){
        String error = page.locator(txtErrorClientName).innerText();
        return error;
    }

    public String errorMessageVisiableClientName(String errorMessage){
        String error = page.locator(txtErrorClientVisibleName).innerText();
        return error; 
    }

    public String errorMessageOutlet(String errorMessage){
        String error = page.locator(txtErrorOutlets).innerText();
        return error;
    }

    public void isYesSelected() {
        Assert.assertTrue(page.locator("#cccEligibleYes").isChecked());
    }

    public void isNoSelected() {
        Assert.assertTrue(page.locator("#cccEligibleNo").isChecked());
    }

    public boolean isOutletSelected(String outlet){
       return page.getByText(outlet).isChecked();
    }

    public boolean specialCategoriesDisplayed(){
        return page.getByText("Special Categories").isVisible();
    }

    public boolean AuditOptionsDisplayed(){
       return page.getByText("Audit Options").isVisible();
    }

    public void clickCancel(){
        page.getByText("Cancel").click();
    }
     
}

