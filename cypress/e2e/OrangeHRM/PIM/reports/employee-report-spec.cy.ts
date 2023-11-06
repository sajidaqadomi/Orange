import { IReportData } from "../../../../support/types/employee-report-data-interface";
import { EmployeeReportGenerator } from "../../../../support/utils/data-utils.ts/employee-report-generator";
import { NavigationPath } from "../../../../support/enums/ui-routes-enums";

import {
  ApiEmployeesHelper,
  ApiJobsHelper,
  ApiOrganizationHelper,
} from "../../../../support/helpers/api-helpers";
import {
  AddReportPage,
  ViewReportsPage,
} from "../../../../support/page-objects";

const viewReportsPage: ViewReportsPage = new ViewReportsPage();
const addReportPage: AddReportPage = new AddReportPage();

let reportData: IReportData = {} as IReportData;

describe("Generate an Employee report", () => {
  beforeEach(() => {
    EmployeeReportGenerator.prepareEmployeesReportData(3).then((data) => {
      reportData = data;
    });

    cy.visit(NavigationPath.PIM);
    cy.visit(NavigationPath.viewReports);
  });

  afterEach(() => {
    const { employeeIds } = reportData.employeeReportData;

    ApiJobsHelper.deleteJobTitle({
      ids: [reportData.employeeReportData.job.id],
    });
    ApiOrganizationHelper.deleteLocation({
      ids: [reportData.employeeReportData.location.id],
    });

    ApiEmployeesHelper.deleteEmployee({ ids: employeeIds });
  });

  it("The employee report should have a valid name, headers and rows of data that matched with added ones.", () => {
    viewReportsPage.clickAddNewReport();
    addReportPage.addReport(reportData);
  });
});
