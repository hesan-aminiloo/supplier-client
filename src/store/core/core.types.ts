// TODO: implement toast component
// import { ToastItemProps } from '@src/components';
import { IUser } from '@src/types';
import { ReactNode } from 'react';
import { Permissions } from '@src/types/dto/permissions';

export type ICountriesList = Array<Record<string, string | number>>;

export interface ICoreStore {
  user: IUser | null;
  token?: string;
  permissions: Permissions | null;
  countries?: ICountriesList;
  systemUser?: any;
  notifs?: any;
  setCountries: (data: ICountriesList) => void;
  setUser: (data: {
    user?: IUser;
    token?: string;
    permissions: Permissions | null;
    countries?: ICountriesList;
  }) => void;
  setSystemUser: (data: any) => void;
  setSystemUsersList: (data: any) => void;
  clearSystemUser: (data: any) => void;
  clearUser: () => void;
  setNotifs: (data: any) => void;
}

export interface ICoreProviderProps {
  children: ReactNode;
}
