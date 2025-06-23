// Import Allure plugin
import '@shelex/cypress-allure-plugin';

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

declare global {
  namespace Cypress {
    interface Chainable {
      // Add custom commands here if needed
      login(email: string, password: string): Chainable<void>
    }
  }
} 