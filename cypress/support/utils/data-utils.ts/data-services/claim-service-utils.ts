import { ECalimActions } from "../../../enums/claim-emums";
import { EDateOption } from "../../../enums/date-enum";
import { ApilCaimsHelper } from "../../../helpers/api-helpers";
import { GenericMethods } from "../../../helpers/generic-methods";

/**
 * Service for handling various operations related to claims, such as creating claim events,
 * expenses, and updating claim actions.
 */
export default class ClaimService {
  /**
   * Creates a claim event with random data.
   *
   * @returns A Promise that resolves with the created claim event data.
   */
  static createClaimEvent() {
    return cy
      .fixture("claim-data")
      .its("claimEvent")
      .then((claimEvent) => {
        claimEvent.name = GenericMethods.randomString(claimEvent.name);

        // Call the API
        return ApilCaimsHelper.createClaimEvent(claimEvent);
      });
  }

  /**
   * Creates a claim expense with random data.
   *
   * @returns A Promise that resolves with the created claim expense data.
   */
  static createClaimExpense() {
    return cy
      .fixture("claim-data")
      .its("claimExpense")
      .then((claimExpense) => {
        claimExpense.name = GenericMethods.randomString(claimExpense.name);

        // Call the API
        return ApilCaimsHelper.createClaimExpense(claimExpense);
      });
  }

  /**
   * Creates a claim by an employee associated with a specific claim event.
   *
   * @param {number} claimEventId - The ID of the associated claim event.
   * @returns  A Promise that resolves with the created claim data.
   */
  static createClaimByEmployee(claimEventId: number) {
    return cy
      .fixture("claim-data")
      .its("calimRequest")
      .then((calimRequest) => {
        calimRequest.claimEventId = claimEventId;

        // Call the API
        return ApilCaimsHelper.createClaimByEmployee(calimRequest);
      });
  }

  /**
   * Assigns an expense to a claim request.
   *
   * @param {number} claimNumber - The claim request number.
   * @param {number} claimexpenseTypeId - The ID of the expense type to assign.
   * @returns A Promise that resolves when the expense is successfully assigned.
   */
  static assignExpenseToClaimRequest(
    claimNumber: number,
    claimexpenseTypeId: number
  ) {
    return cy
      .fixture("claim-data")
      .its("assignExpenseToClaim")
      .then((assignExpenseToClaimInfo) => {
        assignExpenseToClaimInfo.expenseTypeId = claimexpenseTypeId;
        assignExpenseToClaimInfo.date = GenericMethods.getDateInFormat(
          EDateOption.PAST,
          2
        );
        assignExpenseToClaimInfo.amount =
          (+assignExpenseToClaimInfo.amount).toFixed(2);

        // Call the API
        return ApilCaimsHelper.assignExpenseToClaimRequest(
          claimNumber,
          assignExpenseToClaimInfo
        );
      });
  }

  /**
   * Updates the action of a claim request.
   *
   * @param {number} claimNumber - The claim request number.
   * @param {ECalimActions} action - The action to be updated (e.g., 'SUBMIT').
   * @returns  A Promise that resolves when the claim action is successfully updated.
   */
  static updateClaimActionReq(cliamNumber: number, action: ECalimActions) {
    return cy
      .fixture("claim-data")
      .its("claimAction")
      .then((claimActionInfo) => {
        claimActionInfo.action = action;

        // Call the API
        return ApilCaimsHelper.updateClaimActionReq(
          cliamNumber,
          claimActionInfo
        );
      });
  }
}
