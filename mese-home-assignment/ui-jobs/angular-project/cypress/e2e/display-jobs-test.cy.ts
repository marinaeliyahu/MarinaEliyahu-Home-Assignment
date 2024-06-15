describe('Jobs Table', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/app-jobs-table');  
    });
   
    it('should display job details', () => {
        // Mock the GET request for fetching job details
        cy.intercept('GET', `http://localhost:3000/jobs/`).as('getJobDetails');

    });
    
});

