import { Given, Then } from 'cypress-cucumber-preprocessor/steps'
import { faker } from '@faker-js/faker'

Given(/^I am an individual user$/, function () {
  cy.wait(1000)
  cy.get('select[name="userType"]').select(1)
})

Given(/^I enter individual details$/, function () {
  cy.get('input[name="first_name"]').type(faker.name.firstName())
  cy.get('input[name="last_name"]').type(faker.name.lastName())
  cy.findByText('Pasul urmator').click()
})
