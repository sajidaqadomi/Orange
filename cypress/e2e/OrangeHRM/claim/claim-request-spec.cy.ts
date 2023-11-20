import { ECalimActions } from "../../../support/enums/claim-emums";
import {
  ApiEmployeesHelper,
  ApilCaimsHelper,
} from "../../../support/helpers/api-helpers";
import { AssignClaimPage } from "../../../support/page-objects";
import { IClaimRequestData } from "../../../support/types/claim-request-data-interface";
import ClaimRequestDataGenerator from "../../../support/utils/data-utils.ts/claim-request-data-generator";

const assignClaimPage: AssignClaimPage = new AssignClaimPage();
let claimData: IClaimRequestData = {} as IClaimRequestData;

describe("Claim Request", () => {
  beforeEach(() => {
    ClaimRequestDataGenerator.preparetClaimRequestData().then(
      (claimRequestData) => {
        claimData = claimRequestData;
      }
    );
  });

  afterEach(() => {
    const { empNumber, claimEventId, claimExpenseId } = claimData;

    ApiEmployeesHelper.deleteEmployee({ ids: [empNumber] });
    ApilCaimsHelper.deleteClaimEvent({ ids: [claimEventId] });
    ApilCaimsHelper.deleteClaimExpense({ ids: [claimExpenseId] });
  });

  it("The approved claim request should display a 'Paid' status, a valid amount value, and a date for its corresponding row in the Claims table.", () => {
    assignClaimPage.performClaimActionAndValidateTable(
      ECalimActions.APPROVE,
      claimData
    );
  });

  it("The rejected claim request should display a 'Reject' status, a valid amount value, and a date for its corresponding row in the Claims table", () => {
    assignClaimPage.performClaimActionAndValidateTable(
      ECalimActions.REJECT,
      claimData
    );
  });
});
