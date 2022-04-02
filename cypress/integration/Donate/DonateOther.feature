Feature: Donate Other Resources

  Background:
    Given I am a logged in user
    And I want to donate
    And I click other resource

  Scenario: Opening donate resources page
    And I click donate other resource button
    And I fill the donate other resource form
    When I submit the form
    Then I see the thank you for donation message
    And donate other is created


