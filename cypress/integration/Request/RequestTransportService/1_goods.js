import { Given } from 'cypress-cucumber-preprocessor/steps'
import { faker } from "@faker-js/faker";

Given(/^I click request for transport goods button$/, function () {
  cy.findAllByText('Adaugă').eq(0).click()
  cy.wait(1000)
})

Given(/^I fill the request for transport goods form$/, function () {
  cy.get('#description').type(faker.commerce.productName())
  cy.get('#weight_capacity').type(100)
  cy.get('#weight_unit').type('l')
  cy.get('#has_refrigeration_true').check()
  cy.get('select[name="from_county"').select(1)
  cy.get('#from_city').type(faker.company.companyName())
  cy.get('select[name="to_county"').select(1)
  cy.get('#to_city').type(faker.company.companyName())
})
