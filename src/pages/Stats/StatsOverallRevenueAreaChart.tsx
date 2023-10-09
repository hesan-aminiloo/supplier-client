import React from 'react';

// components
import { AreaChart, Card } from '@src/components';
import { Theme } from '@src/style';
import { AreaProps } from 'recharts';
import { OverAllRevenueProps } from '@src/pages/Stats/Stats.types';
import { useTranslation } from 'react-i18next';
import { formatMoney, generateMonthName } from '@src/utils';
import RenderWhen from '@components/RenderWhen';
import { ChartEmptyState } from '@src/pages/Stats/assets';

const areas: AreaProps[] = [
  {
    name: 'Revenue',
    dataKey: 'revenue',
    fill: Theme.colors.primary50,
    stroke: Theme.colors.primary600,
    type: 'monotone',
    strokeWidth: 4,
  },
];

export const StatsOverallRevenueAreaChart: React.FC<OverAllRevenueProps> = ({ data }) => {
  const { t } = useTranslation();
  const overallRevenue: number = data.map((item) => item.total ?? 0).reduce((a, b) => a + b, 0);
  return (
    <Card
      header={{
        title: formatMoney(overallRevenue),
        secondaryTitle: t('stats.overall_revenue'),
        className: '!border-b-0 !py-0',
      }}
      className="bg-white col-span-2 rounded-xl h-80 p-6"
    >
      <RenderWhen is={data.length === 0}>
        <div className="flex w-full h-40 items-center justify-center">
          <ChartEmptyState />
        </div>
      </RenderWhen>
      <RenderWhen is={data.length > 0}>
        <AreaChart
          yAxisProps={{
            unit: t('shared.currency'),
          }}
          areas={areas}
          data={data.map((item) => ({
            name: `${generateMonthName(item.month)} ${item.year}`,
            areas: {
              revenue: item.total ?? 0,
            },
          }))}
          width={600}
          height={239}
          hideLegend
        />
      </RenderWhen>
    </Card>
  );
};

export default StatsOverallRevenueAreaChart;
