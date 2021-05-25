import SignUpPage from "../PageObject/SignUpPage";

describe("Update Shared Item Email Notification for Base Connection", function () {
    this.beforeEach(
        "Internal User Credentials",
        function () {

            cy.fixture("LoginTestData/GlobalLoginCreds").then(function (
                LogInScriptGloably
                ) {
                this.LoginCreds = LogInScriptGloably;
                 });
        
                //Globally fixtures for shared item test cases creads
                cy.fixture("LoginTestData/SharedUserCredentials").then(function (
                LogInScriptGloably
                ) {
                this.SharedCreds = LogInScriptGloably;
                });
    ////////////////////////////////////////////////////////////////////////////////////////
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

    it.only("Verifying Email Notification For Updated Shared item", function () {
        //PageObject
        const sp = new SignUpPage();
        sp.mailinatorSite();
        cy.url().should("include", "mailinator.com");
        sp.EnterMailinatorEmail(this.SharedCreds.DetailsBaseConnection);
        cy.log("User Email has been Entered");
        //Click on Go
        sp.Go();
        cy.wait(10000);
        cy.contains(this.NewKitItemData.KitName + " Updated").click({ force: true });



    });
});
