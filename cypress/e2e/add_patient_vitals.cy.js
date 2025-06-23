// Cypress test script for: Doctor Patient Vitals

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});

describe('HM08: Doctor Patient Vitals Test Cases', () => {
    const url = 'http://localhost/hospital-php/backend/doc/his_doc_patient_lab_vitals.php';
    const loginUrl = 'http://localhost/hospital-php/index.php';
  
    const baseData = {
      name: 'Michael White',
      ailment: 'Demo Test',
      number: 'DCRI8',
      vitals: {
        bodytemp: '37',
        heartpulse: '72',
        resprate: '16',
        bloodpress: '120/80'
      }
    };

    beforeEach(() => {
      cy.allure().feature('Patient Vitals');
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
      cy.allure().step('Navigate to patient vitals page', true);
      cy.visit(url);
      
      cy.allure().step('Select patient and fill vitals form', true);
      // Wait for the table to be visible and then click the link for the base patient
      cy.get('table').should('be.visible');
      cy.contains('td', baseData.number)
        .parent('tr')
        .find('a.badge-success')
        .should('exist')
        .click({ force: true });
      
      if (data.name !== undefined) {
        if (data.name === '') cy.get('input[name="vit_pat_name"]').clear();
        else cy.get('input[name="vit_pat_name"]').clear().type(data.name);
      }
      if (data.ailment !== undefined) {
        if (data.ailment === '') cy.get('input[name="vit_pat_ailment"]').clear();
        else cy.get('input[name="vit_pat_ailment"]').clear().type(data.ailment);
      }
      if (data.number !== undefined) {
        if (data.number === '') cy.get('input[name="vit_pat_number"]').clear();
        else cy.get('input[name="vit_pat_number"]').clear().type(data.number);
      }

      const vitals = data.vitals || {};
      if (vitals.bodytemp !== undefined) {
        if (vitals.bodytemp === '') cy.get('input[name="vit_bodytemp"]').clear();
        else cy.get('input[name="vit_bodytemp"]').clear().type(vitals.bodytemp);
      }
      if (vitals.heartpulse !== undefined) {
        if (vitals.heartpulse === '') cy.get('input[name="vit_heartpulse"]').clear();
        else cy.get('input[name="vit_heartpulse"]').clear().type(vitals.heartpulse);
      }
      if (vitals.resprate !== undefined) {
        if (vitals.resprate === '') cy.get('input[name="vit_resprate"]').clear();
        else cy.get('input[name="vit_resprate"]').clear().type(vitals.resprate);
      }
      if (vitals.bloodpress !== undefined) {
        if (vitals.bloodpress === '') cy.get('input[name="vit_bloodpress"]').clear();
        else cy.get('input[name="vit_bloodpress"]').clear().type(vitals.bloodpress);
      }
    };
  
    it('HM08_01 - All required fields valid', () => {
      cy.allure().description('Test adding patient vitals with all valid fields');
      cy.allure().severity('critical');
      
      visitAndFillForm(baseData);
      cy.allure().step('Submit vitals form', true);
      cy.contains('Add Vitals').click();
      cy.contains('Patient Vitals Addded').should('exist');
    });
  
    it('HM08_02 - Valid Patient Name', () => {
      cy.allure().description('Test adding vitals with valid patient name');
      cy.allure().severity('normal');
      
      visitAndFillForm({ ...baseData, name: 'Michael White' });
      cy.allure().step('Submit vitals form', true);
      cy.contains('Add Vitals').click();
      cy.contains('Patient Vitals Addded').should('exist');
    });
  
    it('HM08_03 - Invalid Patient Name (Numbers)', () => {
      cy.allure().description('Test adding vitals with invalid patient name');
      cy.allure().severity('normal');
      
      visitAndFillForm({ ...baseData, name: '123' });
      cy.allure().step('Submit vitals form with invalid name', true);
      cy.contains('Add Vitals').click();
      cy.contains('error').should('exist');
    });

    it('HM08_04 - Invalid Patient Name (Special Characters)', () => {
      cy.allure().description('Test adding vitals with invalid patient name');
      cy.allure().severity('normal');
      
      visitAndFillForm({ ...baseData, name: '!@#' });
      cy.allure().step('Submit vitals form with invalid name', true);
      cy.contains('Add Vitals').click();
      cy.contains('error').should('exist');
    });

    it('HM08_05 - Invalid Patient Name (Empty)', () => {
      cy.allure().description('Test adding vitals with invalid patient name');
      cy.allure().severity('normal');
      
      visitAndFillForm({ ...baseData, name: '' });
      cy.url().then((currentUrl) => {
        cy.contains('Add Vitals').click();
        cy.url().should('eq', currentUrl);
      });
    });
  
    it('HM08_06 - Valid Patient Ailment', () => {
      cy.allure().description('Test adding vitals with valid patient ailment');
      cy.allure().severity('normal');
      
      visitAndFillForm({ ...baseData, ailment: 'Demo Test' });
      cy.allure().step('Submit vitals form', true);
      cy.contains('Add Vitals').click();
      cy.contains('Patient Vitals Addded').should('exist');
    });
  
    it('HM08_07 - Invalid Patient Ailment (Numbers)', () => {
      cy.allure().description('Test adding vitals with invalid patient ailment');
      cy.allure().severity('normal');
      
      visitAndFillForm({ ...baseData, ailment: '123' });
      cy.allure().step('Submit vitals form with invalid ailment', true);
      cy.contains('Add Vitals').click();
      cy.contains('error').should('exist');
    });

    it('HM08_08 - Invalid Patient Ailment (Special Characters)', () => {
      cy.allure().description('Test adding vitals with invalid patient ailment');
      cy.allure().severity('normal');
      
      visitAndFillForm({ ...baseData, ailment: '!@#' });
      cy.allure().step('Submit vitals form with invalid ailment', true);
      cy.contains('Add Vitals').click();
      cy.contains('error').should('exist');
    });

    it('HM08_09 - Invalid Patient Ailment (Empty)', () => {
      cy.allure().description('Test adding vitals with invalid patient ailment');
      cy.allure().severity('normal');
      
      visitAndFillForm({ ...baseData, ailment: '' });
      cy.url().then((currentUrl) => {
        cy.contains('Add Vitals').click();
        cy.url().should('eq', currentUrl);
      });
    });
  
    it('HM08_10 - Valid Patient Number', () => {
      cy.allure().description('Test adding vitals with valid patient number');
      cy.allure().severity('normal');
      
      visitAndFillForm({ ...baseData, number: 'DCRI8' });
      cy.allure().step('Submit vitals form', true);
      cy.contains('Add Vitals').click();
      cy.contains('Patient Vitals Addded').should('exist');
    });
  
    it('HM08_11 - Invalid Patient Number (Letters)', () => {
      cy.allure().description('Test adding vitals with invalid patient number');
      cy.allure().severity('normal');
      
      visitAndFillForm({ ...baseData, number: 'abc' });
      cy.allure().step('Submit vitals form with invalid number', true);
      cy.contains('Add Vitals').click();
      cy.contains('error').should('exist');
    });

    it('HM08_12 - Invalid Patient Number (Special Characters)', () => {
      cy.allure().description('Test adding vitals with invalid patient number');
      cy.allure().severity('normal');
      
      visitAndFillForm({ ...baseData, number: '!@#' });
      cy.allure().step('Submit vitals form with invalid number', true);
      cy.contains('Add Vitals').click();
      cy.contains('error').should('exist');
    });

    it('HM08_13 - Invalid Patient Number (Empty)', () => {
      cy.allure().description('Test adding vitals with invalid patient number');
      cy.allure().severity('normal');
      
      visitAndFillForm({ ...baseData, number: '' });
      cy.url().then((currentUrl) => {
        cy.contains('Add Vitals').click();
        cy.url().should('eq', currentUrl);
      });
    });
  
    it('HM08_14 - Valid Body Temperature', () => {
      cy.allure().description('Test adding vitals with valid body temperature');
      cy.allure().severity('normal');
      
      visitAndFillForm({ ...baseData, vitals: { ...baseData.vitals, bodytemp: '37' } });
      cy.allure().step('Submit vitals form', true);
      cy.contains('Add Vitals').click();
      cy.contains('Patient Vitals Addded').should('exist');
    });
  
    it('HM08_15 - Invalid Body Temperature (Letters)', () => {
      cy.allure().description('Test adding vitals with invalid body temperature');
      cy.allure().severity('normal');
      
      visitAndFillForm({ ...baseData, vitals: { ...baseData.vitals, bodytemp: 'abc' } });
      cy.allure().step('Submit vitals form with invalid temperature', true);
      cy.contains('Add Vitals').click();
      cy.contains('error').should('exist');
    });
  
    it('HM08_16 - Invalid Body Temperature (Special Characters)', () => {
      cy.allure().description('Test adding vitals with invalid body temperature');
      cy.allure().severity('normal');
      
      visitAndFillForm({ ...baseData, vitals: { ...baseData.vitals, bodytemp: '!@#' } });
      cy.allure().step('Submit vitals form with invalid temperature', true);
      cy.contains('Add Vitals').click();
      cy.contains('error').should('exist');
    });

    it('HM08_17 - Invalid Body Temperature (Empty)', () => {
      cy.allure().description('Test adding vitals with invalid body temperature');
      cy.allure().severity('normal');
      
      visitAndFillForm({ vitals: { ...baseData.vitals, bodytemp: '' } });
      cy.url().then((currentUrl) => {
        cy.contains('Add Vitals').click();
        cy.url().should('eq', currentUrl);
      });
    });

    it('HM08_18 - Valid Heart Pulse', () => {
      cy.allure().description('Test adding vitals with valid heart pulse');
      cy.allure().severity('normal');
      
      visitAndFillForm({ ...baseData, vitals: { ...baseData.vitals, heartpulse: '72' } });
      cy.allure().step('Submit vitals form', true);
      cy.contains('Add Vitals').click();
      cy.contains('Patient Vitals Addded').should('exist');
    });
  
    it('HM08_19 - Invalid Heart Pulse (Letters)', () => {
      cy.allure().description('Test adding vitals with invalid heart pulse');
      cy.allure().severity('normal');
      
      visitAndFillForm({ ...baseData, vitals: { ...baseData.vitals, heartpulse: 'abc' } });
      cy.allure().step('Submit vitals form with invalid pulse', true);
      cy.contains('Add Vitals').click();
      cy.contains('error').should('exist');
    });

    it('HM08_20 - Invalid Heart Pulse (Special Characters)', () => {
      cy.allure().description('Test adding vitals with invalid heart pulse');
      cy.allure().severity('normal');
      
      visitAndFillForm({ ...baseData, vitals: { ...baseData.vitals, heartpulse: '!@#' } });
      cy.allure().step('Submit vitals form with invalid pulse', true);
      cy.contains('Add Vitals').click();
      cy.contains('error').should('exist');
    });

    it('HM08_21 - Invalid Heart Pulse (Empty)', () => {
      cy.allure().description('Test adding vitals with invalid heart pulse');
      cy.allure().severity('normal');
      
      visitAndFillForm({ vitals: { ...baseData.vitals, heartpulse: '' } });
      cy.url().then((currentUrl) => {
        cy.contains('Add Vitals').click();
        cy.url().should('eq', currentUrl);
      });
    });
  
    it('HM08_22 - Valid Respiratory Rate', () => {
      cy.allure().description('Test adding vitals with valid respiratory rate');
      cy.allure().severity('normal');
      
      visitAndFillForm({ ...baseData, vitals: { ...baseData.vitals, resprate: '16' } });
      cy.allure().step('Submit vitals form', true);
      cy.contains('Add Vitals').click();
      cy.contains('Patient Vitals Addded').should('exist');
    });
  
    it('HM08_23 - Invalid Respiratory Rate (Letters)', () => {
      cy.allure().description('Test adding vitals with invalid respiratory rate');
      cy.allure().severity('normal');
      
      visitAndFillForm({ ...baseData, vitals: { ...baseData.vitals, resprate: 'abc' } });
      cy.allure().step('Submit vitals form with invalid respiratory rate', true);
      cy.contains('Add Vitals').click();
      cy.contains('error').should('exist');
    });

    it('HM08_24 - Invalid Respiratory Rate (Special Characters)', () => {
      cy.allure().description('Test adding vitals with invalid respiratory rate');
      cy.allure().severity('normal');
      
      visitAndFillForm({ ...baseData, vitals: { ...baseData.vitals, resprate: '!@#' } });
      cy.allure().step('Submit vitals form with invalid respiratory rate', true);
      cy.contains('Add Vitals').click();
      cy.contains('error').should('exist');
    });

    it('HM08_25 - Invalid Respiratory Rate (Empty)', () => {
      cy.allure().description('Test adding vitals with invalid respiratory rate');
      cy.allure().severity('normal');
      
      visitAndFillForm({ vitals: { ...baseData.vitals, resprate: '' } });
      cy.url().then((currentUrl) => {
        cy.contains('Add Vitals').click();
        cy.url().should('eq', currentUrl);
      });
    });
  
    it('HM08_26 - Valid Blood Pressure', () => {
      cy.allure().description('Test adding vitals with valid blood pressure');
      cy.allure().severity('normal');
      
      visitAndFillForm({ ...baseData, vitals: { ...baseData.vitals, bloodpress: '120/80' } });
      cy.allure().step('Submit vitals form', true);
      cy.contains('Add Vitals').click();
      cy.contains('Patient Vitals Addded').should('exist');
    });
  
    it('HM08_27 - Invalid Blood Pressure (Letters)', () => {
      cy.allure().description('Test adding vitals with invalid blood pressure');
      cy.allure().severity('normal');
      
      visitAndFillForm({ ...baseData, vitals: { ...baseData.vitals, bloodpress: 'abc' } });
      cy.allure().step('Submit vitals form with invalid blood pressure', true);
      cy.contains('Add Vitals').click();
      cy.contains('error').should('exist');
    });

    it('HM08_28 - Invalid Blood Pressure (Special Characters)', () => {
      cy.allure().description('Test adding vitals with invalid blood pressure');
      cy.allure().severity('normal');
      
      visitAndFillForm({ ...baseData, vitals: { ...baseData.vitals, bloodpress: '!@#' } });
      cy.allure().step('Submit vitals form with invalid blood pressure', true);
      cy.contains('Add Vitals').click();
      cy.contains('error').should('exist');
    });

    it('HM08_29 - Invalid Blood Pressure (Empty)', () => {
      cy.allure().description('Test adding vitals with invalid blood pressure');
      cy.allure().severity('normal');
      
      visitAndFillForm({ vitals: { ...baseData.vitals, bloodpress: '' } });
      cy.url().then((currentUrl) => {
        cy.contains('Add Vitals').click();
        cy.url().should('eq', currentUrl);
      });
    });
});
  