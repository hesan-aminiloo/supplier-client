import {
  ICustomerActivity,
  ICustomerActivityCharts,
  IOverallRevenue,
  ISalesOfBranch,
  ISalesReport,
  ResponseTime,
} from '@src/types';
import { BadgeProps, FormDropDown, FormInput, IconNames, IconProps } from '@src/components';
import { DropDownOption } from '@components/text-fields';
import { ReactNode } from 'react';

export interface GarageActivityPieChartProps {
  analysisOfGarages: number;
}

export interface AverageResponseTimeProps {
  responseTime: ResponseTime | undefined;
}

export interface CustomerActivityBarChartProps {
  data: ICustomerActivityCharts[];
}

export interface OverAllRevenueProps {
  data: IOverallRevenue[];
}

export interface CustomerActivityTableProps {
  data: ICustomerActivity[];
}

export interface SalesReportProps {
  data: ISalesReport[];
}

export interface SalesByBranchesProps {
  data: ISalesOfBranch[];
}

export interface StatisticsPieChartProps {
  quotes: string | undefined;
  orders: string | undefined;
}

export interface GetStatsFiltersBody {
  time: string;
  branchId: string;
}

export interface StatsFiltersProps {
  filters: GetStatsFiltersBody;
  onSubmit: (values: GetStatsFiltersBody) => void;
}

export type StatsFiltersInputItem = {
  id: string;
  leftIcon: IconNames;
  placeholder?: string;
  className?: string;
  name: keyof GetStatsFiltersBody;
  options?: DropDownOption[];
  component: typeof FormDropDown | typeof FormInput;
};

export interface SupplierStatsCardProps {
  iconProps: IconProps;
  badgeProps: BadgeProps;
  title: string;
  value: string | number | ReactNode;
  className?: string;
  preFix?: string;
  dataKey: 'totalSales' | 'totalUsers' | 'totalRequests' | 'orders' | 'quotes';
}
