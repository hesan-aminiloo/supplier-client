import { REQUEST_TIMEOUT, SITE_CONFIGS } from '@src/configs';
import { composeAbortControllers } from '@src/utils/web-apis/compose-abort-controllers';

import { FetchConfig, Fetcher } from './fetcher.types';
import { FetcherErrorModel, NON_SERVER_500_ERROR_MESSAGE, NO_TIMEOUT_VALUE, getTimeout } from './fetcher.utils';

export function fetcher<T extends object, P extends boolean = false>(
  ...args: Parameters<Fetcher<T, P>>
): ReturnType<Fetcher<T, P>> {
  const [endpoint, requestConfig = { method: 'GET' }] = args;
  // set default headers
  const defaultHeaders: Record<string, string> = { Accept: 'application/json' };
  if (requestConfig.body instanceof FormData) {
    defaultHeaders['Content-Type'] = 'multipart/form-data';
  } else {
    defaultHeaders['Content-Type'] = 'application/json';
  }
  const { timeout = REQUEST_TIMEOUT, ...customConfig } = requestConfig;
  // Initialize timeout controller
  const controller = new AbortController();
  const calculatedTimeout = getTimeout(timeout);
  const timeoutId =
    (calculatedTimeout !== NO_TIMEOUT_VALUE || undefined) && setTimeout(() => controller.abort(), calculatedTimeout);
  // compose controllers
  const signals = customConfig.signal ? [controller.signal, customConfig.signal] : [controller.signal];
  // fetch config
  const config: FetchConfig = {
    ...customConfig,
    signal: composeAbortControllers(signals),
    headers: {
      ...defaultHeaders,
      ...customConfig.headers,
    },
  };

  console.log({ config });

  return fetch(`${SITE_CONFIGS.BASE_API_URL}/${endpoint}`, config)
    .then(async (response) => {
      // clear abort controller timeout
      clearTimeout(timeoutId);
      if (response.ok) {
        return (await response.json()) as Awaited<ReturnType<Fetcher<T, P>>>;
      }
      const jsonError = await response.json();
      const error = new FetcherErrorModel(jsonError, {
        ...jsonError,
        status_code: response.status,
      });
      return Promise.reject(error);
    })
    .catch(async (error) => {
      if (error instanceof FetcherErrorModel) {
        return Promise.reject(error);
      }

      const newError = new FetcherErrorModel(error, {
        status: false,
        message: error.message || NON_SERVER_500_ERROR_MESSAGE,
        code: 0,
        track_id: 0,
        status_code: 422,
        errors: error.errors,
      });
      return Promise.reject(newError);
    });
}
