package pages.geographypage;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.regex.Pattern;

import javax.management.RuntimeErrorException;

import org.testng.Assert;

import com.microsoft.playwright.Download;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.TimeoutError;
import com.microsoft.playwright.Page.WaitForSelectorOptions;
import com.microsoft.playwright.options.SelectOption;
import com.microsoft.playwright.options.WaitForSelectorState;

public class GeographyPage {
    private final Page page;


    private final String ProfilesList = "//*[@id='profileSelect_list']/p-selectitem/li";
    private final String searchProfile = "//*[@id='profileSelect']";
    private final String inputSearchProfile = "//*[@id='profileSelect']//input";
    private final String geographySetlist = "//div[@class='col-md-6 col-xl-4 mb-4 ng-star-inserted']";
    private final String createNewGeoBtn = " Create New Geography Set "; //text
    private final String searchBtnGeography = "Search geography sets..."; //Place holder
    private final String geograhyType = "//select[@formcontrolname='geographyType']";
    private final String GeographySetName = "//*[@id='geographySetName']";
    private final String versionDrop = "//select[@formcontrolname='version']";
    private final String geographySetSummary = "//input[@id='geographySetSummary']";
    private final String previousGeographySet = "//select[@formcontrolname='previousGeoSetId']";
    private final String geographySetNotes = "//*[@id='geographySetNotes']";
    private final String reviewButton = "//button[text()=' Review ']";
    private final String continueButton = "//*[text()=' Continue ']";
    private final String selectButton = "//button[text()=' Select ']";
    private final String geoName ="//input[@id='geoName']";
    private final String availableStores = "//*[@id=\"pn_id_1-table\"]/tbody/tr";
    private final String targetStores = "//*[@id=\"pn_id_2-table\"]/tbody/tr";
    private final String approveButton = "//button[text()=' Approve ']";
    private final String proceedAnywayButton = "//button[text()=' Proceed Anyway ']";
    private final String geographyMappingButton = "//span[text()='Geography Mapping']";
    private final String releaseEvaluationButton = "//span[text()='Release Evaluation']";
    private final String geographyNamingButton = "//span[text()='Geography Naming']";
    private final String finalReviewButton = "//span[text()='Final Review']";
    private final String finalSubmitButton = "//button[text()=' Final Submit ']";
    private final String errorMessagevaild = "//h5[text()=' Error ']";
    private final String editCrmaButton = "//button[text()=' Edit ']";
    private final String btnDownload = "//button[text()=' Download ']";
    private final String btnPrint = "//button[text()=' Print ']";
    private final String btncustumRegion = "//h6[text()='Custom Region']";
    private final String btnCustomCensusChain = "//h6[text()='Custom Census Chain (CCC)']";
    // private final String geographyTree = "//*[@role='treeitem']//div/div/span";


    // validation
    private final String validateGeographySetsSummary = "//*[@id='geographySetSummary']";
    private final String validatePreviousGeographySet = "//*[@id='previousGeographySet']";
    private final String validateVersion = "//*[@id='version']";
    private final String validateReleaseDate = "//*[@id='releaseStartDate']";
     
    private Path fileDowndloadPath;
    private String downloadedFileName;
    private boolean printTriggered = false;
    
    public GeographyPage(Page page){
        this.page = page;
    }

    public boolean isOnGeographyPage(){
        page.waitForURL("**/geographies**");
        return page.url().contains("geographies");
    }

    public boolean isOnScreen(String stage){

        String expectedPattern = ".*/geography-set/\\d+/" + stage + "$"; 
        try{
            page.waitForURL(Pattern.compile(expectedPattern),new Page.WaitForURLOptions().setTimeout(3000));
            return page.url().matches(expectedPattern);
        } catch (TimeoutError e) {
           System.out.println("Timed out waiting for URL to match: " + expectedPattern);
           return false;
         }
        
    }

    public int getProfileCount(){
        //page.waitForSelector(ProfilesList);
        return page.locator(ProfilesList).count();
    }

    public void clickSearchProfile(){
        page.click(searchProfile);
    }   

    public void selectProfiles(int n){
        page.waitForSelector(ProfilesList);
        page.locator(ProfilesList).nth(n).click();
    }

    public void inputSearchProfile(String text){
        page.click(inputSearchProfile);
        page.fill(inputSearchProfile,text);
    }

