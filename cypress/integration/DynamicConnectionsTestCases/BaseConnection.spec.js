import SanityLoginPage from "../PageObject/SanityLoginPage";
import LoginPage from "../PageObject/LoginPage";
import RandomString from "../PageObject/RandomString";

//Global Variable
let UserData;
let UserEmailID;
let UserFirstName;
let UserLastName;
//Randomly Generated UserData coming from PageObject(RandomString Class)
const Rs = new RandomString();
UserData = Rs.getRandomUser();
UserEmailID = UserData.Useremail;
UserFirstName = UserData.UserFirstName;
UserLastName = UserData.UserLastName;

describe("Sign up for a New User", function () {
  this.beforeAll(() => {
    debugger;
    //Creating Dynamic Json file at RumTime for Request TestCase
    cy.writeFile(
      "cypress/fixtures/ConnectionsDynamicTestData/BaseConnectionData.json",
      {
        Fname: UserFirstName,
        Lname: UserLastName,
        UserEmail: UserEmailID,
        Password: "1234567Aa",
      }
    );

    cy.log("Data has been write to json");
    cy.log(UserEmailID);
    cy.log(UserFirstName);
    cy.log(UserLastName);
  });

  this.beforeEach(
    "Getting the Dynmaically Generated data through Fixtures file",
    function () {
     
     //Globally fixtures for login creads
     cy.fixture("LoginTestData/GlobalLoginCreds").then(function (
     LogInScriptGloably
     ) {
     this.LoginCreds = LogInScriptGloably;
     });
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////

      //debugger;
      cy.fixture("ConnectionsDynamicTestData/BaseConnectionData").then(
        function (JsonData) {
          this.Credentials = JsonData;
          cy.log(this.Credentials.UserEmail);
          cy.log(this.Credentials.Fname);
          cy.log(this.Credentials.Lname);
        }
      );
    }
  );

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

  it.only("Create A new Conneciton", function () {
     //Page Object  
     const lp = new LoginPage();
     lp.PlusIcon();
     lp.ConnectionIcon();
     cy.wait(2000);
     //Connection Custom Commands coming from commands.js
     cy.ConnectionFirstName(this.Credentials.Fname);
     cy.ConnectionLastName(this.Credentials.Lname);
     cy.ConnectionEmail(this.Credentials.UserEmail);
     //click on DropDown(This DropDown feature has be removed from this connection module)
     cy.get(
      "#inspire > div.v-dialog__content.v-dialog__content--active > div > div > div > div.row.position-relative.contact-detail-wrapper.md11.fill-height.new-connection > div.base-layout-main-content.d-flex.pa-0.px-8.py-4.col > div.row.wrapper-content.new-connection.py-6 > div > div.v-input.theme--light.v-text-field.v-text-field--is-booted.v-text-field--enclosed.v-text-field--outlined.v-select.v-select--chips.v-select--is-multi > div > div.v-input__slot > div.v-select__slot > div.v-input__append-inner > div"
     ).click({ force: true });
     //Click on group
     cy.wait(1000)
     cy.get('.v-list-item:nth-child(1) .v-input--selection-controls__ripple')
     .click({force:true});
     cy.wait(3000)
     //Click on Save btn
     cy.get(".button-pop-ups--size").click();
     cy.log("Connection Request has been sent successfully");
     cy.wait(2000);
    });

    it.only('Open Connections from Left Panel',function(){
        //Page Object
        const lp = new LoginPage();
        //Click on Hamburger Icon
        lp.HMBIcon();
        cy.wait(1000);
        //Click on Connections
       cy.get(".v-list-item:nth-child(3) .v-list-item__title")
       .first().click({force: true});
       cy.wait(2000)
       
    })

    it.only('Validate New Connection',function(){
        //Page Object
        const lp = new LoginPage();
        //Click on Filter Icon
        lp.FilterIcon();
        cy.wait(1000)
        cy.xpath('//div[@class="v-input theme--light v-text-field v-text-field--is-booted v-text-field--enclosed v-text-field--outlined"]//div[@class="v-input__control"]//div[@class="v-text-field__slot"]//input')
        .click({force:true}).type(this.Credentials.UserEmail)
        cy.wait(1000)
        //Click on apply
        cy.xpath('//*[text()=" Apply "]').click({force:true})
        cy.get('.chip-first-span').should('exist')


    })

 
});