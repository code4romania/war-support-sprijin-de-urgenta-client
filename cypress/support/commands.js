import '@testing-library/cypress/add-commands'

Cypress.Commands.add('login', (email, pw) => {
  cy.request(
    'POST',
    `${Cypress.env('NEXT_PUBLIC_PUBLIC_API')}/ro/auth/login/`,
    {
      username: 'platica.ciprian+cypress@gmail.com',
      password: 'oparolanoua',
    }
  )
    .its('body')
    .then((body) => {
      cy.setCookie('token', body.access_token)
    })
})

Cypress.Commands.add('selectMultiDropdown', (email, pw) => {
  cy.get('.dropdown-heading-value').click({ force: true, timeout: 2000 })
  cy.wait(1000)
  cy.get('.dropdown-content input[type="checkbox"]')
    .eq(1)
    .check({ multiple: true })
  cy.get('form').click()
})
