import { Given } from 'cypress-cucumber-preprocessor/steps'

Given(/^I click donate other item button$/, function () {
  cy.findAllByText('Adaugă').eq(6).click()
  cy.wait(1000)
})

Given(/^I fill the donate other item form$/, function () {
  cy.get('#has_transportation_true').check()
  cy.selectMultiDropdown()
  cy.get('#description').type('test')
  cy.get('#town').type('test')
  cy.get('#name').type('test')
  cy.get('#quantity').type(100)
  cy.get('#unit_type').type('l')
  cy.get('#packaging_type').type('ambalaj plastic')
})
