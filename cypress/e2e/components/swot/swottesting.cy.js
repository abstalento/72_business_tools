describe('app', function () {
    it('exampletest', () => {
        cy.viewport(1400, 750);
        cy.visit('http://localhost:3000/swot-analysis');
        cy.wait(2000)
        cy.get('[src="/icons/deleteRed.svg"]').click();
        cy.wait(2000)
        cy.get('#saveYes').click();
        cy.wait(2000)
        cy.get('#swotinput').type("What is the title").type('{enter}')
        cy.wait(2000)
        cy.get('#Strength').type("MyStrength")
        cy.wait(2000)
        cy.get('#Weakness').type("MyWeakness")
        cy.wait(2000)
        cy.get('#Opportunities').type("MyOpportunities")
        cy.wait(2000)
        cy.get('#Threats').type("Threats")
        cy.wait(2000)
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(1) > .text-white > .items-center > .h-\\[17px\\] > [style="box-sizing:border-box;display:inline-block;overflow:hidden;width:initial;height:initial;background:none;opacity:1;border:0;margin:0;padding:0;position:relative;max-width:100%"] > [alt="Logo"]').click();
        cy.wait(2000)
        cy.get(':nth-child(2) > #Strength').type('MyStrength');
        cy.wait(2000)
        cy.get(':nth-child(2) > .opacity-70 > [style="box-sizing: border-box; display: inline-block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: relative; max-width: 100%;"] > [alt="Logo"]').click();
        cy.wait(2000)
        cy.get('#saveYes').click();
        cy.wait(2000)
        cy.get('[src="/icons/deleteRed.svg"]').click();
        cy.wait(2000)
        cy.get('#saveYes').click();
    })
})