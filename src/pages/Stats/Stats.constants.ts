import { Theme } from '@src/style';
import i18next from 'i18next';
import { FormDropDown, TableColumn } from '@src/components';
import { GetStatsFiltersBody, StatsFiltersInputItem, SupplierStatsCardProps } from '@src/pages/Stats/Stats.types';

export const STATS_CARDS: Omit<SupplierStatsCardProps, 'value'>[] = [
  {
    title: i18next.t('stats.sales'),
    preFix: i18next.t('shared.currency'),
    iconProps: {
      name: 'shopping-cart',
      color: Theme.colors.warning600,
    },
    badgeProps: {
      color: 'warning',
      variant: 'secondary',
    },
    dataKey: 'totalSales',
  },
  {
    title: i18next.t('stats.total_users'),
    iconProps: {
      name: 'history',
      color: Theme.colors.destructive500,
    },
    badgeProps: {
      color: 'destructive',
      variant: 'secondary',
    },
    dataKey: 'totalUsers',
  },
  {
    title: i18next.t('stats.requests'),
    iconProps: {
      name: 'document-previous',
      color: Theme.colors.primary500,
    },
    badgeProps: {
      color: 'primary',
      variant: 'secondary',
    },
    dataKey: 'totalRequests',
  },
  {
    title: i18next.t('stats.quotes'),
    iconProps: {
      name: 'document-filter',
      color: Theme.colors.analogousIndigo500,
    },
    badgeProps: {
      color: 'analogousIndigo',
      variant: 'secondary',
    },
    dataKey: 'quotes',
  },
  {
    title: i18next.t('stats.orders'),
    iconProps: {
      name: 'shopping-cart',
      color: Theme.colors.success500,
    },
    badgeProps: {
      color: 'success',
      variant: 'secondary',
    },
    dataKey: 'orders',
  },
];
export const CUSTOMER_ACTIVITY_TABLE_COLUMNS: TableColumn[] = [
  {
    field: 'garage',
    title: 'stats.garage',
  },
  {
    field: 'quotes',
    title: 'stats.quotes',
  },
  {
    field: 'orders',
    title: 'stats.orders',
  },
  {
    field: 'value',
    title: 'stats.value',
  },
];

export const STATS_TIME_FILTER_CONSTANTS = [
  {
    label: 'Last 3 Months',
    value: '3_months',
  },
  {
    label: 'Last 6 Months',
    value: '6_months',
  },
  {
    label: 'Last 12 Months',
    value: '12_months',
  },
];

export const STATS_FILTER_INPUTS = (role: string, branchesLength: number): StatsFiltersInputItem[] => {
  const inputs: StatsFiltersInputItem[] = [];
  if (role === 'administrator' || branchesLength > 1) {
    inputs.push({
      id: 'branch-input',
      name: 'branchId',
      leftIcon: 'building',
      className: '!w-52',
      component: FormDropDown,
    });
  }
  inputs.push({
    id: 'time-input',
    name: 'time',
    leftIcon: 'calendar-1',
    className: '!w-52',
    options: STATS_TIME_FILTER_CONSTANTS,
    component: FormDropDown,
  });
  return inputs;
};

export const STATS_FILTERS: GetStatsFiltersBody = {
  time: '12_months',
  branchId: '',
};
