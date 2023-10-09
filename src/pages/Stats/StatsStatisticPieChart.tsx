import React from 'react';

// components
import { PieChart, Card } from '@src/components';
import { Theme } from '@src/style';
import { StatisticsPieChartProps } from '@src/pages/Stats/Stats.types';
import { useTranslation } from 'react-i18next';
import RenderWhen from '@components/RenderWhen';
import { ChartEmptyState } from '@src/pages/Stats/assets';

const colors = [Theme.colors.primary600, Theme.colors.destructive600];

export const StatsStatisticPieChart: React.FC<StatisticsPieChartProps> = ({ orders, quotes }) => {
  const { t } = useTranslation();
  return (
    <Card
      header={{
        title: t('stats.requests_ratio'),
        className: '!border-b-0 !py-0',
      }}
      className="bg-white col-span-1 rounded-xl h-80 p-6"
    >
      <RenderWhen is={!orders && !quotes}>
        <div className="flex w-full h-40 items-center justify-center">
          <ChartEmptyState />
        </div>
      </RenderWhen>
      <RenderWhen is={quotes || orders}>
        <PieChart
          colors={colors}
          width={160}
          height={160}
          data={[
            { name: 'Quotes', value: Number(quotes ?? 0) },
            { name: 'Orders', value: Number(orders ?? 0) },
          ]}
          cx="50%"
          cy="40%"
          innerRadius={50}
          outerRadius={75}
          fill="#8884d8"
          dataKey="value"
          hasTooltip
          hasActiveShape
          centerText={{
            secondaryTitle: t('stats.total'),
            title: Number(quotes ?? 0) + Number(orders ?? 0),
          }}
          legendProps={{
            formatter: (value: any, entry: any) => {
              return `${value}: ${entry?.payload?.value}`;
            },
          }}
        />
      </RenderWhen>
    </Card>
  );
};

export default StatsStatisticPieChart;
