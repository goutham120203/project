Feature: Creating retailer profile


  Scenario: Create retailer profile with valid data
    Given I am on the retailer profile creation form
    When I select "WALGREENS" in the retailer client name field
    And I enter "WALGREENS testing" in the retailer client visible field
    And I select "ECOM" in the retailer outlet field
    And I select "Yes" as retailer freshlook participant
    And I select "INCLUDE" as retailer closed and sold store decision
    And I enter 1 in the retailer owner number field
    And I enter "banner" in the retailer banner name field
    And I enter retailer note "testing" in the retailer notes field
    And I click on retailer save profile button
    Then I am redirected to the retailer profiles page

  @regression
  Scenario: Create retailer profile with missing mandatory fields
    Given I am on the retailer profile creation form
    When I leave retailer client name empty
    And I leave retailer client visible empty
    And I leave retailer outlet empty
    And I leave retailer banner field empty
    And I click on retailer save profile button
    Then retailer error "Client selection is required." message for client name is displayed
    And retailer error "Client visible name is required." message for client visible name is displayed
    And retailer error "Retailer outlet selection is required." message for outlet is displayed
    And retailer error "Please fill in all banner fields. Owner number must be greater than 0." message for banner is displayed

  @regression
  Scenario: Verify the retailer default selections
    Given I am on the retailer profile creation form
    Then No is the retailer default selection for freshlook participant
    And EXCLUDE closed stores is the retailer default selection for closed and sold store decision

  @regression
  Scenario: Create retailer profile without Banner Name
    Given I am on the retailer profile creation form
    When I select "WALGREENS" in the retailer client name field
    And I enter "WALGREENS testing" in the retailer client visible field
    And I select "MASS" in the retailer outlet field
    And I select "Yes" as retailer freshlook participant
    And I enter 1 in the retailer owner number field
    And I leave retailer banner name empty
    And I click on retailer save profile button
    Then retailer error "Please fill in all banner fields. Owner number must be greater than 0." message for banner is displayed

  @regression
  Scenario: Retailer user can select Freshlook Participant using radio button
    Given I am on the retailer profile creation form
    When I select "Yes" as retailer freshlook participant
    Then the retailer "Yes" radio button for freshlook should be selected

  @regression
  Scenario: Verify retailer Owner Number accepts numeric values
    Given I am on the retailer profile creation form
    When I enter 12345 in the retailer owner number field
    Then the retailer owner number field should display 12345

  @regression
  Scenario: Retailer user can select Closed/Sold Store Decision options
    Given I am on the retailer profile creation form
    When I select "INCLUDE" as retailer closed and sold store decision
    Then retailer "INCLUDE" should be selected for closed and sold store decision

  @regression
  Scenario: Verify Retailer list displays after selecting Client Name
    Given I am on the retailer profile creation form
    When I select "WALGREENS" in the retailer client name field
    Then the retailer outlet list is displayed

  @regression
  Scenario: Verify retailer sections display after selecting Retailer Outlet
    Given I am on the retailer profile creation form
    When I select "WALGREENS" in the retailer client name field
    And I enter "WALGREENS testing" in the retailer client visible field
    And I select "CONV" in the retailer outlet field
    Then retailer audit RMA section is displayed
    And retailer parentage section is displayed
    And retailer CRMA outlets single and combines section is displayed

  @regression
  Scenario: Create retailer profile without selecting Audit (RMA) and CRMA Outlet options
    Given I am on the retailer profile creation form
    When I select "WALGREENS" in the retailer client name field
    And I enter "WALGREENS testing" in the retailer client visible field
    And I select "CONV" in the retailer outlet field
    And I click on retailer save profile button
    Then retailer error "Please select at least one audit option." is displayed for audit section
    And retailer error "Please select at least one CRMA outlet option." is displayed for CRMA outlet section

  @regression
  Scenario: Retailer user cancels retailer profile form
    Given I am on the retailer profile creation form
    When I click on retailer cancel button
    Then I am redirected to the retailer profiles page