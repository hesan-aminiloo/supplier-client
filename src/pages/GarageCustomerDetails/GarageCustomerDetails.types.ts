import { BadgeProps, ButtonColors, IconNames, IconProps } from '@src/components';
import { ReactNode } from 'react';
import { IGarageMonthlyIncome, IGarageOverallRevenue } from '@src/types';

type iconLabelValueType = {
  label: string;
  value: string;
  icon: IconNames;
};

type monthsType = {
  month: string;
  quotes: string | number;
  orders: string | number;
  sale: string | number;
  rate: { value: string | number; isGreen?: boolean };
};

export type GarageCardPropsI = {
  data: {
    logo: string;
    garageName: string;
    branch: string;
  };
};

export type GarageContactInfoStructureType = iconLabelValueType[];
export type GarageContactInfoPropsI = {
  data: {
    phone: string;
    email: string;
    address: string;
    postCode: string;
  };
};

export type GarageContactsStructureType = {
  id: number;
  name: string;
  icon: IconNames;
  actions: {
    id: string;
    label?: string;
    icon?: IconNames;
    color: ButtonColors;
    fullWidth?: boolean;
    onClick: () => void;
  }[];
}[];
export type GarageContactsPropsI = {
  data: { id: number; name: string }[];
};

export type StatisticsHeaderType = iconLabelValueType[];
export type StatisticsMonthsType = monthsType[];

export type StatisticsPropsI = {
  title: string;
  totalOrders: string;
  totalQuotes: string;
  totalIncome: string;
  overalRevenue: IGarageOverallRevenue[];
  monthlyIncome: IGarageMonthlyIncome[];
  monthlyIncomeYear: number;
  setMonthlyIncomeYear: (value: number) => void;
};
export interface GarageStatsCardProps {
  iconProps: IconProps;
  badgeProps: BadgeProps;
  title: string;
  value: string | number | ReactNode;
  className?: string;
  preFix?: string;
  formatter?: Function;
  dataKey: 'totalIncome' | 'totalOrders' | 'totalQuotes';
}

export type UserDetailsDrawerProps = {
  isOpen: boolean;
  onClose: (needsReload?: boolean) => void;
  userId: number;
  garageId: string;
  email: string;
  username: string;
  phone: string;
  status: number;
  device_name: string | null;
  firstLogin: string | 'Never';
  lastLogin: string | null;
  location: string | null;
};

export type fieldNames = 'userName' | 'phone' | 'email' | 'current_password' | 'password' | 'password_confirmation';

export interface FormElement {
  name: fieldNames;
  label: string;
  placeholder: string;
  leftIcon: IconNames;
  disabled?: boolean;
}

export type SubmitDataType = {
  userName: string;
  phone: string;
  email: string;
  current_password: string;
};

export type GarageContactUserType = {
  id: number;
  name: string;
  phone: string;
  phoneModel: string;
  email: string;
  status: string;
  address: string;
  lastLog: string;
  firstLog: string;
  statistics: StatisticsMonthsType;
};

export type GetGarageContactUserResponseType = {
  data: GarageContactUserType;
};

export interface IGarageContact {
  phone: string;
  email: string;
  address: string;
  city: string;
  postCode: string;
  countryId: string | number;
}

export interface IGarageUser {
  id: number | string;
  username: string;
  avatar: string | null;
  email: string;
  phone: string;
  status: number;
  role: string;
  device_name: string | null;
  firstLogin: string | 'Never';
  lastLogin: string | null;
  location: string | null;
}

export type GarageDetailsObjectType = {
  branch: string;
  id: number | string;
  logo: string;
  name: string;
  users: Array<IGarageUser> | [];
  contact: IGarageContact;
  totalOrders: number | string;
  totalIncome: number | string;
  totalQuotes: number | string;
  overalRevenue: IGarageOverallRevenue[];
  monthlyIncome: IGarageMonthlyIncome[];
};
