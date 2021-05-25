class SanityLoginPage {

  LoginUrl(Url) {
    cy.visit(Url);
    return this;
  }

  BaseUrl(Url) {
    cy.visit(Url);
    return this;
  }

}

export default SanityLoginPage;
