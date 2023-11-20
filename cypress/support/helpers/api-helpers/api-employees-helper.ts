import {
  IAddEmployeeLoginDetailsReq,
  IAddEmployeeSalaryReq,
  ICreateEmployeeReq,
  IUpdateEmpolyeeJobReq,
} from "../../api-interfaces/payloads/pim/employee";
import { ISharedDeleteReq } from "../../api-interfaces/payloads/shared-payloads";
import {
  IAddEmployeeLoginDetailsRes,
  IAddEmployeeSalaryRes,
  ICreateEmployeeRes,
  IUpdateEmpolyeeJobRes,
} from "../../api-interfaces/responses/pim/employee";
import { ISharedDeleteRes } from "../../api-interfaces/responses/shared-reponse";
import { EAPIMethods } from "../../enums/api-enum";

/**
 * URLs for employee-related API endpoints.
 */
const URLS = {
  userUrl: () => "/api/v2/pim/employees",
  updateJopUrl: (empNumber: number) =>
    `/api/v2/pim/employees/${empNumber}/job-details`,
  addSalaryUrl: (employeeNumber: number) =>
    `/api/v2/pim/employees/${employeeNumber}/salary-components`,
  userWithLoginDetailUrl: () => "/api/v2/admin/users",
};

/**
 * Class for interacting with employee-related API endpoints.
 */
class Employees {
  static addEmployee(data: ICreateEmployeeReq) {
    return cy.APIRequest<ICreateEmployeeReq, ICreateEmployeeRes>(
      EAPIMethods.POST,
      URLS.userUrl(),
      data
    );
  }

  static deleteEmployee(data: ISharedDeleteReq) {
    return cy.APIRequest<ISharedDeleteReq, ISharedDeleteRes>(
      EAPIMethods.DELETE,
      URLS.userUrl(),
      data
    );
  }

  static updatEmployeeJob(empNumber: number, data: IUpdateEmpolyeeJobReq) {
    return cy.APIRequest<IUpdateEmpolyeeJobReq, IUpdateEmpolyeeJobRes>(
      EAPIMethods.PUT,
      URLS.updateJopUrl(empNumber),
      data
    );
  }

  static addEmployeeSalary(empNumber: number, data: IAddEmployeeSalaryReq) {
    return cy.APIRequest<IUpdateEmpolyeeJobReq, IAddEmployeeSalaryRes>(
      EAPIMethods.POST,
      URLS.addSalaryUrl(empNumber),
      data
    );
  }

  static addEmployeeLoginDetails(data: IAddEmployeeLoginDetailsReq) {
    return cy.APIRequest<
      IAddEmployeeLoginDetailsReq,
      IAddEmployeeLoginDetailsRes
    >(EAPIMethods.POST, URLS.userWithLoginDetailUrl(), data);
  }
}

export default Employees;
