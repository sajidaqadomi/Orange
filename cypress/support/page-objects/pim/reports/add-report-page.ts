import {
  ReportTableHelper,
  SelectOptions,
  TextInput,
  ToastMessage,
} from "../../../common-helper";
import { EAPIMethods } from "../../../enums/api-enum";
import { EToastMessages } from "../../../enums/toast-message-enums";
import { IReportData } from "../../../types/employee-report-data-interface";

class AddReportPage {
  elements = {
    addSelectionCriteriaBtn: () =>
      cy
        .contains(".oxd-form-row", "Selection Criteria")
        .find(".orangehrm-report-icon"),

    addDisplayFieldsBtn: () =>
      cy
        .contains(".oxd-form-row", "Display Fields")
        .find(".orangehrm-report-icon"),

    selectDisplayFieldParent: () =>
      cy
        .contains(".oxd-form-row", "Display Fields")
        .find(".orangehrm-report-criteria"),

    includeHeaderCheckboxes: () =>
      cy.get(".orangehrm-report-field").find("input[type='checkbox']"),

    saveReportBtn: () => cy.get("button[type='submit']"),
  };

  /**
   * Click the "Save Report" button to save the report.
   */
  clickSaveReportBtn() {
    this.elements.saveReportBtn().click();
  }

  /**
   * Click the "Add Selection Criteria" button to add a new selection criteria.
   */
  clickAddSelectionCriteria() {
    this.elements.addSelectionCriteriaBtn().click();
  }

  /**
   * Select a value for a given selection criteria.
   * @param {string} key - The key of the criteria.
   * @param {string} value - The value to select for the criteria.
   */
  selectCriteriaValue(key: string, value: string) {
    cy.contains(".orangehrm-report-criteria", key)
      .next()
      .within(() => {
        SelectOptions.select("", value);
      });
  }

  /**
   * Select a key for the selection criteria.
   * @param {string} key - The key to select for the criteria.
   */
  selectCriteriaKey(key: string) {
    SelectOptions.select("Selection Criteria", key);
  }

  /**
   * Add selection criteria to the report.
   * @param {object} selectionCriteria - An object representing selection criteria.
   */
  addSelectionCriteria(selectionCriteria: object) {
    const keyValueCriteriaArray = Object.entries(selectionCriteria);

    for (const [key, value] of keyValueCriteriaArray) {
      this.selectCriteriaKey(key);
      this.clickAddSelectionCriteria();
      this.selectCriteriaValue(key, value);
    }
  }

  selectDisplayFieldKey(key: string) {
    SelectOptions.select("Select Display Field Group", key);
  }

  /**
   * Select a value for the display fields.
   * @param {string} value - The value to select for display fields.
   */
  selectDisplayFieldValue(value: string) {
    this.elements.selectDisplayFieldParent().within(() => {
      SelectOptions.select("Select Display Field", value);
    });
  }

  /**
   * Click the "Add Display Fields" button to add new display fields.
   */
  clickAddDisplayFields() {
    this.elements.addDisplayFieldsBtn().click();
  }

  /**
   * Add display fields to the report.
   * @param {object} displayFields - An object representing display fields.
   */
  addDisplayFields(displayFields: object) {
    const keyValueCriteriaArray = Object.entries(displayFields);

    for (const [key, value] of keyValueCriteriaArray) {
      this.selectDisplayFieldKey(key);
      this.selectDisplayFieldValue(value);
      this.clickAddDisplayFields();
    }
  }

  /**
   * Check the "Include Headers" checkboxes.
   */
  checkIncludeHeaders() {
    this.elements.includeHeaderCheckboxes().check({ force: true });
  }

  /**
   * Wait for and intercept the API call to get report data.
   */
  waitGetReportData() {
    cy.intercept(
      EAPIMethods.GET,
      "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/reports/data?**"
    ).as("getReportData");

    return cy.wait("@getReportData");
  }

  /**
   * Verify the report data based on the provided report data.
   * @param {IReportData} reportData - The report data to verify.
   */
  verifyReportDat(reportData: IReportData) {
    const { displayFields, reportName } = reportData.addReportData;
    const { employees } = reportData.employeeReportData;
    const upperHeader = Object.keys(displayFields);
    const lowerHeader = Object.values(displayFields);
    const rows = employees;
    ReportTableHelper.verifyReport(reportName, upperHeader, lowerHeader, rows);
  }

  /**
   * Add a report using the provided report data.
   * @param {IReportData} reportData - The report data to use for creating the report.
   */
  addReport(reportData: IReportData) {
    const { reportName, selectionCriteria, displayFields } =
      reportData.addReportData;
    TextInput.type("Report Name", reportName);
    this.addSelectionCriteria(selectionCriteria);
    this.addDisplayFields(displayFields);
    this.checkIncludeHeaders();
    this.clickSaveReportBtn();
  }

  /**
   * Validate report data.
   * @param {IReportData} reportData - The report data to use for validate.
   */
  validateReport(reportData: IReportData) {
    ToastMessage.verifyToastMessage(EToastMessages.SUCCESS);
    this.waitGetReportData().then(() => {
      this.verifyReportDat(reportData);
    });
  }
}

export default AddReportPage;
