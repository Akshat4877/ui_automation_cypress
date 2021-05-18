import LoginPage from "../PageObject/LoginPage";
import KitBuilderPage from "../PageObject/KitBuilderPage";
import SanityLoginPage from "../PageObject/SanityLoginPage";
import RolesAndRestrictionsPage from "../PageObject/RolesAndRestrictionsPage"
import KitTypePage from "../PageObject/KitTypePage";

describe("Roles And Restrication For Details(ViewDetails)", function () {
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

    it("Navigate to Roles and Restrictions Page For (ViewDetails)Restriction ", function () {
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

    it('Select kit type to Configure Restriction For Details(ViewDetails)', function () {
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

    it('Apply ViewDetails Restriction', function () {

        cy.xpath('//*[text() ="Details"]')
            .within(($Details) => {
                cy.xpath('//*[text() ="Details"]').scrollIntoView({ force: true })
                cy.wait(1000)
                //Click on Remove
                cy.xpath("//*[@class='v-chip__content' and contains(text(),'View Details')]")
                    .click({ force: true })
                cy.wait(2000)
                cy.xpath('//*[text() ="SAVE"]').click({ force: true })
                cy.wait(3000)

            })

    })

    it('Navigate to UI to Validate(ViewDetails)Restriction', function () {
        //Page Object
        const slp = new SanityLoginPage();
        const lp = new LoginPage();
        slp.nvdTest();
        //Handling Alert
        cy.on("window:confirm", () => {
            cy.log("Alert has been Handled");
        });
        //Assertion
        cy.title().should("eq", "Common Areas");
    })

    it.only('Validate (ViewDetails)Restriciton Add New Item Page', function () {
        cy.wait(10000);
        const lp = new LoginPage();
        const KTP = new KitTypePage();
        //Assertion
        cy.title().should("eq", "Common Areas");
        lp.PlusIcon();
        //debugger;
        //Click on To open Kit Type
        KTP.SearchKitType(this.KitTypeName.KitName3);
        cy.wait(5000)
        //this class should not be exist
        cy.get(".truncate-special").should('not.exist')
        cy.wait(1000)

    })

    it.only('Close (Add New Item Page)', function () {
        //Click on cross icon
        cy.wait(1000)
        cy.get('.add-new-pop-up-content__close-icon').click({ force: true });
        cy.wait(2000)

    })

    it.only('Validate (ViewDetails)Restriciton in Left Panel', function () {

        const lp = new LoginPage();
        //Click on Hamburger Icon
        lp.HMBIcon();
       //kit type not exist validation
       //this class should not be exist
        //cy.get('.v-list-item__title').should('not.have.value',this.KitTypeName.KitName3)
    cy.xpath("//*[contains(@class, 'd-flex col-9')]//*[text() = 'BuildingAreas']")
    .should('not.be.visible')

    })

})