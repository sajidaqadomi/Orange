import { ApiEmployeesHelper } from "../../../helpers/api-helpers";
import { GenericMethods } from "../../../helpers/generic-methods";

/**
 * Service for performing various employee-related operations, such as creating employees,
 * updating their job information, and managing employee salaries.
 */
export default class EmployeeService {
  /**
   * Creates a new employee with random data.
   * @returns A Promise that resolves with the created employee data.
   */
  static createEmployee() {
    // Load employee data from a fixture and access the "addEmployeeData" property.
    return cy
      .fixture("employees-data")
      .its("addEmployeeData")
      .then((employeeData: any) => {
        employeeData.employeeId = `${GenericMethods.randomNumberFromInterval(
          1,
          100
        )}`;
        employeeData.firstName = GenericMethods.randomString(
          employeeData.firstName
        );

        // Call the API
        return ApiEmployeesHelper.addEmployee(employeeData);
      });
  }

  /**
   * Updates an employee's job with the provided location and job title.
   * @param empNumber - The employee's unique identification number.
   * @param locationId - The ID of the employee's location.
   * @param jobTitleId - The ID of the employee's job title.
   * @returns A Promise that resolves when the employee's job is successfully updated.
   */

  static updateEmployeeJob(
    empNumber: number,
    locationId: number,
    jobTitleId: number
  ) {
    // Call the API
    return ApiEmployeesHelper.updatEmployeeJob(empNumber, {
      locationId,
      jobTitleId,
    });
  }

  /**
   * Adds salary data for a specific employee.
   * @param empNumber - The employee's unique identification number.
   * @returns A Promise that resolves with the added employee salary data.
   */
  static addEmployeeSalary(empNumber: number) {
    // Load employee salary data from a fixture and access the "addEmployeeSalaryData" property.
    return cy
      .fixture("employees-data")
      .its("addEmployeeSalaryData")
      .then((salaryData: any) => {
        // Call the API to add the employee salary using the provided data.
        return ApiEmployeesHelper.addEmployeeSalary(empNumber, salaryData);
      });
  }

  /**
   * Creates an employee with login details.
   *
   * @returns A Promise that resolves with the created employee data including login details.
   */
  static createEmployeeWithLoginDetails() {
    return cy
      .fixture("employees-data")
      .its("employeeWithLoginData")
      .then((employeeData: any) => {
        employeeData.username = GenericMethods.randomString(
          employeeData.username
        );

        this.createEmployee().then((employeeRes) => {
          const { empNumber } = employeeRes.data;
          employeeData.empNumber = empNumber;
        });

        // Call the API
        return ApiEmployeesHelper.addEmployeeLoginDetails(employeeData);
      });
  }
}
