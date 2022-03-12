import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given(/^I want to login$/, function () {
  cy.visit('login')
})

Given(/^I enter login credentials$/, function () {
  cy.fixture('user').then(({user})=> {
      cy.get('#username').type(user.email)
      cy.get('#password').type(user.password)
    }
  )
})

When(/^I click login button$/, function () {
  cy.get('button[type="submit"]').click()
})

Then(/^I see homepage$/, function () {
  cy.location().should((location) => {
    expect(location.pathname).to.eq('/')
  })
})
