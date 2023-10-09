import { createStore } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ICoreStore } from './core.types';

export const coreStore = createStore(
  persist(
    devtools<ICoreStore>(
      (set, _get) => ({
        user: null,
        countries: [],
        permissions: null,
        token: undefined,
        systemUser: undefined,
        notifs: undefined,
        setCountries: (countries) => set(() => ({ countries })),
        setUser: (data) =>
          set(() => ({ user: data.user, token: data.token, permissions: data.permissions, countries: data.countries })),
        setSystemUser: (data) => set(() => ({ systemUser: data })),
        clearSystemUser: () => set(() => ({ systemUser: undefined })),
        setSystemUsersList: (data) => set(() => ({ setSystemUsersList: data })),
        clearSystemUsersList: () => set(() => ({ setSystemUsersList: undefined })),
        clearUser: () => set(() => ({ user: undefined, token: undefined, permissions: null })),
        setNotifs: (data) => set(() => ({ notifs: data })),
      }),
      {
        name: 'core', // unique name
      }
    ),
    {
      name: 'avail-core-store',
    }
  )
);
