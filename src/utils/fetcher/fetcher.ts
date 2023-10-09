import { AUTHORIZATION_KEY, LOGOUT_PAGE_PATH } from '@src/utils/constants';

import { coreStore } from '@src/store/core';
import { CustomFetcherProps } from './fetcher.types';

import { FetcherErrorModel } from './fetcher.utils';
import { fetcher } from './fetcher.base';
import { errorToast } from '../toast';

export function customFetcher<T extends object, P extends boolean = false>(
  ...args: Parameters<CustomFetcherProps<T, P>>
): ReturnType<CustomFetcherProps<T, P>> {
  const [endpoint, requestConfigs = {} as Parameters<CustomFetcherProps<T, P>>[1]] = args;

  const token = coreStore.getState().token || '';

  if (requestConfigs && token) {
    if (!requestConfigs.headers) requestConfigs.headers = {};
    const tokenWithType = `Bearer ${token}`;
    /**
     * Headers are with like [['Authorization', 'Bearer ...'], ['Content-Type', 'application/...']]
     * In here we find the Authorization and change its value if existed
     */
    if (Array.isArray(requestConfigs?.headers)) {
      const authorizationHeader = requestConfigs.headers.find(([key]) => key === AUTHORIZATION_KEY);
      if (authorizationHeader) authorizationHeader[1] = tokenWithType;
    } else if (requestConfigs.headers instanceof Headers) {
      requestConfigs.headers.set(AUTHORIZATION_KEY, tokenWithType);
    } else {
      requestConfigs.headers.Authorization = tokenWithType;
    }
  }

  return fetcher<T, P>(endpoint, requestConfigs).catch((error: FetcherErrorModel) => {
    if (error.info.status_code === 401 && requestConfigs?.method === 'GET') {
      window.location.replace(LOGOUT_PAGE_PATH);
    }

    if (error.info.status_code >= 500) {
      errorToast({ message: 'Something went wrong! Please try again later.' });
    }

    throw error;
  });
}