    public boolean isSelectedProfileDisplayed(){
       return page.getByText(createNewGeoBtn).isVisible();
    }

    public void searchGeogeographySets(String text){
        page.getByPlaceholder(searchBtnGeography).click();
        page.getByPlaceholder(searchBtnGeography).fill(text);
    }

    public int getGeographySetsCount(){
        page.waitForTimeout(500);
        return page.locator(geographySetlist).count();
    }

    public void clickCreateNewGeographySet(){
        page.getByText(createNewGeoBtn).click();

        if(page.locator(btncustumRegion).isVisible() && page.locator(btnCustomCensusChain).isVisible()){
            page.locator(btnCustomCensusChain).click();
        }
    }

    public void fillGeoSetForm(Map<String,String> data) {
        try {
            // Wait for form elements to be ready
            page.waitForSelector(GeographySetName);
            page.waitForSelector(versionDrop);
            
            // Fill the form
            page.locator(GeographySetName).fill(data.get("Name"));
            
            // Handle version selection with proper format
            String version = data.get("Version").trim();
            page.locator(versionDrop).selectOption(new SelectOption().setLabel(version));
            page.locator(geographySetSummary).fill(data.get("Summary"));
            page.locator(geographySetNotes).fill(data.get("Notes"));

             // Handle for ccc profile
            if(page.locator("//label[@for='customRegionConnection']").isVisible()){
                page.locator(previousGeographySet).selectOption(data.get("Connection"));
            } else {
                page.locator(previousGeographySet).selectOption(data.get("PreviousSet"));
            }
            
        } catch (TimeoutError e) {
            throw new RuntimeException("Timeout while filling geography set form: " + e.getMessage());
        }
    }

    public void fillGeoSetFormForCircana(Map<String,String> data) {
        try {
            // Wait for form elements to be ready
            page.waitForSelector(GeographySetName);
            page.waitForSelector(versionDrop);
            
            // Fill the form
            page.locator(GeographySetName).fill(data.get("Name"));
            
            // Handle version selection with proper format
            String version = data.get("Version").trim();
            page.locator(versionDrop).selectOption(new SelectOption().setLabel(version));
            page.locator(geograhyType).selectOption(data.get("Type"));
            page.locator(geographySetSummary).fill(data.get("Summary"));
            page.locator(previousGeographySet).selectOption(data.get("PreviousSet"));
            page.locator(geographySetNotes).fill(data.get("Notes"));
        } catch (TimeoutError e) {
            throw new RuntimeException("Timeout while filling geography set form: " + e.getMessage());
        }
    }

