describe('empty spec', () => {
    it('passes', () => {
      cy.visit('http://localhost:3000/landing/salarycalculator')
      cy.wait(2000)
      cy.get('#annual').type('100000').clear()
      cy.wait(2000)
      cy.get('#month').type('10000').clear()
      cy.wait(2000)
      cy.get('#week').type('7000').clear()
      cy.wait(2000)
      cy.get('#day').type('700').clear()
      cy.wait(2000)
      cy.get('#hour').type('100').clear()
      cy.wait(2000)
      cy.get('#min').type('2')
      cy.get('#pdfdownload').click()
      
    })
  })