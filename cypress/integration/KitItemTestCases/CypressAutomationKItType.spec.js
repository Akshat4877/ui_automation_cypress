import LoginPage from "../PageObject/LoginPage";
import KitTypePage from "../PageObject/KitTypePage";

describe("Basic Test Case for Element interaction for common area DT", function () {
  this.beforeAll(function () {
    // cy.viewport(1280, 720);
    const lp = new LoginPage();
    lp.visit();
    lp.EnterEmail("kstanley@commonareas.work.dev");
    lp.EnterPassword("1234567Aa");
    lp.Submit();

    Cypress.Cookies.preserveOnce(
      ".AspNet.ApplicationCookie",
      "ASP.NET_SessionId",
      "ca-cf-auth",
      "kit-detail-selected-tab",
      "jwt"
    );

  });

  this.beforeEach("KitType Data", function () {
    cy.fixture("KitTypeTestData/CypressAutomation").then(function (data) {
      this.Kit = data;
    });

    cy.fixture("KitBuilderTestData/NewKitTypeData").then(function (KitTypeData) {
      this.KitTypeData = KitTypeData;
    });

    cy.fixture("KitTypeTestData/KitTtypeDataElements").then(function (
      KitDataEle
    ) {
      this.KitData = KitDataEle;
    });
  });

  it.only("Kit Type Open", function () {
    //cy.wait(5000)
    const lp = new LoginPage();
    const KTP = new KitTypePage();
    //Assertion
    cy.title().should("eq", "Common Areas");
    lp.PlusIcon();
    //debugger;
    //Click on To open Kit Type
    KTP.SearchKitType(this.Kit.KitName);
    KTP.OpenKitType(this.Kit.KitName);
    //Assertion
    cy.contains("New Item created").should("be.visible");
    cy.log("New Item created and Kit Type has been Opened");
  });

  it.only('Time and Date',function(){
    //Time
    cy.get('[placeholder="Zip/Postal Code"]').scrollIntoView({ force: true });
    cy.wait(3000);

    cy.get('[placeholder="Add Time"]').first().click({force:true})
    

    cy.get('#inspire > div:nth-child(1) > div > div > div.v-picker__body.theme--light > div > div.v-time-picker-clock.v-time-picker-clock--indeterminate.theme--light > div > span:nth-child(5)')
    .first().click({force:true})

    cy.wait(5000)

    cy.get('#inspire > div:nth-child(1) > div > div > div.v-picker__body.theme--light > div > div.v-time-picker-clock.v-time-picker-clock--indeterminate.theme--light > div > span:nth-child(5)')
    .last().click({force:true})

    
    //Click on OK
    cy.get('.btnBorder:nth-child(1) > .v-btn__content').click({force:true})

   



    
  })

  it('Date',function(){

    //Date

    cy.get('[placeholder="Add Date"]').first().click({force:true})
    cy.get('tr:nth-child(2) > td:nth-child(5) .v-btn__content').click({force:true})
    cy.get('.dateActions > .btnBorder:nth-child(1) > .v-btn__content').click({force:true})

  })

  it("Url Data Type", function () {
    cy.get('[name="Url"]').type(this.KitData.Url);
    cy.wait(1000);

  });

  it("Text Data Type", function () {
    cy.get('[name="Text"]').type(this.KitData.Text);
    cy.wait(1000);
  });

  it("File Data Type", function () {
    cy.get(".link-icon--green > path").click({ force: true });
    cy.wait(3000);
    cy.get(".thumb-container:nth-child(5) .selected-icon").click({
      force: true,
    });
    cy.get(
      ".container-search > .pop-up--header > .pop-up--header--right > .button-pop-ups--size > .v-btn__content"
    ).click({ force: true });
    cy.wait(1000);
  });

  it("Telephone Data Type", function () {
    cy.get('[name="Telephone"]').type(this.KitData.Telphone);
    cy.wait(1000);
  });

  it("TextAera Data Type", function () {
    cy.get('[name="TextAera"]').type(this.KitData.TextAera);
    cy.wait(1000);
  });

  it("Address Data Type", function () {
 
    cy.get('[placeholder="Address"]').type(this.KitData.Address);
    //Address count
    cy.get('[name="Address Cont."]').type(this.KitData.AddressCount);

    //Scrolling
    cy.get('[placeholder="Zip/Postal Code"]').scrollIntoView({ force: true });
    cy.wait(3000);

    //City
    cy.get('[placeholder="City"]').type(this.KitData.City);
    //State
    cy.get(
      "#inspire > div.v-dialog__content.v-dialog__content--active > div > div > div > div:nth-child(2) > div.new-kit-item.v-card.v-sheet.theme--light > div > div > div > div > div.row.kit-details-wrapper--content.pb-0 > div > div > div > div > div > div > div.tab--content.col > div > div > div.v-window-item.v-window-item--active > div > div > div.row.container-details > div.fill-height.col > div > div > div.kit-control-component.kit-control-check-list.kit-control-address.kit-control--no-fixed-height.pa-3.col.col-12.px-3 > div > div:nth-child(4) > div > div > div.v-input__slot > div.v-select__slot > div.v-input__append-inner > div"
    ).click({ force: true });
    cy.contains("Alaska").click({ force: true });
    //ZipCode
    cy.get('[placeholder="Zip/Postal Code"]').type(this.KitData.ZipCode);
    cy.wait(1000);
  });

  it("Number Data Type", function () {
    cy.get('[name="Number"]').scrollIntoView({ force: true });
    cy.wait(3000);
    cy.get('[name="Number"]').type(this.KitData.Number);
    cy.wait(1000);
  });

  it("Toggle Data type", function () {

    cy.get(".sync-switch .v-input--selection-controls__ripple").click({force:true});

  });


  it("SelectList Data type", function () {
    //Click on DropDown
    cy.get(
      "#inspire > div.v-dialog__content.v-dialog__content--active > div > div > div > div:nth-child(2) > div.new-kit-item.v-card.v-sheet.theme--light > div > div > div > div > div.row.kit-details-wrapper--content.pb-0 > div > div > div > div > div > div > div.tab--content.col > div > div > div.v-window-item.v-window-item--active > div > div > div.row.container-details > div.fill-height.col > div > div > div:nth-child(13) > div > div > div.v-input__slot > div.v-select__slot > div.v-input__append-inner > div"
    ).click({ force: true });

    cy.contains("Value2").click({ force: true });
  });

  it("Radio CheckBox Data type", function () {

    cy.contains("Value22").click({ force: true })

  });

  it("CheckBoxSelect Data type", function () {
    
    cy.contains("Value222").click({ force: true });
    cy.contains("Value333").click({ force: true });
    cy.contains("Value444").click({ force: true });
    cy.contains("Value111").click({ force: true });

    cy.wait(5000)

    //save
    cy.get('.v-select__selections .v-btn__content').click({force:true});
    //close 
    cy.wait(5000)
    cy.get('.subheader--button-icon-wrapper .inline-svg').click({force:true});
    
  });

  it("Stepper Data Element", function () {

    cy.contains('Stepper').scrollIntoView({ force: true });
    cy.get('.v-stepper__step:nth-child(5) > .v-stepper__step__step').click({ force: true });

  });

  it('One To Many Relation Data Element',function(){


    cy.contains('NEW ITEM').scrollIntoView({ force: true });

    cy.contains('NEW ITEM').first().click({ force: true });
    //Assertion
   cy.contains("New Item created").should("be.visible");


  })

  it('New Item Kit(Related New Kit Type)',function(){

    cy.get('[name="Name"]').type(this.KitData.Text)

    cy.get('[name="Url"]').first().type(this.KitData.Url)


  })

  it('Save Related New Kit Type',function(){

    
    
    //Click on Save
    cy.get(".v-select__selections > .v-btn").first().click({force:true});
    cy.log("Kit item has been saved");
    //Click on Close the kit item
    cy.get(".subheader--button-icon-wrapper .inline-svg").last().click({force:true});

    cy.contains('Discard').click({force:true});



  })


  it('Square Card Data Element',function(){

    cy.contains('NEW ITEM').eq(2).click({ force: true });
    //Assertion
   cy.contains("New Item created").should("be.visible");

  })

  it('Square Card New Item Kit(Related New Kit Type)',function(){

    cy.get('[name="Name"]').type(this.KitData.Text)

    cy.get('[name="Url"]').first().type(this.KitData.Url)

    cy.wait(5000)
    
    




  })

  // it('Save Related New Kit Type',function(){

  //   //Click on Save
  //   cy.get(".v-select__selections > .v-btn").first().click({force:true});
  //   cy.log("Kit item has been saved");
  //   //Click on Close the kit item
  //   cy.get(".subheader--button-icon-wrapper .inline-svg").last().click({force:true});

  //   cy.contains('Discard').click({force:true});



  // })


  // it("Kit Item Saved", function () {
  //   cy.wait(5000)
  //   //Click on Save
  //   cy.get(".v-select__selections > .v-btn").click({force:true});
  //   cy.log("Kit item has been saved");
  //   //Click on Close the kit item
  //   cy.wait(5000)
  //   cy.get(".subheader--button-icon-wrapper .inline-svg").click({force:true});
  // });
});