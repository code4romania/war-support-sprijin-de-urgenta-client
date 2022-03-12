import { faker } from '@faker-js/faker'
import mock from '../../utils/e2e'

describe('Donate transport service', () => {
  beforeEach(()=>{
    cy.login()
    cy.intercept('POST', '**/donate/transport_service/', mock()).as(
      'donate/transport_service'
    )
    cy.visit('/')
    cy.findByText('Vreau să ofer ajutor').click()
    cy.findByText('Servicii').click()
    cy.get('#resource_services').click()
  })
  afterEach(()=>{
    cy.get('form button').click()
    cy.findByText('Pasul urmator').click()
    cy.wait('@donate/transport_service')
  })

  it('successfully donates goods transport service', () => {
    cy.findAllByText('Adaugă').first().click()
    cy.get('#weight_capacity').type(100)
    cy.get('#weight_unit').type('l')
    cy.get('#has_refrigeration_true').check()
    cy.get('#type_1').check()
    cy.get('#driver_name').type('test')
    cy.get('#driver_id').type('zl102102')
    cy.get('#car_registration_number').type('GL09CPK')
    cy.get('#driver_contact').type('07333444444')
    cy.get('select[name="availability"]').select(1)
    cy.get('#description').type(faker.commerce.productName())
  })

  it('successfully donates people transport service ', () => {
    cy.findAllByText('Adaugă').eq('1').click()
    cy.get('#available_seats').type(2)
    cy.get('#has_disabled_access_true').check()
    cy.get('#pets_allowed_true').check()
    cy.get('#type_1').check()
    cy.get('#driver_name').type('test')
    cy.get('#driver_id').type('zl102102')
    cy.get('#car_registration_number').type('GL09CPK')
    cy.get('#driver_contact').type('07333444444')
    cy.get('select[name="availability"]').select(1)
    cy.get('#description').type(faker.commerce.productName())
  })
})
