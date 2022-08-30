Feature: Registration Request

  Background:
    Given I want to request

  Scenario: Register individual
    Given I am an individual user
    And I enter individual details
    And I enter user credentials
    Then I see the request resources page

  Scenario: Register corporate
    Given I am a corporate user
    And I enter corporate details
    And I enter user credentials
    Then I see the request resources page

  Scenario: Register Non-Profit
    Given I am a Non-Profit user
    And I enter Non-Profit details
    And I enter user credentials
    Then I see the request resources page

  Scenario: Register Government
    Given I am a Government user
    And I enter Government details
    And I enter user credentials
    Then I see the request resources page
