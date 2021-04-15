import LoginPage from "../PageObject/LoginPage";
import SanityLoginPage from "../PageObject/SanityLoginPage";

describe("Update Related New fot Square Card Related Control", function () {
  this.beforeAll(function () {
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

    cy.fixture("SanityPackTestData/RelatedSqCardData").then(function (
      SanityTCData
    ) {
      this.RelatedKitItemData3 = SanityTCData;
    });

    // cy.fixture("SanityPackTestData(Prod)/RelatedSqCardData(Prod)").then(
    //   function (SanityTCData) {
    //     this.RelatedKitItemData3 = SanityTCData;
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

    cy.fixture("SanityPackTestData/UpdateKItItemData").then(function (
      UpDateKitItemSDTCData
    ) {
      this.UpdateKitItemData = UpDateKitItemSDTCData;
    });

    // cy.fixture("SanityPackTestData(Prod)/UpdateKItItemData(Prod)").then(
    //   function (UpDateKitItemSDTCData) {
    //     this.UpdateKitItemData = UpDateKitItemSDTCData;
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

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    cy.fixture("KitBuilderTestData/FormViewsNameData").then(function (
      KitTypeFormViewsNames
    ) {
      this.ViewName = KitTypeFormViewsNames;
    });
  });

  it.only("Navigating to kit item listView and select kit type to Update", function () {
    const lp = new LoginPage();
    //Click on Hamburger Icon
    lp.HMBIcon();
    cy.contains(this.NewKitItemData.KitName).scrollIntoView({
      force: true,
    });
    cy.wait(1000);
    //Open KitType from left paneal
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
      this.DataType2.Url + ":" + " " + this.RelatedKitItemData3.NewKitItemUrl
    ).should("exist");
    cy.log("Created New Kit Item has been Exist");
    //Click on created kit item
    cy.contains(
      this.DataType2.Url + ":" + " " + this.RelatedKitItemData3.NewKitItemUrl
    ).click({ force: true });
    cy.wait(2000);
  });

  it.only("Updation in Square Card Related New", function () {

    //Scrolling to square card
    cy.get(".px-2:nth-child(1) .inline-svg").scrollIntoView({ force: true });
    cy.wait(1000);
    //Click on square card kit item
    cy.get(".px-2:nth-child(1) .inline-svg").click({ force: true });
    cy.wait(1000);
    cy.contains(" Edit Item ").click({ force: true });
    cy.log("Related Edit form has been opened");
    cy.wait(10000);

    //click on URl pancil icon
    cy.xpath('//div[@class="wrapper-card-buttons d-flex justify-end col"]//div[@class="mr-4 action-icon"]')
      .eq(0)
      .click({ force: true });
    cy.contains('Edit Link').should('be.visible')
    //Update lable
    cy.get('[placeholder="Label"]').first().clear().type(this.UpdateKitItemData.Url)
    //Update Url Link
    cy.get("[placeholder" + "=" + this.DataType2.Url + "]")
      .clear().type(this.UpdateKitItemData.Url);
    //Click on save
    cy.get('.button-pop-ups--size > .v-btn__content').click({ force: true });
    cy.log("Url Updated");
    cy.wait(1000)

    //Text
    cy.get("[name" + "=" + this.DataType2.Text + "]")
      .eq(1)
      .clear({ force: true })
      .type(this.UpdateKitItemData.Text);
    cy.log("Text Updated");

    //File
    //Click on to remove existing file
    cy.get(".dropzone-area-button:nth-child(2)").first().click({ force: true });
    cy.wait(1000);
    //Discard validation
    cy.contains(" Are you sure you want to discard?").should("be.visible");
    //Click on Discard
    cy.get(".mb-4:nth-child(1) .v-btn__content").click({ force: true });
    cy.log("Existing file has been deleted");
    cy.wait(2000);

    //Click on file link again
    cy.get(".link-icon--green > path").first().click({ force: true });
    cy.wait(1000);
    //give file name to select
    cy.contains(this.UpdateKitItemData.UpdateFileName).click({ force: true });
    cy.log("New file has been uploaded");
    //Click on save file
    cy.get(
      ".container-search > .pop-up--header > .pop-up--header--right > .button-pop-ups--size > .v-btn__content"
    ).click({ force: true });
    cy.contains("File saved").should("be.visible");
    cy.log("File Saved");
    cy.wait(1000);

    //Telephone
    cy.get("[name" + "=" + this.DataType2.Telephone + "]")
      .eq(1)
      .clear({ force: true })
      .type(this.UpdateKitItemData.Telephone);
    cy.log("Telephone Updated");

    //TextAera
    cy.get("[name" + "=" + this.DataType2.TextAera + "]")
      .eq(1)
      .clear({ force: true })
      .type(this.UpdateKitItemData.TextAera);
    cy.log("TextAera Updated");

    // Currency;
    var currency = this.DataType2.Currency.toLowerCase();
    cy.xpath('//div[@class="kit-control-' + currency + '--right ma-0 pa-0 col"]//div[@class="v-text-field__slot"]//label[@class="v-label v-label--active theme--light"]')
      .next('input').clear().type(this.UpdateKitItemData.Currency);
    cy.log("Currnecy Updated");
    cy.wait(1000);

    //Measure
    var measure = this.DataType2.Measure.toLowerCase();
    //Measure
    cy.xpath('//div[@class="kit-control-' + measure + '--left ma-0 pa-0 pr-2 col"]//div[@class="v-text-field__slot"]//label[@class="v-label v-label--active theme--light"]')
      .next('input').clear().type(this.UpdateKitItemData.Measure);
    cy.log("Measure Updated");

    //Email;
    cy.get("[name" + "=" + this.DataType2.Email + "]")
      .eq(1)
      .clear({ force: true })
      .type(this.UpdateKitItemData.Email);
    cy.log("Email Updated");

    //Address
    cy.get('[placeholder="Street address, building, company ... "]')
      .eq(0).scrollIntoView({ force: true })
    cy.wait(2000)

    //Address
    cy.get('[placeholder="Street address, building, company ... "]')
      .eq(0)
      .clear({ force: true })
      .type(this.UpdateKitItemData.Addressline1);
    cy.log("TextAera Updated");
    //Address line
    cy.get('[name="Address line 2."]')
      .eq(0)
      .clear({ force: true })
      .type(this.UpdateKitItemData.Addressline2);
    cy.log("Address line1 Updated");

    cy.get('[placeholder="City"]').eq(0).scrollIntoView({ force: true });
    cy.wait(1000);

    //City
    cy.get('[placeholder="City"]')
      .eq(0)
      .clear({ force: true })
      .type(this.UpdateKitItemData.City);
    cy.log("City Updated");
    //State
    cy.get(
      "div:nth-child(2) > div:nth-child(4) > div > div > div.v-input__slot > div.v-select__slot > div.v-input__append-inner > div"
    )
      .first()
      .click({ force: true });
    cy.contains(this.UpdateKitItemData.State).click({ force: true });
    cy.log("State Updated");

    cy.get('[placeholder="Zip/Postal Code"]')
      .eq(0)
      .scrollIntoView({ force: true });
    cy.wait(1000);

    //ZipCode
    cy.get('[placeholder="Zip/Postal Code"]')
      .eq(0)
      .clear({ force: true })
      .type(this.UpdateKitItemData.ZipCode);
    cy.log("ZipCode Updated");

    //Number
    cy.get("[name" + "=" + this.DataType2.Number + "]")
      .eq(1)
      .clear({ force: true })
      .type(this.UpdateKitItemData.Number);
    cy.log("Number Updated");

    //Time Data Element
    //Click on Time to appear time pop up
    cy.get('[placeholder="Add Time"][type="text"]')
      .first()
      .click({ force: true });
    cy.wait(1000);
    //Select hour value
    cy.xpath(
      "//div[contains(@class,'v-dialog v-dialog--active')]//span[6]"
    ).click({ force: true });
    cy.wait(1000);
    //Select Value of miniutes
    cy.xpath("//span[contains(text(),'25')]").first().click({ force: true });
    cy.wait(1000);
    //Click on PM
    cy.xpath("//div[contains(text(),'PM')]").click({ force: true });
    //Click on OK to save date
    cy.xpath(
      "//div[contains(@class,'v-dialog v-dialog--active')]//button[1]"
    ).click({ force: true });
    cy.log("Time has been Updated");
    cy.wait(2000);

    //Date Data Element
    //Click on Date to appear Date pop up
    cy.get(
      "div.v-input.no-bottom.date-picker-text-field.date-picker-text-field-direct.theme--light.v-text-field.v-text-field--is-booted.v-text-field--enclosed.v-text-field--outlined.v-text-field--placeholder > div > div.v-input__slot > div.v-input__prepend-inner > i"
    )
      .first()
      .click({ force: true });
    //Select Date
    cy.xpath("//div[@class='v-btn__content'][contains(text(),'25')]")
      .first()
      .click({ force: true });
    cy.wait(1000);
    //Click on OK to save Date
    cy.xpath("//span[contains(text(),'OK')]").first().click({ force: true });
    cy.wait(1000);

    //Toggle
    cy.get(".sync-switch .v-input--selection-controls__ripple").first().click({
      force: true,
    });
    cy.log("Toggle updated");

    //Click on DropDown of SelectList
    cy.get(
      " div.row.container-details div.fill-height.col div.container.details-wrapper.fill-height div.row.kit-related-form.pa-6 div.kit-control-component.row-component.px-3.col.col-sm-12.col-md-6.mb-4.px-3.col-sm-12.col-md-6.mb-4.px-3:nth-child(17) div.v-input.kit-control-select-list.layout-alignment.v-input--is-label-active.v-input--is-dirty.theme--light.v-text-field.v-text-field--is-booted.v-text-field--enclosed.v-text-field--outlined.v-select div.v-input__control div.v-input__slot div.v-select__slot:nth-child(2) div.v-input__append-inner:nth-child(3) div.v-input__icon.v-input__icon--append > i.v-icon.notranslate.material-icons.theme--light"
    )
      .first()
      .click({ force: true });
    //SelectList Value(Values coming form KitItemValues Json File)
    cy.contains(this.UpdateKitItemData.SelectListValue).click({ force: true });
    cy.log("SelectList Value has been Updated.");



    //RadioSelect
    cy.contains(this.UpdateKitItemData.RadioSelectValue).click({ force: true });
    cy.log("RadioSelect Value has been set.");
    cy.wait(3000);

    //CheckboxSelect(Values coming form KitItemValues Json File)
    cy.contains(this.UpdateKitItemData.CheckboxSelectValue2).click({
      force: true,
    });

    cy.contains(this.DataType2.StepperName).scrollIntoView({
      force: true,
    });

    //Stepper
    //getting value form different json file
    cy.contains(this.UpdateKitItemData.StepperValue).click({ force: true });
    cy.log("Stepper Value has been set.");
    cy.wait(1000)


    //Click on cross to user selector
    cy.get(
      "span > div > div > div.v-input__slot > div.v-select__slot > div.v-select__selections"
    )
      .eq(0)
      .click({ force: true });
    cy.wait(1000)
    cy.xpath('//*[text() ="Search"]').first().click({ force: true })
    cy.wait(1000)
    cy.xpath('//*[text() ="Search"]').first().next('input')
      .type(`${this.UpdateKitItemData.UserSelector}{enter}`)
    cy.wait(3000)
    cy.contains(this.UpdateKitItemData.UserSelector).click({ force: true });
    cy.log("UserSelect Updated");
    cy.wait(1000);

    //Click on cross to contact selector
    cy.get(
      " span > div > div > div.v-input__slot > div.v-select__slot > div.v-select__selections"
    )
      .eq(1)
      .click({ force: true });
    cy.wait(1000)
    cy.xpath('//*[text() ="Search"]').first().click({ force: true })
    cy.wait(1000)
    cy.xpath('//*[text() ="Search"]').first().next('input')
      .type(`${this.UpdateKitItemData.ContactSelector}{enter}`)
    cy.wait(3000)
    cy.contains(this.UpdateKitItemData.ContactSelector).click({
      force: true,
    });
    cy.log("ContactSelecto Updated");
    cy.wait(1000);

    //getting value form different json file
    //Click on arrow
    cy.get(
      "div.fill-height.border-right.col.col-4 div.v-input.v-input--is-label-active.v-input--is-dirty.theme--light.v-text-field.v-text-field--single-line.v-text-field--solo.v-text-field--is-booted.v-text-field--enclosed.v-select div.v-input__control div.v-input__slot div.v-select__slot div.v-input__append-inner:nth-child(2) div.v-input__icon.v-input__icon--append > i.v-icon.notranslate.material-icons.theme--light"
    )
      .first()
      .scrollIntoView({ force: true });
    //Icon
    //Click on + icon of ICON Element
    // cy.get(
    //   " div.fill-height.col div.container.details-wrapper.fill-height div.row.kit-related-form.pa-6 div.kit-control-component.row-component.kit-control-icon.px-3.col.col-sm-12.col-md-6.mb-4.col-sm-12.col-md-6.mb-4:nth-child(23) div.row.wrapper-kit-control.align-center div.fill-height.d-flex.col.col-12 div.kit-control-icon__button_wrap.d-flex.border-right.justify-center.col button.v-btn.v-btn--depressed.v-btn--fab.v-btn--flat.v-btn--outlined.v-btn--round.theme--light.v-size--default.black--text > span.v-btn__content"
    // ).click({
    //   force: true,
    // });
    // cy.wait(2000);
    // //Click on Icon Tittle and  select Icon logo
    // //Give numeric no from 1 in child(1,2,3...)
    // cy.get(".thumb-container:nth-child(5) .selected-icon").click({
    //   force: true,
    // });
    // cy.wait(2000);
    // //Icon Save
    // cy.get(".button-pop-ups").first().click({ force: true });

    //IcozSize
    cy.get('[placeholder="Label"]').first().scrollIntoView({ force: true });
    //Click on arrow
    cy.get(
      "div.fill-height.border-right.col.col-4 div.v-input.v-input--is-label-active.v-input--is-dirty.theme--light.v-text-field.v-text-field--single-line.v-text-field--solo.v-text-field--is-booted.v-text-field--enclosed.v-select div.v-input__control div.v-input__slot div.v-select__slot div.v-input__append-inner:nth-child(2) div.v-input__icon.v-input__icon--append > i.v-icon.notranslate.material-icons.theme--light"
    )
      .first()
      .click({ force: true });
    cy.contains(this.UpdateKitItemData.ExtraSmalliconSize).click({
      force: true,
    });
    //IconLable
    cy.get('[placeholder="Label"]')
      .eq(1)
      .clear()
      .type(this.UpdateKitItemData.IconLabel);

    ///Inspection
    cy.get('.v-btn:nth-child(1) .v-badge > .inline-svg').first()
      .scrollIntoView({ force: true })
    cy.wait(1000)
    cy.xpath("//*[contains(text(),'" + this.UpdateKitItemData.InspectionValue + "')]//div[@class='v-avatar v-avatar--left']").first()
      .click({ force: true })
    cy.wait(1000);

    //Click on cross to delete Assigning
    cy.get(
      " span > div > div > div.v-input__slot > div.v-select__slot > div.v-select__selections"
    )
      .eq(2)
      .click({ force: true });
    //Click on to open Assigning
    cy.wait(4000);
    //click on checkboxes
    cy.contains('Coordinator').click({ force: true })
    cy.contains('Contributor').click({ force: true })
    cy.wait(1000)
    cy.xpath('//*[text() ="Search"]').first().click({ force: true })
    cy.wait(1000)
    cy.xpath('//*[text() ="Search"]').first().next('input')
      .type(`${this.UpdateKitItemData.Assigning}{enter}`)
    cy.wait(3000)
    cy.contains(this.UpdateKitItemData.Assigning).click({ force: true });
    cy.wait(1000);
    //Click on to save
    cy.get(".button-pop-ups--size > .v-btn__content").first().click({ force: true });
    //Assigning creation assertion
    cy.contains("Item shared").should("be.visible");
    cy.log("Assigning added");

    //save related new
    cy.get(".v-select__selections .v-btn__content")
      .first()
      .click({ force: true });
    //Related kit item Save Assertion
    cy.contains(this.DataType2.CardKitToBeRelated + " has been saved").should(
      "be.visible"
    );
    cy.log(
      this.DataType2.CardKitToBeRelated +
      " related new has been Saved with updation"
    );

    //close the Kit Item
    cy.wait(5000);
    //Close Kit type
    cy.get(".subheader--button-icon-wrapper path").first().click({
      force: true,
    });
    cy.contains(this.NewKitItemData.KitName).should("be.visible");
    cy.log("After updation Related New has been Close");
  });

  it.only('Click to open related new to validate', function () {
    //Click on three dots on linked square card
    //Click on created one to many kit item
    cy.get('.pr-0 .inline-svg').first().click({ force: true });
    //Assertion
    cy.contains(" Edit Item ").should("be.visible");
    cy.contains(" Delete Item ").should("be.visible");
    cy.wait(1000);
    cy.contains(" Edit Item ").click({ force: true });
    //Related Kit Assertion
    cy.contains(this.DataType2.CardKitToBeRelated).should("be.visible");
    //Related New form element assertion
    cy.wait(3000);
  })

  it.only("Url Element data Validation", function () {
    var lower = this.DataType2.Url.toLowerCase();
    //Validating details view input data
    cy.xpath("//input[@controlname='" + lower + "']").should("have.value", this.UpdateKitItemData.Url)
  });


  it.only("Text Element data Validation", function () {
    var lower = this.DataType2.Text.toLowerCase();
    //Validating details view input data
    cy.xpath("//input[@controlname='" + lower + "']").should("have.value", this.UpdateKitItemData.Text)
  });

  it.only('File Element data Validation', function () {
    var lower = this.DataType2.File.toLowerCase();
    cy.xpath('//div[@class="drop-zone"]//div[@class="v-input__slot"]//div[@class="v-text-field__slot"]//input')
      .invoke('val').then((text) => {
        expect(text.trim()).equal(this.UpdateKitItemData.UpdateFileName)
      });
  })


  it.only("Telephone Element data Validation", function () {
    var lower = this.DataType2.Telephone.toLowerCase();
    //Validating details view input data
    cy.xpath("//input[@controlname='" + lower + "']").should("have.value", this.UpdateKitItemData.Telephone)

  });

  it.only("TextAera Element data Validation", function () {
    var lower = this.DataType2.TextAera.toLowerCase();
    //Validating details view input data
    cy.get("[name" + "=" + this.DataType2.TextAera + "]").eq(1).should("have.value", this.UpdateKitItemData.TextAera)
  });

  it.only("Slider Element data Validation", function () {
    //Validation for True Value 
    cy.xpath('//div[@class="v-input v-input--is-label-active v-input--is-dirty theme--light v-input__slider"]//div[@class="v-slider v-slider--horizontal theme--light"]//input')
      .invoke('val').then((text) => {
        cy.log(text)
        expect(text).equal(this.UpdateKitItemData.SliderValue)
      })
  })

  it.only('Currency Element data Validation', function () {
    var currency = this.DataType2.Currency.toLowerCase();
    cy.xpath('//div[@class="kit-control-' + currency + '--right ma-0 pa-0 col"]//div[@class="v-text-field__slot"]//label[@class="v-label v-label--active theme--light"]')
      .next('input').should("have.value", this.UpdateKitItemData.Currency)
  })

  it.only('Measure Element data Validation', function () {
    var measure = this.DataType2.Measure.toLowerCase();
    cy.xpath('//div[@class="kit-control-' + measure + '--left ma-0 pa-0 pr-2 col"]//div[@class="v-text-field__slot"]//label[@class="v-label v-label--active theme--light"]')
      .next('input').should("have.value", this.UpdateKitItemData.Measure)
  })

  it.only("Email Element data Validation", function () {
    var lower = this.DataType2.Email.toLowerCase();
    //Validating details view input data
    cy.xpath("//input[@controlname='" + lower + "']").should("have.value", this.UpdateKitItemData.Email)
  });

  it.only("Addressline1 Element data Validation", function () {
    cy.get('[placeholder="Street address, building, company ... "]').eq(0).scrollIntoView({ force: true })
    //Validating details view input data
    cy.get('[placeholder="Street address, building, company ... "]').eq(0)
      .should("have.value", this.UpdateKitItemData.Addressline1)

  });

  it.only("Addressline2 Element data Validation", function () {
    //Validating details view input data
    cy.get('[name="Address line 2."]')
      .should("have.value", this.UpdateKitItemData.Addressline2)
  });

  it.only("City Element data Validation", function () {
    //Validating details view input data
    cy.get('[placeholder="City"]')
      .should("have.value", this.UpdateKitItemData.City)
  });

  it.only("ZipCode Element data Validation", function () {
    cy.get('[placeholder="Zip/Postal Code"]').eq(0).scrollIntoView({ force: true })
    //Validating details view input data
    cy.get('[placeholder="Zip/Postal Code"]').eq(0)
      .should("have.value", this.UpdateKitItemData.ZipCode)

  });

  it.only("State Element data Validation", function () {
    cy.xpath('//div[@class="v-select__slot"]//div[@class="v-select__selections"]//div[@class="v-select__selection v-select__selection--comma"]')
      .eq(0)
      .invoke('text').then((text) => {
        expect(text.trim()).equal(this.UpdateKitItemData.State)
      })
  });

  it.only("Country Element data Validation", function () {
    //Validating details view input data
    cy.get('[placeholder="Country"]')
      .should("have.value", this.UpdateKitItemData.Country)
  });

  it.only("Number Element data Validation", function () {
    var lower = this.DataType2.Number.toLowerCase();
    //Validating details view input data
    cy.xpath("//input[@controlname='" + lower + "']")
      .should("have.value", this.UpdateKitItemData.Number)
  });

  it.only('Time Element data Validation', function () {
    //Check in josn for LoggedTime
    cy.get('[placeholder="Add Time"][readonly="readonly"]').eq(0)
      .should("have.value", this.UpdateKitItemData.LoggedTime)
  })

  it.only('Date Element data Validation', function () {
    //Check in josn for LoggedDate
    cy.get('[placeholder=" MM / DD / YYYY"]').eq(0)
      .should("have.value", this.UpdateKitItemData.LoggedDate)
  })

  it.only("Toggle Element data Validation", function () {
    cy.xpath('//div[@class="pl-3 col"]//div[@class="v-input--selection-controls__input"]//input')
      .first()
      .should('have.attr', 'aria-checked', 'false')
  });

  it.only("SelectList Element data Validation", function () {
    var selectList = this.DataType2.SelectListName.toLowerCase();
    cy.xpath('//div[@controlname="selectList"]//div[@class="v-list-item__subtitle"]')
      .invoke('text').then((text) => {
        expect(text.trim()).equal(this.UpdateKitItemData.SelectListValue)
      });
  })

  it.only('RadioSelect Element data Validation', function () {
    var radio = this.DataType2.RadioSelectName.toLowerCase();
    //json value assertion
    cy.xpath('//div[@controlname="radioSelect"]//div[@class="v-input__slot"]//div[@class="v-radio theme--light v-item--active"]//div[@class="v-list-item__content"]')
      .invoke('text')
      .then((text) => {
        cy.log(text)
        expect(text.trim()).contains(this.UpdateKitItemData.RadioSelectValue)
      });
  })

  it.only("CheckboxSelect Element data Validation", function () {
    cy.get('[type="checkbox"]').eq(2).should('be.checked')
    cy.get('[type="checkbox"]').eq(3).should('be.checked')
  });

  it.only('Stepper Element data Validation', function () {
    var stepper = this.DataType2.StepperName.toLowerCase();
    cy.xpath('//div[@controlname="' + stepper + '"]//div[@class="v-stepper__header"]//div[@class="v-stepper__step v-stepper__step--inactive v-stepper__step--complete"]//div[@class="v-list-item__subtitle"]')
      .invoke('text').then((text) => {
        expect(text.trim()).equal(this.UpdateKitItemData.StepperValue)
      })
  });

  it.only('UserSelector Element data Validation', function () {
    //scroll to user selector
    cy.get('.imageContent').eq(0).scrollIntoView({ force: true })
    cy.wait(1000)
    cy.xpath('//div[@controlname="userSelector"]//div[@class="col item-label"]').children('div').invoke('text').then((text) => {
      expect(text.trim()).equal(this.UpdateKitItemData.UserSelector)
    });

  })

  it.only('ContactSelector Element data Validation', function () {
    cy.xpath('//div[@controlname="contactSelector"]//div[@class="col item-label"]').children('div').invoke('text').then((text) => {
      expect(text.trim()).equal(this.UpdateKitItemData.ContactSelector)
    });
  })

  it.only('OneToOne Related Control Items Validation', function () {
    cy.get(".last-updated:nth-child(2) > .v-icon").should("exist");
  })

  it.only('Assigning Element data Validation', function () {
    var lower = this.DataType2.Assigning.toLowerCase();
    cy.get('.v-btn:nth-child(1) .v-badge > .inline-svg').eq(0).scrollIntoView({ force: true })

    //json value assertion
    cy.xpath('//div[@controlname="' + lower + '"]//div[@class="item-label col"]').children('div').invoke('text')
      .then((text) => {
        expect(text.trim()).equal(this.UpdateKitItemData.Assigning)
      });
  })

  it.only('Inspection Element data Validation', function () {
    var inspection = this.DataType2.InspectionName.toLowerCase();
    cy.xpath('//div[@controlname="' + inspection + '"]//div[@class="v-slide-group__content"]').children('span.v-chip--active')
      .invoke('text').then((text) => {
        expect(text.trim()).equal(this.UpdateKitItemData.InspectionValue)
      });
  });

  it.only('Icon Element data Validation', function () {
    //Validating details view input data
    cy.get('[placeholder="Label"]')
      .should("have.value", this.UpdateKitItemData.IconLabel)
  })

  it.only('Close the related kit item', function () {
    cy.wait(1000)
    cy.get(".subheader--button-icon-wrapper path").first().click({
      force: true,
    });
    cy.contains(this.NewKitItemData.KitName).should("be.visible");

  })

  it.only("Details View form Saving Validation", function () {
    cy.wait(1000);
    //Scrolling to one to many
    cy.get(".px-2:nth-child(1) .inline-svg").scrollIntoView({ force: true });
    //Assertion
    //Click to save kit item
    cy.get(".navi-bar-dropdown:nth-child(2) .v-btn").first().click({ force: true });
    // kit item Save Assertion
    cy.contains("Nothing to save for " + this.NewKitItemData.KitName).should(
      "be.visible"
    );
  });

  it.only("Square Card Related New", function () {
    //Click on New Item for square caed Related Control
    cy.get(".ca-item")
      .eq(3)
      .scrollIntoView({ force: true })
      .click({ force: true });
    //New Item Assertion
    cy.contains("New Item created").should("be.visible");
    //Related Kit Assertion
    cy.contains(this.DataType2.CardKitToBeRelated).should("be.visible");
    cy.wait(4000);

    //Create Sqaurecard RelatedNew
    cy.wait(2000);
    //click on URl pancil icon
    cy.xpath('//div[@class="wrapper-card-buttons d-flex justify-end col"]//div[@class="mr-4 action-icon"]')
      .eq(0)
      .click({ force: true });

    cy.contains('Edit Link').should('be.visible')
    //Enter lable
    cy.get('[placeholder="Label"]').first().type(this.RelatedKitItemData3.Url)
    //Url Link
    cy.get("[placeholder" + "=" + this.DataType2.Url + "]").first()
      .type(this.RelatedKitItemData3.Url);
    //Click on save
    cy.get('.button-pop-ups--size > .v-btn__content').click({ force: true });
    cy.wait(1000)

    //Text
    cy.get("[name" + "=" + this.DataType2.Text + "]")
      .eq(1)
      .type(this.RelatedKitItemData3.Text);

    //File
    cy.get(".dropzone-icons-content > .clickable path")
      .eq(0)
      .click({ force: true });
    //give file name to select
    cy.contains(this.RelatedKitItemData3.RelNewFileName).click({
      force: true,
    });
    //Click on save file
    cy.get(
      ".container-search > .pop-up--header > .pop-up--header--right > .button-pop-ups--size > .v-btn__content"
    ).click({ force: true });
    cy.contains("File saved").should("be.visible");
    cy.log("File Saved");
    cy.wait(1000);

    //Telephone
    cy.get("[name" + "=" + this.DataType2.Telephone + "]")
      .eq(1)
      .type(this.RelatedKitItemData3.Telephone);


    //TextAera
    cy.get("[name" + "=" + this.DataType2.TextAera + "]")
      .eq(1)
      .type(this.RelatedKitItemData3.TextAera);

    //Slider
    cy.xpath('//div[@class="v-slider v-slider--horizontal theme--light"]//div[@class="v-slider__track-container"]')
      .eq(0)
      .invoke('val', this.RelatedKitItemData3.SliderValue)
      .trigger('change').click({ force: true })


    //Currency;
    cy.get(
      "#inspire > div.v-dialog__content.v-dialog__content--active > div > div > div > div:nth-child(2) > div.new-kit-item.v-card.v-sheet.theme--light > div > div > div > div > div.row.kit-details-wrapper--content.pb-0 > div > div > div > div > div > div > div.tab--content.col > div > div > div.v-window-item.v-window-item--active > div > div > div.row.container-details > div.fill-height.col > div > div > div.kit-control-component.kit-control-currency.px-3.col.col-sm-12.col-md-6.mb-4.px-3 > div > div.kit-control-currency--right.ma-0.pa-0.col > div > div > div.v-input__slot > div"
    )
      .eq(0)
      .click({ force: true })
      .type(this.RelatedKitItemData3.Currency);

    //Measure
    cy.get(
      "#inspire > div.v-dialog__content.v-dialog__content--active > div > div > div > div:nth-child(2) > div.new-kit-item.v-card.v-sheet.theme--light > div > div > div > div > div.row.kit-details-wrapper--content.pb-0 > div > div > div > div > div > div > div.tab--content.col > div > div > div.v-window-item.v-window-item--active > div > div > div.row.container-details > div.fill-height.col > div > div > div.kit-control-component.kit-control-measure.px-3.col.col-sm-12.col-md-6.mb-4.px-3 > div > div.kit-control-measure--left.ma-0.pa-0.pr-2.col > div > div > div.v-input__slot > div"
    )
      .eq(0)
      .click({ force: true })
      .type(this.RelatedKitItemData3.Measure);

    //Email;
    cy.get("[name" + "=" + this.DataType2.Email + "]")
      .eq(1)
      .type(this.RelatedKitItemData3.Email);

    cy.get('[placeholder="Street address, building, company ... "]')
      .eq(0).scrollIntoView({ force: true })
    cy.wait(2000)

    //Address
    cy.get('[placeholder="Street address, building, company ... "]')
      .eq(0)
      .type(this.RelatedKitItemData3.Addressline1);
    //Address line
    cy.get('[name="Address line 2."]')
      .eq(0)
      .type(this.RelatedKitItemData3.Addressline2);

    cy.get('[placeholder="City"]').eq(0).scrollIntoView({ force: true });
    cy.wait(1000);

    //City
    cy.get('[placeholder="City"]').eq(0).type(this.RelatedKitItemData3.City);
    //State
    cy.get(
      "div:nth-child(2) > div:nth-child(4) > div > div > div.v-input__slot > div.v-select__slot > div.v-input__append-inner > div"
    )
      .eq(0)
      .click({ force: true });
    cy.contains(this.RelatedKitItemData3.State).click({ force: true });

    cy.get('[placeholder="Zip/Postal Code"]')
      .eq(0)
      .scrollIntoView({ force: true });
    cy.wait(1000);

    //ZipCode
    cy.get('[placeholder="Zip/Postal Code"]')
      .eq(0)
      .type(this.RelatedKitItemData3.ZipCode);

    //Number
    cy.get("[name" + "=" + this.DataType2.Number + "]")
      .eq(0)
      .type(this.RelatedKitItemData3.Number);

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
    cy.wait(1000);
    //Select Value of miniutes
    cy.xpath("//span[contains(text(),'30')]").first().click({ force: true });
    cy.wait(1000);
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
    //Select Date
    cy.xpath("//div[@class='v-btn__content'][contains(text(),'25')]")
      .first()
      .click({ force: true });
    cy.wait(2000);
    //Click on OK to save Date
    cy.xpath("//span[contains(text(),'OK')]").first().click({ force: true });
    cy.wait(1000);

    //Toggle
    cy.get(".sync-switch .v-input--selection-controls__ripple").eq(0).click({
      force: true,
    });

    //Click on DropDown of SelectList
    cy.get(
      "div > div > div.v-input__slot > div.v-select__slot > div.v-input__append-inner"
    )
      .eq(4)
      .click({ force: true });
    //SelectList Value(Values coming form KitItemValues Json File)
    cy.contains(this.RelatedKitItemData3.SelectListValue).click({
      force: true,
    });
    cy.log("SelectList Value has been set.");

    cy.contains(this.DataType2.StepperName).scrollIntoView({
      force: true,
    });
    cy.wait(1000);

    //RadioSelect
    cy.contains(this.RelatedKitItemData3.RadioSelectValue).click({
      force: true,
    });
    cy.log("RadioSelect Value has been set.");

    //CheckboxSelect(Values coming form KitItemValues Json File)
    cy.contains(this.RelatedKitItemData3.CheckboxSelectValue3).click({
      force: true,
    });
    cy.log("Checkbox Values has been set.");

    cy.contains(this.DataType2.StepperName).scrollIntoView({
      force: true,
    });
    cy.wait(1000);

    //Stepper
    //getting value form different json file
    cy.contains(this.RelatedKitItemData3.StepperValue).click({ force: true });
    cy.log("Stepper Value has been set.");

    cy.get(".searchIcon").eq(1).scrollIntoView({ force: true });
    cy.wait(1000);
    //UserSelector(Values coming form KitItemValues Json File)
    //Click on to open UserSelector Pop up
    cy.get(".searchIcon").eq(0).click({ force: true });
    cy.contains(" Users ").should("be.visible");
    cy.wait(1000)
    cy.xpath('//*[text() ="Search"]').first().click({ force: true })
    cy.wait(1000)
    cy.xpath('//*[text() ="Search"]').first().next('input')
      .type(`${this.RelatedKitItemData3.UserSelectorName}{enter}`)
    cy.wait(3000)
    cy.contains(this.RelatedKitItemData3.UserSelectorName).click({
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
      .type(`${this.RelatedKitItemData3.ContactSelectorName}{enter}`)
    cy.wait(3000)
    cy.contains(this.RelatedKitItemData3.ContactSelectorName).click({
      force: true,
    });
    cy.log("ContactSelecto added");
    cy.wait(1000);

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
    cy.get(".button-pop-ups").first().click({ force: true });

    //IcozSize
    cy.get(
      "div.row.wrapper-kit-control.align-center > div > div.fill-height.border-right.col.col-4 > div > div > div.v-input__slot > div.v-select__slot > div.v-input__append-inner > div"
    )
      .eq(0)
      .click({ force: true });
    cy.contains(this.RelatedKitItemData3.LargeiconSize).click({ force: true });
    //IconLable
    cy.get('[placeholder="Label"]')
      .eq(1)
      .type(this.RelatedKitItemData3.IconLabel);

    //Inspection
    cy.get('.v-btn:nth-child(1) .v-badge > .inline-svg').first()
      .scrollIntoView({ force: true })
    cy.wait(1000)
    cy.xpath("//*[contains(text(),'" + this.RelatedKitItemData3.InspectionValue + "')]//div[@class='v-avatar v-avatar--left']").first()
      .click({ force: true })
    cy.wait(1000);

    //Assigning
    //Click on to open Assigning Pop up
    cy.get(".searchIcon").eq(2).click({ force: true });
    cy.wait(4000);
    //Click on to select the Assigning
    //click on checkboxes
    cy.contains('Assignee').click({ force: true })
    cy.contains('Contributor').click({ force: true })
    cy.wait(1000)
    cy.xpath('//*[text() ="Search"]').first().click({ force: true })
    cy.wait(1000)
    cy.xpath('//*[text() ="Search"]').first().next('input')
      .type(`${this.RelatedKitItemData3.AssigningName}{enter}`)
    cy.wait(3000)
    cy.contains(this.RelatedKitItemData3.AssigningName).click({ force: true });
    cy.wait(1000);
    //Click on to save
    cy.get(".button-pop-ups--size > .v-btn__content").first().click({ force: true });
    //Assigning creation assertion
    cy.contains("Item shared").should("be.visible");
    cy.log("Assigning added");

    //Click on to link onetoone
    cy.get(".action-icon:nth-child(2) path").eq(1).click({ force: true });
    cy.wait(3000);
    //Link existing kit item for one to one
    cy.get(
      ".row:nth-child(1) > .d-flex > .list-item-col-left > .v-avatar:nth-child(1) svg"
    ).should("be.visible");
    cy.wait(1000);

    cy.get(
      ".row:nth-child(1) > .d-flex > .list-item-col-left > .v-avatar:nth-child(1) svg"
    ).click({ force: true });
    cy.wait(3000);

    //save related new
    cy.get(".v-select__selections .v-btn__content")
      .first()
      .click({ force: true });
    //Related kit item Save Assertion
    cy.contains(this.DataType2.CardKitToBeRelated + " has been saved").should(
      "be.visible"
    );
    cy.log(this.DataType2.CardKitToBeRelated + " related new has been Saved");

    //Related kit item created assertion
    cy.contains(
      " Relation on " +
      this.DataType2.SquareCardName +
      " for " +
      this.NewKitItemData.KitName +
      " created"
    ).should("be.visible");

    //close the Kit Item
    cy.wait(3000);
    //Close Kit type
    cy.get(".subheader--button-icon-wrapper path").first().click({
      force: true,
    });
    cy.contains(this.NewKitItemData.KitName).should("be.visible");
    cy.log("Related new has been Close");
    cy.wait(2000);
  });

  it.only('Click to open related new to validate', function () {
    //Click on three dots on linked square card
    //Click on created one to many kit item
    //Total item assertion
    cy.contains("Total 2 items").first().should("be.visible");
    cy.wait(1000)
    cy.get('.pr-0 .inline-svg').eq(1).click({ force: true });
    //Assertion
    cy.contains(" Edit Item ").should("be.visible");
    cy.contains(" Delete Item ").should("be.visible");
    cy.wait(1000);
    cy.contains(" Edit Item ").click({ force: true });
    //Related Kit Assertion
    cy.contains(this.DataType2.CardKitToBeRelated).should("be.visible");
    //Related New form element assertion
    cy.wait(5000);
  })

  it.only("Url Element data Validation", function () {
    var lower = this.DataType2.Url.toLowerCase();
    //Validating details view input data
    cy.xpath("//input[@controlname='" + lower + "']").should("have.value", this.RelatedKitItemData3.Url)
  });


  it.only("Text Element data Validation", function () {
    var lower = this.DataType2.Text.toLowerCase();
    //Validating details view input data
    cy.xpath("//input[@controlname='" + lower + "']").should("have.value", this.RelatedKitItemData3.Text)

  });

  it.only('File Element data Validation', function () {
    var lower = this.DataType2.File.toLowerCase();
    cy.xpath('//div[@class="drop-zone"]//div[@class="v-input__slot"]//div[@class="v-text-field__slot"]//input').eq(0)
      .invoke('val').then((text) => {
        expect(text.trim()).equal(this.RelatedKitItemData3.RelNewFileName)
      });
  })


  it.only("Telephone Element data Validation", function () {
    var lower = this.DataType2.Telephone.toLowerCase();
    //Validating details view input data
    cy.xpath("//input[@controlname='" + lower + "']").should("have.value", this.RelatedKitItemData3.Telephone)
  });


  it.only("TextAera Element data Validation", function () {
    var lower = this.DataType2.TextAera.toLowerCase();
    //Validating details view input data
    cy.get('[name="TextAera"]').eq(1).should("have.value", this.RelatedKitItemData3.TextAera)
  });

  it.only("Slider Element data Validation", function () {
    //Validation for True Value 
    cy.xpath('//div[@class="v-input v-input--is-label-active v-input--is-dirty theme--light v-input__slider"]//div[@class="v-slider v-slider--horizontal theme--light"]//input')
      .invoke('val').then((text) => {
        cy.log(text)
        expect(text).equal(this.RelatedKitItemData3.SliderValue)
      })
  })

  it.only('Currency Element data Validation', function () {
    var currency = this.DataType2.Currency.toLowerCase();
    //Assertion Validation for currency
    cy.xpath('//div[@class="kit-control-' + currency + '--right ma-0 pa-0 col"]//div[@class="v-text-field__slot"]//label[@class="v-label v-label--active theme--light"]')
      .next('input').should("have.value", this.RelatedKitItemData3.Currency)
  })

  it.only('Measure Element data Validation', function () {
    var measure = this.DataType2.Measure.toLowerCase();
    //Assertion Validation for currency
    cy.xpath('//div[@class="kit-control-' + measure + '--left ma-0 pa-0 pr-2 col"]//div[@class="v-text-field__slot"]//label[@class="v-label v-label--active theme--light"]')
      .next('input').should("have.value", this.RelatedKitItemData3.Measure)
  })

  it.only("Email Element data Validation", function () {
    var lower = this.DataType2.Email.toLowerCase();
    //Validating details view input data
    cy.xpath("//input[@controlname='" + lower + "']").should("have.value", this.RelatedKitItemData3.Email)

  });

  it.only("Addressline1 Element data Validation", function () {
    //Validating details view input data
    cy.get('[placeholder="Street address, building, company ... "]').eq(0)
      .should("have.value", this.RelatedKitItemData3.Addressline1)
  });

  it.only("Addressline2 Element data Validation", function () {
    //Validating details view input data
    cy.get('[name="Address line 2."]')
      .should("have.value", this.RelatedKitItemData3.Addressline2)
  });

  it.only("City Element data Validation", function () {
    //Validating details view input data
    cy.get('[placeholder="City"]')
      .should("have.value", this.RelatedKitItemData3.City)
  });

  it.only("ZipCode Element data Validation", function () {
    //Validating details view input data
    cy.get('[placeholder="Zip/Postal Code"]').eq(0)
      .should("have.value", this.RelatedKitItemData3.ZipCode)
  });

  it.only("State Element data Validation", function () {
    cy.xpath('//div[@class="v-select__slot"]//div[@class="v-select__selections"]//div[@class="v-select__selection v-select__selection--comma"]')
      .eq(0)
      .invoke('text').then((text) => {
        expect(text.trim()).equal(this.RelatedKitItemData3.State)
      })
  });

  it.only("Country Element data Validation", function () {
    //Validating details view input data
    cy.get('[placeholder="Country"]')
      .should("have.value", this.RelatedKitItemData3.Country)
  });

  it.only("Number Element data Validation", function () {
    var lower = this.DataType2.Number.toLowerCase();
    //Validating details view input data
    cy.xpath("//input[@controlname='" + lower + "']")
      .should("have.value", this.RelatedKitItemData3.Number)
  });

  it.only('Time Element data Validation', function () {
    //Check in josn for LoggedTime
    cy.get('[placeholder="Add Time"][readonly="readonly"]').eq(0)
      .should("have.value", this.RelatedKitItemData3.LoggedTime)
  })

  it.only('Date Element data Validation', function () {
    //Check in josn for LoggedDate
    cy.get('[placeholder=" MM / DD / YYYY"]').eq(0)
      .should("have.value", this.RelatedKitItemData3.LoggedDate)
  })

  it.only("Toggle Element data Validation", function () {
    cy.xpath('//div[@class="pl-3 col"]//div[@class="v-input--selection-controls__input"]//input')
      .first()
      .should('have.attr', 'aria-checked', 'true')
  });

  it.only("SelectList Element data Validation", function () {
    var selectList = this.DataType2.SelectListName.toLowerCase();
    cy.xpath('//div[@controlname="selectList"]//div[@class="v-list-item__subtitle"]')
      .invoke('text').then((text) => {
        expect(text.trim()).equal(this.RelatedKitItemData3.SelectListValue)
      });
  })

  it.only('RadioSelect Element data Validation', function () {
    var radio = this.DataType2.RadioSelectName.toLowerCase();
    //json value assertion
    cy.xpath('//div[@controlname="radioSelect"]//div[@class="v-input__slot"]//div[@class="v-radio theme--light v-item--active"]//div[@class="v-list-item__content"]')
      .invoke('text')
      .then((text) => {
        cy.log(text)
        expect(text.trim()).contains(this.RelatedKitItemData3.RadioSelectValue)
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
        expect(text.trim()).equal(this.RelatedKitItemData3.StepperValue)
      })
  });

  it.only('UserSelector Element data Validation', function () {
    //scroll to user selector
    cy.get('.imageContent').eq(0).scrollIntoView({ force: true })
    cy.wait(1000)
    cy.xpath('//div[@controlname="userSelector"]//div[@class="col item-label"]').children('div').invoke('text').then((text) => {
      expect(text.trim()).equal(this.RelatedKitItemData3.UserSelectorName)
    });
  })

  it.only('ContactSelector Element data Validation', function () {
    cy.xpath('//div[@controlname="contactSelector"]//div[@class="col item-label"]').children('div').invoke('text').then((text) => {
      expect(text.trim()).equal(this.RelatedKitItemData3.ContactSelectorName)
    });
  })

  it.only('OneToOne Related Control Items Validation', function () {
    cy.get(".last-updated:nth-child(2) > .v-icon").should("exist");
  })

  it.only('Assigning Element data Validation', function () {
    var lower = this.DataType2.Assigning.toLowerCase();
    cy.get('.v-btn:nth-child(1) .v-badge > .inline-svg').eq(0).scrollIntoView({ force: true })

    //json value assertion
    cy.xpath('//div[@controlname="' + lower + '"]//div[@class="item-label col"]').children('div').invoke('text')
      .then((text) => {
        expect(text.trim()).equal(this.RelatedKitItemData3.AssigningName)
      });
  })

  it.only('Inspection Element data Validation', function () {
    var inspection = this.DataType2.InspectionName.toLowerCase();
    cy.xpath('//div[@controlname="' + inspection + '"]//div[@class="v-slide-group__content"]').children('span.v-chip--active')
      .invoke('text').then((text) => {
        expect(text.trim()).equal(this.RelatedKitItemData3.InspectionValue)
      });
  });

  it.only('Icon Element data Validation', function () {
    //Validating details view input data
    cy.get('[placeholder="Label"]')
      .should("have.value", this.RelatedKitItemData3.IconLabel)
  })

  it.only('Close the related kit item', function () {
    cy.wait(1000)
    cy.get(".subheader--button-icon-wrapper path").first().click({
      force: true,
    });
    cy.contains(this.NewKitItemData.KitName).should("be.visible");
  })

  it.only("Link Existing Item for Square Card Related Control", function () {
    cy.wait(2000);
    //Click on New Item for one to Many Related Control
    cy.get(".ca-item")
      .eq(2)
      .scrollIntoView({ force: true })
      .click({ force: true });
    //Search List view pop up assertion
    cy.contains(this.ViewName.SearchView).should("be.visible");
    //Select the item to be linked
    cy.get(".thumb-selected-icon").eq(0).click({ force: true });
    cy.wait(1000);
    //Click on select btn
    cy.get(".button-pop-ups > .v-btn__content").first().click({ force: true });
    //Assertion
    cy.contains(
      "Relation on " +
      this.DataType2.SquareCardName +
      " for " +
      this.NewKitItemData.KitName +
      " linked "
    ).should("be.visible");
    //Assertion for link item
    cy.get(".px-2:nth-child(1) .inline-svg").should("exist");
    cy.get(".px-2:nth-child(2) .inline-svg").should("exist");
    cy.get(".px-2:nth-child(3) .inline-svg").should("exist");
    //Link assertion
    cy.contains("Total 3 items").should("be.visible");
    cy.wait(1000);
  });

  it.only("Deletion Link Item", function () {
    cy.wait(1000);
    cy.get(".btn-load .inline-svg").eq(1).scrollIntoView({ force: true });
    //Click on three dots on linked square card
    //Click on created one to many kit item
    cy.get(".px-2:nth-child(1) .inline-svg").click({ force: true });
    //Assertion
    //cy.contains(" Edit Item ").should("be.visible");
    //cy.contains(" Delete Item ").should("be.visible");
    cy.wait(1000);
    cy.contains(" Delete Item ").click({ force: true });
    cy.wait(2000);
    //cy.get('.v-list-item:nth-child(2) > .v-list-item__title').click();
    cy.contains(" Are you sure you want to discard?").should("be.visible");
    cy.wait(1000);
    cy.contains(" Discard ").click({ force: true });
    cy.contains(
      "Relation on " +
      this.DataType2.SquareCardName +
      " for " +
      this.NewKitItemData.KitName +
      " Deleted"
    ).should("be.visible");
    //After delete total kit item assertion
    cy.contains("Total 2 items").should("be.visible");
    cy.wait(2000);
  });
});
