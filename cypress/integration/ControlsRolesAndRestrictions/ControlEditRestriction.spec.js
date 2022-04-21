import LoginPage from "../PageObject/LoginPage";
import KitBuilderPage from "../PageObject/KitBuilderPage";
import SanityLoginPage from "../PageObject/SanityLoginPage";
import RolesAndRestrictionsPage from "../PageObject/RolesAndRestrictionsPage"
import KitTypePage from "../PageObject/KitTypePage";

describe("Element Controls Roles And Restrication", function () {
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

    it('Login TestCase',function(){
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

    it("Navigate to Roles and Restrictions Page For (Create)Restriction ", function () {
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

    it('Select kit type to Configure Restriction For Details(Create)', function () {
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

    it('Go to Elements Tab',function(){
        //Click on Elements Tab
        cy.contains('Elements').click({force:true})
        cy.wait(1000)
    })

    it('Apply Edit Restriction to controls', function () {
         //Click on Edit 
         cy.xpath("//*[@class='v-chip__content' and contains(text(),'Can Edit')]")
         .click({multiple:true})
         cy.wait(2000)
         cy.xpath('//*[text() ="SAVE"]').click({ force: true })
         cy.wait(3000)
    })

    it('Navigate to UI to Validate(Create)Restriction', function () {
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

    it('Clear App Cache',function(){
        const lp = new LoginPage();
        lp.ClickOnHomePageAdmin();
        cy.wait(1000)
        //clear app cache
        cy.contains('Clear App Cache').click({force:true})
        cy.wait(2000)
    })

    it("Sign Out for logged in user", function () {
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
        cy.wait(2000)
        //Click on First kit item of kit type to open edit view
        cy.log("Kit Item Detail View has been Opened");
        //Validation assertion for details view
        cy.get(".kits-landing--header-title").should(
            "have.text",
            " Recently Viewed "
        );
    })

    it.only('Open Details View',function(){
        //Click on the first Kit Item in Kit item list view
        cy.xpath('//div[@class="row-list-item-details--content py-2 justify-center col col-10 truncate-wrapper"]')
            .eq(0).click({ force: true })
        cy.wait(5000)
    })

    it.only('Validate URL',function(){
          cy.get("[name" + "=" + this.DataType2.Url + "]")
          .last()
          .then(($el) => {
          expect($el.attr("readonly")).to.equal("readonly");
        });
    })

    it.only('Validate Text',function(){
        //Text
        cy.get("[name" + "=" + this.DataType2.Text + "]").last()
         .then(($el) => {
         expect($el.attr("readonly")).to.equal("readonly");
        });
    })
    
    it("Validate File", function () {
        cy.wait(1000);
        //File
        cy.get("[name" + "=" + this.DataType2.File + "]").should(
          "have.attr",
          "readonly"
        );
      });
    
      it.only("Validate Telephone", function () {
        //Telephone  
        cy.get("[name" + "=" + this.DataType2.Telephone + "]")
          .last()
          .then(($el) => {
            expect($el.attr("readonly")).to.equal("readonly");
        });
      });
    
      it.only("Validate TextAera", function () {
        //TextAera
        cy.get("[name" + "=" + this.DataType2.TextAera + "]")
          .last()
          .then(($el) => {
            expect($el.attr("readonly")).to.equal("readonly");
        });   
    });

    it('Validate Slider',function(){
        //Slider
        cy.get("[name" + "=" + this.DataType2.Slider + "]")
        .eq(1)
        .should("have.class", "v-input v-input--is-readonly theme--light v-input__slider");
    })

    it.only('Validate Currency',function(){
         //Currency
         cy.xpath('//div[@class="row calculated-field"]//div[@class="v-input__slot"]//div[@class="v-text-field__slot"]//input')
         .eq(1)
         .then(($el) => {
            expect($el.attr("readonly")).to.equal("readonly");
        })    
    });   


    it.only('Validate Measure',function(){
        //Measure
         cy.xpath('//div[@class="row calculated-field"]//div[@class="v-input__slot"]//div[@class="v-text-field__slot"]//input')
         .eq(2)
          .then(($el) => {
           expect($el.attr("readonly")).not.to.equal("readonly")
        })   
    });   
        
    it.only("Validate Email", function () {
        //Email
        cy.get("[name" + "=" + this.DataType2.Email + "]")
          .last()
          .then(($el) => {
            expect($el.attr("readonly")).to.equal("readonly");
        });
    });

    it.only('Validate AddressLine 1.',function(){
        //AddressLine 1
        cy.get('[placeholder="Street address, building, company ... "]')
         .then(($el) => {
         expect($el.attr("readonly")).to.equal("readonly")
        });
    })

    it.only('Validate AddressLine 2.',function(){
        //Address line 2.
        cy.get('[name="Address line 2."]')
        .then(($el) => {
            expect($el.attr("readonly")).to.equal("readonly")
        })    

    })

    it.only('Validate City',function(){
        //City
        cy.get('[placeholder="City"]')
        .then(($el) => {
            expect($el.attr("readonly")).to.equal("readonly")
        })    

    })

    it.only('Validate ZipCode',function(){
        //Zip/Postal Code
         cy.get('[placeholder="Zip/Postal Code"]')
         .then(($el) => {
            expect($el.attr("readonly")).to.equal("readonly")
        })    
    })

    it.only("Validate Country", function () {
        //Country
        cy.get('[placeholder="Country"]').then(($el)=>{
            expect($el.attr("readonly")).to.equal("readonly")
        })  
    });

    it.only('Validate State',function(){
        //State
        cy.get('[placeholder="State / Province"]')
        .then(($el)=>{
            expect($el.attr("readonly")).to.equal("readonly")
        })  
    })

    it.only('Validate Number',function(){
        //Numner
        cy.get("[name" + "=" + this.DataType2.Number + "]")
         .last()
         .then(($el)=>{
            expect($el.attr("readonly")).to.equal("readonly")
        })
    })

    it.only('Validate Time',function(){
        //Time
        cy.get('[placeholder="Add Time"][type="text"]').eq(1)
        .then(($el)=>{
            expect($el.attr("readonly")).to.equal("readonly")
        })
    })

    it.only('Validate Date',function(){
        //Date
         cy.get('[placeholder=" MM / DD / YYYY"]')
         .then(($el)=>{
            expect($el.attr("readonly")).to.equal("readonly")
        });
    })

    it.only("Validate Toggle", function () {
        //Toggle
         cy.get("[name" + "=" + this.DataType2.Toggle + "]")
         .then(($el)=>{
         expect($el.attr("readonly")).to.equal("readonly")
        });
    });

    it.only("Validate Icon", function () {
        //Icon
        cy.get('[placeholder="Label"]').then(($el)=>{
            expect($el.attr("readonly")).to.equal("readonly")
        });
    });

    it.only('Validate Inspection',function(){
         //Inspection
         cy.xpath('//div[@class="v-slide-group__content"]//span')
         .should('have.class','v-chip v-chip--clickable v-chip--disabled v-chip--outlined theme--light v-size--default')
    })

    it.only('Validate Stepper',function(){
        //Inspection
        cy.xpath('//div[@class="v-stepper v-stepper--alt-labels v-stepper--non-linear theme--light"]//div')
        .should('have.class','v-stepper__step v-stepper__step--inactive')
   })


   it.only('Validate Checkbox',function(){
    //Inspection
    cy.xpath('//div[@class="checkboxes-wrapper-scrolled"]//div')
    .should('have.class','v-input v-input--is-readonly theme--light v-input--selection-controls v-input--checkbox')
   })
     
    it.only("Validate SelectList", function () {
        //SelectList
        cy.xpath('//div[@class="kit-control-component row-component px-3 col col-sm-12 col-md-6  mb-4 px-3 kit-control-readonly col-sm-12 col-md-6  mb-4 px-3"]')
        .should('have.class','v-input kit-control-select-list layout-alignment v-input--is-label-active v-input--is-dirty v-input--is-disabled v-input--is-readonly theme--light v-text-field v-text-field--is-booted v-text-field--enclosed v-text-field--outlined v-select"')
    });

    it.only("Validate RadioSelect", function () {
        //RadioSelect
        cy.xpath('//div[@class="kit-control-radio-select col col-sm-12 col-md-6 mb-4 px-3 col-sm-12 col-md-6 mb-4 px-3"]//div')
        .should('have.class','v-input v-input--is-readonly theme--light v-input--selection-controls v-input--radio-group v-input--radio-group--column')
    }); 
})


