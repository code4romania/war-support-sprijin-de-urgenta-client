Feature: Request Other Resources

  Background:
    Given I am a logged in user
    And I want to request
    And I click other resource

  Scenario: Request Other Resource
    Given I click request other resource button
    And I fill the request other resource form
    And I submit the form
    Then I see the thank you for request message
    And request other is created

