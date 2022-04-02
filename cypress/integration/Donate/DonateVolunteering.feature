Feature: Donate Volunteering Resources

  Background:
    Given I am a logged in user
    And I want to donate
    And I click volunteer resource

  Scenario: Donate Psychology
    Given I click donate psychology button
    And I fill the donate psychology form
    And I submit the form
    Then I see the thank you for donation message
    And donate volunteering is created

  Scenario: Donate Medical
    Given I click donate medical button
    And I fill the donate medical form
    And I submit the form
    Then I see the thank you for donation message
    And donate volunteering is created

  Scenario: Donate Assistant
    Given I click donate assistant button
    And I fill the donate assistant form
    And I submit the form
    Then I see the thank you for donation message
    And donate volunteering is created

  Scenario: Donate Lawyer
    Given I click donate lawyer button
    And I fill the donate lawyer form
    And I submit the form
    Then I see the thank you for donation message
    And donate volunteering is created

  Scenario: Donate Cooker
    Given I click donate cooker button
    And I fill the donate cooker form
    And I submit the form
    Then I see the thank you for donation message
    And donate volunteering is created

  Scenario: Donate Organiser
    Given I click donate organiser button
    And I fill the donate organiser form
    And I submit the form
    Then I see the thank you for donation message
    And donate volunteering is created

  Scenario: Donate Other Volunteering
    Given I click donate other volunteering button
    And I fill the donate other volunteering form
    And I submit the form
    Then I see the thank you for donation message
    And donate volunteering is created

