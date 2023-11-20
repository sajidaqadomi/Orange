class ViewReportsPage {
  elements = {
    addReportBtn: () => cy.contains("button", "Add"),
  };

  clickAddNewReport() {
    this.elements.addReportBtn().click();
  }
}

export default ViewReportsPage;
