import { FormDropDown, FormInput, IconNames } from '@src/components';
import { ICountriesList } from '@src/store/core';

export const enum WorkingDaysEnums {
  MON = 'Mon',
  TUE = 'Tue',
  WED = 'Wed',
  THU = 'Thu',
  FRI = 'Fri',
  SAT = 'Sat',
  SUN = 'Sun',
}

export type WorkingHoursType = {
  [key in WorkingDaysEnums]?: { start: string; finish: string };
};

export type BranchFormValuesTypes = {
  email: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  postCode: string;
  countryId: string;
  active: boolean;
  workingHours: Array<WorkingHoursType>;
};

export type FormInputNames = 'name' | 'phone' | 'email' | 'address' | 'city' | 'postCode' | 'countryId' | 'logo';

export type CompanyDataType = {
  [key in FormInputNames]: string;
};

export type OptionItemType = {
  label: string;
  value: string;
};

export interface FormElement {
  type: string;
  label: string;
  name: FormInputNames;
  placeholder?: string;
  leftIcon: IconNames;
  rightIcon?: IconNames;
  options?: ICountriesList;
  component: typeof FormInput | typeof FormDropDown;
}

export interface BranchItemType {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postCode: string;
  countryId: string;
  active: boolean;
  isDeleted: boolean;
  workingHours: [];
}

export type CompanyInfoReqType = {
  name: string;
  logo: File;
  contact: Record<string, string>;
};

export interface SupplierContactType {
  address: string;
  city: string;
  countryId: number | string;
  email: string;
  phone: string;
  postCode: string;
  active: boolean;
}

export type SupplierInfoResType = {
  branches: BranchItemType[] | [];
  contact: SupplierContactType;
  logo: string | File;
  name: string;
};

export type UpdateCompanyInfoDataType = {
  name: string;
  address: string;
  city: string;
  countryId: string;
  email: string;
  logo: File;
  phone: string;
  postCode: string;
  active: boolean;
};
