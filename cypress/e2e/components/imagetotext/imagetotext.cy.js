describe('app',function() {
    it('exampletest',() => {
        cy.viewport(1400,750);
        cy.visit('http://localhost:3000/fileconverter/ImageToText');
        cy.wait(2000)
        cy.get('input[type=file]')
        .attachFile('cv.png')
        cy.wait(2000)
        cy.get('#convertbutton').click()
        cy.wait(2000)
    })
})