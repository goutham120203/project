package pages.geographypage;

import com.microsoft.playwright.Page;
import pages.base.BasePage;

/**
 * Final Review Page - Final Approval and Submission
 * Screen: Final Review
 */
public class FinalReviewPage extends BasePage {

    // Review Buttons
    private static final String RMA_DEF_BTN = "//button[text()=' RMA Definition ']";
    private static final String CRMA_DEF_BTN = "//button[text()=' CRMA Definition ']";
    private static final String GEO_MAPPING_BTN = "//button[text()=' Geography Mapping ']";
    private static final String GEO_NAMING_BTN = "//button[text()=' Geography Naming ']";
    private static final String PARENTAGE_BTN = "//button[text()=' Parentage ']";
    private static final String RELEASE_RESULTS_BTN = "//button[text()=' Release Results ']";
    private static final String CHANGE_HIGHLIGHTS_BTN = "//button[text()=' Change Highlights ']";

    // Approval Checkboxes
    private static final String GEO_CREATION_APPROVAL = "#geographyCreationApproval";
    private static final String GEO_HIERARCHY_APPROVAL = "#geographyHierarchyApproval";
    private static final String GEO_MAPPING_APPROVAL = "#geographyMappingApproval";
    private static final String GEO_NAMING_APPROVAL = "#geographyNamingApproval";
    private static final String PARENTAGE_APPROVAL = "#approveParentage";
    private static final String RELEASE_RESULTS_APPROVAL = "#releaseResultsApproval";
    private static final String TOTAL_US_APPROVAL = "#totalUSApproval";
    private static final String CHANGE_HIGHLIGHTS_APPROVAL = "#changeHighlightsApproval";

    // Final Submission
    private static final String FINAL_SUBMIT_BTN = "//button[text()=' Final Submit ']";
    private static final String SUBMIT_ALERT_BTN = "button:has-text('Submit Final')";
    private static final String FINAL_REPORTS = "//h5[text()=' Final Reports ']";

    public FinalReviewPage(Page page) {
        super(page);
    }

    // ============= Screen Validation =============

    public boolean isFinalReviewScreenDisplayed() {
        return isOnScreenByURL("final-review");
    }

    public boolean isFinalReportsDisplayed() {
        return isElementVisible(FINAL_REPORTS);
    }

    // ============= Review Buttons =============

    public void clickRMADefinitionReview() {
        clickElement(RMA_DEF_BTN);
    }

    public void clickCRMADefinitionReview() {
        clickElement(CRMA_DEF_BTN);
    }

    public void clickMappingReview() {
        clickElement(GEO_MAPPING_BTN);
    }

    public void clickNamingReview() {
        clickElement(GEO_NAMING_BTN);
    }

    public void clickParentageReview() {
        clickElement(PARENTAGE_BTN);
    }

    public void clickReleaseResultsReview() {
        clickElement(RELEASE_RESULTS_BTN);
    }

    public void clickChangeHighlightsReview() {
        clickElement(CHANGE_HIGHLIGHTS_BTN);
    }

    // ============= Approvals - Retailer Workflow =============

    public void approveRetailerWorkflow() {
        clickElement(GEO_CREATION_APPROVAL);    // RMA
        clickElement(GEO_CREATION_APPROVAL);    // CRMA
        clickElement(GEO_HIERARCHY_APPROVAL);
        clickElement(GEO_MAPPING_APPROVAL);
        clickElement(GEO_NAMING_APPROVAL);
        clickElement(PARENTAGE_APPROVAL);
        clickElement(RELEASE_RESULTS_APPROVAL);
        clickElement(CHANGE_HIGHLIGHTS_APPROVAL);
    }

    // ============= Approvals - Manufacturer/Circana Workflow =============

    public void approveManufacturerWorkflow() {
        clickElement(GEO_CREATION_APPROVAL);    // County List
        clickElement(GEO_HIERARCHY_APPROVAL);
        clickElement(GEO_MAPPING_APPROVAL);
        clickElement(GEO_NAMING_APPROVAL);
        clickElement(RELEASE_RESULTS_APPROVAL);
        clickElement(TOTAL_US_APPROVAL);
    }

    // ============= Approvals - Manufacturer/Circana Workflow =============
    public void approveCircanaWorkflow(){
        clickElement(GEO_CREATION_APPROVAL);    // County List
        clickElement(GEO_HIERARCHY_APPROVAL);
        clickElement(GEO_MAPPING_APPROVAL);
        clickElement(GEO_NAMING_APPROVAL);
        clickElement(PARENTAGE_APPROVAL);
        clickElement(RELEASE_RESULTS_APPROVAL);
        clickElement(TOTAL_US_APPROVAL);
    }

    // ============= Individual Approvals =============

    public void approveRMADefinition() {
        clickElement(GEO_CREATION_APPROVAL);
    }

    public void approveCRMADefinition() {
        clickElement(GEO_CREATION_APPROVAL);
    }

    public void approveHierarchy() {
        clickElement(GEO_HIERARCHY_APPROVAL);
    }

    public void approveMapping() {
        clickElement(GEO_MAPPING_APPROVAL);
    }

    public void approveNaming() {
        clickElement(GEO_NAMING_APPROVAL);
    }

    public void approveParentage() {
        clickElement(PARENTAGE_APPROVAL);
    }

    public void approveReleaseResults() {
        clickElement(RELEASE_RESULTS_APPROVAL);
    }

    public void approveTotalUS() {
        clickElement(TOTAL_US_APPROVAL);
    }

    public void approveChangeHighlights() {
        clickElement(CHANGE_HIGHLIGHTS_APPROVAL);
    }

    // ============= Final Submission =============

    public void clickFinalSubmit() {
        clickElement(FINAL_SUBMIT_BTN);
    }

    public void submitFinalAlert() {
        clickElement(SUBMIT_ALERT_BTN);
    }

    public void completeFinalReview() {
        clickFinalSubmit();
        submitFinalAlert();
    }

    // ============= Profile Data Validation =============

    public void validateProfileData(java.util.Map<String, String> data) {
        // Validates that profile data section is visible on Final Review screen
        validateProfileDataIsVisible(data);
    }
}
