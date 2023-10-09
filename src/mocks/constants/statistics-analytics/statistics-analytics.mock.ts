import {
  AverageResponseTimeProps,
  CustomerActivityBarChartProps,
  CustomerActivityTableProps,
  GarageActivityPieChartProps,
  OverAllRevenueProps,
  SalesByBranchesProps,
  SalesReportProps,
  StatisticsPieChartProps,
} from '@src/pages/Stats';

export const STATS_ANALYSIS_GARAGE_ACTIVITY_PIE_CHART_MOCK: GarageActivityPieChartProps = {
  analysisOfGarages: 73,
};

export const STATS_ANALYSIS_AVERAGE_RESPONSE_TIME_MOCK: AverageResponseTimeProps = {
  responseTime: {
    minutes: '8749',
    total: 10,
  },
};

export const STATS_ANALYSIS_CUSTOMER_ACTIVITY_BAR_CHART_MOCK: CustomerActivityBarChartProps = {
  data: [
    {
      year: 2023,
      month: 1,
      orders: '4000',
      quotes: '2400',
    },
    {
      year: 2023,
      month: 2,
      orders: '4000',
      quotes: '2400',
    },
    {
      year: 2023,
      month: 3,
      orders: '4000',
      quotes: '2400',
    },
    {
      year: 2023,
      month: 4,
      orders: '4000',
      quotes: '2400',
    },
    {
      year: 2023,
      month: 5,
      orders: '4000',
      quotes: '2400',
    },
    {
      year: 2023,
      month: 6,
      orders: '4000',
      quotes: '2400',
    },
  ],
};

export const STATS_ANALYSIS_CUSTOMER_ACTIVITY_TABLE_MOCK: CustomerActivityTableProps = {
  data: [],
};

export const STATS_ANALYSIS_SALES_BY_BRANCHES_MOCK: SalesByBranchesProps = {
  data: [
    { name: 'Branch 1', value: 430, percent: 50 },
    { name: 'Branch 2', value: 400, percent: 60 },
  ],
};

export const STATS_ANALYSIS_OVERALL_REVENUE_MOCK: OverAllRevenueProps = {
  data: [
    {
      year: 2023,
      month: 1,
      total: 10,
    },
    {
      year: 2023,
      month: 2,
      total: 20,
    },
    {
      year: 2023,
      month: 3,
      total: 40,
    },
    {
      year: 2023,
      month: 3,
      total: 30,
    },
    {
      year: 2023,
      month: 4,
      total: 60,
    },
    {
      year: 2023,
      month: 5,
      total: 10,
    },
    {
      year: 2023,
      month: 6,
      total: 50,
    },
    {
      year: 2023,
      month: 7,
      total: 10,
    },
  ],
};

export const STATS_ANALYSIS_SALES_REPORT_MOCK: SalesReportProps = {
  data: [
    {
      year: 2023,
      month: 1,
      orders: '4000',
      quotes: '2400',
    },
    {
      year: 2023,
      month: 2,
      orders: '4000',
      quotes: '2400',
    },
    {
      year: 2023,
      month: 3,
      orders: '4000',
      quotes: '2400',
    },
    {
      year: 2023,
      month: 4,
      orders: '4000',
      quotes: '2400',
    },
    {
      year: 2023,
      month: 5,
      orders: '4000',
      quotes: '2400',
    },
    {
      year: 2023,
      month: 6,
      orders: '4000',
      quotes: '2400',
    },
    {
      year: 2023,
      month: 7,
      orders: '4000',
      quotes: '2400',
    },
  ],
};

export const STATS_ANALYSIS_STATISTIC_PIE_CHART_MOCK: StatisticsPieChartProps = {
  orders: '10',
  quotes: '20',
};
