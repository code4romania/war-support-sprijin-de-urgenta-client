import { Given } from 'cypress-cucumber-preprocessor/steps'

Given(/^I click request other item button$/, function() {
  cy.findAllByText('Adaugă').eq(8).click()
  cy.wait(1000)
});
Given(/^I fill the request other item form$/, function() {
  cy.get('#has_transportation_true').check()
  cy.get('#name').type('test')
  cy.get('#description').type('test')
  cy.get('#quantity').type(100)
  cy.get('#unit_type').type('kg')
  cy.get('#packaging_type').type('test')
  cy.get('select[name="county_coverage"]').select(1)
  cy.get('#town').type('test')
});
