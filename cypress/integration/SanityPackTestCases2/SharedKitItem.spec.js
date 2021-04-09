import LoginPage from "../PageObject/LoginPage";
import SignUpPage from "../PageObject/SignUpPage";
import SanityLoginPage from "../PageObject/SanityLoginPage";

describe("Internal Connection Shared Kit Item Test Case", function () {
  this.beforeAll(function () {
    //cy.viewport(1280, 720);
    const lp = new LoginPage();
    const slp = new SanityLoginPage();
    slp.nvdTest()
    //slp.TmProd()
    //Handling Alert
    cy.on("window:confirm", () => {
      cy.log("Alert has been Handled");
    });

    //Login Assertions
    cy.contains(" Log In ").should("be.visible");
    //Enter credentials
    lp.EnterEmail("jacob@mailinator.com");
    //lp.EnterEmail("mack2@mailinator.com");

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

    cy.fixture("SanityPackTestData/NewKitItemTabsData").then(function (
      SanityTCData
    ) {
      this.SData = SanityTCData;
    });

    // cy.fixture("SanityPackTestData(Prod)/NewKitItemTabsData(Prod)").then(
    //   function (SanityTCData) {
    //     this.SData = SanityTCData;
    //   }
    // );

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////

    cy.fixture("SanityPackTestData2/KitItemId").then(function (ItemID) {
      this.KitItemId = ItemID;
    });

    cy.fixture("KitBuilderTestData/NewKitTypeData").then(function (
      KittypeName
    ) {
      this.KitTypeName = KittypeName;
    });

    cy.fixture("KitBuilderTestData/FormViewsNameData").then(function (
      KitTypeFormViewsNames
    ) {
      this.ViewName = KitTypeFormViewsNames;
    });
  });


  it.only('Click on Shared Kit Item to Internal User', function () {
    cy.wait(2000)
    //Adding coma() in kit item id
    var id = this.KitItemId.ItemID.replace(' ', ', ')
    cy.log(id)
    cy.xpath('//*[contains(@class, "v-list-item__subtitle truncate")]//*[text()="' + id + '"]')
      .click({ force: true })
  })


  it.only("Url Element data Validation", function () {
    var lower = this.DataType2.Url.toLowerCase();
    //Validating details view input data
    cy.xpath("//input[@controlname='" + lower + "']")
      .should("have.value", this.NewKitItemData.Url)
  });

  it.only("Text Element data Validation", function () {
    var lower = this.DataType2.Text.toLowerCase();
    //Validating details view input data
    cy.xpath("//input[@controlname='" + lower + "']").should("have.value", this.NewKitItemData.Text)
  });

  it.only('File Element data Validation', function () {
    cy.xpath('//div[@class="drop-zone"]//div[@class="v-input__slot"]//div[@class="v-text-field__slot"]//input')
      .invoke('val').then((text) => {
        expect(text.trim()).equal(this.NewKitItemData.NewFormLibFileName)
      });

  })

  it.only("Telephone Element data Validation", function () {
    var lower = this.DataType2.Telephone.toLowerCase();
    //Validating details view input data
    cy.xpath("//input[@controlname='" + lower + "']").should("have.value", this.NewKitItemData.Telephone)
  });


  it.only("TextAera Element data Validation", function () {
    var lower = this.DataType2.TextAera.toLowerCase();
    //Validating details view input data
    cy.get('[name="TextAera"]').eq(1).should("have.value", this.NewKitItemData.TextAera)

  });

  it.only('Currency Element data Validation', function () {
    var currency = this.DataType2.Currency.toLowerCase();
    //Assertion Validation for currency
    cy.xpath('//div[@class="kit-control-' + currency + '--right ma-0 pa-0 col"]//div[@class="v-text-field__slot"]//label[@class="v-label v-label--active theme--light"]')
      .next('input').should("have.value", this.NewKitItemData.Currency)
  })

  it.only('Measure Element data Validation', function () {
    var measure = this.DataType2.Measure.toLowerCase();
    //Assertion Validation for currency
    cy.xpath('//div[@class="kit-control-' + measure + '--left ma-0 pa-0 pr-2 col"]//div[@class="v-text-field__slot"]//label[@class="v-label v-label--active theme--light"]')
      .next('input').should("have.value", this.NewKitItemData.Measure)
  })

  it.only("Email Element data Validation", function () {
    var lower = this.DataType2.Email.toLowerCase();
    //Validating details view input data
    cy.xpath("//input[@controlname='" + lower + "']").should("have.value", this.NewKitItemData.Email)
  });

  it.only("Addressline1 Element data Validation", function () {
    cy.get('[placeholder="Street address, building, company ... "]').scrollIntoView({ force: true })
    //Validating details view input data
    cy.get('[placeholder="Street address, building, company ... "]')
      .should("have.value", this.NewKitItemData.Addressline1)
  });

  it.only("Addressline2 Element data Validation", function () {
    //Validating details view input data
    cy.get('[name="Address line 2."]')
      .should("have.value", this.NewKitItemData.Addressline2)
  });

  it.only("City Element data Validation", function () {
    //Validating details view input data
    cy.get('[placeholder="City"]')
      .should("have.value", this.NewKitItemData.City)
  });

  it.only("ZipCode Element data Validation", function () {
    cy.get('[placeholder="Zip/Postal Code"]').scrollIntoView({ force: true })
    //Validating details view input data
    cy.get('[placeholder="Zip/Postal Code"]')
      .should("have.value", this.NewKitItemData.ZipCode)
  });

  it.only("State Element data Validation", function () {
    cy.xpath('//div[@class="v-select__slot"]//div[@class="v-select__selections"]//div[@class="v-select__selection v-select__selection--comma"]')
      .eq(0)
      .invoke('text').then((text) => {
        expect(text.trim()).equal(this.NewKitItemData.State)
      })
  });

  it.only("Country Element data Validation", function () {
    //Validating details view input data
    cy.get('[placeholder="Country"]')
      .should("have.value", this.NewKitItemData.Country)
  });

  it.only("Number Element data Validation", function () {
    var lower = this.DataType2.Number.toLowerCase();
    //Validating details view input data
    cy.xpath("//input[@controlname='" + lower + "']")
      .should("have.value", this.NewKitItemData.Number)
  });

  it.only('Time Element data Validation', function () {
    //json value assertion
    cy.get('[placeholder="Add Time"]').eq(1)
      .should("have.value", this.NewKitItemData.LoggedTime)
  })

  it.only('Date Element data Validation', function () {
    //json value assertion
    cy.get('[placeholder=" MM / DD / YYYY"]')
      .should("have.value", this.NewKitItemData.LoggedDate)
  })

  it.only("Toggle Element data Validation", function () {
    cy.xpath('//div[@class="pl-3 col"]//div[@class="v-input--selection-controls__input"]//input')
      .should('have.attr', 'aria-checked', 'true')
  });

  it.only("SelectList Element data Validation", function () {
    //json value assertion
    var selectList = this.DataType2.SelectListName.toLowerCase();
    cy.xpath('//div[@controlname="selectList"]//div[@class="v-list-item__subtitle"]')
      .invoke('text').then((text) => {
        expect(text.trim()).equal(this.NewKitItemData.SelectListValue)
      });
  })

  it.only('RadioSelect Element data Validation', function () {
    var radio = this.DataType2.RadioSelectName.toLowerCase();
    //json value assertion
    cy.xpath('//div[@controlname="radioSelect"]//div[@class="v-input__slot"]//div[@class="v-radio theme--light v-item--active"]//div[@class="v-list-item__content"]')
      .invoke('text')
      .then((text) => {
        cy.log(text)
        expect(text.trim()).contains(this.NewKitItemData.RadioSelectValue)
      });
  })

  it.only("CheckboxSelect Element data Validation", function () {
    //CheckboxSelect1
    //json value assertion
    cy.get('[type="checkbox"]').eq(1).should('be.checked')
    cy.get('[type="checkbox"]').last().should('be.checked')
  });

  it.only('Stepper Element data Validation', function () {
    //json value assertion
    var stepper = this.DataType2.StepperName.toLowerCase();
    cy.xpath('//div[@controlname="' + stepper + '"]//div[@class="v-stepper__header"]//div[@class="v-stepper__step v-stepper__step--inactive v-stepper__step--complete"]//div[@class="v-list-item__subtitle"]')
      .invoke('text').then((text) => {
        expect(text.trim()).equal(this.NewKitItemData.StepperValue)
      })
  });

  it.only('UserSelector Element data Validation', function () {
    //scroll to user selector
    cy.get('.imageContent').eq(0).scrollIntoView({ force: true })
    cy.wait(1000)
    //json value assertion
    cy.xpath('//div[@controlname="userSelector"]//div[@class="col item-label"]').children('div').invoke('text').then((text) => {
      expect(text.trim()).equal(this.NewKitItemData.UserSelectorName)
    });
  })

  it.only('ContactSelector Element data Validation', function () {
    //json value assertion
    cy.xpath('//div[@controlname="contactSelector"]//div[@class="col item-label"]').children('div').invoke('text').then((text) => {
      expect(text.trim()).equal(this.NewKitItemData.ContactSelectorName)
    });
  })

  it.only('Assigning Element data Validation', function () {
    var lower = this.DataType2.Assigning.toLowerCase();
    cy.get('.v-btn:nth-child(1) .v-badge > .inline-svg').scrollIntoView({ force: true })
    //json value assertion
    cy.xpath('//div[@controlname="assigning"]//div[@class="item-label col"]').children('div').invoke('text')
      .then((text) => {
        expect(text.trim()).equal(this.NewKitItemData.AssigningName)
      });
  })

  it.only('Inspection Element data Validation', function () {
    //json value assertion
    var inspection = this.DataType2.InspectionName.toLowerCase();
    cy.xpath('//div[@controlname="' + inspection + '"]//div[@class="v-slide-group__content"]').children('span.v-chip--active')
      .invoke('text').then((text) => {
        expect(text.trim()).equal(this.NewKitItemData.InspectionValue)
      });
  });

  it.only('Icon Element data Validation', function () {
    //Validating details view input data
    //json value assertion
    cy.get('[placeholder="Label"]')
      .should("have.value", this.NewKitItemData.IconLabel)
  })

  it.only("Group tab data Validation in details view", function () {
    //Click on group
    cy.contains("Groups").click({ force: true });
    cy.contains(this.SData.AddGroup).should("not.exist");

    cy.log("Added group exist");
  });

  it.only("Comments tab data Validation in details view", function () {
    cy.contains("Comments").click({ force: true });
    cy.wait(1000);
    cy.contains(this.SData.AddComments).should("be.visible");
    cy.log("Created comments exist");

  });

  it.only("Time Entries tab data Validation in details view", function () {
    cy.contains("Time Entries").click({ force: true });
    cy.wait(2000);
    cy.get(".time-entry-author__name").should(
      "have.text",
      this.SData.TimeEntryConnection
    );
    cy.get(".time-entry__description").should(
      "have.text",
      this.SData.AddDescription
    );
    cy.get(".time-entry__hours").should(
      "have.text",
      this.SData.TotalHours + " h"
    );

  });

  it.only("Files tab data Validation in details view", function () {
    cy.contains("Files").click({ force: true });
    cy.contains(this.NewKitItemData.NewFormLibFileName).should("be.visible");
    cy.contains(this.SData.FileTabFileName).should("be.visible");
    cy.log("Uploaded files exist");

  });

  it.only("Contributors tab data Validation in details view", function () {
    cy.contains("Contributors").click({ force: true })
    cy.contains(this.SData.ContributorsName).should('exist')
    cy.contains(this.NewKitItemData.AssigningName).should('exist')
  });
});

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
  });
});