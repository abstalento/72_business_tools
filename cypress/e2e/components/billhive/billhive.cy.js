describe('empty spec', () => {
    it('passes', () => {
      cy.visit('http://localhost:3000/billHive')
      cy.wait(2000)
      cy.get('#color1').click()
      cy.wait(2000)
      cy.get('#color4').click()
      cy.wait(2000)
      cy.get('#color6').click()
      cy.wait(2000)
      cy.get('#color8').click()
      cy.wait(2000)
      cy.get('#colorBlack').click()
      cy.wait(2000)
      cy.get('#color3').click()
      cy.wait(2000)
      const imagepath = "image1.jpg";
      cy.get('input[type=file]').attachFile(imagepath)
      cy.wait(2000)
      cy.get('#invoiceNumber').clear().type(1)
      cy.wait(2000)
      cy.get('#billFrom').type('Chennai')
      cy.wait(2000)
      cy.get('#billTO').type('Tirunelveli')
      cy.wait(2000)
      cy.get('#shipTO').type('Bangalore')
      cy.wait(2000)
      cy.get('#paymentTerms').type('Debit')
      cy.wait(2000)
      cy.get('#poNumber').type('05784')
      cy.wait(2000)
      cy.get('#0 > #item').clear().type('Mouse')
      cy.wait(2000)
      cy.get('#0> #quality').clear().type(2)
      cy.wait(2000)
      cy.get('#0 > #0 > #rate').clear().type(800)
      cy.wait(2000)
      cy.get('#addItem').click()
      cy.wait(2000)
      cy.get('#discount').click()
      cy.wait(2000)
      cy.get('#discountValue').clear().type(5)
      cy.wait(2000)
      cy.get('#tax').click()
      cy.wait(2000)
      cy.get('#taxValue').type(5)
      cy.wait(2000)
      cy.get('#shipping').click()
      cy.wait(2000)
      cy.get('#shippingValue').clear().type(25)
      cy.wait(2000)
      cy.get('#amountPaid').type(1000)
      cy.wait(2000)
      cy.get('#notes').type('ThankYou For Purchase')
      cy.wait(2000)
      cy.get('#termsNCondition').type('Repay Paid Before Due Date')
      cy.wait(2000)
      cy.get('#previewButton').click()
      cy.wait(6000)
      cy.get('#homeRoute').click()
      cy.wait(8000)
      cy.get('#PDFdownload').click()
      cy.wait(2000)
      cy.get('#history').click()
      cy.wait(8000)
      cy.get('#TestexportInvoice').click()
      cy.wait(13000)
      cy.get('#deleteButton').invoke('show').click()
      cy.wait(2000)
      cy.get('#newInvoice').click()
     
    })
  })