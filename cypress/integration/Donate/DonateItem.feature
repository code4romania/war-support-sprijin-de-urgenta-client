Feature: Donate Item Resources

  Background:
    Given I am a logged in user
    And I want to donate
    And I click products resource

  Scenario: Donate Food item
    Given I click donate food button
    And I fill the donate food form
    When I submit the form
    Then I see the thank you for donation message
    And donate item is created

  Scenario: Donate Multiple Food items
    Given I fill multiple donate food forms
      | has_transportation | county_coverage | town       | name    | quantity | unit_type | packaging_type | expiration_date |
      | true               | AB              | Alba       | Cartofi | 100      | kg        | sac            | 2090-12-12      |
      | false              | IF              | Bucuresti  | Lapte   | 200      | l         | bax bidon 2l   | 2090-12-12      |
    When I click next step button
    Then I see the thank you for donation message
    And donate item is created

  Scenario: Donate General Hygiene item
    Given I click donate general hygiene button
    And I fill the donate general hygiene form
    And I submit the form
    Then I see the thank you for donation message
    And donate item is created

  Scenario: Donate Multiple General Hygiene item
    Given I fill multiple donate general hygiene form
      | has_transportation | county_coverage | town       | name       | quantity | unit_type | packaging_type | expiration_date |
      | true               | AB              | Alba       | Gel de dus | 200      | baxuri    | sac            | 2090-12-12      |
      | false              | IF              | Bucuresti  | Sapun      | 200      | l         | bax bidon 2l   | 2090-12-12      |
    And I submit the form
    Then I see the thank you for donation message
    And donate item is created

  Scenario: Donate Feminine Hygiene item
    Given I click donate feminine hygiene button
    And I fill the donate feminine hygiene form
    And I submit the form
    Then I see the thank you for donation message
    And donate item is created

  Scenario: Donate Multiple Feminine Hygiene item
    Given I fill multiple donate feminine hygiene forms
      | has_transportation | county_coverage | town       | name       | quantity | unit_type | packaging_type | expiration_date |
      | true               | AB              | Alba       | Absorbante | 200      | baxuri    | sac            | 2090-12-12      |
      | false              | IF              | Bucuresti  | Deodorant  | 200      | l         | bax bidon 2l   | 2090-12-12      |
    When I click next step button
    Then I see the thank you for donation message
    And donate item is created

  Scenario: Donate Textile item
    Given I click donate textile button
    And I fill the donate textile form
    And I submit the form
    Then I see the thank you for donation message
    And donate item is created

  Scenario: Donate Construction item
    Given I click donate construction button
    And I fill the donate construction form
    And I submit the form
    Then I see the thank you for donation message
    And donate item is created

  Scenario: Donate Medicine item
    Given I click donate medicine button
    And I fill the donate medicine form
    And I submit the form
    Then I see the thank you for donation message
    And donate item is created

  Scenario: Donate Sanitary item
    Given I click donate sanitary item button
    And I fill the donate sanitary item form
    And I submit the form
    Then I see the thank you for donation message
    And donate item is created

  Scenario: Donate Tent item
    Given I click donate tent button
    And I fill the donate tent form
    And I submit the form
    Then I see the thank you for donation message
    And donate item is created

  Scenario: Donate other item
    Given I click donate other item button
    And I fill the donate other item form
    And I submit the form
    Then I see the thank you for donation message
    And donate item is created


