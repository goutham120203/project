package pages.geographypage;

import com.microsoft.playwright.Page;
import pages.base.BasePage;

/**
 * Geography Mapping Page - Mapping Approval
 * Screen: Geography Mapping
 */
public class GeographyMappingPage extends BasePage {

    private static final String GEO_MAPPING_HEADER = "//h3[text()='Geography Mapping']";
    private static final String SAVE_BTN = "//*[text()=' Save ']";
    private static final String APPROVE_BTN = "//button[text()=' Approve ']";
    private static final String CONFIRM_BTN = "//button[text()=' Confirm ']";
    private static final String CANCEL_BTN = "//button[text()=' Cancel ']";

    private static final String SUCCESS_MESSAGE = "Geography mappings have been saved successfully.";
    private static final String APPROVED_MESSAGE = "Geography mapping successfully approved and moved to next stage.";

    public GeographyMappingPage(Page page) {
        super(page);
    }

    // ============= Screen Validation =============

    public boolean isMappingScreenDisplayed() {
        return isElementVisible(GEO_MAPPING_HEADER);
    }

    public boolean isOnMappingScreen() {
        return isOnScreenByURL("geography-mapping");
    }

    // ============= Actions =============

    public void clickSave() {
        clickElement(SAVE_BTN);
    }

    public void clickApprove() {
        clickElement(APPROVE_BTN);
    }

    public void clickConfirm() {
        clickElement(CONFIRM_BTN);
    }

    public void clickCancel() {
        clickElement(CANCEL_BTN);
    }

    public void approveMappingWorkflow() {
        clickApprove();
        clickConfirm();
    }

    // ============= Verification =============

    public boolean verifySaveSuccess() {
        return verifySuccessMessage(SUCCESS_MESSAGE);
    }

    public boolean verifyApprovalSuccess() {
        return verifySuccessMessage(APPROVED_MESSAGE);
    }

    // ============= Profile Data Validation =============

    public void validateProfileData(java.util.Map<String, String> data) {
        // Validates that profile data section is visible on Mapping screen
        validateProfileDataIsVisible(data);
    }
}
