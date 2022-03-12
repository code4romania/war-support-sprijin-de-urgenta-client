import { Given, Then } from "cypress-cucumber-preprocessor/steps";

Given(/^I click donate psychology button$/, function() {
  cy.findAllByText('Adaugă').eq(0).click()
  cy.wait(1000)
});

Given(/^I fill the donate psychology form$/, function() {
  cy.get('#name').type('test')
  cy.get('#has_transportation_true').check()
  cy.selectMultiDropdown()
  cy.get('#town').type('test')
  cy.get('#description').type('description')
});
