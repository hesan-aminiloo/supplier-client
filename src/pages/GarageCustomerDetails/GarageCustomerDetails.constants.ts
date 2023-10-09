import { formatMoney } from '@src/utils';
import { Theme } from '@src/style';
import { TableColumn } from '@src/components';
import { GarageStatsCardProps } from './GarageCustomerDetails.types';

export const SKELETON_ITEMS_COUNT = 4;

export const GARAGE_STATS_CARDS: Omit<GarageStatsCardProps, 'value'>[] = [
  {
    title: 'stats.sales',
    iconProps: {
      name: 'shopping-cart',
      color: Theme.colors.warning600,
    },
    badgeProps: {
      color: 'warning',
      variant: 'secondary',
    },
    dataKey: 'totalIncome',
    formatter: formatMoney,
  },
  {
    title: 'garage_customer_details.quotes',
    iconProps: {
      name: 'document-filter',
      color: Theme.colors.analogousIndigo500,
    },
    badgeProps: {
      color: 'analogousIndigo',
      variant: 'secondary',
    },
    dataKey: 'totalQuotes',
  },
  {
    title: 'garage_customer_details.orders',
    iconProps: {
      name: 'shopping-cart',
      color: Theme.colors.success500,
    },
    badgeProps: {
      color: 'success',
      variant: 'secondary',
    },
    dataKey: 'totalOrders',
  },
];
export const GARAGE_STATISTICS_TABLE_COLUMNS: TableColumn[] = [
  {
    field: 'month',
    title: 'garage_customer_details.month',
  },
  {
    field: 'quotes',
    title: 'garage_customer_details.quotes',
  },
  {
    field: 'orders',
    title: 'garage_customer_details.orders',
  },
  {
    field: 'income',
    title: 'garage_customer_details.income',
  },
  {
    field: 'requests',
    title: ' ',
  },
];

export const YEARS = [
  {
    label: '2023',
    value: 2023,
  },
  {
    label: '2022',
    value: 2022,
  },
  {
    label: '2021',
    value: 2021,
  },
];
