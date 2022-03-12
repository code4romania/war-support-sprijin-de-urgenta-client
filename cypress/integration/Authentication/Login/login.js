import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given(/^I want to login$/, function () {
  cy.visit('login')
})

Given(/^I enter login credentials$/, function () {
  cy.get('#username').type('platica.ciprian+cypress@gmail.com')
  cy.get('#password').type('oparolanoua')
})

When(/^I click login button$/, function () {
  cy.get('button[type="submit"]').click();
})

Then(/^I see homepage$/, function () {
  cy.location().should((location) => {
    expect(location.pathname).to.eq('/')
  })
})
