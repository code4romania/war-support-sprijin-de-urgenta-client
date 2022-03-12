import { Given } from 'cypress-cucumber-preprocessor/steps'

Given(/^I click donate tent button$/, function () {
  cy.findAllByText('Adaugă').eq(5).click()
  cy.wait(1000)
})

Given(/^I fill the donate tent form$/, function () {
  cy.get('#has_transportation_true').check()
  cy.get('#quantity').type(100)
  cy.get('#tent_capacity').type(2)
  cy.selectMultiDropdown()
  cy.get('#town').type('test')
})
