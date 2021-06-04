import LoginPage from "../PageObject/LoginPage";
import KitBuilderPage from "../PageObject/KitBuilderPage";
import SanityLoginPage from "../PageObject/SanityLoginPage";

describe("All List Views Configuration for Created Kit Type", function () {
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

  it.only('Naviagate To KitBuilder',function(){
    //Page Object
    const lp = new LoginPage();
    cy.wait(2000);
    cy.title().should("eq", "Common Areas");
    lp.KitBuilder();
    cy.log("User in Kit Builder");
    cy.wait(2000)
  })

  it.only('Open Created Kit Type',function(){
    cy.wait(2000)
    cy.contains(this.KitTypeName.KitName3).click({ force: true });
    cy.contains("Form Views").click({ force: true });
    cy.wait(1000);
  })

  it.only('Open List Views',function(){
    //Click on List view Tab
    cy.contains("List Views").click({ force: true });
    //ListView Tab Assertion
    cy.contains('List View Templates').should('be.visible')
    cy.wait(1000);
  })

  it.only("TableList View", function () {
    //Page Object
    const kb = new KitBuilderPage();
    //Table List View Detalis commands coming form command.js
    kb.ClickOnTableList();
    cy.contains('Create Table List View').should('be.visible')
    cy.TableListViewLabel(this.data.TableView);
    cy.TableListViewDescription(this.data.TableView);
    cy.TableListViewIcon();
    cy.SaveTableList();
    cy.log("Table List View has been Created");
  })

  it.only('SearchList View',function(){
    //Page Object
    const kb = new KitBuilderPage();
    //Search ListView Detalis commands coming form command.js
    kb.ClickOnSearchList();
    cy.contains('Create Search Lists View').should('be.visible')
    cy.SearchListViewLabel(this.data.SearchView);
    cy.SearchListViewDescription(this.data.SearchView);
    cy.SearchListViewIcon();
    cy.SaveSearchList();
    cy.log("Search List View has been Created");
 
   })
   it.only('TimelineList View',function(){
     //Page Object
     const kb = new KitBuilderPage();
     //Timeline ListView Detalis commands coming form command.js
     kb.ClickOnTimelineList();
     cy.contains('Create Timeline List View').should('be.visible')
     cy.TimelineListViewLabel(this.data.TimelineView);
     cy.TimelineListViewDescription(this.data.TimelineView);
     cy.TimelineListViewIcon();
     cy.SaveTimelineList();
     cy.log("Timeline List View has been Created");
  
    })
    it.only('SharedItem List View',function(){
     //Page Object
     const kb = new KitBuilderPage();
     //SharedItem ListView Detalis commands coming form command.js
     kb.ClickOnSharedItemList();
     cy.contains('Create Shared Item List View').should('be.visible')
     cy.SharedItemListViewLabel(this.data.SharedItemView);
     cy.SharedItemListViewDescription(this.data.SharedItemView);
     cy.SharedItemListViewIcon();
     cy.SaveSharedItemListView();
     cy.log("SharedItem List View has been Created");
     cy.contains("TimelineView").scrollIntoView({ force: true });
    })
});
