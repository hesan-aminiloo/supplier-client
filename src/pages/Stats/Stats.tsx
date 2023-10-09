import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// components
import { Content } from '@src/layouts/Content';

// local components
import {
  StatsCard,
  StatsCustomerActivityBarChart,
  StatsStatisticPieChart,
  StatsSalesReportBarChart,
  StatsCustomerActivityTable,
  StatsAnalysisGarageActivityPieChart,
  StatsSalesByBranchesPieChart,
  StatsAverageResponseTimePieChart,
  StatsOverallRevenueAreaChart,
  StatsSkeleton,
  GetStatsFiltersBody,
  STATS_FILTERS,
  StatsTotalCostPieChart,
} from '@src/pages/Stats';

// constants
import { STATS_CARDS } from '@src/pages/Stats/Stats.constants';
import { useStatistics } from '@src/pages/Stats/Stats.tools';
import RenderWhen from '@components/RenderWhen';
import { StatsFilters } from '@src/pages/Stats/StatsFilters';
import StatsLostOrders from '@src/pages/Stats/StatsLostOrders';
import { useActiveBranches } from '../GarageCustomers/GarageCustomers.tools';

const Stats: React.FC = () => {
  const [filters, setFilters] = useState<GetStatsFiltersBody>(STATS_FILTERS);
  const { t } = useTranslation();
  const { data, isLoading, refetch, isRefetching } = useStatistics(filters);
  const { data: branches } = useActiveBranches();
  const handleSearch = (newFilters: GetStatsFiltersBody) => {
    if (filters !== newFilters) {
      setFilters(newFilters);
    } else {
      refetch();
    }
  };
  return (
    <Content
      pageTitle={t('side_menu.statistics_analytics')}
      canGoBack={false}
      rightContent={
        <StatsFilters
          filters={filters}
          onSubmit={handleSearch}
        />
      }
    >
      <RenderWhen is={isLoading || isRefetching}>
        <StatsSkeleton />
      </RenderWhen>
      <RenderWhen is={!!data && !!data?.data}>
        <div className="w-full flex flex-wrap gap-6">
          {STATS_CARDS.map((card) => (
            <StatsCard
              className="flex-1"
              value={`${card.preFix ?? ''}${data?.data?.[card.dataKey] || 0}`}
              key={card.dataKey}
              {...card}
            />
          ))}
        </div>
        <div className="w-full grid grid-cols-3 gap-6 mt-6">
          <div className="col-span-2 grid grid-cols-2 gap-6 auto-rows-min">
            <StatsCustomerActivityBarChart data={data?.data?.customersActivityChart ?? []} />
            <StatsOverallRevenueAreaChart data={data?.data?.overalRevenue ?? []} />
            <StatsStatisticPieChart
              quotes={data?.data?.quotes}
              orders={data?.data?.orders}
            />
            <StatsAnalysisGarageActivityPieChart analysisOfGarages={data?.data?.analysisOfGarages ?? 0} />
            <StatsSalesReportBarChart data={data?.data?.salesReport ?? []} />
            <StatsCustomerActivityTable data={data?.data?.customersActivity ?? []} />
          </div>
          <div className="col-span-1 grid grid-cols-1 auto-rows-min gap-6">
            <RenderWhen is={branches?.data.length! > 1 && !filters.branchId}>
              <StatsSalesByBranchesPieChart data={data?.data?.salesOfBranches ?? []} />
            </RenderWhen>
            <StatsAverageResponseTimePieChart responseTime={data?.data?.responseTime} />
            <StatsTotalCostPieChart
              branches={data?.data?.costsAnalyze?.branches ?? '0'}
              users={data?.data?.costsAnalyze?.users ?? '0'}
            />
            <StatsLostOrders
              missed={data?.data?.lostQuotes.missed ?? 0}
              total={data?.data?.lostQuotes.total ?? 0}
            />
          </div>
        </div>
      </RenderWhen>
    </Content>
  );
};

export default Stats;
