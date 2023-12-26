describe('empty spec', () => {
    it('passes', () => {
      cy.visit('http://localhost:3000/billHive')

      /* ==== Generated with Cypress Studio ==== */
      cy.get('#newdate').click();
      cy.wait(5000)
      cy.get('input[type="date"]').click({ multiple: true })
      cy.wait(5000)
    //   cy.get('#dueDate').click();
    //   cy.wait(5000)
      /* ==== End Cypress Studio ==== */
    })
  })