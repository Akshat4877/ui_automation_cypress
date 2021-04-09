import SignUpPage from "../PageObject/SignUpPage";

describe("Email Notification Shared Activity", function () {
  this.beforeEach(
    "Internal User Credentials",
    function () {

      cy.fixture("SanityPackTestData2/SharedUserCredentials").then(function (KitDataEle) {
        this.Credentials = KitDataEle;
      });

      // cy.fixture("SanityPackTestData2(Prod)/SharedUserCredentials(Prod)").then(function (KitDataEle) {
      //   this.Credentials = KitDataEle;
      // });

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
    sp.EnterMailinatorEmail(this.Credentials.InternalUser);
    cy.log("User Email has been Entered");
    //Click on Go
    sp.Go();
    cy.wait(10000);
    cy.contains("New " + this.NewKitItemData.KitName).click({ force: true });
    cy.wait(3000)
    //Validate shared kit item id
    cy.get("#html_msg_body").eq(0).then(($iframe) => {
      const $a = $iframe.contents().find("td").then((text) => {
        cy.log(text)
      })
    });

  });
});