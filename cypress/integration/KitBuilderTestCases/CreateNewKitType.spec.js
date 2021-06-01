import LoginPage from "../PageObject/LoginPage";
import KitBuilderPage from "../PageObject/KitBuilderPage";
import SanityLoginPage from "../PageObject/SanityLoginPage";

describe("Create New Kit type ", function () {
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
  });

  it('Login TestCase',function(){
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

  it("Create A New Kit Type", function () {
    const kb = new KitBuilderPage();
    const lp = new LoginPage();
    cy.wait(3000);
    cy.title().should("eq", "Common Areas");
    lp.KitBuilder();
    cy.log("User in Kit Builder");
    kb.ClickOnCreateNewKit();
    //Create Kit type Pop Up Window Assertion
    cy.contains("Create New Kit").should("be.visible");
    cy.wait(2000);
    //For Creating New Kit type commands coming form Command.js
    cy.KitLabel(this.KitTypeName.KitLabel3);
    cy.KitName(this.KitTypeName.KitName3);
    cy.KitDescription(this.KitTypeName.KitDescription3);
    cy.ApiName(this.KitTypeName.APIName3);
    cy.KitIcon();
    cy.CreateKit();
    //Create Kit type Assertion
    cy.contains("Kit Type Saved Successfully").should("be.visible");
    cy.log("New Kit Type has been Created");
  });

  it("New View Form", function () {
    const kb = new KitBuilderPage();
    cy.wait(2000)
    cy.contains(this.KitTypeName.KitName3).click({ force: true });
    cy.contains("Form Views").click({ force: true });
    cy.wait(1000);
    //Click On New Form
    kb.ClickOnNewForm();
    //New Form View Detalis commands coming form command.js
    cy.NewViewLabel(this.data.NewView);
    cy.NewViewIcon();
    cy.NewViewDescription(this.data.NewView);
    cy.SaveNewForm();
    cy.log("New View Form has been Created");
  });

  it("Edit View Form", function () {
    const kb = new KitBuilderPage();
    //Click On Edit Form
    kb.ClickOnEditForm();
    //Edit Form View Detalis commands coming form command.js
    cy.EditViewLabel(this.data.EditView);
    cy.EditViewIcon();
    cy.EditViewDescription(this.data.EditView);
    cy.SaveEditForm();
    cy.log("Edit View Form has been Created");
  });

  it("Shared View Form", function () {
    const kb = new KitBuilderPage();
    //Click On Shared Form
    kb.ClickOnSharedForm();
    //Shared Form View Detalis commands coming form command.js
    cy.SharedViewLabel(this.data.SharedView);
    cy.SharedViewIcon();
    cy.SharedViewDescription(this.data.SharedView);
    cy.SaveSharedForm();
    cy.log("Shared View Form has been Created");
  });

  it("Email View Form", function () {
    const kb = new KitBuilderPage();
    //Click On Email Form
    kb.ClickOnEmailForm();
    //Email Form View Detalis commands coming form command.js
    cy.EmailViewLabel(this.data.EmailView);
    cy.EmailViewIcon();
    cy.EmailViewDescription(this.data.EmailView);
    cy.SaveEmailForm();
    cy.log("Email View Form has been Created");
  });

  it("Map View Form", function () {
    const kb = new KitBuilderPage();
    //Click On Map Form
    kb.ClickOnScheduleForm();
    //Map Form View Detalis commands coming form command.js
    cy.MapViewLabel(this.data.MapView);
    cy.MapViewIcon();
    cy.MapViewDescription(this.data.MapView);
    cy.SaveMapForm();
    cy.log("Map View Form has been Created");
  });

  it("Schedule View Form", function () {
    const kb = new KitBuilderPage();
    //Click On Schedule Form
    kb.ClickOnScheduleForm();
    //Schedule Form View Detalis commands coming form command.js
    cy.ScheduleViewLabel(this.data.ScheduleView);
    cy.ScheduleViewIcon();
    cy.ScheduleViewDescription(this.data.ScheduleView);
    cy.SaveScheduleForm();
    cy.log("Schedule View Form has been Created");
  });

  it("CommonPlan View Form", function () {
    const kb = new KitBuilderPage();
    //Click On CommonPlan Form
    kb.ClickOnCommonPlanForm();
    //CommonPlan Form View Detalis commands coming form command.js
    cy.CommonPlanViewLabel(this.data.CommonPlanView);
    cy.CommonPlanViewIcon();
    cy.CommonPlanViewDescription(this.data.CommonPlanView);
    cy.SaveCommonPlanForm();
    cy.log("CommonPlan View Form has been Created");
  });

  it("RelatedNew View Form", function () {
    const kb = new KitBuilderPage();
    //Click On RelatedNew Form
    kb.ClickOnRelatedNewForm();
    //RelatedNew Form View Detalis commands coming form command.js
    cy.RelatedNewViewLabel(this.data.RelatedNewView);
    cy.RelatedNewViewIcon();
    cy.RelatedNewViewDescription(this.data.RelatedNewView);
    cy.SaveRelatedNewForm();
    cy.log("RelatedNew View Form has been Created");
  });

  it("RelatedEdit View Form", function () {
    const kb = new KitBuilderPage();
    //Click On RelatedEdit Form
    kb.ClickOnRelatedEditForm();
    //RelatedEdit Form View Detalis commands coming form command.js
    cy.RelatedEditViewLabel(this.data.RelatedEditView);
    cy.RelatedEditViewIcon();
    cy.RelatedEditViewDescription(this.data.RelatedEditView);
    cy.SaveRelatedEditForm();
    cy.log("RelatedEdit View Form has been Created");
    cy.contains("RelatedEditView").scrollIntoView({ force: true });
  });

  it("List Views(TableList,SearchList,TimelineList)", function () {
    const kb = new KitBuilderPage();
    // cy.title().should("eq", "Common Areas");
    // cy.wait(5000);
    // kb.AdminUrl();
    // cy.wait(5000);
    // kb.ClickOnKitBuilder();
    // cy.wait(5000);
    // cy.contains(this.data.KitName).click({ force: true });
    // cy.contains("Form Views").click({ force: true });
    // cy.wait(3000);

    cy.contains("List Views").click({ force: true });
    cy.wait(1000);

    //const kb = new KitBuilderPage();

    //Table List View Detalis commands coming form command.js
    kb.ClickOnTableList();
    cy.TableListViewLabel(this.data.TableView);
    cy.TableListViewDescription(this.data.TableView);
    cy.TableListViewIcon();
    cy.SaveTableList();
    cy.log("Table List View has been Created");

    //Search ListView Detalis commands coming form command.js
    kb.ClickOnSearchList();
    cy.SearchListViewLabel(this.data.SearchView);
    cy.SearchListViewDescription(this.data.SearchView);
    cy.SearchListViewIcon();
    cy.SaveSearchList();
    cy.log("Search List View has been Created");

    //Timeline ListView Detalis commands coming form command.js
    kb.ClickOnTimelineList();
    cy.TimelineListViewLabel(this.data.TimelineView);
    cy.TimelineListViewDescription(this.data.TimelineView);
    cy.TimelineListViewIcon();
    cy.SaveTimelineList();
    cy.log("Timeline List View has been Created");
    cy.contains("TimelineView").scrollIntoView({ force: true });
  });
});
