Feature: Donate Transport Service Resources

  Background:
    Given I am a logged in user
    And I want to donate
    And I click services resource

  Scenario: Donate transport goods
    Given I click donate transport goods button
    And I fill the donate transport goods form
    And I submit the form
    Then I see the thank you for donation message
    And donate transport service is created

  Scenario: Donate transport people
    Given I click donate transport people button
    And I fill the donate transport people form
    And I submit the form
    Then I see the thank you for donation message
    And donate transport service is created


