import { ResponseResolver, DefaultBodyType, PathParams, RestContext, RestRequest } from 'msw';

export type RequestSuccessCodes = 200 | 201 | 204;

export type RequestClientErrorCodes = 400 | 401 | 403 | 404 | 429 | 405 | 406 | 408 | 413 | 429;

export type Resolver = ResponseResolver<RestRequest<DefaultBodyType, PathParams<string>>, RestContext, DefaultBodyType>;
