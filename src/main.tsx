import ReactDOM from 'react-dom/client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import App from '@src/app/App';
import { IconSymbols } from '@src/components';
import axios from 'axios';
import i18next from '@src/app/localization/i18n';

import './style/_global.scss';
import { errorToast, HOME_PAGE_PATH, LOGOUT_PAGE_PATH } from '@src/utils';
import { getLocalStorage } from '@utils/storage';
import { SITE_CONFIGS } from './configs';

axios.defaults.baseURL = SITE_CONFIGS.BASE_API_URL;
axios.defaults.headers.common.Authorization = `Bearer ${getLocalStorage(SITE_CONFIGS.TOKEN_COOKIE_KEY!)}`;

// const setupMocks = async () => {
//   const { worker } = await import('./mocks/browser');
//   worker.start();
// };

if (import.meta.env.MODE === 'development') {
  // setupMocks();
}

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
      onError: (error: any) => {
        if (error.response.status === 403) {
          errorToast({
            message: i18next.t('shared.validation.error_403'),
          });
        }
      },
    },
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
      onError: (error: any) => {
        if (error.response.status === 401) {
          window.location.replace(LOGOUT_PAGE_PATH);
        }
        if (error.response.status === 403) {
          errorToast({
            message: i18next.t('shared.validation.error_403'),
          });
          window.location.replace(HOME_PAGE_PATH);
        }
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <IconSymbols />
      <div className="max-w-[1920px] lg:mx-auto mx-0">
        <App />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
