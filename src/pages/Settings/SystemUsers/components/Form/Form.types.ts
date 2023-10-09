import { IconNames } from '@src/components';

export type FormInputNames =
  | 'firstName'
  | 'phone'
  | 'email'
  | 'role'
  | 'avatar'
  | 'lastName'
  | 'username'
  | 'password'
  | 'branch'
  | 'password_confirmation';

export type UserData = {
  firstName: string;
  phone: string;
  email: string;
  role: string;
  avatar: string;
  lastName: string;
  username: string;
  password: string;
  branch: number[];
  password_confirmation: string;
  addCustomersPermission: boolean;
};

export interface FormElementProps {
  label: string;
  LeftIcon: IconNames;
  name: FormInputNames;
  placeholder: string | undefined;
  component: any;
  options?: any;
}

export enum EnumRoles {
  ADMINISTRATORE = 'administrator',
  USER = 'user',
}
