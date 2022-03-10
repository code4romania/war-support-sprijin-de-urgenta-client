import { faker } from '@faker-js/faker'
import mock from '../../utils/e2e'

describe('Donate products', () => {
  beforeEach(() => {
    cy.login()
    cy.intercept('POST', '**/donate/item/', mock()).as('donate/item')
    cy.visit('/')
    cy.findByText('Vreau să ofer ajutor').click()
    cy.findByText('Produse').click()
    cy.get('#resource_products').click()
  })

  afterEach(() => {
    cy.get('form button[type="submit"]').click({ force: true })
    cy.findByText('Pasul urmator').click()
    cy.wait('@donate/item').then(({ response, request }) => {
      expect(response.statusCode).to.equal(
        Cypress.env('e2e') === 'true' ? 201 : 200
      )
    })
  })

  it('successfully donates Food item', () => {
    cy.findAllByText('Adaugă').eq(0).click()
    cy.get('#has_transportation_true').check()
    cy.wait(1000)
    cy.selectMultiDropdown()
    cy.get('#town').type('test')
    cy.get('#name').type('test')
    cy.get('#quantity').type(100)
    cy.get('#unit_type').type('l')
    cy.get('#packaging_type').type('ambalaj plastic')
  })

  it('successfully donates General Hygene item', () => {
    cy.findAllByText('Adaugă').eq(1).click()
    cy.wait(1000)
    cy.get('#has_transportation_true').check()
    cy.selectMultiDropdown()
    cy.get('#town').type('test')
    cy.get('#name').type('test')
    cy.get('#quantity').type(100)
    cy.get('#unit_type').type('l')
    cy.get('#packaging_type').type('ambalaj plastic')
  })

  it('successfully donates Feminine Hygene item', () => {
    cy.findAllByText('Adaugă').eq(2).click()
    cy.wait(1000)
    cy.get('#has_transportation_true').check()
    cy.selectMultiDropdown()
    cy.get('#town').type('test')
    cy.get('#name').type('test')
    cy.get('#quantity').type(100)
    cy.get('#unit_type').type('l')
    cy.get('#packaging_type').type('ambalaj plastic')
  })

  it('successfully donates Clothing and other textiles item', () => {
    cy.findAllByText('Adaugă').eq(3).click()
    cy.wait(1000)
    cy.get('#has_transportation_true').check()
    cy.get('#textile_category_1').check()
    cy.get('#textile_size').type('xl')
    cy.get('#textile_category_4').check()
    cy.get('#name').type('test')
    cy.get('#quantity').type(100)
    cy.get('#unit_type').type('l')
    cy.get('#packaging_type').type('ambalaj plastic')
    cy.selectMultiDropdown()
    cy.get('#town').type('test')
  })

  it('successfully donates Constructions materials', () => {
    cy.findAllByText('Adaugă').eq(4).click()
    cy.wait(1000)
    cy.wait(1000)
    cy.get('#has_transportation_true').check()
    cy.selectMultiDropdown()
    cy.get('#town').type('test')
    cy.get('#name').type('test')
    cy.get('#quantity').type(100)
    cy.get('#unit_type').type('l')
    cy.get('#packaging_type').type('ambalaj plastic')
  })

  it('successfully donates tents', () => {
    cy.findAllByText('Adaugă').eq(5).click()
    cy.wait(1000)
    cy.get('#has_transportation_true').check()
    cy.get('#quantity').type(100)
    cy.get('#tent_capacity').type(2)
    cy.selectMultiDropdown()
    cy.get('#town').type('test')
  })

  it('successfully donates other item', () => {
    cy.findAllByText('Adaugă').eq(6).click()
    cy.wait(1000)
    cy.get('#has_transportation_true').check()
    cy.selectMultiDropdown()
    cy.get('#description').type('test')
    cy.get('#town').type('test')
    cy.get('#name').type('test')
    cy.get('#quantity').type(100)
    cy.get('#unit_type').type('l')
    cy.get('#packaging_type').type('ambalaj plastic')
  })
})
