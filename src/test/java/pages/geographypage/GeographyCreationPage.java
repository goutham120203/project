package pages.geographypage;

import java.util.Map;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.TimeoutError;

import pages.base.BasePage;

/**
 * Geography Creation Page - Geography Creation and RMA/CRMA Definition
 * Screen: Geography Creation with Definitions
 */
public class GeographyCreationPage extends BasePage {

    // Locators - Geography Selection
    private static final String SELECT_BUTTON = "//button[text()=' Select ']";
    private static final String STATE_FILTER = "#state-filter";
    private static final String GEO_NAME = "//input[@id='geoName']";

    // Locators - Store Transfer
    private static final String AVAILABLE_STORES = "//*[@id=\"pn_id_1-table\"]/tbody/tr";
    private static final String MOVE_ALL_STORES_BTN = "//button[@class='btn btn-outline-primary btn-transfer']";

    // Locators - Creation & Review
    private static final String CREATE_GEOGRAPHY_BTN = "//button[contains(text(), 'Create Geography')]";
    private static final String REVIEW_BTN = "//button[text()=' Review ']";
    private static final String SAVE_BTN = "//*[text()=' Save ']";

    // Locators - Approval Workflow
    private static final String APPROVE_BTN = "//button[text()=' Approve ']";
    private static final String PROCEED_ANYWAY_BTN = "//button[text()=' Proceed Anyway ']";
    private static final String CONFIRM_BTN = "//button[text()=' Confirm ']";
    private static final String YES_CRMA_BTN = "//button[normalize-space()='Yes']";


    public GeographyCreationPage(Page page) {
        super(page);
    }

    // ============= Geography Creation =============

    public void clickSelect() {
        clickElement(SELECT_BUTTON);
    }

    public void selectState(String state) {
        selectOption(STATE_FILTER, state);
    }

    public void enterGeographyName(String geoName) {
        fillText(GEO_NAME, geoName);
    }

    public int getAvailableStoresCount() {
        return getElementCount(AVAILABLE_STORES);
    }

    public void moveAllStoresToTarget() {
        page.locator(MOVE_ALL_STORES_BTN).nth(1).click();
    }

    public void clickCreateGeography() {
        clickElement(CREATE_GEOGRAPHY_BTN);
    }

    // ============= Approval Workflow =============

    public void clickReview() {
        clickElement(REVIEW_BTN);
    }

    public void clickSave() {
        clickElement(SAVE_BTN);
    }

    public void clickApprove() {
        clickElement(APPROVE_BTN);
    }

    public void clickProceedAnyway() {
        clickElement(PROCEED_ANYWAY_BTN);
    }

    public void clickConfirm() {
        clickElement(CONFIRM_BTN);
    }

    public void clickYesForCRMA() {
        clickElement(YES_CRMA_BTN);
    }

    // ============= Workflow Helpers =============

    public void approveRMADefinition() {
        clickApprove();
        clickProceedAnyway();
        clickConfirm();
    }

    public void approveCRMADefinition() {
        clickYesForCRMA();
        clickSave();
        clickApprove();
        clickConfirm();
    }

    // ============= Verification =============

    public String getReviewScreenTitle() {
        return getElementText("//h5[contains(text(),'Geography')]");
    }


    // ============= Validation =================

    public void validateProfileData(Map<String, String> data) {
        validateProfileDataIsVisible(data);
    }
        
 }
