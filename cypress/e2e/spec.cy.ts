describe('dashboard', () => {
  beforeEach(() => {
    cy.visit('localhost:4200/dashboard');
  });

  it(`has title 'Tour of Heroes'`, () => {
    cy.contains('Tour of Heroes');
    cy.get('h1').should('contain', 'Tour of Heroes');
    cy.title().should('eq', 'Tour of Heroes');
  });

  it(`has the correct header`, () => {
    cy.contains('Dashboard');
    cy.get('nav a').eq(1).should('contain', 'Heroes');
    cy.contains('Top Heroes');
  });

  it(`has the correct search header`, () => {
    cy.contains('Hero Search');
    cy.get('app-hero-search').should('contain', 'Hero Search');
  });

  it(`says hello from Matt`, () => {
    cy.contains('Hello from Matt');
  });

  it('can search', () => {
    cy.get('#search-box').type('Bombasto');
    cy.get('.search-result li').contains('Bombasto').click();
    cy.url().should('include', '/detail/13');
  });

  it('add new item and search for that item', () => {
    cy.visit('localhost:4200/heroes'); 
    cy.get('#new-hero').type('Matt');
    cy.get('.add-button').click();
    cy.wait(500);
    cy.get('nav a').eq(0).click();
    cy.wait(500);
    cy.get('#search-box').type('Matt');
    cy.wait(500);
    cy.get('.search-result li').contains('Matt').click();
    cy.url().should('include', '/detail/21');
  });
});
