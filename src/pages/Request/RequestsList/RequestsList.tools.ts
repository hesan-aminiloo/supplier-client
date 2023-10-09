import { GetRequestsBody, RequestsResponse } from '@src/pages/Request/RequestsList/Requests.types';
import { getAllRequests, getRequestPartsEndPoint } from '@src/app/endpoints';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { SITE_CONFIGS } from '@src/configs';
import axios, { AxiosResponse } from 'axios';
import { customFetcher } from '@src/utils';
import { IPostRequestPartDetails } from '@src/types';

const normalizeRequestsQueryString = (filters: GetRequestsBody) => {
  let querySting = '?';
  if (filters.page) {
    querySting += `page=${filters.page}&`;
  }
  if (filters.filters.status) {
    filters.filters.status?.forEach((status, index) => {
      if (status) querySting += `filters[status][${index}]=${status}&`;
    });
  }
  if (filters.filters.type) {
    querySting += `filters[type][]=${filters.filters.type}&`;
  }
  if (filters.filters.time) {
    querySting += `filters[time]=${filters.filters.time}&`;
  }
  if (filters.filters.search) {
    querySting += `filters[search]=${filters.filters.search}&`;
  }

  if (filters.filters.branch) {
    querySting += `filters[branchId]=${filters.filters.branch}&`;
  }

  if (filters.filters.garageId) {
    querySting += `filters[garageId]=${filters.filters.garageId}&`;
  }

  return querySting.substring(0, querySting.length - 1);
};

const getRequests = (filters: GetRequestsBody) => {
  return axios(`${SITE_CONFIGS.BASE_API_URL}${getAllRequests}${normalizeRequestsQueryString(filters)}`, {
    method: 'GET',
  });
};

export const useRequests = (filters: GetRequestsBody) =>
  useInfiniteQuery(['requests', filters], ({ pageParam = 1 }) => getRequests({ ...filters, page: pageParam }), {
    getNextPageParam: (response: AxiosResponse<RequestsResponse>) => {
      const currentPage = response.data['supplier requests'].current_page;
      const { total } = response.data['supplier requests'];
      const perPage = response.data['supplier requests'].per_page;
      const totalPages = Math.ceil(total / perPage);

      if (currentPage === totalPages) return false;
      return currentPage + 1;
    },
  });

const getRequestParts = (requestId: string) => {
  return customFetcher<IPostRequestPartDetails[]>(getRequestPartsEndPoint(requestId), {
    method: 'GET',
  });
};

export const useRequestPart = (requestId: string) => {
  return useQuery([`request/part-required/${requestId}`], () => getRequestParts(requestId), {
    enabled: !!requestId,
    select: (res) => {
      return res.data ?? [];
    },
  });
};
