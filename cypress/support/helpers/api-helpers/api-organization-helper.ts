import {
  IAddLocationsReq,
  IDeleteLocationReq,
} from "../../api-interfaces/payloads/admin/organization";
import {
  IAddLocationsRes,
  IDeleteLocationeRes,
} from "../../api-interfaces/responses/admin/organization";
import { EAPIMethods } from "../../enums/api-enum";

/**
 * URLs for location-related API endpoints.
 */
const URLS = {
  locationUrl: () => "/api/v2/admin/locations",
};

/**
 * Class for interacting with organization-related API endpoints.
 */
class Organization {
  static addLocation(data: IAddLocationsReq) {
    return cy.APIRequest<IAddLocationsReq, IAddLocationsRes>(
      EAPIMethods.POST,
      URLS.locationUrl(),
      data
    );
  }

  static deleteLocation(data: IDeleteLocationReq) {
    return cy.APIRequest<IDeleteLocationReq, IDeleteLocationeRes>(
      EAPIMethods.DELETE,
      URLS.locationUrl(),
      data
    );
  }
}

export default Organization;
