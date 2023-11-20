type IEmployee = {
  firstName: string;
  jobTitle: string;
  salaryAmount: string;
};

type ISharedJobLocation = {
  title: string;
  id: number;
};

export interface IEmployeeReportData {
  job: ISharedJobLocation;
  location: ISharedJobLocation;
  employeeIds: number[];
  employees: IEmployee[];
}

export interface IAddReportData {
  selectionCriteria: {
    "Job Title": string;
    Location: string;
  };

  displayFields: {
    Personal: string;
    Job: string;
    Salary: string;
  };

  reportName: string;
}

export interface IReportData {
  employeeReportData: IEmployeeReportData;
  addReportData: IAddReportData;
}
