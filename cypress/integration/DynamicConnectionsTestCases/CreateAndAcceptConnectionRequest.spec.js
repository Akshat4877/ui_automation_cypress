import SignUpPage from "../PageObject/SignUpPage";
import LoginPage from "../PageObject/LoginPage";
import SanityLoginPage from "../PageObject/SanityLoginPage";

describe("Login for new User than Create A new Connection and Accept the request ", function () {
  this.beforeEach(
    "Getting the Dynmaically Generated data through Fixtures file",
    function () {
      Cypress.Cookies.preserveOnce(
        ".AspNet.ApplicationCookie",
        "ASP.NET_SessionId",
        "ca-cf-auth",
        "kit-detail-selected-tab",
        "jwt",
        "refreshToken",
        "jwtAccessToken"
      );

      // cy.eyesOpen({
      //   appName: "Common Aera UI Automation",
      //   testName: "Accept the New User Connection Request",
      // });

       //Globally fixtures for login creads
       cy.fixture("LoginTestData/GlobalLoginCreds").then(function (
       LogInScriptGloably
       ) {
       this.LoginCreds = LogInScriptGloably;
       });
     ///////////////////////////////////////////////////////////////////////////////////////////////////////////

      //debugger;
      cy.fixture("ConnectionsDynamicTestData/ConnectionUserCredentials").then(
        //cy.fixture("VerificationTestCasesData/AcceptRequestUserData").then(
        function (JsonData) {
          this.Credentials = JsonData;
          cy.log(this.Credentials.UserEmail);
          cy.log(this.Credentials.Fname);
          cy.log(this.Credentials.Lname);
        }
      );
      cy.viewport(1000, 600);
    }
  );

  it.only('Login TestCase',function(){
    const lp = new LoginPage();
    const slp = new SanityLoginPage();
    slp.LoginUrl(this.LoginCreds.CAUrl)
    //Handling Alert
    cy.on("window:confirm", () => {
      cy.log("Alert has been Handled");
    });
    //Login Assertions
    cy.contains(" Log In ").should("be.visible");
    //Enter credentials
    lp.EnterEmail(this.LoginCreds.username);
    lp.EnterPassword(this.LoginCreds.Password);
    lp.Submit();
    cy.log("User has been Logged In into the application");
    cy.wait(5000)
  })

  it.only("Create a new Connection ", function () {
    const lp = new LoginPage();
    //cy.eyesCheckWindow("Logged into the application");
    lp.PlusIcon();
    lp.ConnectionIcon();
    cy.wait(2000);
    //cy.eyesCheckWindow();
    //Connection Custom Commands coming from commands.js
    cy.ConnectionFirstName(this.Credentials.Fname);
    cy.ConnectionLastName(this.Credentials.Lname);
    cy.ConnectionEmail(this.Credentials.UserEmail);
    // cy.screenshot("User Connection Details");
    cy.wait(7000);
    //cy.eyesCheckWindow("Connection Details");
    cy.log("Connection detalis has been Entered");
    //click on DropDown(This DropDown feature has be removed from this connection module)
    cy.get(
      "#inspire > div.v-dialog__content.v-dialog__content--active > div > div > div > div.row.position-relative.contact-detail-wrapper.md11.fill-height.new-connection > div.base-layout-main-content.d-flex.pa-0.px-8.py-4.col > div.row.wrapper-content.new-connection.py-6 > div > div.v-input.theme--light.v-text-field.v-text-field--is-booted.v-text-field--enclosed.v-text-field--outlined.v-select.v-select--chips.v-select--is-multi > div > div.v-input__slot > div.v-select__slot > div.v-input__append-inner > div"
    ).click({ force: true });
    //Click on group
    cy.wait(1000)
    cy.get('.v-list-item:nth-child(1) .v-input--selection-controls__ripple')
    .click({force:true});
    cy.wait(1000)
    //cy.eyesCheckWindow();
    //Click on Save btn
    cy.get(".button-pop-ups--size").click();
    cy.log("Connection Request has been sent successfully");
    //cy.screenshot("Connection Request has been sent successfully");
    cy.wait(5000);
  });

  it.only("Login to appLication for Accepting the Request", function () {
    //PageObjects
    const slp = new SanityLoginPage();
    const lp = new LoginPage();
    slp.BaseUrl();
    lp.EnterEmail(this.Credentials.UserEmail);
    lp.EnterPassword("1234567Aa");
    //cy.screenshot("User Details-To Logged In(Accepting Connection Request");
    cy.wait(10000);
    //cy.eyesCheckWindow("Logging into the application for new User");
    lp.Submit();
    cy.wait(10000);
    cy.log("Users has been logged in successfully");
    //cy.eyesCheckWindow("Getting connection Request");
    //Click On Connection Request notification Icon
    cy.get(".menu-items-icon:nth-child(2) > path").click();
    //cy.eyesCheckWindow("Connection Request");
    //cy.screenshot("Connection Request");
    cy.wait(10000);
    //click to Accept the Request
    cy.get(".green--text").click();
    //cy.get(':nth-child(4) > .v-btn > .v-btn__content > .v-icon').click()
    cy.log("Connection Request has been accepted");
    //cy.eyesCheckWindow("Request Accepted");
    //Click On HMB icon
    cy.get(".v-btn__content > .theme--dark").click();
    //Click on Connection
    cy.get(".v-list-item:nth-child(3) .v-list-item__title").click();
    //cy.eyesCheckWindow("Connection has been added");
    cy.wait(5000);
    //Assertion and Click On Created Connection
    //cy.contains("Kali Stanley").should("be.visible").click({ force: true });
    cy.log("Connection Created");
    //cy.screenshot("Connection Created");
    //cy.eyesCheckWindow();
    cy.wait(7000);
  });
  // this.afterAll(function () {
  //   cy.eyesClose();
  // });
});
