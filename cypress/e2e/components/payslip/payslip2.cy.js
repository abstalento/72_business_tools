describe('app',function() {
    it('exampletest',() => {
        cy.viewport(1400,750);
        cy.visit('http://localhost:3000/payslip');
        for(let i=1;i<=5;i++){
            cy.get('#additional').click()
            cy.wait(2000)
        }
        cy.wait(2000)
        cy.get('#text0').type("“text-decoration: line-through.”")
        cy.wait(1000)
        cy.get('#0 > #0 > #0> #secondone0').type("“text-decoration: line-through.”")
        cy.wait(1000)
        cy.get('#text1').type("“text-decoration: line-through.”")
        cy.wait(1000)
        cy.get('#1 > #1 > #1> #secondone1').type("“text-decoration: line-through.”")
        cy.wait(1000)
        cy.get('#text2').type("“text-decoration: line-through.”")
        cy.wait(1000)
        cy.get('#2 > #2 > #2> #secondone2').type("“text-decoration: line-through.”")
        cy.wait(1000)
        cy.get('#text3').type("“text-decoration: line-through.”")
        cy.wait(1000)
        cy.get('#3 > #3 > #3> #secondone3').type("“text-decoration: line-through.”")
        cy.wait(1000)
        cy.get('#text4').type("“text-decoration: line-through.”")
        cy.wait(1000)
        cy.get('#4 > #4 > #4> #secondone4').type("“text-decoration: line-through.”")
        cy.wait(1000)
        for(let i=1;i<=5;i++){
            cy.get('#deleteadditional').click()
            cy.wait(1000)
        }
        cy.get("input[type='month' i]").click()
        
    })
})