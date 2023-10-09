import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import axios, { AxiosResponse } from 'axios';
import { coreStore } from '@src/store/core';
import { PricingAndBillingFilterData, PricingAndBillingResponse } from './PricingAndBilling.types';

export const monthValidationSchema = yup.object({
  monthId: yup.string(),
});

const getPricingAndBilling = (filters: PricingAndBillingFilterData) => {
  const token = coreStore.getState().token || '';
  return axios(`/statistic/pricing-billing`, {
    method: 'GET',
    params: {
      ...filters,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const usePricing = (date?: string) =>
  useInfiniteQuery(
    ['pricing_and_billing', date],
    ({ pageParam = 1 }) => getPricingAndBilling({ date, page: pageParam }),
    {
      getNextPageParam: (response: AxiosResponse<PricingAndBillingResponse>) => {
        const { meta } = response.data.billings;
        const currentPage = meta.current_page;
        const { total } = meta;
        const perPage = meta.per_page;
        const totalPages = Math.ceil(total / perPage);
        if (currentPage === totalPages) return false;
        return currentPage + 1;
      },
    }
  );

export const usePricingForm = () => {
  const methods = useForm({
    resolver: yupResolver(monthValidationSchema),
    mode: 'onChange',
  });
  return {
    methods,
  };
};
