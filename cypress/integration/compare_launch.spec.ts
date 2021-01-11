/// <reference types="cypress" />

describe('SpaceX Launch', () => {
  it('opens the site', () => {
    cy.visit('localhost:3000');
  });

  it('compares launches', () => {
    cy.get('[type="checkbox"]').each(($elem: any, index: number) => {
      if (index < 2) {
        console.log($elem);
        cy.wrap($elem).click();
      }
    });
    cy.get('.compare-btn').click();
    cy.get('.modal-dialog').should('be.visible');
    cy.get('.modal-dialog').contains('Comparison');
    cy.get('.close').click();
    cy.get('.modal-dialog').should('not.exist');
  });
});
