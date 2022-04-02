import { Given } from 'cypress-cucumber-preprocessor/steps'

Given(/^I click donate other resource button$/, function () {
  cy.findAllByText('Adaugă').eq(0).click()
  cy.wait(1000)
})

Given(/^I fill the donate other resource form$/, () => {
  cy.get('#has_transportation_true').check()
  cy.get('#name').type('test')
  cy.selectMultiDropdown()
  cy.get('#town').type('test')
  cy.get('#description').type('test')
  cy.get('#available_until').type('2030-12-12')
})
