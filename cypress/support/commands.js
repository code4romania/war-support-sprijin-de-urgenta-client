import '@testing-library/cypress/add-commands'

Cypress.Commands.add('login', (email, pw) => {
  cy.request(
    'POST',
    `${Cypress.env('NEXT_PUBLIC_PUBLIC_API')}/ro/auth/login/`,
    {
      username: 'platica.ciprian@gmail.com',
      password: 'oparolanoua',
    }
  )
    .its('body')
    .then((body) => {
      cy.setCookie('token', body.access_token)
    })
})

Cypress.Commands.add('selectMultiDropdown', (email, pw) => {
  cy.wait(500)
  cy.get('.dropdown-heading-value').click({force: true})
  cy.wait(500)
  cy.get('.dropdown-content input[type="checkbox"]')
    .eq(1)
    .check({ multiple: true })
  cy.get('form').click()
})
