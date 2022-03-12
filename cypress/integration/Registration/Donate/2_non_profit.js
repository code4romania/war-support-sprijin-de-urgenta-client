import { Given, Then } from 'cypress-cucumber-preprocessor/steps'
import { faker } from '@faker-js/faker'

Given(/^I am a Non-Profit user$/, function () {
  cy.wait(1000)
  cy.get('select[name="userType"]').select(2)
})

Given(/^I enter Non-Profit details$/, function () {
  cy.get('input[name="business_name"]').type(faker.company.companyName())
  cy.findByText('Pasul urmator').click()
})
