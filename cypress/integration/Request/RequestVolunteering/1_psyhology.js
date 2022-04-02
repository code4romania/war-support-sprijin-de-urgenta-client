import { Given } from 'cypress-cucumber-preprocessor/steps'

Given(/^I click request for psychology volunteer button$/, function() {
  cy.findAllByText('Adaugă').eq(0).click()
  cy.wait(1000)
});

Given(/^I fill the request for psychology volunteer form$/, function() {
  cy.get('select[name="county_coverage"]').select(1)
  cy.get('#town').type('Galati')
});

