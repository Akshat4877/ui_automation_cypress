import LoginPage from "../PageObject/LoginPage";
import KitTypePage from "../PageObject/KitTypePage";
import SanityLoginPage from "../PageObject/SanityLoginPage";

describe("Recurring New kit item creation test case", function () {
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
    //lp.EnterEmail("citycom@commonareas.work.dev");
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

    // cy.fixture("SanityPackTestData(Prod)/UpdateRecurringKitItem(Prod)").then(
    //   function (SanityTCData) {
    //     this.NewKitItemData = SanityTCData;
    //   }
    // );

    cy.fixture("SanityPackTestData2/UpdateRecurringKitItem").then(function (
      SanityTCData
    ) {
      this.NewKitItemData = SanityTCData;
    });

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

    //////////////////////////////////////////////////////////////////////////////////

    cy.fixture("KitBuilderTestData/FormViewsNameData").then(function (
      KitTypeFormViewsNames
    ) {
      this.ViewName = KitTypeFormViewsNames;
    });

    cy.fixture("KitBuilderTestData/NewKitTypeData").then(function (
      KittypeName
    ) {
      this.KitTypeName = KittypeName;
    });
  });

  it.only("Left panel existing recurring item", function () {
    const lp = new LoginPage();
    //Click on Hamburger Icon
    lp.HMBIcon();
    cy.wait(2000);
    //Click on Recurring items in left pannel
    cy.get(".v-list-item:nth-child(4) .v-list-item__title").first().click({
      force: true,
    });
    //Assertions
    cy.contains(this.NewKitItemData.ExistingRecurringItemName).should(
      "be.visible"
    );
    cy.contains(this.NewKitItemData.ExistingRecurringItemName).click({
      force: true,
    });
    cy.wait(2000);
  });

  it.only("Open Recurring Items to update", function () {
    const lp = new LoginPage();
    //Assertions
    cy.contains(" Details ").should("be.visible");
    cy.contains(" Recurring Items ").should("be.visible");

    //Update Recurring schedule name
    cy.get('[name="Name"]')
      .clear()
      .type(this.NewKitItemData.UpdatedRecurringitemName);
    cy.wait(1000);
    cy.contains(" Recurring Items ").click({ force: true });
    cy.wait(2000);

    //Save recurring kit item assertion
    cy.contains(this.NewKitItemData.KitName + "#").should("be.visible");
    cy.contains("Item: " + this.NewKitItemData.KitName).should("be.visible");
    cy.wait(1000);
    cy.contains(this.NewKitItemData.KitName + "#").click({ force: true });
    cy.wait(3000);
    //Assertion
    cy.contains(this.NewKitItemData.KitName).should("be.visible");
  });

  it.only("Update Recurring Kit Item", function () {
    const KTP = new KitTypePage();
    const lp = new LoginPage();
    cy.wait(4000);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Creating Recurring kit item

    //save Kit Item for empty form
    cy.get(".v-select__selections .v-btn__content").click({ force: true });
    //kit item Save Assertion for no data
    cy.contains("Nothing to save for " + this.NewKitItemData.KitName).should(
      "be.visible"
    );
    //Url
    cy.get("[name" + "=" + this.DataType2.Url + "]")
      .last()
      .clear()
      .type(this.NewKitItemData.UpdatedUrl);

    //Text
    cy.get("[name" + "=" + this.DataType2.Text + "]")
      .last()
      .clear()
      .type(this.NewKitItemData.UpdatedText);

    //File
    //Click on to remove existing file
    cy.get(".dropzone-area-button:nth-child(2)").click({ force: true });
    //Discard validation
    cy.contains(" Are you sure you want to discard?").should("be.visible");
    //Click on Discard
    cy.get(".mb-4:nth-child(1) .v-btn__content").click({ force: true });
    cy.log("Existing file has been deleted");
    //Click on file link again
    cy.get(".link-icon--green > path").click({ force: true });
    //give file name to select
    cy.contains(this.NewKitItemData.UpdatedLibFileName).click({ force: true });
    cy.get(
      ".container-search > .pop-up--header > .pop-up--header--right > .button-pop-ups--size > .v-btn__content"
    ).click({ force: true });
    cy.contains("File saved").should("be.visible");
    cy.log("New file has been uploaded");
    cy.wait(1000)

    //Telephone
    cy.get("[name" + "=" + this.DataType2.Telephone + "]")
      .last()
      .clear()
      .type(this.NewKitItemData.UpdatedTelephone);

    //TextAera
    cy.get("[name" + "=" + this.DataType2.TextAera + "]")
      .last()
      .clear()
      .type(this.NewKitItemData.UpdatedTextAera);

    //Slider;
    //Firing Alert pop for manual action
    cy.log("User need to do something").then(() => {
      alert("Set Slider value by clicking slider Bar");
    });
    cy.log(
      "Firing Alert pop for manual action to Set Slider value by clicking slider Bar"
    );
    cy.wait(5000);

    //Currency;
    cy.xpath('//div[@class="kit-control-currency--right ma-0 pa-0 col"]//div[@class="v-text-field__slot"]//label[@class="v-label v-label--active theme--light"]')
      .next('input').clear().type(this.NewKitItemData.UpdatedCurrency);
    cy.log("Currency Updated");

    //Measure
    cy.xpath('//div[@class="kit-control-measure--left ma-0 pa-0 pr-2 col"]//div[@class="v-text-field__slot"]//label[@class="v-label v-label--active theme--light"]')
      .next('input').clear().type(this.NewKitItemData.UpdatedMeasure);
    cy.log("Measure Updated");

    //Email;
    cy.get("[name" + "=" + this.DataType2.Email + "]")
      .last()
      .clear()
      .type(this.NewKitItemData.UpdatedEmail);

    //Address
    cy.get('[placeholder="Street address, building, company ... "]')
      .scrollIntoView({ force: true })
    cy.wait(2000)

    //Address
    cy.get('[placeholder="Street address, building, company ... "]')
      .clear()
      .type(this.NewKitItemData.NewAddressline1);
    //Address line
    cy.get('[name="Address line 2."]')
      .clear()
      .type(this.NewKitItemData.NewAddressline2);

    cy.get('[placeholder="City"]').scrollIntoView({ force: true });
    cy.wait(1000);

    //City
    cy.get('[placeholder="City"]').clear().type(this.NewKitItemData.NewCity);
    //State
    cy.get(
      "div:nth-child(2) > div:nth-child(4) > div > div > div.v-input__slot > div.v-select__slot > div.v-input__append-inner > div"
    ).click({ force: true });
    cy.contains(this.NewKitItemData.NewState).click({ force: true });

    cy.get('[placeholder="Zip/Postal Code"]').scrollIntoView({ force: true });
    cy.wait(1000);

    //ZipCode
    cy.get('[placeholder="Zip/Postal Code"]')
      .clear()
      .type(this.NewKitItemData.UpdatedZipCode);

    //Number
    cy.get("[name" + "=" + this.DataType2.Number + "]")
      .last()
      .clear()
      .type(this.NewKitItemData.UpdatedNumber);

    //Time Data Element
    //Click on Time to appear time pop up
    cy.get('[placeholder="Add Time"][type="text"]').click({ force: true });
    cy.wait(1000);
    //Select hour value
    cy.xpath(
      "//div[contains(@class,'v-dialog v-dialog--active')]//span[5]"
    ).click({ force: true });
    cy.wait(1000);
    //Select Value of miniutes
    cy.xpath("//span[contains(text(),'25')]").first().click({ force: true });
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
    ).click({ force: true });
    //Select Date
    cy.xpath("//div[@class='v-btn__content'][contains(text(),'25')]")
      .first()
      .click({ force: true });
    cy.wait(1000);
    //Click on OK to save Date
    cy.xpath("//span[contains(text(),'OK')]").first().click({ force: true });
    cy.wait(1000);

    //Toggle
    cy.get(".sync-switch .v-input--selection-controls__ripple").click({
      force: true,
    });

    //Click on DropDown of SelectList
    cy.get(
      "div > div > div.v-input__slot > div.v-select__slot > div.v-input__append-inner"
    )
      .eq(4)
      .click({ force: true });
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
    cy.contains(this.NewKitItemData.CheckboxSelectValue5).click({
      force: true,
    });
    cy.log("Checkbox Values has been set.");

    //Stepper
    cy.contains(this.NewKitItemData.StepperValue).scrollIntoView({
      force: true,
    });
    cy.wait(1000);
    //getting value form different json file
    cy.contains(this.NewKitItemData.StepperValue).click({ force: true });
    cy.log("Stepper Value has been set.");

    //Click on to open UserSelector Pop up
    cy.get(
      " div.row.wrapper-content.fill-height div.pop-up-min-height.col.col-12 div.container.action-item-detail-wrapper.kit-details-wrapper.fill-height.container--fluid div.row.fill-height.no-gutters div.row.kit-details-wrapper--content.pb-0 div.row.fill-height.justify-center div.col.col-12 div.row.wrapper-content.fill-height div.base-layout-main-content.schedule-details.pa-0.fill-height.col.col-12 div.container.pa-0.ma-0.fill-height.justify div.fill-height.pa-0.ma-0.col.wrapper-tabs-and-content.fill-height.fill-width div.tab--content.col div.v-window.tab-content-wrapper.v-item-group.theme--light.v-tabs-items div.v-window__container div.v-window-item.v-window-item--active:nth-child(1) div.wrapper-tabs-content.v-card.v-sheet.theme--light div.v-card__text.kit-documents.fill-height div.row.container-details div.fill-height.col div.container.details-wrapper.fill-height div.row.kit-related-form.pa-6 div.kit-control-component.kit-control-component--item-picker.px-3.col.col-sm-12.col-md-6.mb-4.px-3.col-sm-12.col-md-6.mb-4.px-3:nth-child(22) span.searchRel div.v-input.searchSelectNone.v-input--is-label-active.v-input--is-dirty.v-input--is-readonly.theme--light.v-text-field.v-text-field--is-booted.v-text-field--enclosed.v-text-field--outlined.v-select div.v-input__control div.v-input__slot > div.v-select__slot:nth-child(2)"
    ).click({ force: true });
    cy.wait(3000);
    cy.contains(this.NewKitItemData.UserSelectorName).click({ force: true });
    cy.log("UserSelect added");
    cy.wait(1000);

    //ContactSelector(Values coming form KitItemValues Json File)
    //Click on to open ContactSelector Pop up
    cy.get(
      " div.row.fill-height.justify-center div.col.col-12 div.row.wrapper-content.fill-height div.base-layout-main-content.schedule-details.pa-0.fill-height.col.col-12 div.container.pa-0.ma-0.fill-height.justify div.fill-height.pa-0.ma-0.col.wrapper-tabs-and-content.fill-height.fill-width div.tab--content.col div.v-window.tab-content-wrapper.v-item-group.theme--light.v-tabs-items div.v-window__container div.v-window-item.v-window-item--active:nth-child(1) div.wrapper-tabs-content.v-card.v-sheet.theme--light div.v-card__text.kit-documents.fill-height div.row.container-details div.fill-height.col div.container.details-wrapper.fill-height div.row.kit-related-form.pa-6 div.kit-control-component.kit-control-component--item-picker.px-3.col.col-sm-12.col-md-6.mb-4.px-3.col-sm-12.col-md-6.mb-4.px-3:nth-child(24) span.searchRel div.v-input.searchSelectNone.v-input--is-label-active.v-input--is-dirty.v-input--is-readonly.theme--light.v-text-field.v-text-field--is-booted.v-text-field--enclosed.v-text-field--outlined.v-select div.v-input__control div.v-input__slot > div.v-select__slot:nth-child(2)"
    ).click({ force: true });
    cy.wait(3000);
    cy.contains(this.NewKitItemData.ContactSelectorName).click({ force: true });
    cy.log("ContactSelecto added");
    cy.wait(1000);

    //scroll
    cy.get('.v-btn:nth-child(1) .v-badge > .inline-svg').scrollIntoView({ force: true })
    cy.wait(1000)
    //getting value form different json file
    //Icon
    cy.get(".v-btn__content > img").scrollIntoView({ force: true });
    //Click on + icon of ICON Element
    cy.get(".v-btn__content > img").click({ force: true });
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
    ).click({ force: true });
    cy.contains(this.NewKitItemData.ExtraLargeiconSize).click({ force: true });
    //IconLable
    cy.get('[placeholder="Label"]').clear().type(this.NewKitItemData.IconLabel);

    //Inspection
    cy.get('.v-btn:nth-child(1) .v-badge > .inline-svg')
      .scrollIntoView({ force: true })
    cy.wait(1000)
    cy.xpath("//*[contains(text(),'" + this.NewKitItemData.InspectionValue + "')]//div[@class='v-avatar v-avatar--left']")
      .click({ force: true })
    cy.wait(1000);

    cy.wait(3000);
    //Assigning
    //Click on to open Assigning Pop up-Also working
    cy.get(
      " div.new-kit-item.edit-pop-up.v-card.v-sheet.theme--light div.row.wrapper-content.fill-height div.pop-up-min-height.col.col-12 div.container.action-item-detail-wrapper.kit-details-wrapper.fill-height.container--fluid div.row.fill-height.no-gutters div.row.kit-details-wrapper--content.pb-0 div.row.fill-height.justify-center div.col.col-12 div.row.wrapper-content.fill-height div.base-layout-main-content.schedule-details.pa-0.fill-height.col.col-12 div.container.pa-0.ma-0.fill-height.justify div.fill-height.pa-0.ma-0.col.wrapper-tabs-and-content.fill-height.fill-width div.tab--content.col div.v-window.tab-content-wrapper.v-item-group.theme--light.v-tabs-items div.v-window__container div.v-window-item.v-window-item--active:nth-child(1) div.wrapper-tabs-content.v-card.v-sheet.theme--light div.v-card__text.kit-documents.fill-height div.row.container-details div.fill-height.col div.container.details-wrapper.fill-height div.row.kit-related-form.pa-6 div.kit-control-component.kit-control-assigning.pr-3.col.col-sm-12.col-md-6.mb-4.px-3.col-sm-12.col-md-6.mb-4.px-3:nth-child(28) span.searchRel div.v-input.searchSelectNone.v-input--is-label-active.v-input--is-dirty.v-input--is-readonly.theme--light.v-text-field.v-text-field--is-booted.v-text-field--enclosed.v-text-field--outlined.v-select div.v-input__control div.v-input__slot > div.v-select__slot:nth-child(2)"
    ).click({ force: true });
    cy.wait(4000);
    //Click on to select the Assigning
    cy.contains(this.NewKitItemData.Assigning).click({ force: true });
    cy.wait(3000);
    //Click on to save
    cy.get(".button-pop-ups--size > .v-btn__content").click({ force: true });
    //Assigning creation assertion
    cy.contains("Item shared").should("be.visible");
    cy.log("Assigning added");

    //save Kit Item
    cy.get(".v-select__selections .v-btn__content").click({ force: true });
    cy.contains(this.NewKitItemData.KitName + " has been saved").should(
      "be.visible"
    );
    cy.log(this.NewKitItemData.KitName + "Kit Type has been Saved");
    cy.wait(1000);
  });

  it.only("Files Tab", function () {
    //Files Tab
    cy.contains("Files").click({ force: true });
    //Click on Library
    cy.contains("Choose From Library").click({ force: true });
    //give file name to select
    cy.get(".thumb-container:nth-child(2) .item-check").click({ force: true });
    //Click on save file
    cy.get(".button-pop-ups--size > .v-btn__content")
      .first()
      .click({ force: true });
    //Assertion validation
    cy.contains("File saved").should("be.visible");
    cy.log("File uploaded");
    cy.wait(1000);
  });

  it.only("Add a pin on Map", function () {
    //Map Tab
    cy.contains(" Map ").click({ force: true });
    cy.wait(2000);
    //Click on Map
    cy.get(
      ".vue-map-container:nth-child(2) .gm-style > div:nth-child(1) > div:nth-child(3)"
    ).click({ force: true });
    cy.contains("Add a Pin").click({ force: true });
    cy.contains(' Pin has been added successfully. ').should("be.visible");
    cy.wait(2000);
  });

  it.only("Time Entries Tab", function () {
    //Time Entries Tab
    cy.contains(" Time Entries ").click({ force: true });
    cy.wait(2000);
    //Click on Add for Time Entries
    cy.get(".ml-4 > .v-btn__content").first().click({ force: true });
    //Assertion validation
    cy.contains("Time Entry").should("be.visible");
    //Click on + icon
    cy.wait(2000);
    cy.get(".add-new--icon").click({ force: true });
    //Assertion validation
    cy.contains(" Add New Time Type ").should("be.visible");
    cy.wait(2000);
    cy.get('[placeholder="Label"]')
      .eq(0)
      .type(this.NewKitItemData.RecurringUpdateTimeEntryLable);
    cy.get('[placeholder="Description"]').type(
      this.NewKitItemData.RecurringUpdateTimeEntryDescription
    );
    //Click on Save
    cy.get(".col-4 .v-btn__content").first().click({ force: true });
    //Assertion validation
    cy.contains(" New Time Type saved ").should("be.visible");
    cy.wait(2000);
    //Click on Total hours
    cy.get('[name="totalHours"]').type(
      this.NewKitItemData.RecurringNewTotalHours
    );
    //Click on select date
    cy.get('[name="startdate"]').click({ force: true });
    cy.wait(4000);
    //Select Date
    cy.xpath("//div[contains(text(),'30')]").eq(0).click({ force: true });
    //Click on OK
    cy.wait(1000);
    cy.xpath("//span[contains(text(),'OK')]").first().click({ force: true });
    cy.wait(2000);

    cy.wait(1000);
    cy.get('[placeholder="Add a Description"]').type(
      this.NewKitItemData.RecurringNewAddDescription
    );
    //Click on Save
    cy.get(".col-3 > .ca-button-green > .v-btn__content").click({
      force: true,
    });
    //Assertion validation
    cy.contains(" Time Entry details saved ").should("be.visible");
    cy.log("Time Entry details saved");
    cy.wait(2000);
  });

  it.only("Comments Tab", function () {
    //Comments Tab
    cy.contains("Comments ").click({ force: true });
    cy.get('[name="addComment"]').type(
      this.NewKitItemData.RecurringUpdatedComments
    );
    cy.contains(" SAVE ").click({ force: true });
    //Assertion validation
    cy.contains(" New Comment added ").should("be.visible");
    cy.log("Comment has been added");
    //save Kit Item
    cy.get(".v-select__selections .v-btn__content").click({ force: true });

    //kit item Save Assertion
    cy.contains("Nothing to save for " + this.NewKitItemData.KitName).should(
      "be.visible"
    );
    cy.wait(5000);
    //Close Kit type
    cy.get(".subheader--button-icon-wrapper path").click({
      force: true,
    });
    cy.log(this.NewKitItemData.KitName + "Kit item has been Close");
    cy.wait(2000);
    //Save recurring kit item assertion
    cy.contains(this.NewKitItemData.KitName + "#").should("be.visible");
    cy.contains("Item: " + this.NewKitItemData.KitName).should("be.visible");
  });

  it.only("Set Recurring Schedule to Execute for Updated Item", function () {
    const lp = new LoginPage();

    cy.contains(" Details ").click({ force: true });

    cy.wait(3000);
    cy.get('[placeholder="Schedule Start Date"]').click({ force: true });
    cy.wait(1000);
    //Firing Alert pop for manual action to set date
    cy.log("User need to do something").then(() => {
      alert("Set the Recurring Item Executing Date");
    });
    cy.log(
      "Firing Alert pop for manual action to Set the Recurring Item Executing Date"
    );
    cy.wait(5000);

    cy.get('[placeholder="Schedule Start Time"]').click({ force: true });
    cy.wait(1000);
    cy.log("User need to do something").then(() => {
      alert("Set the Recurring Item Executing Time");
    });
    cy.log(
      "Firing Alert pop for manual action to Set the Recurring Item Executing Time"
    );
    cy.wait(5000);
    //Save the recurring schedule
    cy.get(".ca-button-green:nth-child(2) > .v-btn__content").click({
      force: true,
    });
    cy.contains(" Schedule saved ").should("be.visible");
    cy.wait(2000);
    //Close the recurring pop up
    cy.get(
      ".fill-height > .v-btn > .v-btn__content > .inline-svg > path"
    ).click({ force: true });
    cy.wait(3000);
  });
});
