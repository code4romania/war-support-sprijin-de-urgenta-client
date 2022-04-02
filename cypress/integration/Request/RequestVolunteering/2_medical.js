import { Given } from 'cypress-cucumber-preprocessor/steps'

Given(/^I click request for medical volunteer button$/, function() {
  cy.findAllByText('Adaugă').eq(1).click()
  cy.wait(1000)
});

Given(/^I fill the request for medical volunteer form$/, function() {
  cy.get('select[name="county_coverage"]').select(1)
  cy.get('#town').type('Galati')
});
