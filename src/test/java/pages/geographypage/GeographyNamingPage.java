package pages.geographypage;

import com.microsoft.playwright.Page;
import pages.base.BasePage;

/**
 * Geography Naming Page - Geography Naming Approval
 * Screen: Geography Naming
 */
public class GeographyNamingPage extends BasePage {

    private static final String GEO_NAMING_HEADER = "//h3[text()='Geography Naming']";
    private static final String APPROVE_BTN_1 = "//button[text()=' Approve ']";
    private static final String DOWNLOAD_BTN = "//button[@title='Download Data as Excel']";
    private static final String SAVE_BTN = "//*[text()=' Save ']";

    private static final String SUCCESS_MESSAGE = "Geography Naming successfully approved and moved to next stage.";

    public GeographyNamingPage(Page page) {
        super(page);
    }

    // ============= Screen Validation =============

    public boolean isNamingScreenDisplayed() {
        return isElementVisible(GEO_NAMING_HEADER);
    }

    public boolean isOnNamingScreen() {
        return isOnScreenByURL("geography-naming");
    }

    // ============= Actions =============

    public void clickApprove() {
        clickElement(APPROVE_BTN_1);
    }

    public void clickApproveSecond() {
        page.locator(APPROVE_BTN_1).nth(1).click();
    }

    public void clickSave() {
        clickElement(SAVE_BTN);
    }

    public void clickDownload() {
        clickElement(DOWNLOAD_BTN);
    }

    public void approveNamingWorkflow() {
        clickApprove();
        clickApproveSecond();
    }

    // ============= Verification =============

    public boolean verifyApprovalSuccess() {
        return verifySuccessMessage(SUCCESS_MESSAGE);
    }

    // ============= Profile Data Validation =============

    public void validateProfileData(java.util.Map<String, String> data) {
        // Validates that profile data section is visible on Naming screen
        validateProfileDataIsVisible(data);
    }
}
