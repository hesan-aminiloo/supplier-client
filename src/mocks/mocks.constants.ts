import type { RequestSuccessCodes, RequestClientErrorCodes } from './mocks.types';

// TODO: Make this load time variable based on command parameters
export const LOADING_TIME = 1500;

/**
 * Response Status Codes
 */
export const RES_OK: RequestSuccessCodes = 200;

export const RES_CREATED: RequestSuccessCodes = 201;

export const RES_NO_CONTENT: RequestSuccessCodes = 204;

/**
 * Request Status Codes
 */
export const REQ_BAD_REQUEST: RequestClientErrorCodes = 400;

export const REQ_UNAUTHORIZED: RequestClientErrorCodes = 401;

export const REQ_FORBIDDEN: RequestClientErrorCodes = 403;

export const REQ_NOT_FOUND: RequestClientErrorCodes = 404;

export const REQ_TIME_OUT: RequestClientErrorCodes = 408;

export const REQ_PAYLOAD_TOO_LARGE: RequestClientErrorCodes = 413;

export const REQ_TOO_MANY: RequestClientErrorCodes = 413;
