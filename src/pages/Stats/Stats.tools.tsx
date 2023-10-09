import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { Avatar, TableRow } from '@src/components';
import { CustomerActivityTableProps, GetStatsFiltersBody } from '@src/pages/Stats/Stats.types';
import { convertJsonToQueryString, customFetcher } from '@src/utils';
import { statisticsEndpoint } from '@src/app/endpoints';
import { useQuery } from '@tanstack/react-query';
import { IStats } from '@src/types';
import React, { useEffect } from 'react';
import i18next from 'i18next';

const getStatistics = (filters: GetStatsFiltersBody) => {
  return customFetcher<IStats>(`${statisticsEndpoint}?${convertJsonToQueryString(filters)}`, {
    method: 'GET',
  });
};

export const useStatistics = (filters: GetStatsFiltersBody) => {
  return useQuery(['statistics', filters], () => getStatistics(filters));
};

export const generateCustomerActivityTableRows = ({ data }: CustomerActivityTableProps): TableRow[] => {
  return data.map((row) => ({
    id: row.name,
    data: [
      {
        data: (
          <div className="flex gap-2 items-center">
            <Avatar
              size="xs"
              src={row.logo}
              alt={row.name}
              userName={row.name}
            />
            <p>{row.name}</p>
          </div>
        ),
        field: 'garage',
      },
      {
        data: row.quotes,
        field: 'quotes',
      },
      {
        data: row.orders,
        field: 'orders',
      },
      {
        data: `${i18next.t('shared.currency')}${row.value}`,
        field: 'value',
      },
    ],
  }));
};

export const StatsFiltersSchema = object().shape({
  time: string(),
});

export const useStatsFiltersForm = (filters: GetStatsFiltersBody, onSubmit: (values: GetStatsFiltersBody) => void) => {
  const methods = useForm<GetStatsFiltersBody>({
    resolver: yupResolver(StatsFiltersSchema),
    mode: 'onChange',
    defaultValues: filters,
  });
  const { watch, getValues } = methods;
  const watchTime = watch('time');

  useEffect(() => {
    const values = getValues();
    onSubmit(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchTime]);

  return {
    methods,
  };
};
