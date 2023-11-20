import { GenericMethods } from "../../helpers/generic-methods";
import {
  IAddReportData,
  IReportData,
} from "../../types/employee-report-data-interface";
import {
  EmployeeService,
  JobTitleService,
  LocationService,
  LoginService,
} from "./data-services";

/**
 * EmployeeReportGenerator is responsible for generating employee report data
 * by making use of multiple services to request and structure the data.
 */
export class EmployeeReportGenerator {
  /**
   * Updates the add-report-data fixture with the provided job title and location.
   * @param jobTitle - The job title for the report.
   * @param location - The location for the report.
   * @returns A Promise that resolves with the updated report data.
   */

  static updateAddReportDataFixture(jobTitle: string, location: string) {
    return cy.fixture("add-report-data").then((reportData) => {
      reportData.selectionCriteria["Job Title"] = jobTitle;
      reportData.selectionCriteria["Location"] = location;
      reportData.reportName = GenericMethods.randomString(
        reportData.reportName
      );

      return cy.wrap(reportData);
    });
  }

  /**
   * Prepares employee report data by creating employees, job titles, and locations.
   * @param numberOfEmployee - The number of employees to include in the report.
   * @returns A Promise that resolves with the prepared report data.
   */

  static prepareEmployeesReportData(numberOfEmployee: number) {
    let reportData: IReportData = {
      addReportData: {} as IAddReportData,
      employeeReportData: {
        job: { title: "", id: 0 },
        location: { title: "", id: 0 },
        employees: [],
        employeeIds: [],
      },
    };

    // Login to the system
    LoginService.login();

    // Create a JobTitle and update the shared report object
    JobTitleService.createJobTitle().then((jobRes) => {
      let { id: jobTitleId, title } = jobRes.data;

      //add this job to shared report object
      reportData.employeeReportData.job = { id: jobTitleId, title };
    });

    // Create a Location and update the shared report object
    LocationService.createLocation()
      .then((locationRes) => {
        const { id: locationId, name } = locationRes.data;

        reportData.employeeReportData.location = {
          id: locationId,
          title: name,
        };
      })
      .then(() => {
        // Create a specified number of employees and associate them with the created location and job title
        const { id: jobTitleId, title: jobTitle } =
          reportData.employeeReportData.job;
        const { id: locationId, title: locationTitle } =
          reportData.employeeReportData.location;

        for (let index = 1; index <= numberOfEmployee; index++) {
          EmployeeService.createEmployee().then((employee) => {
            const { empNumber, firstName } = employee.data;

            // Update the employee's job with the created location and job title
            EmployeeService.updateEmployeeJob(
              empNumber,
              locationId,
              jobTitleId
            );

            // Add employee salary information to the report data
            EmployeeService.addEmployeeSalary(empNumber).then((empSalary) => {
              const { amount } = empSalary.data;

              // Create an employee object with relevant information
              const employeeData = {
                firstName: firstName,
                salaryAmount: amount,
                jobTitle,
              };

              reportData.employeeReportData.employees.push(employeeData);

              reportData.employeeReportData.employeeIds.push(empNumber);
            });
          });
        }

        return cy.wrap({ jobTitle, locationTitle });
      })
      .then((locationJopTitles) => {
        const { jobTitle, locationTitle } = locationJopTitles;

        // Update the add-report-data fixture with the job title and location
        this.updateAddReportDataFixture(jobTitle, locationTitle).then(
          (addReportData: any) => {
            reportData.addReportData = addReportData;
          }
        );
      });

    return cy.wrap(reportData);
  }
}
