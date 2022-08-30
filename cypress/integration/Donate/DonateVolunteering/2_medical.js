import { Given } from "cypress-cucumber-preprocessor/steps";

Given(/^I click donate medical button$/, function() {
  cy.findAllByText('Adaugă').eq(1).click()
  cy.wait(1000)
});

Given(/^I fill the donate medical form$/, function() {
  cy.get('#name').type('test')
  cy.get('#has_transportation_true').check()
  cy.selectMultiDropdown()
  cy.get('#town').type('test')
  cy.get('#description').type('description')
  cy.get('#available_until').type('2030-12-12')
});
