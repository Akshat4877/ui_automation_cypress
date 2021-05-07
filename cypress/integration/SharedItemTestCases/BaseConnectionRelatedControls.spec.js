import LoginPage from "../PageObject/LoginPage";
import SignUpPage from "../PageObject/SignUpPage";
import SanityLoginPage from "../PageObject/SanityLoginPage";


describe("Base Connection Shared Kit Item Related Control Test Case", function () {
    this.beforeAll(function () {
        //cy.viewport(1280, 720);
        const lp = new LoginPage();
        lp.BaseTest()
        //lp.ProdBaseTest()
        //Handling Alert
        cy.on("window:confirm", () => {
            cy.log("Alert has been Handled");
        });
        //Login Assertions
        cy.contains(" Log In ").should("be.visible");
        //Enter credentials
        lp.EnterEmail("Morgen@mailinator.com");
        //lp.EnterEmail("Akshat@mailinator.com");
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

    this.beforeEach("KitType Data", function () {
        Cypress.Cookies.preserveOnce(
            ".AspNet.ApplicationCookie",
            "ASP.NET_SessionId",
            "ca-cf-auth",
            "kit-detail-selected-tab",
            "jwt",
            "refreshToken",
            "jwtAccessToken"
        );


        cy.fixture("SanityPackTestData/RelatedOneToNData").then(function (
            SanityTCData
        ) {
            this.RelatedKitItemData = SanityTCData;
        });

        // cy.fixture("SanityPackTestData(Prod)/RelatedOneToNData(Prod)").then(
        //   function (SanityTCData) {
        //     this.RelatedKitItemData = SanityTCData;
        //   }
        // );

        cy.fixture("SanityPackTestData/RelatedOneToOneData").then(function (
            SanityTCData
        ) {
            this.RelatedKitItemData1 = SanityTCData;
        });

        // cy.fixture("SanityPackTestData(Prod)/RelatedOneToOneData(Prod)").then(
        //   function (SanityTCData) {
        //     this.RelatedKitItemData1 = SanityTCData;
        //   }
        // );

        cy.fixture("SanityPackTestData/RelatedSqCardData").then(function (
            SanityTCData
        ) {
            this.RelatedKitItemData = SanityTCData;
        });

        // cy.fixture("SanityPackTestData(Prod)/RelatedSqCardData(Prod)").then(
        //   function (SanityTCData) {
        //     this.RelatedKitItemData = SanityTCData;
        //   }
        // );

        cy.fixture("VerificationTestCasesData/KitBuilderDataTypes2").then(function (
            NewDataForElements
        ) {
            this.DataType2 = NewDataForElements;
        });

        // cy.fixture("SanityPackTestData(Prod)/KitBuilderDataTypes2(Prod)").then(
        //   function (NewDataForElements) {
        //     this.DataType2 = NewDataForElements;
        //   }
        // );
    });


})

