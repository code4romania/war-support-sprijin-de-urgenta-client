import { Given } from 'cypress-cucumber-preprocessor/steps'

Given(/^I click request for lawyer volunteer button$/, function() {
  cy.findAllByText('Adaugă').eq(3).click()
  cy.wait(1000)
});

Given(/^I fill the request for lawyer volunteer form$/, function() {
  cy.get('select[name="county_coverage"]').select(1)
  cy.get('#town').type('Galati')
});
