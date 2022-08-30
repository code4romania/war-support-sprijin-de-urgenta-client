import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import mock from '../../utils/e2e'
import { faker } from '@faker-js/faker'

Given('I am a logged in user', () => {
  cy.login()
})

Given('I want to donate', () => {
  cy.visit('/')
  cy.findByText('Vreau să ofer ajutor').click()
  cy.findByText('Produse').click()
})

Given('I want to request', () => {
  cy.visit('/')
  cy.findByText('Am o solicitare').click()
  cy.findByText('Produse').click()
})

Given(/^I click add button$/, () => {
  cy.findAllByText('Adaugă').eq(0).click()
  cy.wait(1000)
})

Given(/^I click services resource$/, function () {
  cy.get('#resource_services').check()
  cy.intercept('POST', '**/donate/transport_service/', mock()).as(
    'donate/transport_service'
  )
  cy.intercept('POST', '**/request/transport_service/', mock()).as(
    'request/transport_service'
  )
})

Given(/^I click other resource$/, function () {
  cy.get('#resource_others').check()
  cy.intercept('POST', '**/donate/other/', mock()).as('donate/other')
  cy.intercept('POST', '**/request/other/', mock()).as('request/other')
})

Given(/^I click products resource$/, function () {
  cy.get('#resource_products').check()
  cy.intercept('POST', '**/donate/item/', mock()).as('donate/item')
  cy.intercept('POST', '**/request/item/', mock()).as('request/item')
})

Given(/^I click volunteer resource$/, function () {
  cy.get('#resource_volunteer').check()
  cy.intercept('POST', '**/donate/volunteering/', mock()).as(
    'donate/volunteering'
  )
  cy.intercept('POST', '**/request/volunteering/', mock()).as(
    'request/volunteering'
  )
})

Then(/^request volunteering resource is created successfully$/, function () {
  cy.wait('@request/volunteering').then(({ response, request }) => {
    expect(response.statusCode).to.equal(
      Cypress.env('e2e') === 'true' ? 201 : 200
    )
  })
})

Given(/^I submit the form$/, () => {
  cy.get('form button[type="submit"]').click()
  cy.findByText('Pasul urmator').click()
})

When(/^I submit the form$/, () => {
  cy.get('form button[type="submit"]').click()
  cy.findByText('Pasul urmator').click()
})

Then(/^I see the thank you for donation message$/, () => {
  cy.findByText(
    'Iți mulțumim pentru generozitate. Resursele pe care le-ai pus la dispoziție s-au înregistrat în sistem și imediat ce le vom aloca și oferi pentru a ajuta mai departe persoanele vulnerabile vom lua legătura cu tine.'
  )
})

Then(/^I see the thank you for donation message$/, () => {
  cy.findByText(
    'Iți mulțumim pentru generozitate. Resursele pe care le-ai pus la dispoziție s-au înregistrat în sistem și imediat ce le vom aloca și oferi pentru a ajuta mai departe persoanele vulnerabile vom lua legătura cu tine.'
  )
})

Then(/^I see the thank you for request message$/, () => {
  cy.findByText(
    'Îți mulțumim pentru mesajul transmis. Vom procesa cererea ta cât de repede posibil.'
  )
})

Then(/^I see the donate resources page$/, function () {
  cy.location().should((location) => {
    expect(location.pathname).to.eq('/offer/resources/')
  })
})

Then(/^I see the request resources page$/, function () {
  cy.location().should((location) => {
    expect(location.pathname).to.eq('/request/resources/')
  })
})

Then(/^donate item is created$/, function () {
  cy.wait('@donate/item').then(({ response, request }) => {
    expect(response.statusCode).to.equal(
      Cypress.env('e2e') === 'true' ? 201 : 200
    )
  })
})
Then(/^request item is created$/, function () {
  cy.wait('@request/item').then(({ response, request }) => {
    expect(response.statusCode).to.equal(
      Cypress.env('e2e') === 'true' ? 201 : 200
    )
  })
})
Then(/^donate other is created$/, function () {
  cy.wait('@donate/other').then(({ response, request }) => {
    expect(response.statusCode).to.equal(
      Cypress.env('e2e') === 'true' ? 201 : 200
    )
  })
})
Then(/^request other is created$/, function () {
  cy.wait('@request/other').then(({ response, request }) => {
    expect(response.statusCode).to.equal(
      Cypress.env('e2e') === 'true' ? 201 : 200
    )
  })
})
Then(/^donate transport service is created$/, function () {
  cy.wait('@donate/transport_service').then(({ response, request }) => {
    expect(response.statusCode).to.equal(
      Cypress.env('e2e') === 'true' ? 201 : 200
    )
  })
})
Then(/^request transport service is created$/, function () {
  cy.wait('@request/transport_service').then(({ response, request }) => {
    expect(response.statusCode).to.equal(
      Cypress.env('e2e') === 'true' ? 201 : 200
    )
  })
})
Then(/^donate volunteering is created$/, function () {
  cy.wait('@donate/volunteering').then(({ response, request }) => {
    expect(response.statusCode).to.equal(
      Cypress.env('e2e') === 'true' ? 201 : 200
    )
  })
})
Then(/^request volunteering is created$/, function () {
  cy.wait('@request/volunteering').then(({ response, request }) => {
    expect(response.statusCode).to.equal(
      Cypress.env('e2e') === 'true' ? 201 : 200
    )
  })
})

Given(/^I enter user credentials$/, function () {
  const given = {
    password: faker.internet.password(),
    email: faker.internet.email(),
    phone_number: faker.phone.phoneNumber('##########'),
  }

  cy.get('input[name="email"]').type(given.email)
  cy.get('input[name="phone_number"]').type(given.phone_number)
  cy.get('input[name="password"]').type(given.password)
  cy.get('input[name="re_password"]').type(given.password)
  cy.get('input[name="gdpr_consent"').check()
  cy.findByText('Pasul urmator').click()
})
