import { Given } from 'cypress-cucumber-preprocessor/steps'

Given(/^I click request tent button$/, function() {
  cy.findAllByText('Adaugă').eq(5).click()
  cy.wait(1000)
});

Given(/^I fill the request tent form$/, function() {
  cy.get('#has_transportation_true').check()
  cy.get('#quantity').type(2)
  cy.get('#tent_capacity').type(2)
  cy.get('select[name="county_coverage"]').select(1)
  cy.get('#town').type('test')
});
