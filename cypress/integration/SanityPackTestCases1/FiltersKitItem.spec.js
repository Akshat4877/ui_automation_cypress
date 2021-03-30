import LoginPage from "../PageObject/LoginPage";
import KitTypePage from "../PageObject/KitTypePage";
import SanityLoginPage from "../PageObject/SanityLoginPage";

describe("New kit item creation test case", function () {
  this.beforeAll(function () {
    const lp = new LoginPage();
    const slp = new SanityLoginPage();
    //slp.nvdTest()
    slp.TmProd()
    //Handling Alert
    cy.on("window:confirm", () => {
      cy.log("Alert has been Handled");
    });

    //Login Assertions
    cy.contains(" Log In ").should("be.visible");
    //Enter credentials
    //lp.EnterEmail("propertymanagement@commonareas.work.dev");
    lp.EnterEmail("sam@armyspy.com");
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

    // cy.fixture("SanityPackTestData/FiltersKitItemData").then(function (
    //   KitDataEle
    // ) {
    //   this.NewKitItemData = KitDataEle;
    // });

    cy.fixture("SanityPackTestData(Prod)/FiltersKitItemData(Prod)").then(
      function (KitDataEle) {
        this.NewKitItemData = KitDataEle;
      }
    );

    // cy.fixture("VerificationTestCasesData/KitBuilderDataTypes2").then(function (
    //   NewDataForElements
    // ) {
    //   this.DataType2 = NewDataForElements;
    // });

    cy.fixture("SanityPackTestData(Prod)/KitBuilderDataTypes2(Prod)").then(
      function (NewDataForElements) {
        this.DataType2 = NewDataForElements;
      }
    );

    //////////////////////////////////////////////////////////////////////////////////

    cy.fixture("KitBuilderTestData/FormViewsNameData").then(function (
      KitTypeFormViewsNames
    ) {
      this.ViewName = KitTypeFormViewsNames;
    });
  });

  it.only("Navigating to created Kit type ", function () {
    const lp = new LoginPage();
    const KTP = new KitTypePage();
    //Assertion
    //cy.title().should("eq", "Common Areas");
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

  it.only("Create New Kit Item with all the fields for Filters", function () {
    const lp = new LoginPage();
    cy.wait(2000)
    cy.get("[name" + "=" + this.DataType2.Url + "]")
      .last().should('be.visible')
    //save Kit Item for empty form
    cy.get(".v-select__selections .v-btn__content").click({ force: true });
    //kit item Save Assertion for no data
    cy.contains("Nothing to save for " + this.NewKitItemData.KitName).should(
      "be.visible"
    );
    cy.log("With No data new kit item saved successfully ");
    //Url
    cy.get("[name" + "=" + this.DataType2.Url + "]")
      .last()
      .type(this.NewKitItemData.Url);


    //Text
    cy.get("[name" + "=" + this.DataType2.Text + "]")
      .last()
      .type(this.NewKitItemData.Text);

    //File
    cy.get(".link-icon--green > path").click({ force: true });
    cy.wait(3000);
    //give file name to select
    cy.contains(this.NewKitItemData.NewFormLibFileName).click({ force: true });
    //Click on save file
    cy.get(
      ".container-search > .pop-up--header > .pop-up--header--right > .button-pop-ups--size > .v-btn__content"
    ).click({ force: true });
    cy.contains("File saved").should("be.visible");
    cy.log("File Saved");

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

    cy.get('[placeholder="Street address, building, company ... "]')
      .scrollIntoView({ force: true })
    cy.wait(1000)

    //Address
    cy.get('[placeholder="Street address, building, company ... "]').type(
      this.NewKitItemData.Addressline1
    );
    //Address line
    cy.get('[name="Address line 2."]').type(this.NewKitItemData.Addressline2);

    cy.get('[placeholder="City"]').scrollIntoView({ force: true });
    cy.wait(1000);

    //City
    cy.get('[placeholder="City"]').type(this.NewKitItemData.City);

    //country
    cy.get('[placeholder="Country"]').click({ force: true })
    cy.wait(1000)
    cy.contains(this.NewKitItemData.Country).click({ force: true })

    //State
    cy.get(
      "div:nth-child(2) > div:nth-child(4) > div > div > div.v-input__slot > div.v-select__slot > div.v-input__append-inner > div"
    ).click({ force: true });
    cy.contains(this.NewKitItemData.State).click({ force: true });

    cy.get('[placeholder="Country"]').click({ force: true })
    cy.wait(1000)
    cy.contains(this.NewKitItemData.Country).click({ force: true })

    cy.get('[placeholder="Zip/Postal Code"]').scrollIntoView({ force: true });
    cy.wait(1000);

    //ZipCode
    cy.get('[placeholder="Zip/Postal Code"]').type(this.NewKitItemData.ZipCode);

    //Number
    cy.get("[name" + "=" + this.DataType2.Number + "]")
      .last()
      .type(this.NewKitItemData.Number);

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
    cy.wait(1000);
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
    cy.contains(this.NewKitItemData.CheckboxSelectValue2).click({
      force: true,
    });

    //Stepper
    //getting value form different json file
    cy.contains(this.NewKitItemData.StepperValue).click({ force: true });
    cy.log("Stepper Value has been set.");

    cy.get(".searchIcon").eq(1).scrollIntoView({ force: true });
    cy.wait(2000);
    //UserSelector(Values coming form KitItemValues Json File)
    //Click on to open UserSelector Pop up
    cy.get(".searchIcon").eq(0).click({ force: true });
    cy.wait(1000);

    cy.contains(this.NewKitItemData.UserSelectorName).click({ force: true });
    cy.log("UserSelect added");
    cy.wait(3000);

    //ContactSelector(Values coming form KitItemValues Json File)
    //Click on to open ContactSelector Pop up
    cy.get(".searchIcon").eq(1).click({ force: true });
    cy.wait(4000);
    cy.contains(this.NewKitItemData.ContactSelectorName).click({ force: true });
    cy.log("ContactSelecto added");
    cy.wait(1000);

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
    cy.get('[placeholder="Label"]').type(this.NewKitItemData.IconLabel);

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
    cy.contains('Coordinator').click({ force: true })
    cy.contains('Assignee').click({ force: true })
    cy.wait(1000)
    cy.xpath('//*[text() ="Search"]').first().click({ force: true })
    cy.wait(1000)
    cy.xpath('//*[text() ="Search"]').first().next('input')
      .type(`${this.NewKitItemData.AssigningName}{enter}`)
    cy.wait(1000)
    //Click on to select the Assigning
    cy.contains(this.NewKitItemData.AssigningName).click({ force: true });
    cy.wait(1000);
    //Click on to save
    cy.get(".button-pop-ups--size > .v-btn__content").click({ force: true });
    //Assigning creation assertion
    cy.contains("Item shared").should("be.visible");
    cy.log("Assigning added");

    ///////////////////////////////////////////////////////////////////////////////////////////

    //Link Onetomany
    cy.wait(3000);
    //Click on New Item for one to Many Related Control
    cy.get(".ca-item").eq(0).scrollIntoView({ force: true });
    cy.wait(3000);

    cy.get(".ca-item")
      .eq(0)

      .click({ force: true });

    //Search List view pop up assertion
    cy.contains(this.ViewName.SearchView).should("be.visible");
    //Selct the to be linked kit item
    cy.get(".thumb-selected-icon").eq(0).click();
    cy.get(".thumb-selected-icon").eq(1).click();
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
    cy.wait(3000);
    cy.get(
      ".grid-body:nth-child(1) > td:nth-child(1) > .v-list-item__subtitle"
    ).scrollIntoView({ force: true });
    cy.wait(2000);
    cy.get(
      ".grid-body:nth-child(1) > td:nth-child(1) > .v-list-item__subtitle"
    ).should("exist");
    cy.get(
      ".grid-body:nth-child(2) > td:nth-child(1) > .v-list-item__subtitle"
    ).should("exist");

    cy.log("Existing item linked");
    cy.wait(3000);
    /////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////////

    //Link OnetoOne
    cy.wait(2000);
    cy.get(".action-icon:nth-child(2) > .inline-svg").scrollIntoView({
      force: true,
    });

    //Click on to link existing item
    cy.get(".action-icon:nth-child(2) > .inline-svg").click({ force: true });

    //Search List view pop up assertion
    cy.contains(" Related Items ").should("be.visible");
    //Select item to be linked kit item
    cy.get(".row:nth-child(2) > .d-flex .v-avatar:nth-child(1) use").click({
      force: true,
    });
    //Scroll
    cy.get(".last-updated:nth-child(2) > .v-icon").scrollIntoView({
      force: true,
    });
    //Linking assertion
    cy.contains(
      "Relation on " +
      this.DataType2.OneToOneRelation +
      " for " +
      this.NewKitItemData.KitName +
      " linked "
    ).should("be.visible");
    cy.wait(2000);
    //validation
    cy.get(".last-updated:nth-child(2) > .v-icon").should("exist");
    cy.log("Linked onetoone kit item exist");

    cy.wait(4000);

    /////////////////////////////////////////////////////////////////////////////////////////////////

    //Link square card
    cy.wait(3000);
    //Click on New Item for one to Many Related Control
    cy.get(".ca-item").eq(2).scrollIntoView({ force: true });
    cy.wait(3000);
    cy.get(".ca-item").eq(2).click({ force: true });
    //Search List view pop up assertion
    cy.contains(this.ViewName.SearchView).should("be.visible");
    //Selct the to be linked kit item
    cy.get(".thumb-selected-icon").eq(0).click();
    cy.get(".thumb-selected-icon").eq(1).click();
    cy.wait(2000);
    //Click on select btn
    cy.get(".button-pop-ups > .v-btn__content").first().click({ force: true });

    cy.contains(
      "Relation on " +
      this.DataType2.SquareCardName +
      " for " +
      this.NewKitItemData.KitName +
      " linked "
    ).should("be.visible");
    cy.get(".px-2:nth-child(1) .inline-svg").should("exist");
    cy.get(".px-2:nth-child(2) .inline-svg").should("exist");

    cy.log("Existing item linked");
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    //save Kit Item
    cy.get(".v-select__selections .v-btn__content").click({ force: true });
    cy.contains(this.NewKitItemData.KitName + " has been saved").should(
      "be.visible"
    );
    cy.log(this.NewKitItemData.KitName + "Kit Type has been Saved");
    //close the Kit Item
    //Close Kit type
    cy.get(".subheader--button-icon-wrapper path").click({
      force: true,
    });
    cy.log(this.NewKitItemData.KitName + "Kit item has been Close");
  });
});
