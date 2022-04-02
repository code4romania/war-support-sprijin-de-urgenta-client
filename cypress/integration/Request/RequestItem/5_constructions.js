import { Given } from 'cypress-cucumber-preprocessor/steps'

Given(/^I click request construction button$/, function() {
  cy.findAllByText('Adaugă').eq(4).click()
  cy.wait(1000)
});

Given(/^I fill the request construction form$/, function() {
  cy.get('#has_transportation_true').check()
  cy.get('select[name="county_coverage"]').select(1)
  cy.get('#town').type('test')
  cy.get('#name').type('test')
  cy.get('#quantity').type(100)
  cy.get('#unit_type').type('kg')
  cy.get('#packaging_type').type('test')
});
