export interface ICreateEmployeeReq {
  firstName: string;
  middleName: string;
  lastName: string;
  employeeId: string;
  empPicture: any;
}
export interface IUpdateEmpolyeeJobReq {
  empStatusId?: number;
  jobCategoryId?: number;
  jobTitleId?: number;
  joinedDate?: string | null;
  locationId?: number;
  subunitId?: number;
}

export interface IAddEmployeeSalaryReq {
  salaryComponent: string;
  salaryAmount: string;
  currencyId: string;
  comment: string | null;
  addDirectDeposit: boolean;
}

export interface IAddEmployeeLoginDetailsReq {
  empNumber: number;
  password: string;
  status: boolean;
  userRoleId: number;
  username: string;
}
