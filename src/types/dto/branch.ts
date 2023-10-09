export interface BranchData {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postCode: string;
  countryId: number;
  totalGarages: number;
  id: number;
}

export interface Data {
  branch: BranchData;
  message: string;
}

export interface IAddBranchResponseDto extends Data {}
