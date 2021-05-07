import SignUpPage from "../PageObject/SignUpPage";
import LoginPage from "../PageObject/LoginPage";

describe("Update Email", function () {
    this.beforeEach(function () {
        Cypress.Cookies.preserveOnce(
            ".AspNet.ApplicationCookie",
            "ASP.NET_SessionId",
            "ca-cf-auth",
            "kit-detail-selected-tab",
            "jwt",
            "refreshToken",
            "jwtAccessToken"
        );

        cy.fixture("ConnectionsDynamicTestData/ConnectionUserCredentials").then(
            function (LoginData) {
                this.Credentials = LoginData;
            }
        );

        cy.fixture("LoginTestData/UpdateEmailData").then(
            function (LoginData) {
                this.Updated = LoginData;
            }
        );
    });

    it.only("Login into the appLication for New User", function () {
        //PageObject
        const lp = new LoginPage();
        lp.BaseTest()
        //Login Assertions
        cy.contains(" Log In ").should("be.visible");
        //Enter credentials
        lp.EnterEmail(this.Credentials.UserEmail);
        lp.EnterPassword(this.Credentials.Password);
        cy.wait(2000);
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

        cy.wait(5000);
        //cy.title().should("eq", "Common Areas");
        cy.log("New Users has been logged in successfully");
        //Assertion
        cy.get(
            "#inspire > div.v-application--wrap > div:nth-child(1) > div.root-container.fill-height.fill-width > div.base-layout-main-content.box > div.row.content-wrapper.fill-width.fill-height > div.fill-height.body-right-wrapper.col-sm-12.col.col-xs-12.col-md-7.col-lg-8.col-xl-9 > div > div > div > div.px-4.col.col-12 > div > span"
        ).should("have.text", " Common Aers ");
        cy.get(
            "#inspire > div.v-application--wrap > div:nth-child(1) > div.root-container.fill-height.fill-width > div.base-layout-main-content.box > div > div.fill-height.body-right-wrapper.col-sm-12.col.col-xs-12.col-md-7.col-lg-8.col-xl-9 > div > div > div > div.px-4.col.col-12 > div"
        ).then(function ($WelEle) {
            const WelcomeTxt = $WelEle.text();
            cy.log(WelcomeTxt);
        });
        cy.log("New Users has been logged in successfully");
        //cy.screenshot("New Users has been logged in successfully");
        cy.wait(2000);
    });

    it.only('Open Admin', function () {
        //Click on admin
        cy.get('[name="your-profile"]').click({ force: true });
        cy.wait(1000)
        //Click on Profile 
        cy.xpath('//*[text()="Profile"]').click({ force: true })
        cy.wait(1000)
    })

    it.only('Update First and Last Name', function () {
        //update first and last name
        cy.get('[name="first-name"]').clear().type(this.Updated.UpdatedFirstName)
        cy.wait(1000)
        cy.get('[name="last-name"]').clear().type(this.Updated.UpdatedLastName)
        cy.wait(2000)
    })

    it.only('Enter New User Email', function () {
        //clear email fileds and enter new updpated email id
        cy.get('[name="email"]').clear().type(this.Updated.UpdatedEmail)
        cy.wait(1000)
        cy.get('[name="recovery-email"]').clear().type(this.Credentials.UserEmail)
        cy.wait(2000)
    })

    it.only('Save the Changes', function () {
        //click on save btn
        cy.wait(1000)
        cy.xpath('//span[text()=" Save "]').click({ force: true })
        cy.contains(' User Profile saved ').should('be.visible')
        cy.wait(2000)
    })

    it.only('Navigate to mailinator', function () {
        cy.wait(1000)
        const sp = new SignUpPage();
        sp.mailinatorSite();
        cy.url().should("include", "mailinator.com");
        sp.EnterMailinatorEmail(this.Updated.UpdatedEmail);
        cy.log("User Email has been Entered");
        //Click on Go
        sp.Go();
        cy.wait(5000)
        cy.contains('Common Areas - Updated Username').click({ force: true })
        cy.wait(2000)
    })

    it.only('Update confirmation UserName(Email) on mailinator', function () {

        cy.get("#html_msg_body").then(($iframe) => {
            const $a = $iframe.contents().find("td");
            cy.wrap($a)
                .contains("Confirm change").then(function ($a) {
                    //extract the fully qualified href property
                    const href = $a.prop("href");
                    cy.log(href).writeFile(
                        "cypress/fixtures/LoginTestData/ResetUserName.json",
                        {
                            ResetUserNameURL: href,
                        }
                    );
                });

        })

    })

});


describe("Reset/Creating New UserName", function () {
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

        cy.fixture("LoginTestData/ResetUserName").then(function (ResetUserNameUrl) {
            this.NewUrl = ResetUserNameUrl;
        });

        cy.fixture("LoginTestData/UpdateEmailData").then(
            function (LoginData) {
                this.Updated = LoginData;
            }
        );

        cy.fixture("ConnectionsDynamicTestData/ConnectionUserCredentials").then(
            function (LoginData) {
                this.Credentials = LoginData;
            }
        );
    });

    it.only('Enter New UserName', function () {

        cy.wait(3000)
        cy.visit(this.NewUrl.ResetUserNameURL)
        cy.wait(3000)
        cy.url().should('include', 'ConfirmUsernameChange?')
        //Enter Old UserName(Email)
        cy.get('[placeholder="Old User Name"]').type(this.Credentials.UserEmail)
        //Enter Old Password
        cy.get('[placeholder="Password"]').type(this.Credentials.Password)
        cy.wait(2000)
        cy.contains('Confirm your credentials').click({ force: true })
        cy.wait(1000)
    })

    it.only('Login with New updated UserName', function () {
        //PageObject
        const lp = new LoginPage();
        lp.BaseTest()
        //Login Assertions
        cy.contains(" Log In ").should("be.visible");
        //Enter credentials
        lp.EnterEmail(this.Updated.UpdatedEmail);
        lp.EnterPassword(this.Credentials.Password);
        cy.wait(2000);
        lp.Submit();
        //Assertion
        cy.get(
            "#inspire > div.v-application--wrap > div:nth-child(1) > div.root-container.fill-height.fill-width > div.base-layout-main-content.box > div.row.content-wrapper.fill-width.fill-height > div.fill-height.body-right-wrapper.col-sm-12.col.col-xs-12.col-md-7.col-lg-8.col-xl-9 > div > div > div > div.px-4.col.col-12 > div > span"
        ).should("have.text", " Common Aers ");
    })

})