import { PaginationResponse } from '@src/types';

export type NotificationItemProps = {
  id: number;
  avatar: string;
  title: string;
  time: string;
  isRead: boolean;
};

export enum NotificationTypesEnum {
  User = 'user',
  Request = 'request',
  Massege = 'msg',
  System = 'system',
}

export type UserNotificationType = 'add' | 'delete';

export type senderType = {
  account_name: string;
  request_id: number;
  account_logo: string;
  account_id: number;
  user_id: number;
};

export type NotificationDetailType = {
  user_id: number;
  status: string;
  request_id: number;
  username: string;
  type: string;
};
export type NotificationDataType = {
  data: NotificationDetailType;
  sender: senderType;
};

export type NotificationItemDTO = {
  id: number;
  data: NotificationDataType;
  created_at: string;
  updated_at: string;
  is_read: '0' | '1';
  type: NotificationTypesEnum;
};

export interface NotificationsResponse {
  notifies: {
    data: NotificationItemDTO[];
    pagination: PaginationResponse;
  };
}

export interface NotificationFilterData {
  isread?: number;
  page?: number;
}
