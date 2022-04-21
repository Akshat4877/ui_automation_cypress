class KitBuilder {
  
  ClickOnKitBuilder() {
    const btn = cy.contains("Kit Builder");
    btn.click();
  }

  ClickOnCreateNewKit() {
    const btn = cy.contains(' Create New ');
    btn.click();
  }

  ClickOnNewForm() {
    const btn = cy.get(
      ".col:nth-child(1) .detail-view-block:nth-child(1) .v-icon:nth-child(1)"
    );
    btn.click();
  }

  ClickOnEditForm() {
    const btn = cy.get(
      ".col:nth-child(1) > .v-responsive:nth-child(1) .v-icon:nth-child(1)"
    );
    btn.click({ force: true });
  }

  ClickOnSharedForm() {
    const btn = cy.get(
      ".col:nth-child(1) > .v-responsive:nth-child(1) .v-icon:nth-child(1)"
    );
    btn.click();
  }

  ClickOnEmailForm() {
    const btn = cy.get(
      ".col:nth-child(1) > .v-responsive:nth-child(1) .v-icon:nth-child(1)"
    );
    btn.click();
  }

  ClickOnMapForm() {
    const btn = cy.get(
      ".col:nth-child(1) > .v-responsive:nth-child(1) .v-icon:nth-child(1)"
    );
    btn.click();
  }

  ClickOnScheduleForm() {
    const btn = cy.get(
      ".col:nth-child(1) > .v-responsive:nth-child(1) .v-icon:nth-child(1)"
    );
    btn.click();
  }

  ClickOnCommonPlanForm() {
    const btn = cy.get(
      ".col:nth-child(1) > .v-responsive:nth-child(1) .v-icon:nth-child(1)"
    );
    btn.click();
  }

  ClickOnRelatedNewForm() {
    const btn = cy.get(
      ".col:nth-child(1) > .v-responsive:nth-child(1) .v-icon:nth-child(1)"
    );
    btn.click();
  }

  ClickOnRelatedEditForm() {
    const btn = cy.get(
      ".col:nth-child(2) > .v-responsive:nth-child(1) .v-icon:nth-child(1)"
    );
    btn.click();
  }

  ClickOnOfflineViewForm() {
    const btn = cy.get(
      ".col:nth-child(3) > .v-responsive:nth-child(1) .v-icon:nth-child(1)"
    );
    btn.click();
  }

  ClickOnRoutineViewForm() {
    const btn = cy.get(
      ".px-1:nth-child(3) .v-icon:nth-child(1)"
    );
    btn.click();
  }

  //ListViews

  ClickOnRoutineList() {
    const btn = cy.get(".col:nth-child(1) .list-view-block:nth-child(1) .v-icon:nth-child(1)");
    btn.click();
  }

  ClickOnSharedItemList() {
    const btn = cy.get(
      ".col:nth-child(2) .list-view-block:nth-child(1) .v-icon:nth-child(1)"
    );
    btn.click();
  }

  ClickOnTimelineList() {
    const btn = cy.get(
      ".col:nth-child(3) .list-view-block:nth-child(1) .v-icon:nth-child(1)"
    );
    btn.click();
  }


  ClickOnTableList() {
    const btn = cy.get(
      ".col:nth-child(4) .list-view-block:nth-child(1) .v-icon:nth-child(1)"
    );
    btn.click();
  }

  ClickOnSearchList() {
    const btn = cy.get(".col:nth-child(5) .list-view-block:nth-child(1) .v-icon:nth-child(1)");
    btn.click();
  }


  KBSearchBox(KitTypeName) {
    cy.get('.v-text-field__slot').click().type(KitTypeName);
  }


  ClickOnCrossIcon() {
    const btn = cy.xpath(
      "//button[@class='v-btn v-btn--fab v-btn--flat v-btn--icon v-btn--round v-btn--text theme--light v-size--default']//i[@class='v-icon notranslate material-icons theme--light'][contains(text(),'close')]"
    );
    btn.click({ force: true });
  }

  



}

export default KitBuilder;
