import { PaginationResponse } from '@src/types';
import { Dispatch, SetStateAction } from 'react';

export interface Branch {
  name: string;
  id: number;
}
export interface SystemUsersItem {
  id: number;
  role: string;
  email: string;
  phone: string;
  branch: Array<Branch>;
  lastName: string;
  firstName: string;
  status?: boolean;
  username?: string;
  avatar: File | string;
  active?: number;
}

export interface UserItemPropsI {
  user: SystemUsersItem;
  onDeleteMultipleUsers: (id: string) => void;
  className?: string;
  checkedUsersArray: string[];
  getSystemUsersList: () => void;
  branches: Array<Branch>;
}

export interface SystemUserAddDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete?: () => void;
  isEdit?: boolean;
  branches: Array<Branch>;
  formElements?: any;
  getSystemUsersList: () => void;
}
export interface SystemUserEditDrawerProps extends SystemUserAddDrawerProps {
  handleDeleteUser: (id: number) => void;
  user: SystemUsersItem;
  getSystemUsersList: () => void;
  setDeletePopupOpen: Dispatch<SetStateAction<boolean>>;
}

export type SystemUserItemDto = {
  id: number;
  accountId: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone: string;
  role: string;
  avatar: string;
  room: string;
  branch: Branch[];
  // temp
  username?: string;
  status?: boolean;
};

export type SystemUsersListDto = {
  users: Array<SystemUserItemDto>;
  pagination: PaginationResponse;
};
