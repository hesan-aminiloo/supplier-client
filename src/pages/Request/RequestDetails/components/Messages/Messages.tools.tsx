import { getRequestMessages, sendMessage } from '@src/app/endpoints';
import axios, { AxiosResponse } from 'axios';
import PusherSingleton from '@utils/pusher';
import { useStore } from 'zustand';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { coreStore } from '@src/store/core';
import { customFetcher } from '@src/utils';
import {
  ConversationStatus,
  GroupMessagesByDate,
  IMessage,
  MessageEvent,
  MessagesResponse,
  PostMessageResponse,
  PusherMessage,
} from './Messages.types';

export function convertMessages(
  messages: IMessage[],
  initialData: GroupMessagesByDate[],
  userId?: number
): GroupMessagesByDate[] {
  const groupMessagesByDates: GroupMessagesByDate[] = initialData;
  // Iterate over each message in the input
  messages?.forEach((message) => {
    const groupMessagesBySenderId = groupMessagesByDates.find(
      (group) => group.created_at.slice(0, 10) === message.created_at.slice(0, 10)
    );

    if (groupMessagesBySenderId) {
      const existingGroupLastMessage = groupMessagesBySenderId.messages[groupMessagesBySenderId.messages.length - 1];

      if (existingGroupLastMessage.user_id === message.user_id) {
        const existingGroupMessagesIds = existingGroupLastMessage.messages.map((msg) => msg.msg_id);
        if (!existingGroupMessagesIds.includes(message.msg_id)) {
          groupMessagesBySenderId.messages[groupMessagesBySenderId.messages.length - 1] = {
            ...existingGroupLastMessage,
            created_at: message.created_at,
            messages: [...existingGroupLastMessage.messages, message],
          };
        }
      } else {
        groupMessagesBySenderId.messages.push({
          created_at: message.created_at,
          user_id: message.user_id,
          type: message.user_id === userId ? 'sent' : 'received',
          account_id: message.account_id,
          msg_id: message.msg_id,
          account_logo: message.account_logo,
          is_request: message.is_request,
          request_id: message.request_id,
          request_account_id: message.request_account_id,
          username: message.username,
          first_name: message.first_name,
          last_name: message.last_name,
          messages: [message],
        });
      }
    } else {
      groupMessagesByDates.push({
        created_at: message.created_at,
        messages: [
          {
            ...message,
            messages: [message],
          },
        ],
      });
    }
  });
  return groupMessagesByDates;
}

const getMessages = (requestId: string, page: number, lastMessageId: string) => {
  return axios.get(getRequestMessages(requestId, page, lastMessageId));
};

export const useMessages = (requestId: string) => {
  return useInfiniteQuery(
    [`messages/${requestId}`],
    ({ pageParam }) => getMessages(requestId, pageParam?.page ?? 1, pageParam?.lastMessageId),
    {
      enabled: !!requestId,
      getNextPageParam: (response: AxiosResponse<MessagesResponse>) => {
        const { current_page, total_pages } = response.data.pagination;

        if (current_page === total_pages) return false;
        return {
          page: 1,
          lastMessageId: response.data.messages[response.data.messages.length - 1].msg_id,
        };
      },
    }
  );
};

const createMessage = (requestId: string, message: string) => {
  return customFetcher(sendMessage(requestId), {
    method: 'POST',
    body: JSON.stringify({
      message,
    }),
  });
};

export const useCreateMessage = (requestId: string) => {
  return useMutation(['create-message'], (message: string) => createMessage(requestId, message));
};

const isToday = (date: string) => {
  const today = moment();
  const dateToCheck = moment(date);

  return today.isSame(dateToCheck, 'day');
};

const isYesterday = (date: string) => {
  const yesterday = moment().subtract(1, 'day');
  const dateToCheck = moment(date);

  return yesterday.isSame(dateToCheck, 'day');
};

function isPastYearDate(date: string) {
  const currentYear = moment().year();
  const inputYear = moment(date).year();

  return inputYear < currentYear;
}

export const getGroupMessageDate = (date: string) => {
  if (isToday(date)) {
    return 'Today';
  }

  if (isYesterday(date)) {
    return 'Yesterday';
  }

  if (isPastYearDate(date)) {
    return moment(date).format('YYYY MMMM DD');
  }

  return moment(date).format('MMMM DD');
};

export const useRealTimeMessages = (requestId: string) => {
  const { user, token } = useStore(coreStore);
  const [realTimesMessages, setRealTimeMessages] = useState<GroupMessagesByDate[]>([]);
  const [conversationStatus, setConversationStatus] = useState<ConversationStatus>('empty');

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (token) {
      const pusher = PusherSingleton.getInstance(token);
      const channel = pusher?.subscribe(`private-channel-notify.${user?.room}`);
      channel.bind('App\\Events\\NotificationEvent', (event: MessageEvent) => {
        if (event.data.type === 'msg') {
          const message: PusherMessage = JSON.parse(event.data.data);
          if (message && message.request_id === Number(requestId)) {
            if (message.user_id !== user?.id) {
              setConversationStatus('hasNewMessages');
            }
            setRealTimeMessages((prevMessages) =>
              convertMessages(
                [
                  {
                    created_at: event.data.created_at,
                    user_id: message.user_id,
                    type: message.user_id === user?.id ? 'sent' : 'received',
                    msg_id: message.msg_id,
                    account_logo: message.account_logo,
                    account_id: message.account_id,
                    message: message.message,
                    request_id: message.request_id,
                    request_account_id: message.request_account_id,
                    username: message.username,
                    is_request: message.is_request,
                    first_name: message.first_name,
                    last_name: message.last_name,
                  },
                ],
                prevMessages,
                user?.id
              )
            );
          }
        }
      });
      return () => {
        pusher?.unsubscribe(`private-channel-notify.${user?.room})`);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const setSentMessage = (sentMessage: PostMessageResponse) => {
    setRealTimeMessages((prevMessages) =>
      convertMessages(
        [
          {
            created_at: sentMessage.created_at,
            user_id: sentMessage.user_id,
            type: 'sent',
            msg_id: sentMessage.msg_id,
            account_id: sentMessage.account_id,
            message: sentMessage.message,
            account_logo: '',
            request_id: sentMessage.request_id,
            request_account_id: sentMessage.request_account_id,
            username: user?.username ?? 'You',
            is_request: sentMessage.is_request,
            first_name: sentMessage.first_name,
            last_name: sentMessage.last_name,
          },
        ],
        prevMessages,
        user?.id
      )
    );
  };

  return {
    realTimesMessages,
    setRealTimeMessages,
    setSentMessage,
    conversationStatus,
    setConversationStatus,
  };
};
