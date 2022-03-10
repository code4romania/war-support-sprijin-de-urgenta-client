import { faker } from '@faker-js/faker'

describe('Register', () => {
  beforeEach(() => {
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
  })

  it('successfully register a Corporate user', () => {
    const given = {
      userType: 1,
      password: faker.internet.password(),
      business_name: faker.company.companyName(),
      identification_no: faker.random.alphaNumeric(8),
      email: faker.internet.email(),
      phone_number: faker.phone.phoneNumber('##########'),
    }

    cy.get('select[name="userType"]').select(given.userType)
    cy.get('input[name="business_name"]').type(given.business_name)
    cy.get('input[name="identification_no"]').type(given.identification_no)
    cy.findByText('Pasul urmator').click()
    cy.get('input[name="email"]').type(given.email)
    cy.get('input[name="phone_number"]').type(given.phone_number)
    cy.get('input[name="password"]').type(given.password)
    cy.get('input[name="re_password"]').type(given.password)
    cy.get('input[name="gdpr_consent"').check()
    cy.findByText('Pasul urmator').click()
    cy.wait('@registration').should(({ request, response }) => {
      expect(request.method).to.equal('POST')
      console.log('request', request.body)
      expect(request.body).to.deep.equal({
        business_name: given.business_name,
        email: given.email,
        gdpr_consent: true,
        identification_no: given.identification_no,
        password: given.password,
        phone_number: given.phone_number,
        re_password: given.password,
        type: 2,
        username: given.email,
      })
      expect(response.statusCode).to.equal(200)
    })
  })

  it('successfully register a Non-Profit user', () => {
    const password = faker.internet.password()

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

  it('successfully register a Government account', () => {
    const password = faker.internet.password()

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
