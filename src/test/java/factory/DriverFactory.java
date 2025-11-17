package factory;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;

public class DriverFactory {
    private static Playwright playwright;
    private static Browser browser;
    private static Page page;

    public static Page initBrowser(){
        playwright = Playwright.create();
        browser = playwright.chromium().launch(
            new BrowserType.LaunchOptions().setHeadless(true).setSlowMo(2000)
        );

        page = browser.newPage();
        return page;
    }

    public static Page getPage(){
        return page;
    }

    public static void closeBrowser(){
        if(browser != null) browser.close();   
        if(playwright != null) playwright.close();
    }
}

