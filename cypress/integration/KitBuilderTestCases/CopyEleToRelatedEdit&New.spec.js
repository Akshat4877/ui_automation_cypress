import LoginPage from "../PageObject/LoginPage";
import KitBuilderPage from "../PageObject/KitBuilderPage";
import SanityLoginPage from "../PageObject/SanityLoginPage";

describe("Copy New Form Elements to the RelatedNew and RelatedEdit form View", function () {
  this.beforeAll(function () {
    
    Cypress.Cookies.preserveOnce(
      ".AspNet.ApplicationCookie",
      "ASP.NET_SessionId",
      "ca-cf-auth",
      "kit-detail-selected-tab",
      "jwt",
      "refreshToken",
      "jwtAccessToken"
    );
    cy.wait(3000);
  });

  //Globally fixtures for login creads
  cy.fixture("LoginTestData/GlobalLoginCreds").then(function (
    LogInScriptGloably
  ) {
    this.LoginCreds = LogInScriptGloably;
  });
  ///////////////////////////////////////////////////////////////////////////////////////////////

  this.beforeEach("Fixtures file data", function () {

    cy.fixture("KitBuilderTestData/FormViewsNameData").then(function (
      KitTypeFormViewsNames
    ) {
      this.data = KitTypeFormViewsNames;
    });
    cy.fixture("KitBuilderTestData/NewKitTypeData").then(function (
      KittypeName
    ) {
      this.KitTypeName = KittypeName;
    });
    cy.fixture("KitBuilderTestData/KitBuilderDataTypes").then(function (
      datatypes
    ) {
      this.DataType = datatypes;
    });
  });

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

  it.only("Navigating to New Form of Created Kit Type", function () {
    const kb = new KitBuilderPage();
    const lp = new LoginPage();
    cy.title().should("eq", "Common Areas");
    lp.KitBuilder()
    cy.log("User entered in kit builder");
    //Open Craeted Kit Type
    kb.KBSearchBox(this.KitTypeName.KitName3);
    cy.wait(2000);
    cy.contains(this.KitTypeName.KitName).click({ force: true });
    cy.wait(1000);
    cy.contains("Form Views").click({ force: true });
    cy.wait(1000);
    cy.contains(this.data.NewView).click({ force: true });
    cy.wait(1000);
  });

  it.only("Copy the Elements into Related New form", function () {
    cy.wait(2000);
    //Click on Forms Drop down
    cy.get(
      "#app > div > div > div:nth-child(1) > header > div > div:nth-child(3) > div > div > div > div > div.v-select__slot > div > div"
    ).click({ force: true });
    cy.wait(2000);
    //View Name coming form json file
    cy.contains(this.data.RelatedNewView).click({ force: true });
    cy.wait(5000);
    //Copy from
    cy.get(".align-content-center > .mr-2").click({ force: true });
    cy.get(
      "#app > div.v-application--wrap > div > div:nth-child(1) > div.v-dialog__container.copy-from-modal > div > div > div > div.container.new-detailview-container > div > div > form > div.row.align-center.justify-center > div:nth-child(8) > div > div > div.col.col-10 > p"
    ).scrollIntoView();

    //Click on New Form to copy
    //cy.get(".col:nth-child(8) .mr-2").click({ force: true });
    cy.get(
      "div.row.align-center.justify-center > div:nth-child(8) > div > div > div.pt-6.col.col-12 > p"
    ).click({ force: true });
    cy.wait(2000);
    cy.log("New Form View Elements has been Copied into RelatedNew Form");

    //Kit Builder Save
    cy.get(".mr-2:nth-child(2) > .v-btn__content").click({ force: true });
    //save assertion closed
    cy.get(".v-btn__content > .theme--dark").click({ force: true });
    cy.log("Kit builder(New Form) has been Saved");
    cy.wait(3000);
    //Click on  Publish
    cy.contains("Publish").click({ force: true });
    //cy.get(".v-btn__content > .theme--dark").click();
    cy.log("Kit builder(New Form) has been Published");
    cy.wait(2000);
  });

  it.only("Copy the Elements into Related Edit form", function () {
    cy.wait(2000);
    //Click on Forms Drop down
    cy.get(
      "#app > div > div > div:nth-child(1) > header > div > div:nth-child(3) > div > div > div > div > div.v-select__slot > div > div"
    ).click({ force: true });
    cy.wait(2000);
    //View Name coming form json file
    cy.contains(this.data.RelatedEditView).click({ force: true });
    cy.wait(5000);
    //Copy from
    cy.get(".align-content-center > .mr-2").click({ force: true });
    cy.get(
      "#app > div.v-application--wrap > div > div:nth-child(1) > div.v-dialog__container.copy-from-modal > div > div > div > div.container.new-detailview-container > div > div > form > div.row.align-center.justify-center > div:nth-child(8) > div > div > div.col.col-10 > p"
    ).scrollIntoView();

    //Click on New Form to copy
    cy.get(".col:nth-child(8) .mr-2").click({ force: true });
    cy.wait(2000);
    cy.log("New Form View Elements has been Copied into RelatedEdit Form");

    //Kit Builder Save
    cy.get(".mr-2:nth-child(2) > .v-btn__content").click({ force: true });
    //save assertion closed
    cy.get(".v-btn__content > .theme--dark").click({ force: true });
    cy.log("Kit builder(New Form) has been Saved");
    cy.wait(3000);
    //Click on  Publish
    cy.contains("Publish").click({ force: true });
    //cy.get(".v-btn__content > .theme--dark").click();
    cy.log("Kit builder(New Form) has been Published");
    cy.wait(2000);
  });
});