    public void validateProfileDataInGeoCreation(Map<String, String> data) {
        page.locator("//i[@class='chevron-icon bi-chevron-down']").click();
        try {
            page.waitForSelector(validateGeographySetsSummary, 
                new Page.WaitForSelectorOptions()
                    .setState(WaitForSelectorState.VISIBLE)
                    .setTimeout(5000));

            System.out.println(data.get("Name"));
            System.out.println(data.get("Version"));
            System.out.println(data.get("Summary"));


            Assert.assertTrue(page.locator(validateGeographySetsSummary).isVisible(), 
                "Geography Sets Summary is not visible");
            try{
                Locator sets = page.locator(validatePreviousGeographySet);
                int count = sets.count();
                Locator target = (count > 1) ? sets.nth(1) : sets.first();
                Assert.assertTrue(target.isVisible(),
                "Previous Geography Set is not visible");
            }catch(AssertionError e){
                System.out.println("Geography is Not visible "+e.getMessage());
            }
            
            Assert.assertTrue(page.locator(validateVersion).isVisible(),
                "version is not visible");
            Assert.assertTrue(page.locator(validateReleaseDate).isVisible(),
                "release date is not visible");
            
        } catch (TimeoutError e) {
            throw new RuntimeException("Timeout waiting for elements to be visible: " + e.getMessage());
        } catch (AssertionError e) {
            throw new AssertionError("Validation failed: " + e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("Unexpected error during validation: " + e.getMessage());
        }finally{
            page.locator("//i[@class='chevron-icon bi-chevron-up']").click();
        }
    }

    public void validateNoOfOutlets(int count){
        Assert.assertEquals(page.locator("//input[@role='switch']").count(), count);
    }

    
    // empty fileld
    public void enterGeographySetName(){
        page.click(GeographySetName);
    }

    public String errorMessageForGeographySetName(){
        return page.getByText(" Geography Set Name is required ").innerText();
    }

    public String getDuplicateNameErrorText(){
        return page.locator("//div[contains(@class, 'text-danger')]/div[contains(text(), 'Geography Set with name')]").innerText();
    }

    public void selectGeographyType(String geoType){
        page.waitForSelector(geograhyType);
        page.selectOption(geograhyType,geoType);
    }

    // empty field
    public void selectVision(){
        page.click(versionDrop);
    }

    public String errorMessageForVersion(){
       return page.getByText(" Version is required ").innerText();
    }

    public void selectPreviousGeographySet(){
        page.click(previousGeographySet);
        page.click(geographySetSummary);
    }

    public String errorMessageForPreviousGeo(){
        return page.getByText(" Previous Geography Set is required ").innerText();
    }

    public void selectFirstOutlet(){
        page.locator("//*[@role='switch']").first().click();

         if(page.getByLabel("Yes").isVisible()){
            page.getByLabel("Yes").click();
        }
    }

    public int getCountOfOutletsRetailerProfile(){
        Locator outlets = page.locator("//input[@role='switch']");

        int count = outlets.count();
        int inc = 0;
        for(int i=0;i < count;i++){
            if(outlets.nth(i).isChecked()){
                inc++;
            }
        }
      return inc;
    }

    public void selectAllOutlet(){

        Locator outlets = page.locator("//*[@role='switch']");

        int count = outlets.count();

        for(int i=0;i<=count;i++){
            Locator outlet = outlets.nth(i);
            outlet.click();
        }

    }

    public void clickContinueButton(){
        page.click(continueButton);
    }

    public boolean isContinueButtonEnabled(){
        return page.locator(continueButton).isEnabled();
    }

    public boolean isRmaCreation(){
       page.waitForTimeout(500);
       return page.getByText("RMA Creation").nth(0).isVisible();
    }

    public void selectGeographySet(int n){
        page.locator(geographySetlist).nth(n).click();
    }

    public void selectCardByState(String statusText) {
        try {
            page.waitForSelector("div.geography-set-card",
                new Page.WaitForSelectorOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(3000));
            
            String selector = "//div[contains(@class,'geography-set-card')]//span[translate(normalize-space(text()), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz') = '" 
                + statusText.toLowerCase() + "']/ancestor::div[contains(@class,'geography-set-card')]";
            
            Locator targetCard = page.locator(selector);
            
            if (targetCard.count() == 0) {
                System.out.println("Warning: No geography set card found with status: " + statusText);
                return;
            }
            
            targetCard.first().click();
            
        } catch (TimeoutError e) {
            System.out.println("Timeout waiting for geography set cards to load: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Error selecting geography set card: " + e.getMessage());
        }
    }

    public void selectCardByClientName(String statusText) {
        try {
            page.waitForSelector("div.geography-set-card",
                new Page.WaitForSelectorOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(3000));
            
            String selector = "//div[contains(@class,'geography-set-card')]//h5[translate(normalize-space(text()), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz') = '" 
                + statusText.toLowerCase() + "']/ancestor::div[contains(@class,'geography-set-card')]";
            
            Locator targetCard = page.locator(selector);
            
            if (targetCard.count() == 0) {
                System.out.println("Warning: No geography set card found with status: " + statusText);
                return;
            }
            
            targetCard.first().click();
            
        } catch (TimeoutError e) {
            System.out.println("Timeout waiting for geography set cards to load: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Error selecting geography set card: " + e.getMessage());
        }
    }

    public void clickOnSelectButton(){
        page.click(selectButton);
    }

    public boolean isSelectButtonVisible(){
        page.waitForSelector(selectButton);
       return page.locator(selectButton).isVisible();
    }

    public void selectState(String state){
        page.selectOption("#state-filter",state);
    }

    public void enterGeographyName(String GeoName){
        page.fill(geoName,GeoName);
    }

    public int availableStoresCount(){
        return page.locator(availableStores).count();
    }

    public int targetStoresCount(){
        return page.locator(targetStores).count();
    }

    public void selectTheStores(int n){
        page.locator(availableStores).nth(n).click();
    }

    public void moveSelectedStroesToTarget(){
        page.locator("//button[@class='btn btn-outline-primary btn-transfer']").nth(0).click();
    }

    public void moveAllstroesToTarget(){
        page.locator("//button[@class='btn btn-outline-primary btn-transfer']").nth(1).click();
    }

    public void clickCreateGeography(){
        page.getByText("Create Geography").click();
    }

    public void clickSaveButton(){
        page.locator("//*[text()=' Save ']").click();
    }

    public void clickReviewButton(){
        page.locator(reviewButton).click();
    }

    public String isReviewScreenDisplayed(){
        Locator getText = page.locator("//h4[contains(text(),'Review')]");
        return getText.innerText();
    }

    public void clickApproveButton(){
        page.locator(approveButton).click();
    }

    public void clickProceedAnyway(){
        page.locator(proceedAnywayButton).click();
    }

    public void clickConfirm(){
        page.locator("//button[text()=' Confirm ']").click();
    }

    public void clickCancel(){
        page.locator("//button[text()=' Cancel ']").click();
    }

    public void clickYesForCRMA(){
        page.locator("//button[normalize-space()='Yes']").click();
    }

    public boolean isSuccessfullMessageDisplayed(String successfullMessage){
        return page.textContent("body").contains(successfullMessage);
    }

    public boolean isGeoMappingDisplayed(){
        page.waitForSelector("//h3[text()='Geography Mapping']");
        return page.locator("//h3[text()='Geography Mapping']").isVisible();
    }

    public void clickGeoMappingButton(){
        page.locator(geographyMappingButton).click();
    }

    public boolean isReleaseEvaluationDisplayed(){
        page.waitForSelector("//h3[text()='Release Evaluation']");
        return page.locator("//h3[text()='Release Evaluation']").isVisible();
    }

    public void clickReleaseEvaluationButton(){
        page.locator(releaseEvaluationButton).click();
    }

    public boolean isGeographyNamingDisplayed(){
        page.waitForSelector("//h3[text()='Geography Naming']");
       return page.locator("//h3[text()='Geography Naming']").isVisible();
    }

    public void clickGeographyNamingButton(){
        page.locator(geographyNamingButton).click();
    }

    public void clickApprove(){
        page.waitForSelector("//button[text()=' Approve ']");
        page.locator("//button[text()=' Approve ']").nth(1).click();
    }

    public void clickFinalReview(){
        page.locator(finalReviewButton).click();
    }

    public void approveCountyList(){
        page.locator("#geographyCreationApproval").click();
    }

    public void clickRmaDefinitionReview(){
        page.locator("//button[text()=' RMA Definition ']").click();
    }

    public void approveRmaDefinitionReview(){
        page.locator("#geographyCreationApproval").click();
    }

    public void clickCrmaDefinitionReview(){
        page.locator("//button[text()=' CRMA Definition ']").click();
    }

    public void approveCrmaDefinitionReview(){
        page.locator("#geographyCreationApproval").click();
    }

    public void approveGeographyHierarchy(){
        page.locator("#geographyHierarchyApproval").click();
    }

    public void clickGeographyMappingReview(){
        page.locator("//button[text()=' Geography Mapping ']").click();
    }

    public void approveGeographyMapping(){
        page.locator("#geographyMappingApproval").click();
    }

    public void clickGeographyNamingReview(){
        page.locator("//button[text()=' Geography Naming ']").click();
    }

    public void approveGeographyNaming(){
        page.locator("#geographyNamingApproval").click();
    }

    public void clickParentage(){
        page.locator("//button[text()=' Parentage ']").click();
    }

    public void approveParentage(){
        page.locator("#approveParentage").click();
    }

    public void clickReleaseResults(){
        page.locator("//button[text()=' Release Results ']").click();
    }

    public void approveReleaseResults(){
        page.locator("#releaseResultsApproval").click();
    }

    public void approveTotalUs(){
        page.locator("#totalUSApproval").click();
    }

    public void clickChangeHighlights(){
        page.locator("//button[text()=' Change Highlights ']").click();
    }

    public void approveChageHighlights(){
        page.locator("#changeHighlightsApproval").click();
    }

    public void clickFinalSubmit(){
        page.click(finalSubmitButton);
    }

    public void submitFinalAlert(){
        page.locator("button:has-text('Submit Final')").click();
    }

    public boolean isFinalReportsDisplayed(){
        page.waitForSelector("//h5[text()=' Final Reports ']");
        return page.locator("//h5[text()=' Final Reports ']").isVisible();
    }

    public String verifyRMASpecialHandlingDisplayed(){
        page.waitForTimeout(500);
        return page.locator("//h5[text()=' RMA Special Handling Required ']").innerText();
    }

    public void importRmaFile(String fileName) {
        Path filePath = Paths.get(System.getProperty("user.dir"), "src", "test","files", fileName);
        page.locator("input[type='file']").setInputFiles(filePath);
    }

    public void clickValidatePreviewData(){
        page.getByText("Validate & Preview Data").click();
    }

    public void clickProceedWithoutMissingStores(){
        page.getByText("Proceed Without Missing Stores").click();
    }

    public void selectAvailableForRetailerOnly(){
        page.locator("#deliverableRtl").click();
    }

    public void selectAvailableForManufacturerUse(){
        page.locator("#deliverableMfr").click();
    }

    public boolean isErrorDisplayedForInvalidFile(){
       return page.locator(errorMessagevaild).isVisible();
    }

    public void clickEditButtonForCrma(){
        page.locator(editCrmaButton).nth(1).click();
    }

    public boolean isApproveVisible() {
    // Check if the edit button is both visible and enabled
        page.waitForSelector(approveButton);
        return page.locator(approveButton).isVisible();
    }

    public String getGeographyTreeinnerText(String geoName){
        String xpath = String.format("//span[text()='%s']", geoName);
        return page.locator(xpath).innerText();
    }

    public void clickHighLevelNode(String rootNode){
        page.getByText(rootNode).click();
    }

    public boolean isDuplicateGeographySceenDisplayed(){
        return page.locator("//h4[contains(text(),'Duplicate Geography')]").isVisible();
    }

    public void clickAggregateButton(){
        page.locator("//p-button[@icon='bi bi-stack']//button").click();
    }

    public void enterAggregateName(String aggName){
        page.locator("#aggregateName").fill(aggName);
    }

    public void clickCreateButtonAggregate(){
        page.locator("//span[text()='Create']").click();
    }

    public void isDownloadBtnVisible(){
        page.locator(btnDownload).isVisible();
    }

    public void clickDownloadBtn(){
        Download download = page.waitForDownload(()->{
            page.locator(btnDownload).click();
        });

        downloadedFileName = download.suggestedFilename();

        fileDowndloadPath = Paths.get(System.getProperty("user.dir"),"src", "test","downloads");

         try {
            download.saveAs(fileDowndloadPath.resolve(downloadedFileName));
            System.out.println("File downloaded: " + downloadedFileName);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    public void clickDownloadBtnGeoNaming(){

        Download download = page.waitForDownload(()->{
            page.locator("//button[@title='Download Data as Excel']").click();
        });

        downloadedFileName = download.suggestedFilename();

        fileDowndloadPath = Paths.get(System.getProperty("user.dir"),"src", "test","downloads");

         try {
            download.saveAs(fileDowndloadPath.resolve(downloadedFileName));
            System.out.println("File downloaded: " + downloadedFileName);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    public boolean isDownloadedFileExist(){
        Path filePath = Paths.get(System.getProperty("user.dir"), "src", "test","files", downloadedFileName);
        boolean exists = Files.exists(filePath);

        if(exists){
            System.out.println("File exists : "+downloadedFileName);
        } else{
            System.out.println("File Not Found : "+downloadedFileName);
        }

        return exists;
    }

    public void clickPrintButton() {
    page.onDialog(dialog -> {
        if (dialog.type().equals("beforeunload") || dialog.message().contains("Print")) {
            printTriggered = true;
            dialog.dismiss();// Accept the print dialog
        }
        });

        // Add wait before clicking print to ensure dialog handler is ready
         page.waitForSelector(btnPrint);
         page.click(btnPrint);
    
        // Add small wait after clicking to allow dialog to appear
        page.waitForTimeout(1000);
    }

    public boolean isPrintTriggered(){
        return printTriggered;
    }

    public void clickCustomRegion(){
        page.click(btncustumRegion);
    }

    public void clickCustomCensusChain(){
        page.click(btnCustomCensusChain);
    }

    














}
