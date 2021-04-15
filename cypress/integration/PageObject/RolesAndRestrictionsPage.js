class RolesAndRestrictionsPage {

  RolesAndRestrictionsPage() {
    cy.contains('Roles and Restrictions').click({ force: true })
  }

  RoleName(RoleName) {
    cy.xpath('//div[@class="row d-flex"]//div[@class="v-text-field__slot"]//input').eq(0)
      .type(RoleName)
  }

  RoleDescription(RoleDescription) {
    cy.xpath('//div[@class="row d-flex"]//div[@class="v-text-field__slot"]//input').eq(1)
      .type(RoleDescription)
    cy.wait(1000)
  }

  SerachUser(UserName) {
    cy.xpath('//div[@class="row searchTermInput"]//div[@class="v-text-field__slot"]//input')
      .click({ force: true })
    cy.wait(1000)
    //Enter user Name
    cy.xpath('//div[@class="row searchTermInput"]//div[@class="v-text-field__slot"]//input')
      .type(`${UserName}{enter}`)
    cy.wait(3000)
  }

  UserToggle() {
    cy.get('.v-input--hide-details .v-input--selection-controls__ripple')
      .click({ force: true })
    cy.wait(1000)
    //pop text assertion
    cy.contains('This action will remove user from currently assigned role, Do you really want to select?')
      .should('be.visible')
    cy.wait(1000)
    //Click on Yes
    cy.xpath('//*[text()="Yes"]').click({ force: true })
    cy.wait(1000)
  }

  clickToProceed() {
    cy.xpath('//*[text()=" Proceed "]').click({ force: true })
    cy.contains('Role saved successfully').should('be.visible')
    cy.wait(1000)
    cy.contains('Configure Restriction').should('be.visible')
    cy.wait(1000)
    cy.xpath('//*[text()=" Create "]').click({ force: true })
  }

  clickOnKitType(){
    cy.xpath('//span[text()="Kit Types"]').click({force:true})
    cy.wait(1000)
  }


}

export default RolesAndRestrictionsPage;
