import LoginPage from "../PageObject/LoginPage";
import KitBuilderPage from "../PageObject/KitBuilderPage";
import KitBuilderDataTypes from "../PageObject/KitBuilderDataTypes";
import SanityLoginPage from "../PageObject/SanityLoginPage";

describe("Date & Time Section Data Elements Configuration", function () {
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

    cy.wait(5000);
  });

  this.beforeEach("Fixtures file data", function () {
    Cypress.Cookies.preserveOnce(
      ".AspNet.ApplicationCookie",
      "ASP.NET_SessionId",
      "ca-cf-auth",
      "kit-detail-selected-tab",
      "jwt",
      "refreshToken",
      "jwtAccessToken"
    );

    //Globally fixtures for login creads
    cy.fixture("LoginTestData/GlobalLoginCreds").then(function (
      LogInScriptGloably
    ) {
      this.LoginCreds = LogInScriptGloably;
    });
    ///////////////////////////////////////////////////////////////////////////////////////////////

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
    

    cy.fixture("VerificationTestCasesData/KitBuilderDataTypes2").then(function (
      NewDataForElements
    ) {
      this.DataType2 = NewDataForElements;
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
    cy.contains(this.KitTypeName.KitName3).click({ force: true });
    cy.wait(1000);
    cy.log("Created Kit type has been opened");
    cy.contains("Form Views").click({ force: true });
    cy.contains(this.data.NewView).click({ force: true });
    cy.wait(1000);
  });

  it.only("Date & Time Section Data Elements", function () {
    cy.contains("Date & Time").click({ force: true });
    cy.wait(1000);
  });

  it.only("Time Data Type", function () {
    //Double click on Data Element to drag it on Canvas
    cy.get('[title="Time"]').dblclick({ force: true });
    cy.wait(1000);
    //Page Object
    const DataType = new KitBuilderDataTypes();
    DataType.Time(this.DataType2.Time);
    cy.wait(1000);
  });

  it.only("Date Data Type", function () {
    //Double click on Data Element to drag it on Canvas
    cy.get('[title="Add Date"]').dblclick({ force: true });
    cy.wait(1000);
    //Page Object
    const DataType = new KitBuilderDataTypes();
    DataType.Date(this.DataType2.Date);
    cy.wait(1000);
  });

  it.only("Reminder Data Type", function () {
    //Double click on Data Element to drag it on Canvas
    cy.get('[title="Reminder"]').dblclick({ force: true });
    cy.wait(1000);
    const DataType = new KitBuilderDataTypes();
    DataType.Reminder(this.DataType2.ReminderName);
  });

  it.only("Kit Builder Save and Publish", function () {
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
