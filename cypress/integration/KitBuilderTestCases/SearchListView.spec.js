import LoginPage from "../PageObject/LoginPage";
import KitBuilderPage from "../PageObject/KitBuilderPage";
import SanityLoginPage from "../PageObject/SanityLoginPage";

describe("Adding Results and Filters Element to Search List View", function () {
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
    cy.fixture("KitBuilderTestData/NewKitTypeData").then(function (KitName) {
      this.KitName = KitName;
    });
    cy.fixture("KitBuilderTestData/KitBuilderDataTypes").then(function (
      datatypes
    ) {
      this.DataType = datatypes;
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

  
  it.only("Navigating to Search List Views of Created Kit Type", function () {
    //Page Object
    const kb = new KitBuilderPage();
    const lp = new LoginPage();
    cy.title().should("eq", "Common Areas");
    lp.NVDTestKitBuilder()
    cy.wait(3000);
    //Enter created kit type name into search box
    kb.KBSearchBox(this.KitName.KitName);
    cy.wait(1000)
    //Open created kit type for adding List view elements
    cy.contains(this.KitName.KitName3).click({ force: true });
    cy.contains("Form Views").click({ force: true });
    cy.wait(2000);
    cy.contains("List Views").click({ force: true });
  });

  it.only("Adding Results Element to Search List View", function () {
    //Page object
    const kb = new KitBuilderPage();
    cy.wait(1000);
    //View Name coming form json file
    cy.contains(this.data.SearchView).click({ force: true });
    cy.wait(2000);
    cy.log(this.data.SearchView + " has been Opened");

    ///*

    //Add List Results
    cy.contains("Add List Results").click({ force: true });
    cy.wait(2000);
    //Add List Results Values coming from json file
    cy.contains(this.DataType2.Url).click({ force: true });
    cy.contains(this.DataType2.Text).click({ force: true });
    cy.contains(this.DataType2.File).click({ force: true });
    cy.contains(this.DataType2.Telephone).click({ force: true });
    cy.contains(this.DataType2.TextAera).click({ force: true });

    cy.contains(this.DataType2.Slider).click({ force: true });
    cy.contains(this.DataType2.Currency).click({ force: true });
    cy.contains(this.DataType2.Measure).click({ force: true });
    cy.contains(this.DataType2.Email).click({ force: true });
    cy.contains(this.DataType2.Address).click({ force: true });

    cy.contains(this.DataType2.Number).click({ force: true });
    cy.contains(this.DataType2.Time).click({ force: true });
    cy.contains(this.DataType2.Date).click({ force: true });
    cy.contains(this.DataType2.Toggle).click({ force: true });
    cy.contains(this.DataType2.SelectList).click({ force: true });

    cy.contains(this.DataType2.Assigning).scrollIntoView({ force: true });
    cy.wait(2000);

    cy.contains(this.DataType2.RadioSelect).click({ force: true });
    cy.contains(this.DataType2.CheckboxSelect).click({ force: true });
    cy.contains(this.DataType2.Stepper).click({ force: true });
    cy.contains(this.DataType2.UserSelector).click({ force: true });
    cy.contains(this.DataType2.ContactSelector).click({ force: true });

    cy.contains(this.DataType2.Icon).click({ force: true });
    cy.contains(this.DataType2.Inspection).click({ force: true });
    cy.contains(this.DataType2.Assigning).click({ force: true });

    cy.contains("Created On").click({ force: true });
    cy.contains("Modified On").click({ force: true });
    cy.contains("Created By").click({ force: true });
    cy.contains("Modified By").click({ force: true });
    cy.contains("ItemId For Account").click({ force: true });

    cy.wait(2000);
    cy.log("Search List View Results Element has been Checked");
    //Click on Add Select
    cy.contains("Add Selected").click({ force: true });
    cy.log("Search List View Results Element has been Selected");

    //*/

    //Click on Checkbox to make Elements Enabled Sort and Default sort for Results Elements of Search View
    //NOTE-Even number(index)(0,2,4,6,8.....46) for make element Enabled Sort
    //NOTE-odd number(index)(1,3,5,7.......46) for make element Default sort
    //add eq(index) as per requirement to make Elements Enabled Sort and Default sort
    cy.get('[role="checkbox"][type="checkbox"]').eq(0).click({ force: true });
    cy.get('[role="checkbox"][type="checkbox"]').eq(1).click({ force: true });
    cy.get('[role="checkbox"][type="checkbox"]').eq(2).click({ force: true });
    cy.get('[role="checkbox"][type="checkbox"]').eq(4).click({ force: true });
    cy.wait(1000);
    cy.log(
      "Elements has been made Enabled Sort and Default sort for Results Elements of Search View"
    );

    //Click on Save
    cy.wait(2000);
    cy.get(".mr-2 > .v-btn__content").click();
    cy.log("Search List View's Results Element has been saved");
    //Assertion close
    cy.get(".closeBtn .v-icon").click();
    cy.wait(1000);
    cy.log("Assertion closed");
    cy.wait(1000);
    //To close the opened Search List
    kb.ClickOnCrossIcon();
    cy.log("Search List has been Closed");
    cy.wait(3000);
  });

  it.only("Adding Filters Element to Search List View", function () {
    cy.wait(2000);
    //Page object
    const kb = new KitBuilderPage();
    cy.wait(3000);
    //View Name coming form json file
    cy.contains(this.data.SearchView).click({ force: true });
    cy.wait(3000);
    cy.log(this.data.SearchView + " has been Opened");

    //add Filter Elements
    cy.contains("Filters").click({ force: true });
    cy.wait(2000);
    //Add List Filters
    cy.contains("Add List Filters").click({ force: true });
    //Add List Filters Values coming from json file
    cy.contains(this.DataType2.Url).scrollIntoView({ force: true });
    cy.wait(1000);

    cy.contains(this.DataType2.Url).click({ force: true });
    cy.contains(this.DataType2.Text).click({ force: true });
    cy.contains(this.DataType2.File).click({ force: true });
    cy.contains(this.DataType2.Telephone).click({ force: true });
    cy.contains(this.DataType2.TextAera).click({ force: true });

    cy.contains(this.DataType2.Slider).click({ force: true });
    cy.contains(this.DataType2.Currency).click({ force: true });
    cy.contains(this.DataType2.Measure).click({ force: true });
    cy.contains(this.DataType2.Email).click({ force: true });
    cy.contains(this.DataType2.Address).click({ force: true });
    cy.contains(this.DataType2.Address).scrollIntoView({ force: true });
    cy.wait(2000);

    cy.contains(this.DataType2.Number).click({ force: true });
    cy.contains(this.DataType2.Time).click({ force: true });
    cy.contains(this.DataType2.Date).click({ force: true });
    cy.contains(this.DataType2.Toggle).click({ force: true });
    cy.contains(this.DataType2.SelectList).click({ force: true });
    cy.contains(this.DataType2.SelectList).scrollIntoView({ force: true });
    cy.wait(1000);

    cy.contains(this.DataType2.Assigning).scrollIntoView({ force: true });
    cy.wait(1000);

    cy.contains(this.DataType2.RadioSelect).click({ force: true });
    cy.contains(this.DataType2.CheckboxSelect).click({ force: true });
    cy.contains(this.DataType2.Stepper).click({ force: true });
    cy.contains(this.DataType2.UserSelector).click({ force: true });
    cy.contains(this.DataType2.ContactSelector).click({ force: true });

    cy.contains(this.DataType2.Icon).click({ force: true });
    cy.contains(this.DataType2.Inspection).click({ force: true });
    cy.contains(this.DataType2.Assigning).click({ force: true });
    cy.log("Search List View Filters Element has been Checked");
    //Click on Save Selected
    cy.contains("Save Selected").click({ force: true });
    cy.log("Search List View Filters Element has been Selected");

    //*/

    //Click on Save
    cy.wait(2000);
    cy.get(".mr-2 > .v-btn__content").click();
    cy.log("Search List View  Filter's Element has been saved");
    //Assertion close
    cy.get(".closeBtn .v-icon").click();
    cy.wait(3000);
    cy.log("Assertion closed");
  });
});
