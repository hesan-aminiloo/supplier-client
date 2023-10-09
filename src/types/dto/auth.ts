import { ICountriesList } from '@src/store/core';
import { Permissions } from '@src/types/dto/permissions';

export interface IBranchItem {
  id: number | string;
  name: string;
}

export interface IUserAccount {
  logo?: string;
  name: string;
}
export interface IUser {
  account: IUserAccount;
  id: number;
  accountId: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
  phone: string;
  avatar: string | File | null;
  active: number;
  branch: IBranchItem[];
  room: string;
  isDeviceInterest: number;
  addCustomersPermission: boolean;
}

export interface ILoginDto {
  user: IUser;
  token: string;
  countries: ICountriesList;
  permissions: Permissions;
}

export interface IResetDto {
  message: string;
}

export interface INewPasswordDto {
  message: string;
}
