import Pusher from 'pusher-js';

class PusherSingleton {
  private static instance: Pusher;

  static getInstance(token: string): Pusher {
    if (!PusherSingleton.instance) {
      PusherSingleton.instance = new Pusher('fd7dacc2b9ab4bf8bd51', {
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
    }

    return PusherSingleton.instance;
  }
}

export default PusherSingleton;
