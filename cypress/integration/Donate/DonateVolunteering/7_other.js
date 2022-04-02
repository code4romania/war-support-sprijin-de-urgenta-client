import { Given } from "cypress-cucumber-preprocessor/steps";

Given(/^I click donate other volunteering button$/, function() {
  cy.findAllByText('Adaugă').eq(6).click()
  cy.wait(1000)
});

Given(/^I fill the donate other volunteering form$/, function() {
  cy.get('#name').type('test')
  cy.get('#has_transportation_true').check()
  cy.selectMultiDropdown()
  cy.get('#town').type('test')
  cy.get('#description').type('description')
  cy.get('#available_until').type('2030-12-12')
});
