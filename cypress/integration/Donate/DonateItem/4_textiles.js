import { Given } from 'cypress-cucumber-preprocessor/steps'

Given(/^I click donate textile button$/, function () {
  cy.findAllByText('Adaugă').eq(3).click()
  cy.wait(1000)
})

Given(/^I fill the donate textile form$/, function () {
  cy.get('#has_transportation_true').check()
  cy.get('#textile_category_1').check()
  cy.get('#textile_size').type('xl')
  cy.get('#textile_category_4').check()
  cy.get('#name').type('test')
  cy.get('#quantity').type(100)
  cy.get('#unit_type').type('l')
  cy.get('#packaging_type').type('ambalaj plastic')
  cy.selectMultiDropdown()
  cy.get('#town').type('test')
})
