import { faker } from '@faker-js/faker'
import mock from '../../utils/e2e'

xdescribe('Request products', () => {
  beforeEach(() => {
    cy.login()
    cy.intercept('POST', '**/request/item/', mock()).as('request/item')
    cy.visit('/')
    cy.findByText('Am o solicitare').click()
    cy.findByText('Produse').click()
    cy.get('#resource_products').click()
  })

  afterEach(() => {
    cy.wait(2000)
    cy.get('#name').type('test')
    cy.get('#description').type('test')
    cy.get('#quantity').type(100)
    cy.get('#unit_type').type('kg')
    cy.get('#packaging_type').type('test')
    cy.get('select[name="county_coverage"]').select(1)
    cy.get('#town').type('test')
    cy.get('form button[type="submit"]').click()
    cy.wait('@request/item').then(({ response }) => {
      expect(response.statusCode).to.equal(201)
    })
  })

  it('successfully requests Food item', () => {
    cy.findAllByText('Adaugă').eq(0).click()
  })
  it('successfully requests General Hygene item', () => {
    cy.findAllByText('Adaugă').eq(1).click()
  })
  it('successfully requests Feminine Hygene item', () => {
    cy.findAllByText('Adaugă').eq(2).click()
  })
})

describe('Request products', () => {
  beforeEach(() => {
    cy.login()
    cy.intercept('POST', '**/request/item/', mock()).as('request/item')
    cy.visit('/')
    cy.findByText('Am o solicitare').click()
    cy.findByText('Produse').click()
    cy.get('#resource_products').click()
  })

  afterEach(() => {
    cy.get('form button[type="submit"]').click()
    cy.wait('@request/item').then(({ response }) => {
      expect(response.statusCode).to.equal(201)
    })
  })

  it('successfully requests Clothing and other textiles', () => {
    cy.findAllByText('Adaugă').eq(3).click()
    cy.wait(2000)
    cy.get('#textile_category_1').check()
    cy.get('#textile_size').type('xl')
    cy.get('#quantity').type(100)
    cy.get('#unit_type').type('kg')
    cy.get('#packaging_type').type('test')
    cy.get('select[name="county_coverage"]').select(1)
    cy.get('#town').type('test')
  })

  it('successfully requests Constructions materials', () => {
    cy.findAllByText('Adaugă').eq(4).click()
    cy.wait(2000)
    cy.get('#has_transportation_true').check()
    cy.get('select[name="county_coverage"]').select(1)
    cy.get('#town').type('test')
    cy.get('#name').type('test')
    cy.get('#quantity').type(100)
    cy.get('#unit_type').type('kg')
    cy.get('#packaging_type').type('test')
  })

  it('successfully requests tents', () => {
    cy.findAllByText('Adaugă').eq(5).click()
    cy.wait(2000)
    cy.get('#quantity').type(2)
    cy.get('#tent_capacity').type(2)
    cy.get('select[name="county_coverage"]').select(1)
    cy.get('#town').type('test')
  })

  it('successfully requests Other item', () => {
    cy.findAllByText('Adaugă').eq(6).click()
    cy.wait(2000)
    cy.get('#name').type('test')
    cy.get('#description').type('test')
    cy.get('#quantity').type(100)
    cy.get('#unit_type').type('kg')
    cy.get('#packaging_type').type('test')
    cy.get('select[name="county_coverage"]').select(1)
    cy.get('#town').type('test')
  })
})
