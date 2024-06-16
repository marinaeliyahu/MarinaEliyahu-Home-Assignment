import { JobsItem } from '../../src/app/models/job-model'

let jobsList: Array<JobsItem>;
let mockJob: JobsItem = {
    
    job: "TTTTTEEEEESSSSSSTTTTTTT",
    user: "user@draft.dev",
    group: "R&D",
    state: "Running",
    created_at: new Date("2024-05-31T04:38:30.000Z"),
    updated_at: new Date("2024-06-13T16:31:38.002Z"),
    submitted_at: new Date(),
    completed_at: new Date(),
    log: "Many standard library modules contain code that is invoked on their execution as a script"
};

describe('HTTP Requests', () => {
    it('GET Jobs', () => {
        cy.request('http://localhost:3000/jobs/')
            .its('status')
            .should('equal', 200)
    });

    it('PUT Job', () => { 
        cy.request('PUT', 'http://localhost:3000/jobs/', mockJob)  
        .its('status')
        .should('equal', 201)
    });

    it('PATCH Job', () => {
        mockJob.state ="Succeeded";
        cy.intercept('PATCH', 'http://localhost:3000/jobs/', mockJob)
    });

});
