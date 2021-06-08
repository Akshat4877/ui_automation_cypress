class LoginPage {

  BaseTest() {
    cy.visit("https://app.ca-test.com/Public/Login?ReturnUrl=%2F");

  }

  ProdBaseTest() {
    cy.visit("https://commonareas.io/Public/Login?ReturnUrl=%2F");

  }

  KitBuilder() {
    cy.visit("https://joesplayground.ca-test.com/ClientAdmin/KitBuilder#/");
  }

  EnterEmail(value) {
    const field = cy.get("#UserName");
    field.clear();
    field.type(value);
    return this;
  }

  EnterPassword(value) {
    const field = cy.get("#Password");
    field.clear();
    field.type(value);
    return this;
  }

  Submit() {
    const button = cy.get("#login_button");
    button.click();
  }

  PlusIcon() {
    const btn = cy.get(
      ".fill-height > .plus-button > .v-btn__content > .icon > .inline-svg"
    );
    btn.click();
  }

  HMBIcon() {

    const btn = cy.get(".v-btn__content > .theme--dark");
    btn.first().click({ force: true });
  }

  ConnectionIcon() {
    const btn = cy.get(".new-contact #Layer_1");
    btn.click();
  }

  ProfileIcon() {
    const button = cy.get("img");
    button.click();
  }

  ClickOnHomePageAdmin() {
    const button = cy.get(
      '[name="your-profile"]'
    );
    button.click();
  }


  ClickOnAdmin() {
    const button = cy.get(
      ".custom-v-btn-nav-list-item:nth-child(5) > .v-list-item__title"
    );
    button.click();
  }

  RefreshBtn() {
    cy.get(".button__reset-filters > .v-btn__content").click({ force: true });
  }

  FilterIcon() {
    const btn = cy.get(".fill-height > .v-btn #Layer_1");
    btn.click({ force: true });
  }
}

export default LoginPage;
