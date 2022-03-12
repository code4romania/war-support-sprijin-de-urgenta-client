import { Given } from 'cypress-cucumber-preprocessor/steps'

Given(/^I click request for medical assistant volunteer button$/, function() {
  cy.findAllByText('Adaugă').eq(2).click()
  cy.wait(1000)
});

Given(/^I fill the request for medical assistant volunteer form$/, function() {
  cy.get('select[name="county_coverage"]').select(1)
  cy.get('#town').type('Galati')
});
