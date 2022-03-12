import { faker } from '@faker-js/faker'
import mock from '../../utils/e2e'

describe('Request other resources', () => {
  beforeEach(() => {
    cy.login()
    cy.intercept('POST', '**/request/other/', mock()).as('request/other')
    cy.visit('/')
    cy.findByText('Am o solicitare').click()
    cy.findByText('Produse').click()
    cy.get('#resource_others').click()
  })
  it('successfully login and request other resource', () => {
    cy.findAllByText('Adaugă').eq(0).click()
    cy.get('#name').type('test')
    cy.get('select[name="county_coverage"]').select(1)
    cy.get('#town').type('test')
    cy.get('form button[type="submit"]').click()
  })
})
