import LoginPage from "../PageObject/LoginPage";
import SanityLoginPage from "../PageObject/SanityLoginPage";

describe("Create Active schedule for Kit Item through Add button in calendar", function () {
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

    cy.fixture("SanityPackTestData2/Calendar").then(function (KitDataEle) {
      this.NewKitItemData = KitDataEle;
    });

    // cy.fixture("SanityPackTestData(Prod)/Calendar(Prod)").then(function (
    //   KitDataEle
    // ) {
    //   this.NewKitItemData = KitDataEle;
    // });

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

    cy.fixture("SanityPackTestData2/UpdateCalendar").then(function (
      KitDataEle
    ) {
      this.UpdateCalendar = KitDataEle;
    });

    // cy.fixture("SanityPackTestData(Prod)/UpdateCalendar").then(function (
    //   KitDataEle
    // ) {
    //   this.UpdateCalendar = KitDataEle;
    // });
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

  it.only("Navigate to kit item list View(Left Panel) to open Calendar", function () {
    const lp = new LoginPage();
    //Click on Hamburger Icon
    lp.HMBIcon();
    cy.wait(2000);
    cy.contains(this.NewKitItemData.KitName).scrollIntoView({
      force: true,
    });
    cy.wait(5000);
    //Open KitType from left paneal
    cy.contains(this.NewKitItemData.KitName).click({
      force: true,
    });
    cy.log("Kit Type has been OPened");
    cy.wait(5000);
    //Click on First kit item of kit type to open edit view
    cy.log("Kit Item Detail View has been Opened");
    cy.wait(3000);
    //Validation assertion for details view
    cy.get(".kits-landing--header-title").should(
      "have.text",
      " Recently Viewed "
    );
    cy.wait(3000);
    //Click on created kit item
    cy.xpath('//div[@class="row-list-item-details--content py-2 justify-center col col-10 truncate-wrapper"]')
      .eq(0).click({ force: true })
    cy.contains(" Calendar ").click({ force: true });
    cy.wait(3000);
    //Calender tab assertion
    cy.contains("Today").should("be.visible");
    cy.wait(3000);
    //Click on add
    cy.get(".button-w-new-borders > .v-btn__content").click({ force: true });
    cy.contains(" Schedule ").should("be.visible");
    cy.wait(10000);
  });

  it.only("Calender Active Schedule", function () {
    //Url
    //click on URl pancil icon
    cy.xpath('//div[@class="wrapper-card-buttons d-flex justify-end col"]//div[@class="mr-4 action-icon"]')
      .eq(0)
      .click({ force: true });

    cy.contains('Edit Link').should('be.visible')
    //Enter lable
    cy.get('[placeholder="Label"]').first().type(this.NewKitItemData.Url)
    //Url Link
    cy.get("[placeholder" + "=" + this.DataType2.Url + "]")
      .type(this.NewKitItemData.Url);
    //Click on save
    cy.get('.button-pop-ups--size > .v-btn__content').first().click({ force: true });
    cy.wait(1000)

    //Text
    cy.get("[name" + "=" + this.DataType2.Text + "]")
      .eq(1)
      .type(this.NewKitItemData.Text);

    //File
    cy.get(".link-icon--green > path").first().click({ force: true });
    cy.contains(" File Library ").should("be.visible");
    //give file name to select
    //give file name to select
    cy.contains(this.NewKitItemData.CalenderFile).click({ force: true });
    //Click on save file
    cy.get(
      ".container-search > .pop-up--header > .pop-up--header--right > .button-pop-ups--size > .v-btn__content"
    )
      .first()
      .click({ force: true });
    cy.contains("File saved").should("be.visible");
    cy.log("File Saved");
    cy.wait(1000);

    //Telephone
    cy.get("[name" + "=" + this.DataType2.Telephone + "]")
      .eq(1)
      .type(this.NewKitItemData.Telephone);

    cy.get("[name" + "=" + this.DataType2.TextAera + "]")
      .eq(1)
      .scrollIntoView({ force: true });
    cy.wait(2000);

    //TextAera
    cy.get("[name" + "=" + this.DataType2.TextAera + "]")
      .eq(1)
      .type(this.NewKitItemData.TextAera);

    // Currency;
    cy.get(
      "div.kit-control-component.kit-control-currency.px-3.col.col-sm-12.col-md-6.mb-4.px-3.col-sm-12.col-md-6.mb-4.px-3:nth-child(7) div.row div.kit-control-currency--right.ma-0.pa-0.col div.v-input.theme--light.v-text-field.v-text-field--is-booted.v-text-field--enclosed.v-text-field--outlined div.v-input__control div.v-input__slot > div.v-text-field__slot:nth-child(2)"
    )
      .first()
      .click({ force: true })
      .type(this.NewKitItemData.Currency);

    //Measure
    cy.get(
      "div.kit-control-component.kit-control-measure.px-3.col.col-sm-12.col-md-6.mb-4.px-3.col-sm-12.col-md-6.mb-4.px-3:nth-child(8) div.row div.kit-control-measure--left.ma-0.pa-0.pr-2.col div.v-input.theme--light.v-text-field.v-text-field--is-booted.v-text-field--enclosed.v-text-field--outlined div.v-input__control div.v-input__slot > div.v-text-field__slot:nth-child(2)"
    )
      .first()
      .click({ force: true })
      .type(this.NewKitItemData.Measure);

    cy.get("[name" + "=" + this.DataType2.Email + "]")
      .eq(1)
      .scrollIntoView({ force: true });
    cy.wait(2000);

    //Email;
    cy.get("[name" + "=" + this.DataType2.Email + "]")
      .eq(1)
      .type(this.NewKitItemData.Email);

    //Address
    cy.get('[placeholder="Street address, building, company ... "]')
      .eq(0)
      .type(this.NewKitItemData.Addressline1);
    //Address line
    cy.get('[name="Address line 2."]')
      .eq(0)
      .type(this.NewKitItemData.Addressline2);

    cy.get('[placeholder="City"]').eq(0).scrollIntoView({ force: true });
    cy.wait(1000);

    //City
    cy.get('[placeholder="City"]').eq(0).type(this.NewKitItemData.City);
    //State
    cy.get(
      "div:nth-child(2) > div:nth-child(4) > div > div > div.v-input__slot > div.v-select__slot > div.v-input__append-inner > div"
    )
      .eq(0)
      .click({ force: true });
    cy.contains(this.NewKitItemData.State).click({ force: true });

    cy.get('[placeholder="Zip/Postal Code"]')
      .eq(0)
      .scrollIntoView({ force: true });
    cy.wait(1000);

    //ZipCode
    cy.get('[placeholder="Zip/Postal Code"]')
      .eq(0)
      .type(this.NewKitItemData.ZipCode);

    //Number
    cy.get("[name" + "=" + this.DataType2.Number + "]")
      .eq(1)
      .type(this.NewKitItemData.Number);

    //Time Data Element
    //Click on Time to appear time pop up
    cy.get('[placeholder="Add Time"][type="text"]')
      .eq(0)
      .click({ force: true });
    cy.wait(1000);
    //Select hour value
    cy.xpath(
      "//div[contains(@class,'v-dialog v-dialog--active')]//span[10]"
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

    cy.get('[placeholder=" MM / DD / YYYY"]')
      .eq(0)
      .scrollIntoView({ force: true });
    cy.wait(2000);

    //Date Data Element
    //Click on Date to appear Date pop up
    cy.get(
      "div.v-input.no-bottom.date-picker-text-field.date-picker-text-field-direct.theme--light.v-text-field.v-text-field--is-booted.v-text-field--enclosed.v-text-field--outlined.v-text-field--placeholder > div > div.v-input__slot > div.v-input__prepend-inner > i"
    )
      .first()
      .click({ force: true });
    //Select Date
    cy.xpath("//div[@class='v-btn__content'][contains(text(),'20')]")
      .first()
      .click({ force: true });
    cy.wait(2000);
    //Click on OK to save Date
    cy.xpath("//span[contains(text(),'OK')]").first().click({ force: true });
    cy.wait(2000);

    //Toggle
    cy.get(".sync-switch .v-input--selection-controls__ripple").first().click({
      force: true,
    });

    //Click on DropDown of SelectList
    cy.get(
      "div > div > div.v-input__slot > div.v-select__slot > div.v-input__append-inner"
    )
      .eq(2)
      .click({ force: true });
    cy.wait(2000);
    //SelectList Value(Values coming form KitItemValues Json File)
    cy.contains(this.NewKitItemData.SelectListValue).click({ force: true });
    cy.log("SelectList Value has been set.");

    //RadioSelect
    cy.contains(this.NewKitItemData.RadioSelectValue).click({ force: true });
    cy.log("RadioSelect Value has been set.");

    //CheckboxSelect(Values coming form KitItemValues Json File)
    cy.contains(this.NewKitItemData.CheckboxSelectValue1).click({
      force: true,
    });

    cy.log("Checkbox Values has been set.");

    cy.contains(this.NewKitItemData.StepperValue).scrollIntoView({
      force: true,
    });
    cy.wait(2000)
    //Stepper
    //getting value form different json file
    cy.contains(this.NewKitItemData.StepperValue).click({ force: true });
    cy.log("Stepper Value has been set.");

    //Click on to opne user selector
    cy.xpath(
      '//span[@class="searchRel"]//div[@class="v-select__slot"]//div[@class="v-select__selections"]'
    )
      .eq(0)
      .click({ force: true });
    cy.contains(" Users ").should("be.visible");
    cy.wait(1000)
    cy.xpath('//*[text() ="Search"]').first().click({ force: true })
    cy.wait(1000)
    cy.xpath('//*[text() ="Search"]').first().next('input')
      .type(`${this.NewKitItemData.UserSelector}{enter}`)
    cy.wait(3000)
    cy.contains(this.NewKitItemData.UserSelector).click({ force: true });
    cy.log("UserSelect added");
    cy.wait(1000);

    //Link onetoone
    cy.get(".action-icon:nth-child(2) path").eq(1).click({ force: true });
    cy.contains(" Related Items ").should("be.visible");
    cy.wait(2000);
    cy.get(
      ".row:nth-child(1) > .d-flex > .list-item-col-left > .v-avatar:nth-child(1) svg"
    ).click({ force: true });
    //link onetoone assertion
    cy.get(".last-updated:nth-child(2) > .v-icon").should("be.visible");

    //Click on to opne contact selector
    cy.get(
      ' span > div > div > div.v-input__slot > div.v-select__slot > div:nth-child(3)'
    )
      .eq(1)
      .click({ force: true });
    //Click on to open ContactSelector Pop up
    cy.contains("Connection").should("be.visible");
    cy.wait(1000)
    cy.xpath('//*[text() ="Search"]').first().click({ force: true })
    cy.wait(1000)
    cy.xpath('//*[text() ="Search"]').first().next('input')
      .type(`${this.NewKitItemData.ContactSelector}{enter}`)
    cy.wait(3000)
    cy.contains(this.NewKitItemData.ContactSelector).click({ force: true });
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
    cy.get(".thumb-container:nth-child(1) .selected-icon").click({
      force: true,
    });
    //Icon Save
    cy.get(".button-pop-ups").first().click({ force: true });

    //IcozSize
    cy.get(
      "div.row.wrapper-kit-control.align-center > div > div.fill-height.border-right.col.col-4 > div > div > div.v-input__slot > div.v-select__slot > div.v-input__append-inner > div"
    )
      .first()
      .click({ force: true });
    cy.contains(this.NewKitItemData.LargeiconSize).click({ force: true });
    //IconLable
    cy.get('[placeholder="Label"]').eq(1).type(this.NewKitItemData.IconLabel);

    //Inspection
    cy.get('.v-btn:nth-child(1) .v-badge > .inline-svg').eq(0)
      .scrollIntoView({ force: true })
    cy.wait(1000)
    cy.xpath("//*[contains(text(),'" + this.NewKitItemData.InspectionValue + "')]//div[@class='v-avatar v-avatar--left']")
      .eq(0)
      .click({ force: true })
    cy.wait(1000);
    //Click to open assiging
    cy.xpath(
      '//span[@class="searchRel"]//div[@class="v-select__slot"]//div[@class="v-select__selections"]'
    )
      .eq(2)
      .click({ force: true });
    cy.wait(1000);
    //click on to first node of assginig
    cy.xpath('//*[text() ="Search"]').first().click({ force: true })
    cy.wait(1000)
    cy.xpath('//*[text() ="Search"]').first().next('input')
      .type(`${this.NewKitItemData.Assigning}{enter}`)
    cy.wait(3000)
    cy.contains(this.NewKitItemData.Assigning).click({ force: true });
    cy.wait(2000);
    //click to save
    cy.get(
      ".fill-height > .pop-up--header > .pop-up--header--right .v-btn__content"
    ).click({ force: true });
    //Assigning creation assertion
    cy.contains("Item shared").should("be.visible");
    cy.log("Assigning added");
    cy.wait(3000);
    //scheduler end date
    cy.get('[placeholder="Select End Time"]').click({ force: true });
    cy.wait(3000);
    //Select hour value
    cy.xpath(
      "//div[contains(@class,'v-dialog v-dialog--active')]//span[12]"
    ).click({ force: true });
    cy.wait(4000);
    //Select Value of miniutes
    cy.xpath("//span[contains(text(),'55')]").first().click({ force: true });
    cy.wait(2000);
    //Click on PM
    cy.xpath("//div[contains(text(),'PM')]").first().click({ force: true });
    //Click on OK to save date
    cy.get(
      "div.timeActions button.btnBorder.v-btn.v-btn--flat.v-btn--text.theme--light.v-size--default.primary--text:nth-child(1) > span.v-btn__content"
    )
      .first()
      .click({ force: true });
    cy.wait(3000);

    //Click on save
    cy.get(".row > .pop-up--header--right .v-btn__content").click({
      force: true,
    });
    //scheduler save assertion
    //need to change after bug fixed
    //cy.contains('').should('be.visible')
    cy.wait(4000);
  });

  it.only('Click to Validate Calender Fields', function () {

    cy.wait(3000);
    cy.get(".dhx_event_move").eq(1).scrollIntoView({ force: true });
    cy.wait(2000);
    cy.get(".dhx_event_move").eq(1).dblclick({ force: true });
    cy.wait(2000);
    cy.get(".icon_edit").should("exist");
    //click on edit icon
    cy.get(".icon_edit").click({ force: true });
  })

  it.only("Url Element data Validation", function () {
    var lower = this.DataType2.Url.toLowerCase();
    //Validating details view input data
    cy.xpath("//input[@controlname='" + lower + "']")
      .eq(1).should("have.value", this.NewKitItemData.Url)
  });

  it.only("Text Element data Validation", function () {
    var lower = this.DataType2.Text.toLowerCase();
    //Validating details view input data
    cy.xpath("//input[@controlname='" + lower + "']")
      .eq(1).should("have.value", this.NewKitItemData.Text)

  });

  it.only('File Element data Validation', function () {
    var lower = this.DataType2.File.toLowerCase();
    cy.xpath('//div[@class="drop-zone"]//div[@class="v-input__slot"]//div[@class="v-text-field__slot"]//input').eq(0)
      .invoke('val').then((text) => {
        expect(text.trim()).equal(this.NewKitItemData.CalenderFile)
      });
    cy.wait(2000)
  })

  it.only("Telephone Element data Validation", function () {
    var lower = this.DataType2.Telephone.toLowerCase();
    //Validating details view input data
    cy.xpath("//input[@controlname='" + lower + "']")
      .eq(0).should("have.value", this.NewKitItemData.Telephone)
  });

  it.only("TextAera Element data Validation", function () {
    var lower = this.DataType2.TextAera.toLowerCase();
    //Validating details view input data
    cy.get("[name" + "=" + this.DataType2.TextAera + "]")
      .eq(1).should("have.value", this.NewKitItemData.TextAera)
  });

  it.only("Update Calnder", function () {
    cy.wait(3000);
    cy.get(".dhx_event_move").eq(1).scrollIntoView({ force: true });
    cy.wait(2000);
    cy.get(".dhx_event_move").eq(1).dblclick({ force: true });
    cy.wait(2000);
    cy.get(".icon_edit").should("exist");
    //click on edit icon
    cy.get(".icon_edit").click({ force: true });

    cy.wait(10000);
    //Url
    cy.get("[name" + "=" + this.DataType2.Url + "]")
      .eq(1)
      .clear()
      .type(this.UpdateCalendar.Url);

    //Text
    cy.get("[name" + "=" + this.DataType2.Text + "]")
      .eq(1)
      .clear()
      .type(this.UpdateCalendar.Text);

    //File
    cy.get(".link-icon--green > path").first().click({ force: true });
    cy.contains(" File Library ").should("be.visible");
    //give file name to select
    cy.get(".thumb-container:nth-child(1) .selected-icon").click({
      force: true,
    });
    //Click on save file
    cy.get(
      ".container-search > .pop-up--header > .pop-up--header--right > .button-pop-ups--size > .v-btn__content"
    )
      .first()
      .click({ force: true });
    cy.contains("File saved").should("be.visible");
    cy.log("File Saved");
    cy.wait(1000);

    //Telephone
    cy.get("[name" + "=" + this.DataType2.Telephone + "]")
      .eq(1)
      .clear()
      .type(this.UpdateCalendar.Telephone);

    cy.get("[name" + "=" + this.DataType2.TextAera + "]")
      .eq(1)
      .clear()
      .scrollIntoView({ force: true });
    cy.wait(2000);

    //TextAera
    cy.get("[name" + "=" + this.DataType2.TextAera + "]")
      .eq(1)
      .clear()
      .type(this.UpdateCalendar.TextAera);

    //Slider
    // cy.xpath('//div[@class="v-slider v-slider--horizontal theme--light"]//div[@class="v-slider__track-container"]')
    //   .eq(0)
    //   .invoke('val', this.NewKitItemData.SliderValue)
    //   .trigger('change').click({ force: true })

    // Currency;
    cy.get(
      "div.kit-control-component.kit-control-currency.px-3.col.col-sm-12.col-md-6.mb-4.px-3.col-sm-12.col-md-6.mb-4.px-3:nth-child(7) div.row div.kit-control-currency--right.ma-0.pa-0.col div.v-input.theme--light.v-text-field.v-text-field--is-booted.v-text-field--enclosed.v-text-field--outlined div.v-input__control div.v-input__slot > div.v-text-field__slot:nth-child(2)"
    )
      .first()
      .click({ force: true })
      .type(this.UpdateCalendar.Currency);

    //Measure
    cy.get(
      "div.kit-control-component.kit-control-measure.px-3.col.col-sm-12.col-md-6.mb-4.px-3.col-sm-12.col-md-6.mb-4.px-3:nth-child(8) div.row div.kit-control-measure--left.ma-0.pa-0.pr-2.col div.v-input.theme--light.v-text-field.v-text-field--is-booted.v-text-field--enclosed.v-text-field--outlined div.v-input__control div.v-input__slot > div.v-text-field__slot:nth-child(2)"
    )
      .first()
      .click({ force: true })
      .type(this.UpdateCalendar.Measure);

    cy.get("[name" + "=" + this.DataType2.Email + "]")
      .eq(1)
      .scrollIntoView({ force: true });
    cy.wait(2000);

    //Email;
    cy.get("[name" + "=" + this.DataType2.Email + "]")
      .eq(1)
      .clear()
      .type(this.UpdateCalendar.Email);

    //Address
    cy.get('[placeholder="Street address, building, company ... "]')
      .eq(0)
      .clear()
      .type(this.UpdateCalendar.Addressline1);
    //Address line
    cy.get('[name="Address line 2."]')
      .eq(0)
      .clear()
      .type(this.UpdateCalendar.Addressline2);

    cy.get('[placeholder="City"]').eq(0).scrollIntoView({ force: true });
    cy.wait(1000);

    //City
    cy.get('[placeholder="City"]').eq(0).clear().type(this.UpdateCalendar.City);
    //State
    cy.get(
      "div:nth-child(2) > div:nth-child(4) > div > div > div.v-input__slot > div.v-select__slot > div.v-input__append-inner > div"
    )
      .eq(0)
      .click({ force: true });
    cy.contains(this.UpdateCalendar.State).click({ force: true });

    cy.get('[placeholder="Zip/Postal Code"]')
      .eq(0)
      .scrollIntoView({ force: true });
    cy.wait(1000);

    //ZipCode
    cy.get('[placeholder="Zip/Postal Code"]')
      .eq(0)
      .clear()
      .type(this.UpdateCalendar.ZipCode);

    //Number
    cy.get("[name" + "=" + this.DataType2.Number + "]")
      .eq(1)
      .clear()
      .type(this.UpdateCalendar.Number);

    //Time Data Element
    //Click on Time to appear time pop up
    cy.get('[placeholder="Add Time"][type="text"]')
      .eq(0)
      .click({ force: true });
    cy.wait(1000);
    //Select hour value
    cy.xpath(
      "//div[contains(@class,'v-dialog v-dialog--active')]//span[11]"
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

    cy.get('[placeholder=" MM / DD / YYYY"]')
      .eq(0)
      .scrollIntoView({ force: true });
    cy.wait(2000);

    //Date Data Element
    //Click on Date to appear Date pop up
    cy.get(
      "div.v-input.no-bottom.date-picker-text-field.date-picker-text-field-direct.theme--light.v-text-field.v-text-field--is-booted.v-text-field--enclosed.v-text-field--outlined.v-text-field--placeholder > div > div.v-input__slot > div.v-input__prepend-inner > i"
    )
      .first()
      .click({ force: true });
    //Select Date
    cy.xpath("//div[@class='v-btn__content'][contains(text(),'22')]")
      .first()
      .click({ force: true });
    cy.wait(2000);
    //Click on OK to save Date
    cy.xpath("//span[contains(text(),'OK')]").first().click({ force: true });
    cy.wait(2000);

    //Toggle
    cy.get(".sync-switch .v-input--selection-controls__ripple").first().click({
      force: true,
    });

    //Click on DropDown of SelectList
    cy.get(
      "div > div > div.v-input__slot > div.v-select__slot > div.v-input__append-inner"
    )
      .eq(2)
      .click({ force: true });
    //SelectList Value(Values coming form KitItemValues Json File)
    cy.contains(this.UpdateCalendar.SelectListValue).click({ force: true });
    cy.log("SelectList Value has been set.");

    //RadioSelect
    cy.contains(this.UpdateCalendar.RadioSelectValue).click({ force: true });
    cy.log("RadioSelect Value has been set.");

    //CheckboxSelect(Values coming form KitItemValues Json File)
    cy.contains(this.UpdateCalendar.CheckboxSelectValue1).click({
      force: true,
    });
    cy.contains(this.UpdateCalendar.CheckboxSelectValue2).click({
      force: true,
    });

    cy.log("Checkbox Values has been set.");

    cy.contains(this.NewKitItemData.StepperValue).scrollIntoView({
      force: true,
    });
    //Stepper
    //getting value form different json file
    cy.contains(this.UpdateCalendar.StepperValue).click({ force: true });
    cy.log("Stepper Value has been set.");

    //Click on to opne user selector
    cy.get(
      "div > div > div.v-input__slot > div.v-select__slot > div.v-input__append-inner"
    )
      .eq(3)
      .click({ force: true });

    cy.contains(" Users ").should("be.visible");
    cy.wait(3000);
    cy.contains(this.UpdateCalendar.UserSelector).click({ force: true });
    cy.wait(1000);
    cy.log("UserSelect added");
    cy.wait(1000);

    //Link onetoone
    cy.get(".action-icon:nth-child(2) path").first().click({ force: true });
    cy.contains(" Related Items ").should("be.visible");
    cy.wait(2000);
    cy.get(
      ".row:nth-child(3) > .d-flex > .list-item-col-left > .v-avatar:nth-child(1) svg"
    ).click({ force: true });
    //link onetoone assertion
    cy.get(".last-updated:nth-child(2) > .v-icon").should("be.visible");

    //Click on to opne user selector
    cy.get(
      "div > div > div.v-input__slot > div.v-select__slot > div.v-input__append-inner"
    )
      .eq(5)
      .click({ force: true });

    //Click on to open ContactSelector Pop up
    cy.contains("Connection").should("be.visible");
    cy.wait(3000);
    cy.contains(this.UpdateCalendar.ContactSelector).click({ force: true });
    cy.log("ContactSelecto added");
    cy.wait(1000);

    cy.get(".v-btn--depressed > .v-btn__content > .inline-svg > path")
      .first()
      .scrollIntoView({ force: true });
    cy.wait(2000);
    //Icon
    //Click on + icon of ICON Element
    cy.get(".v-btn__content > img").first().click({
      force: true,
    });
    //Click on Icon Tittle and  select Icon logo
    //Give numeric no from 1 in child(1,2,3...)
    cy.get(".thumb-container:nth-child(5) .selected-icon").click({
      force: true,
    });
    //Icon Save
    cy.get(".button-pop-ups").first().click({ force: true });

    //IcozSize
    cy.get(
      "div.row.wrapper-kit-control.align-center > div > div.fill-height.border-right.col.col-4 > div > div > div.v-input__slot > div.v-select__slot > div.v-input__append-inner > div"
    )
      .first()
      .click({ force: true });
    cy.contains(this.UpdateCalendar.SmalliconSize).click({ force: true });
    //IconLable
    cy.get('[placeholder="Label"]')
      .first()
      .clear()
      .type(this.UpdateCalendar.IconLabel);

    //Inspection
    cy.get('.v-btn:nth-child(1) .v-badge > .inline-svg').eq(0)
      .scrollIntoView({ force: true })
    cy.wait(1000)
    cy.xpath("//*[contains(text(),'" + this.UpdateCalendar.InspectionValue + "')]//div[@class='v-avatar v-avatar--left']")
      .eq(0).click({ force: true })
    cy.wait(1000);

    //Click to open assiging
    cy.get(
      "div > div > div.v-input__slot > div.v-select__slot > div.v-input__append-inner"
    )
      .eq(8)
      .click({ force: true });
    cy.wait(5000);
    //click on to first node of assginig
    cy.get(
      ".v-list-item:nth-child(1) .v-input--selection-controls__ripple"
    ).click({ force: true });
    //click to save
    cy.get(
      ".fill-height > .pop-up--header > .pop-up--header--right .v-btn__content"
    ).click({ force: true });
    //Assigning creation assertion
    cy.contains("Item shared").should("be.visible");
    cy.log("Assigning added");
    //click on cross to remove onetone

    cy.get(".last-updated:nth-child(2) > .v-icon")
      .first()
      .click({ force: true });
    cy.contains(" Are you sure you want to discard?").should("be.visible");
    cy.wait(2000);
    //click on discard
    cy.get(".mb-4:nth-child(1) .v-btn__content").first().click({ force: true });
    cy.wait(2000);



    cy.wait(3000);
    //scheduler end date
    cy.get('[placeholder="Select End Time"]').first().click({ force: true });
    cy.wait(3000);
    //Select hour value
    cy.xpath(
      "//div[contains(@class,'v-dialog v-dialog--active')]//span[10]"
    ).click({ force: true });
    cy.wait(4000);
    //Select Value of miniutes
    cy.xpath("//span[contains(text(),'55')]").first().click({ force: true });
    cy.wait(2000);
    //Click on PM
    cy.xpath("//div[contains(text(),'PM')]").first().click({ force: true });
    //Click on OK to save date
    cy.get(
      "div.timeActions button.btnBorder.v-btn.v-btn--flat.v-btn--text.theme--light.v-size--default.primary--text:nth-child(1) > span.v-btn__content"
    )
      .first()
      .click({ force: true });
    cy.wait(3000);

    //Click on save
    cy.get(".row > .pop-up--header--right .v-btn__content").last().click({
      force: true,
    });

    //Updation assertion
    cy.contains(" Active Schedule updated ").should("be.visible");
    cy.wait(5000);
  });

  it.only("Delete Active Schedule", function () {
    cy.wait(5000);

    cy.get(".dhx_event_move").eq(1).scrollIntoView({ force: true });
    cy.wait(2000);
    cy.get(".dhx_event_move").eq(1).dblclick({ force: true });
    cy.wait(2000);
    cy.get(".icon_edit").should("exist");
    //click on edit icon
    cy.get(".icon_edit").click({ force: true });
    cy.wait(2000);
    //Click on delete btn after open the active schedule
    cy.get(".row > .pop-up--header--right .v-btn__content").first().click({
      force: true,
    });
    //Deletion assertion
    cy.contains("Do you want to delete this Schedule").should("be.visible");
    cy.contains("You can't recover it once deleted").should("be.visible");
    //Click on delete btn on confirmation pop up
    cy.wait(2000);
    cy.get(".mb-4:nth-child(1) .v-btn__content").click({ force: true });
    cy.contains(" Active Schedule deleted ").should("be.visible");
    //deletion assertion on paper
    //cy.get(".dhx_event_move").eq(1).should("not.exist");
    cy.wait(2000);
  });
});
