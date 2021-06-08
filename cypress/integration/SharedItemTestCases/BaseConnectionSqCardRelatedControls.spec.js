import LoginPage from "../PageObject/LoginPage";
import SignUpPage from "../PageObject/SignUpPage";
import SanityLoginPage from "../PageObject/SanityLoginPage";


describe("Base Connection Shared Kit Item OneToMany Related Control Test Case", function () {
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

            //Globally fixtures for shared item test cases creads
            cy.fixture("LoginTestData/SharedUserCredentials").then(function (
            LogInScriptGloably
            ) {
            this.SharedCreds = LogInScriptGloably;
            });
            //Kit item id for sqaure card
            cy.fixture("SharedRelationKitItemIdData/SqCardItemId").then(function (ItemID) {
                this.KitItemId = ItemID;
            });

         /////////////////////////////////////////////////////////////////////////

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
    });

    it.only('Login TestCase',function(){
        const lp = new LoginPage();
        const slp = new SanityLoginPage();
        slp.BaseUrl(this.LoginCreds.BaseUrl)
        //Handling Alert
        cy.on("window:confirm", () => {
          cy.log("Alert has been Handled");
        });
        //Login Assertions
        cy.contains(" Log In ").should("be.visible");
        //Enter credentials
        lp.EnterEmail(this.SharedCreds.BaseConnection);
        lp.EnterPassword(this.LoginCreds.Password);
        lp.Submit();
        cy.log("User has been Logged In into the application");
        cy.wait(5000)
    })

    it.only('Click on Shared Kit Item', function () {
        cy.wait(2000)
        var id = this.KitItemId.ItemID.replace(' #', '# ')
        cy.log(id)
        cy.xpath('//*[contains(@class, "row collaboration-inbox__title")]//*[text()="' + id + '"]')
        .click({ force: true })
    })

    it.only('Open Square Card Related New in Shared View',function(){
        //Scrolling to square card
        cy.get(".px-2:nth-child(1) .inline-svg").scrollIntoView({ force: true });
        cy.wait(1000);
        //Click on square card kit item
        cy.get(".px-2:nth-child(1) .inline-svg").click({ force: true });
        cy.wait(1000);
        cy.contains(" Edit Item ").click({ force: true });
        cy.log("Related Edit form has been opened");
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

    


})

