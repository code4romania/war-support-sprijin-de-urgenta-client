const report = require('multiple-cucumber-html-reporter')

report.generate({
  jsonDir: 'cypress/cucumber-json',
  reportPath: './reports/cucumber',
  hideMetadata: true,
  pageTitle: 'Sprijin De Urgenta E2E tests results | Code4ro',
  reportName: 'Sprijin De Urgenta  E2E',
})
