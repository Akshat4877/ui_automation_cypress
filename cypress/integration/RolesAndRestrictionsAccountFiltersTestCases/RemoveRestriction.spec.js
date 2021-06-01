import LoginPage from "../PageObject/LoginPage";
import KitBuilderPage from "../PageObject/KitBuilderPage";
import SanityLoginPage from "../PageObject/SanityLoginPage";
import RolesAndRestrictionsPage from "../PageObject/RolesAndRestrictionsPage"


describe("Roles And Restrication For Account Filters(Remove)", function () {
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

    it.only('Select kit type to Configure Restriction For Account Filters(Remove)', function () {
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

        cy.xpath('//*[text() ="Account Filters"]')
            .within(($AccountFilters) => {
                cy.xpath('//*[text() ="Account Filters"]').scrollIntoView()
                cy.wait(1000)
                //Click on Remove
                cy.xpath("//*[@class='v-chip__content' and contains(text(),'Remove')]").eq(12)
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
        cy.wait(5000)
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
    })



     it.only('Filer Icon',function(){
      //Page Object
      const lp = new LoginPage();
      //Click on Filter Icon
      lp.FilterIcon();
      //Scroll into url element in filters
      cy.get("[name" + "=" + this.DataType2.Url + "]")
      .last()
      .scrollIntoView({ force: true });
      cy.wait(2000);
      //Enter data in url 
      cy.get("[name" + "=" + this.DataType2.Url + "]")
      .eq(1).clear()
      .type('https://www.removefilter.com');
      cy.wait(1000)     
    })

    it.only('Create Account Filter for Url',function(){
    
        cy.wait(3000)
        //Click on Filter Drop down
        //cy.get('#filter_left_panel > div > div.wrapper-content.col > div > div > div > div.buttons.col.pl-4 > div.apply-clear-wrapper.navi-bar > div.navi-bar-dropdown.navi-bar__actions.navi-bar-action-dropdown.col > div > div > div > div.v-select__slot > div.v-input__append-inner')
        cy.xpath("//*[text() = 'arrow_drop_down']").eq(0)
        .click({force:true});
        cy.wait(2000)
        //Click on save As to create filter
        cy.xpath('//*[text()="Save as"]').click({force:true})
        cy.wait(2000)
        //Click on Svae as button again 
        cy.xpath('//*[text()="Save as"]').last().click({force:true})
        cy.contains(' Save your filter ').should('be.visible')
        cy.wait(1000)
        //Click on Account Checkbox
        cy.xpath('//*[text()="Account"]').click({force:true})
        cy.wait(1000)
        //Enter Filter name
        cy.get('[placeholder="Filter Name"]').clear()
        .type('Remove Restriction')
        cy.wait(2000)
      })

      it.only('Save Filter Validation',function(){
        cy.wait(2000)
        //Click on Save filter
        cy.xpath('//*[text()=" Save "]').click({force:true})
        cy.contains('Filter created successfully ').should('be.visible')
        cy.wait(2000)
    })

    it.only('Apply Remove Action for Account Filter',function(){

        cy.wait(1000)
        //Click to open create Account Filter
        cy.get('#filter_left_panel > div > div.wrapper-content.col > div > div > div > div.filter-wrapper.col > div > div > div.kit-filter-container__filters-wrapper.col.col-12 > div > div > div.row.col > div.px-3.col-10.col > div > div > div.v-input__slot > div.v-select__slot > div.v-input__append-inner')
        .click({force:true});
        cy.wait(2000)
        //Click on create filter
        cy.contains('Remove Restriction ').click({force:true})
        cy.wait(2000)
         //Click on Filter Drop down
        cy.xpath("//*[text() = 'arrow_drop_down']").eq(0)
        .click({force:true});
        cy.wait(2000)
        //Click on Delete Filter form drop down
        cy.xpath('//*[text()="Delete filter"]').first().click({force:true})
        cy.wait(2000)
    })

    it.only('Validate (Remove) Restriciton for Account Filter',function(){
        cy.wait(2000)
        //Click on save filter to modify
        cy.xpath('//*[text()="Delete filter"]').last().click({force:true})
        cy.contains(' You do not have the proper permissions to perform this function. Please see your system administrator ')
        .should('be.visible')
    })
    
})