export interface IAddLocationsReq {
  name: string;
  countryCode: string;
  province: string;
  city: string;
  address: string;
  zipCode: string;
  phone: string;
  fax: string;
  note: string;
}

export interface IDeleteLocationReq {
  ids: number[];
}
