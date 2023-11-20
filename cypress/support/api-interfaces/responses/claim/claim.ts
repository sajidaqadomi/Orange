export interface ICreateClaimEventsRes {
  data: {
    id: number;
    name: string;
    description: string;
    status: boolean;
  };
  meta: [];
  rels: [];
}

export interface ICreateClaimExpenseRes {
  data: {
    id: number;
    name: string;
    description: string;
    status: boolean;
  };
  meta: [];
  rels: [];
}

export interface ICreateCalimRequestRes {
  data: {
    id: number;
    referenceId: string;
    claimEvent: {
      id: number;
      name: string;
      status: boolean;
      isDeleted: boolean;
    };
    currencyType: {
      id: string;
      name: string;
    };
    remarks: string | null;
    status: string;
  };
  meta: any[];
  rels: any[];
}

export interface IAddExpenseToClaimRes {
  data: {
    id: 25;
    expenseType: {
      id: 3;
      name: string;
      status: boolean;
      isDeleted: boolean;
    };
    amount: number;
    note: string | null;
    date: string;
  };
  meta: any[];
  rels: any[];
}

export interface IUpdateClaimActionRes {
  data: {
    id: 50;
    referenceId: string;
    claimEvent: {
      id: 1;
      name: string;
      status: boolean;
      isDeleted: boolean;
    };
    currencyType: {
      id: string;
      name: string;
    };
    remarks: string | null;
    status: string;
  };
  meta: any[];
  rels: any[];
}
