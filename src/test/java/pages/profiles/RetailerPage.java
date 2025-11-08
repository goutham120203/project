package pages.profiles;


import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.options.SelectOption;

public class RetailerPage {
    private Page page;
    
    public RetailerPage(Page page){
        this.page = page;
    }

    public void selectClientName(String clientName){
        page.selectOption("#clientName", new SelectOption().setLabel(clientName));
    }

    public void enterClientName(String clientName){
        page.locator("#clientVisibleName").fill(clientName);
    }

    public void selectRetailerOutlet(String outlet){
        page.selectOption("#retailerOutlet", new SelectOption().setLabel(outlet));
    }

    public void selectYes(){
        page.locator("#freshlookYes").click();
    }

    public void selectNo(){
        page.locator("#freshlookNo").click();
    }

    public void excludeClosedStores(){
        page.locator("#excludeStores").click();
    }

    public void includeClosedStores(){
        page.locator("#includeStores").click();
    }

    public void enterOwnerNo(int ownerNo) {
        page.getByPlaceholder("Enter owner number").fill(String.valueOf(ownerNo));
    }

    public void enterBannerName(String bannerName){
        page.getByPlaceholder("Enter banner name").fill(bannerName);
    }

    public void enterNotes(String notes){
        page.locator("#notes").fill(notes);
    }

    public void saveProfile(){
        page.getByText("Save Profile").click();
    }

    public boolean isOnProfilesPage(){

        return page.url().contains("/profiles");
    }

    public String errorClientName(){
        return page.getByText("Client selection is required.").innerText();
    }
    public String errorVisiableClientName(){
        return page.getByText("Client visible name is required.").innerText();
    }

    public String errorRetailerOutlet(){
        return page.getByText("Retailer outlet selection is required.").innerText();
    }

    public String errorBannerField(){
        return page.getByText(" Please fill in all banner fields. Owner number must be greater than 0. ").innerText();
    }

    public boolean isErrorBannerDisplayed(){
        return page.getByText(" Please fill in all banner fields. Owner number must be greater than 0. ").isVisible();
    }

    public boolean isYesSelected() {
       return page.locator("#freshlookYes").isChecked();
    }

    public boolean isNoSelected() {
       return page.locator("#freshlookNo").isChecked();
    }

    public boolean isIncludeChecked() {
       return page.locator("#includeStores").isChecked();
    }

    public boolean isExcludeChecked() {
       return page.locator("#excludeStores").isChecked();
    }

    public boolean isRetailerOutletListVisible(){
        Locator select = page.locator("#retailerOutlet");
        if(!select.isVisible()){
            return false;
        }

        return select.locator("option").count() > 2;
    }

    public boolean isAuditRMASectionDisplayed(){
        return page.getByText("Audit (RMA)").isVisible();
    }

    public boolean isParentageSectionDisplayed(){
        return page.getByText("Parentage").isVisible();
    }

    public boolean isCRMAOutletDisplayed(){
        return page.getByText("CRMA Outlet(s) - Single & Combines").isVisible();
    }

    public String isErrorAuditRMADisplayed(){
        return page.getByText("Please select at least one audit option.").innerText();
    }

    public String isErrorCRMAOutletDisplay(){
        return page.getByText("Please select at least one CRMA outlet option.").innerText();
    }

    public void clickCancel(){
        page.getByText("Cancel").click();
    }


    
}
