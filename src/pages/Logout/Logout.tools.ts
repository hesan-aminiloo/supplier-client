import { coreStore } from '@src/store/core';
import { useEffect } from 'react';
import { useStore } from 'zustand';
import { useNavigate } from 'react-router-dom';
import * as PusherPushNotifications from '@pusher/push-notifications-web';
import { HOME_PAGE_PATH } from '@src/utils';
import { deleteFromLocalStorage } from '@utils/storage';
import { SITE_CONFIGS } from '@src/configs';
import axios from 'axios';

export const useLogout = () => {
  const store = useStore(coreStore);
  const navigate = useNavigate();
  const disactiveDeviceInterect = () => {
    axios.get('pusher-beams/set/device-interest/0');
  };
  const RemoveDeviceFromPusher = (room: string) => {
    const beamsClient = new PusherPushNotifications.Client({
      instanceId: SITE_CONFIGS.INSTANCE_ID,
    });
    beamsClient
      .start()
      .then(() => beamsClient.removeDeviceInterest(room))
      .then(() => {
        disactiveDeviceInterect();
      });
  };

  useEffect(() => {
    RemoveDeviceFromPusher(store.user?.room ?? '');
    store.clearUser();
    deleteFromLocalStorage(SITE_CONFIGS.TOKEN_COOKIE_KEY ?? 'token');
    navigate(HOME_PAGE_PATH, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
