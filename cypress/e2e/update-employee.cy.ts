describe('HM03: Update Employee Tests', () => {
  
  beforeEach(() => {
    cy.allure().epic('Hospital Management System');
    cy.allure().feature('Employee Management');
    cy.allure().story('Update Employee');
    // Visit the employee update page directly
    cy.visit('http://localhost/hospital-php/backend/admin/his_admin_update_single_employee.php?doc_number=5VIFT');
    cy.wait(1200);
  });

  it('HM03_01: All required fields are filled with valid data', () => {
    cy.allure().description('Test updating employee with all valid fields');
    cy.allure().severity('critical');
    // Fill all required fields with valid data
    cy.get('input[name="doc_fname"]').clear().type('John');
    cy.get('input[name="doc_lname"]').clear().type('Doe');
    cy.get('input[name="doc_email"]').clear().type('Admin123@mail.com');
    cy.get('input[name="doc_pwd"]').clear().type('Password@123');
    cy.get('input[name="doc_dpic"]').selectFile('cypress/fixtures/jackson.jpg', { force: true });
    
    cy.get('button[name="update_doc"]').click();
    cy.wait(1200);
    
    // Valid case: Should show success dialog
    cy.get('body').then(($body) => {
      const hasSuccess = $body.find('.swal-title:contains("Success")').length > 0;
      
      if (hasSuccess) {
        cy.log('✅ PASS: Valid data was accepted successfully');
      } else {
        cy.log('❌ FAIL: Valid data was rejected');
        throw new Error('Valid data should have been accepted');
      }
    });
  });

  it('HM03_02: All fields are filled with valid First Name', () => {
    cy.allure().description('Test updating employee with valid first name');
    cy.allure().severity('normal');
    // Fill all required fields with valid first name
    cy.get('input[name="doc_fname"]').clear().type('John');
    cy.get('input[name="doc_lname"]').clear().type('Doe');
    cy.get('input[name="doc_email"]').clear().type('Admin123@mail.com');
    cy.get('input[name="doc_pwd"]').clear().type('Password@123');
    cy.get('input[name="doc_dpic"]').selectFile('cypress/fixtures/jackson.jpg', { force: true });
    
    cy.get('button[name="update_doc"]').click();
    cy.wait(1200);
    
    // Valid case: Should show success dialog
    cy.get('body').then(($body) => {
      const hasSuccess = $body.find('.swal-title:contains("Success")').length > 0;
      
      if (hasSuccess) {
        cy.log('✅ PASS: Valid first name was accepted successfully');
      } else {
        cy.log('❌ FAIL: Valid first name was rejected');
        throw new Error('Valid first name should have been accepted');
      }
    });
  });

  it('HM03_03: All required fields are filled with invalid data', () => {
    cy.allure().description('Test updating employee with all invalid fields');
    cy.allure().severity('normal');
    // Fill all required fields with invalid data
    cy.get('input[name="doc_fname"]').clear().type('1111');
    cy.get('input[name="doc_lname"]').clear().type('11111');
    cy.get('input[name="doc_email"]').clear().type('Admin');
    cy.get('input[name="doc_pwd"]').clear().type('12345');
    cy.get('input[name="doc_dpic"]').selectFile('cypress/fixtures/jackson.txt', { force: true });
    
    cy.get('button[name="update_doc"]').click();
    cy.wait(1200);
    
    // Invalid test case: Should NOT show success dialog
    cy.get('body').then(($body) => {
      const hasSuccess = $body.find('.swal-title:contains("Success")').length > 0;
      
      if (hasSuccess) {
        cy.log('❌ TEST RESULT: FAIL - Application validation is broken! Invalid data was accepted.');
        cy.log('🐛 BUG FOUND: The application should have rejected this invalid data but showed success instead.');
        throw new Error('VALIDATION BUG: Invalid data was accepted when it should have been rejected');
      } else {
        cy.log('✅ TEST RESULT: PASS - Application correctly rejected invalid data.');
        cy.log('✅ VALIDATION WORKING: No success dialog appeared, which is correct for invalid data.');
      }
    });
  });

  it('HM03_04: All fields are filled with invalid First Name (numbers)', () => {
    cy.allure().description('Test updating employee with numeric first name');
    cy.allure().severity('normal');
    // Fill first name with invalid data (numbers), other fields with valid data
    cy.get('input[name="doc_fname"]').clear().type('11111');
    cy.get('input[name="doc_lname"]').clear().type('Doe');
    cy.get('input[name="doc_email"]').clear().type('Admin123@mail.com');
    cy.get('input[name="doc_pwd"]').clear().type('Password@123');
    cy.get('input[name="doc_dpic"]').selectFile('cypress/fixtures/jackson.jpg', { force: true });
    
    cy.get('button[name="update_doc"]').click();
    cy.wait(1200);
    
    // Invalid test case: Should NOT show success dialog
    cy.get('body').then(($body) => {
      const hasSuccess = $body.find('.swal-title:contains("Success")').length > 0;
      
      if (hasSuccess) {
        cy.log('❌ FAIL: Invalid first name (numbers) was accepted - validation failed');
        throw new Error('Invalid first name was accepted when it should have been rejected');
      } else {
        cy.log('✅ PASS: Invalid first name (numbers) was properly rejected');
      }
    });
  });

  it('HM03_05: All fields are filled with invalid First Name (special characters)', () => {
    cy.allure().description('Test updating employee with special character first name');
    cy.allure().severity('normal');
    // Fill first name with invalid data (special characters), other fields with valid data
    cy.get('input[name="doc_fname"]').clear().type('#$%^');
    cy.get('input[name="doc_lname"]').clear().type('Doe');
    cy.get('input[name="doc_email"]').clear().type('Admin123@mail.com');
    cy.get('input[name="doc_pwd"]').clear().type('Password@123');
    cy.get('input[name="doc_dpic"]').selectFile('cypress/fixtures/jackson.jpg', { force: true });
    
    cy.get('button[name="update_doc"]').click();
    cy.wait(1200);
    
    // Invalid test case: Should NOT show success dialog
    cy.get('body').then(($body) => {
      const hasSuccess = $body.find('.swal-title:contains("Success")').length > 0;
      
      if (hasSuccess) {
        cy.log('❌ FAIL: Invalid first name (special chars) was accepted - validation failed');
        throw new Error('Invalid first name was accepted when it should have been rejected');
      } else {
        cy.log('✅ PASS: Invalid first name (special chars) was properly rejected');
      }
    });
  });

  it('HM03_06: All fields are filled with invalid First Name (empty)', () => {
    cy.allure().description('Test updating employee with empty first name');
    cy.allure().severity('normal');
    // Fill first name with invalid data (empty), other fields with valid data
    cy.get('input[name="doc_fname"]').clear();
    cy.get('input[name="doc_lname"]').clear().type('Doe');
    cy.get('input[name="doc_email"]').clear().type('Admin123@mail.com');
    cy.get('input[name="doc_pwd"]').clear().type('Password@123');
    cy.get('input[name="doc_dpic"]').selectFile('cypress/fixtures/jackson.jpg', { force: true });
    
    cy.get('button[name="update_doc"]').click();
    cy.wait(1200);
    
    // Invalid test case: Should NOT show success dialog
    cy.get('body').then(($body) => {
      const hasSuccess = $body.find('.swal-title:contains("Success")').length > 0;
      
      if (hasSuccess) {
        cy.log('❌ FAIL: Invalid first name (empty) was accepted - validation failed');
        throw new Error('Invalid first name was accepted when it should have been rejected');
      } else {
        cy.log('✅ PASS: Invalid first name (empty) was properly rejected');
      }
    });
  });

  it('HM03_07: All fields are filled with valid Last Name', () => {
    cy.allure().description('Test updating employee with valid last name');
    cy.allure().severity('normal');
    // Fill all fields with valid last name
    cy.get('input[name="doc_fname"]').clear().type('John');
    cy.get('input[name="doc_lname"]').clear().type('Doe');
    cy.get('input[name="doc_email"]').clear().type('Admin123@mail.com');
    cy.get('input[name="doc_pwd"]').clear().type('Password@123');
    cy.get('input[name="doc_dpic"]').selectFile('cypress/fixtures/jackson.jpg', { force: true });
    
    cy.get('button[name="update_doc"]').click();
    cy.wait(1200);
    
    // Valid case: Should show success dialog
    cy.get('body').then(($body) => {
      const hasSuccess = $body.find('.swal-title:contains("Success")').length > 0;
      
      if (hasSuccess) {
        cy.log('✅ PASS: Valid last name was accepted successfully');
      } else {
        cy.log('❌ FAIL: Valid last name was rejected');
        throw new Error('Valid last name should have been accepted');
      }
    });
  });

  it('HM03_08: All fields are filled with invalid Last Name (numbers)', () => {
    cy.allure().description('Test updating employee with numeric last name');
    cy.allure().severity('normal');
    // Fill last name with invalid data (numbers), other fields with valid data
    cy.get('input[name="doc_fname"]').clear().type('John');
    cy.get('input[name="doc_lname"]').clear().type('11111');
    cy.get('input[name="doc_email"]').clear().type('Admin123@mail.com');
    cy.get('input[name="doc_pwd"]').clear().type('Password@123');
    cy.get('input[name="doc_dpic"]').selectFile('cypress/fixtures/jackson.jpg', { force: true });
    
    cy.get('button[name="update_doc"]').click();
    cy.wait(1200);
    
    // Invalid test case: Should NOT show success dialog
    cy.get('body').then(($body) => {
      const hasSuccess = $body.find('.swal-title:contains("Success")').length > 0;
      
      if (hasSuccess) {
        cy.log('❌ FAIL: Invalid last name (numbers) was accepted - validation failed');
        throw new Error('Invalid last name was accepted when it should have been rejected');
      } else {
        cy.log('✅ PASS: Invalid last name (numbers) was properly rejected');
      }
    });
  });

  it('HM03_09: All fields are filled with invalid Last Name (special characters)', () => {
    // Fill last name with invalid data (special characters), other fields with valid data
    cy.get('input[name="doc_fname"]').clear().type('John');
    cy.get('input[name="doc_lname"]').clear().type('#$%^');
    cy.get('input[name="doc_email"]').clear().type('Admin123@mail.com');
    cy.get('input[name="doc_pwd"]').clear().type('Password@123');
    cy.get('input[name="doc_dpic"]').selectFile('cypress/fixtures/jackson.jpg', { force: true });
    
    cy.get('button[name="update_doc"]').click();
    cy.wait(1200);
    
    // Invalid test case: Should NOT show success dialog
    cy.get('body').then(($body) => {
      const hasSuccess = $body.find('.swal-title:contains("Success")').length > 0;
      
      if (hasSuccess) {
        cy.log('❌ FAIL: Invalid last name (special chars) was accepted - validation failed');
        throw new Error('Invalid last name was accepted when it should have been rejected');
      } else {
        cy.log('✅ PASS: Invalid last name (special chars) was properly rejected');
      }
    });
  });

  it('HM03_10: All fields are filled with invalid Last Name (empty)', () => {
    // Fill last name with invalid data (empty), other fields with valid data
    cy.get('input[name="doc_fname"]').clear().type('John');
    cy.get('input[name="doc_lname"]').clear();
    cy.get('input[name="doc_email"]').clear().type('Admin123@mail.com');
    cy.get('input[name="doc_pwd"]').clear().type('Password@123');
    cy.get('input[name="doc_dpic"]').selectFile('cypress/fixtures/jackson.jpg', { force: true });
    
    cy.get('button[name="update_doc"]').click();
    cy.wait(1200);
    
    // Invalid test case: Should NOT show success dialog
    cy.get('body').then(($body) => {
      const hasSuccess = $body.find('.swal-title:contains("Success")').length > 0;
      
      if (hasSuccess) {
        cy.log('❌ FAIL: Invalid last name (empty) was accepted - validation failed');
        throw new Error('Invalid last name was accepted when it should have been rejected');
      } else {
        cy.log('✅ PASS: Invalid last name (empty) was properly rejected');
      }
    });
  });

  it('HM03_11: All fields are filled with valid Email', () => {
    // Fill all fields with valid email
    cy.get('input[name="doc_fname"]').clear().type('John');
    cy.get('input[name="doc_lname"]').clear().type('Doe');
    cy.get('input[name="doc_email"]').clear().type('Admin123@mail.com');
    cy.get('input[name="doc_pwd"]').clear().type('Password@123');
    cy.get('input[name="doc_dpic"]').selectFile('cypress/fixtures/jackson.jpg', { force: true });
    
    cy.get('button[name="update_doc"]').click();
    cy.wait(1200);
    
    // Valid case: Should show success dialog
    cy.get('body').then(($body) => {
      const hasSuccess = $body.find('.swal-title:contains("Success")').length > 0;
      
      if (hasSuccess) {
        cy.log('✅ PASS: Valid email was accepted successfully');
      } else {
        cy.log('❌ FAIL: Valid email was rejected');
        throw new Error('Valid email should have been accepted');
      }
    });
  });

  it('HM03_12: All fields are filled with invalid Email (missing domain)', () => {
    // Fill email with invalid data (missing domain), other fields with valid data
    cy.get('input[name="doc_fname"]').clear().type('John');
    cy.get('input[name="doc_lname"]').clear().type('Doe');
    cy.get('input[name="doc_email"]').clear().type('Admin');
    cy.get('input[name="doc_pwd"]').clear().type('Password@123');
    cy.get('input[name="doc_dpic"]').selectFile('cypress/fixtures/jackson.jpg', { force: true });
    
    cy.get('button[name="update_doc"]').click();
    cy.wait(1200);
    
    // Invalid test case: Should NOT show success dialog
    cy.get('body').then(($body) => {
      const hasSuccess = $body.find('.swal-title:contains("Success")').length > 0;
      
      if (hasSuccess) {
        cy.log('❌ FAIL: Invalid email "Admin" (missing @ and domain) was accepted - validation failed');
        throw new Error('Invalid email "Admin" was accepted when it should have been rejected');
      } else {
        cy.log('✅ PASS: Invalid email "Admin" (missing @ and domain) was properly rejected');
      }
    });
  });

  it('HM03_13: All fields are filled with invalid Email (missing username)', () => {
    // Fill email with invalid data (missing username), other fields with valid data
    cy.get('input[name="doc_fname"]').clear().type('John');
    cy.get('input[name="doc_lname"]').clear().type('Doe');
    cy.get('input[name="doc_email"]').clear().type('@gmail.com');
    cy.get('input[name="doc_pwd"]').clear().type('Password@123');
    cy.get('input[name="doc_dpic"]').selectFile('cypress/fixtures/jackson.jpg', { force: true });
    
    cy.get('button[name="update_doc"]').click();
    cy.wait(1200);
    
    // Invalid test case: Should NOT show success dialog
    cy.get('body').then(($body) => {
      const hasSuccess = $body.find('.swal-title:contains("Success")').length > 0;
      
      if (hasSuccess) {
        cy.log('❌ FAIL: Invalid email "@gmail.com" (missing username) was accepted - validation failed');
        throw new Error('Invalid email "@gmail.com" was accepted when it should have been rejected');
      } else {
        cy.log('✅ PASS: Invalid email "@gmail.com" (missing username) was properly rejected');
      }
    });
  });

  it('HM03_14: All fields are filled with invalid Email (empty)', () => {
    // Fill email with invalid data (empty), other fields with valid data
    cy.get('input[name="doc_fname"]').clear().type('John');
    cy.get('input[name="doc_lname"]').clear().type('Doe');
    cy.get('input[name="doc_email"]').clear(); // Leave email empty
    cy.get('input[name="doc_pwd"]').clear().type('Password@123');
    cy.get('input[name="doc_dpic"]').selectFile('cypress/fixtures/jackson.jpg', { force: true });
    
    cy.get('button[name="update_doc"]').click();
    cy.wait(1200);
    
    // Invalid test case: Should NOT show success dialog
    cy.get('body').then(($body) => {
      const hasSuccess = $body.find('.swal-title:contains("Success")').length > 0;
      
      if (hasSuccess) {
        cy.log('❌ FAIL: Empty email field was accepted - validation failed');
        throw new Error('Empty email field was accepted when it should have been rejected');
      } else {
        cy.log('✅ PASS: Empty email field was properly rejected');
      }
    });
  });

  it('HM03_15: All fields are filled with valid Password', () => {
    // Fill all fields with valid password
    cy.get('input[name="doc_fname"]').clear().type('John');
    cy.get('input[name="doc_lname"]').clear().type('Doe');
    cy.get('input[name="doc_email"]').clear().type('Admin123@mail.com');
    cy.get('input[name="doc_pwd"]').clear().type('Password@123');
    cy.get('input[name="doc_dpic"]').selectFile('cypress/fixtures/jackson.jpg', { force: true });
    
    cy.get('button[name="update_doc"]').click();
    cy.wait(1200);
    
    // Valid case: Should show success dialog
    cy.get('body').then(($body) => {
      const hasSuccess = $body.find('.swal-title:contains("Success")').length > 0;
      
      if (hasSuccess) {
        cy.log('✅ PASS: Valid password was accepted successfully');
      } else {
        cy.log('❌ FAIL: Valid password was rejected');
        throw new Error('Valid password should have been accepted');
      }
    });
  });

  it('HM03_16: All fields are filled with invalid Password (empty)', () => {
    // Fill password with invalid data (empty), other fields with valid data
    cy.get('input[name="doc_fname"]').clear().type('John');
    cy.get('input[name="doc_lname"]').clear().type('Doe');
    cy.get('input[name="doc_email"]').clear().type('Admin123@mail.com');
    cy.get('input[name="doc_pwd"]').clear();
    cy.get('input[name="doc_dpic"]').selectFile('cypress/fixtures/jackson.jpg', { force: true });
    
    cy.get('button[name="update_doc"]').click();
    cy.wait(1200);
    
    // Invalid test case: Should NOT show success dialog
    cy.get('body').then(($body) => {
      const hasSuccess = $body.find('.swal-title:contains("Success")').length > 0;
      
      if (hasSuccess) {
        cy.log('❌ FAIL: Invalid password (empty) was accepted - validation failed');
        throw new Error('Invalid password was accepted when it should have been rejected');
      } else {
        cy.log('✅ PASS: Invalid password (empty) was properly rejected');
      }
    });
  });

  it('HM03_17: All fields are filled with invalid Password (too simple)', () => {
    // Fill password with invalid data (too simple), other fields with valid data
    cy.get('input[name="doc_fname"]').clear().type('John');
    cy.get('input[name="doc_lname"]').clear().type('Doe');
    cy.get('input[name="doc_email"]').clear().type('Admin123@mail.com');
    cy.get('input[name="doc_pwd"]').clear().type('simple');
    cy.get('input[name="doc_dpic"]').selectFile('cypress/fixtures/jackson.jpg', { force: true });
    
    cy.get('button[name="update_doc"]').click();
    cy.wait(1200);
    
    // Invalid test case: Should NOT show success dialog
    cy.get('body').then(($body) => {
      const hasSuccess = $body.find('.swal-title:contains("Success")').length > 0;
      
      if (hasSuccess) {
        cy.log('❌ FAIL: Invalid password (too simple) was accepted - validation failed');
        throw new Error('Invalid password was accepted when it should have been rejected');
      } else {
        cy.log('✅ PASS: Invalid password (too simple) was properly rejected');
      }
    });
  });

  it('HM03_18: All fields are filled with invalid Password (numbers only)', () => {
    // Fill password with invalid data (numbers only), other fields with valid data
    cy.get('input[name="doc_fname"]').clear().type('John');
    cy.get('input[name="doc_lname"]').clear().type('Doe');
    cy.get('input[name="doc_email"]').clear().type('Admin123@mail.com');
    cy.get('input[name="doc_pwd"]').clear().type('123456789');
    cy.get('input[name="doc_dpic"]').selectFile('cypress/fixtures/jackson.jpg', { force: true });
    
    cy.get('button[name="update_doc"]').click();
    cy.wait(1200);
    
    // Invalid test case: Should NOT show success dialog
    cy.get('body').then(($body) => {
      const hasSuccess = $body.find('.swal-title:contains("Success")').length > 0;
      
      if (hasSuccess) {
        cy.log('❌ FAIL: Invalid password (numbers only) was accepted - validation failed');
        throw new Error('Invalid password was accepted when it should have been rejected');
      } else {
        cy.log('✅ PASS: Invalid password (numbers only) was properly rejected');
      }
    });
  });

  it('HM03_19: All fields are filled with invalid Password (no special characters)', () => {
    // Fill password with invalid data (no special characters), other fields with valid data
    cy.get('input[name="doc_fname"]').clear().type('John');
    cy.get('input[name="doc_lname"]').clear().type('Doe');
    cy.get('input[name="doc_email"]').clear().type('Admin123@mail.com');
    cy.get('input[name="doc_pwd"]').clear().type('Password123');
    cy.get('input[name="doc_dpic"]').selectFile('cypress/fixtures/jackson.jpg', { force: true });
    
    cy.get('button[name="update_doc"]').click();
    cy.wait(1200);
    
    // Invalid test case: Should NOT show success dialog
    cy.get('body').then(($body) => {
      const hasSuccess = $body.find('.swal-title:contains("Success")').length > 0;
      
      if (hasSuccess) {
        cy.log('❌ FAIL: Invalid password (no special chars) was accepted - validation failed');
        throw new Error('Invalid password was accepted when it should have been rejected');
      } else {
        cy.log('✅ PASS: Invalid password (no special chars) was properly rejected');
      }
    });
  });

  it('HM03_20: All fields are filled with valid File Type (jpg)', () => {
    // Fill all fields with valid file type (jpg)
    cy.get('input[name="doc_fname"]').clear().type('John');
    cy.get('input[name="doc_lname"]').clear().type('Doe');
    cy.get('input[name="doc_email"]').clear().type('Admin123@mail.com');
    cy.get('input[name="doc_pwd"]').clear().type('Password@123');
    cy.get('input[name="doc_dpic"]').selectFile('cypress/fixtures/jackson.jpg', { force: true });
    
    cy.get('button[name="update_doc"]').click();
    cy.wait(1200);
    
    // Valid case: Should show success dialog
    cy.get('body').then(($body) => {
      const hasSuccess = $body.find('.swal-title:contains("Success")').length > 0;
      
      if (hasSuccess) {
        cy.log('✅ PASS: Valid file type (jpg) was accepted successfully');
      } else {
        cy.log('❌ FAIL: Valid file type (jpg) was rejected');
        throw new Error('Valid file type should have been accepted');
      }
    });
  });

  it('HM03_21: All fields are filled with valid File Type (png)', () => {
    // Fill all fields with valid file type (png)
    cy.get('input[name="doc_fname"]').clear().type('John');
    cy.get('input[name="doc_lname"]').clear().type('Doe');
    cy.get('input[name="doc_email"]').clear().type('Admin123@mail.com');
    cy.get('input[name="doc_pwd"]').clear().type('Password@123');
    cy.get('input[name="doc_dpic"]').selectFile('cypress/fixtures/jackson.png', { force: true });
    
    cy.get('button[name="update_doc"]').click();
    cy.wait(1200);
    
    // Valid case: Should show success dialog
    cy.get('body').then(($body) => {
      const hasSuccess = $body.find('.swal-title:contains("Success")').length > 0;
      
      if (hasSuccess) {
        cy.log('✅ PASS: Valid file type (png) was accepted successfully');
      } else {
        cy.log('❌ FAIL: Valid file type (png) was rejected');
        throw new Error('Valid file type should have been accepted');
      }
    });
  });

  it('HM03_22: All fields are filled with valid File Type (jpeg)', () => {
    // Fill all fields with valid file type (jpeg)
    cy.get('input[name="doc_fname"]').clear().type('John');
    cy.get('input[name="doc_lname"]').clear().type('Doe');
    cy.get('input[name="doc_email"]').clear().type('Admin123@mail.com');
    cy.get('input[name="doc_pwd"]').clear().type('Password@123');
    cy.get('input[name="doc_dpic"]').selectFile('cypress/fixtures/jackson.jpeg', { force: true });
    
    cy.get('button[name="update_doc"]').click();
    cy.wait(1200);
    
    // Valid case: Should show success dialog
    cy.get('body').then(($body) => {
      const hasSuccess = $body.find('.swal-title:contains("Success")').length > 0;
      
      if (hasSuccess) {
        cy.log('✅ PASS: Valid file type (jpeg) was accepted successfully');
      } else {
        cy.log('❌ FAIL: Valid file type (jpeg) was rejected');
        throw new Error('Valid file type should have been accepted');
      }
    });
  });

  it('HM03_23: All fields are filled with invalid File Type (txt)', () => {
    // Fill file with invalid type (txt), other fields with valid data
    cy.get('input[name="doc_fname"]').clear().type('John');
    cy.get('input[name="doc_lname"]').clear().type('Doe');
    cy.get('input[name="doc_email"]').clear().type('Admin123@mail.com');
    cy.get('input[name="doc_pwd"]').clear().type('Password@123');
    cy.get('input[name="doc_dpic"]').selectFile('cypress/fixtures/jackson.txt', { force: true });
    
    cy.get('button[name="update_doc"]').click();
    cy.wait(1200);
    
    // Invalid test case: Should NOT show success dialog
    cy.get('body').then(($body) => {
      const hasSuccess = $body.find('.swal-title:contains("Success")').length > 0;
      
      if (hasSuccess) {
        cy.log('❌ FAIL: Invalid file type (txt) was accepted - validation failed');
        throw new Error('Invalid file type was accepted when it should have been rejected');
      } else {
        cy.log('✅ PASS: Invalid file type (txt) was properly rejected');
      }
    });
  });

  it('HM03_24: All fields are filled with invalid File Type (pdf)', () => {
    // Fill file with invalid type (pdf), other fields with valid data
    cy.get('input[name="doc_fname"]').clear().type('John');
    cy.get('input[name="doc_lname"]').clear().type('Doe');
    cy.get('input[name="doc_email"]').clear().type('Admin123@mail.com');
    cy.get('input[name="doc_pwd"]').clear().type('Password@123');
    cy.get('input[name="doc_dpic"]').selectFile('cypress/fixtures/jackson.pdf', { force: true });
    
    cy.get('button[name="update_doc"]').click();
    cy.wait(1200);
    
    // Invalid test case: Should NOT show success dialog
    cy.get('body').then(($body) => {
      const hasSuccess = $body.find('.swal-title:contains("Success")').length > 0;
      
      if (hasSuccess) {
        cy.log('❌ FAIL: Invalid file type (pdf) was accepted - validation failed');
        throw new Error('Invalid file type was accepted when it should have been rejected');
      } else {
        cy.log('✅ PASS: Invalid file type (pdf) was properly rejected');
      }
    });
  });

  it('HM03_25: All fields are filled with invalid File Type (doc)', () => {
    // Fill file with invalid type (doc), other fields with valid data
    cy.get('input[name="doc_fname"]').clear().type('John');
    cy.get('input[name="doc_lname"]').clear().type('Doe');
    cy.get('input[name="doc_email"]').clear().type('Admin123@mail.com');
    cy.get('input[name="doc_pwd"]').clear().type('Password@123');
    cy.get('input[name="doc_dpic"]').selectFile('cypress/fixtures/jackson.doc', { force: true });
    
    cy.get('button[name="update_doc"]').click();
    cy.wait(1200);
    
    // Invalid test case: Should NOT show success dialog
    cy.get('body').then(($body) => {
      const hasSuccess = $body.find('.swal-title:contains("Success")').length > 0;
      
      if (hasSuccess) {
        cy.log('❌ FAIL: Invalid file type (doc) was accepted - validation failed');
        throw new Error('Invalid file type was accepted when it should have been rejected');
      } else {
        cy.log('✅ PASS: Invalid file type (doc) was properly rejected');
      }
    });
  });

});
  
