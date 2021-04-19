// write tests here
describe( 'Quotes App', () => {
  beforeEach( () => {
    cy.visit( 'http://localhost:3000' );
    firstNameInput().clear();
    lastNameInput().clear();
    emailInput().clear();
    passwordInput().clear();
    checkbox().uncheck();
  } )
  
  it ( 'sanity checks', () => {
    expect( 10 ).to.equal( 10 );
    expect( 1 + 2 ).to.equal( 3 );
    expect( {} ).to.eql( {} );
    expect( 1 + 2 ).to.equal( 4 - 1 );
  } );

  const firstNameInput = () => cy.get( `input[name="firstName"]` );
  const lastNameInput = () => cy.get( `input[name="lastName"]` );
  const emailInput = () => cy.get( `input[name="email"]` );
  const passwordInput = () => cy.get( `input[name="password"]` );
  const checkbox = () => cy.get( `input[name="terms"]` );
  const submitBtn = () => cy.get( `button[type="submit"]` );
  it( 'all input fields exist', () => {
    firstNameInput().should( 'exist' );
    lastNameInput().should( 'exist' );
    emailInput().should( 'exist' );
    passwordInput().should( 'exist' );
    checkbox().should( 'exist' );
  } );

  it( 'incomplete form check, submit should not work', () => {
    firstNameInput()
      .type( 'John', { delay: 100 } );
    submitBtn()
      .should( 'be.disabled' );
    lastNameInput()
      .type( 'Doe', { delay: 100 } );
    submitBtn()
      .should( 'be.disabled' );
    emailInput()
      .type( 'john.doe@gmail.com', { delay: 100 } );
    submitBtn()
      .should( 'be.disabled' );
    passwordInput()
      .type( 'abcd1234?', { delay: 100 } );
    submitBtn()
      .should( 'be.disabled' );
    checkbox()
      .check();
    submitBtn()
      .should( 'be.enabled' );
    checkbox()
      .uncheck();
    submitBtn()
      .should( 'be.disabled' );
  } );
  
  it( 'complete form and submit', () => {
    firstNameInput()
      .type( 'John', { delay: 100 } );
    submitBtn()
      .should( 'be.disabled' );
    lastNameInput()
      .type( 'Doe', { delay: 100 } );
    submitBtn()
      .should( 'be.disabled' );
    emailInput()
      .type( 'john.doe@gmail.com', { delay: 100 } );
    submitBtn()
      .should( 'be.disabled' );
    passwordInput()
      .type( 'abcd1234?', { delay: 100 } );
    submitBtn()
      .should( 'be.disabled' );
    checkbox()
      .check();
    submitBtn()
      .should( 'be.enabled' );
    submitBtn()
      .click();
  } );

  it( 'after submit should post user object', () => {
    firstNameInput()
      .type( 'John', { delay: 100 } );
    submitBtn()
      .should( 'be.disabled' );
    lastNameInput()
      .type( 'Doe', { delay: 100 } );
    submitBtn()
      .should( 'be.disabled' );
    emailInput()
      .type( 'john.doe@gmail.com', { delay: 100 } );
    submitBtn()
      .should( 'be.disabled' );
    passwordInput()
      .type( 'abcd1234?', { delay: 100 } );
    submitBtn()
      .should( 'be.disabled' );
    checkbox()
      .check();
    submitBtn()
      .should( 'be.enabled' );
    submitBtn()
      .click();
    cy.request( `https://reqres.in/api/users`, {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@gmail.com',
      password: 'abcd1234?',
      id: 'adlkjsdfkldf',
      terms: true
    } );
  } );
  
} );