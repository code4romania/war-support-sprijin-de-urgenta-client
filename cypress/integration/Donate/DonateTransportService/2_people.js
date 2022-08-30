import { Given } from 'cypress-cucumber-preprocessor/steps'
import { faker } from "@faker-js/faker";

Given(/^I click donate transport people button$/, function() {
  cy.findAllByText('Adaugă').eq(1).click()
  cy.wait(1000)
});

Given(/^I fill the donate transport people form$/, function() {
  cy.get('#available_seats').type(2)
  cy.get('#has_disabled_access_true').check()
  cy.get('#pets_allowed_true').check()
  cy.get('#type_1').check()
  cy.get('#driver_name').type('test')
  cy.get('#driver_id').type('zl102102')
  cy.get('#car_registration_number').type('GL09CPK')
  cy.get('#driver_contact').type('07333444444')
  cy.get('select[name="availability"]').select(1)
  cy.get('#description').type(faker.commerce.productName())
});
