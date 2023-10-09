/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { coreStore } from '@src/store/core';
import axios, { AxiosResponse } from 'axios';
import { customFetcher, errorToast, LOGOUT_PAGE_PATH } from '@src/utils';
import { useInfiniteQuery } from '@tanstack/react-query';
import { SITE_CONFIGS } from '@src/configs';
import {
  changeStatusNotificationEndPoint,
  deletNotificationEndPoint,
  getAllNotificationsEndPoint,
  readAllNotification,
} from '@src/app/endpoints';
import { useStore } from 'zustand';
import PusherSingleton from '@src/utils/pusher';
import pusherJs from 'pusher-js';
import { NotificationFilterData, NotificationsResponse } from './Notifications.types';

const getNotifications = (filters: NotificationFilterData) => {
  const token = coreStore.getState().token || '';
  return axios(`${SITE_CONFIGS.BASE_API_URL}${getAllNotificationsEndPoint}`, {
    method: 'GET',
    params: {
      ...filters,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useNotifiaction = (isread?: number) =>
  useInfiniteQuery(['notification', isread], ({ pageParam = 1 }) => getNotifications({ isread, page: pageParam }), {
    getNextPageParam: (response: AxiosResponse<NotificationsResponse>) => {
      const { pagination } = response.data.notifies;
      const currentPage = pagination.current_page;
      const { total } = pagination;
      const perPage = pagination.per_page;
      const totalPages = Math.ceil(total / perPage);
      if (currentPage === totalPages) return false;
      return currentPage + 1;
    },
  });

export const useActionNotification = () => {
  const [loading, setLoading] = useState(false);
  const onChangeStatus = (notificationId: number, isRead: number, callback: () => void) => {
    setLoading(true);
    customFetcher(changeStatusNotificationEndPoint(notificationId, isRead), {
      method: 'GET',
    })
      .then(() => {
        callback();
        setLoading(false);
      })
      .catch((err) => {
        errorToast(err.message);
        setLoading(false);
      });
  };

  const onDelete = (notificationId: number, callback: () => void) => {
    setLoading(true);
    customFetcher(deletNotificationEndPoint(notificationId), { method: 'DELETE' })
      .then(() => {
        setLoading(false);
        callback();
      })
      .catch((err) => {
        setLoading(false);
        errorToast(err.message);
      });
  };

  const onReadall = (callback: () => void) => {
    setLoading(true);
    customFetcher(readAllNotification, { method: 'GET' })
      .then(() => {
        setLoading(false);
        callback();
      })
      .catch((err) => {
        setLoading(false);
        callback();
        errorToast(err.message);
      });
  };

  return {
    onChangeStatus,
    onDelete,
    onReadall,
    loading,
  };
};

type getNumberOfUnreadNotificationData = {
  notify_count: number;
};

export const useNumberOfNtification = () => {
  const { setNotifs, token, user } = useStore(coreStore);

  const getUnreadNotifications = () => {
    axios
      .get<getNumberOfUnreadNotificationData>('notifications/not-is-read')
      .then(({ data }) => {
        setNotifs(data.notify_count);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          window.location.replace(LOGOUT_PAGE_PATH);
        }
      });
  };

  useEffect(() => {
    if (token) {
      const pusher = PusherSingleton.getInstance(token);
      const channel = pusher?.subscribe(`private-channel-notify.${user?.room}`);
      channel?.bind('App\\Events\\NotificationEvent', () => {
        getUnreadNotifications();
      });
      pusherJs.logToConsole = true;
    }
  }, [token]);

  return {
    getUnreadNotifications,
  };
};
