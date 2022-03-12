import { Given, Then } from 'cypress-cucumber-preprocessor/steps'
import { faker } from '@faker-js/faker'

Given(/^I am a Government user$/, function () {
  cy.wait(1000)
  cy.get('select[name="userType"]').select(1)
})

Given(/^I enter Government details$/, function () {
  cy.get('input[name="business_name"]').type(faker.company.companyName())
  cy.get('input[name="identification_no"]').type(faker.random.alphaNumeric(8))
  cy.findByText('Pasul urmator').click()
})
