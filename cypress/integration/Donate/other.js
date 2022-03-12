import { faker } from '@faker-js/faker'
import mock from '../../utils/e2e'

describe('Donate other', () => {
  beforeEach(() => {
    cy.login()
    cy.intercept('POST', '**/donate/other/', mock()).as('donate/other')
    cy.visit('/')
    cy.findByText('Vreau să ofer ajutor').click()
    cy.findByText('Produse').click()
    cy.get('#resource_others').click()
  })
  it('successfully donates other resource', () => {
    cy.findAllByText('Adaugă').eq(0).click()
    cy.wait(1000)
    cy.get('#has_transportation_true').check()
    cy.get('#name').type('test')
    cy.get('.dropdown-heading-value').click()
    cy.wait(500)
    cy.get('.dropdown-content input[type="checkbox"]').eq(1).check()
    cy.get('#town').type('test')
    cy.get('#description').type('test')
    cy.get('form button[type="submit"]').click()
    cy.findByText('Pasul urmator').click()
    cy.wait('@donate/other').then(({ response, request }) => {
      expect(response.statusCode).to.equal(
        Cypress.env('e2e') === 'true' ? 201 : 200
      )
    })
  })
})
