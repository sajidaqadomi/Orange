import GridTableHelper from "../../common-helper/tables/grid-table-helper";
import { Employee_Claims_Map_Header } from "../../common-helper/tables/report-table-map-helper";
import { IEmployeesClaimRow } from "../../common-helper/tables/table-rows-interface";
import { ECalimActions, EClaimStatus } from "../../enums/claim-emums";
import { EDateOption } from "../../enums/date-enum";
import { NavigationPath } from "../../enums/ui-routes-enums";
import { GenericMethods } from "../../helpers/generic-methods";
import { IClaimRequestData } from "../../types/claim-request-data-interface";

class AssignClaimPage {
  elements = {
    rejectBtn: () => cy.contains("button", "Reject"),
    approveBtn: () => cy.contains("button", "Approve"),
  };

  /**
   * Click the action button (Approve or Reject).
   * @param action - The action to perform (ECalimActions.APPROVE or ECalimActions.REJECT).
   */
  clickActionButton(action: ECalimActions) {
    if (action === ECalimActions.APPROVE) {
      this.elements.approveBtn().click();
    } else if (action === ECalimActions.REJECT) {
      this.elements.rejectBtn().click();
    }
  }

  /**
   * Validates claim table rows based on the provided data.
   * @param data - Data to validate against claim table rows.
   */
  validateClaimsTablRows(data: IEmployeesClaimRow) {
    data;
    GridTableHelper.searchTable({ ...data }, Employee_Claims_Map_Header);
  }

  /**
   * Get the expected claim status after an action (Approve or Reject).
   * @param action - The action to be performed.
   * @returns The expected claim status (EClaimStatus).
   */
  getExpectedClaimStatus(action: ECalimActions) {
    let status: EClaimStatus = EClaimStatus.INITIATED;
    if (action === ECalimActions.APPROVE) {
      status = EClaimStatus.PAID;
    } else if (action === ECalimActions.REJECT) {
      status = EClaimStatus.REGECTED;
    }

    return status;
  }

  /**
   * Apply an action (Approve or Reject) to a claim and validate the changes in the claim table.
   * @param action - The action to be performed.
   * @param claimData - Data related to the claim.
   */
  performClaimActionAndValidateTable(
    action: ECalimActions,
    claimData: IClaimRequestData
  ) {
    const { claimReferenceId, claimAmount, claimId } = claimData;

    const expectedStatus = this.getExpectedClaimStatus(action);

    cy.visit(`${NavigationPath.ViewassignClaimById}/${claimId}`);
    this.clickActionButton(action);

    cy.visit(`${NavigationPath.ViewAllAssignClaim}`);
    this.validateClaimsTablRows({
      referenceId: claimReferenceId,
      amount: claimAmount,
      submittedDate: GenericMethods.getDateInFormat(EDateOption.NOW),
      status: expectedStatus,
    });
  }
}

export default AssignClaimPage;
