import { Given } from 'cypress-cucumber-preprocessor/steps'

Given(/^I click request other resource button$/, function() {
  cy.findAllByText('Adaugă').eq(0).click()
  cy.wait(1000)
});
Given(/^I fill the request other resource form$/, function() {
  cy.get('#name').type('test')
  cy.get('select[name="county_coverage"]').select(1)
  cy.get('#town').type('test')
  cy.get('form button[type="submit"]').click()
});
