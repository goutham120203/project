Feature: Navigating to application

  Scenario: Navigating to application
    Given have a valid application URL
    Then the application should load with title "Dashboard"
