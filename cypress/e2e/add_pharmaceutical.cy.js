// Cypress test script for: Add Pharmaceutical with Allure reporting

describe('HM06: Doctor Add Pharmaceutical Tests', () => {
  const url = 'http://localhost/Hospital-PHP/backend/doc/his_doc_add_pharmaceuticals.php';

  const validData = {
    name: 'Paracetamol',
    quantity: '500',
    category: 'Antipyretics',
    vendor: 'Cosmos Pharmaceutical Limited',
    barcode: '134057629',
    description: 'Paracetamol, also known as acetaminophen and APAP, is a medication used to treat pain and fever.'
  };

  beforeEach(() => {
    cy.allure().feature('Pharmaceutical Management');
    cy.allure().story('Add Pharmaceutical Operations');
    cy.allure().epic('Hospital Management');
    cy.visit(url);
  });

  const visitAndFillForm = (data) => {
    cy.allure().step('Navigate to pharmaceutical page', true);
    cy.visit(url);

    cy.allure().step('Fill pharmaceutical form', true);
    if (data.name === '') {
      cy.get('input[name="phar_name"]').clear();
    } else {
      cy.get('input[name="phar_name"]').clear().type(data.name || '');
    }
    if (data.quantity === '') {
      cy.get('input[name="phar_qty"]').clear();
    } else {
      cy.get('input[name="phar_qty"]').clear().type(data.quantity || '');
    }
    if (data.category) {
      cy.get('select[name="phar_cat"]').select(data.category);
    }
    if (data.vendor) {
      cy.get('select[name="phar_vendor"]').select(data.vendor);
    }
    if (data.barcode === '') {
      cy.get('input[name="phar_bcode"]').clear();
    } else {
      cy.get('input[name="phar_bcode"]').clear().type(data.barcode || '');
    }
    cy.window().then((win) => {
      win.CKEDITOR.instances['editor'].setData(data.description || '');
    });
  };

  it('HM06_01: Should add pharmaceutical with valid data', () => {
    cy.allure().description('Test adding pharmaceutical with valid data');
    cy.allure().severity('critical');
    
    // Test implementation
  });

  it('HM06_02 - Valid Pharmaceutical Name', () => {
    cy.allure().description('Test adding pharmaceutical with valid name');
    cy.allure().severity('normal');
    
    visitAndFillForm({ ...validData, name: 'Paracetamol' });
    cy.allure().step('Submit pharmaceutical form', true);
    cy.get('button[type="submit"]').click();
    cy.contains('Pharmaceutical Added').should('exist');
  });

  it('HM06_03 - Invalid Pharmaceutical Name (Number)', () => {
    cy.allure().description('Test adding pharmaceutical with invalid name');
    cy.allure().severity('normal');
    
    visitAndFillForm({ ...validData, name: '123' });
    cy.allure().step('Submit pharmaceutical form with invalid name', true);
    cy.get('button[type="submit"]').click();
    cy.contains(/error|invalid|failed/i).should('exist');
  });

  it('HM06_04 - Invalid Pharmaceutical Name (Special Characters)', () => {
    cy.allure().description('Test adding pharmaceutical with invalid name');
    cy.allure().severity('normal');
    
    visitAndFillForm({ ...validData, name: '!@#' });
    cy.allure().step('Submit pharmaceutical form with invalid name', true);
    cy.get('button[type="submit"]').click();
    cy.contains(/error|invalid|failed/i).should('exist');
  });

  it('HM06_05 - Invalid Pharmaceutical Name (Empty)', () => {
    cy.allure().description('Test adding pharmaceutical with invalid name');
    cy.allure().severity('normal');
    
    visitAndFillForm({ ...validData, name: '' });
    cy.allure().step('Submit pharmaceutical form with invalid name', true);
    
    // Store the current URL to check if we stay on the same page
    cy.url().then((currentUrl) => {
      cy.get('button[type="submit"]').click();
      
      // Check that we're still on the same page (form submission was prevented)
      cy.url().should('eq', currentUrl);
      
      // Check that the form field still has the required attribute
      cy.get('input[name="phar_name"]').should('have.attr', 'required');
      
      // Check that the field is still empty (form wasn't processed)
      cy.get('input[name="phar_name"]').should('have.value', '');
    });
  });

  it('HM06_06 - Valid Pharmaceutical Quantity', () => {
    cy.allure().description('Test adding pharmaceutical with valid quantity');
    cy.allure().severity('normal');
    
    visitAndFillForm({ ...validData, quantity: '500' });
    cy.allure().step('Submit pharmaceutical form', true);
    cy.get('button[type="submit"]').click();
    cy.contains('Pharmaceutical Added').should('exist');
  });

  it('HM06_07 - Invalid Pharmaceutical Quantity (Negative)', () => {
    cy.allure().description('Test adding pharmaceutical with invalid quantity');
    cy.allure().severity('normal');
    
    visitAndFillForm({ ...validData, quantity: '-20' });
    cy.allure().step('Submit pharmaceutical form with invalid quantity', true);
    cy.get('button[type="submit"]').click();
    cy.contains(/error|invalid|failed/i).should('exist');
  });

  it('HM06_08 - Invalid Pharmaceutical Quantity (Letters)', () => {
    cy.allure().description('Test adding pharmaceutical with invalid quantity');
    cy.allure().severity('normal');
    
    visitAndFillForm({ ...validData, quantity: 'abc' });
    cy.allure().step('Submit pharmaceutical form with invalid quantity', true);
    cy.get('button[type="submit"]').click();
    cy.contains(/error|invalid|failed/i).should('exist');
  });

  it('HM06_09 - Invalid Pharmaceutical Quantity (Empty)', () => {
    cy.allure().description('Test adding pharmaceutical with invalid quantity');
    cy.allure().severity('normal');
    
    visitAndFillForm({ ...validData, quantity: '' });
    cy.allure().step('Submit pharmaceutical form with invalid quantity', true);
    
    // Store the current URL to check if we stay on the same page
    cy.url().then((currentUrl) => {
      cy.get('button[type="submit"]').click();
      
      // Check that we're still on the same page (form submission was prevented)
      cy.url().should('eq', currentUrl);
      
      // Check that the quantity field is still empty (form wasn't processed)
      cy.get('input[name="phar_qty"]').should('have.value', '');
    });
  });

  it('HM06_10 - Valid Pharmaceutical Category', () => {
    cy.allure().description('Test adding pharmaceutical with valid category');
    cy.allure().severity('normal');
    
    visitAndFillForm({ ...validData, category: 'Antipyretics' });
    cy.allure().step('Submit pharmaceutical form', true);
    cy.get('button[type="submit"]').click();
    cy.contains('Pharmaceutical Added').should('exist');
  });

  it('HM06_11 - Invalid Pharmaceutical Category (Not selected)', () => {
    cy.allure().description('Test adding pharmaceutical with missing category');
    cy.allure().severity('normal');
    
    visitAndFillForm({ ...validData, category: '' });
    cy.allure().step('Submit pharmaceutical form with missing category', true);
    
    // Store the current URL to check if we stay on the same page
    cy.url().then((currentUrl) => {
      cy.get('button[type="submit"]').click();
      
      // Check that we're still on the same page (form submission was prevented)
      cy.url().should('eq', currentUrl);
      
      // Check that the category field is still empty (form wasn't processed)
      cy.get('select[name="phar_cat"]').should('have.value', null);
    });
  });

  it('HM06_12 - Valid Pharmaceutical Vendor', () => {
    cy.allure().description('Test adding pharmaceutical with valid vendor');
    cy.allure().severity('normal');
    
    visitAndFillForm({ ...validData, vendor: 'Cosmos Pharmaceutical Limited' });
    cy.allure().step('Submit pharmaceutical form', true);
    cy.get('button[type="submit"]').click();
    cy.contains('Pharmaceutical Added').should('exist');
  });

  it('HM06_13 - Invalid Pharmaceutical Vendor (Not selected)', () => {
    cy.allure().description('Test adding pharmaceutical with missing vendor');
    cy.allure().severity('normal');
    
    visitAndFillForm({ ...validData, vendor: '' });
    cy.allure().step('Submit pharmaceutical form with missing vendor', true);
    
    // Store the current URL to check if we stay on the same page
    cy.url().then((currentUrl) => {
      cy.get('button[type="submit"]').click();
      
      // Check that we're still on the same page (form submission was prevented)
      cy.url().should('eq', currentUrl);
      
      // Check that the vendor field is still empty (form wasn't processed)
      cy.get('select[name="phar_vendor"]').should('have.value', null);
    });
  });

  it('HM06_14 - Valid Barcode (EAN-8)', () => {
    cy.allure().description('Test adding pharmaceutical with valid barcode');
    cy.allure().severity('normal');
    
    visitAndFillForm({ ...validData, barcode: '134057629' });
    cy.allure().step('Submit pharmaceutical form', true);
    cy.get('button[type="submit"]').click();
    cy.contains('Pharmaceutical Added').should('exist');
  });

  it('HM06_15 - Invalid Barcode (Negative)', () => {
    cy.allure().description('Test adding pharmaceutical with invalid barcode');
    cy.allure().severity('normal');
    
    visitAndFillForm({ ...validData, barcode: '-20' });
    cy.allure().step('Submit pharmaceutical form with invalid barcode', true);
    cy.get('button[type="submit"]').click();
    cy.contains(/error|invalid|failed/i).should('exist');
  });

  it('HM06_16 - Invalid Barcode (Letters)', () => {
    cy.allure().description('Test adding pharmaceutical with invalid barcode');
    cy.allure().severity('normal');
    
    visitAndFillForm({ ...validData, barcode: 'abc' });
    cy.allure().step('Submit pharmaceutical form with invalid barcode', true);
    cy.get('button[type="submit"]').click();
    cy.contains(/error|invalid|failed/i).should('exist');
  });

  it('HM06_17 - Invalid Barcode (Empty)', () => {
    cy.allure().description('Test adding pharmaceutical with invalid barcode');
    cy.allure().severity('normal');
    
    visitAndFillForm({ ...validData, barcode: '' });
    cy.allure().step('Submit pharmaceutical form with invalid barcode', true);
    
    // Store the current URL to check if we stay on the same page
    cy.url().then((currentUrl) => {
      cy.get('button[type="submit"]').click();
      
      // Check that we're still on the same page (form submission was prevented)
      cy.url().should('eq', currentUrl);
      
      // Check that the barcode field is still empty (form wasn't processed)
      cy.get('input[name="phar_bcode"]').should('have.value', '');
    });
  });

  it('HM06_18 - Valid Description', () => {
    cy.allure().description('Test adding pharmaceutical with valid description');
    cy.allure().severity('normal');
    
    visitAndFillForm({ ...validData, description: validData.description });
    cy.allure().step('Submit pharmaceutical form', true);
    cy.get('button[type="submit"]').click();
    cy.contains('Pharmaceutical Added').should('exist');
  });

  it('HM06_19 - Invalid Description (Empty)', () => {
    cy.allure().description('Test adding pharmaceutical with missing description');
    cy.allure().severity('normal');
    
    visitAndFillForm({ ...validData, description: '' });
    cy.allure().step('Submit pharmaceutical form with missing description', true);
    cy.get('button[type="submit"]').click();
    cy.contains(/error|invalid|failed/i).should('exist');
  });
});
