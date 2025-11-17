Feature: Creating Geography Set 

    As a User   
    I want to Create Geography sets
    so that i get the customized geography sets for every profile

    Background: 
        Given User is on Geography page
    
    @regression
    Scenario: Navigate to Geography page
        When Click on Geography
        Then Geography page is displayed
    
    @regression
    Scenario: Verify all profile list
        Given User is on Geography page
        When Click on select a profile to view Geography sets
        Then All profiles are listed
    
    @regression
    Scenario: Verify Search funtionality for selecting profile
        Given User is on Geography page
        When Click on select a profile to view Geography sets
        And Enter "<search>" on search profiles
        Then Matching profile list is display

    Examples:
        | search |
        | manu   |
        | 30     |
        |  30/   |

    @regression
    Scenario Outline: Selecting the First Profile From List
        Given User is on Geography page
        When Click on select a profile to view Geography sets
        And Enter "<profile_type>" on search profiles
        And Select first profile from the list
        Then Selected profile is displayed

    Examples:
      | profile_type  |
      | Manufacturer  |
      | Retailer      |
      | Circana       |


    @regression
    Scenario Outline: Verify Search funtionality for Geographies
        Given User is on Geography page 
        When Click on select a profile to view Geography sets
        And Enter "retailer" on search profiles
        And Select first profile from the list
        And Click and Enter "<search>" on Search Geography sets
        Then All matching Geography set should displayed

    Examples:
        |   search     |
        | geo-creation |
        | testing      |
        | Convenience  |


    @create @retailer @geocreation
    Scenario: Create New Geography set with valid details for Retailer profiles
        Given user is on new geography set creation form for retailer
        When user fills geography set details 
            | Name                    | Version          | Summary       |  PreviousSet              | Notes     | 
            |testing Geo2             |39.0 \| 2025-10-27| testing       |  NONE - New Geography Set | testing   |
        And no of outlet selected in retailer
        And Select "Available for Manufacturer Use" in Deliverable
        And Click on Continue button
        Then Geography Creation screen is displayed

    @create @retailer @geodefinition
    Scenario: Geography Creation with valid details for Retailer profile
        Given User is on "geography-creation" screen for retailer
        And Validate profile data is visible for retailer
        When Click on Select button
        And Select "CA" as state 
        And Enter "california" Geography Name field
        And Select All Available Stroes To Target
        And Click on Create Geography
        And Click Save button
        And Click on Approve button for "RMA" definition
        And Click on Proceed Anyway
        And Click on confirm for RMA definitiion
        And Click on Yes CRMA Creation step
        And Click Save button
        And Click on Approve button for "CRMA" definition 
        And Click on confirm CRMA definitiion
        Then "CRMA data approved successfully" successfully message displayed
        And Geography Mapping stage is display

    @create @retailer @mapping
    Scenario: Approve Geography Mapping for Retailer profiles
        Given User is on "geography-mapping" screen for retailer
        And Validate profile data is visible for retailer
        And Click Save button
        Then "Geography mappings have been saved successfully." successfully message displayed
        When Click on Approve for geography mapping
        And Click on "confirm" Geography Mapping Approval
        And "Geography mapping successfully approved and moved to next stage." successfully message displayed 
        And Release Evaluation screen is display 

    @create @retailer @release
    Scenario: Approve Release Evaluation for Retailer profile
        Given User is on "release-evaluation" screen for retailer
        And Validate profile data is visible for retailer
        And Click Save button
        Then "Release evaluation have been saved successfully." successfully message displayed
        And Click on Approve for release evaluation
        And Click on confirm Release Evaluation Approval
        Then "Release evaluation approved. Redirecting to Geography Naming..." successfully message displayed
        Then Geography Naming screen is display

    @create @retailer @geonaming
    Scenario: Approve Geography Naming for Retailer profile
        Given User is on "geography-naming" screen for retailer
        And Validate profile data is visible for retailer
        And Click on Approve for geography naming
        And Click on Approve for Geography Naming Approval
        Then "Geography Naming successfully approved and moved to next stage." successfully message displayed 

    @create @retailer @final
    Scenario: Final summit Geography creation for Retailer profile
        Given User is on "final-review" screen for retailer
        And Validate profile data is visible for retailer
        When Review and Approve All screens in Final Review for retailer
        And Click on Final Submit
        And Click on submit Final on Alert
        Then Final Reports Will Display

    @create @manufacture @geocreation
    Scenario: Create New Geography set with valid details for Manufacture profile
        Given user is on new geography set creation form for manufacture
        When user fills geography set details
            | Name                    | Version          | Summary       |  PreviousSet              | Notes     |  Connection |
            |testing Geography 1      |39.0 \| 2025-10-27| testing       |  NONE - New Geography Set | testing   |  99 test    |
        And Select first outlet in outlets
        And Click on Continue button
        And Select Geography creation method "fips" code
        Then Geography Creation screen is displayed

    @create @manufacture @geodefinition
    Scenario: Geography Creation with valid details for Manufacture profile
        Given User is on "geography-creation" screen for manufacture
        And Validate profile data is visible for manufacture
        And Click on Select button
        And Select "CA" as state
        And Enter "east" Geography Name field
        And Select All Available Stroes To Target
        And Click on Create Geography
        And Click Save button
        And Click Review button
        And Click on Approve button geography creation definitiion
        And Click on Confirm to next step
        Then Geography Mapping stage is display

    @create @manufacture @mapping
    Scenario: Approve Geography Mapping for Manufacture profile
        Given User is on "geography-mapping" screen for manufacture
        And Validate profile data is visible for manufacture
        And Click Save button
        Then "Geography mappings have been saved successfully." successfully message displayed
        When Click on Approve for geography mapping
        And Click on "confirm" Geography Mapping Approval
        And "Geography mapping successfully approved and moved to next stage." successfully message displayed 
        And Release Evaluation screen is display

    @create @manufacture @release
    Scenario: Approve Release Evaluation for Manufacture profile
        Given User is on "release-evaluation" screen for manufacture
        And Validate profile data is visible for manufacture
        And Click Save button
        Then "Release evaluation have been saved successfully." successfully message displayed
        And Click on Approve for release evaluation
        And Click on confirm Release Evaluation Approval
        Then "Release evaluation approved. Redirecting to Geography Naming..." successfully message displayed
        Then Geography Naming screen is display

    @create @manufacture @geonaming
    Scenario: Approve Geography Naming for Manufacture profile
        Given User is on "geography-naming" screen for manufacture
        And Validate profile data is visible for manufacture
        And Click on Approve for geography naming
        And Click on Approve for Geography Naming Approval
        Then "Geography Naming successfully approved and moved to next stage." successfully message displayed

    @create @manufacture @final
    Scenario: Final summit Geography creation for Manufacture profile
        Given User is on "final-review" screen for manufacture
        And Validate profile data is visible for manufacture
        When Review and Approve All screens in Final Review for manufacture
        And Click on Final Submit
        And Click on submit Final on Alert
        Then Final Reports Will Display

    @create @circana @geocreation
    Scenario: Create New Geography set with valid details for Circana profile
        Given user is on new geography set creation form for circana
        When user fills geography set details for circana
            | Name                    | Version          | Summary       |  PreviousSet              | Notes     | Type         |
            |testing Geography        |39.0 \| 2025-10-27| testing       |  NONE - New Geography Set | testing   | Country      |
        And Select first outlet in outlets
        And Click on Continue button
        Then Geography Creation screen is displayed

    @create @circana @geodefinition
    Scenario: Geography Creation with valid details for Circana profile
        Given User is on "geography-creation" screen for circana
        And Validate profile data is visible for circana
        And Click on Select button
        And Select "CA" as state
        And Enter "east" Geography Name field
        And Select All Available Stroes To Target
        And Click on Create Geography
        And Click Save button
        And Click Review button
        And Click on Approve button geography creation definitiion
        And Click on Confirm to next step
        Then Geography Mapping stage is display


    @create @circana @mapping
    Scenario: Approve Geography Mapping for Circana profile
        Given User is on "geography-mapping" screen for circana
        And Validate profile data is visible for circana
        And Click Save button
        Then "Geography mappings have been saved successfully." successfully message displayed
        When Click on Approve for geography mapping
        And Click on "confirm" Geography Mapping Approval
        And "Geography mapping successfully approved and moved to next stage." successfully message displayed 
        And Release Evaluation screen is display
    
    @create @circana @release
    Scenario: Approve Release Evaluation for Circana profile
        Given User is on "release-evaluation" screen for circana
        And Validate profile data is visible for circana
        And Click Save button
        Then "Release evaluation have been saved successfully." successfully message displayed
        And Click on Approve for release evaluation
        And Click on confirm Release Evaluation Approval
        Then "Release evaluation approved. Redirecting to Geography Naming..." successfully message displayed
        Then Geography Naming screen is display

    @create @circana @geonaming
    Scenario: Approve Geography Naming for Circana profile
        Given User is on "geography-naming" screen for circana
        And Validate profile data is visible for circana
        And Click on Approve for geography naming
        And Click on Approve for Geography Naming Approval
        Then "Geography Naming successfully approved and moved to next stage." successfully message displayed

    @create @circana @final
    Scenario: Final summit Geography creation for Circana profile
        Given User is on "final-review" screen for circana
        And Validate profile data is visible for circana
        When Review and Approve All screens in Final Review for circana
        And Click on Final Submit
        And Click on submit Final on Alert
        Then Final Reports Will Display


    
    
    
    







    