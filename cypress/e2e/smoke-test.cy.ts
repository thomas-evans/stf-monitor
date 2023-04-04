describe('Smoke Test', () => {
  Cypress.on('uncaught:exception', () => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', '/svg/bar-chart-outline.svg').as('bar-chart-svg');
    cy.get('@bar-chart-svg');
  });
  it('Should display the default screen', () => {
    cy.title().should('eq', 'STF Monitor');
    cy.get('#page-title').should('have.text', ' STF Monitor ');
    cy.get('.quote').should('have.descendants', 'blockquote');
    cy.get('.quote').should('have.descendants', 'figcaption');
    cy.get('#select-mnemonic').should('have.text', 'Select a Mnemonic');
    cy.get('#menu-heading').should('not.be.visible');
    cy.get('canvas').should('not.exist');
  });
  it('Should get a list of Mnemonics and display them in a menu', () => {
    cy.get('#select-mnemonic').click();
    cy.get('#menu-heading').should('be.visible');
    cy.get('app-data-set-selector').should(
      'have.descendants',
      'ion-accordion-group'
    );
    cy.get('app-data-set-selector ion-accordion-group').should(
      'have.descendants',
      'ion-accordion'
    );
  });
  it('Should show a series list under the mnemonics', () => {
    cy.get('#select-mnemonic').click();
    cy.get('app-data-set-selector ion-accordion-group')
      .children()
      .first()
      .click();
    cy.get('app-data-set').should('be.visible');
    cy.get('app-data-set').children().first().should('have.descendants', 'h3');
  });
  it('Should show a card containing a chart and other text when a series is clicked', () => {
    cy.get('#select-mnemonic').click();
    cy.get('app-data-set-selector ion-accordion-group')
      .children()
      .first()
      .click();
    cy.get('app-data-set')
      .children()
      .first()
      .should('have.descendants', 'h3')
      .click();
    cy.get('app-series-display').should('be.visible');
    cy.get('app-series-display canvas').should('be.visible');
    cy.get('app-series-display ion-card-title').should('be.visible');
    cy.get('app-series-display ion-card-subtitle').should('be.visible');
    cy.get('app-series-display ion-card-content').should('be.visible');
  });
});
