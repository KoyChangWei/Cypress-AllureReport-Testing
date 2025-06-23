/// <reference types="cypress" />

describe('HM05: Admin Add Laboratory Equipment Tests', () => {
    const url = 'http://localhost/hospital-php/backend/admin/his_admin_add_lab_equipment.php';
  
    beforeEach(() => {
      cy.visit(url);
    });
  
    // Helper function to fill the form
    function fillForm(data) {
      if (data.equipmentName !== undefined) {
        if (data.equipmentName === '') {
          cy.get('input[name="eqp_name"]').clear();
        } else {
          cy.get('input[name="eqp_name"]').clear().type(data.equipmentName);
        }
      }
      if (data.equipmentVendor !== undefined) {
        if (data.equipmentVendor === '') {
          cy.get('input[name="eqp_vendor"]').clear();
        } else {
          cy.get('input[name="eqp_vendor"]').clear().type(data.equipmentVendor);
        }
      }
      if (data.equipmentQuantity !== undefined) {
        if (data.equipmentQuantity === '') {
          cy.get('input[name="eqp_qty"]').clear();
        } else {
          cy.get('input[name="eqp_qty"]').clear().type(data.equipmentQuantity);
        }
      }
      // if (data.equipmentBarcode !== undefined)
      //   cy.get('input[name="eqp_code"]').clear().type(data.equipmentBarcode);
      if (data.pharmaCategoryDesc !== undefined) {
        cy.window().then((win: any) => {
          win.CKEDITOR.instances['editor'].setData(data.pharmaCategoryDesc);
        });
      }
    }
  
    it('HM05_01: All required fields are filled', () => {
      fillForm({
        equipmentName: 'Ultrasound',
        equipmentVendor: 'meddina',
        equipmentQuantity: '2',
        pharmaCategoryDesc: `The Intelect Mobile 2 Ultrasound offers dual frequency Ultrasound at 1 or 3 MHz,`
      });
      cy.get('button[name="add_equipments"]').click();
      cy.contains(/SUCCESS/i, { timeout: 5000 }).should('be.visible');
    });
  
    it('HM05_02: All Field are filled with valid Equipment Name', () => {
      fillForm({
        equipmentName: 'Ultrasound',
        equipmentVendor: 'meddina',
        equipmentQuantity: '2',
        pharmaCategoryDesc: `The Intelect Mobile 2 Ultrasound offers dual frequency Ultrasound at 1 or 3 MHz,`
      });
      cy.get('button[name="add_equipments"]').click();
      cy.contains(/SUCCESS/i, { timeout: 5000 }).should('be.visible');
    });
  
    it('HM05_03: Invalid Equipment Name with numbers', () => {
      fillForm({
        equipmentName: '123456',
        equipmentVendor: 'meddina',
        equipmentQuantity: '2',
        pharmaCategoryDesc: `The Intelect Mobile 2 Ultrasound offers dual frequency Ultrasound at 1 or 3 MHz,`
      });
      cy.get('button[name="add_equipments"]').click();
      cy.contains(/FAILED/i, { timeout: 5000 }).should('be.visible');
    });

    it('HM05_04: Invalid Equipment Name with special characters', () => {
      fillForm({
        equipmentName: '!@#',
        equipmentVendor: 'meddina',
        equipmentQuantity: '2',
        pharmaCategoryDesc: `The Intelect Mobile 2 Ultrasound offers dual frequency Ultrasound at 1 or 3 MHz,`
      });
      cy.get('button[name="add_equipments"]').click();
      cy.contains(/FAILED/i, { timeout: 5000 }).should('be.visible');
    });

    it('HM05_05: Invalid Equipment Name with empty string', () => {
      fillForm({
        equipmentName: '',
        equipmentVendor: 'meddina',
        equipmentQuantity: '2',
        pharmaCategoryDesc: `The Intelect Mobile 2 Ultrasound offers dual frequency Ultrasound at 1 or 3 MHz,`
      });
      cy.get('button[name="add_equipments"]').then($btn => {
        // Try to click and catch the validation message
        $btn[0].click()
        cy.get('input[name="eqp_name"]').then($input => {
          // Cast to HTMLInputElement to access validity and validationMessage
          const inputElem = $input[0] as HTMLInputElement;
          const validity = inputElem.validity;
          const validationMessage = inputElem.validationMessage;
          expect(validity.valid).to.be.false;
          expect(validationMessage).to.contain("Please fill out this field.");
        })
      })
    });
  
    it('HM05_06: All Field are filled with valid Equipment Vendor', () => {
      fillForm({
        equipmentName: 'Ultrasound',
        equipmentVendor: 'meddina',
        equipmentQuantity: '2',
        pharmaCategoryDesc: `The Intelect Mobile 2 Ultrasound offers dual frequency Ultrasound at 1 or 3 MHz,`
      });
      cy.get('button[name="add_equipments"]').click();
      cy.contains(/SUCCESS/i, { timeout: 5000 }).should('be.visible');
    });
  
    it('HM05_07: Invalid Equipment Vendor with special characters', () => {
      fillForm({
        equipmentName: 'Ultrasound',
        equipmentVendor: '@#$@',
        equipmentQuantity: '2',
        pharmaCategoryDesc: `The Intelect Mobile 2 Ultrasound offers dual frequency Ultrasound at 1 or 3 MHz,`
      });
      cy.get('button[name="add_equipments"]').click();
      cy.contains(/FAILED/i, { timeout: 5000 }).should('be.visible');
    });

    it('HM05_08: Invalid Equipment Vendor with dashes', () => {
      fillForm({
        equipmentName: 'Ultrasound',
        equipmentVendor: '--------',
        equipmentQuantity: '2',
        pharmaCategoryDesc: `The Intelect Mobile 2 Ultrasound offers dual frequency Ultrasound at 1 or 3 MHz,`
      });
      cy.get('button[name="add_equipments"]').click();
      cy.contains(/FAILED/i, { timeout: 5000 }).should('be.visible');
    });

    it('HM05_09: Invalid Equipment Vendor with empty string', () => {
      fillForm({
        equipmentName: 'Ultrasound',
        equipmentVendor: '',
        equipmentQuantity: '2',
        pharmaCategoryDesc: `The Intelect Mobile 2 Ultrasound offers dual frequency Ultrasound at 1 or 3 MHz,`
      });
      cy.get('button[name="add_equipments"]').then($btn => {
        // Try to click and catch the validation message
        $btn[0].click()
        cy.get('input[name="eqp_vendor"]').then($input => {
          // Cast to HTMLInputElement to access validity and validationMessage
          const inputElem = $input[0] as HTMLInputElement;
          const validity = inputElem.validity;
          const validationMessage = inputElem.validationMessage;
          expect(validity.valid).to.be.false;
          expect(validationMessage).to.contain("Please fill out this field.");
        })
      })
    });
  
    it('HM05_10: All Field are filled with valid Equipment Quantity', () => {
      fillForm({
        equipmentName: 'Ultrasound',
        equipmentVendor: 'meddina',
        equipmentQuantity: '2',
        pharmaCategoryDesc: `The Intelect Mobile 2 Ultrasound offers dual frequency Ultrasound at 1 or 3 MHz,`
      });
      cy.get('button[name="add_equipments"]').click();
      cy.contains(/SUCCESS/i, { timeout: 5000 }).should('be.visible');
    });
  
    it('HM05_11: Invalid Equipment Quantity with negative number', () => {
      fillForm({
        equipmentName: 'Ultrasound',
        equipmentVendor: 'meddina',
        equipmentQuantity: '-1',
        pharmaCategoryDesc: `The Intelect Mobile 2 Ultrasound offers dual frequency Ultrasound at 1 or 3 MHz,`
      });
      cy.get('button[name="add_equipments"]').click();
      cy.contains(/FAILED/i, { timeout: 5000 }).should('be.visible');
    });

    it('HM05_12: Invalid Equipment Quantity with special characters', () => {
      fillForm({
        equipmentName: 'Ultrasound',
        equipmentVendor: 'meddina',
        equipmentQuantity: '@@@',
        pharmaCategoryDesc: `The Intelect Mobile 2 Ultrasound offers dual frequency Ultrasound at 1 or 3 MHz,`
      });
      cy.get('button[name="add_equipments"]').click();
      cy.contains(/FAILED/i, { timeout: 5000 }).should('be.visible');
    });

    it('HM05_13: Invalid Equipment Quantity with empty string', () => {
      fillForm({
        equipmentName: 'Ultrasound',
        equipmentVendor: 'meddina',
        equipmentQuantity: '',
        pharmaCategoryDesc: `The Intelect Mobile 2 Ultrasound offers dual frequency Ultrasound at 1 or 3 MHz,`
      });
      cy.get('button[name="add_equipments"]').then($btn => {
        // Try to click and catch the validation message
        $btn[0].click()
        cy.get('input[name="eqp_qty"]').then($input => {
          // Cast to HTMLInputElement to access validity and validationMessage
          const inputElem = $input[0] as HTMLInputElement;
          const validity = inputElem.validity;
          const validationMessage = inputElem.validationMessage;
          expect(validity.valid).to.be.false;
          expect(validationMessage).to.contain("Please fill out this field.");
        })
      })
    });
  
    it('HM05_14: All Field are filled with valid Pharmaceutical Category Description', () => {
      fillForm({
        equipmentName: 'Ultrasound',
        equipmentVendor: 'meddina',
        equipmentQuantity: '2',
        pharmaCategoryDesc: `The Intelect Mobile 2 Ultrasound offers dual frequency Ultrasound at 1 or 3 MHz,`
      });
      cy.get('button[name="add_equipments"]').click();
      cy.contains(/SUCCESS/i, { timeout: 5000 }).should('be.visible');
    });
  
    it('HM05_15: Invalid Pharmaceutical Category Description with empty string', () => {
      fillForm({
        equipmentName: 'Ultrasound',
        equipmentVendor: 'meddina',
        equipmentQuantity: '2',
        pharmaCategoryDesc: ''
      });
      cy.get('button[name="add_equipments"]').click();
      cy.contains(/FAILED/i, { timeout: 5000 }).should('be.visible');
    });

  });