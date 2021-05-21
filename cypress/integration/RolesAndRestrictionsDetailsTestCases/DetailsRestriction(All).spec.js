import LoginPage from "../PageObject/LoginPage";
import KitBuilderPage from "../PageObject/KitBuilderPage";
import SanityLoginPage from "../PageObject/SanityLoginPage";
import RolesAndRestrictionsPage from "../PageObject/RolesAndRestrictionsPage"
import KitTypePage from "../PageObject/KitTypePage";

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


        cy.fixture("VerificationTestCasesData/KitBuilderDataTypes2").then(function (
            NewDataForElements
        ) {
            this.DataType2 = NewDataForElements;
        });

    });

    it.only("Navigate to Roles and Restrictions Page For (Remove)Restriction ", function () {
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

    it.only('Select kit type to Configure Restriction For Details(Remove)', function () {
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

        cy.xpath('//*[text() ="Details"]')
            .within(($Details) => {
                //Click on Remove
                cy.xpath('//*[text() ="Details"]').scrollIntoView({ force: true })
                cy.wait(2000)
                cy.xpath("//*[@class='v-chip__content' and contains(text(),'Remove')]").eq(4)
                    .click({ force: true })
                cy.xpath('//*[text() ="SAVE"]').click({ force: true })
                cy.wait(3000)

            })
    })

    it.only('Navigate to UI to Validate(Remove)Restriction', function () {
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
        cy.wait(1000)
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
        cy.wait(1000)
    })

    it.only('Validate (Remove)Restriciton', function () {

        cy.wait(4000)
        //Click on Kit Item's thress dots
        cy.get(
            ".row:nth-child(1) .row-list-item-details--update-field .inline-svg"
        ).click({ force: true });
        cy.wait(2000);
        cy.xpath('//*[text()="Delete"]').click({ force: true });
        cy.wait(1000)
        cy.xpath('//*[text()="Delete"]').click({ force: true });
        //Validate remove Restriction with this validation message
        cy.contains(' You are not permitted to remove any details for BuildingAreas please contact your administrator to remove this restriction ')
            .should('be.visible')

    })

    it.only("Sign Out for logged in user", function () {
        //Click on admin
        cy.get('[name="your-profile"]').click({ force: true });
        cy.contains("Sign Out").click({ force: true });
        //Log out validation assertion
        cy.contains(" Log In ").should("be.visible");
        cy.url().should("include", "/Public/Login?");
        cy.log("User has been sign out");
    });

    it.only('Logged In Again for ModifyAll Restriction', function () {

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
    })


    it.only("Navigate to Roles and Restrictions Page Again For (ModifyAll)Restriction", function () {
        const kb = new KitBuilderPage();
        const lp = new LoginPage();
        const RoleRestr = new RolesAndRestrictionsPage();
        cy.title().should("eq", "Common Areas");
        lp.NVDTestKitBuilder();
        cy.url().should('include', '/ClientAdmin/KitBuilder#/')
        cy.log("User in Kit Builder");
        //Click Roles and Restirction
        RoleRestr.RolesAndRestrictionsPage()
        cy.url().should('include', '/ClientAdmin/KitBuilder#/roles')
    });

    it.only('Select kit type to Configure Restriction For Details(ModifyAll)', function () {
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

        cy.xpath('//*[text() ="Details"]')
            .within(($Details) => {

                cy.xpath('//*[text() ="Details"]').scrollIntoView({ force: true })
                cy.wait(2000)
                //Click on Modify All
                cy.xpath("//*[@class='v-chip__content' and contains(text(),'Modify All')]").eq(4)
                    .click({ force: true })
                cy.wait(2000)
                cy.xpath('//*[text() ="SAVE"]').click({ force: true })
                cy.wait(3000)

            })

    })

    it.only('Navigate to UI to Validate (ModifyAll)Restriction', function () {
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
        cy.wait(1000)
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
        cy.wait(3000)
    })

    it.only('Validate (ModifyAll)Restriciton', function () {
        cy.wait(4000)
        //Click on the first Kit Item in Kit item list view
        cy.xpath('//div[@class="row-list-item-details--content py-2 justify-center col col-10 truncate-wrapper"]')
            .eq(0).click({ force: true })
        cy.wait(10000)

        //new form ele visible assertion
        cy.get("[name" + "=" + this.DataType2.Text + "]")
            .last()
            .should("be.visible");

        //Enter data in text field
        cy.get("[name" + "=" + this.DataType2.Text + "]")
            .last().type('Modifiy All restriction')
        cy.wait(2000)

        //Click to save
        cy.get(".navi-bar-dropdown:nth-child(2) .v-btn").click({ force: true });
        cy.contains(' User does not have permission to modify this kit item ').should(
            "be.visible"
        );
        cy.wait(2000)
        //Close Kit type
        cy.get(".subheader--button-icon-wrapper .inline-svg").click({
            force: true,
        });

        cy.contains('Are you sure you want to discard changes?').should('be.visible')
        cy.wait(1000)
        cy.xpath('//*[text()=" Discard "]').click({ force: true })
        cy.contains(" Recently Viewed ").should("be.visible");
        cy.wait(2000);
        //Click on the first Kit Item in Kit item list view
        cy.xpath('//div[@class="row-list-item-details--content py-2 justify-center col col-10 truncate-wrapper"]')
            .eq(0).click({ force: true })
        cy.wait(5000)
        var lower = this.DataType2.Text.toLowerCase();
        //Validating details view input data
        cy.xpath("//input[@controlname='" + lower + "']").should("not.have.value", 'Modifiy All restriction')

    })

    it.only("Sign Out for logged in user", function () {
        //Click on admin
        cy.get('[name="your-profile"]').click({ force: true });
        cy.contains("Sign Out").click({ force: true });
        //Log out validation assertion
        cy.contains(" Log In ").should("be.visible");
        cy.url().should("include", "/Public/Login?");
        cy.log("User has been sign out");
    });

    it.only('Logged In Again for Create Restriction', function () {

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
    })

    it.only("Navigate to Roles and Restrictions Page Again For (Create)Restriction", function () {
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

    it.only('Select kit type to Configure Restriction For Details(Create)', function () {
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


    it.only('Apply Create Restriction', function () {

        cy.xpath('//*[text() ="Details"]')
            .within(($Details) => {
                cy.xpath('//*[text() ="Details"]').scrollIntoView()
                cy.wait(1000)
                //Click on Create
                cy.xpath("//*[@class='v-chip__content' and contains(text(),'Create')]").eq(3)
                    .click({ force: true })
                cy.wait(2000)
                cy.xpath('//*[text() ="SAVE"]').click({ force: true })
                cy.wait(3000)

            })

    })

    it.only('Navigate to UI to Validate(Create)Restriction', function () {
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

    it.only('Validate (Create)Restriciton on Add New Item Page', function () {
        cy.wait(5000);
        const lp = new LoginPage();
        const KTP = new KitTypePage();
        //Assertion
        cy.title().should("eq", "Common Areas");
        lp.PlusIcon();
        //debugger;
        //Click on To open Kit Type
        KTP.SearchKitType(this.KitTypeName.KitName3);
        cy.wait(5000)
        //cy.contains(this.KitTypeName.KitName3).should('not.exist')
        cy.contains(this.KitTypeName.KitName3).should('not.be.visible')
        cy.wait(2000)
    })

    it.only('Close(Add New Item Page)', function () {
        //Click on cross icon
        cy.wait(1000)
        cy.get('.add-new-pop-up-content__close-icon').click({ force: true });
        cy.wait(2000)
    })

    it.only("Sign Out for logged in user Again", function () {
        //Click on admin
        cy.get('[name="your-profile"]').click({ force: true });
        cy.contains("Sign Out").click({ force: true });
        //Log out validation assertion
        cy.contains(" Log In ").should("be.visible");
        cy.url().should("include", "/Public/Login?");
        cy.log("User has been sign out");
    });

    it.only('Logged In Again for (ViewDetails)Restriction', function () {

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
        cy.wait(2000)
    })

    it.only("Navigate to Roles and Restrictions Page Again For (ViewDetails)Restriction", function () {
        const kb = new KitBuilderPage();
        const lp = new LoginPage();
        const RoleRestr = new RolesAndRestrictionsPage();
        cy.title().should("eq", "Common Areas");
        lp.NVDTestKitBuilder();
        cy.url().should('include', '/ClientAdmin/KitBuilder#/')
        cy.log("User in Kit Builder");
        //Click Roles and Restirction
        RoleRestr.RolesAndRestrictionsPage()
        cy.url().should('include', '/ClientAdmin/KitBuilder#/roles')
        cy.wait(2000)
    });

    it.only('Select kit type to Configure Restriction For Details(ViewDetails)', function () {
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


    it.only('Apply ViewDetails Restriction', function () {

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

    it.only('Navigate to UI to Validate(ViewDetails)Restriction', function () {
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
        //cy.contains(this.KitTypeName.KitName3).should('not.exist')
        cy.contains(this.KitTypeName.KitName3).should('not.be.visible')
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
        // cy.xpath("//*[contains(@class, 'd-flex col-9')]//*[text() = '" + this.KitTypeName.KitName3 + "']")
        //     .should('not.exist')
        cy.xpath("//*[contains(@class, 'd-flex col-9')]//*[text() = '" + this.KitTypeName.KitName3 + "']")
            .should('not.be.visible')

    })


})