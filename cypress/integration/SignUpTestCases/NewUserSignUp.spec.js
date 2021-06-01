import SignUpPage from "../PageObject/SignUpPage";
import LoginPage from "../PageObject/LoginPage";
import RandomString from "../PageObject/RandomString";

//Global Variable
let UserData;
let UserEmailID;
let UserFirstName;
let UserLastName;
//Randomly Generated UserData coming from PageObject(RandomString Class)
const Rs = new RandomString();
UserData = Rs.getRandomUser();
UserEmailID = UserData.Useremail;
UserFirstName = UserData.UserFirstName;
UserLastName = UserData.UserLastName;

describe("Sign up for a New User", function () {
  this.beforeAll(() => {
    debugger;
    //Creating Dynamic Json file at RumTime for Request TestCase
    cy.writeFile(
      "cypress/fixtures/ConnectionsDynamicTestData/ConnectionUserCredentials.json",
      {
        Fname: UserFirstName,
        Lname: UserLastName,
        UserEmail: UserEmailID,
        Password: "1234567Aa",
      }
    );

    cy.log("Data has been write to json");
    cy.log(UserEmailID);
    cy.log(UserFirstName);
    cy.log(UserLastName);
  });

  this.beforeEach(
    "Getting the Dynmaically Generated data through Fixtures file",
    function () {
      // cy.eyesOpen({
      //   appName: "Common Aera UI Automation",
      //   testName: "Sign Up for a new User",
      // });

      cy.fixture("SignUpTestData/SignUpTestData").then(function (SignUpData) {
        this.SignUPData = SignUpData;
      });

      //debugger;
      cy.fixture("ConnectionsDynamicTestData/ConnectionUserCredentials").then(
        function (JsonData) {
          this.Credentials = JsonData;
          cy.log(this.Credentials.UserEmail);
          cy.log(this.Credentials.Fname);
          cy.log(this.Credentials.Lname);
        }
      );
    }
  );

  it("New User Sign up", function () {
    //PageObject
    const sp = new SignUpPage();
    const lp = new LoginPage();
    lp.BaseTest()
    //cy.visit('https://commonareas.io/Public/Login')
    cy.wait(3000);
    //cy.eyesCheckWindow()

    cy.url().should("include", "/Public/Login");
    //Click on Sign up for free
    sp.SignUp();
    cy.url().should("include", "Register/Create");
    //cy.eyesCheckWindow('Sign Up Page')
    //Sign Up detalis Custom Commands coming from command.js
    cy.SignUpUserFirstName(this.Credentials.Fname);
    cy.SignUpUserLastName(this.Credentials.Lname);
    cy.SignUpUserEmail(this.Credentials.UserEmail);
    cy.CompanyName(this.SignUPData.CompanyName);

    //cy.ConfirmEmailAddress(this.Credentials.UserEmail);
    cy.SignUpUserPassword(this.Credentials.Password);
    cy.ConfirmPassword(this.Credentials.Password);

    cy.get('[name="ContactInformation.CompanyType"]').scrollIntoView({
      force: true,
    });
    cy.get(
      '[name="ContactInformation.CompanyType"]'
    ).select("Facility Management", { force: true });
    //cy.eyesCheckWindow("Getting User Details");

    //Click on Agree Terms and conditions
    cy.get("#AgreeTermsAndConditions").click({ force: true });
    cy.screenshot("User details");
    cy.wait(1000);

    //Click on Submit to Create the user
    cy.get("#submitButton").click();
    cy.log("New User has been signed up successfully");
    //Assertion
    cy.contains(
      "An email has been sent to you to verify the email address you provided with a link to activate your account."
    ).should("be.visible");

    cy.screenshot("Capturing the screenshot after successful signup");
    // cy.eyesCheckWindow("New user Signed Up");
    cy.wait(1000);
    //cy.eyesCheckWindow();
  });

  // this.afterAll(function () {
  //   cy.eyesClose();
  // });
});


describe("Activation Mailinator Account for New Sign up User", function () {
  this.beforeEach(
    "Getting the Dynmaically Generated data through Fixtures file",
    function () {
      // cy.eyesOpen({
      //   appName: "Common Aera UI Automation",
      //   testName: "Mailinator Account Verification",
      // });

      //debugger;
      cy.fixture("ConnectionsDynamicTestData/ConnectionUserCredentials").then(
        function (JsonData) {
          this.Credentials = JsonData;
          cy.log(this.Credentials.UserEmail);
        }
      );
    }
  );

  it("Verifying Email Id for Randomly generated New User on Mailinator site", function () {
    //PageObject
    const sp = new SignUpPage();
    sp.mailinatorSite();
    cy.url().should("include", "mailinator.com");
    sp.EnterMailinatorEmail(this.Credentials.UserEmail);
    cy.log("User Email has been Entered");
    // cy.eyesCheckWindow("User Mail");
    //Click on Go
    sp.Go();
    //cy.eyesCheckWindow("Common Aera Mail in the inbox");
    //cy.screenshot("Verifying for getting common aera email");
    cy.wait(10000);
    cy.contains("Welcome to Commonareas - Verify Email").click();
    //debugger
    cy.wait(5000);
    //cy.eyesCheckWindow();
    //New Sign up user Account Verification on mailinator
    sp.ActiveAccount();
    cy.wait(5000);
    cy.log("New user Account has been verified successfully on Mailinator");
    cy.screenshot("successfully Account has been verified on Mailinator");
    cy.wait(3000);
  });
  // this.afterAll(function () {
  //   cy.eyesClose();
  // });
});

describe("Login into the application for a new User ", function () {
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

    //debugger;
    // cy.fixture("LoginTestData/UserLogin").then(function (LoginData) {
    //   this.Credentials = LoginData;
    // });

    cy.fixture("ConnectionsDynamicTestData/ConnectionUserCredentials").then(
      function (LoginData) {
        this.Credentials = LoginData;
      }
    );
  });

  it("Login into the appLication for New User", function () {
    //PageObject
    const sp = new SignUpPage();
    const lp = new LoginPage();
    lp.BaseTest()
    //Login Assertions
    cy.contains(" Log In ").should("be.visible");
    //Enter credentials
    lp.EnterEmail(this.Credentials.UserEmail);
    lp.EnterPassword(this.Credentials.Password);
    cy.screenshot("User logged In Details");
    cy.wait(7000);
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
    cy.title().should("eq", "Common Areas");
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

  it("Sign Out for logged in user", function () {
    //Click on admin
    cy.get('[name="your-profile"]').click({ force: true });
    cy.contains("Sign Out").click({ force: true });
    //Log out validation assertion
    cy.contains(" Log In ").should("be.visible");
    cy.url().should("include", "/Public/Login?");
    cy.log("User has been sign out");
  });
});