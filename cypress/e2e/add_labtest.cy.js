// Cypress test script for: Doctor Patient Lab Test with Allure reporting

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});

describe('HM07: Doctor Patient Lab Test Cases', () => {
    const url = 'http://localhost/hospital-php/backend/doc/his_doc_patient_lab_test.php';
    const loginUrl = 'http://localhost/hospital-php/index.php';
  
    const baseData = {
      name: 'Cynthia Connolly',
      ailment: 'Demo Test',
      number: '3Z14K',
      lab: 'Testing data for laboratory test'
    };
  
    beforeEach(() => {
      cy.allure().feature('Laboratory Tests');
      cy.allure().story('Doctor Operations');
      cy.allure().epic('Hospital Management');
      
      // Login before each test
      cy.allure().step('Login as Doctor', true);
      cy.visit(loginUrl);
      cy.contains("Doctor's Login").click();
      cy.get('input[name="doc_number"]').type('YDS7L');
      cy.get('input[name="doc_pwd"]').type('password');
      cy.get('button[type="submit"]').click();
      // Wait for login to complete
      cy.url().should('include', '/backend/doc/');
    });
  
    const visitAndFillForm = (data) => {
      cy.visit(url);
      // Wait for the table to be visible and then click the link for the base patient
      cy.get('table').should('be.visible');
      cy.contains('td', baseData.number)
        .parent('tr')
        .find('a.badge-success')
        .should('exist')
        .click({ force: true });
      
      // On the form, clear the fields if new data is provided
      if (data.name !== undefined) {
        if (data.name === '') cy.get('input[name="lab_pat_name"]').clear();
        else cy.get('input[name="lab_pat_name"]').clear().type(data.name);
      }
      if (data.ailment !== undefined) {
        if (data.ailment === '') cy.get('input[name="lab_pat_ailment"]').clear();
        else cy.get('input[name="lab_pat_ailment"]').clear().type(data.ailment);
      }
      if (data.number !== undefined) {
        if (data.number === '') cy.get('input[name="lab_pat_number"]').clear();
        else cy.get('input[name="lab_pat_number"]').clear().type(data.number);
      }
      
      // Handle CKEDITOR typing
      cy.window().then((win) => {
        if (win.CKEDITOR && win.CKEDITOR.instances && win.CKEDITOR.instances['editor']) {
          win.CKEDITOR.instances['editor'].setData(data.lab || '');
        }
      });
    };
  
    it('HM07_01 - All required fields valid', () => {
      cy.allure().description('Test adding lab test with all valid fields');
      cy.allure().severity('critical');
      
      visitAndFillForm(baseData);
      cy.contains('Add Laboratory Test').click();
      cy.contains('Patient Laboratory Tests Addded').should('exist');
    });
  
    it('HM07_02 - Valid Patient Name', () => {
      cy.allure().description('Test adding lab test with valid patient name');
      cy.allure().severity('normal');
      
      visitAndFillForm({ ...baseData, name: 'Cynthia Connolly' });
      cy.contains('Add Laboratory Test').click();
      cy.contains('Patient Laboratory Tests Addded').should('exist');
    });
  
    it('HM07_03 - Invalid Patient Name (Numbers)', () => {
      cy.allure().description('Test adding lab test with invalid patient name');
      cy.allure().severity('normal');
      
      visitAndFillForm({ ...baseData, name: '123' });
      cy.contains('Add Laboratory Test').click();
      cy.contains('error').should('exist');
    });

    it('HM07_04 - Invalid Patient Name (Special Characters)', () => {
      cy.allure().description('Test adding lab test with invalid patient name');
      cy.allure().severity('normal');
      
      visitAndFillForm({ ...baseData, name: '!@#' });
      cy.contains('Add Laboratory Test').click();
      cy.contains('error').should('exist');
    });

    it('HM07_05 - Invalid Patient Name (Empty)', () => {
      cy.allure().description('Test adding lab test with invalid patient name');
      cy.allure().severity('normal');
      
      visitAndFillForm({ name: '' });
      cy.url().then((currentUrl) => {
        cy.contains('Add Laboratory Test').click();
        cy.url().should('eq', currentUrl);
      });
    });
  
    it('HM07_06 - Valid Patient Ailment', () => {
      cy.allure().description('Test adding lab test with valid patient ailment');
      cy.allure().severity('normal');
      
      visitAndFillForm({ ...baseData, ailment: 'Demo Test' });
      cy.contains('Add Laboratory Test').click();
      cy.contains('Patient Laboratory Tests Addded').should('exist');
    });
  
    it('HM07_07 - Invalid Patient Ailment (Numbers)', () => {
      cy.allure().description('Test adding lab test with invalid patient ailment');
      cy.allure().severity('normal');
      
      visitAndFillForm({ ...baseData, ailment: '123' });
      cy.contains('Add Laboratory Test').click();
      cy.contains('error').should('exist');
    });
  
    it('HM07_08 - Invalid Patient Ailment (Special Characters)', () => {
      cy.allure().description('Test adding lab test with invalid patient ailment');
      cy.allure().severity('normal');
      
      visitAndFillForm({ ...baseData, ailment: '!@#' });
      cy.contains('Add Laboratory Test').click();
      cy.contains('error').should('exist');
    });
  

    it('HM07_09 - Invalid Patient Ailment (Empty)', () => {
      cy.allure().description('Test adding lab test with invalid patient ailment');
      cy.allure().severity('normal');
      
      visitAndFillForm({ ailment: '' });
      cy.url().then((currentUrl) => {
        cy.contains('Add Laboratory Test').click();
        cy.url().should('eq', currentUrl);
      });
    });
  
    it('HM07_10 - Valid Patient Number', () => {
      cy.allure().description('Test adding lab test with valid patient number');
      cy.allure().severity('normal');
      
      visitAndFillForm({ ...baseData, number: '3Z14K' });
      cy.contains('Add Laboratory Test').click();
      cy.contains('Patient Laboratory Tests Addded').should('exist');
    });
  
    it('HM07_11 - Invalid Patient Number (Special Characters)', () => {
      cy.allure().description('Test adding lab test with invalid patient number');
      cy.allure().severity('normal');
      
      visitAndFillForm({ ...baseData, number: '!@#' });
      cy.contains('Add Laboratory Test').click();
      cy.contains('error').should('exist');
    });
  
    it('HM07_12 - Invalid Patient Number (Empty)', () => {
      cy.allure().description('Test adding lab test with invalid patient number');
      cy.allure().severity('normal');
      
      visitAndFillForm({ number: '' });
      cy.url().then((currentUrl) => {
        cy.contains('Add Laboratory Test').click();
        cy.url().should('eq', currentUrl);
      });
    });
  
    it('HM07_13 - Valid Lab Test', () => {
      cy.allure().description('Test adding lab test with valid lab test data');
      cy.allure().severity('normal');
      
      visitAndFillForm({ ...baseData, lab: 'Testing data for laboratory test' });
      cy.contains('Add Laboratory Test').click();
      cy.contains('Patient Laboratory Tests Addded').should('exist');
    });

    it('HM07_14 - Invalid Lab Test (Special Characters)', () => {
      cy.allure().description('Test adding lab test with invalid lab test data');
      cy.allure().severity('normal');
      
      visitAndFillForm({ ...baseData, lab: '!@#' });
      cy.contains('Add Laboratory Test').click();
      cy.contains('error').should('exist');
    });
  
    it('HM07_15 - Invalid Lab Test (Empty)', () => {
      cy.allure().description('Test adding lab test with invalid lab test data');
      cy.allure().severity('normal');
      
      visitAndFillForm({ lab: '' });
      cy.url().then((currentUrl) => {
        cy.contains('Add Laboratory Test').click();
        cy.url().should('eq', currentUrl);
      });
    });
});
  