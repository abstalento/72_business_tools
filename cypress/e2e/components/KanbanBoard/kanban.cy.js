describe('Kanban Board', () => {
    var todayDate=new Date().toISOString().slice(0,10);
    var todayDate1=new Date().toISOString().slice(0,10);
    var currentDate=new Date();
    currentDate.setDate(currentDate.getDate() + 3);
    
    it('passes', () => {
        cy.visit('http://localhost:3000/kanbanBoard')

        //Create new project popup
        cy.wait(5000)
        cy.get(':nth-child(1) > .text-\\[\\#FFFFFF\\]').click();
        cy.wait(1000)
        cy.get(':nth-child(2) > :nth-child(2) > .font-\\[sfpro\\]').click();
        cy.wait(1000)
        cy.get(':nth-child(2) > :nth-child(2) > .font-\\[sfpro\\]').clear('K');
        cy.wait(1000)
        cy.get(':nth-child(2) > :nth-child(2) > .font-\\[sfpro\\]').type('Kanban Board');
        cy.wait(1000)
        cy.get('.h-\\[90\\%\\] > :nth-child(2) > .flex').click();
        cy.wait(1000)
        cy.get(':nth-child(2) > .rounded').select('Medium');
        cy.wait(1000)
        cy.get('.w-\\[75\\%\\] > .font-\\[sfpro\\]').click();
        cy.wait(1000)
        cy.get('.w-\\[75\\%\\] > .font-\\[sfpro\\]').type('Kanban')
        cy.wait(1000)
        cy.get('#addDate').type(todayDate)
        cy.wait(1000)
        cy.get('.justify-end > .bg-\\[\\#773dfe\\]').click();
        cy.wait(1000)
        /* ==== Generated with Cypress Studio ==== */

        cy.get('.w-\\[5\\.5\\%\\] > .items-center > .flex > .w-8').click();
        cy.wait(1000)
        cy.get('.text-\\[\\#06060666\\]').click();
        cy.wait(1000)
        cy.get('.rounded-tl-\\[10px\\] > .font-\\[sfpro-regular\\]').click();
        cy.wait(1000)
        cy.get(':nth-child(1) > .w-8').click();
        cy.wait(1000)
        cy.get('.flex-col > .text-justify').click();
        cy.wait(1000)
        /* ==== End Cypress Studio ==== */

        cy.get(':nth-child(1) > .bg-white > .opacity-60').click();
        cy.wait(1000)
        cy.get('#priority').select('High');
        cy.wait(1000)
        cy.get('#taskTitle').type('Overview',{force:true});
        cy.wait(3000)
        cy.get('#desc').click({force: true});
        cy.wait(1000)
        cy.get('#desc').type("Grid View & List view",{force:true});
        cy.wait(1000)
        cy.get('#displayDate').type(todayDate1,{force:true});
        cy.wait(1000)
        cy.get('input[type=file]').attachFile("image1.jpg");
        cy.wait(1000)
        cy.get('#addTask').click({force: true});
        cy.wait(3000)

        cy.get('[data-rbd-draggable-context-id="0"]').click();
        cy.wait(1000)
        cy.get('#taskTitle').clear('Over');
        cy.wait(1000)
        cy.get('#taskTitle').type('ToDo');
        cy.wait(1000)
        cy.get('#addTask').click({force: true});
        cy.wait(3000)

        cy.get('.min-w-\\[170px\\] > .flex > .cursor-pointer').click();
        cy.wait(1000)
        cy.get('.border-\\[\\#000\\]').clear();
        cy.wait(1000)
        cy.get('.border-\\[\\#000\\]').type('Event{enter}');
        cy.wait(1000)
        cy.get(':nth-child(4) > .w-\\[90\\%\\] > .w-fit > .font-\\[sfpro-bold\\]').click();
        cy.wait(1000)
        cy.get('input').clear('s');
        cy.wait(1000)
        cy.get('input').type('status{enter}');
        cy.wait(1000)
        cy.get('#deleteButton').click();
        cy.wait(1000)
        cy.get('.bg-\\[\\#BC0101\\]').click();

         //Drag and drop
        // cy.get('[data-rbd-draggable-context-id="0"]')
        // .trigger("mousedown", { button: 0 }, { force: true })
        // .trigger("mousemove", 200, -200, { force: true })
        // cy.get(':nth-child(2) > .flex-col').click({force:true})
        // .trigger("mouseup", { force: true });

        // cy.get('[data-rbd-draggable-context-id="0"]').drag(':nth-child(2) > .flex-col', {
        //     source: { x: 100, y: 100 }, // applies to the element being dragged
        //     target: { position: 'left' }, // applies to the drop target
        //     force: true, // applied to both the source and target element
        //   })

        // cy.get('[data-rbd-draggable-context-id="0"]',{force:true}).drag(':nth-child(2) > .flex-col',{force:true}).then((success) => {
        //     assert.isTrue(success)
        //   })

        //   cy.get('.items-start').click();
        //   cy.wait(1000)
        //   cy.get('.items-start').click();
        //   cy.wait(1000)
        //   cy.get(':nth-child(3) > .flex-col > [style="margin: 8px; border-radius: 15px;"]').click();
        //   cy.wait(1000)

        //     cy.get('[data-rbd-draggable-context-id="0"]')
        // .trigger('mousedown', { //simulating hold click
        //     button: 0
        // }).wait(2000)
        // .trigger('mousemove', { //simulating drag
        //     pageX: 80, 
        //     pageY: -100,
        //     force: true
        // }).wait(2000)
        // .trigger('mouseup', {  //simulating drop
        //     force: true
        // });

        // cy.get('[data-rbd-draggable-context-id="0"]')
        // .trigger('mousedown', { //simulating hold click
        //     button: 0
        // }).wait(2000)
        // .trigger('mousemove', { //simulating drag
        //   clientX:357.75,
        //   clientY:682.25,
        //   screenX: 1811.75,
        //   screenY: 799.25,  
        //   pageX: 682.25, 
        //   pageY: 105.8125,
        // })
        // .trigger('mouseup', {  //simulating drop
        //     force: true
        // });

        // cy.get('[data-rbd-draggable-context-id="0"]')
        // .wait(3000)
        // .trigger('mousedown',{which:1,pageX:600,pageY:100})
        // .wait(3000)
        // .trigger('mousemove',{which:1,pageX:600,pageY:600})
        // .wait(3000)
        // .trigger('mouseup')


        //Calendar page
        cy.get('#Union_1').click();
        cy.wait(1000)
        cy.get('#insertDate').click();
        cy.wait(1000)
        cy.get('#insertDate').type(todayDate)
        cy.wait(1000)
        cy.get('.w-\\[12\\%\\] > .bg-white').click();
        cy.wait(1000)
        cy.get('.mt-8 > .w-\\[90\\%\\] > :nth-child(3)').click();
        cy.wait(1000)
        cy.get('.cursor-pointe > .px-3').click();
        cy.wait(1000)
        cy.get('#insertDate').click();
        cy.wait(1000)
        cy.get('#insertDate').type(todayDate)
        cy.wait(3000)


        //Add another task
        cy.visit('http://localhost:3000/kanbanBoard');
        cy.get(':nth-child(1) > .text-\\[\\#FFFFFF\\]').click();
        cy.wait(1000)
        cy.get(':nth-child(2) > :nth-child(2) > .font-\\[sfpro\\]').clear('C');
        cy.wait(1000)
        cy.get(':nth-child(2) > :nth-child(2) > .font-\\[sfpro\\]').type('Chit Calculator');
        cy.wait(1000)
        cy.get('.h-\\[90\\%\\] > :nth-child(2) > .flex').click();
        cy.wait(1000)
        cy.get(':nth-child(2) > .rounded').select('High');
        cy.wait(1000)
        cy.get('.w-\\[75\\%\\] > .font-\\[sfpro\\]').click();
        cy.wait(1000)
        cy.get('.w-\\[75\\%\\] > .font-\\[sfpro\\]').type("Chit Interest Calculator");
        cy.wait(1000)
        cy.get('#addDate').click();
        cy.wait(1000)
        cy.get('#addDate').type(todayDate)
        cy.wait(1000)
        cy.get('.justify-end > .bg-\\[\\#773dfe\\]').click();
        cy.wait(1000)
        cy.reload()
        cy.wait(1000)


        cy.get('#retrieve').click({force:true})
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.bg-\\[\\#693DFE\\]').click();
        cy.wait(1000)

        cy.get(':nth-child(4) > .justify-between > div > .flex > svg').click();
        cy.wait(1000)

        cy.get('.w-6').click({force:true});
        cy.wait(1000)

        cy.get('.justify-center > .bg-\\[\\#9e2aff\\]').click({force:true});
        cy.wait(1000)
        cy.get(':nth-child(1) > .justify-between > div > .flex').click({force:true});
        cy.wait(1000)
        cy.get(':nth-child(2) > .h-\\[31vh\\] > .flex-row > .invisible > #retrieve').click({force:true});
        cy.wait(1000)
        cy.get('.bg-\\[\\#693DFE\\]').click({force:true});
        cy.wait(1000)
        cy.get('#archive').click({force:true});
        cy.wait(1000)
        cy.get('.flex-row').click({force:true});
        cy.wait(1000)
        cy.get('#deleteButton > path').click({force:true});
        cy.wait(1000)
        cy.get('.bg-\\[\\#BC0101\\]').click({force:true});
        cy.wait(1000)
        cy.get('.space-y-2 > :nth-child(1) > .justify-between > div > .flex').click({force:true});
        /* ==== End Cypress Studio ==== */
    })
})