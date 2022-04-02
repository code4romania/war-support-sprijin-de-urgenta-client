import { Given } from 'cypress-cucumber-preprocessor/steps'

Given(/^I click request sanitary item button$/, function () {
  cy.findAllByText('Adaugă').eq(6).click()
  cy.wait(1000)
})

Given(/^I fill the request sanitary item form$/, function () {
  cy.get('#has_transportation_true').check()
  cy.get('select[name="county_coverage"]').select(1)
  cy.get('#town').type('Galati')
  cy.get('#name').type('Product name')
  cy.get('#description').type('Product description')
  cy.get('#quantity').type(100)
  cy.get('#unit_type').type('box')
  cy.get('#packaging_type').type('bax')
})
