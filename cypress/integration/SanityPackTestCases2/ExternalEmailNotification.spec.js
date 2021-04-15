import SignUpPage from "../PageObject/SignUpPage";

describe("Email Notification Shared Activity For External Connection", function () {
    this.beforeEach(
        "Internal User Credentials",
        function () {

            cy.fixture("SanityPackTestData2/SharedUserCredentials").then(function (KitDataEle) {
                this.Credentials = KitDataEle;
            });

            // cy.fixture("SanityPackTestData2(Prod)/SharedUserCredentials(Prod)").then(function (KitDataEle) {
            //     this.Credentials = KitDataEle;
            // });

            cy.fixture("KitTypeTestData/NewKitItemDataValues").then(function (
                KitDataEle
            ) {
                this.NewKitItemData = KitDataEle;
            });

            // cy.fixture("SanityPackTestData(Prod)/NewKitItemDataValue(Prod)").then(
            //     function (KitDataEle) {
            //         this.NewKitItemData = KitDataEle;
            //     }
            // );
        });

    it.only("Verifying Email Notification Shared Kit Item Activity for External User ", function () {
        //PageObject
        const sp = new SignUpPage();
        sp.mailinatorSite();
        cy.url().should("include", "mailinator.com");
        sp.EnterMailinatorEmail(this.Credentials.ExternalConnection);
        cy.log("User Email has been Entered");
        //Click on Go
        sp.Go();
        cy.wait(10000);
        cy.contains("New " + this.NewKitItemData.KitName).click({ force: true });
        // //Validate shared kit item id
        // cy.get("#html_msg_body").then(($iframe) => {
        //     const $a = $iframe.contents().find("td");
        //     cy.wrap($a).contains('ID:25')

        // })

    });
});
