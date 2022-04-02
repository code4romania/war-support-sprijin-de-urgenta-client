import { Given } from 'cypress-cucumber-preprocessor/steps'

Given(/^I click request clothing button$/, function () {
  cy.findAllByText('Adaugă').eq(3).click()
  cy.wait(1000)
})

Given(/^I fill the request clothing form$/, function () {
  cy.get('#name').type('test')
  cy.get('#has_transportation_true').check();
  cy.get('#textile_category_1').check()
  cy.get('#textile_size').type('xl')
  cy.get('#quantity').type(100)
  cy.get('#unit_type').type('kg')
  cy.get('#packaging_type').type('test')
  cy.get('select[name="county_coverage"]').select(1)
  cy.get('#town').type('test')
})
