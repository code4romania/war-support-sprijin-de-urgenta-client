import { Given } from 'cypress-cucumber-preprocessor/steps'

Given(/^I click request for organiser volunteer button$/, function() {
  cy.findAllByText('Adaugă').eq(5).click()
  cy.wait(1000)
});

Given(/^I fill the request for organiser volunteer form$/, function() {
  cy.get('select[name="county_coverage"]').select(1)
  cy.get('#town').type('Galati')
});
