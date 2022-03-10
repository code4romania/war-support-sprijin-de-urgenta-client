import { faker } from '@faker-js/faker'

describe('Register', () => {
  it('successfully register a new company account', () => {
    const password = faker.internet.password()
    const token = 'token'

    cy.intercept('POST', '*/registration', {
      access_token: token,
      refresh_token: token,
      user: {
        pk: 140,
        email: 'Cleo2@yahoo.com',
        first_name: '',
        last_name: '',
      },
    }).as('registration')

    cy.visit('/')
    cy.findByText('Vreau să ofer ajutor').click()
    cy.findByText('Servicii').click()
    cy.get('select[name="userType"]').select(1)
    cy.get('input[name="business_name"]').type(faker.company.companyName())
    cy.get('input[name="identification_no"]').type('business name')
    cy.findByText('Pasul urmator').click()
    cy.get('input[name="email"]').type(faker.internet.email())
    cy.get('input[name="phone_number"]').type('0722248412')
    cy.get('input[name="password"]').type(password)
    cy.get('input[name="re_password"]').type(password)
    cy.get('input[name="gdpr_consent"').check()
    cy.findByText('Pasul urmator').click()
    cy.wait('@registration').should(({ request, response }) => {
      expect(request.method).to.equal('POST')
      expect(response.statusCode).to.equal(200)
    })
  })

  it('successfully register a new NGO account', () => {
    const password = faker.internet.password()
    const token = 'token'

    cy.intercept('POST', '*/registration', {
      access_token: token,
      refresh_token: token,
      user: {
        pk: 140,
        email: 'Cleo2@yahoo.com',
        first_name: '',
        last_name: '',
      },
    }).as('registration')

    cy.visit('/')
    cy.findByText('Vreau să ofer ajutor').click()
    cy.findByText('Servicii').click()
    cy.get('select[name="userType"]').select(2)
    cy.get('input[name="business_name"]').type(faker.company.companyName())
    // cy.get('input[name="identification_no"]').type('business name')
    cy.findByText('Pasul urmator').click()
    cy.get('input[name="email"]').type(faker.internet.email())
    cy.get('input[name="phone_number"]').type('0722248412')
    cy.get('input[name="password"]').type(password)
    cy.get('input[name="re_password"]').type(password)
    cy.get('input[name="gdpr_consent"').check()
    cy.findByText('Pasul urmator').click()
    cy.wait('@registration').should(({ request, response }) => {
      expect(request.method).to.equal('POST')
      expect(response.statusCode).to.equal(200)
    })
  })

  it('successfully register a new NGO account', () => {
    const password = faker.internet.password()
    const token = 'token'

    cy.intercept('POST', '*/registration', {
      access_token: token,
      refresh_token: token,
      user: {
        pk: 140,
        email: 'Cleo2@yahoo.com',
        first_name: '',
        last_name: '',
      },
    }).as('registration')

    cy.visit('/')
    cy.findByText('Vreau să ofer ajutor').click()
    cy.findByText('Servicii').click()
    cy.get('select[name="userType"]').select(3)
    cy.get('input[name="business_name"]').type(faker.company.companyName())
    // cy.get('input[name="identification_no"]').type('business name')
    cy.findByText('Pasul urmator').click()
    cy.get('input[name="email"]').type(faker.internet.email())
    cy.get('input[name="phone_number"]').type('0722248412')
    cy.get('input[name="password"]').type(password)
    cy.get('input[name="re_password"]').type(password)
    cy.get('input[name="gdpr_consent"').check()
    cy.findByText('Pasul urmator').click()
    cy.wait('@registration').should(({ request, response }) => {
      expect(request.method).to.equal('POST')
      expect(response.statusCode).to.equal(200)
    })
  })
})
