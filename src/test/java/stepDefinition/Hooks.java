package stepDefinition;


import com.microsoft.playwright.Page;

import factory.DriverFactory;
import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.Scenario;

public class Hooks {
    
    @Before
    public void setUp(){
        DriverFactory.initBrowser();
    }

    @After
    public void tearDown(Scenario scenario){
        Page page = DriverFactory.getPage();

        if (page != null){
            try{
                if(scenario.isFailed()) {
                    page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
                    byte[] screenshot = page.screenshot(); 
                    scenario.attach(screenshot, "image/png", scenario.getName());
                }
            }catch(Exception e){
                System.err.println("ScreenShot capture failed: "+e.getMessage());
            }finally{
                DriverFactory.closeBrowser();
            }
        }
        
    }

}
