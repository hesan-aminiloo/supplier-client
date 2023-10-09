import { PaginationResponse } from '@src/types';

export interface IMessage {
  type: 'sent' | 'received';
  msg_id: number;
  account_id: number;
  created_at: string;
  is_request: '1' | '0';
  account_logo: string;
  message: string;
  request_account_id: number;
  request_id: number;
  user_id: number;
  username: string;
  first_name: string;
  last_name: string;
}

export interface ConversationMessage {
  type: 'sent' | 'received';
  msg_id: number;
  user_id: number;
  created_at: string;
  account_id: number;
  is_request: '1' | '0';
  account_logo: string;
  request_account_id: number;
  username: string;
  request_id: number;
  first_name: string;
  last_name: string;
  messages: IMessage[];
}

export interface GroupMessagesByDate {
  created_at: string;
  messages: ConversationMessage[];
}

export interface PostMessageResponse {
  created_at: string;
  msg_id: number;
  is_request: '1' | '0';
  account_id: number;
  message: string;
  request_id: number;
  request_account_id: number;
  updated_at: string;
  user_id: number;
  first_name: string;
  last_name: string;
}

export interface MessagesProps {
  requestId: string;
  realTimesMessages: GroupMessagesByDate[];
  setSentMessage: (sentMessage: PostMessageResponse) => void;
}

export interface MessagesResponse {
  messages: IMessage[];
  pagination: PaginationResponse;
}

export interface PusherMessage {
  request_id: number;
  user_id: number;
  msg_id: number;
  account_id: number;
  request_account_id: number;
  account_logo: string;
  account_name: string;
  created_at: string;
  message: string;
  username: string;
  is_request: '1' | '0';
  first_name: string;
  last_name: string;
}

export interface MessageEvent {
  data: {
    data: string;
    created_at: string;
    type: 'msg';
    user_id: number;
  };
}

export type ConversationStatus = 'empty' | 'hasMessages' | 'hasNewMessages';
