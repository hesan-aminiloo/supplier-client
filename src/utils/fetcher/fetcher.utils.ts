import { RequestConfig, ServerRequestErrorType } from './fetcher.types';

export const NO_TIMEOUT_VALUE = -1;

export const getClientTimeout = (timeout: RequestConfig['timeout']) => {
  return timeout || NO_TIMEOUT_VALUE;
};

export const getTimeout = (timeout: RequestConfig['timeout']) => {
  return getClientTimeout(timeout);
};

// Use this type in other projects to achieve fetcher error possible type
export class FetcherErrorModel extends Error {
  constructor(public message: string, public info: ServerRequestErrorType) {
    super(message);
  }
}

export const NON_SERVER_500_ERROR_MESSAGE = 'Non Server 500 Error';
