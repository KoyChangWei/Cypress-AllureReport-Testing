describe('HM04: Admin Add Pharmaceutical Category Tests', () => {
  beforeEach(() => {
    cy.allure().epic('Hospital Management System');
    cy.allure().feature('Pharmaceutical Management');
    cy.allure().story('Add Pharmaceutical Category');
    // Visit the add pharmaceutical category page directly
    cy.visit('http://localhost/hospital-php/backend/admin/his_admin_add_pharm_cat.php');
    cy.wait(1200);
  });

  it('HM04_01: All required fields are filled with valid data', () => {
    cy.allure().description('Test adding pharmaceutical category with all valid fields');
    cy.allure().severity('critical');
    // Fill all required fields with valid data
    cy.get('input[name="pharm_cat_name"]').clear().type('Analgesics');
    cy.get('select[name="pharm_cat_vendor"]').select('Cosmos Pharmaceutical Limited');
    cy.window().then((win: any) => {
      win.CKEDITOR.instances.editor.setData('Most antipyretic medications have other purposes. The most common antipyretics in the United States are ibuprofen and aspirin with 1.');
    });
    
    cy.get('button[name="add_pharmaceutical_category"]').click();
    cy.wait(2000);
    
    // Valid case: Should show success dialog
    cy.get('body').then(($body) => {
      const hasSuccess = $body.find('.swal-title:contains("Success")').length > 0;
      
      if (hasSuccess) {
        cy.log('✅ PASS: Valid data was accepted successfully');
        cy.contains('OK').click({force: true});
      } else {
        cy.log('❌ FAIL: Valid data was rejected');
        throw new Error('Valid data should have been accepted');
      }
    });
  });

  it('HM04_02: Valid Pharmaceutical Category Name', () => {
    cy.allure().description('Test adding pharmaceutical category with valid category name');
    cy.allure().severity('normal');
    // Fill all required fields with valid category name
    cy.get('input[name="pharm_cat_name"]').clear().type('Analgesics');
    cy.get('select[name="pharm_cat_vendor"]').select('Cosmos Pharmaceutical Limited');
    cy.window().then((win: any) => {
      win.CKEDITOR.instances.editor.setData('Most antipyretic medications have other purposes. The most common antipyretics in the United States are ibuprofen and aspirin with 1.');
    });
    
    cy.get('button[name="add_pharmaceutical_category"]').click();
    cy.wait(2000);
    
    // Valid case: Should show success dialog
    cy.get('body').then(($body) => {
      const hasSuccess = $body.find('.swal-title:contains("Success")').length > 0;
      
      if (hasSuccess) {
        cy.log('✅ PASS: Valid category name was accepted successfully');
        cy.contains('OK').click({force: true});
      } else {
        cy.log('❌ FAIL: Valid category name was rejected');
        throw new Error('Valid category name should have been accepted');
      }
    });
  });

  it('HM04_03: All required fields are filled with invalid data', () => {
    cy.allure().description('Test adding pharmaceutical category with all invalid fields');
    cy.allure().severity('normal');
    // Fill all required fields with invalid data
    cy.get('input[name="pharm_cat_name"]').clear().type('11111');
    cy.get('select[name="pharm_cat_vendor"]').select('Cosmos Pharmaceutical Limited');
    cy.window().then((win: any) => {
      win.CKEDITOR.instances.editor.setData(''); // Empty
    });
    
    cy.get('button[name="add_pharmaceutical_category"]').click();
    cy.wait(2000);
    
    // Invalid test case: Should NOT show success dialog
    cy.get('body').then(($body) => {
      const hasSuccess = $body.find('.swal-title:contains("Success")').length > 0;
      
      if (hasSuccess) {
        cy.log('❌ FAIL: Invalid data was accepted - validation failed');
        throw new Error('Invalid data was accepted when it should have been rejected');
      } else {
        cy.log('✅ PASS: Invalid data was properly rejected');
      }
    });
  });

  it('HM04_04: Invalid Pharmaceutical Category Name (numbers)', () => {
    cy.allure().description('Test adding pharmaceutical category with numeric category name');
    cy.allure().severity('normal');
    // Fill category name with invalid data (numbers), other fields with valid data
    cy.get('input[name="pharm_cat_name"]').clear().type('11111');
    cy.get('select[name="pharm_cat_vendor"]').select('Cosmos Pharmaceutical Limited');
    cy.window().then((win: any) => {
      win.CKEDITOR.instances.editor.setData('Most antipyretic medications have other purposes. The most common antipyretics in the United States are ibuprofen and aspirin with 1.');
    });
    
    cy.get('button[name="add_pharmaceutical_category"]').click();
    cy.wait(2000);
    
    // Invalid test case: Should NOT show success dialog
    cy.get('body').then(($body) => {
      const hasSuccess = $body.find('.swal-title:contains("Success")').length > 0;
      
      if (hasSuccess) {
        cy.log('❌ FAIL: Invalid category name (numbers) was accepted - validation failed');
        throw new Error('Invalid category name was accepted when it should have been rejected');
      } else {
        cy.log('✅ PASS: Invalid category name (numbers) was properly rejected');
      }
    });
  });

  it('HM04_05: Invalid Pharmaceutical Category Name (special characters)', () => {
    cy.allure().description('Test adding pharmaceutical category with special character category name');
    cy.allure().severity('normal');
    // Fill category name with invalid data (special characters), other fields with valid data
    cy.get('input[name="pharm_cat_name"]').clear().type('#$%^');
    cy.get('select[name="pharm_cat_vendor"]').select('Cosmos Pharmaceutical Limited');
    cy.window().then((win: any) => {
      win.CKEDITOR.instances.editor.setData('Most antipyretic medications have other purposes. The most common antipyretics in the United States are ibuprofen and aspirin with 1.');
    });
    
    cy.get('button[name="add_pharmaceutical_category"]').click();
    cy.wait(2000);
    
    // Invalid test case: Should NOT show success dialog
    cy.get('body').then(($body) => {
      const hasSuccess = $body.find('.swal-title:contains("Success")').length > 0;
      
      if (hasSuccess) {
        cy.log('❌ FAIL: Invalid category name (special chars) was accepted - validation failed');
        throw new Error('Invalid category name was accepted when it should have been rejected');
      } else {
        cy.log('✅ PASS: Invalid category name (special chars) was properly rejected');
      }
    });
  });

  it('HM04_06: Invalid Pharmaceutical Category Name (empty)', () => {
    cy.allure().description('Test adding pharmaceutical category with empty category name');
    cy.allure().severity('normal');
    // Fill category name with invalid data (empty), other fields with valid data
    cy.get('input[name="pharm_cat_name"]').clear();
    cy.get('select[name="pharm_cat_vendor"]').select('Cosmos Pharmaceutical Limited');
    cy.window().then((win: any) => {
      win.CKEDITOR.instances.editor.setData('Most antipyretic medications have other purposes. The most common antipyretics in the United States are ibuprofen and aspirin with 1.');
    });
    
    cy.get('button[name="add_pharmaceutical_category"]').click();
    cy.wait(2000);
    
    // Invalid test case: Should NOT show success dialog
    cy.get('body').then(($body) => {
      const hasSuccess = $body.find('.swal-title:contains("Success")').length > 0;
      
      if (hasSuccess) {
        cy.log('❌ FAIL: Invalid category name (empty) was accepted - validation failed');
        throw new Error('Invalid category name was accepted when it should have been rejected');
      } else {
        cy.log('✅ PASS: Invalid category name (empty) was properly rejected');
      }
    });
  });

  it('HM04_07: Valid Pharmaceutical Vendor', () => {
    cy.allure().description('Test adding pharmaceutical category with valid vendor');
    cy.allure().severity('normal');
    // Fill all fields with valid vendor
    cy.get('input[name="pharm_cat_name"]').clear().type('Analgesics');
    cy.get('select[name="pharm_cat_vendor"]').select('Cosmos Pharmaceutical Limited');
    cy.window().then((win: any) => {
      win.CKEDITOR.instances.editor.setData('Most antipyretic medications have other purposes. The most common antipyretics in the United States are ibuprofen and aspirin with 1.');
    });
    
    cy.get('button[name="add_pharmaceutical_category"]').click();
    cy.wait(2000);
    
    // Valid case: Should show success dialog
    cy.get('body').then(($body) => {
      const hasSuccess = $body.find('.swal-title:contains("Success")').length > 0;
      
      if (hasSuccess) {
        cy.log('✅ PASS: Valid vendor was accepted successfully');
        cy.contains('OK').click({force: true});
      } else {
        cy.log('❌ FAIL: Valid vendor was rejected');
        throw new Error('Valid vendor should have been accepted');
      }
    });
  });

  it('HM04_08: Valid Pharmaceutical Category Description', () => {
    cy.allure().description('Test adding pharmaceutical category with valid description');
    cy.allure().severity('normal');
    // Fill all fields with valid description
    cy.get('input[name="pharm_cat_name"]').clear().type('Analgesics');
    cy.get('select[name="pharm_cat_vendor"]').select('Cosmos Pharmaceutical Limited');
    cy.window().then((win: any) => {
      win.CKEDITOR.instances.editor.setData('Most antipyretic medications have other purposes. The most common antipyretics in the United States are ibuprofen and aspirin with 1.');
    });
    
    cy.get('button[name="add_pharmaceutical_category"]').click();
    cy.wait(2000);
    
    // Valid case: Should show success dialog
    cy.get('body').then(($body) => {
      const hasSuccess = $body.find('.swal-title:contains("Success")').length > 0;
      
      if (hasSuccess) {
        cy.log('✅ PASS: Valid description was accepted successfully');
        cy.contains('OK').click({force: true});
      } else {
        cy.log('❌ FAIL: Valid description was rejected');
        throw new Error('Valid description should have been accepted');
      }
    });
  });

  it('HM04_09: Invalid Pharmaceutical Category Description', () => {
    cy.allure().description('Test adding pharmaceutical category with empty description');
    cy.allure().severity('normal');
    // Fill all fields with invalid description (empty)
    cy.get('input[name="pharm_cat_name"]').clear().type('Analgesics');
    cy.get('select[name="pharm_cat_vendor"]').select('Cosmos Pharmaceutical Limited');
    cy.window().then((win: any) => {
      win.CKEDITOR.instances.editor.setData(''); // Empty
    });
    
    cy.get('button[name="add_pharmaceutical_category"]').click();
    cy.wait(2000);
    
    // Invalid test case: Should NOT show success dialog
    cy.get('body').then(($body) => {
      const hasSuccess = $body.find('.swal-title:contains("Success")').length > 0;
      
      if (hasSuccess) {
        cy.log('❌ FAIL: Invalid description was accepted - validation failed');
        throw new Error('Invalid description was accepted when it should have been rejected');
      } else {
        cy.log('✅ PASS: Invalid description was properly rejected');
      }
    });
  });
}); 
