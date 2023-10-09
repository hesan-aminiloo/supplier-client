import { FC, createContext } from 'react';

import { coreStore } from './core';
import { IGlobalStoreProviderProps } from './store.types';

const combinedStores = { coreStore };
export const GlobalStoreContext = createContext(combinedStores);

export const GlobalStoreProvider: FC<IGlobalStoreProviderProps> = ({ children }) => {
  return (
    <>
      <GlobalStoreContext.Provider value={combinedStores}>{children}</GlobalStoreContext.Provider>
    </>
  );
};
