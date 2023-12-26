describe('app',function() {
    it('exampletest',() => {
        cy.viewport(1400,750);
        cy.visit('http://localhost:3000/fileconverter/ImageToPdf');
        cy.wait(2000)
        cy.get('input[type=file]')
        .attachFile('test2.jpg')
        cy.wait(2000)
        // cy.get('#addMore').click()
        cy.get('#convertbutton').click()
        cy.wait(2000)
        cy.get('#addMore').click();
        cy.wait(2000)
        cy.get('#convertbutton').click();
        cy.wait(2000)
        cy.get('#downloadbutton').click();
        // cy.get('#downloadbutton').click()
    })
});