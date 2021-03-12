import LoginPage from "../PageObject/LoginPage";
import SanityLoginPage from "../PageObject/SanityLoginPage";

describe("New created kit item creation Validation test case", function () {
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
    //lp.EnterEmail("sam@armyspy.com");
    lp.EnterEmail("propertymanagement@commonareas.work.dev");

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

    cy.wait(4000);
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

  it.only("Click on list view and select kit type to Validate", function () {
    const lp = new LoginPage();
    //Click on Hamburger Icon
    lp.HMBIcon();
    cy.contains(this.NewKitItemData.KitName).scrollIntoView({
      force: true,
    });
    //scroll to Open KitType from left panel
    cy.contains(this.NewKitItemData.KitName).scrollIntoView({ force: true })
    //Open KitType from left panel
    cy.contains(this.NewKitItemData.KitName).click({
      force: true,
    });
    cy.log("Kit Type has been OPened");
    //Click on First kit item of kit type to open edit view
    cy.log("Kit Item Detail View has been Opened");
    //Validation assertion for details view
    cy.get(".kits-landing--header-title").should(
      "have.text",
      " Recently Viewed "
    );

    //Created kit type existance assertion
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).should("exist");
    cy.log("Created New Kit Item has been Exist");
    //Click on created kit item
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).click({ force: true });
    //element visible validation
    cy.wait(4000)
    cy.get("[name" + "=" + this.DataType2.Url + "]").last()
      .should('be.visible')
  });


  it.only("Url Element data Validation", function () {
    var lower = this.DataType2.Url.toLowerCase();
    //Validating details view input data
    cy.xpath("//input[@controlname='" + lower + "']").should("have.value", this.NewKitItemData.Url)
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
    cy.get('[name="TextAera"]').eq(3).should("have.value", this.NewKitItemData.TextAera)

  });

  it.only('Currency Element data Validation', function () {
    var lower = this.DataType2.Currency.toLowerCase();
    //Assertion Validation for currency
    cy.xpath('//div[@class="kit-control-currency--right ma-0 pa-0 col"]//div[@class="v-text-field__slot"]//label[@class="v-label v-label--active theme--light"]')
      .next('input').should("have.value", this.NewKitItemData.Currency)
  })

  it.only('Measure Element data Validation', function () {
    var lower = this.DataType2.Currency.toLowerCase();
    //Assertion Validation for currency
    cy.xpath('//div[@class="kit-control-measure--left ma-0 pa-0 pr-2 col"]//div[@class="v-text-field__slot"]//label[@class="v-label v-label--active theme--light"]')
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

    cy.get('[placeholder="Add Time"][readonly="readonly"]').eq(1)
      .should("have.value", this.NewKitItemData.LoggedTime)
  })

  it.only('Date Element data Validation', function () {

    cy.get('[placeholder=" MM / DD / YYYY"]')
      .should("have.value", this.NewKitItemData.LoggedDate)

  })

  it("SelectList Element data Validation", function () {

    var lower = this.DataType2.Number.toLowerCase();
    //logging input data on console
    cy.xpath("//div[contains(@class, 'v-list-item__subtitle') and contains(text(),' Australia ')]")
      .invoke('val')
      .then(text => {
        const SelectList = text;
        cy.log(SelectList);
      })

  });

  it("RadioSelect Element data Validation", function () {
    cy.get('.v-radio').eq(1).should('be.checked')

  });

  it.only("CheckboxSelect Element data Validation", function () {

    //CheckboxSelect1
    cy.get('[type="checkbox"]').eq(3).should('be.checked')
    cy.get('[type="checkbox"]').last().should('be.checked')
  });

  it.only('UserSelector Element data Validation', function () {
    //scroll to user selector
    cy.get('.imageContent').eq(0).scrollIntoView({ force: true })
    cy.wait(1000)
    cy.xpath('//div[@controlname="userSelector"]//div[@class="col item-label"]').children('div').invoke('text').then((text) => {
      expect(text.trim()).equal(this.NewKitItemData.UserSelectorName)
    });
  })

  it.only('ContactSelector Element data Validation', function () {

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

  it.only('Icon Element data Validation', function () {
    //Validating details view input data
    cy.get('[placeholder="Label"]')
      .should("have.value", this.NewKitItemData.IconLabel)
  })


  it.only("Group tab data Validation in details view", function () {
    //Click on group
    cy.contains("Groups").click({ force: true });
    cy.contains(this.SData.AddGroup).should("be.visible");

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

  it.only("Contributors tab data Validation in details view", function () {
    cy.contains("Contributors").click({ force: true })

    cy.get(".contributor__name")
      .eq(0)
      .should("have.text", this.SData.ContributorsName);

    cy.get(".contributor__name")
      .eq(2)
      .should("have.text", this.NewKitItemData.AssigningName);
    cy.log("Added Contributors exist");

  });

  it.only("Files tab data Validation in details view", function () {
    cy.contains("Files").click({ force: true });
    cy.contains(this.NewKitItemData.NewFormLibFileName).should("be.visible");
    cy.contains(this.SData.FileTabFileName).should("be.visible");
    cy.log("Uploaded files exist");

  });
});
