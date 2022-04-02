const cucumber = require('cypress-cucumber-preprocessor').default
const createUser = require('cypress/plugins/create_user')

module.exports = (on, config) => {
  on('file:preprocessor', cucumber())
  on('task', createUser())
}
