package stepDefinition;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.assertions.PlaywrightAssertions;

import factory.DriverFactory;
import io.cucumber.java.en.*;
import pages.base.HomePage;


public class HomeSteps {
        private Page page = DriverFactory.getPage();
        private HomePage homePage;

    @Given("have a valid application URL")
    public void have_a_valid_application_url() {
        page.navigate("http://ec2-56-228-14-238.eu-north-1.compute.amazonaws.com/");
        homePage = new HomePage(page);
        String t = homePage.getTitle();
        System.out.println(t);
    }
    @Then("the application should load with title {string}")
    public void the_application_should_load_with_title(String string) {
        PlaywrightAssertions.assertThat(page).hasTitle(string);
    }

}
