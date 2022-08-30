Feature: Request Transport Service

  Background:
    Given I am a logged in user
    And I want to request
    And I click services resource

  Scenario: Request Goods Transport
    Given I click request for transport goods button
    And I fill the request for transport goods form
    And I submit the form
    Then I see the thank you for request message
    And request transport service is created

  Scenario: Request People Transport
    Given I click request for transport people button
    And I fill the request for transport people form
    And I submit the form
    Then I see the thank you for request message
    And request transport service is created

