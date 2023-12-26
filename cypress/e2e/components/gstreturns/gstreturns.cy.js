describe('gstReturns App', () => {
    var todayDate = new Date().toISOString().slice(0, 10);
    var currentDate = new Date();
    it('gstreturn test', () => {
      cy.viewport(1472, 1000);
      cy.visit('http://localhost:3000/gstreturns')
      cy.wait(2000)
      cy.get('#companyName').type('Amazon India Private Limited.')
      cy.wait(2000)
      cy.get('#gstIn').type('37AADCS0472N1Z1')
      cy.wait(2000)
      cy.get('#contactNumber').type('8937625348')
      cy.get('#month').type('2023-01')
      cy.wait(2000)
      cy.get('#salesBill').type('MJHG89')
      cy.wait(2000)
      cy.get('#salesInvoiceDate').type(todayDate)
      cy.wait(2000)
      cy.get('#saleCompanyName').type('Sakthi  Private Limited')
      cy.wait(2000)
      cy.get('#salesGstInNo').type('29AAACC1206D2ZB')
      cy.wait(2000)
      cy.get('#salesBillCost').type('300')
      cy.get('#salesGstAmount').type('150')
      cy.wait(2000)
      cy.get('#salesPaidDate').type(todayDate)
      cy.wait(2000)
      cy.get('#salesPayMode').type('Bank')
      cy.wait(2000)
      cy.get('#purchase').click()
      cy.wait(2000)

      cy.get('#purchaseBill').type('26AADCS0472N1Z4')
      cy.wait(2000)
      cy.get('#invoiceDate').type(todayDate)
      cy.wait(2000)
      cy.get('#purchaseCompanyName').type('Murugan Private Limited')
      cy.wait(2000)
      cy.get('#gstInNo').type('37AADCS0472N2Z0')
      cy.wait(2000)
      cy.get('#billCost').type('300')
      cy.wait(2000)
      cy.get('#gstAmount').type('100')
      cy.wait(2000)
      cy.get('#purchaseDate').type(todayDate)
      cy.wait(2000)
      cy.get('#purchasePayMode').type('cash')
      /* ==== Generated with Cypress Studio ==== */
      cy.get('#export > [style="box-sizing:border-box;display:inline-block;overflow:hidden;width:initial;height:initial;background:none;opacity:1;border:0;margin:0;padding:0;position:relative;max-width:100%"] > .hover\\:cursor-pointer').click();
      cy.get('.bg-\\[\\#F6F6F6\\]\\/100').select('PDF');
      cy.get('#exportSave').click();
      /* ==== End Cypress Studio ==== */
    })
  })