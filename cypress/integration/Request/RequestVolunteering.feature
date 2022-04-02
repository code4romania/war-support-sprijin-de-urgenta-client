Feature: Request Volunteering Resources
  Background:
    Given I am a logged in user
    And I want to request
    And I click volunteer resource

  Scenario: Request psychology volunteering
    Given I click request for psychology volunteer button
    And I fill the request for psychology volunteer form
    And I submit the form
    Then I see the thank you for request message
    And request volunteering resource is created successfully

  Scenario: Request medical volunteering
    Given I click request for medical volunteer button
    And I fill the request for medical volunteer form
    And I submit the form
    Then I see the thank you for request message
    And request volunteering resource is created successfully

  Scenario: Request medical assistant volunteering
    Given I click request for medical assistant volunteer button
    And I fill the request for medical assistant volunteer form
    And I submit the form
    Then I see the thank you for request message
    And request volunteering resource is created successfully

  Scenario: Request lawyer volunteering
    Given I click request for lawyer volunteer button
    And I fill the request for lawyer volunteer form
    And I submit the form
    Then I see the thank you for request message
    And request volunteering resource is created successfully

  Scenario: Request cooker volunteering
    Given I click request for cooker volunteer button
    And I fill the request for cooker volunteer form
    And I submit the form
    Then I see the thank you for request message
    And request volunteering resource is created successfully

  Scenario: Request organiser volunteering
    Given I click request for organiser volunteer button
    And I fill the request for organiser volunteer form
    And I submit the form
    Then I see the thank you for request message
    And request volunteering resource is created successfully

  Scenario: Request other volunteering
    Given I click request for other volunteer button
    And I fill the request for other volunteer form
    And I submit the form
    Then I see the thank you for request message
    And request volunteering resource is created successfully

