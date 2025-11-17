package pages.geographypage;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.TimeoutError;
import com.microsoft.playwright.options.WaitForSelectorState;
import pages.base.BasePage;

/**
 * Geography Main Page - Profile Selection and Geography Set Search
 * Screen: Geographies Main View
 */
public class GeographyMainPage extends BasePage {

    // Locators - Profile Selection
    private static final String PROFILE_LIST = "//*[@id='profileSelect_list']/p-selectitem/li";
    private static final String SEARCH_PROFILE = "//*[@id='profileSelect']";
    private static final String INPUT_SEARCH_PROFILE = "//*[@id='profileSelect']//input";
    private static final String CREATE_NEW_GEO_BTN = " Create New Geography Set ";

    // Locators - Geography Set
    private static final String GEOGRAPHY_SET_LIST = "//div[@class='col-md-6 col-xl-4 mb-4 ng-star-inserted']";
    private static final String SEARCH_GEO_SETS_PLACEHOLDER = "Search geography sets...";

    // Locators - Region Selection
    private static final String CUSTOM_REGION = "//h6[text()='Custom Region']";
    private static final String CUSTOM_CENSUS_CHAIN = "//h6[text()='Custom Census Chain (CCC)']";

    public GeographyMainPage(Page page) {
        super(page);
    }

    // ============= Navigation Validation =============

    public boolean isOnGeographyPage() {
        page.waitForURL("**/geographies**");
        return page.url().contains("geographies");
    }

    // ============= Profile Management =============

    public int getProfileCount() {
        return getElementCount(PROFILE_LIST);
    }

    public void openProfileSearch() {
        clickElement(SEARCH_PROFILE);
    }

    public void searchProfile(String profileName) {
        if (profileName == null || profileName.trim().isEmpty()) {
            throw new IllegalArgumentException("Profile name cannot be empty");
        }
        clickAndEnter(INPUT_SEARCH_PROFILE, profileName);
    }

    public void selectProfile(int index) {
        try {
            page.waitForSelector(PROFILE_LIST);
            page.locator(PROFILE_LIST).nth(index).click();
        } catch (TimeoutError e) {
            throw new RuntimeException("Failed to select profile at index: " + index);
        }
    }

    public boolean isProfileSelected() {
        return isElementVisible(CREATE_NEW_GEO_BTN);
    }

    // ============= Geography Set Search & Selection =============

    public int getGeographySetsCount() {
        waitForStabilization();
        return getElementCount(GEOGRAPHY_SET_LIST);
    }

    public void searchGeographySet(String geoSetName) {
        if (geoSetName == null || geoSetName.trim().isEmpty()) {
            throw new IllegalArgumentException("Geography set name cannot be empty");
        }
        fillByPlaceholder(SEARCH_GEO_SETS_PLACEHOLDER, geoSetName);
    }

    public void selectGeographySetByName(String setName) {
        String selector = buildCardSelector(setName, "h5");
        try {
            page.waitForSelector("div.geography-set-card",
                new Page.WaitForSelectorOptions()
                    .setState(WaitForSelectorState.VISIBLE)
                    .setTimeout(DEFAULT_TIMEOUT));
            
            Locator card = page.locator(selector);
            if (card.count() == 0) {
                throw new RuntimeException("Geography set not found: " + setName);
            }
            card.first().click();
        } catch (TimeoutError e) {
            throw new RuntimeException("Timeout waiting for geography set: " + setName);
        }
    }

    public void selectGeographySetByStatus(String status) {
        String selector = buildCardSelector(status, "span");
        try {
            page.waitForSelector("div.geography-set-card",
                new Page.WaitForSelectorOptions()
                    .setState(WaitForSelectorState.VISIBLE)
                    .setTimeout(DEFAULT_TIMEOUT));
            
            Locator card = page.locator(selector);
            if (card.count() == 0) {
                throw new RuntimeException("Geography set with status not found: " + status);
            }
            card.first().click();
        } catch (TimeoutError e) {
            throw new RuntimeException("Timeout waiting for geography set with status: " + status);
        }
    }

    private String buildCardSelector(String text, String tagName) {
        return "//div[contains(@class,'geography-set-card')]//" + tagName +
               "[translate(normalize-space(text()), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz') = '" +
               text.toLowerCase() + "']/ancestor::div[contains(@class,'geography-set-card')]";
    }

    // ============= Geography Set Creation =============

    public void clickCreateNewGeographySet() {
        clickElementByText(CREATE_NEW_GEO_BTN);
        handleGeographyTypeSelection();
    }

    private void handleGeographyTypeSelection() {
        if (isElementVisible(CUSTOM_REGION) && isElementVisible(CUSTOM_CENSUS_CHAIN)) {
            clickElement(CUSTOM_CENSUS_CHAIN);
        }
    }
}
