import { coreStore } from '@src/store/core';
import Pusher from 'pusher-js';
import { useStore } from 'zustand';

const usePusher = () => {
  const { token } = useStore(coreStore);
  const pusher = new Pusher('fd7dacc2b9ab4bf8bd51', {
    cluster: 'eu',
    forceTLS: true,
    authEndpoint: `https://suppapp-back.availcat.com/api/broadcasting/auth`,
    auth: {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  });

  return { pusher };
};

export default usePusher;
