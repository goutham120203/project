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
    Scenario: Create New Geography set with valid details for Retailer profile
        Given user is on new geography set creation form for retailer
        When user fills geography set details 
            | Name                    | Version          | Summary       |  PreviousSet              | Notes     | 
            |testing geoset 1         | 37.01 \| 1/5/2020| testing       |  NONE - New Geography Set | testing   |
        And no of outlet selected in retailer
        And Select "Available for Manufacturer Use" in Deliverable
        And Click on Continue button
        Then Geography Creation screen is displayed

    @create @retailer @geodefinition
    Scenario: Geography Creation with valid details for Retailer profile
        Given User is on "geography-creation" screen for retailer
        Given Validate profile data is visible for retailer
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
    Scenario: Approve Geography Mapping for Retailer profile
        Given User is on "geography-mapping" screen for retailer
        Given Validate profile data is visible for retailer
        And Click Save button
        Then "Geography mappings have been saved successfully." successfully message displayed
        When Click on Approve for geography mapping
        And Click on "confirm" Geography Mapping Approval
        And "Geography mapping successfully approved and moved to next stage." successfully message displayed 
        And Release Evaluation screen is display 

    @create @retailer @release
    Scenario: Approve Release Evaluation for Retailer profile
        Given User is on "release-evaluation" screen for retailer
        Given Validate profile data is visible for retailer
        And Click Save button
        Then "Release evaluation have been saved successfully." successfully message displayed
        And Click on Approve for release evaluation
        And Click on confirm Release Evaluation Approval
        Then "Release evaluation approved. Redirecting to Geography Naming..." successfully message displayed
        Then Geography Naming screen is display

    @create @retailer @geonaming
    Scenario: Approve Geography Naming for Retailer profile
    Given User is on "geography-naming" screen for retailer
    Given Validate profile data is visible for retailer
    And Click on Approve for geography naming
    And Click on Approve for Geography Naming Approval
    Then "Geography Naming successfully approved and moved to next stage." successfully message displayed 

    @create @retailer @final
    Scenario: Final summit Geography creation for Retailer profile
        Given User is on "final-review" screen for retailer
        Given Validate profile data is visible for retailer
        When Review and Approve All screens in Final Review for retailer
        And Click on Final Submit
        And Click on submit Final on Alert
       Then Final Reports Will Display

    @create @manufacture @geocreation
    Scenario: Create New Geography set with valid details for Manufacture profile
        Given user is on new geography set creation form for manufacture
        When user fills geography set details
            | Name                    | Version          | Summary       |  PreviousSet              | Notes     |  Connection |
            |testing Geography 1      | 37.01 \| 1/5/2020| testing       |  NONE - New Geography Set | testing   |  99 test    |
        And Select first outlet in outlets
        And Click on Continue button
        Then Geography Creation screen is displayed

    @create @manufacture @geodefinition
    Scenario: Geography Creation with valid details for Manufacture profile
        Given User is on "geography-creation" screen for manufacture
        Given Validate profile data is visible for manufacture
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
        Given Validate profile data is visible for manufacture
        And Click Save button
        Then "Geography mappings have been saved successfully." successfully message displayed
        When Click on Approve for geography mapping
        And Click on "confirm" Geography Mapping Approval
        And "Geography mapping successfully approved and moved to next stage." successfully message displayed 
        And Release Evaluation screen is display

    @create @manufacture @release
    Scenario: Approve Release Evaluation for Manufacture profile
        Given User is on "release-evaluation" screen for manufacture
        Given Validate profile data is visible for manufacture
        And Click Save button
        Then "Release evaluation have been saved successfully." successfully message displayed
        And Click on Approve for release evaluation
        And Click on confirm Release Evaluation Approval
        Then "Release evaluation approved. Redirecting to Geography Naming..." successfully message displayed
        Then Geography Naming screen is display

    @create @manufacture @geonaming
    Scenario: Approve Geography Naming for Manufacture profile
        Given User is on "geography-naming" screen for manufacture
        Given Validate profile data is visible for manufacture
        And Click on Approve for geography naming
        And Click on Approve for Geography Naming Approval
        Then "Geography Naming successfully approved and moved to next stage." successfully message displayed

    @create @manufacture @final
    Scenario: Final summit Geography creation for Manufacture profile
        Given User is on "final-review" screen for manufacture
        Given Validate profile data is visible for manufacture
        When Review and Approve All screens in Final Review for manufacture
        And Click on Final Submit
        And Click on submit Final on Alert
       Then Final Reports Will Display

    @create @circana @geocreation
    Scenario: Create New Geography set with valid details for Circana profile
        Given user is on new geography set creation form for circana
        When user fills geography set details for circana
            | Name                    | Version          | Summary       |  PreviousSet              | Notes     | Type         |
            |testing Geography        | 37.01 \| 1/5/2020| testing       |  NONE - New Geography Set | testing   | Country      |
        And Select first outlet in outlets
        And Click on Continue button
        Then Geography Creation screen is displayed

    @create @circana @geodefinition
    Scenario: Geography Creation with valid details for Circana profile
        Given User is on "geography-creation" screen for circana
        Given Validate profile data is visible for circana
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
        Given Validate profile data is visible for circana
        And Click Save button
        Then "Geography mappings have been saved successfully." successfully message displayed
        When Click on Approve for geography mapping
        And Click on "confirm" Geography Mapping Approval
        And "Geography mapping successfully approved and moved to next stage." successfully message displayed 
        And Release Evaluation screen is display
    
    @create @circana @release
    Scenario: Approve Release Evaluation for Circana profile
        Given User is on "release-evaluation" screen for circana
        Given Validate profile data is visible for circana
        And Click Save button
        Then "Release evaluation have been saved successfully." successfully message displayed
        And Click on Approve for release evaluation
        And Click on confirm Release Evaluation Approval
        Then "Release evaluation approved. Redirecting to Geography Naming..." successfully message displayed
        Then Geography Naming screen is display

    @create @circana @geonaming
    Scenario: Approve Geography Naming for Circana profile
        Given User is on "geography-naming" screen for circana
        Given Validate profile data is visible for circana
        And Click on Approve for geography naming
        And Click on Approve for Geography Naming Approval
        Then "Geography Naming successfully approved and moved to next stage." successfully message displayed

    @create @circana @final
    Scenario: Final summit Geography creation for Circana profile
        Given User is on "final-review" screen for circana
        Given Validate profile data is visible for circana
        When Review and Approve All screens in Final Review for circana
        And Click on Final Submit
        And Click on submit Final on Alert
       Then Final Reports Will Display



    # @regression
    # Scenario Outline: Create New Geography set with missing mandatory fields
    #     Given User is on Geography page
    #     When Click on select a profile to view Geography sets
    #     And Enter "<profile_type>" on search profiles
    #     And Select first profile from the list
    #     And Click on Create New Geography Set
    #     And Leave Geography Set Name empty
    #     And Leave Version empty
    #     And Leave Previous Geography Set empty
    #     And Leave Deliverable selection empty
    #     Then Error "Geography Set Name is required" message is displayed for Geography Set Name
    #     And Error "Version is required" message is displayed for Version
    #     And Error "Previous Geography Set is required" message is displayed for Previous Geography Set
    #     And Continue button should be disabled

    # Examples:
    #     | profile_type |
    #     | manufacture  |
    #     | retailer     |
    #     | circana      |

    # @regression
    # Scenario: Creating geography set circana by not selecting the geography type
    #     Given user is on new geography set creation form for circana
    #     When user fills geography set details for circana
    #         | Version          | Summary       |  PreviousSet              | Notes     | Type         |
    #         | 37.0 \| 1/5/2020 | testing       |  NONE - New Geography Set | testing   | Country      |
    #     And Select first outlet in outlets
    #     Then Continue button should be disabled
 
    # @regression
    # Scenario: Prevent Duplicate Geography Set Names for retailer
    #     Given user is on new geography set creation form for retailer
    #     When user fills geography set details 
    #         | Name                    | Version          | Summary       |  PreviousSet              | Notes     | 
    #         |testing Geo creation set | 37.0 \| 1/5/2020 | testing       |  NONE - New Geography Set | testing   |
    #     And Select "Available for Manufacturer Use" in Deliverable
    #     And Click on Continue button
    #     Then Error "already exists" message is displayed for Duplicate Geography Set Name

    # @regression
    # Scenario Outline: Prevent Duplicate Geography Set Names
    #     Given User is on Geography page
    #     When Click on select a profile to view Geography sets
    #     And Enter "<profile_type>" on search profiles
    #     And Select first profile from the list
    #     And Click on Create New Geography Set
    #     And Enter "Auto testing" in Geography Set Name field
    #     And Select "37.0 | 1/5/2020" in Version field
    #     And Enter "summary" in Geography Set Summary field
    #     And Select "NONE - New Geography Set" in previous Geography Set field
    #     And Enter "testing" in Geography Set Notes field
    #     And Select first outlet in outlets
    #     And Click on Continue button
    #     Then Error "already exists" message is displayed for Duplicate Geography Set Name

    # Examples:
    #     | profile_type |
    #     | manufacture  |
    #     | circana      |
    

    # @regression
    # Scenario Outline: verify state of geography is properly saved (or) Displayed for geo-creation
    #     Given User is on Geography page
    #     When Click on select a profile to view Geography sets
    #     And Enter "<profile_type>" on search profiles
    #     And Select first profile from the list
    #     And Click and Enter "geo-creation" on Search Geography sets
    #     And Select the geography card with "geo-creation"
    #     Then Select button visiable

    # Examples:
    #     | profile_type |
    #     | retailer     |
    #     | manufacture  |
    #     | circana      |

    # @regression
    # Scenario Outline: verify state of geography is properly saved (or) Displayed for geo-creation-saved
    #     Given User is on Geography page
    #     When Click on select a profile to view Geography sets
    #     And Enter "<profile_type>" on search profiles
    #     And Select first profile from the list
    #     And Click and Enter "geo-creation-saved" on Search Geography sets
    #     And Select the geography card with "geo-creation-saved"
    #     Then Approve button is visiable

    # Examples:
    #     | profile_type |
    #     | retailer     |
    #     | manufacture  |
    #     | circana      |

    
    
    # Scenario Outline: verify not accepting the Duplicate Geography Name
    #     Given User is on Geography page
    #     When Click on select a profile to view Geography sets
    #     And Enter "<profile_type>" on search profiles
    #     And Select first profile from the list
    #     And Click and Enter "geo-creation" on Search Geography sets
    #     And Select the geography card with "geo-creation"
    #     And Click on Select button
    #     And Select "CA" as state
    #     And Enter "Node" Geography Name field
    #     And Select All Available Stroes To Target
    #     And Click on Create Geography
    #     And Click on Select button
    #     And Select "CA" as state
    #     And Enter "Node" Geography Name field
    #     And Select All Available Stroes To Target
    #     And Click on Create Geography
    #     Then Duplicate Geography Name Detected screen display

    # Examples:
    #     | profile_type |
    #     | retailer     |
    #     | manufacture  |
    #     | circana      |


    # @regression
    # Scenario Outline: Moving selected stores to target 
    #     Given User is on Geography page
    #     When Click on select a profile to view Geography sets
    #     And Enter "<profile_type>" on search profiles
    #     And Select first profile from the list
    #     And Click and Enter "geo-creation" on Search Geography sets
    #     And Select the geography card with "geo-creation"
    #     And Click on Select button
    #     And Select "CA" as state 
    #     And Enter "geo1" Geography Name field
    #     And Select the Stores in Available Stores
    #     And Click single greater symbol
    #     Then All selected stores should move to target
    
    # Examples:
    #     | profile_type |
    #     | retailer     |
    #     | manufacture  |
    #     | circana      |
    
    
    # Scenario: Verify Geography Tree formed After click Create Geography
    #     Given User is on Geography page
    #     When Click on select a profile to view Geography sets
    #     And Enter "retailer" on search profiles
    #     And Select first profile from the list
    #     And Click and Enter "geo-creation-saved" on Search Geography sets
    #     And Select the geography card with "geo-creation-saved"
    #     And click on edit button
    #     And Select "CO" as state
    #     And Enter "geo3" Geography Name field
    #     And Select All Available Stroes To Target
    #     And Click on Create Geography
    #     And Click Save button
    #     Then Tree is formed with geography name


    
    # Scenario: verify the aggregating high level nodes
    #     Given User is on Geography page
    #     When Click on select a profile to view Geography sets
    #     And Enter "retailer" on search profiles
    #     And Select first profile from the list
    #     And Click and Enter "geo-creation" on Search Geography sets
    #     And Select the geography card with "geo-creation"
    #     And Click on Select button
    #     And Select "CA" as state
    #     And Enter "Node1" Geography Name field
    #     And Select All Available Stroes To Target
    #     And Click on Create Geography
    #     And Select "CA" as state
    #     And Enter "Node2" Geography Name field
    #     And Select All Available Stroes To Target
    #     And Click on Create Geography
    #     And click on "Node1" node
    #     And click on "Node2" node
    #     And click on create aggregation icon
    #     And Enter the "AggNode1" in Aggregate Name field
    #     And Click on create button
    #     Then This "AggNode1" is top level Node

    
    # Scenario: Verify unique fips code for retailer by selecting states
    #     Given User is on Geography page
    #     When Click on select a profile to view Geography sets
    #     And Enter "retailer" on search profiles
    #     And Select first profile from the list
    #     And Click and Enter "geo-creation" on Search Geography sets
    #     And Select the geography card with "geo-creation"
    #     And Click on Select button
    #     And Select "CA" as state 
    #     And Enter "geo1" Geography Name field
    #     And Select All Available Stroes To Target
    #     And Click on Create Geography
    #     And Select "CA" as state 
    #     And Enter "geo2" Geography Name field
    #     And Select All Available Stroes To Target
    #     And Click on Create Geography
    #     And Click Save button
    #     And Click on Approve
    #     And Click on Proceed Anyway
    #     And Click on confirm for RMA definitiion
    #     And Click on confirm CRMA Creation step
    #     And Click Save button
    #     And Click on Approve
    #     And Click on confirm CRMA Creation step
    #     Then Geography Mapping stage is display
    
    
    # Scenario: verify showing Errors import file with missing columns
    #     Given User is on Geography page
    #     When Click on select a profile to view Geography sets
    #     And Enter "retailer" on search profiles
    #     And Select first profile from the list
    #     And Click and Enter "geo-creation" on Search Geography sets
    #     And Select the geography card with "geo-creation"
    #     And Upload the "rma_missing_fields.xlsx" file in Upload field
    #     And Click Validate and Preview Data
    #     And Error section is displayed
    
    
    # # this sce required valid excel sheet    
    # Scenario: RMA Creation by import
    #     Given User is on Geography page
    #     When Click on select a profile to view Geography sets
    #     And Enter "retailer" on search profiles
    #     And Select first profile from the list
    #     And Click and Enter "geo-creation" on Search Geography sets
    #     And Select the geography card with "geo-creation"
    #     And Upload the "rma_import_template_23.xlsx" file in Upload field
    #     And Click Validate and Preview Data 
    #     And Click Proceed Without Missing Stroes
    #     And Click Save button
    #     And Click on Approve
    #     And Click on Proceed Anyway
    #     And Click on confirm for RMA definitiion
    #     And Click on confirm CRMA Creation step
    #     And Click Save button 
    #     And Click on Approve
    #     And Click on confirm CRMA definitiion
    #     Then Geography Mapping stage is display

    # @regression
    # Scenario: verify the review screen displayed for RMA After clicking review Button
    #     Given User is on Geography page
    #     When Click on select a profile to view Geography sets
    #     And Enter "retailer" on search profiles
    #     And Select first profile from the list
    #     And Click and Enter "geo-creation" on Search Geography sets
    #     And Select the geography card with "geo-creation"
    #     And Click Review button
    #     Then "RMA Geography Review" screen is display for RMA

    # @regression
    # Scenario: verify the review screen displayed for CRMA After clicking review Button
    #     Given User is on Geography page
    #     When Click on select a profile to view Geography sets
    #     And Enter "retailer" on search profiles
    #     And Select first profile from the list
    #     And Click and Enter "geo-creation-crma" on Search Geography sets
    #     And Select the geography card with "geo-creation-crma"
    #     And click on edit button
    #     And Click Review button
    #     Then "CRMA Geography Review" screen is display for RMA
        
   
    
    # @regression
    # Scenario Outline: successfull download excel file in Geography Mapping
    #     Given User is on Geography page
    #     And Download Button should be visiable
    #     When Click on select a profile to view Geography sets
    #     And Enter "<profile_type>" on search profiles
    #     And Select first profile from the list
    #     And Click and Enter "geo-mapping" on Search Geography sets
    #     And Select the geography card with "geo-mapping"
    #     And Click on Geography Mapping
    #     And Click on download button
    #     Then the file should be downloading

    # Examples:
    #     | profile_type |
    #     | retailer     |
    #     | manufacture  |
    #     | circana      |
    
    
    # Scenario: Successfully print a document
    #     # need to work on this
    #     Given User is on Geography page
    #     And Download Button should be visiable
    #     When Click on select a profile to view Geography sets
    #     And Enter "retailer" on search profiles
    #     And Select first profile from the list
    #     And Click and Enter "geo-mapping" on Search Geography sets
    #     And Select the geography card with "geo-mapping"
    #     And Click the print button
    #     Then the print dialog should open
    
    
    # Scenario Outline: Approve Release Evaluation
    #     Given User is on Geography page
    #     When Click on select a profile to view Geography sets
    #     And Enter "<profile_type>" on search profiles
    #     And Select first profile from the list
    #     And Click and Enter "release-evaluation" on Search Geography sets
    #     And Select the geography card with "release-evaluation"
    #     And Click on Release Evaluation 
    #     And Click Save button
    #     Then "Release evaluation have been saved successfully." successfully message displayed
    #     And Click on Approve 
    #     And Click on confirm Release Evaluation Approval
    #     Then "Release evaluation approved. Redirecting to Geography Naming..." successfully message displayed
    #     Then Geography Naming screen is display

    # Examples:   
    #     | profile_type |
    #     | retailer     |
    #     | manufacture  |
    #     | circana      |

    # @regression
    # Scenario: successfull download excel file in release evaluation
    #     Given User is on Geography page
    #     And Download Button should be visiable
    #     When Click on select a profile to view Geography sets
    #     And Enter "<profile_type>" on search profiles
    #     And Select first profile from the list
    #     And Click and Enter "release-evaluation" on Search Geography sets
    #     And Select the geography card with "release-evaluation"
    #     And Click on Release Evaluation
    #     And Click on download button
    #     Then the file should be downloading

    # Examples:   
    #     | profile_type |
    #     | retailer     |
    #     | manufacture  |
    #     | circana      |
    
   

    # @regression
    # Scenario: successfull download excel file in geography naming
    #     Given User is on Geography page
    #     And Download Button should be visiable
    #     When Click on select a profile to view Geography sets
    #     And Enter "<profile_type>" on search profiles
    #     And Select first profile from the list
    #     And Click and Enter "geo-naming" on Search Geography sets
    #     And Select the geography card with "geo-naming"
    #     And Click on Geography Naming
    #     And Click on download button for Geography Naming
    #     Then the file should be downloading

    # Examples:   
    #     | profile_type |
    #     | retailer     |
    #     | manufacture  |
    #     | circana      |

    
    
    
    







    