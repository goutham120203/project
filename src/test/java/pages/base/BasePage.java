package pages.base;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.TimeoutError;
import com.microsoft.playwright.options.WaitForSelectorState;

import java.util.Map;
import java.util.regex.Pattern;

/**
 * Base Page - Contains common methods used across all page objects
 */
public abstract class BasePage {
    protected final Page page;
    protected static final int DEFAULT_TIMEOUT = 5000;
    protected static final int SHORT_TIMEOUT = 2000;


    

    public BasePage(Page page) {
        this.page = page;
    }

    // ============= Common Click & Fill Methods =============
    
    protected void clickElement(String selector) {
        try {
            page.waitForSelector(selector, new Page.WaitForSelectorOptions().setTimeout(DEFAULT_TIMEOUT));
            page.click(selector);
        } catch (TimeoutError e) {
            throw new RuntimeException("Failed to click element: " + selector + " - " + e.getMessage());
        }
    }

    protected void fillText(String selector, String text) {
        try {
            page.waitForSelector(selector, new Page.WaitForSelectorOptions().setTimeout(DEFAULT_TIMEOUT));
            page.fill(selector, text);
        } catch (TimeoutError e) {
            throw new RuntimeException("Failed to fill text in: " + selector + " - " + e.getMessage());
        }
    }

    protected void selectOption(String selector, String value) {
        try {
            page.waitForSelector(selector, new Page.WaitForSelectorOptions().setTimeout(DEFAULT_TIMEOUT));
            page.selectOption(selector, value);
        } catch (TimeoutError e) {
            throw new RuntimeException("Failed to select option: " + selector + " - " + e.getMessage());
        }
    }

    protected void selectOptionByLabel(String selector, String label) {
        try {
            page.waitForSelector(selector, new Page.WaitForSelectorOptions().setTimeout(DEFAULT_TIMEOUT));
            page.locator(selector).selectOption(new com.microsoft.playwright.options.SelectOption().setLabel(label));
        } catch (TimeoutError e) {
            throw new RuntimeException("Failed to select option by label: " + selector + " - " + e.getMessage());
        }
    }

    // ============= Common Verification Methods =============
    
    protected boolean isElementVisible(String selector) {
        try {
            page.waitForSelector(selector, 
                new Page.WaitForSelectorOptions()
                    .setState(WaitForSelectorState.VISIBLE)
                    .setTimeout(SHORT_TIMEOUT));
            return page.locator(selector).isVisible();
        } catch (TimeoutError e) {
            return false;
        }
    }

    protected boolean isElementPresent(String selector) {
        return page.locator(selector).count() > 0;
    }

    protected int getElementCount(String selector) {
        return page.locator(selector).count();
    }

    protected String getElementText(String selector) {
        page.waitForSelector(selector, new Page.WaitForSelectorOptions().setTimeout(DEFAULT_TIMEOUT));
        return page.locator(selector).innerText();
    }

    protected boolean isElementEnabled(String selector) {
        return page.locator(selector).isEnabled();
    }

    // ============= URL Validation =============
    
    protected boolean isOnScreenByURL(String stage) {
        String expectedPattern = ".*/geography-set/\\d+/" + stage + "$";
        try {
            page.waitForURL(Pattern.compile(expectedPattern), 
                new Page.WaitForURLOptions().setTimeout(DEFAULT_TIMEOUT));
            return page.url().matches(expectedPattern);
        } catch (TimeoutError e) {
            return false;
        }
    }

    protected boolean verifySuccessMessage(String message) {
        String pageContent = page.textContent("body");
        return pageContent != null && pageContent.contains(message);
    }

    // ============= Helper Methods =============
    
    protected Locator getLocator(String selector) {
        return page.locator(selector);
    }

    protected void waitForStabilization() {
        page.waitForTimeout(500);
    }

    protected void clickElementByText(String text) {
        page.getByText(text).click();
    }

    protected void clickAndEnter(String placeholder, String text) {
        page.locator(placeholder).click();
        page.locator(placeholder).fill(text);
    }

    protected void fillByPlaceholder(String placeholder,String text){
        page.getByPlaceholder(placeholder).click();
        page.getByPlaceholder(placeholder).fill(text);
    }

    // ============= Profile Data Validation =============
    
    /**
     * Validates profile data visibility on the current screen
     * Checks if critical profile information elements are visible
     * 
     * USAGE: All page classes inherit this method automatically
     * Example: in any page class, call this.validateProfileData(testData)
     * 
     * @param data Map of test data (can be empty - just validates visibility)
     * @throws AssertionError if required elements are not visible
     * @throws RuntimeException if timeout occurs during validation
     */
    public void validateProfileDataIsVisible(Map<String, String> data) {
        final String CHEVRON_DOWN = "//i[@class='chevron-icon bi-chevron-down']";
        final String CHEVRON_UP = "//i[@class='chevron-icon bi-chevron-up']";
        final String VALIDATE_SUMMARY = "//*[@id='geographySetSummary']";
        final String VALIDATE_VERSION = "//*[@id='version']";
        final String VALIDATE_RELEASE_DATE = "//*[@id='releaseStartDate']";

        clickElement(CHEVRON_DOWN);

        try {
            page.waitForSelector(VALIDATE_SUMMARY,
                new Page.WaitForSelectorOptions()
                    .setState(WaitForSelectorState.VISIBLE)
                    .setTimeout(DEFAULT_TIMEOUT));

            if (!isElementVisible(VALIDATE_SUMMARY)) {
                throw new AssertionError("Geography Summary not visible");
            }

            if (!isElementVisible(VALIDATE_VERSION)) {
                throw new AssertionError("Version not visible");
            }

            if (!isElementVisible(VALIDATE_RELEASE_DATE)) {
                throw new AssertionError("Release Date not visible");
            }

        } catch (TimeoutError e) {
            throw new RuntimeException("Timeout during profile validation: " + e.getMessage());
        } finally {
            clickElement(CHEVRON_UP);
        }
    }
}
