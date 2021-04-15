import LoginPage from "../PageObject/LoginPage";
import KitBuilderPage from "../PageObject/KitBuilderPage";
import SanityLoginPage from "../PageObject/SanityLoginPage";
import RolesAndRestrictionsPage from "../PageObject/RolesAndRestrictionsPage"

describe("Roles And Restrication For Details", function () {
    this.beforeAll(function () {
        const lp = new LoginPage();
        const slp = new SanityLoginPage();
        slp.nvdTest()
        //slp.TmProd();

        //Handling Alert
        cy.on("window:confirm", () => {
            cy.log("Alert has been Handled");
        });

        //Login Assertions
        cy.contains(" Log In ").should("be.visible");
        //Enter credentials
        lp.EnterEmail("propertymanagement@commonareas.work.dev");
        //lp.EnterEmail("sam@armyspy.com");
        lp.EnterPassword("1234567Aa");
        lp.Submit();
        cy.log("User has been Logged In into the application");

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

        cy.fixture("KitBuilderTestData/NewKitTypeData").then(function (
            KittypeName
        ) {
            this.KitTypeName = KittypeName;
        });
    });

    it.only("Navigate to Roles and Restrictions Page", function () {
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

    it.only('Select kit type to Configure Restriction', function () {
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

    it.only('Details Restriction for Remove', function () {

        cy.xpath('//*[text() ="Details"]')
            .within(($Details) => {
                //Click on Remove
                cy.xpath('//*[text() ="Details"]').scrollIntoView({ force: true })
                cy.wait(2000)
                cy.xpath("//*[@class='v-chip__content' and contains(text(),'Remove')]").eq(4)
                    .click({ force: true })
                cy.wait(2000)
                cy.xpath('//*[text() ="SAVE"]').click({ force: true })

            })

    })

    it.only('Details Restriction for Modify All', function () {

        cy.xpath('//*[text() ="Details"]')
            .within(($Details) => {
                //Click on Remove
                cy.xpath("//*[@class='v-chip__content' and contains(text(),'Modify All')]").eq(4)
                    .click({ force: true })
                cy.wait(2000)
                cy.xpath('//*[text() ="SAVE"]').click({ force: true })

            })

    })

    it.only('Details Restriction for Create', function () {

        cy.xpath('//*[text() ="Details"]')
            .within(($Details) => {
                //Click on Remove
                cy.xpath("//*[@class='v-chip__content' and contains(text(),'Create')]").eq(3)
                    .click({ force: true })
                cy.wait(2000)
                cy.xpath('//*[text() ="SAVE"]').click({ force: true })

            })

    })



    it.only('Details Restriction for View Details', function () {

        cy.xpath('//*[text() ="Details"]')
            .within(($Details) => {
                //Click on Remove
                cy.xpath("//*[@class='v-chip__content' and contains(text(),'View Details')]")
                    .click({ force: true })
                cy.wait(2000)
                cy.xpath('//*[text() ="SAVE"]').click({ force: true })

            })

    })

})