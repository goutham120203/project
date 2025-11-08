
Feature: Creating Circana profile

  Scenario: Create Circana profile with valid data
    Given I am on the Circana profile creation form
    When I select "IRI" in the Circana client name field
    And I enter "Client visible name" in the Circana client visible field
    And I select "Walmart (WALM)" in the Circana outlet section
    And I enter Circana note "testing" in the Circana notes field
    And I click on Circana save profile button
    Then I am redirected to the Circana profiles page

  @regression
  Scenario: Create Circana profile with missing mandatory fields
    Given I am on the Circana profile creation form
    When I leave Circana client name empty
    And I leave Circana client visible empty
    And I click on Circana save profile button
    Then error "Client selection is required." message is displayed for client name
    Then Circana error "Client visible name is required." is displayed for client visible name

  @regression
  Scenario: Create Circana profile without selecting outlets
    Given I am on the Circana profile creation form
    When I select "IRI" in the Circana client name field
    And I enter "Testing" in the Circana client visible field
    And I do not select any Circana outlet in the outlets section
    And I click on Circana save profile button
    Then Circana error "Please select at least one outlet." is displayed for outlet

  @regression
  Scenario: Circana user can select multiple outlets
    Given I am on the Circana profile creation form
    When I select "Multi Outlet (MULO)" in the Circana outlet section
    And I select "Walmart (WALM)" in the Circana outlet section
    Then Circana outlet "Multi Outlet (MULO)" is selected
    And Circana outlet "Walmart (WALM)" is selected

  @regression
  Scenario Outline: Verify Circana Special Categories and Audit options after selecting outlets
    Given I am on the Circana profile creation form
    When I select "<outlet>" in the Circana outlet section
    Then Circana special categories section is displayed
    And Circana audit options section is displayed

    Examples:
      | outlet             |
      | Convenience (CONV) |
      | Food (FOOD)        |
      | Drug (DRUG)        |

  @regression
  Scenario: Verify Circana Audit options after selecting Walmart
    Given I am on the Circana profile creation form
    When I select "Walmart (WALM)" in the Circana outlet section
    Then Circana audit options section is displayed

  @regression
  Scenario: Verify Circana Special Categories after selecting Liquor
    Given I am on the Circana profile creation form
    When I select "Liquor (LIQR)" in the Circana outlet section
    Then Circana special categories section is displayed

  @regression
  Scenario: Circana user cancels Circana profile form
    Given I am on the Circana profile creation form
    When I click on Circana cancel button
    Then I am redirected to the Circana profiles page