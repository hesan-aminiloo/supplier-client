/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import PopUp from '@src/components/pop-up/PopUp';
import Loading from '@components/Loading';
import { useStore } from 'zustand';
import { coreStore } from '@src/store/core';
import PusherSingleton from '@src/utils/pusher';
import Pusher from 'pusher-js';
import { OptionItemProps } from '@src/components/button-tabs';
import { SettingsHeader, ButtonTabs, Button } from '@src/components';
import NotificationCard from './NotificationCard';
import { TAB_OPTIONS } from './Notifications.constants';
import { useActionNotification, useNotifiaction, useNumberOfNtification } from './Notifications.tools';
import { NotificationFilterData } from './Notifications.types';
import { NotificationsSkeleton } from './Notifications.skeleton';
import NotificationEmptyState from './Notifications.empty';

const Notifications: React.FC = () => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<NotificationFilterData>();
  const { data, fetchNextPage, hasNextPage, isLoading, refetch } = useNotifiaction(filters?.isread);
  const { onDelete, loading, onChangeStatus, onReadall } = useActionNotification();
  const { getUnreadNotifications } = useNumberOfNtification();
  const [activeTab, setActiveTab] = useState<OptionItemProps>(TAB_OPTIONS[0]);
  const [notificationId, setNotificationId] = useState<number>();
  const [deletePopUp, setDeletePopUp] = useState({});
  const { user, token } = useStore(coreStore);
  const [isFetching, setIsfetching] = useState(false);

  const handleTabChange = (tabData: OptionItemProps) => {
    const unRead = tabData.id === 'unread';
    setActiveTab(tabData);
    if (unRead) {
      setFilters({ isread: 0 });
    } else {
      setFilters({});
    }
  };
  const notifications = useMemo(() => {
    const requestsPages = data?.pages.map((page) => page.data.notifies.data) ?? [];
    return requestsPages?.reduce((acc, curr) => {
      return acc.concat(curr);
    }, []);
  }, [data]);

  const dataLength = notifications.length;

  useEffect(() => {
    if (token) {
      const pusher = PusherSingleton.getInstance(token);
      const channel = pusher?.subscribe(`private-channel-notify.${user?.room}`);
      channel?.bind('App\\Events\\NotificationEvent', () => {
        refetch();
      });
      Pusher.logToConsole = true;
      return () => {
        pusher?.unsubscribe(`private-channel-notify.${user?.room})`);
      };
    }
  }, [token]);

  const handleDeleteNotification = () => {
    setIsfetching(true);
    onDelete(notificationId!, () => {
      setDeletePopUp({});
      refetch().then(() => {
        setIsfetching(false);
      });
      getUnreadNotifications();
    });
  };

  const showDeleteConfirmPopup = (id: number) => {
    setNotificationId(id);
    setDeletePopUp({
      isOpen: true,
      title: t('notifications.delete_notification'),
      description: t('notifications.delete_notification_description'),
    });
  };

  const changeStatusNotification = (id: number, isread: number) => {
    setIsfetching(true);
    onChangeStatus(id, isread, () => {
      refetch().then(() => {
        setIsfetching(false);
      });
      getUnreadNotifications();
    });
  };

  return (
    <>
      <SettingsHeader className="mb-8">{t('notifications.notifications')}</SettingsHeader>
      <div className="flex justify-between mb-12">
        <ButtonTabs
          itemsList={TAB_OPTIONS}
          activeTabId={activeTab.id}
          onChange={handleTabChange}
        />
        <Button
          variant="text"
          onClick={() =>
            onReadall(() => {
              refetch();
              getUnreadNotifications();
            })
          }
        >
          {t('notifications.all_read')}
        </Button>
      </div>
      {isLoading || loading || isFetching ? (
        <NotificationsSkeleton />
      ) : notifications.length ? (
        <div className="flex flex-col gap-y-4">
          <InfiniteScroll
            dataLength={dataLength}
            hasMore={!!hasNextPage}
            next={() => fetchNextPage?.()}
            loader={dataLength ? <Loading /> : ''}
            className="pb-20"
          >
            {notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                {...notification}
                onDelete={showDeleteConfirmPopup}
                onChangeStatus={changeStatusNotification}
              />
            ))}
          </InfiniteScroll>
        </div>
      ) : (
        <NotificationEmptyState />
      )}

      <PopUp
        {...deletePopUp}
        submit={handleDeleteNotification}
        onClose={() => setDeletePopUp({ isOpen: false })}
        isLoading={loading}
      />
    </>
  );
};

export default Notifications;
