import { IAddLocationsRes } from "../../../api-interfaces/responses/admin/organization";
import { ApiOrganizationHelper } from "../../../helpers/api-helpers";
import { GenericMethods } from "../../../helpers/generic-methods";

/**
 * Service for location-related operations.
 * This service provides methods for creating and managing locations.
 */
export default class LocationService {
  /**
   * Creates a new location with random data.
   * @returns {Cypress.Chainable<IAddLocationsRes>} A Promise that resolves with the created location data.
   */
  static createLocation(): Cypress.Chainable<IAddLocationsRes> {
    // Load organization data from a fixture and access the "addLocationsData" property.
    return cy
      .fixture("organization-data")
      .its("addLocationsData")
      .then((addLocationsData) => {
        addLocationsData.name = GenericMethods.randomString(
          addLocationsData.name
        );

        // Call the API to add the location using the provided data.
        return ApiOrganizationHelper.addLocation(addLocationsData);
      });
  }
}
