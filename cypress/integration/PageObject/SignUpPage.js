class SignUpPage {

  SignUp() {
    const sb = cy.contains("Start a free account");
    sb.click();
  }

  mailinatorSite() {
    cy.visit("https://www.mailinator.com/");
  }

  EnterMailinatorEmail(value) {
    const field = cy.get('#search');
    field.type(value);
    return this;
  }

  Go() {
    const go = cy.get('[value="Search for public inbox for free"]');
    go.click();
  }

  ActiveAccount() {
    cy.get("#html_msg_body").then(($iframe) => {
      const $a = $iframe.contents().find("a");
      cy.wrap($a).contains("Activate Account").click();
    });
  }

  ResetPassword() {
    cy.get("#msg_body").then(($iframe) => {
      const $a = $iframe.contents().find("a");
      cy.wrap($a).contains("Reset your password").click();

    });
  }
}

export default SignUpPage;
