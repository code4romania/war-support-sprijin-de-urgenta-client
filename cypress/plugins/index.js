const cucumber = require('cypress-cucumber-preprocessor').default
const createUser = require('scripts/tests/create_user')

module.exports = (on, config) => {
  on('file:preprocessor', cucumber())
  on('task', createUser())
}
