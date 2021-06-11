import LoginPage from "../PageObject/LoginPage";
import KitBuilderPage from "../PageObject/KitBuilderPage";
import KitBuilderDataTypes from "../PageObject/KitBuilderDataTypes";
import SanityLoginPage from "../PageObject/SanityLoginPage";

describe("Kit Builder Data Types Details", function () {
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

    cy.fixture("KitBuilderTestData/NewKitTypeData").then(function (
      KitTypeName
    ) {
      this.KitTypeName = KitTypeName;
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
    cy.wait(2000);
    cy.title().should("eq", "Common Areas");
    lp.KitBuilder()
    cy.log("User entered in kit builder");
    cy.wait(3000);
    //Open Craeted Kit Type
    kb.KBSearchBox(this.KitTypeName.KitName3);
    cy.wait(2000);
    cy.contains(this.KitTypeName.KitName3).click({ force: true });
    cy.log("Created Kit type has been opened");
    cy.contains("Form Views").click({ force: true });
    cy.contains(this.data.NewView).click({ force: true });
    cy.wait(2000);
  });

  it.only("Content Section Data Elements", function () {
    cy.contains("Content").click({ force: true });
  });

  it.only("OneToManyRelation Data Type", function () {
    //Double click on Data Element to drag it on Canvas
    cy.get('[title="Relation 1-N"]').dblclick({ force: true });
    cy.wait(1000);
    //Page Object
    const DataType = new KitBuilderDataTypes();

    DataType.OneToManyRelation(
      this.DataType2.OneToManyRelation,
      this.DataType2.KitToBeRelated,
      this.DataType2.RelatedTableView,
      this.DataType2.RelatedEle_1,
      this.DataType2.RelatedEle_2,
      this.DataType2.RelatedEle_3,
      this.DataType2.RelatedEle_4,
      this.DataType2.RelatedEle_5,
      this.DataType2.OneToManyRelatedNew,
      this.DataType2.OneToManyRelatedEdit,
      this.DataType2.OneToManyMapView,
      this.DataType2.OneToManySearchView
    );
    cy.wait(2000);
  });

  it.only("OneToOneRelation Data Type", function () {
    //Double click on Data Element to drag it on Canvas
    cy.get('[title="Relation 1-1"]').dblclick({ force: true });
    cy.wait(1000);
    //Page Object
    const DataType = new KitBuilderDataTypes();

    DataType.OneToOneRelation(
      this.DataType2.OneToOneRelation,
      this.DataType2.KitToBeRelate,
      this.DataType2.ElementToBeRelate1,
      this.DataType2.ElementToBeRelate2,
      this.DataType2.ElementToBeRelate3,
      this.DataType2.OneToOneRelatedNew,
      this.DataType2.OneToOneRelatedEdit,
      this.DataType2.OneToOneMapView,
      this.DataType2.OneToOneSearchView
    );
    cy.wait(5000);
  });

  it.only("SquareCard Data Type", function () {
    //Double click on Data Element to drag it on Canvas
    cy.get('[title="SquareCard"]').dblclick({ force: true });
    cy.wait(1000);
    //Page Object
    const DataType = new KitBuilderDataTypes();

    DataType.SquareCard(
      this.DataType2.SquareCardName,
      this.DataType2.CardKitToBeRelated,
      this.DataType2.SquareCardTableView,
      this.DataType2.RelateEle_1,
      this.DataType2.RelateEle_2,
      this.DataType2.RelateEle_3,
      this.DataType2.RelateEle_4,
      this.DataType2.RelateEle_5,
      this.DataType2.CardRelatedNew,
      this.DataType2.CardRelatedEdit,
      this.DataType2.CardMapView,
      this.DataType2.CardSearchView
    );
    cy.wait(2000);
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
