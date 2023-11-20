export interface ICreateEmployeeRes {
  data: {
    empNumber: number;
    lastName: string;
    firstName: string;
    middleName: string;
    employeeId: string;
    terminationId: any;
  };
  meta: any[];
  rels: any[];
}

export interface IDeleteEmployeeRes {
  data: number[];
  meta: any[];
  rels: any[];
}

export interface IUpdateEmpolyeeJobRes {
  data: {
    empNumber: string;
    joinedDate: any;
    jobTitle: {
      id: number;
      title: string;
      isDeleted: boolean;
    };
    jobSpecificationAttachment: {
      id: any;
      filename: string;
    };
    empStatus: {
      id: number | null;
      name: string | null;
    };
    jobCategory: {
      id: string | null;
      name: null;
    };
    subunit: {
      id: number;
      name: string;
      unitId: number;
    };
    location: {
      id: number;
      name: string;
    };
    employeeTerminationRecord: {
      id: number | null;
      date: any;
    };
  };
  meta: any[];
  rels: any[];
}

interface ICurrencyType {
  id: null | string;
  name: null | string;
}

interface IDirectDebit {
  id: null | number;
  routingNumber: null | number;
  account: any;
  amount: null | number;
  accountType: null | string;
}

export interface IAddEmployeeSalaryRes {
  data: {
    id: number;
    amount: string;
    salaryName: string;
    comment: null;
    payPeriod: ICurrencyType;
    payGrade: ICurrencyType;
    currencyType: ICurrencyType;
    directDebit: IDirectDebit;
  };
  meta: {
    empNumber: number;
  };
  rels: any[];
}

export interface IAddEmployeeLoginDetailsRes {
  data: {
    id: number;
    userName: string;
    deleted: boolean;
    status: boolean;
    employee: {
      empNumber: number;
      employeeId: number;
      firstName: string;
      middleName: string;
      lastName: string;
      terminationId: any;
    };
    userRole: {
      id: number;
      name: string;
      displayName: string;
    };
  };
  meta: any[];
  rels: any[];
}

export interface IDeleteEmployeeRes {
  data: number[];
  meta: any[];
  rels: any[];
}
