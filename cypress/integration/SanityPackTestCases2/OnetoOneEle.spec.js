import LoginPage from "../PageObject/LoginPage";
import KitTypePage from "../PageObject/KitTypePage";
import SanityLoginPage from "../PageObject/SanityLoginPage";

describe("Only One to One Related Control Element Test Case", function () {
  this.beforeAll(function () {
   
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

    //Globally fixtures for login creads
    cy.fixture("LoginTestData/GlobalLoginCreds").then(function (
      LogInScriptGloably
    ) {
      this.LoginCreds = LogInScriptGloably;
    });
    //////////////////////////////////////////////////////////////////////////////////////

    cy.fixture("SanityPackTestData2/RelatedOneToOneData").then(function (
      SanityTCData
    ) {
      this.RelatedKitItemData = SanityTCData;
    });


    cy.fixture("VerificationTestCasesData/KitBuilderDataTypes2").then(function (
      NewDataForElements
    ) {
      this.DataType2 = NewDataForElements;
    });

    cy.fixture("KitTypeTestData/NewKitItemDataValues").then(function (
      KitDataEle
    ) {
      this.NewKitItemData = KitDataEle;
    });
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  });

  it.only('Login TestCase',function(){
    const lp = new LoginPage();
    const slp = new SanityLoginPage();
    slp.LoginUrl(this.LoginCreds.CAUrl)
    //Handling Alert
    cy.on("window:confirm", () => {
      cy.log("Alert has been Handled");
    });
    //Login Assertions
    cy.contains(" Log In ").should("be.visible");
    //Enter credentials
    lp.EnterEmail(this.LoginCreds.username);
    lp.EnterPassword(this.LoginCreds.Password);
    lp.Submit();
    cy.log("User has been Logged In into the application");
    cy.wait(5000)
  })

  it.only("Navigating to New form of created Kit type", function () {
    cy.wait(5000);
    const lp = new LoginPage();
    const KTP = new KitTypePage();
    //Assertion
    cy.title().should("eq", "Common Areas");
    lp.PlusIcon();
    //debugger;
    //Click on To open Kit Type
    KTP.SearchKitType(this.NewKitItemData.KitName);
    cy.wait(1000);
    //This is class to open searched kit type by clicking + iocn
    cy.get(".truncate-special").first().click({ force: true });
    cy.wait(1000);
    //Assertion
    cy.contains("New Item created").should("be.visible");
    cy.log("New Item created and Kit Type has been Opened");
  });

  it.only("Create Related New for One to One Related Control", function () {
    //Url
    cy.get("[name" + "=" + this.DataType2.Url + "]").should("be.visible");
    //save Kit Item for empty form
    cy.get(".v-select__selections .v-btn__content").first().click({ force: true });
    //kit item Save Assertion for no data
    cy.contains("Nothing to save for " + this.NewKitItemData.KitName).should(
      "be.visible"
    );
    cy.wait(1000);
    cy.log("With No data new kit item saved successfully ");

    //Scroll
    cy.get(".mr-4 > .inline-svg > path").last().scrollIntoView({ force: true });
    cy.wait(2000);

    //Click on New Item for one to one Related Control
    cy.get(".mr-4 > .inline-svg > path").last()
      .scrollIntoView({ force: true })
      .click({ force: true });
    //New Item Assertion
    cy.contains("New Item created").should("be.visible");
    //Related Kit Assertion
    cy.contains(this.DataType2.KitToBeRelated).should("be.visible");
    cy.wait(4000);

    ///Related New form element assertion
    cy.get("[name" + "=" + this.DataType2.Text + "]").should("be.visible");
    cy.wait(2000);

    //save related new with no data
    cy.get(".v-select__selections .v-btn__content")
      .first()
      .click({ force: true });
    //kit item Save Assertion for no data
    cy.contains("Nothing to save for " + this.DataType2.KitToBeRelated).should(
      "be.visible"
    );


    //Enter data in Related New form
    cy.wait(2000);
    cy.xpath('//div[@class="wrapper-card-buttons d-flex justify-end col"]//div[@class="mr-4 action-icon"]')
      .eq(0)
      .click({ force: true });

    cy.contains('Edit Link').should('be.visible')
    //Enter lable
    cy.get('[placeholder="Label"]').first().type(this.RelatedKitItemData.Url)
    //Url Link
    cy.get("[placeholder" + "=" + this.DataType2.Url + "]").first()
      .type(this.RelatedKitItemData.Url);
    //Click on save
    cy.get('.button-pop-ups--size > .v-btn__content').first().click({ force: true });
    cy.wait(1000)

    //Text
    cy.get("[name" + "=" + this.DataType2.Text + "]")
      .eq(1)
      .type(this.RelatedKitItemData.Text);

    //File
    cy.get(".dropzone-icons-content > .clickable path")
      .eq(0)
      .click({ force: true });
    //cy.get(".link-icon--green > path").last().click({ force: true });
    cy.wait(1000);
    //give file name to select
    cy.contains(this.RelatedKitItemData.RelNewFileName).click({
      force: true,
    });
    //Click on save file
    cy.get(
      ".container-search > .pop-up--header > .pop-up--header--right > .button-pop-ups--size > .v-btn__content"
    ).click({ force: true });
    cy.contains("File saved").should("be.visible");
    cy.log("File Saved");

    //Telephone
    cy.get("[name" + "=" + this.DataType2.Telephone + "]")
      .eq(1)
      .type(this.RelatedKitItemData.Telephone);

    //TextAera
    cy.get("[name" + "=" + this.DataType2.TextAera + "]")
      .eq(1)
      .type(this.RelatedKitItemData.TextAera);

    //Slider
    cy.xpath('//div[@class="v-slider v-slider--horizontal theme--light"]//div[@class="v-slider__track-container"]')
      .eq(0)
      .invoke('val', this.NewKitItemData.SliderValue)
      .trigger('change').click({ force: true })


    // Currency;
    cy.get(
      "#inspire > div.v-dialog__content.v-dialog__content--active > div > div > div > div:nth-child(2) > div.new-kit-item.v-card.v-sheet.theme--light > div > div > div > div > div.row.kit-details-wrapper--content.pb-0 > div > div > div > div > div > div > div.tab--content.col > div > div > div.v-window-item.v-window-item--active > div > div > div.row.container-details > div.fill-height.col > div > div > div.kit-control-component.kit-control-currency.px-3.col.col-sm-12.col-md-6.mb-4.px-3 > div > div.kit-control-currency--right.ma-0.pa-0.col > div > div > div.v-input__slot > div"
    )
      .eq(0)
      .click({ force: true })
      .type(this.RelatedKitItemData.Currency);

    //Measure
    cy.get(
      "#inspire > div.v-dialog__content.v-dialog__content--active > div > div > div > div:nth-child(2) > div.new-kit-item.v-card.v-sheet.theme--light > div > div > div > div > div.row.kit-details-wrapper--content.pb-0 > div > div > div > div > div > div > div.tab--content.col > div > div > div.v-window-item.v-window-item--active > div > div > div.row.container-details > div.fill-height.col > div > div > div.kit-control-component.kit-control-measure.px-3.col.col-sm-12.col-md-6.mb-4.px-3 > div > div.kit-control-measure--left.ma-0.pa-0.pr-2.col > div > div > div.v-input__slot > div"
    )
      .eq(0)
      .click({ force: true })
      .type(this.RelatedKitItemData.Measure);

    //Email;
    cy.get("[name" + "=" + this.DataType2.Email + "]")
      .eq(1)
      .type(this.RelatedKitItemData.Email);

    //Address
    cy.get('[placeholder="Street address, building, company ... "]')
      .eq(0)
      .type(this.RelatedKitItemData.Addressline1);
    //Address line
    cy.get('[name="Address line 2."]')
      .eq(0)
      .type(this.RelatedKitItemData.Addressline2);

    cy.get('[placeholder="City"]').eq(0).scrollIntoView({ force: true });
    cy.wait(1000);

    //City
    cy.get('[placeholder="City"]').eq(0).type(this.RelatedKitItemData.City);
    //State
    cy.get(
      "div:nth-child(2) > div:nth-child(4) > div > div > div.v-input__slot > div.v-select__slot > div.v-input__append-inner > div"
    )
      .eq(0)
      .click({ force: true });
    cy.contains(this.RelatedKitItemData.State).click({ force: true });

    cy.get('[placeholder="Zip/Postal Code"]')
      .eq(0)
      .scrollIntoView({ force: true });
    cy.wait(1000);

    //ZipCode
    cy.get('[placeholder="Zip/Postal Code"]')
      .eq(0)
      .type(this.RelatedKitItemData.ZipCode);

    //save related new
    cy.get(".v-select__selections .v-btn__content")
      .first()
      .click({ force: true });
    //Related kit item Save Assertion
    cy.contains(this.DataType2.KitToBeRelated + " has been saved").should(
      "be.visible"
    );
    cy.log(this.DataType2.KitToBeRelated + " related new has been Saved");

    //Related kit item created assertion
    cy.contains(
      " Relation on " +
      this.DataType2.OneToOneRelation +
      " for " +
      this.NewKitItemData.KitName +
      " created"
    ).should("be.visible");

    //close the Kit Item
    cy.wait(5000);
    //Close Kit type
    cy.get(".subheader--button-icon-wrapper path").first().click({
      force: true,
    });
    cy.contains(this.NewKitItemData.KitName).should("be.visible");
    cy.log("Related new has been Close");
    cy.wait(10000);
  });

  it.only("New form save validation", function () {
    //Scroll
    cy.get(".last-updated:nth-child(2) > .v-icon").scrollIntoView({
      force: true,
    });
    //One to one link item assetion
    cy.wait(2000);
    //Validate cross to delete icon
    cy.get(".last-updated:nth-child(2) > .v-icon").should('be.visible')

    //save Kit item (new form)
    cy.get(".v-select__selections .v-btn__content")
      .first()
      .click({ force: true });
    // kit item Save Assertion
    cy.contains(this.NewKitItemData.KitName + " has been saved").should(
      "be.visible"
    );
    cy.log("Kit Item has been saved");
    //Again save Kit item(new form)
    cy.get(".v-select__selections .v-btn__content")
      .first()
      .click({ force: true });
    //kit item Save Assertion for nothing
    cy.contains("Nothing to save for " + this.NewKitItemData.KitName).should(
      "be.visible"
    );
    cy.log("There is nothing to save for Kit Item");
  });

  it.only('Close New form', function () {
    //close the Kit Item
    cy.get(".subheader--button-icon-wrapper path").click({
      force: true,
    });
    cy.log(this.NewKitItemData.KitName + "Kit item has been Close");
    cy.wait(4000)
  })

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
    cy.xpath("//*[contains(@class, 'd-flex col-9')]//*[text() = '" + this.NewKitItemData.KitName + "']")
      .click({
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
    cy.wait(3000)
  });

  it.only('Click to Open created kit Item', function () {
    //Click on sorting icon
    cy.get('.sort:nth-child(6) .st0').click({ force: true });
    cy.wait(3000)
    //Click on created date by descending  order
    cy.get('.sort:nth-child(6) .row:nth-child(2) .click--area:nth-child(1) path:nth-child(1)')
      .click({ force: true });
    cy.wait(4000)
    //click on created kit item
    cy.get('.row:nth-child(1) > .d-flex .v-list-item__subtitle:nth-child(1)')
      .click({ force: true });
    cy.wait(2000)
  })

  it.only('Validate created onetoone related item', function () {
    //Scrolling to one to one
    cy.get(".ca-item").eq(1).scrollIntoView({ force: true });
    cy.wait(2000);
    cy.get(".last-updated:nth-child(1) > .v-icon").scrollIntoView({
      force: true,
    });
    cy.wait(1000);
    //Click on edit icon of one to one related control
    cy.get(".last-updated:nth-child(1) > .v-icon").click({ force: true });
    //Related Kit Assertion
    cy.contains(this.DataType2.KitToBeRelated).should("be.visible");
    cy.wait(10000);
    //save related new with out updation
    cy.get(".v-select__selections .v-btn__content")
      .first()
      .click({ force: true });

    //kit item Save Assertion for no data
    cy.contains("Nothing to save for " + this.DataType2.KitToBeRelated).should(
      "be.visible"
    );
  })

  it.only("Url Element data Validation", function () {
    var lower = this.DataType2.Url.toLowerCase();
    //Validating details view input data
    cy.xpath("//input[@controlname='" + lower + "']").should("have.value", this.RelatedKitItemData.Url)
  });


  it.only("Text Element data Validation", function () {
    var lower = this.DataType2.Text.toLowerCase();
    //Validating details view input data
    cy.xpath("//input[@controlname='" + lower + "']").should("have.value", this.RelatedKitItemData.Text)
  });

  it.only('File Element data Validation', function () {
    var lower = this.DataType2.File.toLowerCase();
    cy.xpath('//div[@class="drop-zone"]//div[@class="v-input__slot"]//div[@class="v-text-field__slot"]//input').eq(0)
      .invoke('val').then((text) => {
        expect(text.trim()).equal(this.RelatedKitItemData.RelNewFileName)
      });
  })


  it.only("Telephone Element data Validation", function () {
    var lower = this.DataType2.Telephone.toLowerCase();
    //Validating details view input data
    cy.xpath("//input[@controlname='" + lower + "']").should("have.value", this.RelatedKitItemData.Telephone)
  });


  it.only("TextAera Element data Validation", function () {
    var lower = this.DataType2.TextAera.toLowerCase();
    //Validating details view input data
    cy.get('[name="TextAera"]').eq(1).should("have.value", this.RelatedKitItemData.TextAera)
  });

  it.only("Slider Element data Validation", function () {
    //Validation for True Value 
    cy.xpath('//div[@class="v-input v-input--is-label-active v-input--is-dirty theme--light v-input__slider"]//div[@class="v-slider v-slider--horizontal theme--light"]//input')
      .invoke('val').then((text) => {
        cy.log(text)
        expect(text).equal(this.NewKitItemData.SliderValue)
      })
  })

  it.only('Currency Element data Validation', function () {
    var currency = this.DataType2.Currency.toLowerCase();
    //Assertion Validation for currency
    cy.xpath('//div[@class="kit-control-' + currency + '--right ma-0 pa-0 col"]//div[@class="v-text-field__slot"]//label[@class="v-label v-label--active theme--light"]')
      .next('input').should("have.value", this.RelatedKitItemData.Currency)
  })

  it.only('Measure Element data Validation', function () {
    var measure = this.DataType2.Measure.toLowerCase();
    //Assertion Validation for currency
    cy.xpath('//div[@class="kit-control-' + measure + '--left ma-0 pa-0 pr-2 col"]//div[@class="v-text-field__slot"]//label[@class="v-label v-label--active theme--light"]')
      .next('input').should("have.value", this.RelatedKitItemData.Measure)
  })

  it.only("Email Element data Validation", function () {
    var lower = this.DataType2.Email.toLowerCase();
    //Validating details view input data
    cy.xpath("//input[@controlname='" + lower + "']").should("have.value", this.RelatedKitItemData.Email)

  });

  it.only("Addressline1 Element data Validation", function () {
    //Validating details view input data
    cy.get('[placeholder="Street address, building, company ... "]').eq(0)
      .should("have.value", this.RelatedKitItemData.Addressline1)

  });

  it.only("Addressline2 Element data Validation", function () {
    //Validating details view input data
    cy.get('[name="Address line 2."]')
      .should("have.value", this.RelatedKitItemData.Addressline2)
  });

  it.only("City Element data Validation", function () {
    //Validating details view input data
    cy.get('[placeholder="City"]')
      .should("have.value", this.RelatedKitItemData.City)
  });

  it.only("ZipCode Element data Validation", function () {
    //Validating details view input data
    cy.get('[placeholder="Zip/Postal Code"]').eq(0)
      .should("have.value", this.RelatedKitItemData.ZipCode)
  });

  it.only("State Element data Validation", function () {
    cy.xpath('//div[@class="v-select__slot"]//div[@class="v-select__selections"]//div[@class="v-select__selection v-select__selection--comma"]')
      .eq(0)
      .invoke('text').then((text) => {
        expect(text.trim()).equal(this.RelatedKitItemData.State)
      })
  });

  it.only("Country Element data Validation", function () {
    //Validating details view input data
    cy.get('[placeholder="Country"]')
      .should("have.value", this.RelatedKitItemData.Country)
  });




});
