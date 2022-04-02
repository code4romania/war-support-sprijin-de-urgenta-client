import { Given } from 'cypress-cucumber-preprocessor/steps'
import { faker } from "@faker-js/faker";

Given(/^I click request for transport people button$/, function() {
  cy.findAllByText('Adaugă').eq(1).click()
  cy.wait(1000)
});

Given(/^I fill the request for transport people form$/, function() {
  cy.get('#available_seats').type(2)
  cy.get('#description').type(faker.commerce.productName())
  cy.get('#has_disabled_access_true').check()
  cy.get('#pets_allowed_true').check()
  cy.get('select[name="from_county"').select(1)
  cy.get('#from_city').type(faker.company.companyName())
  cy.get('select[name="to_county"').select(1)
  cy.get('#to_city').type(faker.company.companyName())
});
