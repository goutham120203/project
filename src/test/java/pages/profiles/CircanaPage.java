package pages.profiles;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.options.SelectOption;

public class CircanaPage {
    private final Page page;

    public CircanaPage(Page page){
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

    public void enterClientName(String clientName){
        page.locator("#clientVisibleName").fill(clientName);
    }

    public void selectOutlet(String outlet){
        System.out.println(outlet);
        page.getByText(outlet).click();
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

    public String errorClientVisibleName(){
       return page.getByText("Client visible name is required.").innerText();
    }

    public String errorClientName(){
        return page.getByText("Client selection is required.").innerText();
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
