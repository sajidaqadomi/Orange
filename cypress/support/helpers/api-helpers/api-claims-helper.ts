import {
  IAddExpenseToClaimReq,
  ICreateCalimRequest,
  ICreateClaimEventsReq,
  ICreateClaimExpenseReq,
  IUpdateClaimActionReq,
} from "./../../api-interfaces/payloads/claim/claim";

import { EAPIMethods } from "../../enums/api-enum";
import {
  IAddExpenseToClaimRes,
  ICreateCalimRequestRes,
  ICreateClaimEventsRes,
  ICreateClaimExpenseRes,
  IUpdateClaimActionRes,
} from "../../api-interfaces/responses/claim/claim";
import { ISharedDeleteRes } from "../../api-interfaces/responses/shared-reponse";
import { ISharedDeleteReq } from "./../../api-interfaces/payloads/shared-payloads";


/**
 * URLs for claim-related API endpoints.
 */
const URLs = {
  claimEvent: () => "/api/v2/claim/events",
  claimExpense: () => "/api/v2/claim/expenses/types",
  claimRequest: () => "/api/v2/claim/requests",
  assignEexpensesToClim: (claimNumber: number) =>
    `/api/v2/claim/requests/${claimNumber}/expenses`,
  claimAction: (claimNumber: number) =>
    `/api/v2/claim/requests/${claimNumber}/action`,
};

/**
 * Class for interacting with Claims API endpoints.
 */
class Claims {
  static createClaimEvent(data: ICreateClaimEventsReq) {
    return cy.APIRequest<ICreateClaimEventsReq, ICreateClaimEventsRes>(
      EAPIMethods.POST,
      URLs.claimEvent(),
      data
    );
  }

  static deleteClaimEvent(data: ISharedDeleteReq) {
    return cy.APIRequest<ISharedDeleteReq, ISharedDeleteRes>(
      EAPIMethods.DELETE,
      URLs.claimEvent(),
      data
    );
  }

  static createClaimByEmployee(data: ICreateCalimRequest) {
    return cy.APIRequest<ICreateCalimRequest, ICreateCalimRequestRes>(
      EAPIMethods.POST,
      URLs.claimRequest(),
      data
    );
  }

  static createClaimExpense(data: ICreateClaimExpenseReq) {
    return cy.APIRequest<ICreateClaimExpenseReq, ICreateClaimExpenseRes>(
      EAPIMethods.POST,
      URLs.claimExpense(),
      data
    );
  }

  static deleteClaimExpense(data: ISharedDeleteReq) {
    return cy.APIRequest<ISharedDeleteReq, ISharedDeleteRes>(
      EAPIMethods.DELETE,
      URLs.claimExpense(),
      data
    );
  }

  static assignExpenseToClaimRequest(
    claimNumber: number,
    data: IAddExpenseToClaimReq
  ) {
    return cy.APIRequest<IAddExpenseToClaimReq, IAddExpenseToClaimRes>(
      EAPIMethods.POST,
      URLs.assignEexpensesToClim(claimNumber),
      data
    );
  }

  static updateClaimActionReq(
    cliamNumber: number,
    data: IUpdateClaimActionReq
  ) {
    return cy.APIRequest<IUpdateClaimActionReq, IUpdateClaimActionRes>(
      EAPIMethods.PUT,
      URLs.claimAction(cliamNumber),
      data
    );
  }
}
export default Claims;
