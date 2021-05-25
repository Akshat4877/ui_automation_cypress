import LoginPage from "../PageObject/LoginPage";
import KitBuilderPage from "../PageObject/KitBuilderPage";
import SanityLoginPage from "../PageObject/SanityLoginPage";
import RolesAndRestrictionsPage from "../PageObject/RolesAndRestrictionsPage"


describe("Roles And Restrication For Time Entries(View)", function () {
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
      ////////////////////////////////////////////////////////////////////////////////////////////

        cy.fixture("KitBuilderTestData/NewKitTypeData").then(function (
            KittypeName
        ) {
            this.KitTypeName = KittypeName;
        });

        cy.fixture("RolesAndRestrictionsTestData/NewRole").then(function (
            RolesAndRestrictions
        ) {
            this.Roledata = RolesAndRestrictions;
        });


        cy.fixture("VerificationTestCasesData/KitBuilderDataTypes2").then(function (
            NewDataForElements
        ) {
            this.DataType2 = NewDataForElements;
        });

        cy.fixture("KitTypeTestData/NewKitItemDataValues").then(function (
            KitDataEle
          ) {
            this.NewKitItemData = KitDataEle;
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

    it.only("Navigate to Roles and Restrictions Page For(View) Restriction ", function () {
        const kb = new KitBuilderPage();
        const lp = new LoginPage();
        const RoleRestr = new RolesAndRestrictionsPage();
        cy.wait(3000);
        cy.title().should("eq", "Common Areas");
        lp.NVDTestKitBuilder();
        cy.url().should('include', '/ClientAdmin/KitBuilder#/')
        cy.log("User in Kit Builder");
        //Click Roles and Restirction
        RoleRestr.RolesAndRestrictionsPage()
        cy.url().should('include', '/ClientAdmin/KitBuilder#/roles')
    });

    it.only('Select kit type to Configure Restriction For TimeEntries(View)', function () {
        const RoleRestr = new RolesAndRestrictionsPage();
        cy.wait(2000)
        cy.xpath('//*[text()="edit"]').first().click({ force: true })
        cy.wait(2000)
        //Validation of created role
        cy.xpath('//div[@class="row d-flex"]//div[@class="v-text-field__slot"]//input').eq(0)
            .invoke('val').then((text) => {
                cy.log(text)
                expect(text).equal(this.Roledata.RoleName)
            })
        cy.get('[href="#PermissionsTab"]').click({ force: true })
        //Assertion
        cy.contains('Configure Restriction').should('be.visible')
        RoleRestr.clickOnKitType();
        cy.wait(1000)
        //Click on Kit type for Restriction
        cy.contains(this.KitTypeName.KitName3).click({ force: true })
        cy.wait(1000)
    })

    it.only('Apply View Restriction', function () {

        cy.xpath('//*[text() ="Time"]')
            .within(($Details) => {
                cy.xpath('//*[text() ="Time"]').scrollIntoView({ force: true })
                cy.wait(1000)
                //Click on View
                cy.xpath("//*[@class='v-chip__content' and contains(text(),'View')]").eq(12)
                    .click({ force: true })
                cy.wait(2000)
                cy.xpath('//*[text() ="SAVE"]').click({ force: true })
                cy.wait(3000)

            })

    })

    it.only('Navigate to UI to Validate(View)Restriction', function () {
        //Page Object
        const slp = new SanityLoginPage();
        const lp = new LoginPage();
        //Navigate to url
        slp.LoginUrl(this.LoginCreds.CAUrl)
        //Handling Alert
        cy.on("window:confirm", () => {
            cy.log("Alert has been Handled");
        });
        //Assertion
        cy.title().should("eq", "Common Areas");
        cy.wait(10000)
    })

    it.only('Clear App Cache',function(){
        const lp = new LoginPage();
        lp.ClickOnHomePageAdmin();
        cy.wait(1000)
        //clear app cache
        cy.contains('Clear App Cache').click({force:true})
        cy.wait(2000)
    })

    it.only("Sign Out for logged in user", function () {
        //Click on admin
        cy.get('[name="your-profile"]').click({ force: true });
        cy.wait(2000);
        cy.contains("Sign Out").click({ force: true });
        cy.wait(5000);
        //Log out validation assertion
        cy.contains(" Log In ").should("be.visible");
        cy.url().should("include", "/Public/Login?");
        cy.log("User has been sign out");
      });

      it.only('Logged In Again into the application', function () {

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

    it.only('Open kit item from left panel', function () {
        const lp = new LoginPage();
        //Click on Hamburger Icon
        lp.HMBIcon();
        cy.wait(2000)
         //Open KitType from left panel
         cy.xpath("//*[contains(@class, 'd-flex col-9')]//*[text() = '" + this.KitTypeName.KitName3 + "']")
         .click({force: true});
         cy.wait(2000)
        //Click the kit item
        cy.xpath('//div[@class="row-list-item-details--content py-2 justify-center col col-10 truncate-wrapper"]')
        .eq(1).click({ force: true })
        cy.wait(2000)
    })

    it.only('Asides tabs validation',function(){
    //Click on Files tab  
    cy.contains(" Files ").click({ force: true });
    cy.wait(2000);
    //Contributors Tab
    cy.contains(" Contributors ").click({ force: true });
    cy.wait(1000);
    //Click on common plan tab
    cy.contains(" Common Plans ").click({ force: true });
    cy.wait(1000)
    })

    it.only('Validate (View)Restriciton for Time Entries Tab',function(){
        //Time Entries Tab should not be visible/exist
        cy.wait(1000);
        //should not click because the Time Entries tab should not there
        cy.contains(" Time Entries ").should('not.exist') 
        cy.log('Time Entries tab is not exist')
        cy.wait(1000)
    })
  
})