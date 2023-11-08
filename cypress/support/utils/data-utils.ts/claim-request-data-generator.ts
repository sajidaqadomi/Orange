import { ECalimActions } from "../../enums/claim-emums";
import { IClaimRequestData } from "../../types/claim-request-data-interface";
import { ClaimService, EmployeeService, LoginService } from "./data-services";

/**
 * A utility class for generating claim request data for testing purposes.
 */
class ClaimRequestDataGenerator {
  /**
   * Prepares claim request data by creating various service, including claim events,
   * expenses, employees, and their associated details.
   *
   * @returns  A Promise that resolves with the generated claim request data.
   */
  static preparetClaimRequestData() {
    let claimData: IClaimRequestData = {} as IClaimRequestData;

    // Log in to the application as admin.
    LoginService.login();

    // Create a claim event and assign its ID to claimData.
    ClaimService.createClaimEvent().then((claimEventRes) => {
      const claimEventId = claimEventRes.data.id;
      claimData.claimEventId = claimEventId;
    });

    // Create a claim expense and assign its ID to claimData.
    ClaimService.createClaimExpense().then((claimExpenseRes) => {
      const claimExpenseId = claimExpenseRes.data.id;
      claimData.claimExpenseId = claimExpenseId;
    });

    // Create an employee with login details and associate it with claimData.
    EmployeeService.createEmployeeWithLoginDetails()
      .then((empDetails) => {
        const { userName } = empDetails.data;
        const { empNumber } = empDetails.data.employee;

        claimData.empNumber = empNumber;

        // Log out and log back in as the employee.
        cy.Logout();
        LoginService.loginAsEmployee(userName);
      })
      .then(() => {
        const claimEventId = claimData.claimEventId;

        // Create a claim by the employee and assign its details to claimData.
        ClaimService.createClaimByEmployee(claimEventId)
          .then((createClaimRes) => {
            const { id, referenceId } = createClaimRes.data;

            claimData.claimReferenceId = referenceId;
            claimData.claimId = id;

            return cy.wrap(id);
          })
          .then((claimID) => {
            const claimExpenseId = claimData.claimExpenseId;

            // Assign the expense to the claim request and update the action.
            ClaimService.assignExpenseToClaimRequest(
              claimID,
              claimExpenseId
            ).then((assignExpenseToClaimRes) => {
              const { amount, date } = assignExpenseToClaimRes.data;

              claimData.claimDate = date;
              claimData.claimAmount = amount.toFixed(2);
            });
            ClaimService.updateClaimActionReq(claimID, ECalimActions.SUBMIT);
          });
      });

    // log out and log back in as an admin to ensure the claim action flows correctly
    cy.Logout();
    LoginService.login();

    return cy.wrap(claimData);
  }
}

export default ClaimRequestDataGenerator;
