export interface ICreateClaimEventsReq {
  name: string;
  description: string;
  status: boolean;
}

export interface ICreateClaimExpenseReq {
  name: string;
  description: string;
  status: boolean;
}

export interface ICreateCalimRequest {
  claimEventId: number;
  currencyId: string;
  remarks: string | null;
}

export interface IAddExpenseToClaimReq {
  expenseTypeId: number;
  date: string;
  amount: string;
  note: string | null;
}

export interface IUpdateClaimActionReq {
  action: string;
}
