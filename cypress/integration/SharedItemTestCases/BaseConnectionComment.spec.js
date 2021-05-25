import SignUpPage from "../PageObject/SignUpPage";

describe("Comment Email Notification Shared Activity", function () {
    this.beforeEach(
        "Shared User Credentials",
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
              /////////////////////////////////////////////////////////////////////////


            cy.fixture("KitTypeTestData/NewKitItemDataValues").then(function (
                KitDataEle
            ) {
                this.NewKitItemData = KitDataEle;
            });

            // cy.fixture("SanityPackTestData(Prod)/NewKitItemDataValue(Prod)").then(
            //   function (KitDataEle) {
            //     this.NewKitItemData = KitDataEle;
            //   }
            // );
            ///////////////////////////////////////////////////////////////////

            cy.fixture("SanityPackTestData2/KitItemId").then(function (ItemID) {
                this.KitItemId = ItemID;
            });

        });

    it.only("Verifying Email Notification Shared Kit Item Activity for Internal User ", function () {
        //PageObject
        const sp = new SignUpPage();
        sp.mailinatorSite();
        cy.url().should("include", "mailinator.com");
        sp.EnterMailinatorEmail(this.SharedCreds.BaseConnection);
        cy.log("User Email has been Entered");
        //Click on Go
        sp.Go();
        cy.wait(5000);
        cy.contains('Comments Added').click({ force: true })
    });
});