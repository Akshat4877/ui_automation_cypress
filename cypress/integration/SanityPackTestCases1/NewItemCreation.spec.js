import LoginPage from "../PageObject/LoginPage";
import KitTypePage from "../PageObject/KitTypePage";
import SanityLoginPage from "../PageObject/SanityLoginPage";

describe("New kit item complete creation test case", function () {
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

  it.only("Navigating to created Kit type ", function () {
    cy.wait(10000);
    const lp = new LoginPage();
    const KTP = new KitTypePage();
    //Assertion
    cy.title().should("eq", "Common Areas");
    lp.PlusIcon();
    //debugger;
    //Click on To open Kit Type
    KTP.SearchKitType(this.NewKitItemData.KitName);
    cy.wait(1000)
    //This is class to open searched kit type by clicking + iocn
    cy.get(".truncate-special").first().click({ force: true });
    //Assertion
    cy.contains("New Item created").should("be.visible");
    cy.log("New Item created and Kit Type has been Opened");
  });

  it.only("Create New Kit Item with all the fields", function () {
    const lp = new LoginPage();
    //new form ele visible assertion
    cy.get("[name" + "=" + this.DataType2.Text + "]")
      .last()
      .should("be.visible");
    //save Kit Item for empty form
    cy.get(".v-select__selections .v-btn__content").first().click({ force: true });
    //kit item Save Assertion for no data
    cy.contains("Nothing to save for " + this.NewKitItemData.KitName).should(
      "be.visible"
    );
    cy.log("With No data new kit item saved successfully ");

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
    cy.get('.button-pop-ups--size > .v-btn__content').click({ force: true });
    cy.wait(1000)

    //Text
    cy.get("[name" + "=" + this.DataType2.Text + "]")
      .last()
      .type(this.NewKitItemData.Text);

    // //File
    // cy.get(".link-icon--green > path").click({ force: true });
    // cy.wait(1000);
    // //give file name to select
    // cy.contains(this.NewKitItemData.NewFormLibFileName).click({ force: true });
    // //Click on save file
    // cy.get(
    //   ".container-search > .pop-up--header > .pop-up--header--right > .button-pop-ups--size > .v-btn__content"
    // ).click({ force: true });
    // cy.contains("File saved").should("be.visible");
    // cy.log("File Saved");

    //Telephone
    cy.get("[name" + "=" + this.DataType2.Telephone + "]")
      .last()
      .type(this.NewKitItemData.Telephone);

    //TextAera
    cy.get("[name" + "=" + this.DataType2.TextAera + "]")
      .last()
      .type(this.NewKitItemData.TextAera);

    //Slider
    cy.xpath('//div[@class="v-slider v-slider--horizontal theme--light"]//div[@class="v-slider__track-container"]')
      .eq(0)
      .invoke('val', this.NewKitItemData.SliderValue)
      .trigger('change').click({ force: true })

    //save Kit Item
    cy.get(".v-select__selections .v-btn__content").first().click({ force: true });
    cy.contains(this.NewKitItemData.KitName + " has been saved").should(
      "be.visible"
    );
    cy.log(this.NewKitItemData.KitName + "Kit Type has been Saved");
    cy.log("Partially saving new form");
    cy.wait(1000);

    cy.get("[name" + "=" + this.DataType2.TextAera + "]")
      .last()
      .scrollIntoView({ force: true });
    cy.wait(1000);

    // Currency;
    cy.get(
      "#inspire > div.v-dialog__content.v-dialog__content--active > div > div > div > div:nth-child(2) > div.new-kit-item.v-card.v-sheet.theme--light > div > div > div > div > div.row.kit-details-wrapper--content.pb-0 > div > div > div > div > div > div > div.tab--content.col > div > div > div.v-window-item.v-window-item--active > div > div > div.row.container-details > div.fill-height.col > div > div > div.kit-control-component.kit-control-currency.px-3.col.col-sm-12.col-md-6.mb-4.px-3 > div > div.kit-control-currency--right.ma-0.pa-0.col > div > div > div.v-input__slot > div"
    )
      .click({ force: true })
      .type(this.NewKitItemData.Currency);

    //Measure
    cy.get(
      "#inspire > div.v-dialog__content.v-dialog__content--active > div > div > div > div:nth-child(2) > div.new-kit-item.v-card.v-sheet.theme--light > div > div > div > div > div.row.kit-details-wrapper--content.pb-0 > div > div > div > div > div > div > div.tab--content.col > div > div > div.v-window-item.v-window-item--active > div > div > div.row.container-details > div.fill-height.col > div > div > div.kit-control-component.kit-control-measure.px-3.col.col-sm-12.col-md-6.mb-4.px-3 > div > div.kit-control-measure--left.ma-0.pa-0.pr-2.col > div > div > div.v-input__slot > div"
    )
      .click({ force: true })
      .type(this.NewKitItemData.Measure);

    //Email;
    cy.get("[name" + "=" + this.DataType2.Email + "]")
      .last()
      .type(this.NewKitItemData.Email);

    //Scroll
    cy.get(
      '[placeholder="Street address, building, company ... "]'
    ).scrollIntoView({ force: true });
    cy.wait(1000);

    //Address
    cy.get('[placeholder="Street address, building, company ... "]').type(
      this.NewKitItemData.Addressline1
    );
    //Address line
    cy.get('[name="Address line 2."]').type(this.NewKitItemData.Addressline2);

    cy.get('[placeholder="City"]').scrollIntoView({ force: true });

    //City
    cy.get('[placeholder="City"]').type(this.NewKitItemData.City);
    //State
    cy.get(
      "div:nth-child(2) > div:nth-child(4) > div > div > div.v-input__slot > div.v-select__slot > div.v-input__append-inner > div"
    ).click({ force: true });
    cy.contains(this.NewKitItemData.State).click({ force: true });

    cy.get('[placeholder="Zip/Postal Code"]').scrollIntoView({ force: true });
    cy.wait(1000);

    //ZipCode
    cy.get('[placeholder="Zip/Postal Code"]').type(this.NewKitItemData.ZipCode);

    //Number
    cy.get("[name" + "=" + this.DataType2.Number + "]")
      .last()
      .type(this.NewKitItemData.Number);

    //scroll
    cy.get('[placeholder="Add Time"][type="text"]').scrollIntoView({
      force: true,
    });

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
    ).click({ force: true });
    //Select Date
    cy.xpath("//div[@class='v-btn__content'][contains(text(),'22')]")
      .first()
      .click({ force: true });
    //Click on OK to save Date
    cy.xpath("//span[contains(text(),'OK')]").first().click({ force: true });

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


    cy.get(".searchIcon").eq(1).scrollIntoView({ force: true });
    cy.wait(1000)

    //Stepper
    //getting value form different json file
    cy.contains(this.NewKitItemData.StepperValue).click({ force: true });
    cy.log("Stepper Value has been set.");

    //UserSelector(Values coming form KitItemValues Json File)
    //Click on to open UserSelector Pop up
    cy.get(".searchIcon").eq(0).click({ force: true });
    cy.wait(1000)
    cy.xpath('//*[text() ="Search"]').first().click({ force: true })
    cy.wait(1000)
    cy.xpath('//*[text() ="Search"]').first().next('input')
      .type(`${this.NewKitItemData.UserSelectorName}{enter}`)
    cy.wait(3000)
    cy.contains(this.NewKitItemData.UserSelectorName).click({ force: true });
    cy.log("UserSelect added");
    cy.wait(1000);

    //ContactSelector(Values coming form KitItemValues Json File)
    //Click on to open ContactSelector Pop up
    cy.get(".searchIcon").eq(1).click({ force: true });
    cy.wait(1000)
    cy.xpath('//*[text() ="Search"]').first().click({ force: true })
    cy.wait(1000)
    cy.xpath('//*[text() ="Search"]').first().next('input')
      .type(`${this.NewKitItemData.ContactSelectorName}{enter}`)
    cy.wait(3000)
    cy.contains(this.NewKitItemData.ContactSelectorName).click({ force: true });
    cy.log("ContactSelecto added");
    cy.wait(1000);

    //Scroll to Inspection
    cy.get(".v-btn:nth-child(1) .v-badge > .inline-svg").scrollIntoView({
      force: true,
    });

    //getting value form different json file
    //Icon
    //Click on + icon of ICON Element
    cy.get(".v-btn--depressed > .v-btn__content > .inline-svg > path")
      .last()
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
      .last()
      .click({ force: true });
    cy.contains(this.NewKitItemData.LargeiconSize).click({ force: true });
    //IconLable
    cy.get('[placeholder="Label"]').last().type(this.NewKitItemData.IconLabel);

    //Inspection
    cy.get('.v-btn:nth-child(1) .v-badge > .inline-svg')
      .scrollIntoView({ force: true })
    cy.wait(1000)
    cy.xpath("//*[contains(text(),'" + this.NewKitItemData.InspectionValue + "')]//div[@class='v-avatar v-avatar--left']")
      .click({ force: true })
    cy.wait(1000);
    //Assigning
    //Click on to open Assigning Pop up-Also working
    cy.get(".searchIcon > .inline-svg > path").last().click({ force: true });
    //Click on to open Assigning Pop up
    cy.get(".searchIcon").eq(2).click({ force: true });
    cy.wait(4000);
    //Click on to select the Assigning
    //click on checkboxes
    cy.contains('Coordinator').click({ force: true })
    cy.contains('Contributor').click({ force: true })
    cy.wait(1000)
    cy.xpath('//*[text() ="Search"]').first().click({ force: true })
    cy.wait(1000)
    cy.xpath('//*[text() ="Search"]').first().next('input')
      .type(`${this.NewKitItemData.AssigningName}{enter}`)
    cy.wait(3000)

    cy.contains(this.NewKitItemData.AssigningName).click({ force: true });
    //Click on to save
    cy.get(".button-pop-ups--size > .v-btn__content").first().click({ force: true });
    //Assigning creation assertion
    cy.contains("Item shared").should("be.visible");
    cy.log("Assigning added");

    //save Kit Item
    cy.get(".v-select__selections .v-btn__content").first().click({ force: true });
    cy.contains(this.NewKitItemData.KitName + " has been saved").should(
      "be.visible"
    );
    cy.log(this.NewKitItemData.KitName + "Kit Type has been Saved");
  });

  it.only("Files Tab", function () {
    //Files Tab
    cy.contains("Files").click({ force: true });
    //Click on Library
    cy.contains("Choose From Library").click({ force: true });
    //give file name to select
    cy.contains(this.SData.FileTabFileName).click({ force: true });
    //cy.get(".thumb-container:nth-child(2) .item-check").click({ force: true });
    //Click on save file
    cy.get(".button-pop-ups--size > .v-btn__content")
      .first()
      .click({ force: true });
    //Assertion validation
    cy.contains("File saved").should("be.visible");
    cy.log("File uploaded");
    cy.wait(2000)
    //make the file external viewable
    cy.xpath('//*[text()=" Internally Viewable "]').eq(0).click({ force: true })
    cy.contains(' File updated ').should('be.visible')
    cy.wait(2000)
  });

  it.only("Add a pin on Map", function () {
    //Map Tab
    cy.contains(" Map ").click({ force: true });
    //Click on Map
    cy.get(
      ".vue-map-container:nth-child(2) .gm-style > div:nth-child(1) > div:nth-child(3)"
    ).click({ force: true });
    cy.contains("Add a Pin").click({ force: true });
    //cy.contains("Pin has been created successfully.").should("be.visible");
    cy.wait(2000);
  });

  it('Set to "Address" control on Map', function () {
    // cy.contains(" Map ").click({ force: true });
    // cy.wait(2000);
    //Click on Map
    cy.get(
      ".vue-map-container:nth-child(2) .gm-style > div:nth-child(1) > div:nth-child(3)"
    ).click({ force: true });
    cy.contains('Set to "Address" control').click({ force: true });
    //Pop up assertion
    cy.contains(
      'Would you like to set the "Address" to selected location'
    ).should("be.visible");
    cy.wait(2000);
    cy.get(".mb-4:nth-child(1) .v-btn__content").click({ force: true });
    cy.wait(1000);
  });

  it("Link Existing Relation On Map", function () {
    //Click on Map tab
    // cy.contains(" Map ").click({ force: true });
    // cy.wait(2000);
    //Click on Map
    cy.get(
      ".vue-map-container:nth-child(2) .gm-style > div:nth-child(1) > div:nth-child(3)"
    ).click({ force: true });
    cy.wait(1000);
    //Related Kit type
    cy.contains("Link Existing " + this.DataType2.OneToManyRelation).click({
      force: true,
    });
    //Search List view pop up assertion
    cy.contains(this.ViewName.SearchView).should("be.visible");
    //Selct the to be linked kit item
    cy.get(".thumb-selected-icon").eq(0).click();
    cy.get(".thumb-selected-icon").eq(1).click();
    //Click on select btn
    cy.get(".button-pop-ups > .v-btn__content").click({ force: true });
    cy.contains(
      " Relation on " +
      this.DataType2.OneToManyRelation +
      " for " +
      this.NewKitItemData.KitName +
      " linked "
    ).should("be.visible");
    //Click on save
    cy.get(".v-select__selections .v-btn__content").first().click({ force: true });
    cy.contains(this.NewKitItemData.KitName + " has been saved").should(
      "be.visible"
    );
    cy.wait(1000);
  });

  it("Add Relation On Map", function () {
    //Click on Map tab
    // cy.contains(" Map ").click({ force: true });
    // cy.wait(2000);

    //Click on Map
    cy.get(
      ".vue-map-container:nth-child(2) .gm-style > div:nth-child(1) > div:nth-child(3)"
    ).click({ force: true });
    cy.wait(1000);

    ////Add Relation
    cy.contains("Add " + this.DataType2.OneToManyRelation).click({
      force: true,
    });

    //Assertion
    cy.contains("New Item created").should("be.visible");
    //Related New Kit Item assertion
    cy.contains(this.DataType2.KitToBeRelated).should("be.visible");
    cy.wait(4000)
    //related new form element visibility assertion
    cy.get("[name" + "=" + this.DataType2.Text + "]")
      .eq(1).should('be.visible')
    cy.wait(2000)

    //Url
    // cy.get("[name" + "=" + this.DataType2.Url + "]")
    //   .eq(1)
    //   .type(this.NewKitItemData.Url);

    //Text
    cy.get("[name" + "=" + this.DataType2.Text + "]")
      .eq(1)
      .type(this.NewKitItemData.Text);

    //File
    cy.get(".link-icon--green > path").eq(0).click({ force: true });
    cy.wait(3000);
    cy.get(".thumb-container:nth-child(5) .selected-icon").click({
      force: true,
    });
    //Click on save
    cy.get(
      ".container-search > .pop-up--header > .pop-up--header--right > .button-pop-ups--size > .v-btn__content"
    ).click({ force: true });
    cy.contains("File saved").should("be.visible");
    cy.log("File Saved");


    //Slider
    cy.xpath('//div[@class="v-slider v-slider--horizontal theme--light"]//div[@class="v-slider__track-container"]')
      .eq(0)
      .invoke('val', this.NewKitItemData.SliderValue)
      .trigger('change').click({ force: true })

    //Telephone
    cy.get("[name" + "=" + this.DataType2.Telephone + "]")
      .eq(1)
      .type(this.NewKitItemData.Telephone);

    //TextAera
    cy.get("[name" + "=" + this.DataType2.TextAera + "]")
      .eq(1)
      .type(this.NewKitItemData.TextAera);


    //scroll to icon
    cy.get('[placeholder="Label"]').eq(0).scrollIntoView({ force: true })
    cy.get(".v-btn--depressed > .v-btn__content > .inline-svg > path")
      .first().scrollIntoView({ force: true })
    cy.wait(3000)

    //Icon
    //Click on + icon of ICON Element
    cy.get(".v-btn--depressed > .v-btn__content > .inline-svg > path")
      .first()
      .click({
        force: true,
      });
    //Click on Icon Tittle and  select Icon logo
    //Give numeric no from 1 in child(1,2,3...)
    cy.get(".thumb-container:nth-child(10) .selected-icon").click({
      force: true,
    });
    //Icon Save
    cy.get(".button-pop-ups").first().click({ force: true });
    //IconLable
    cy.get('[placeholder="Label"]').eq(0).type(this.NewKitItemData.IconLabel);

    //Click on save
    cy.get(
      ".v-dialog__content:nth-child(1) .fill-height:nth-child(3) .v-btn__content:nth-child(1)"
    ).click();

    //Related kit item on map Save Assertion
    cy.contains(this.DataType2.KitToBeRelated + " has been saved").should(
      "be.visible"
    );
    //Related kit item created assertion
    cy.contains(
      " Relation on " +
      this.DataType2.OneToManyRelation +
      " for " +
      this.NewKitItemData.KitName +
      " created"
    ).should("be.visible");
    //Parent kit type save assertion
    cy.contains(this.NewKitItemData.KitName + " has been saved").should(
      "be.visible"
    );
    cy.wait(5000);

    //Close the tab
    cy.get(".subheader--button-icon-wrapper .inline-svg").first().click({
      force: true,
    });
    cy.wait(1000);
  });

  it.only("Contributors Tab", function () {
    //Contributors Tab
    cy.contains(" Contributors ").click({ force: true });
    //Click on Add for Contributors
    cy.get(".addBtn:nth-child(2) > .v-btn__content").click({ force: true });
    //Assertion validation
    cy.contains(" Connections ").should("be.visible");
    //Click on contribytors checkbox
    cy.contains("Contributor").click({ force: true });
    cy.wait(1000);
    cy.xpath('//*[text() ="Search"]').first().click({ force: true })
    cy.wait(1000)
    cy.xpath('//*[text() ="Search"]').first().next('input')
      .type(`${this.SData.ContributorsName}{enter}`)
    cy.wait(3000)
    //Select Name
    cy.contains(this.SData.ContributorsName).click({ force: true });
    //Click on Save
    cy.get(".button-pop-ups--size > .v-btn__content")
      .eq(0)
      .click({ force: true });
    //creation Assertion validation
    cy.contains("Item shared").should("be.visible");
    cy.log("Contributor added");
    cy.wait(1000);
  });

  it.only("Time Entries Tab", function () {
    //Time Entries Tab
    cy.contains(" Time Entries ").click({ force: true });
    //Click on Add for Time Entries
    cy.get(".ml-4 > .v-btn__content").click({ force: true });
    //Assertion validation
    cy.contains("Time Entry").should("be.visible");
    //Click on + icon
    cy.get(".add-new--icon").click({ force: true });
    //Assertion validation
    cy.contains(" Add New Time Type ").should("be.visible");
    cy.wait(1000);
    cy.get('[placeholder="Label"]').eq(0).type(this.SData.AddTimeEntryLable);
    cy.get('[placeholder="Description"]').type(
      this.SData.AddTimeEntryDescription
    );
    //Click on Save
    cy.get(".col-4 .v-btn__content").first().click({ force: true });
    //Assertion validation
    cy.contains(" New Time Type saved ").should("be.visible");
    cy.wait(2000);
    //Click on Total hours
    cy.get('[name="totalHours"]').type(this.SData.TotalHours);
    cy.wait(3000)
    //Click on select date
    cy.get('[name="startdate"]').click({ force: true });
    cy.wait(2000);
    //Select Date
    cy.xpath("//div[contains(text(),'25')]").eq(0).click({ force: true });
    //Click on OK
    cy.wait(1000);
    cy.xpath("//span[contains(text(),'OK')]").first().click({ force: true });
    cy.wait(2000);
    //Click on Time Entry for
    cy.get(
      "div:nth-child(2) > div:nth-child(1) > span > div > div > div.v-input__slot > div.v-select__slot > div.v-input__append-inner > div"
    ).click({ force: true });
    cy.wait(4000);
    //Assertion validation
    cy.contains("Connection").should("be.visible");
    cy.wait(2000);
    cy.contains(this.SData.TimeEntryConnection).click({ force: true });
    cy.wait(1000);
    cy.get('[placeholder="Add a Description"]').type(this.SData.AddDescription);
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
    cy.get('[name="addComment"]').type(this.SData.AddComments);
    cy.wait(2000)
    //click on save
    cy.get('.v-window-item:nth-child(7) .v-btn__content:nth-child(1)')
    .click({force:true});
    //Assertion validation
    cy.contains(" New Comment added ").should("be.visible");
    cy.contains(this.SData.AddComments).should("be.visible");
    cy.log("Comment has been added");

  });

  it.only("Groups Tab", function () {
    //Groups Tab
    cy.contains(" Groups ").click({ force: true });
    //Click on Add for Grops
    cy.get(".details-wrapper > .col > .ml-0 > .v-btn__content").click({
      force: true,
    });
    cy.wait(2000)
    //Assertion validation
    //cy.contains(" Groups ").should("be.visible");
    cy.contains(this.SData.AddGroup).click({ force: true });
    //Assertion validation
    cy.contains(this.SData.AddGroup).should("be.visible");
    cy.wait(1000);
    //save Kit Item
    cy.get(".v-select__selections .v-btn__content")
      .first()
      .click({ force: true });
    //save Kit Item
    cy.get(".v-select__selections .v-btn__content").first().click({ force: true });
    //cy.contains(this.NewKitItemData.KitName + " has been saved").should("be.visible");
    cy.log(this.NewKitItemData.KitName + "Kit Type has been Saved");
    cy.wait(3000)

    //close the Kit Item
    cy.get(".subheader--button-icon-wrapper path").click({
      force: true,
    });
    cy.log(this.NewKitItemData.KitName + "Kit item has been Close");
    cy.wait(1000)
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
  });

  it.only('Getting Kit Item ID', function () {
    cy.wait(3000)
    //geting kit item id
    cy.xpath('//div[@class="truncate align-center d-none d-sm-flex col"]')
      .invoke('text').then((KitItemId) => {
        cy.log(KitItemId).writeFile(
          "cypress/fixtures/SanityPackTestData2/KitItemId.json",
          {
            ItemID: KitItemId,
          }
        );
      })
    cy.wait(1000)
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
    cy.get('[name="TextAera"]').eq(3).should("have.value", this.NewKitItemData.TextAera)
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
    cy.get('[placeholder="Add Time"][readonly="readonly"]').eq(1)
      .should("have.value", this.NewKitItemData.LoggedTime)
  })

  it.only('Date Element data Validation', function () {
    cy.get('[placeholder=" MM / DD / YYYY"]')
      .should("have.value", this.NewKitItemData.LoggedDate)
  })

  it.only("Toggle Element data Validation", function () {
    //Validation for True Value 
    cy.xpath('//div[@class="pl-3 col"]//div[@class="v-input--selection-controls__input"]//input')
      .should('have.attr', 'aria-checked', 'true')
  });

  it.only("SelectList Element data Validation", function () {
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
    cy.get('[type="checkbox"]').eq(3).should('be.checked')
    cy.get('[type="checkbox"]').last().should('be.checked')
  });

  it.only('Stepper Element data Validation', function () {
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

  it.only('Inspection Element data Validation', function () {
    var inspection = this.DataType2.InspectionName.toLowerCase();
    cy.xpath('//div[@controlname="' + inspection + '"]//div[@class="v-slide-group__content"]').children('span.v-chip--active')
      .invoke('text').then((text) => {
        expect(text.trim()).equal(this.NewKitItemData.InspectionValue)
      });
  });

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
    cy.contains(this.SData.ContributorsName).should('exist')
    cy.contains(this.NewKitItemData.AssigningName).should('exist')
  });

  it.only("Files tab data Validation in details view", function () {
    cy.contains("Files").click({ force: true });
    cy.contains(this.NewKitItemData.NewFormLibFileName).should("be.visible");
    cy.contains(this.SData.FileTabFileName).should("be.visible");
    cy.log("Uploaded files exist");
  });
});


