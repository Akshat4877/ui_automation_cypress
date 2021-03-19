import LoginPage from "../PageObject/LoginPage";
import SanityLoginPage from "../PageObject/SanityLoginPage";

describe("Triggered Recurring KitItem Validation Test Case", function () {
    this.beforeAll(function () {
        // cy.viewport(1280, 720);
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
        //lp.EnterEmail("sam@armyspy.com");
        lp.EnterEmail("propertymanagement@commonareas.work.dev");
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

        cy.fixture("SanityPackTestData2/RecurringKitItemData").then(function (
            KitDataEle
        ) {
            this.NewKitItemData = KitDataEle;
        });

        // cy.fixture("SanityPackTestData(Prod)/RecurringKitItemData(Prod)").then(
        //   function (KitDataEle) {
        //     this.NewKitItemData = KitDataEle;
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

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    });

    it.only("Click on list view and select kit type to Validate", function () {
        const lp = new LoginPage();
        //Click on Hamburger Icon
        lp.HMBIcon();
        cy.contains(this.NewKitItemData.KitName).scrollIntoView({
            force: true,
        });
        cy.wait(2000)
        //scroll to Open KitType from left panel
        cy.contains(this.NewKitItemData.KitName).scrollIntoView({ force: true })
        //Open KitType from left panel
        cy.contains(this.NewKitItemData.KitName).click({
            force: true,
        });
        cy.wait(2000)
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
        cy.wait(3000)
    });

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
        //json value assertion
        cy.get('[placeholder="Add Time"][readonly="readonly"]').eq(1)
            .should("have.value", this.NewKitItemData.LoggedTime)
    })

    it.only('Date Element data Validation', function () {
        //json value assertion
        cy.get('[placeholder=" MM / DD / YYYY"]')
            .should("have.value", this.NewKitItemData.LoggedDate)
    })

    it.only("SelectList Element data Validation", function () {
        //json value assertion
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
        //json value assertion
        cy.get('[type="checkbox"]').eq(3).should('be.checked')
    });

    it.only('OneToMany Related Control Items Validation', function () {
        //scroll  
        cy.get(".ca-item").eq(0).scrollIntoView({ force: true });
        cy.wait(2000);
        cy.get(
            ".grid-body:nth-child(1) > td:nth-child(1) > .v-list-item__subtitle"
        ).should("exist");
        cy.get(
            ".grid-body:nth-child(2) > td:nth-child(1) > .v-list-item__subtitle"
        ).should("exist");
        cy.wait(1000)
        cy.contains('Total 2 items').should('be.visible')
    })

    it.only('Stepper Element data Validation', function () {
        //json value assertion
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
        //json value assertion
        cy.xpath('//div[@controlname="userSelector"]//div[@class="col item-label"]').children('div').invoke('text').then((text) => {
            expect(text.trim()).equal(this.NewKitItemData.UserSelectorName)
        });
    })

    it.only('OneToOne Related Control Items Validation', function () {
        cy.get(".last-updated:nth-child(2) > .v-icon").should("exist");
    })

    it.only('ContactSelector Element data Validation', function () {
        //json value assertion
        cy.xpath('//div[@controlname="contactSelector"]//div[@class="col item-label"]').children('div').invoke('text').then((text) => {
            expect(text.trim()).equal(this.NewKitItemData.ContactSelectorName)
        });
    })

    it.only('SquareCard Related Control Items Validation', function () {
        //scroll  
        cy.get(".ca-item").eq(3).scrollIntoView({ force: true });
        cy.wait(2000);
        cy.get(".px-2:nth-child(1) .inline-svg").should("exist");
        cy.get(".px-2:nth-child(2) .inline-svg").should("exist");
        cy.get('.kit-control-grid--footer__text').last().should('have.text', 'Total 2 items')
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
        //json value assertion
        var inspection = this.DataType2.InspectionName.toLowerCase();
        cy.xpath('//div[@controlname="' + inspection + '"]//div[@class="v-slide-group__content"]').children('span.v-chip--active')
            .invoke('text').then((text) => {
                expect(text.trim()).equal(this.NewKitItemData.InspectionValue)
            });
    });

    it.only('Icon Element data Validation', function () {
        //Validating details view input data
        //json value assertion
        cy.get('[placeholder="Label"]')
            .should("have.value", this.NewKitItemData.IconLabel)
    })

    it.only("Group tab data Validation in details view", function () {
        //Click on group
        cy.contains("Groups").click({ force: true });
        cy.contains(this.NewKitItemData.RecurringAddGroup).should("be.visible");
        cy.log("Added group exist");
    });

    it.only("Comments tab data Validation in details view", function () {
        cy.contains("Comments").click({ force: true });
        cy.wait(1000);
        cy.contains(this.NewKitItemData.RecurringAddComments).should("not.exist");
        cy.log("Created comments exist");

    });

    it.only("Time Entries tab data Validation in details view", function () {
        cy.contains("Time Entries").click({ force: true });
        cy.wait(2000);
        cy.get(".time-entry-author__name").should('not.exist');
        cy.get(".time-entry__description").should('not.exist');
        cy.get(".time-entry__hours").should('not.exist');
    });

    it.only("Contributors tab data Validation in details view", function () {
        cy.contains("Contributors").click({ force: true })
        cy.get(".contributor__name")
            .eq(0)
            .should("have.text", this.NewKitItemData.RecurringContributorsTab);

        // cy.get(".contributor__name")
        //     .eq(2)
        //     .should("have.text", this.NewKitItemData.AssigningName);
        // cy.log("Added Contributors exist");

    });

    it.only("Files tab data Validation in details view", function () {
        cy.contains("Files").click({ force: true });
        //cy.contains(this.NewKitItemData.NewFormLibFileName).should("be.visible");
        cy.contains(this.NewKitItemData.RecurringFilesTab).should("be.visible");
        cy.log("Uploaded files exist");
    });
});

