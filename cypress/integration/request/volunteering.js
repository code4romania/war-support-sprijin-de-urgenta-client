import { faker } from '@faker-js/faker'
import mock from '../../utils/e2e'

describe('Request transport service', () => {
  beforeEach(() => {
    cy.login()
    cy.intercept('POST', '**/request/item/', mock()).as('request/item')
    cy.visit('/')
    cy.findByText('Am o solicitare').click()
    cy.findByText('Produse').click()
    cy.get('#resource_volunteer').click()
  })

  afterEach(() => {
    cy.get('select[name="county_coverage"]').select(1)
    cy.get('#town').type('Galati')
    cy.get('form button').click()
  })

  it('successfully login and request FOOD transport service', () => {
    cy.findAllByText('Adaugă').eq(0).click()
  })
  it('successfully login and request FOOD transport service', () => {
    cy.findAllByText('Adaugă').eq(1).click()
  })
  it('successfully login and request FOOD transport service', () => {
    cy.findAllByText('Adaugă').eq(2).click()
  })
  it('successfully login and request FOOD transport service', () => {
    cy.findAllByText('Adaugă').eq(3).click()
  })
  it('successfully login and request FOOD transport service', () => {
    cy.findAllByText('Adaugă').eq(4).click()
  })
  it('successfully login and request FOOD transport service', () => {
    cy.findAllByText('Adaugă').eq(5).click()
  })
  it('successfully login and request OTHER item', () => {
    cy.findAllByText('Adaugă').eq(6).click()
  })
})
