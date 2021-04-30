class SanityLoginPage {

  TmProd() {
    cy.visit("https://tm.commonareas.io/Public/Login?ReturnUrl=%2F");
  }

  nvdTest() {
    cy.visit("https://nvd.ca-test.com/Public/Login?ReturnUrl=%2F");
  }
}

export default SanityLoginPage;
