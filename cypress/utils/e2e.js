const e2e = (mock) =>
  Cypress.env('e2e') !== "true" ? mock || {} : undefined

export default e2e;
