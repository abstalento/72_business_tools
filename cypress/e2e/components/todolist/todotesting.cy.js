describe('todoapp', function () {
    var todayDate = new Date().toISOString().slice(0, 10);
    var currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 20);
    it('todoTest', () => {
        cy.viewport(1400, 750);
        cy.visit('http://localhost:3000/todoList2');
        cy.get('#listPopup').click()
        cy.get('#listInput').type("Development")
        cy.get('#saveYes').click()
        cy.get('#addTask').click()
        cy.get('#taskadd').type('Todo Design Work')
        cy.get('.w-fit > .bg-\\[\\#F6F6F6\\]\\/100').select('Development');
        cy.get('#addDate').type(todayDate)
        cy.get('#addTime').type("16:05")
        cy.get("#addPriority").select("Low Priority")
        cy.get("#addDescription").type("Feature add todo nav bar")
        cy.get("#newTodo").click()

        cy.get('#addTask').click()
        cy.get('#taskadd').type('Todo Functionality Work')
        cy.get('.w-fit > .bg-\\[\\#F6F6F6\\]\\/100').select('Development');
        cy.get('#addDate').type(todayDate)
        cy.get('#addTime').type("14:05")
        cy.get("#addPriority").select("Mid Priority")
        cy.get("#addDescription").type("Feature add todo add functionality")
        cy.get("#newTodo").click()

        cy.get('#addTask').click()
        cy.get('#taskadd').type('Todo Functionality Work')
        cy.get('.w-fit > .bg-\\[\\#F6F6F6\\]\\/100').select('Development');
        cy.get('#addDate').type(todayDate)
        cy.get('#addTime').type("14:05")
        cy.get("#addPriority").select("High Priority")
        cy.get("#addDescription").type("Deployment todo in aws")
        cy.get("#newTodo").click()
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(1) > .w-\\[24\\%\\] > .space-y-1 > :nth-child(1) > .text-\\[rgba\\(0\\,0\\,0\\,0\\.4\\)\\] > #Group_18235 > #pencil_4_ > #Group_18221 > #Group_18220 > #Path_34510').click();
        cy.get(':nth-child(1) > .w-\\[75\\%\\] > .pl-4 > .space-x-4 > .flex > [style="box-sizing: border-box; display: inline-block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: relative; max-width: 100%;"] > [src="/icons/taskTodo.svg "]').click();
        cy.get('[src="/icons/todoSave.svg"]').click();
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(2) > [style="box-sizing:border-box;display:inline-block;overflow:hidden;width:initial;height:initial;background:none;opacity:1;border:0;margin:0;padding:0;position:relative;max-width:100%"] > .hover\\:cursor-pointer').click();
        cy.get('.pb-2 > .bg-\\[\\#F6F6F6\\]\\/100').select('complete');
        cy.get('#exportSave').click();
        /* ==== End Cypress Studio ==== */
    })
})