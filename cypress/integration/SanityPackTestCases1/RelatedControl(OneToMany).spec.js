import LoginPage from "../PageObject/LoginPage";
import KitTypePage from "../PageObject/KitTypePage";
import SanityLoginPage from "../PageObject/SanityLoginPage";

describe("Related Control One to Many test case", function () {
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
    ////////////////////////////////////////////////////////////////////////////////////////////

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

    /////////////////////////////////////////////////////////////////////////////////////////////////////////

    cy.fixture("KitBuilderTestData/FormViewsNameData").then(function (
      KitTypeFormViewsNames
    ) {
      this.ViewName = KitTypeFormViewsNames;
    });
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
    cy.wait(10000);
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

  it.only("One to Many Related Control to configure (Related New form)", function () {
    //Url
    cy.get("[name" + "=" + this.DataType2.Text + "]").should("be.visible");
    //save Kit Item for empty form
    cy.get(".v-select__selections .v-btn__content").first().click({ force: true });
    //kit item Save Assertion for no data
    cy.contains("Nothing to save for " + this.NewKitItemData.KitName).should(
      "be.visible"
    );
    cy.wait(1000);
    cy.log("With No data new kit item saved successfully ");

    //click on URl pancil icon
    cy.xpath('//div[@class="wrapper-card-buttons d-flex justify-end col"]//div[@class="mr-4 action-icon"]')
      .eq(0)
      .click({ force: true });
    cy.contains('Edit Link').should('be.visible')
    //Enter lable
    cy.get('[placeholder="Label"]').first().type(this.RelatedKitItemData.NewKitItemUrl)
    //Url Link
    cy.get("[placeholder" + "=" + this.DataType2.Url + "]")
      .type(this.RelatedKitItemData.NewKitItemUrl);
    //Click on save
    cy.get('.button-pop-ups--size > .v-btn__content').click({ force: true });
    cy.wait(1000)

    //Text
    cy.get("[name" + "=" + this.DataType2.Text + "]")
      .last()
      .type(this.RelatedKitItemData.NewKitItemText);

    //Scroll
    cy.get(".ca-item").eq(1).scrollIntoView({ force: true });
    cy.wait(1000);
    //Click on New Item for one to Many Related Control
    cy.get(".ca-item")
      .eq(1)
      .scrollIntoView({ force: true })
      .click({ force: true });
    //New Item Assertion
    cy.contains("New Item created").should("be.visible");
    //Related Kit Assertion
    cy.contains(this.DataType2.KitToBeRelated).should("be.visible");
    cy.wait(1000);


    //Related New form element assertion
    cy.get("[name" + "=" + this.DataType2.Url + "]").should("be.visible");
    cy.wait(2000);

    //save related new with no data
    cy.get(".v-select__selections .v-btn__content")
      .first()
      .click({ force: true });
    //kit item Save Assertion for no data
    cy.contains("Nothing to save for " + this.DataType2.KitToBeRelated).should(
      "be.visible"
    );
    cy.wait(1000)

    //click on URl pancil icon
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


    // //File
    // cy.get(".dropzone-icons-content > .clickable path")
    //   .eq(0)
    //   .click({ force: true });
    // //cy.get(".link-icon--green > path").last().click({ force: true });
    // cy.wait(1000);
    // //give file name to select
    // cy.contains(this.RelatedKitItemData.RelNewFileName).click({
    //   force: true,
    // });
    // //Click on save file
    // cy.get(
    //   ".container-search > .pop-up--header > .pop-up--header--right > .button-pop-ups--size > .v-btn__content"
    // ).click({ force: true });
    // cy.contains("File saved").should("be.visible");
    // cy.log("File Saved");


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

    //scroll
    cy.get('[placeholder="Street address, building, company ... "]')
      .eq(0).scrollIntoView({ force: true })
    cy.wait(1000)

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

    //Number
    cy.get("[name" + "=" + this.DataType2.Number + "]")
      .eq(0)
      .type(this.RelatedKitItemData.Number);

    //Time Data Element
    //Click on Time to appear time pop up
    cy.get('[placeholder="Add Time"][type="text"]')
      .eq(0)
      .click({ force: true });
    cy.wait(1000);
    //Select hour value
    cy.xpath(
      "//div[contains(@class,'v-dialog v-dialog--active')]//span[5]"
    ).click({ force: true });
    //Select Value of miniutes
    cy.xpath("//span[contains(text(),'30')]").first().click({ force: true });
    //Click on PM
    cy.xpath("//div[contains(text(),'PM')]").first().click({ force: true });
    //Click on OK to save date
    cy.xpath(
      "//div[contains(@class,'v-dialog v-dialog--active')]//button[1]"
    ).click({ force: true });

    //Date Data Element
    //Click on Date to appear Date pop up
    cy.get(
      "div.v-input.no-bottom.date-picker-text-field.date-picker-text-field-direct.theme--light.v-text-field.v-text-field--is-booted.v-text-field--enclosed.v-text-field--outlined.v-text-field--placeholder > div > div.v-input__slot > div.v-input__prepend-inner > i"
    )
      .eq(0)
      .click({ force: true });
    cy.wait(1000)
    //Select Date
    cy.xpath("//div[@class='v-btn__content'][contains(text(),'22')]")
      .first()
      .click({ force: true });
    //Click on OK to save Date
    cy.xpath("//span[contains(text(),'OK')]").first().click({ force: true });

    //Toggle
    cy.get(".sync-switch .v-input--selection-controls__ripple").eq(0).click({
      force: true,
    });

    //Click on DropDown of SelectList
    cy.wait(1000);
    cy.get(
      "div > div > div.v-input__slot > div.v-select__slot > div.v-input__append-inner"
    )
      .eq(4)
      .click({ force: true });
    //SelectList Value(Values coming form KitItemValues Json File)
    cy.contains(this.RelatedKitItemData.SelectListValue).click({ force: true });
    cy.log("SelectList Value has been set.");

    //RadioSelect
    cy.contains(this.RelatedKitItemData.RadioSelectValue).click({
      force: true,
    });
    cy.log("RadioSelect Value has been set.");

    //CheckboxSelect(Values coming form KitItemValues Json File)
    cy.contains(this.NewKitItemData.CheckboxSelectValue3).click({
      force: true,
    });
    cy.log("Checkbox Values has been set.");
    cy.wait(1000);

    cy.get(".searchIcon").eq(1).scrollIntoView({ force: true });

    //Stepper
    //getting value form different json file
    cy.contains(this.RelatedKitItemData.StepperValue).click({ force: true });
    cy.log("Stepper Value has been set.");


    //UserSelector(Values coming form KitItemValues Json File)
    //Click on to open UserSelector Pop up
    cy.get(".searchIcon").eq(0).click({ force: true });
    cy.contains(" Users ").should("be.visible");
    cy.xpath('//*[text() ="Search"]').first().click({ force: true })
    cy.wait(1000)
    cy.xpath('//*[text() ="Search"]').first().next('input')
      .type(`${this.RelatedKitItemData.UserSelectorName}{enter}`)
    cy.wait(3000)
    cy.contains(this.RelatedKitItemData.UserSelectorName).click({
      force: true,
    });
    cy.log("UserSelect added");
    cy.wait(1000);

    //ContactSelector(Values coming form KitItemValues Json File)
    //Click on to open ContactSelector Pop up
    cy.get(".searchIcon").eq(1).click({ force: true });
    cy.contains(" Connection ").should("be.visible");
    cy.wait(1000)
    cy.xpath('//*[text() ="Search"]').first().click({ force: true })
    cy.wait(1000)
    cy.xpath('//*[text() ="Search"]').first().next('input')
      .type(`${this.RelatedKitItemData.ContactSelectorName}{enter}`)
    cy.wait(3000)
    cy.contains(this.RelatedKitItemData.ContactSelectorName).click({
      force: true,
    });
    cy.log("ContactSelecto added");
    cy.wait(1000);

    //getting value form different json file
    //Icon
    //Click on + icon of ICON Element
    cy.get(".v-btn--depressed > .v-btn__content > .inline-svg > path")
      .eq(0)
      .click({
        force: true,
      });
    //Click on Icon Tittle and  select Icon logo
    //Give numeric no from 1 in child(1,2,3...)
    cy.get(".thumb-container:nth-child(4) .selected-icon").click({
      force: true,
    });
    //Icon Save
    cy.get(".button-pop-ups").click({ force: true });

    //IcozSize
    cy.get(
      "div.row.wrapper-kit-control.align-center > div > div.fill-height.border-right.col.col-4 > div > div > div.v-input__slot > div.v-select__slot > div.v-input__append-inner > div"
    )
      .eq(0)
      .click({ force: true });
    cy.contains(this.RelatedKitItemData.LargeiconSize).click({ force: true });
    //IconLable
    cy.get('[placeholder="Label"]')
      .eq(1)
      .type(this.RelatedKitItemData.IconLabel);

    //Inspection
    cy.get('.v-btn:nth-child(1) .v-badge > .inline-svg').first()
      .scrollIntoView({ force: true })
    cy.wait(1000)
    cy.xpath("//*[contains(text(),'" + this.RelatedKitItemData.InspectionValue + "')]//div[@class='v-avatar v-avatar--left']").first()
      .click({ force: true })
    cy.wait(1000);

    //Assigning
    //Click on to open Assigning Pop up-Also working

    //Click on to open Assigning Pop up
    cy.get(".searchIcon").eq(2).click({ force: true });
    cy.wait(3000);
    //Click on to select the Assigning
    cy.wait(1000)
    cy.xpath('//*[text() ="Search"]').first().click({ force: true })
    cy.wait(1000)
    cy.xpath('//*[text() ="Search"]').first().next('input')
      .type(`${this.RelatedKitItemData.AssigningName}{enter}`)
    cy.wait(3000)
    cy.contains(this.RelatedKitItemData.AssigningName).click({ force: true });
    cy.wait(1000);
    //Click on to save
    cy.get(".button-pop-ups--size > .v-btn__content").first().click({ force: true });
    //Assigning creation assertion
    cy.contains("Item shared").should("be.visible");
    cy.log("Assigning added");

    //Onetoone link
    cy.get(".action-icon:nth-child(2) path").eq(1).click({ force: true });
    //OneToOne
    cy.get(
      ".row:nth-child(1) > .d-flex > .list-item-col-left > .v-avatar:nth-child(1) svg"
    ).click({ force: true });

    //Link onetoone assertion
    cy.get(".last-updated:nth-child(2) > .v-icon").should('be.visible')
    cy.wait(4000)

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
      this.DataType2.OneToManyRelation +
      " for " +
      this.NewKitItemData.KitName +
      " created"
    ).should("be.visible");

    //close the Kit Item
    cy.get(".subheader--button-icon-wrapper path").first().click({
      force: true,
    });
    cy.contains(this.NewKitItemData.KitName).should("be.visible");
    cy.log("Related new has been Close");
    cy.wait(10000);
  });

  it.only("Validate One to Many added Element(Releated New)", function () {
    //Scroll
    cy.contains(this.DataType2.OneToManyRelation).scrollIntoView({
      force: true,
    });
    //scroll
    cy.get(".ca-item").eq(1).scrollIntoView({ force: true });

    cy.get(".btn-load .inline-svg").eq(0).scrollIntoView({
      force: true,
    });
    cy.wait(1000);
    //Assertion
    cy.contains("Total 1 items").should("be.visible");


    //save Kit item  (new form)
    cy.get(".v-select__selections .v-btn__content")
      .first()
      .click({ force: true });
    // kit item Save Assertion
    cy.contains(this.NewKitItemData.KitName + " has been saved").should(
      "be.visible"
    );
    cy.log("Kit Item has been saved");
    //Refresh one to many elements
    cy.get(".btn-load .inline-svg").eq(0).click({ force: true });
    cy.log("Refresh one to many");
    cy.wait(1000);
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

  it.only('Click to open related new', function () {
    cy.wait(2000)
    cy.get('.grid-body > td:nth-child(1) > .v-list-item__subtitle').click({ force: true });
    //Related Kit Assertion
    cy.contains(this.DataType2.KitToBeRelated).should("be.visible");
    //Related New form element assertion
    cy.get("[name" + "=" + this.DataType2.Url + "]").should("be.visible");
    cy.wait(2000);
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

  it.only("Number Element data Validation", function () {
    var lower = this.DataType2.Number.toLowerCase();
    //Validating details view input data
    cy.xpath("//input[@controlname='" + lower + "']")
      .should("have.value", this.RelatedKitItemData.Number)
  });

  it.only('Time Element data Validation', function () {
    //Check in josn for LoggedTime
    cy.get('[placeholder="Add Time"][readonly="readonly"]').eq(0)
      .should("have.value", this.RelatedKitItemData.LoggedTime)
  })

  it.only('Date Element data Validation', function () {
    //Check in josn for LoggedDate
    cy.get('[placeholder=" MM / DD / YYYY"]').eq(0)
      .should("have.value", this.RelatedKitItemData.LoggedDate)
  })

  it.only("Toggle Element data Validation", function () {
    cy.xpath('//div[@class="pl-3 col"]//div[@class="v-input--selection-controls__input"]//input')
      .first()
      .should('have.attr', 'aria-checked', 'true')
  });

  it.only("Toggle Element data Validation", function () {
    cy.xpath('//div[@class="pl-3 col"]//div[@class="v-input--selection-controls__input"]//input')
      .first()
      .should('have.attr', 'aria-checked', 'true')
  });

  it.only("SelectList Element data Validation", function () {
    var selectList = this.DataType2.SelectListName.toLowerCase();
    cy.xpath('//div[@controlname="selectList"]//div[@class="v-list-item__subtitle"]')
      .invoke('text').then((text) => {
        expect(text.trim()).equal(this.RelatedKitItemData.SelectListValue)
      });
  })

  it.only('RadioSelect Element data Validation', function () {
    var radio = this.DataType2.RadioSelectName.toLowerCase();
    //json value assertion
    cy.xpath('//div[@controlname="radioSelect"]//div[@class="v-input__slot"]//div[@class="v-radio theme--light v-item--active"]//div[@class="v-list-item__content"]')
      .invoke('text')
      .then((text) => {
        cy.log(text)
        expect(text.trim()).contains(this.RelatedKitItemData.RadioSelectValue)
      });
  })

  it.only("CheckboxSelect Element data Validation", function () {
    //CheckboxSelect1
    cy.get('[type="checkbox"]').eq(3).should('be.checked')
  });

  it.only('Stepper Element data Validation', function () {
    var stepper = this.DataType2.StepperName.toLowerCase();
    cy.xpath('//div[@controlname="' + stepper + '"]//div[@class="v-stepper__header"]//div[@class="v-stepper__step v-stepper__step--inactive v-stepper__step--complete"]//div[@class="v-list-item__subtitle"]')
      .invoke('text').then((text) => {
        expect(text.trim()).equal(this.RelatedKitItemData.StepperValue)
      })
  });

  it.only('UserSelector Element data Validation', function () {
    //scroll to user selector
    cy.get('.imageContent').eq(0).scrollIntoView({ force: true })
    cy.wait(1000)
    cy.xpath('//div[@controlname="userSelector"]//div[@class="col item-label"]').children('div').invoke('text').then((text) => {
      expect(text.trim()).equal(this.RelatedKitItemData.UserSelectorName)
    });
  })

  it.only('ContactSelector Element data Validation', function () {
    cy.xpath('//div[@controlname="contactSelector"]//div[@class="col item-label"]').children('div').invoke('text').then((text) => {
      expect(text.trim()).equal(this.RelatedKitItemData.ContactSelectorName)
    });
  })

  it.only('OneToOne Related Control Items Validation', function () {
    cy.get(".last-updated:nth-child(2) > .v-icon").should("exist");
  })

  it.only('Assigning Element data Validation', function () {
    var lower = this.DataType2.Assigning.toLowerCase();
    cy.get('.v-btn:nth-child(1) .v-badge > .inline-svg').eq(0).scrollIntoView({ force: true })
    //json value assertion
    cy.xpath('//div[@controlname="assigning"]//div[@class="item-label col"]').children('div').invoke('text')
      .then((text) => {
        expect(text.trim()).equal(this.RelatedKitItemData.AssigningName)
      });
  })

  it.only('Inspection Element data Validation', function () {
    var inspection = this.DataType2.InspectionName.toLowerCase();
    cy.xpath('//div[@controlname="' + inspection + '"]//div[@class="v-slide-group__content"]').children('span.v-chip--active')
      .invoke('text').then((text) => {
        expect(text.trim()).equal(this.RelatedKitItemData.InspectionValue)
      });
  });

  it.only('Icon Element data Validation', function () {
    //Validating details view input data
    cy.get('[placeholder="Label"]').eq(0)
      .should("have.value", this.RelatedKitItemData.IconLabel)
  })


  it.only('Close the related new form', function () {
    //close the Kit Item
    cy.wait(2000);
    //Close Kit type
    cy.get(".subheader--button-icon-wrapper path").first().click({
      force: true,
    });
    cy.contains(this.NewKitItemData.KitName).should("be.visible");
    cy.log("Related new has been Close");
  })


  it.only("Link Existing Item for OneToMany Related Control", function () {
    //Click on New Item for one to Many Related Control
    cy.get(".ca-item")
      .eq(0)
      .scrollIntoView({ force: true })
      .click({ force: true });
    //Search List view pop up assertion
    cy.contains(this.ViewName.SearchView).should("be.visible");
    //Selct the to be linked kit item
    cy.get('.v-dialog__content:nth-child(1) div:nth-child(4) > .row:nth-child(1) svg:nth-child(1)')
      .click({ force: true });
    //cy.get(".thumb-selected-icon").eq(0).click();
    cy.wait(2000);
    //Click on select btn
    cy.get(".button-pop-ups > .v-btn__content").click({ force: true });

    cy.contains(
      "Relation on " +
      this.DataType2.OneToManyRelation +
      " for " +
      this.NewKitItemData.KitName +
      " linked "
    ).should("be.visible");

    //refresh btn
    cy.get('.btn-load .inline-svg').first().click({ force: true });
    cy.wait(1000)
    //Assertion
    cy.contains("Total 2 items").should("be.visible");
    cy.log("Existing item linked");

  });

  it.only("Validate Link Item elements for OneToMany Related Control", function () {
    //Scroll
    cy.contains(this.DataType2.OneToManyRelation).scrollIntoView({
      force: true,
    });
    //scroll
    cy.get(".ca-item").eq(1).scrollIntoView({ force: true });

    cy.get(".btn-load .inline-svg").eq(0).scrollIntoView({
      force: true,
    });
    //Assertion
    cy.contains("Total 2 items").should("be.visible");

    //Linked item assertion
    cy.get(
      ".grid-body:nth-child(1) > td:nth-child(1) > .v-list-item__subtitle"
    ).should("exist");
    cy.get(
      ".grid-body:nth-child(2) > td:nth-child(1) > .v-list-item__subtitle"
    ).should("exist");

    //save Kit item  (new form)
    cy.get(".v-select__selections .v-btn__content")
      .first()
      .click({ force: true });
    // kit item Save Assertion
    cy.contains("Nothing to save for " + this.NewKitItemData.KitName).should(
      "be.visible"
    );
    cy.log("Kit Item has been saved");
    //Refresh one to many elements
    cy.get(".btn-load .inline-svg").eq(0).click({ force: true });
    cy.log("Refresh one to many");
    cy.wait(1000);

    //Scroll
    cy.contains(this.DataType2.OneToManyRelation).scrollIntoView({
      force: true,
    });
    //scroll
    cy.get(".ca-item").eq(1).scrollIntoView({ force: true });
    cy.wait(1000);

    //Assertion linked item after save kit item
    cy.get(
      ".grid-body:nth-child(1) > td:nth-child(1) > .v-list-item__subtitle"
    ).should("exist");
    cy.get(
      ".grid-body:nth-child(2) > td:nth-child(1) > .v-list-item__subtitle"
    ).should("exist");

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

  it.only("Deletion Link Item", function () {

    //Click on delete icon
    cy.get(".btn-manage path").eq(0).click({ force: true });
    //Delete pop up assertion
    cy.contains(" Are you sure you want to discard?").should("be.visible");
    cy.wait(1000)
    cy.contains(" Discard ").click({ force: true });
    //Delete assertion
    cy.contains(
      "Relation on " +
      this.DataType2.OneToManyRelation +
      " for " +
      this.NewKitItemData.KitName +
      " Deleted"
    ).should("be.visible");
    //Assertion
    cy.contains("Total 1 items").should("be.visible");
    //Assertion
    cy.get(
      ".grid-body:nth-child(1) > td:nth-child(1) > .v-list-item__subtitle"
    ).should("exist");
    cy.get(
      ".grid-body:nth-child(2) > td:nth-child(1) > .v-list-item__subtitle"
    ).should("not.exist");
  });
});
