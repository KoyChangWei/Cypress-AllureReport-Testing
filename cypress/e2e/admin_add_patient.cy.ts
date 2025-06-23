/// <reference types="cypress" />

describe('HM02 :Admin Add Patient Tests', () => {
  const url = 'http://localhost/hospital-php/backend/admin/his_admin_register_patient.php';

  beforeEach(() => {
    cy.visit(url);
  });

  it('HM02_01: All required fields are filled (valid data)', () => {
    cy.get('input[name="pat_fname"]').type('John');
    cy.get('input[name="pat_lname"]').type('Doe');
    cy.get('input[name="pat_dob"]').type('27/03/1998');
    cy.get('input[name="pat_age"]').type('35');
    cy.get('input[name="pat_addr"]').type('Lot 167 Tmn Sri');
    cy.get('input[name="pat_phone"]').type('01023498237');
    cy.get('input[name="pat_ailment"]').type('Demo');
    cy.get('select[name="pat_type"]').select('InPatient');
    cy.get('button[name="add_patient"]').click();
    cy.contains(/SUCCESS/i, { timeout: 5000 }).should('be.visible');
  });

  it('HM02_02: All fields filled with valid First Name', () => {
    cy.get('input[name="pat_fname"]').type('John');
    cy.get('input[name="pat_lname"]').type('Doe');
    cy.get('input[name="pat_dob"]').type('27/03/1998');
    cy.get('input[name="pat_age"]').type('35');
    cy.get('input[name="pat_addr"]').type('Lot 167 Tmn Sri');
    cy.get('input[name="pat_phone"]').type('01023498237');
    cy.get('input[name="pat_ailment"]').type('Demo');
    cy.get('select[name="pat_type"]').select('InPatient');
    cy.get('button[name="add_patient"]').click();
    cy.contains(/SUCCESS/i, { timeout: 5000 }).should('be.visible');
  });

  it('HM02_03: Invalid First Name with special characters', () => {
    cy.get('input[name="pat_fname"]').clear().type('@@@@@@@');
    cy.get('input[name="pat_lname"]').type('Doe');
    cy.get('input[name="pat_dob"]').type('27/03/1998');
    cy.get('input[name="pat_age"]').type('35');
    cy.get('input[name="pat_addr"]').type('Lot 167 Tmn Sri');
    cy.get('input[name="pat_phone"]').type('01023498237');
    cy.get('input[name="pat_ailment"]').type('Demo');
    cy.get('select[name="pat_type"]').select('InPatient');
    cy.get('button[name="add_patient"]').click();
    cy.contains(/FAILED/i, { timeout: 5000 }).should('be.visible');
  });

  it('HM02_04: Invalid First Name with empty string', () => {
    cy.get('input[name="pat_fname"]').clear();
    cy.get('input[name="pat_lname"]').type('Doe');
    cy.get('input[name="pat_dob"]').type('27/03/1998');
    cy.get('input[name="pat_age"]').type('35');
    cy.get('input[name="pat_addr"]').type('Lot 167 Tmn Sri');
    cy.get('input[name="pat_phone"]').type('01023498237');
    cy.get('input[name="pat_ailment"]').type('Demo');
    cy.get('select[name="pat_type"]').select('InPatient');
    cy.get('button[name="add_patient"]').click();
    cy.get('button[name="add_patient"]').then($btn => {
      // Try to click and catch the validation message
      $btn[0].click()
      cy.get('input[name="pat_fname"]').then($input => {
        // Cast to HTMLInputElement to access validity and validationMessage
        const inputElem = $input[0] as HTMLInputElement;
        const validity = inputElem.validity;
        const validationMessage = inputElem.validationMessage;
        expect(validity.valid).to.be.false;
        expect(validationMessage).to.contain("Please fill out this field.");
      })
    })
  });

  it('HM02_05: Invalid First Name with numbers', () => {
    cy.get('input[name="pat_fname"]').clear().type('12345677');
    cy.get('input[name="pat_lname"]').type('Doe');
    cy.get('input[name="pat_dob"]').type('27/03/1998');
    cy.get('input[name="pat_age"]').type('35');
    cy.get('input[name="pat_addr"]').type('Lot 167 Tmn Sri');
    cy.get('input[name="pat_phone"]').type('01023498237');
    cy.get('input[name="pat_ailment"]').type('Demo');
    cy.get('select[name="pat_type"]').select('InPatient');
    cy.get('button[name="add_patient"]').click();
    cy.contains(/FAILED/i, { timeout: 5000 }).should('be.visible');
  });

  it('HM02_06: Invalid First Name with symbols', () => {
    cy.get('input[name="pat_fname"]').clear().type(':::::::::><>>');
    cy.get('input[name="pat_lname"]').type('Doe');
    cy.get('input[name="pat_dob"]').type('27/03/1998');
    cy.get('input[name="pat_age"]').type('35');
    cy.get('input[name="pat_addr"]').type('Lot 167 Tmn Sri');
    cy.get('input[name="pat_phone"]').type('01023498237');
    cy.get('input[name="pat_ailment"]').type('Demo');
    cy.get('select[name="pat_type"]').select('InPatient');
    cy.get('button[name="add_patient"]').click();
    cy.contains(/FAILED/i, { timeout: 5000 }).should('be.visible');
  });

  it('HM02_07: All fields filled with valid Last Name', () => {
    cy.get('input[name="pat_fname"]').type('John');
    cy.get('input[name="pat_lname"]').type('Doe');
    cy.get('input[name="pat_dob"]').type('27/03/1998');
    cy.get('input[name="pat_age"]').type('35');
    cy.get('input[name="pat_addr"]').type('Lot 167 Tmn Sri');
    cy.get('input[name="pat_phone"]').type('01023498237');
    cy.get('input[name="pat_ailment"]').type('Demo');
    cy.get('select[name="pat_type"]').select('InPatient');
    cy.get('button[name="add_patient"]').click();
    cy.contains(/SUCCESS/i, { timeout: 5000 }).should('be.visible');
  });

  it('HM02_08: Invalid Last Name with special characters', () => {
    cy.get('input[name="pat_fname"]').type('John');
    cy.get('input[name="pat_lname"]').clear().type('@@@@@@');
    cy.get('input[name="pat_dob"]').type('27/03/1998');
    cy.get('input[name="pat_age"]').type('35');
    cy.get('input[name="pat_addr"]').type('Lot 167 Tmn Sri');
    cy.get('input[name="pat_phone"]').type('01023498237');
    cy.get('input[name="pat_ailment"]').type('Demo');
    cy.get('select[name="pat_type"]').select('InPatient');
    cy.get('button[name="add_patient"]').click();
    cy.contains(/FAILED/i, { timeout: 5000 }).should('be.visible');
  });

  it('HM02_09: Invalid Last Name with empty string', () => {
    cy.get('input[name="pat_fname"]').type('John');
    cy.get('input[name="pat_lname"]').clear();
    cy.get('input[name="pat_dob"]').type('27/03/1998');
    cy.get('input[name="pat_age"]').type('35');
    cy.get('input[name="pat_addr"]').type('Lot 167 Tmn Sri');
    cy.get('input[name="pat_phone"]').type('01023498237');
    cy.get('input[name="pat_ailment"]').type('Demo');
    cy.get('select[name="pat_type"]').select('InPatient');
    cy.get('button[name="add_patient"]').then($btn => {
      // Try to click and catch the validation message
      $btn[0].click()
      cy.get('input[name="pat_lname"]').then($input => {
        // Cast to HTMLInputElement to access validity and validationMessage
        const inputElem = $input[0] as HTMLInputElement;
        const validity = inputElem.validity;
        const validationMessage = inputElem.validationMessage;
        expect(validity.valid).to.be.false;
        expect(validationMessage).to.contain("Please fill out this field.");
      })
    })
  });

  it('HM02_10: Invalid Last Name with numbers', () => {
    cy.get('input[name="pat_fname"]').type('John');
    cy.get('input[name="pat_lname"]').clear().type('12345677');
    cy.get('input[name="pat_dob"]').type('27/03/1998');
    cy.get('input[name="pat_age"]').type('35');
    cy.get('input[name="pat_addr"]').type('Lot 167 Tmn Sri');
    cy.get('input[name="pat_phone"]').type('01023498237');
    cy.get('input[name="pat_ailment"]').type('Demo');
    cy.get('select[name="pat_type"]').select('InPatient');
    cy.get('button[name="add_patient"]').click();
    cy.contains(/FAILED/i, { timeout: 5000 }).should('be.visible');
  });

  it('HM03_11: Invalid Last Name with symbols', () => {
    cy.get('input[name="pat_fname"]').type('John');
    cy.get('input[name="pat_lname"]').clear().type(':::::::::><>>');
    cy.get('input[name="pat_dob"]').type('27/03/1998');
    cy.get('input[name="pat_age"]').type('35');
    cy.get('input[name="pat_addr"]').type('Lot 167 Tmn Sri');
    cy.get('input[name="pat_phone"]').type('01023498237');
    cy.get('input[name="pat_ailment"]').type('Demo');
    cy.get('select[name="pat_type"]').select('InPatient');
    cy.get('button[name="add_patient"]').click();
    cy.contains(/FAILED/i, { timeout: 5000 }).should('be.visible');
  });

  it('HM02_12: All fields filled with valid Date of Birth', () => {
    cy.get('input[name="pat_fname"]').type('John');
    cy.get('input[name="pat_lname"]').type('Doe');
    cy.get('input[name="pat_dob"]').type('27/03/1998');
    cy.get('input[name="pat_age"]').type('35');
    cy.get('input[name="pat_addr"]').type('Lot 167 Tmn Sri');
    cy.get('input[name="pat_phone"]').type('01023498237');
    cy.get('input[name="pat_ailment"]').type('Demo');
    cy.get('select[name="pat_type"]').select('InPatient');
    cy.get('button[name="add_patient"]').click();
    cy.contains(/SUCCESS/i, { timeout: 5000 }).should('be.visible');
  });

  it('HM02_13: Invalid Date of Birth with special characters', () => {
    cy.get('input[name="pat_fname"]').type('John');
    cy.get('input[name="pat_lname"]').type('Doe');
    cy.get('input[name="pat_dob"]').type('@/03/1998');
    cy.get('input[name="pat_age"]').type('35');
    cy.get('input[name="pat_addr"]').type('Lot 167 Tmn Sri');
    cy.get('input[name="pat_phone"]').type('01023498237');
    cy.get('input[name="pat_ailment"]').type('Demo');
    cy.get('select[name="pat_type"]').select('InPatient');
    cy.get('button[name="add_patient"]').click();
    cy.contains(/FAILED/i, { timeout: 5000 }).should('be.visible');
  });

  it('HM02_14: Invalid Date of Birth with asterisks', () => {
    cy.get('input[name="pat_fname"]').type('John');
    cy.get('input[name="pat_lname"]').type('Doe');
    cy.get('input[name="pat_dob"]').type('********');
    cy.get('input[name="pat_age"]').type('35');
    cy.get('input[name="pat_addr"]').type('Lot 167 Tmn Sri');
    cy.get('input[name="pat_phone"]').type('01023498237');
    cy.get('input[name="pat_ailment"]').type('Demo');
    cy.get('select[name="pat_type"]').select('InPatient');
    cy.get('button[name="add_patient"]').click();
    cy.contains(/FAILED/i, { timeout: 5000 }).should('be.visible');
  });

  it('HM02_15: Invalid Date of Birth with random text', () => {
    cy.get('input[name="pat_fname"]').type('John');
    cy.get('input[name="pat_lname"]').type('Doe');
    cy.get('input[name="pat_dob"]').type('syanakawk');
    cy.get('input[name="pat_age"]').type('35');
    cy.get('input[name="pat_addr"]').type('Lot 167 Tmn Sri');
    cy.get('input[name="pat_phone"]').type('01023498237');
    cy.get('input[name="pat_ailment"]').type('Demo');
    cy.get('select[name="pat_type"]').select('InPatient');
    cy.get('button[name="add_patient"]').click();
    cy.contains(/FAILED/i, { timeout: 5000 }).should('be.visible');
  });

  it('HM02_16: All fields filled with valid Age', () => {
    cy.get('input[name="pat_fname"]').type('John');
    cy.get('input[name="pat_lname"]').type('Doe');
    cy.get('input[name="pat_dob"]').type('27/03/1998');
    cy.get('input[name="pat_age"]').type('35');
    cy.get('input[name="pat_addr"]').type('Lot 167 Tmn Sri');
    cy.get('input[name="pat_phone"]').type('01023498237');
    cy.get('input[name="pat_ailment"]').type('Demo');
    cy.get('select[name="pat_type"]').select('InPatient');
    cy.get('button[name="add_patient"]').click();
    cy.contains(/SUCCESS/i, { timeout: 5000 }).should('be.visible');
  });

  it('HM02_17: Invalid Age with special characters', () => {
    cy.get('input[name="pat_fname"]').type('John');
    cy.get('input[name="pat_lname"]').type('Doe');
    cy.get('input[name="pat_dob"]').type('27/03/1998');
    cy.get('input[name="pat_age"]').type('@@@@@@');
    cy.get('input[name="pat_addr"]').type('Lot 167 Tmn Sri');
    cy.get('input[name="pat_phone"]').type('01023498237');
    cy.get('input[name="pat_ailment"]').type('Demo');
    cy.get('select[name="pat_type"]').select('InPatient');
    cy.get('button[name="add_patient"]').click();
    cy.contains(/FAILED/i, { timeout: 5000 }).should('be.visible');
  });

  it('HM02_18: Invalid Age with random text', () => {
    cy.get('input[name="pat_fname"]').type('John');
    cy.get('input[name="pat_lname"]').type('Doe');
    cy.get('input[name="pat_dob"]').type('27/03/1998');
    cy.get('input[name="pat_age"]').type('syasyuawak');
    cy.get('input[name="pat_addr"]').type('Lot 167 Tmn Sri');
    cy.get('input[name="pat_phone"]').type('01023498237');
    cy.get('input[name="pat_ailment"]').type('Demo');
    cy.get('select[name="pat_type"]').select('InPatient');
    cy.get('button[name="add_patient"]').click();
    cy.contains(/FAILED/i, { timeout: 5000 }).should('be.visible');
  });

  it('HM02_19: Invalid Age with empty string', () => {
    cy.get('input[name="pat_fname"]').type('John');
    cy.get('input[name="pat_lname"]').type('Doe');
    cy.get('input[name="pat_dob"]').type('27/03/1998');
    cy.get('input[name="pat_age"]').clear();
    cy.get('input[name="pat_addr"]').type('Lot 167 Tmn Sri');
    cy.get('input[name="pat_phone"]').type('01023498237');
    cy.get('input[name="pat_ailment"]').type('Demo');
    cy.get('select[name="pat_type"]').select('InPatient');
    cy.get('button[name="add_patient"]').then($btn => {
      // Try to click and catch the validation message
      $btn[0].click()
      cy.get('input[name="pat_age"]').then($input => {
        // Cast to HTMLInputElement to access validity and validationMessage
        const inputElem = $input[0] as HTMLInputElement;
        const validity = inputElem.validity;
        const validationMessage = inputElem.validationMessage;
        expect(validity.valid).to.be.false;
        expect(validationMessage).to.contain("Please fill out this field.");
      })
    })
  });


  it('HM02_20: All fields filled with valid Address', () => {
    cy.get('input[name="pat_fname"]').type('John');
    cy.get('input[name="pat_lname"]').type('Doe');
    cy.get('input[name="pat_dob"]').type('27/03/1998');
    cy.get('input[name="pat_age"]').type('35');
    cy.get('input[name="pat_addr"]').type('Lot 167 Tmn Sri');
    cy.get('input[name="pat_phone"]').type('01023498237');
    cy.get('input[name="pat_ailment"]').type('Demo');
    cy.get('select[name="pat_type"]').select('InPatient');
    cy.get('button[name="add_patient"]').click();
    cy.contains(/SUCCESS/i, { timeout: 5000 }).should('be.visible');
  });

  it('HM02_21: Invalid Address with special characters', () => {
    cy.get('input[name="pat_fname"]').type('John');
    cy.get('input[name="pat_lname"]').type('Doe');
    cy.get('input[name="pat_dob"]').type('27/03/1998');
    cy.get('input[name="pat_age"]').type('35');
    cy.get('input[name="pat_addr"]').type('@@@@@@');
    cy.get('input[name="pat_phone"]').type('01023498237');
    cy.get('input[name="pat_ailment"]').type('Demo');
    cy.get('select[name="pat_type"]').select('InPatient');
    cy.get('button[name="add_patient"]').click();
    cy.contains(/FAILED/i, { timeout: 5000 }).should('be.visible');
  });

  it('HM02_22: Invalid Address with symbols and underscore', () => {
    cy.get('input[name="pat_fname"]').type('John');
    cy.get('input[name="pat_lname"]').type('Doe');
    cy.get('input[name="pat_dob"]').type('27/03/1998');
    cy.get('input[name="pat_age"]').type('35');
    cy.get('input[name="pat_addr"]').type('syasukawak_@');
    cy.get('input[name="pat_phone"]').type('01023498237');
    cy.get('input[name="pat_ailment"]').type('Demo');
    cy.get('select[name="pat_type"]').select('InPatient');
    cy.get('button[name="add_patient"]').click();
    cy.contains(/FAILED/i, { timeout: 5000 }).should('be.visible');
  });

  it('HM02_23: Invalid Address with empty string', () => {
    cy.get('input[name="pat_fname"]').type('John');
    cy.get('input[name="pat_lname"]').type('Doe');
    cy.get('input[name="pat_dob"]').type('27/03/1998');
    cy.get('input[name="pat_age"]').type('35');
    cy.get('input[name="pat_addr"]').clear();
    cy.get('input[name="pat_phone"]').type('01023498237');
    cy.get('input[name="pat_ailment"]').type('Demo');
    cy.get('select[name="pat_type"]').select('InPatient');
    cy.get('button[name="add_patient"]').then($btn => {
      // Try to click and catch the validation message
      $btn[0].click()
      cy.get('input[name="pat_addr"]').then($input => {
        // Cast to HTMLInputElement to access validity and validationMessage
        const inputElem = $input[0] as HTMLInputElement;
        const validity = inputElem.validity;
        const validationMessage = inputElem.validationMessage;
        expect(validity.valid).to.be.false;
        expect(validationMessage).to.contain("Please fill out this field.");
      })
    })
  });

  it('HM02_24: Invalid Address with only numbers', () => {
    cy.get('input[name="pat_fname"]').type('John');
    cy.get('input[name="pat_lname"]').type('Doe');
    cy.get('input[name="pat_dob"]').type('27/03/1998');
    cy.get('input[name="pat_age"]').type('35');
    cy.get('input[name="pat_addr"]').type('1234556777');
    cy.get('input[name="pat_phone"]').type('01023498237');
    cy.get('input[name="pat_ailment"]').type('Demo');
    cy.get('select[name="pat_type"]').select('InPatient');
    cy.get('button[name="add_patient"]').click();
    cy.contains(/FAILED/i, { timeout: 5000 }).should('be.visible');
  });

  it('HM02_25: All fields filled with valid Mobile Number', () => {
    cy.get('input[name="pat_fname"]').type('John');
    cy.get('input[name="pat_lname"]').type('Doe');
    cy.get('input[name="pat_dob"]').type('27/03/1998');
    cy.get('input[name="pat_age"]').type('35');
    cy.get('input[name="pat_addr"]').type('Lot 167 Tmn Sri');
    cy.get('input[name="pat_phone"]').type('01023498237');
    cy.get('input[name="pat_ailment"]').type('Demo');
    cy.get('select[name="pat_type"]').select('InPatient');
    cy.get('button[name="add_patient"]').click();
    cy.contains(/SUCCESS/i, { timeout: 5000 }).should('be.visible');
  });

  it('HM02_26: Invalid Mobile Number with Alphabets', () => {
    cy.get('input[name="pat_fname"]').type('John');
    cy.get('input[name="pat_lname"]').type('Doe');
    cy.get('input[name="pat_dob"]').type('27/03/1998');
    cy.get('input[name="pat_age"]').type('35');
    cy.get('input[name="pat_addr"]').type('Lot 167 Tmn Sri');
    cy.get('input[name="pat_phone"]').type('abcdef');
    cy.get('input[name="pat_ailment"]').type('Demo');
    cy.get('select[name="pat_type"]').select('InPatient');
    cy.get('button[name="add_patient"]').click();
    cy.contains(/FAILED/i, { timeout: 5000 }).should('be.visible');
  });

  it('HM02_27: Invalid Mobile Number with special characters', () => {
    cy.get('input[name="pat_fname"]').type('John');
    cy.get('input[name="pat_lname"]').type('Doe');
    cy.get('input[name="pat_dob"]').type('27/03/1998');
    cy.get('input[name="pat_age"]').type('35');
    cy.get('input[name="pat_addr"]').type('Lot 167 Tmn Sri');
    cy.get('input[name="pat_phone"]').type('@@@@@@');
    cy.get('input[name="pat_ailment"]').type('Demo');
    cy.get('select[name="pat_type"]').select('InPatient');
    cy.get('button[name="add_patient"]').click();
    cy.contains(/FAILED/i, { timeout: 5000 }).should('be.visible');
  });

  it('HM02_28: Invalid Mobile Number with empty string', () => {
    cy.get('input[name="pat_fname"]').type('John');
    cy.get('input[name="pat_lname"]').type('Doe');
    cy.get('input[name="pat_dob"]').type('27/03/1998');
    cy.get('input[name="pat_age"]').type('35');
    cy.get('input[name="pat_addr"]').type('Lot 167 Tmn Sri');
    cy.get('input[name="pat_phone"]').clear();
    cy.get('input[name="pat_ailment"]').type('Demo');
    cy.get('select[name="pat_type"]').select('InPatient');
    cy.get('button[name="add_patient"]').then($btn => {
      // Try to click and catch the validation message
      $btn[0].click()
      cy.get('input[name="pat_phone"]').then($input => {
        // Cast to HTMLInputElement to access validity and validationMessage
        const inputElem = $input[0] as HTMLInputElement;
        const validity = inputElem.validity;
        const validationMessage = inputElem.validationMessage;
        expect(validity.valid).to.be.false;
        expect(validationMessage).to.contain("Please fill out this field.");
      })
    })
  });

  it('HM02_29: All fields filled with valid Patient Ailment', () => {
    cy.get('input[name="pat_fname"]').type('John');
    cy.get('input[name="pat_lname"]').type('Doe');
    cy.get('input[name="pat_dob"]').type('27/03/1998');
    cy.get('input[name="pat_age"]').type('35');
    cy.get('input[name="pat_addr"]').type('Lot 167 Tmn Sri');
    cy.get('input[name="pat_phone"]').type('01023498237');
    cy.get('input[name="pat_ailment"]').type('Demo');
    cy.get('select[name="pat_type"]').select('InPatient');
    cy.get('button[name="add_patient"]').click();
    cy.contains(/SUCCESS/i, { timeout: 5000 }).should('be.visible');
  });

  it('HM02_30: Invalid Patient Ailment with special characters', () => {
    cy.get('input[name="pat_fname"]').type('John');
    cy.get('input[name="pat_lname"]').type('Doe');
    cy.get('input[name="pat_dob"]').type('27/03/1998');
    cy.get('input[name="pat_age"]').type('35');
    cy.get('input[name="pat_addr"]').type('Lot 167 Tmn Sri');
    cy.get('input[name="pat_phone"]').type('01023498237');
    cy.get('input[name="pat_ailment"]').type('@@@@@');
    cy.get('select[name="pat_type"]').select('InPatient');
    cy.get('button[name="add_patient"]').click();
    cy.contains(/FAILED/i, { timeout: 5000 }).should('be.visible');
  });

  it('HM02_31: Invalid Patient Ailment with dashes', () => {
    cy.get('input[name="pat_fname"]').type('John');
    cy.get('input[name="pat_lname"]').type('Doe');
    cy.get('input[name="pat_dob"]').type('27/03/1998');
    cy.get('input[name="pat_age"]').type('35');
    cy.get('input[name="pat_addr"]').type('Lot 167 Tmn Sri');
    cy.get('input[name="pat_phone"]').type('01023498237');
    cy.get('input[name="pat_ailment"]').type('---------');
    cy.get('select[name="pat_type"]').select('InPatient');
    cy.get('button[name="add_patient"]').click();
    cy.contains(/FAILED/i, { timeout: 5000 }).should('be.visible');
  });

  it('HM02_32: Invalid Patient Ailment with numbers', () => {
    cy.get('input[name="pat_fname"]').type('John');
    cy.get('input[name="pat_lname"]').type('Doe');
    cy.get('input[name="pat_dob"]').type('27/03/1998');
    cy.get('input[name="pat_age"]').type('35');
    cy.get('input[name="pat_addr"]').type('Lot 167 Tmn Sri');
    cy.get('input[name="pat_phone"]').type('01023498237');
    cy.get('input[name="pat_ailment"]').type('12345677');
    cy.get('select[name="pat_type"]').select('InPatient');
    cy.get('button[name="add_patient"]').click();
    cy.contains(/FAILED/i, { timeout: 5000 }).should('be.visible');
  });

  it('HM02_33: Invalid Patient Ailment with empty string', () => {
    cy.get('input[name="pat_fname"]').type('John');
    cy.get('input[name="pat_lname"]').type('Doe');
    cy.get('input[name="pat_dob"]').type('27/03/1998');
    cy.get('input[name="pat_age"]').type('35');
    cy.get('input[name="pat_addr"]').type('Lot 167 Tmn Sri');
    cy.get('input[name="pat_phone"]').type('01023498237');
    cy.get('input[name="pat_ailment"]').clear();
    cy.get('select[name="pat_type"]').select('InPatient');
    cy.get('button[name="add_patient"]').then($btn => {
      // Try to click and catch the validation message
      $btn[0].click()
      cy.get('input[name="pat_ailment"]').then($input => {
        // Cast to HTMLInputElement to access validity and validationMessage
        const inputElem = $input[0] as HTMLInputElement;
        const validity = inputElem.validity;
        const validationMessage = inputElem.validationMessage;
        expect(validity.valid).to.be.false;
        expect(validationMessage).to.contain("Please fill out this field.");
      })
    })
  });

  it('HM02_34: All fields filled with valid Patient Type', () => {
    cy.get('input[name="pat_fname"]').type('John');
    cy.get('input[name="pat_lname"]').type('Doe');
    cy.get('input[name="pat_dob"]').type('27/03/1998');
    cy.get('input[name="pat_age"]').type('35');
    cy.get('input[name="pat_addr"]').type('Lot 167 Tmn Sri');
    cy.get('input[name="pat_phone"]').type('01023498237');
    cy.get('input[name="pat_ailment"]').type('Demo');
    cy.get('select[name="pat_type"]').select('InPatient');
    cy.get('button[name="add_patient"]').click();
    cy.contains(/SUCCESS/i, { timeout: 5000 }).should('be.visible');
  });

  it('HM02_35: Invalid Patient Type with Choose option', () => {
    cy.get('input[name="pat_fname"]').type('John');
    cy.get('input[name="pat_lname"]').type('Doe');
    cy.get('input[name="pat_dob"]').type('27/03/1998');
    cy.get('input[name="pat_age"]').type('35');
    cy.get('input[name="pat_addr"]').type('Lot 167 Tmn Sri');
    cy.get('input[name="pat_phone"]').type('01023498237');
    cy.get('input[name="pat_ailment"]').type('Demo');
    cy.get('select[name="pat_type"]').select('Choose');
    cy.get('button[name="add_patient"]').click();
    cy.contains(/FAILED/i, { timeout: 5000 }).should('be.visible');
  });

  // it('HM03_17_B: Invalid Patient Type with empty string', () => {
  //   cy.get('input[name="pat_fname"]').type('John');
  //   cy.get('input[name="pat_lname"]').type('Doe');
  //   cy.get('input[name="pat_dob"]').type('27/03/1998');
  //   cy.get('input[name="pat_age"]').type('35');
  //   cy.get('input[name="pat_addr"]').type('Lot 167 Tmn Sri');
  //   cy.get('input[name="pat_phone"]').type('01023498237');
  //   cy.get('input[name="pat_ailment"]').type('Demo');
  //   cy.get('select[name="pat_type"]').select('');
  //   cy.get('button[name="add_patient"]').click();
  //   cy.contains(/FAILED/i, { timeout: 5000 }).should('be.visible');
  // });
});
