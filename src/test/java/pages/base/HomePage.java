package pages.base;

import com.microsoft.playwright.Page;

public class HomePage {
    private final Page page;
    private final String profileMenu = "//span[text()='Profiles']";
    private final String addNewProfile = "//button[text()=' Add New Profile ']";
    private final String manufacturerProfile = "//h5[text()='Manufacturer']";
    private final String retailer = "//button[text()=' Select Retailer ']";
    private final String Circana = "//button[text()=' Select Circana Profile ']";
    private final String geography = "//span[text()='Geography']";

    public HomePage(Page page){
        this.page = page;
    }

    public String getTitle(){
        return page.title();
    }

    public void goToProfiles(){
        page.click(profileMenu);
    }

    public void goToManufacturer(){
        page.click(profileMenu);
        page.click(addNewProfile);
        page.click(manufacturerProfile);
    }

    public void goToRetailer(){
        page.click(profileMenu);
        page.click(addNewProfile);
        page.click(retailer);
    }

    public void goToCircana(){
        page.click(profileMenu);
        page.click(addNewProfile);
        page.click(Circana);
    }

    public void goToGeography(){
        page.click(geography);
    }
}
