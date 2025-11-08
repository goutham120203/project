
Feature: Creating manufacturer profile
  As a user
  I Want To Create a Manufacture Profile
  Where Client Name should be Unic
  
  
  Scenario: Create manufacturer profile with valid data
    Given I am on the manufacturer profile creation form
    When I select "ALCON" in the manufacturer client name field
    And I enter "Testing" in the manufacturer client visible field
    And I select "No" as manufacturer CCC eligible
    And I select "Multi Outlet (MULO)" in the manufacturer outlet section
    And I enter manufacturer note "testing" in the manufacturer notes field
    And I click on manufacturer save profile button
    Then I am redirected to the manufacturer profiles page

  @regression
  Scenario: Create manufacturer profile with missing mandatory fields
    Given I am on the manufacturer profile creation form
    When I leave manufacturer client name empty
    And I leave manufacturer client visible empty
    And I click on manufacturer save profile button
    Then manufacturer error "Client selection is required." message is displayed for client name
    And manufacturer error "Client visible name is required." message is displayed for client visible name

  @regression
  Scenario: Create manufacturer profile without selecting outlets
    Given I am on the manufacturer profile creation form
    When I select "PEPSICO" in the manufacturer client name field
    And I enter "pepsico testing" in the manufacturer client visible field
    And I do not select any manufacturer outlet in the outlets section
    And I click on manufacturer save profile button
    Then manufacturer error "Please select at least one outlet." message is displayed for outlet
  
  @regression
  Scenario: Manufacturer user can select CCC eligible using radio button
    Given I am on the manufacturer profile creation form
    When I select "Yes" as manufacturer CCC eligible
    Then the manufacturer "Yes" radio button for CCC eligible should be selected

  @regression
  Scenario: Manufacturer user can select multiple outlets
    Given I am on the manufacturer profile creation form
    When I select "Multi Outlet (MULO)" in the manufacturer outlet section
    And I select "Walmart (WALM)" in the manufacturer outlet section
    Then manufacturer outlet "Multi Outlet (MULO)" is selected
    And manufacturer outlet "Walmart (WALM)" is selected

  @regression
  Scenario Outline: Verify manufacturer Special Categories and Audit options after selecting outlets
    Given I am on the manufacturer profile creation form
    When I select "<outlet>" in the manufacturer outlet section
    Then manufacturer special categories section is displayed
    And manufacturer audit options section is displayed

    Examples:
      | outlet            |
      | Convenience (CONV)|
      | Food (FOOD)       |
      | Drug (DRUG)       |

  @regression
  Scenario: Verify manufacturer Audit options after selecting Walmart
    Given I am on the manufacturer profile creation form
    When I select "Walmart (WALM)" in the manufacturer outlet section
    Then manufacturer audit options section is displayed

  @regression
  Scenario: Manufacturer user cancels the form
    Given I am on the manufacturer profile creation form
    When I click on manufacturer cancel button
    Then I am redirected to the manufacturer profiles page