Feature: Login

  @focus
  Scenario: Login
    Given I want to login
    And I enter login credentials
    When I click login button
    Then I see homepage

