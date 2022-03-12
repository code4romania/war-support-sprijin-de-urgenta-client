Feature: Request Item Resources

  Background:
    Given I am a logged in user
    And I want to request
    And I click products resource

  Scenario: Request Food item
    Given I click request food button
    And I fill the request food form
    When I submit the form
    Then I see the thank you for request message
    And request item is created

  Scenario: Request General Hygiene item
    Given I click request general hygiene button
    And I fill the request general hygiene form
    And I submit the form
    Then I see the thank you for request message
    And request item is created

  Scenario: Request Feminine Hygiene item
    Given I click request feminine hygiene button
    And I fill the request feminine hygiene form
    And I submit the form
    Then I see the thank you for request message
    And request item is created

  Scenario: Request Clothing item
    Given I click request clothing button
    And I fill the request clothing form
    And I submit the form
    Then I see the thank you for request message
    And request item is created

  Scenario: Request Construction item
    Given I click request construction button
    And I fill the request construction form
    And I submit the form
    Then I see the thank you for request message
    And request item is created

  Scenario: Request Tent item
    Given I click request tent button
    And I fill the request tent form
    And I submit the form
    Then I see the thank you for request message
    And request item is created

  Scenario: Request Other item
    Given I click request other item button
    And I fill the request other item form
    And I submit the form
    Then I see the thank you for request message
    And request item is created
