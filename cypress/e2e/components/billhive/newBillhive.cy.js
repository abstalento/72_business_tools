describe('empty spec', () => {
    it('passes', () => {
      cy.visit('http://localhost:3000/billHive')
      cy.wait(2000)
      const imagepath = "image1.jpg";
      cy.get('input[type=file]').attachFile(imagepath)
      /* ==== Generated with Cypress Studio ==== */
      cy.visit('http://localhost:3000/billHive');
      cy.get('#invoiceNumber').clear();
      cy.get('#invoiceNumber').type('2');
      cy.get('#billFrom').clear()
      cy.get('#billFrom').type('Chennai');
      cy.get('#billTO').clear()
      cy.get('#billTO').type('Tirunelveli');
      cy.get('#shipTO').clear()
      cy.get('#shipTO').type('Bangalore');
      cy.get('#paymentTerms').clear();
      cy.get('#paymentTerms').type('Cash');
      cy.get('#poNumber').clear('2');
      cy.get('#poNumber').type('23456');
      cy.wait(2000)
      cy.get('#item').clear()
      cy.wait(2000)
      cy.get('#item').type('Pendrive');
      cy.wait(2000)
      cy.get('#quality').clear();
      cy.wait(2000)
      cy.get('#quality').type('2');
      cy.wait(2000)
      cy.get('#rate').clear('0');
      cy.wait(2000)
      cy.get('#rate').type('500');
      cy.wait(2000)
      cy.get('#addItem').click();
      cy.wait(2000)
      cy.get(':nth-child(5) > #item').clear()
      cy.wait(2000)
      cy.get(':nth-child(5) > #item').type('Keyboard');
      cy.wait(2000)
      cy.get(':nth-child(5) > #quality').click();
      cy.wait(2000)
      cy.get(':nth-child(5) > .w-\\[11\\%\\].text-right > #rate').clear('1');
      cy.wait(2000)
      cy.get(':nth-child(5) > .w-\\[11\\%\\].text-right > #rate').type('1000');
      cy.wait(2000)
    //   cy.get('#addItem').click();
    //   cy.wait(2000)
      //cy.get(':nth-child(6) > :nth-child(5) > #delete').click();
      //cy.wait(2000)
      cy.get('#discount > p').click();
      cy.wait(2000)
      cy.get('#swapDiscount').click();
      cy.wait(2000)
      cy.get('#discountAmount').clear('01');
      cy.wait(2000)
      cy.get('#discountAmount').type('100');
      cy.wait(2000)
      cy.get('#tax > p').click();
      cy.wait(2000)
      cy.get('#taxSwap').click();
      cy.wait(2000)
      cy.get('#taxAmount').clear('1');
      cy.wait(2000)
      cy.get('#taxAmount').type('10');
      cy.wait(2000)
      cy.get('#shipping > p').click();
      cy.wait(2000)
      cy.get('#shippingValue').clear('2');
      cy.wait(2000)
      cy.get('#shippingValue').type('25');
      cy.wait(2000)
      cy.get('#amountPaid').clear('1');
      cy.wait(2000)
      cy.get('#amountPaid').type('1000');
      cy.wait(2000)
      cy.get('#notes').type('Thank You');
      cy.wait(2000)
      cy.get('#termsNCondition').type('Paid Before Due Date');
      cy.wait(2000)
      cy.get('#previewButton').click();
      cy.wait(10000)
      cy.get('.h-\\[14px\\]').click();
      cy.wait(18000)
      cy.get('#PDFdownload').click();
      cy.wait(2000)
      cy.get('#history > .text-\\[14px\\]').click();
      cy.wait(10000)
      cy.get('#TestexportInvoice').click();
      cy.wait(8000)
      cy.get('#newInvoice').click();
      /* ==== End Cypress Studio ==== */
     
    })
  })