import { Given } from 'cypress-cucumber-preprocessor/steps'
import { faker } from "@faker-js/faker";

Given(/^I click donate transport goods button$/, function () {
  cy.findAllByText('Adaugă').eq(0).click()
  cy.wait(1000)
})

Given(/^I fill the donate transport goods form$/, function () {
  cy.get('#weight_capacity').type(100)
  cy.get('#weight_unit').type('l')
  cy.get('#has_refrigeration_true').check()
  cy.get('#type_1').check()
  cy.get('#driver_name').type('test')
  cy.get('#driver_id').type('zl102102')
  cy.get('#car_registration_number').type('GL09CPK')
  cy.get('#driver_contact').type('07333444444')
  cy.get('select[name="availability"]').select(1)
  cy.get('#description').type(faker.commerce.productName())
})
