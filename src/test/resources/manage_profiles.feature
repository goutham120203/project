Feature: Managing the profiles

  @regression
  Scenario: Navigate to the Profiles page
    Given I am logged in to the application
    When I click on Profile menu
    Then "Profiles" page is displayed

  @regression
  Scenario: Search profile by Client Name
    Given I am on the profiles page
    When I enter "walgreens" in the search field
    Then matching profiles are displayed

  @regression
  Scenario Outline: Filter profiles by profile type
    Given I am on the profiles page
    When I click on All Profiles dropdown
    And I select "<profile_type>" profile type
    Then only "<profile_type>" profiles are displayed

    Examples:
      | profile_type  |
      | Manufacturers |
      | Retailers     |
      | Circana       |


  Scenario: Delete a profile
    Given I am on the profiles page
    When I select a profile
    And I click on Delete button
    Then "Profile deleted successfully" message is displayed
    And the profile is removed from the profiles list

  @regression
  Scenario: View profile details
    Given I am on the profiles page
    When I click on a selected profile
    Then the selected profile details are displayed

  @regression
  Scenario: Close profile view
    Given I am on the profiles page
    Given I am viewing a selected profile
    When I click on Cancel
    Then I am redirected to the profiles page

  Scenario: Edit profile
    Given I am on the profiles page
    When I select a profile
    And I click on Edit button
    Then the selected profile details are displayed

  Scenario: Update manufacturer profile with valid data
    Given I am on the profiles page
    When I select a "Manufacturers" profile
    And I click on Edit button
    And I update "updated Name" to Client Name Field
    And I select different " Drug (DRUG) " in the outlet section
    And I update note to "Updated testing note"
    And I click on update profile
    Then "Profile updated successfully" message is displayed
    And I am redirected to the profiles page

  Scenario: Update retailer profile with valid data
    Given I am on the profiles page
    When I select a "Retailers" profile
    And I click on Edit button
    And I update "updated Name" to Client Name Field
    And I change Freshlook Participant to "Yes"
    And I update Owner Number to "2"
    And I update Banner Name to "Updated Banner"
    And I update note to "Updated retailer note"
    And I click on update profile
    Then "Profile updated successfully" message is displayed
    And I am redirected to the profiles page

  Scenario: Update Circana profile with valid data
    Given I am on the profiles page
    When I select a "Circana" profile
    And I click on Edit button
    And I update "updated Name" to Client Name Field
    And I select different "Outlets" in the outlet section
    And I update note to "Updated circana note"
    And I click on update profile
    Then "Profile updated successfully" message is displayed
    And I am redirected to the profiles page

  @regression
  Scenario Outline: Update profile with missing mandatory fields
    Given I am on the profiles page
    When I select a "<profile_type>" profile
    And I click on Edit button
    And I clear the Client visible name field
    And I click on update profile
    Then error "Client visible name is required." is displayed

    Examples:
      | profile_type  |
      | Manufacturers |
      | Retailers     |
      | Circana       |

  @regression
  Scenario Outline: Cancel profile update
    Given I am on the profiles page
    When I select a "<profile_type>" profile
    And I click on Edit button
    And I make some changes to the profile fields
    And I click on Cancel
    Then I am redirected to the profiles page
    # And the changes are not saved

    Examples:
      | profile_type  |
      | Manufacturers |
      | Retailers     |
      | Circana       |
