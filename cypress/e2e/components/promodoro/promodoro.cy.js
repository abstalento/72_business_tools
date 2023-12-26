describe('promodoroapp', function () {

    it('promodoro', function() {
        cy.visit('http://localhost:3000/pomodoro');
        cy.get('.h-\\[11vh\\] > #startPromo').click();
        cy.get('.h-\\[15vh\\] > .bg-black').click();
        cy.get('.bg-white > :nth-child(1) > .w-full').click();
        cy.get('.bg-white > :nth-child(1) > .w-full').clear('t');
        cy.get('.bg-white > :nth-child(1) > .w-full').type('test1');
        cy.get('.w-\\[30\\%\\] > .justify-around > :nth-child(1)').click();
        cy.get('.w-\\[65px\\]').click();
        cy.get('.p-2 > .w-full').click();
        cy.get('.h-\\[11vh\\] > #startPromo').click();
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.h-\\[15vh\\] > .bg-black').click();
        cy.get('.bg-white > :nth-child(1) > .w-full').clear('t');
        cy.get('.bg-white > :nth-child(1) > .w-full').type('test2');
        cy.get('.w-\\[30\\%\\] > .justify-around > :nth-child(1)').click();
        cy.get('.w-\\[65px\\]').click();
        cy.get('.h-\\[23vh\\] > :nth-child(2) > .w-full').click();
        cy.get('.h-\\[11vh\\] > #startPromo').click();
        /* ==== End Cypress Studio ==== */
    });
})