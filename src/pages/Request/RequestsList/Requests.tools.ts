import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { array, object, string } from 'yup';
import { GetRequestsBody } from '@src/pages/Request/RequestsList/Requests.types';

export const RequestFiltersSchema = object().shape({
  status: array(),
  type: string(),
  time: string(),
  value: string(),
  branch: string(),
});

export const useRequestFiltersForm = (filters: GetRequestsBody) => {
  const methods = useForm<GetRequestsBody>({
    resolver: yupResolver(RequestFiltersSchema),
    mode: 'onChange',
    defaultValues: filters,
  });

  return {
    methods,
  };
};
