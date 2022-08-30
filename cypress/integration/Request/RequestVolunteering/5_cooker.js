import { Given } from 'cypress-cucumber-preprocessor/steps'

Given(/^I click request for cooker volunteer button$/, function() {
  cy.findAllByText('Adaugă').eq(4).click()
  cy.wait(1000)
});

Given(/^I fill the request for cooker volunteer form$/, function() {
  cy.get('select[name="county_coverage"]').select(1)
  cy.get('#town').type('Galati')
});
