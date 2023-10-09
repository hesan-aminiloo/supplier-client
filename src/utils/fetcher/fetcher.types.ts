/* eslint-disable no-undef */
import { HttpErrorStatusCodeType } from '@src/types';

export type FetchConfig = RequestInit | undefined;

export type HTTPMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type RequestConfigBase = RequestInit & {
  method?: HTTPMethods;
  timeout?: number;
};

export type RequestConfig =
  | (RequestConfigBase & { method: 'GET' | 'DELETE' })
  | (RequestConfigBase & { method: 'POST' | 'PUT' | 'PATCH'; body: BodyInit | null });

type CommonResponseType = { status?: true };
type IncludedType = { [key: string]: object | Array<unknown> };
export type NonPaginateResponseType<T extends object> = CommonResponseType & {
  data: T;
  meta: { included: IncludedType };
};
// NOTE: this will change in the future
export type PaginateResponseType<T extends object> = CommonResponseType & {
  data: Array<T>;
  meta: {
    pagination: {
      total: number; // number of all items
      count: number; // number of this page items
      per_page: number; // page_size items
      current_page: number;
      total_pages: number; // count of response pages
      links?: {
        next?: string;
        previous?: string;
      };
    };
    included: IncludedType;
  };
};
export type ServerResponseType<
  T extends object,
  P extends boolean = false // Specify it is paginated or not
> = P extends false ? NonPaginateResponseType<T> : PaginateResponseType<T>;

type NonFormErrorStatusCodes = Exclude<HttpErrorStatusCodeType, 422>;
type FormErrorStatusCode = 422;
type CommonErrorType = {
  status: false;
  message: string;
  code: number;
  track_id: number;
};

export type NonFormErrorType = CommonErrorType & { status_code: NonFormErrorStatusCodes };
export type FormErrorType = CommonErrorType & {
  status_code: FormErrorStatusCode;
  errors: Array<{ field_name: string; errors: Array<string> }>;
};
export type ServerRequestErrorType = NonFormErrorType | FormErrorType;

export type Fetcher<T extends object, P extends boolean = false> = (
  endpoint: RequestInfo,
  requestConfig?: RequestConfig
) => Promise<ServerResponseType<T, P>>;

export type RequestParams = Record<string, unknown> | undefined;

export type APIFetcher<
  T extends object,
  K extends RequestParams = undefined,
  P extends boolean = false
> = K extends object
  ? (apiRUL: RequestInfo, requestParams: K, config?: RequestConfigBase) => Promise<ServerResponseType<T, P>>
  : (apiRUL: RequestInfo, requestParams?: K, config?: RequestConfigBase) => Promise<ServerResponseType<T, P>>;

export type CustomFetcherProps<T extends object, P extends boolean = false> = (
  endpoint: RequestInfo,
  requestConfig?: RequestConfig & { cookieString?: string }
) => Promise<ServerResponseType<T, P>>;
