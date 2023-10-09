import { getBranches } from '@src/app/endpoints';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { SystemUsersListDto } from '../SystemUsers.types';
import { UserSystemsFilterData } from './SystemUserList.types';

const getUserSystemList = (filters: UserSystemsFilterData) => {
  return axios('system/user', {
    method: 'GET',
    params: {
      ...filters,
    },
  });
};
export const useUserSystems = (branchId: string | number) =>
  useInfiniteQuery(
    ['user-systems', branchId],
    ({ pageParam = 1 }) => getUserSystemList({ page: pageParam, branchId }),
    {
      getNextPageParam: (response: AxiosResponse<SystemUsersListDto>) => {
        const { pagination } = response.data;
        const currentPage = pagination.current_page;
        const { total } = pagination;
        const perPage = pagination.per_page;
        const totalPages = Math.ceil(total / perPage);
        if (currentPage === totalPages) return false;
        return currentPage + 1;
      },
    }
  );

const getAllBranches = async () => {
  return axios(`${getBranches}`, {
    method: 'GET',
  });
};
export const useBranches = () => {
  return useQuery(['request'], () => getAllBranches());
};
