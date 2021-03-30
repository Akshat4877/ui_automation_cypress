import SignUpPage from "../PageObject/SignUpPage";

describe("Email Notification Shared Activity", function () {
  this.beforeEach(
    "Internal User Credentials",
    function () {

      cy.fixture("SanityPackTestData2/SharedUserCredentials").then(function (InternalUser) {
        this.Credentials = InternalUser;
      });
      // cy.fixture("SanityPackTestData2/SharedUserCredentials").then(function (ExternallUser) {
      //   this.Credentials = ExternallUser;
      // });
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
    cy.contains("New BuildingAreas").click({ force: true });
  });
});