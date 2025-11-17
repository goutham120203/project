package pages.geographypage;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.TimeoutError;
import pages.base.BasePage;
import java.util.Map;

/**
 * Geography Setup Page - Geography Set Creation Form
 * Screen: New Geography Set Creation
 */
public class GeographySetupPage extends BasePage {

    // Locators - Form Fields
    private static final String GEO_SET_NAME = "//*[@id='geographySetName']";
    private static final String VERSION_DROPDOWN = "//select[@formcontrolname='version']";
    private static final String GEO_TYPE = "//select[@formcontrolname='geographyType']";
    private static final String GEO_SUMMARY = "//input[@id='geographySetSummary']";
    private static final String PREVIOUS_GEO_SET = "//select[@formcontrolname='previousGeoSetId']";
    private static final String GEO_NOTES = "//*[@id='geographySetNotes']";

    // Locators - Outlets
    private static final String OUTLET_SWITCH = "//input[@role='switch']";
    private static final String OUTLET_YES_BUTTON = "//button[normalize-space()='Yes']";

    // Locators - Deliverables
    private static final String DELIVERABLE_RETAILER = "#deliverableRtl";
    private static final String DELIVERABLE_MANUFACTURER = "#deliverableMfr";

    // Locators - Navigation
    private static final String CONTINUE_BUTTON = "//*[text()=' Continue ']";

    // Locators - Method for geo creation
    private static final String CREATION_METHOD = "//div[@class='creation-method-card ng-star-inserted']";

    

    public GeographySetupPage(Page page) {
        super(page);
    }

    // ============= Form Filling =============

    public void fillGeographySetForm(Map<String, String> data) {
        try {
            String name = data.get("Name");
            String version = data.get("Version");
            String summary = data.get("Summary");
            String notes = data.get("Notes");
            String previousSet = data.get("PreviousSet");

            if (name == null || name.isEmpty()) {
                throw new IllegalArgumentException("Geography Set Name is required");
            }

            fillText(GEO_SET_NAME, name);
            try{
             selectOption(VERSION_DROPDOWN, version.trim());
            }catch(Exception e){
                System.out.println("error while selection verion"+e.getMessage());
            }
            fillText(GEO_SUMMARY, summary);
            fillText(GEO_NOTES, notes);
            selectOptionByValue(PREVIOUS_GEO_SET, previousSet);

        } catch (TimeoutError e) {
            throw new RuntimeException("Timeout while filling geography set form: " + e.getMessage());
        }
    }

    public void fillGeographySetFormForCircana(Map<String, String> data) {
        try {
            String name = data.get("Name");
            String version = data.get("Version");
            String type = data.get("Type");
            String summary = data.get("Summary");
            String previousSet = data.get("PreviousSet");
            String notes = data.get("Notes");

            if (name == null || name.isEmpty()) {
                throw new IllegalArgumentException("Geography Set Name is required");
            }

            fillText(GEO_SET_NAME, name);
            selectOptionByLabel(VERSION_DROPDOWN, version.trim());
            selectOptionByValue(GEO_TYPE, type);
            fillText(GEO_SUMMARY, summary);
            selectOptionByValue(PREVIOUS_GEO_SET, previousSet);
            fillText(GEO_NOTES, notes);

        } catch (TimeoutError e) {
            throw new RuntimeException("Timeout while filling geography set form for Circana: " + e.getMessage());
        }
    }

    private void selectOptionByValue(String selector, String value) {
        try {
            page.waitForSelector(selector, new Page.WaitForSelectorOptions().setTimeout(DEFAULT_TIMEOUT));
            page.selectOption(selector, value);
        } catch (TimeoutError e) {
            throw new RuntimeException("Failed to select option: " + selector);
        }
    }

    // ============= Outlet Selection =============

    public int getCountOfSelectedOutlets() {
        Locator outlets = page.locator(OUTLET_SWITCH);
        int count = outlets.count();
        int selected = 0;

        for (int i = 0; i < count; i++) {
            if (outlets.nth(i).isChecked()) {
                selected++;
            }
        }
        return selected;
    }

    public void selectFirstOutlet() {
        page.locator(OUTLET_SWITCH).first().click();

        if (isElementVisible(OUTLET_YES_BUTTON)) {
            clickElement(OUTLET_YES_BUTTON);
        }
    }

    public void selectAllOutlets() {
        Locator outlets = page.locator(OUTLET_SWITCH);
        int count = outlets.count();

        for (int i = 0; i < count; i++) {
            outlets.nth(i).click();
        }
    }

    // ============= Deliverables Selection =============

    public void selectDeliverable(String deliverableType) {
        if (deliverableType.equalsIgnoreCase("Available for Retailer Only")) {
            clickElement(DELIVERABLE_RETAILER);
        } else if (deliverableType.equalsIgnoreCase("Available for Manufacturer Use")) {
            clickElement(DELIVERABLE_MANUFACTURER);
        } else {
            throw new IllegalArgumentException("Unknown deliverable type: " + deliverableType);
        }
    }

    // ============= Navigation =============

    public void clickContinue() {
        clickElement(CONTINUE_BUTTON);
    }

    public boolean isContinueButtonEnabled() {
        return isElementEnabled(CONTINUE_BUTTON);
    }


    // ============= creation method =============

    public void selectCreationMethod(String method){
        if(method.equalsIgnoreCase("fips")){
          page.locator(CREATION_METHOD).nth(0).click();
        } else if (method.equalsIgnoreCase("zip")){
            page.locator(CREATION_METHOD).nth(1).click();
        }
    }
    
}
