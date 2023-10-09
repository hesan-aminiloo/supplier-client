export interface Info {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

export interface Result {
  id: number;
  name: string;
  image: string;
  species: string;
}

export interface ResponseAPI {
  info: Info;
  results: Result[];
}

export interface ICreateGarageDrawer {
  isOpen: boolean;
  onClose: (needsReload?: boolean) => void;
}

export enum StepsEnum {
  CUSTOMER = 'customer',
  USER = 'user',
}

export type FormSteps = `${StepsEnum}`;

export interface IGarageItem {
  active: number;
  branch_name: string;
  id: number | string;
  logo?: string;
  name: string;
}

export interface IGaragePagination {
  count: number;
  current_page: number;
  last_page: number;
  links: unknown;
  next_page_url: string;
  per_page: number;
  query: { page: string; search?: string | null };
  total: number;
  total_pages: number;
}

export type GarageCustomerListType = {
  garages: {
    data: Array<IGarageItem>;
    pagination: IGaragePagination;
  };
};

export interface IUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation?: string;
  role: string;
}

export interface IContactInfo {
  phone: string;
  email: string;
  address: string;
  city: string;
  countryId: string | null;
  postCode: string;
}

export type ICreateGarageResponse = {
  message: string;
  errors?: Record<string, unknown>;
};

export type IGarageCustomerForm = {
  users: Array<IUser>;
  contact: IContactInfo;
  name: string;
  branchId: string | number;
  logo?: File | null;
  step: StepsEnum;
};

export interface IGarageCustomerStore {
  user?: IUser;
  contact?: IContactInfo;
  setUser: (data: { user?: IUser }) => void;
  setContact: (data: { contact?: IContactInfo }) => void;
}

export interface GarageCustomersFilterProps {
  page: number;
  search: string;
  branchId: string;
  sort: string;
}
