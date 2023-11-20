import { LoginPage } from "../../../page-objects";

/**
 * Service for handling login operations.
 * This service provides methods for logging into the application.
 */
const loginPage: LoginPage = new LoginPage();

export default class LoginService {
  /**
   * Performs a login operation with valid user credentials.
   * @returns  A Promise that resolves when the login is successful.
   */
  static login() {
    cy.fixture("login-data").as("loginInfo");
    return cy
      .get("@loginInfo")
      .its("validUserNamePassword")
      .then(({ userName, password }) => {
        //Call The API
        return loginPage.login(userName, password);
      });
  }

  /**
   * Performs a login operation as an employee using the provided employee name.
   *
   * @param {string} employeeName - The employee's name for login.
   * @returns A Promise that resolves when the login as an employee is successful.
   */
  static loginAsEmployee(employeeName: string) {
    cy.fixture("employees-data").as("employeeInfo");
    return cy
      .get("@employeeInfo")
      .its("employeeWithLoginData")
      .then((employeeCredentials) => {
        employeeCredentials.username = employeeName;
        const { username, password } = employeeCredentials;
        //Call The API
        return loginPage.login(username, password);
      });
  }
}
