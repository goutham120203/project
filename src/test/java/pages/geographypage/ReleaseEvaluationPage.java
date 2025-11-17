package pages.geographypage;

import com.microsoft.playwright.Page;
import pages.base.BasePage;

/**
 * Release Evaluation Page - Release Evaluation Approval
 * Screen: Release Evaluation
 */
public class ReleaseEvaluationPage extends BasePage {

    private static final String RELEASE_EVAL_HEADER = "//h3[text()='Release Evaluation']";
    private static final String SAVE_BTN = "//*[text()=' Save ']";
    private static final String APPROVE_BTN = "//button[text()=' Approve ']";
    private static final String CONFIRM_BTN = "//button[text()=' Confirm ']";

    private static final String SUCCESS_MESSAGE = "Release evaluation have been saved successfully.";
    private static final String APPROVED_MESSAGE = "Release evaluation approved. Redirecting to Geography Naming...";

    public ReleaseEvaluationPage(Page page) {
        super(page);
    }

    // ============= Screen Validation =============

    public boolean isReleaseEvaluationScreenDisplayed() {
        return isElementVisible(RELEASE_EVAL_HEADER);
    }

    public boolean isOnReleaseEvaluationScreen() {
        return isOnScreenByURL("release-evaluation");
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

    public void approveReleaseEvaluation() {
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
        // Validates that profile data section is visible on Release Evaluation screen
        validateProfileDataIsVisible(data);
    }
}
