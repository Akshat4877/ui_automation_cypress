import LoginPage from "../PageObject/LoginPage";
import KitBuilderPage from "../PageObject/KitBuilderPage";
import SanityLoginPage from "../PageObject/SanityLoginPage";
import RolesAndRestrictionsPage from "../PageObject/RolesAndRestrictionsPage"
import KitTypePage from "../PageObject/KitTypePage";

describe("Roles And Restrication For Common Plan(ModifyAll)", function () {
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

    });

    it.only('Login TestCase',function(){
        const lp = new LoginPage();
        const slp = new SanityLoginPage();
        //Navigate to url
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

    it.only("Navigate to Roles and Restrictions Page For (ModifyAll)Restriction ", function () {
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

    it.only('Select kit type to Configure Restriction For Common Plan(ModifyAll)', function () {
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

    it.only('Apply Modify All Restriction', function () {

        cy.xpath('//*[text() ="Common Plans"]')
            .within(($Details) => {

                cy.xpath('//*[text() ="Common Plans"]').scrollIntoView({ force: true })
                cy.wait(2000)
                //Click on Modify All
                cy.xpath("//*[@class='v-chip__content' and contains(text(),'Modify All')]").eq(0)
                    .click({ force: true })
                cy.wait(2000)
                cy.xpath('//*[text() ="SAVE"]').click({ force: true })
                cy.wait(3000)

            })

    })

    it.only('Navigate to UI to Validate(ModifyAll)Restriction', function () {
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
        //Navigate to url
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

    it.only('Click and Open Common Plans Tab',function(){
        //Click and open Common Plans Tab
        cy.contains("Common Plans ").click({ force: true });
        cy.wait(1000)
    })

    it.only("Create A Common Plan", function () {
        
        //Click on Add Icon
        cy.get(
          " div.tab--content.col div.v-window.tab-content-wrapper.v-item-group.theme--light.v-tabs-items div.v-window__container div.v-window-item.v-window-item--active:nth-child(7) div.wrapper-tabs-content.v-card.v-sheet.theme--light div.v-card__text.kit-documents.fill-height div.row.container-details.fluid.fill-height.kit-details-space-planner.pa-8 div.details-wrapper.fill-height.col div.pr-4.col-sm-12.col:nth-child(2) div.fill-height div.container.xs12.mt-2.container--fluid.grid-list-lg div.row.justify-space-between:nth-child(1) div.col-md-5.col-lg-3.col-12 div.space-planner-card--add-new.hidden-sm-and-down.mb-2.v-card.v-sheet.v-sheet--tile.theme--light div.row.space-planner-card-container.pa-2.card-align.align-center div.d-flex.col.col-12 button.button-w-borders.ml-4.addBtn.v-btn.v-btn--flat.v-btn--text.theme--light.v-size--default > span.v-btn__content"
        ).click({ force: true });
        cy.log("Common Plan Board has been Opened");
        //Common plan board assertion
        cy.contains(" Layout ").should("be.visible");
        cy.contains(" Schedule ").should("be.visible");
        cy.contains(" View ").should("be.visible");
        //Creating Plan
        cy.get('[placeholder="Plan Name"]').type('Common Modify All Restri');
        //Click on save btn to create common plan
        cy.get(".new-kit-space-planner-wrapper__save > .v-btn__content").click({
          force: true,
        });
        cy.log("Common Plan created and Saved");
        cy.contains("Plan created").should("be.visible");
        cy.wait(1000);
        //Exit the Plan
        cy.get(".new-kit-space-planner-wrapper__exit path").click({ force: true });
        cy.log("Taken Exit form Layout Mode");
        cy.contains('Common Modify All Restri').should("be.visible");
        cy.log("Common Plan Created");
        cy.wait(1000);
    });

    it.only('Click and open a Common plan',function(){

        //Click first common plan in the common plan tab
        cy.get('.space-planner-card:nth-child(1) .space-planner-card--block')
        .click({force:true});
        cy.wait(2000)
        //Common plan board assertion
        cy.contains(" Layout ").should("be.visible");
        cy.contains(" Schedule ").should("be.visible");
        cy.contains(" View ").should("be.visible");
        cy.wait(3000)
       
    })

    it.only('Validate (ModifyAll)Restriciton',function(){

        //MOdify plan name
        cy.get('[placeholder="Plan Name"]').type('  Modify');
        //Click on save btn to create common plan
        cy.get(".new-kit-space-planner-wrapper__save > .v-btn__content").click({
             force: true,
        });
        cy.contains(" Can't update plan ").should('be.visible')
        cy.wait(2000)

    })

    it.only('Exit the common Plan and Again Validate',function(){

        //Exit the Plan
        cy.wait(1000)
        cy.get(".new-kit-space-planner-wrapper__exit path").click({ force: true });
        cy.log("Taken Exit form Layout Mode");
        cy.contains('Common Modify All Restri').should("be.visible");
        cy.wait(1000)

    })
    
})