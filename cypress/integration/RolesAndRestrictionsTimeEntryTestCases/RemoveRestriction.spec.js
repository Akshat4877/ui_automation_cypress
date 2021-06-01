import LoginPage from "../PageObject/LoginPage";
import KitBuilderPage from "../PageObject/KitBuilderPage";
import SanityLoginPage from "../PageObject/SanityLoginPage";
import RolesAndRestrictionsPage from "../PageObject/RolesAndRestrictionsPage"

describe("Roles And Restrication For Time Entries(Remove)", function () {
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

    it.only("Navigate to Roles and Restrictions Page For (Remove)Restriction ", function () {
        const kb = new KitBuilderPage();
        const lp = new LoginPage();
        const RoleRestr = new RolesAndRestrictionsPage();
        cy.wait(3000);
        cy.title().should("eq", "Common Areas");
        lp.KitBuilder();
        cy.url().should('include', '/ClientAdmin/KitBuilder#/')
        cy.log("User in Kit Builder");
        //Click Roles and Restirction
        RoleRestr.RolesAndRestrictionsPage()
        cy.url().should('include', '/ClientAdmin/KitBuilder#/roles')
    });

    it.only('Select kit type to Configure Restriction For Time Entries(Remove)', function () {
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

    it.only('Apply Remove Restriction', function () {

        cy.xpath('//*[text() ="Time"]')
            .within(($Details) => {
                //Click on Remove
                cy.xpath('//*[text() ="Time"]').scrollIntoView({ force: true })
                cy.wait(2000)
                cy.xpath("//*[@class='v-chip__content' and contains(text(),'Remove')]").eq(11)
                    .click({ force: true })
                cy.xpath('//*[text() ="SAVE"]').click({ force: true })
                cy.wait(3000)

            })
    })

    it.only('Navigate to UI to Validate(Remove)Restriction', function () {
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

    it.only('Open Time Entries Tab',function(){
    //Click and open Time Entries Tab
    cy.contains(" Time Entries ").click({ force: true });
    cy.wait(1000);
    })

    it.only("Add a Time Entries", function () {
    
        //Click on Add for Time Entries
        cy.get(".ml-4 > .v-btn__content").click({ force: true });
        //Assertion validation
        cy.contains("Time Entry").should("be.visible");
        //Click on + icon
        cy.get(".add-new--icon").click({ force: true });
        //Assertion validation
        cy.contains(" Add New Time Type ").should("be.visible");
        cy.wait(2000);
        cy.get('[placeholder="Label"]')
          .eq(0)
          .type('Role');
        cy.get('[placeholder="Description"]').type('Time Restriction');
        //Click on Save
        cy.get(".col-4 .v-btn__content").first().click({ force: true });
        //Assertion validation
        cy.contains(" New Time Type saved ").should("be.visible");
        cy.wait(2000);
        //Click on Total hours
        cy.get('[name="totalHours"]').type('8');
        cy.wait(2000)
        //Click on select date
        cy.get('[name="startdate"]').click({ force: true });
        cy.wait(2000);
        //Select Date
        cy.xpath("//div[contains(text(),'25')]").eq(0).click({ force: true });
        //Click on OK
        cy.wait(1000);
        cy.xpath("//span[contains(text(),'OK')]").first().click({ force: true });
        cy.wait(2000);
        cy.get('[placeholder="Add a Description"]')
        .type('Roles and Restriction for Remove Time Entry');
        //Click on Save
        cy.get(".col-3 > .ca-button-green > .v-btn__content").click({
          force: true,
        });
        //Assertion validation
        cy.contains(" Time Entry details saved ").should("be.visible");
        cy.log("Time Entry details saved");
        cy.wait(2000);
      });

     it.only('Validate (Remove)Restriciton in Time Entries Tab',function(){
     //Click on Add for Time Entries
     cy.get('.time-entry:nth-child(1) > .time-entry__delete path')
     .click({force:true});
     cy.contains(' You are not permitted to remove any time entry for '+'"'+this.KitTypeName.KitName3+'"'+' please contact your administrator to remove this restriction ')
     .should('be.visible')
     cy.wait(2000)
    })
})