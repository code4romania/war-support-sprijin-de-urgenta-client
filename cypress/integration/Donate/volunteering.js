import { faker } from '@faker-js/faker'
import mock from '../../utils/e2e'

describe('Donate volunteering service', () => {
  beforeEach(() => {
    cy.login()
    cy.intercept('POST', '**/donate/volunteering/', mock()).as('donate/volunteering')
    cy.visit('/')
    cy.findByText('Vreau să ofer ajutor').click()
    cy.findByText('Produse').click()
    cy.get('#resource_volunteer').click()
  })

  afterEach(() => {
    cy.get('#name').type('test')
    cy.get('#has_transportation_true').check()
    cy.selectMultiDropdown()
    cy.get('#town').type('test')
    cy.get('#description').type('description')

    cy.get('form button[type="submit"]').click()
    cy.findByText('Pasul urmator').click()
    cy.wait('@donate/volunteering')
  })

  it('successfully donates 1st volunteering service', () => {
    cy.findAllByText('Adaugă').eq(0).click()
  })

  it('successfully donates 2nd volunteering service', () => {
    cy.findAllByText('Adaugă').eq(1).click()

  })
  it('successfully donates 3rd volunteering service', () => {
    cy.findAllByText('Adaugă').eq(2).click()
  })
  it('successfully donates 4th volunteering service', () => {
    cy.findAllByText('Adaugă').eq(3).click()
  })
  it('successfully donates 5th volunteering service', () => {
    cy.findAllByText('Adaugă').eq(4).click()
  })
  it('successfully donates 6th volunteering service', () => {
    cy.findAllByText('Adaugă').eq(5).click()
  })
  it('successfully donates 7th volunteering service', () => {
    cy.findAllByText('Adaugă').eq(6).click()
  })
})
