// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
// ***********************************************

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/index.php')
  cy.get('input[type="text"], input[type="email"]').type(email)
  cy.get('input[type="password"]').type(password)
  cy.get('button[type="submit"], input[type="submit"]').click()
})

// Example of how to add a custom command
// Cypress.Commands.add('customCommand', (param1, param2) => { ... }) 