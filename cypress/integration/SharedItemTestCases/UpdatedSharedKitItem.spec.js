import LoginPage from "../PageObject/LoginPage";
import SanityLoginPage from "../PageObject/SanityLoginPage";

describe("Shared Kit Item Updation Test Case for Internal User", function () {
    this.beforeAll(function () {
        const lp = new LoginPage();
        const slp = new SanityLoginPage();

        slp.nvdTest()
        //slp.TmProd()
        //Handling Alert
        cy.on("window:confirm", () => {
            cy.log("Alert has been Handled");
        });

        //Login Assertions
        cy.contains(" Log In ").should("be.visible");
        //Enter credentials
        lp.EnterEmail("maintenancedirector@nvdlp.com.dev");
        //lp.EnterEmail("kat@armyspy.com");
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

        cy.fixture("SanityPackTestData/UpdateKItItemData").then(function (
            UpDateKitItemSDTCData
        ) {
            this.UpdateKitItemData = UpDateKitItemSDTCData;
        });

        // cy.fixture("SanityPackTestData(Prod)/UpdateKItItemData(Prod)").then(
        //     function (UpDateKitItemSDTCData) {
        //         this.UpdateKitItemData = UpDateKitItemSDTCData;
        //     }
        // );

        cy.fixture("VerificationTestCasesData/KitBuilderDataTypes2").then(function (
            NewDataForElements
        ) {
            this.DataType2 = NewDataForElements;
        });

        // cy.fixture("SanityPackTestData(Prod)/KitBuilderDataTypes2(Prod)").then(
        //     function (NewDataForElements) {
        //         this.DataType2 = NewDataForElements;
        //     }
        // );

        cy.fixture("SanityPackTestData/NewKitItemTabsData").then(function (
            SanityTCData
        ) {
            this.SData = SanityTCData;
        });

        // cy.fixture("SanityPackTestData(Prod)/NewKitItemTabsData(Prod)").then(
        //     function (SanityTCData) {
        //         this.SData = SanityTCData;
        //     }
        // );

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////

        cy.fixture("SanityPackTestData2/KitItemId").then(function (ItemID) {
            this.KitItemId = ItemID;
        });

        cy.fixture("KitBuilderTestData/FormViewsNameData").then(function (
            KitTypeFormViewsNames
        ) {
            this.ViewName = KitTypeFormViewsNames;
        });
    });


    it.only('Click on Shared Kit Item to External Connection', function () {
        cy.wait(2000)
        //Adding coma() in kit item id
        var id = this.KitItemId.ItemID.replace(' ', ', ')
        cy.log(id)
        cy.xpath('//*[contains(@class, "v-list-item__subtitle truncate")]//*[text()="' + id + '"]')
            .click({ force: true })
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
        cy.get('[name="TextAera"]').eq(1).should("have.value", this.UpdateKitItemData.TextAera)
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
        cy.get('[placeholder="Street address, building, company ... "]').scrollIntoView({ force: true })
        //Validating details view input data
        cy.get('[placeholder="Street address, building, company ... "]')
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
        cy.get('[placeholder="Zip/Postal Code"]').scrollIntoView({ force: true })
        //Validating details view input data
        cy.get('[placeholder="Zip/Postal Code"]')
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
        cy.get('[placeholder=" MM / DD / YYYY"]')
            .should("have.value", this.UpdateKitItemData.LoggedDate)
    })

    it.only("Toggle Element data Validation", function () {
        cy.xpath('//div[@class="pl-3 col"]//div[@class="v-input--selection-controls__input"]//input')
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
        //CheckboxSelect2
        cy.get('[type="checkbox"]').eq(2).should('be.checked')
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

    it.only('Assigning Element data Validation', function () {
        var assigning = this.DataType2.Assigning.toLowerCase();
        cy.get('.v-btn:nth-child(1) .v-badge > .inline-svg').scrollIntoView({ force: true })
        //json value assertion
        cy.xpath('//div[@controlname="' + assigning + '"]//div[@class="item-label col"]').children('div').invoke('text')
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

    it.only('Close details view', function () {
        cy.wait(1000)
        //Close Kit type
        cy.get(".subheader--button-icon-wrapper .inline-svg").click({
            force: true,
        });
    })
})