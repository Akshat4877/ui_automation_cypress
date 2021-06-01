import LoginPage from "../PageObject/LoginPage";
import KitBuilderPage from "../PageObject/KitBuilderPage";
import SanityLoginPage from "../PageObject/SanityLoginPage";
import RolesAndRestrictionsPage from "../PageObject/RolesAndRestrictionsPage"
import KitTypePage from "../PageObject/KitTypePage";

describe("Roles And Restrication For Reminders(Remove)", function () {
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

    it.only('Select kit type to Configure Restriction For Reminders(Remove)', function () {
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

        cy.xpath('//*[text() ="Reminders"]')
            .within(($Reminders) => {
                cy.xpath('//*[text() ="Reminders"]').scrollIntoView()
                cy.wait(1000)
                //Click on Remove
                cy.xpath("//*[@class='v-chip__content' and contains(text(),'Remove')]").eq(3)
                    .click({ force: true })
                cy.wait(2000)
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

      it.only('Logged In Again for into the application', function () {
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

    it.only('Open kit item from left panel',function(){
        //Page object
        const lp = new LoginPage();
        //Click on Hamburger Icon
        lp.HMBIcon();
        //Open KitType from left panel
        cy.xpath("//*[contains(@class, 'd-flex col-9')]//*[text() = '" + this.KitTypeName.KitName3 + "']")
            .click({ force: true, });
        cy.log("Kit Type has been OPened");
        cy.wait(5000)
        //Click on First kit item of kit type to open edit view
        cy.log("Kit Item Detail View has been Opened");
        //Validation assertion for details view
        cy.get(".kits-landing--header-title").should(
            "have.text",
            " Recently Viewed "
        );
        cy.wait(5000)
    })

    it.only('Open Details View',function(){

        cy.wait(2000)
        //Click on the first Kit Item in Kit item list view
        cy.xpath('//div[@class="row-list-item-details--content py-2 justify-center col col-10 truncate-wrapper"]')
        .eq(0).click({ force: true })
        cy.wait(5000)
        //Scroll to Reminder Control
        cy.contains(' SET REMINDER ').scrollIntoView({force:true})
        cy.wait(2000)
    })

    it.only('Configure a remider',function(){

    //Click to open Reminder POPUP
    cy.contains("SET REMINDER").click({ force: true });
    cy.contains('Reminder').should('be.visible')
    cy.log("Reminder Pop Up has been Opened for One time");
    cy.wait(2000);

    //Reminder Tittle
    cy.get('[items="Recurring,One-Time"]').type('Roles');
    cy.wait(1000);
    //Reminder Type-->Click on DropDown
    cy.contains("arrow_drop_down").first().click({ force: true });
    //Reminder for One-Time
    cy.contains('One-Time')
    .first()
    .click({ force: true });

    //Reminder Start Date
    cy.contains("Reminder Date").click({ force: true });
    //Select date
    cy.xpath("//div[@class='v-btn__content'][contains(text(),'30')]")
      .first()
      .click({ force: true });
    cy.wait(2000);
    //Click on OK to save Date
    cy.xpath("//span[contains(text(),'Ok')]").first().click({ force: true });
    cy.log("Date has been selected for Reminder Start Date");
    cy.wait(3000)

    //Reminder Time
    //Click on Reminder Time POP up
    cy.get(
      ".pop-up-reminder--content > div > div.row.d-flex > div:nth-child(2) > div > div.v-input.px-2.select--medium.v-input--is-readonly.v-input--dense.theme--light.v-text-field.v-text-field--is-booted.v-text-field--enclosed.v-text-field--outlined > div > div.v-input__slot > div.v-text-field__slot input"
    ).click({ force: true });
    cy.wait(1000);
    //Add Time
    cy.xpath(
      "//span[@class='v-time-picker-clock__item']//span[contains(text(),'5')]"
    ).click({ force: true });
    cy.wait(1000);
    //cy.xpath("//span[contains(text(),'55')]").click({ force: true });
    cy.xpath(
      "//span[@class='v-time-picker-clock__item']//span[contains(text(),'55')]"
    ).click({ force: true });
    cy.wait(1000);
    //Click on PM
    cy.xpath("//div[contains(text(),'PM')]").click({ force: true });
    cy.wait(1000);
    //Click on Ok
    cy.xpath(
      "//div[@class='v-dialog v-dialog--active v-dialog--persistent']//button[1]"
    ).click({ force: true });
    cy.log("Time has been Selected for Reminder");
    cy.wait(2000);

    //Select Channels
    cy.contains('Web App').click({ force: true });
    cy.wait(1000)
    //Save Reminder
    cy.get(".ca-button-green:nth-child(2) > .v-btn__content").click({
      force: true,
    });
    cy.contains(' Reminder created ').should('be.visible')
    cy.wait(5000)
        
    })

    it.only('Validate (Remove)Restriciton for Reminders',function(){

        //Click on to create remider, it should not open
        cy.xpath('//*[text()=" CANCEL "]').click({force:true})
        cy.contains(' You are not permitted to delete any reminder for '+'"'+this.KitTypeName.KitName3+'"'+' please contact your administrator to remove this restriction ')
        .should('be.visible')
    })   
})