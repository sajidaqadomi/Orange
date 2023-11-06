export interface ICreateEmployeeReq {
  firstName: string;
  middleName: string;
  lastName: string;
  employeeId: string;
  empPicture: any;
}

export interface IDeleteEmployeeReq {
  ids: number[];
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
