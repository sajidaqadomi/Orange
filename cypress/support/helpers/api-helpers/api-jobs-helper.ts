import {
  IAddJobTitleReq,
  IDeleteJobTitleReq,
} from "../../api-interfaces/payloads/admin/job";
import {
  IAddJobTitleRes,
  IDeleteJobTitleRes,
} from "../../api-interfaces/responses/admin/job";
import { EAPIMethods } from "../../enums/api-enum";

/**
 * URLs for job-related API endpoints.
 */
const URLs = {
  jobTitle: () => "/api/v2/admin/job-titles",
  jobCategories: () => "api/v2/admin/job-categories",
};

/**
 * Class for interacting with job-related API endpoints.
 */
class Jobs {
  static addJobTitle(data: IAddJobTitleReq) {
    return cy.APIRequest<IAddJobTitleReq, IAddJobTitleRes>(
      EAPIMethods.POST,
      URLs.jobTitle(),
      data
    );
  }

  static deleteJobTitle(data: IDeleteJobTitleReq) {
    return cy.APIRequest<IDeleteJobTitleReq, IDeleteJobTitleRes>(
      EAPIMethods.DELETE,
      URLs.jobTitle(),
      data
    );
  }
}

export default Jobs;
