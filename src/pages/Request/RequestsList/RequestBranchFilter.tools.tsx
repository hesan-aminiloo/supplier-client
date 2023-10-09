import { getBranches } from '@src/app/endpoints';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getAllBranches = async () => {
  return axios(`${getBranches}`, {
    method: 'GET',
  });
};
export const useBranches = () => {
  return useQuery(['request'], () => getAllBranches());
};
