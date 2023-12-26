describe('app',function() {
    it('exampletest',() => {
        cy.viewport(1400,750);
        cy.visit('http://localhost:3000/payslip');
        cy.wait(2000)
        // colourcheck
        cy.get('#col1').click()
        cy.wait(2000)
        cy.get('#col2').click()
        cy.wait(2000)
        cy.get('#col3').click()
        cy.wait(2000)
        cy.get('#col4').click()
        cy.wait(2000)
        cy.get('#col5').click()
        cy.wait(2000)
        cy.get('#col6').click()
        cy.wait(2000)
        cy.get('#col7').click()
        cy.wait(2000)
        cy.get('#col8').click()
        cy.wait(2000)
        cy.get('#col9').click()
        cy.wait(2000)
        cy.get('#col10').click()
        cy.wait(2000)
        //employeeDeatils
        cy.get('#comname').type('Alpha Business Solutions Private Limited')
        cy.wait(2000)
        cy.get('#comadd').type('10 F2 Second Floor,, Trivandrum Road, Tirunelveli,')
        cy.wait(2000)
        cy.get('#secline').type('Tamil Nadu')
        cy.wait(2000)
        cy.get('#citypin').type(627003)
        cy.wait(2000)
        cy.get('#country').type('INDIA')
        cy.wait(2000)
        //paysummary
        cy.get('#EmployeeName').type('Alphonse Irudaya Sahaya Raj');
        cy.wait(2000)
        cy.get('#PayPeriod').click()
        cy.wait(2000)
        cy.get('#LossofPayDays').type(5)
        cy.wait(2000)
        cy.get('#EmployeeID').type("123456sahay")
        cy.wait(2000)
        cy.get('#PaidDays').type(22)
        cy.wait(2000)
        for(let i=1;i<=5;i++){
            cy.get('#additional').click()
            cy.wait(2000)
        }
        // cy.get(':nth-child(1)').type("123456sahay")
        for(let i=1;i<=5;i++){
            cy.get('#deleteadditional').click()
            cy.wait(2000)
        }
        cy.wait(2000)
        cy.get('#BasicPayCost').type(1000)
        cy.wait(2000)
        cy.get('#RentAllowance').type(2000)
        cy.wait(2000)
        cy.get('#IncomeTax').type(3000)
        cy.wait(2000)
        cy.get('#PFAmount').type(4000)
        
        for(let i=1;i<=5;i++){
            cy.get('#AddEarnings').click()
            cy.wait(2000)
            cy.get('#addDeductions').click()
            cy.wait(2000)
        }
        for(let i=1;i<=5;i++){
            cy.get('#deleteearnings').click()
            cy.wait(2000)
            cy.get('#deletededuction').click()
            cy.wait(2000)
        }
    })    
})