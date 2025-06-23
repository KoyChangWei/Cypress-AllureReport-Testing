/// <reference types="cypress" />

describe('HM01: Admin Login Tests', () => {
  beforeEach(() => {
    // Handle uncaught exceptions from dashboard JavaScript
    cy.on('uncaught:exception', (err, runnable) => {
      // Returning false here prevents Cypress from failing the test
      if (err.message.includes('l.plot is not a function')) {
        return false
      }
      return true
    })
    cy.visit('http://localhost/hospital-php/backend/admin/index.php')
  })

  it('HM01_01: should login with correct credentials (admin@mail.com / Password@123)', () => {
    cy.get('input[name="ad_email"]').clear().type('admin@mail.com')
    cy.get('input[name="ad_pwd"]').clear().type('Password@123')
    cy.get('button[name="admin_login"]').click()

    cy.url().should('include', 'his_admin_dashboard.php')
    cy.contains('Dashboard').should('be.visible')
  })
  it('HM01_02: should show error with wrong credentials (admin@mail.com / Abcde)', () => {
    cy.get('input[name="ad_email"]').clear().type('admin@mail.com')
    cy.get('input[name="ad_pwd"]').clear().type('Abcde')
    cy.get('button[name="admin_login"]').click()

    cy.contains('Failed', { timeout: 10000 }).should('be.visible')
  })

  it('HM01_03: should show login with correct email (admin@mail.com)', () => {
    cy.get('input[name="ad_email"]').clear().type('admin@mail.com')
    cy.get('input[name="ad_pwd"]').clear().type('Password@123')
    cy.get('button[name="admin_login"]').click()

    cy.url().should('include', 'his_admin_dashboard.php')
    cy.contains('Dashboard').should('be.visible')
  })

  it('HM01_04: should show error with missing @ in email (adminmail.com)', () => {
    cy.get('input[name="ad_email"]').clear().type('adminmail.com')
    cy.get('input[name="ad_pwd"]').clear().type('Password@123')
    cy.get('button[name="admin_login"]').then($btn => {
      // Try to click and catch the validation message
      $btn[0].click()
      cy.get('input[name="ad_email"]').then($input => {
        // Cast to HTMLInputElement to access validity and validationMessage
        const inputElem = $input[0] as HTMLInputElement;
        const validity = inputElem.validity;
        const validationMessage = inputElem.validationMessage;
        expect(validity.valid).to.be.false;
        expect(validationMessage).to.contain("Please include an '@' in the email address.");
      })
    })

  })

  it('HM01_05: should show error with missing email (blankspace)', () => {
    cy.get('input[name="ad_email"]').clear()
    cy.get('input[name="ad_pwd"]').clear().type('Password@123')
    cy.get('button[name="admin_login"]').then($btn => {
      // Try to click and catch the validation message
      $btn[0].click()
      cy.get('input[name="ad_email"]').then($input => {
        // Cast to HTMLInputElement to access validity and validationMessage
        const inputElem = $input[0] as HTMLInputElement;
        const validity = inputElem.validity;
        const validationMessage = inputElem.validationMessage;
        expect(validity.valid).to.be.false;
        expect(validationMessage).to.contain("Please fill out this field.");
      })
    })
  })
  it('HM01_06: should show error with missing wrong format email (Missing Domain)', () => {
    cy.get('input[name="ad_email"]').clear().type('Admin@')
    cy.get('input[name="ad_pwd"]').clear().type('Password@123')
    cy.get('button[name="admin_login"]').then($btn => {
      // Try to click and catch the validation message
      $btn[0].click()
      cy.get('input[name="ad_email"]').then($input => {
        // Cast to HTMLInputElement to access validity and validationMessage
        const inputElem = $input[0] as HTMLInputElement;
        const validity = inputElem.validity;
        const validationMessage = inputElem.validationMessage;
        expect(validity.valid).to.be.false;
        expect(validationMessage).to.contain("Please enter a part following '@'. 'Admin@' is incomplete.");
      })
    })
  })

  it('HM01_07: should show error with missing wrong format email (1234566)', () => {
    cy.get('input[name="ad_email"]').clear().type('1234566')
    cy.get('input[name="ad_pwd"]').clear().type('Password@123')
    cy.get('button[name="admin_login"]').then($btn => {
      // Try to click and catch the validation message
      $btn[0].click()
      cy.get('input[name="ad_email"]').then($input => {
        // Cast to HTMLInputElement to access validity and validationMessage
        const inputElem = $input[0] as HTMLInputElement;
        const validity = inputElem.validity;
        const validationMessage = inputElem.validationMessage;
        expect(validity.valid).to.be.false;
        expect(validationMessage).to.contain("Please include an '@' in the email address.");
      })
    })
  })
  it('HM01_08: should login with correct password (Password@123)', () => {
    cy.get('input[name="ad_email"]').clear().type('admin@mail.com')
    cy.get('input[name="ad_pwd"]').clear().type('Password@123')
    cy.get('button[name="admin_login"]').click()

    cy.url().should('include', 'his_admin_dashboard.php')
    cy.contains('Dashboard').should('be.visible')
  })
  it('HM01_09: should show error with empty password (blankspace)', () => {
    cy.get('input[name="ad_email"]').clear().type('admin@mail.com')
    cy.get('input[name="ad_pwd"]').clear()
    cy.get('button[name="admin_login"]').then($btn => {
      // Try to click and catch the validation message
      $btn[0].click()
      cy.get('input[name="ad_pwd"]').then($input => {
        // Cast to HTMLInputElement to access validity and validationMessage
        const inputElem = $input[0] as HTMLInputElement;
        const validity = inputElem.validity;
        const validationMessage = inputElem.validationMessage;
        expect(validity.valid).to.be.false;
        expect(validationMessage).to.contain("Please fill out this field.");
      })
    })
  })

  it('HM01_10: should show error with invalid password (abcde)', () => {
    cy.get('input[name="ad_email"]').clear().type('admin@mail.com')
    cy.get('input[name="ad_pwd"]').clear().type('abcde')
    cy.get('button[name="admin_login"]').click()

    cy.contains('Failed', { timeout: 10000 }).should('be.visible')
  })

  it('HM01_11: should show error with invalid password (12345)', () => {
    cy.get('input[name="ad_email"]').clear().type('admin@mail.com')
    cy.get('input[name="ad_pwd"]').clear().type('12345')
    cy.get('button[name="admin_login"]').click()

    cy.contains('Failed', { timeout: 10000 }).should('be.visible')
  })

  it('HM01_12: should show error with invalid password (Abc123)', () => {
    cy.get('input[name="ad_email"]').clear().type('admin@mail.com')
    cy.get('input[name="ad_pwd"]').clear().type('Abc123')
    cy.get('button[name="admin_login"]').click()

    cy.contains('Failed', { timeout: 10000 }).should('be.visible')
  })
})
