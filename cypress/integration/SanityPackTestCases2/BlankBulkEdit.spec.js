import LoginPage from "../PageObject/LoginPage";
import SanityLoginPage from "../PageObject/SanityLoginPage";

describe("Blank Bulk Edit test case for List View kit item", function () {
    this.beforeAll(function () {
        // cy.viewport(1280, 720);
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

        cy.fixture("SanityPackTestData2/BulkEditData").then(function (KitDataEle) {
            this.NewKitItemData = KitDataEle;
        });

        // cy.fixture("SanityPackTestData(Prod)/BulkEditData(Prod)").then(function (
        //   KitDataEle
        // ) {
        //   this.NewKitItemData = KitDataEle;
        // });

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

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    });

    it.only("Navigate to left Panel List View kit items", function () {
        const lp = new LoginPage();
        //Click on Hamburger Icon
        lp.HMBIcon();
        cy.wait(2000);
        cy.contains(this.NewKitItemData.KitName).scrollIntoView({
            force: true,
        });
        cy.wait(1000);
        //Open KitType from left paneal
        cy.contains(this.NewKitItemData.KitName).click({
            force: true,
        });
        cy.log("Kit Type has been OPened");
        cy.wait(2000);
    });

    it.only("Select kit items and Elements for bulk action", function () {
        //Select first kit items for bulk edit in table list view
        cy.get(".row:nth-child(1) .list-item-col-left .item-check").click({
            force: true,
        });
        // //Select second four kit items for bulk edit in table list view
        // cy.get(".row:nth-child(2) > .d-flex .item-check").click({ force: true });
        // //Select third four kit items for bulk edit in table list view
        // cy.get(".row:nth-child(3) > .d-flex .item-check").click({ force: true });
        // //Select fourth four kit items for bulk edit in table list view
        // cy.get(".row:nth-child(4) > .d-flex .item-check").click({ force: true });
        // //Assertion
        // cy.contains("4 Items Selected").should("be.visible");

        //Click on bulk action btn
        cy.get(".btn-title").click({ force: true });
        cy.wait(1000);
        cy.contains("Edit").click({ force: true });
        //Assertion
        cy.contains(" Bulk Edit ").should("be.visible");

        //Click on dropdown to select elements
        cy.get(
            "div.container-search.fill-height.container-dialog-grid.bulk-edit-dialog--wrapper.v-card.v-sheet.theme--light div.v-card__text.items-wrapper.wrapper-control-grid div.px-3.mt-6.col.col-12 div.v-input.theme--light.v-text-field.v-text-field--is-booted.v-text-field--enclosed.v-text-field--outlined.v-select.v-select--chips.v-select--is-multi div.v-input__control div.v-input__slot div.v-select__slot:nth-child(2) div.v-input__append-inner:nth-child(3) div.v-input__icon.v-input__icon--append > i.v-icon.notranslate.material-icons.theme--light"
        ).click({ force: true });
        cy.wait(2000);

        //Select elements for bulk action
        cy.get(".v-simple-checkbox").click({ multiple: true });
        cy.contains(this.DataType2.Icon).click({ force: true });

        //Bulk Pop
        //Firing Alert pop for manual action
        cy.log("User need to do something").then(() => {
            alert("Remove Bulk POP UP by Clicking somewhere ELSE");
        });
        cy.log("Remove Bulk POP UP by Clicking somewhere ELSE");
        cy.wait(2000);
        //Click on save
        cy.get(".ca-button-green > .v-btn__content").click({ force: true });
        cy.contains(" Bulk edit complete ").should("be.visible");
        cy.wait(2000);
    });


    it.only('Validate Blank Fields',function(){

    })
})