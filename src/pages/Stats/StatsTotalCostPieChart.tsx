import React from 'react';

// components
import { PieChart, Card } from '@src/components';
import { Theme } from '@src/style';
import { useTranslation } from 'react-i18next';
import RenderWhen from '@components/RenderWhen';
import { ChartEmptyState } from '@src/pages/Stats/assets';
import { ICostsAnalyze } from '@src/types';
import { formatMoney } from '@src/utils';

const colors = [Theme.colors.analogousIndigo500, Theme.colors.warning600];

export const StatsTotalCostPieChart: React.FC<ICostsAnalyze> = ({ branches, users }) => {
  const { t } = useTranslation();
  const total = Number(branches) + Number(users);
  return (
    <Card
      header={{
        secondaryTitle: t('stats.total_cost'),
        title: formatMoney(total),
        className: '!border-b-0 !py-0 !mb-0',
      }}
      className="bg-white rounded-xl p-6"
      style={{ height: '404px' }}
    >
      <RenderWhen is={total === 0}>
        <div className="flex w-full h-full items-center justify-center">
          <ChartEmptyState />
        </div>
      </RenderWhen>
      <RenderWhen is={total > 0}>
        <PieChart
          colors={colors}
          width={120}
          height={300}
          data={[
            {
              name: 'Branch costs',
              value: Number(branches),
            },
            {
              name: 'Garage user costs',
              value: Number(users),
            },
          ]}
          cx="50%"
          cy="40%"
          innerRadius={70}
          fill="#8884d8"
          dataKey="value"
          hasTooltip
          tooltipStyle={{
            formatter: (value: any, entry: any, payload: any) => {
              return <p className="font-bold text-neutral-900">{formatMoney(payload?.value)}</p>;
            },
          }}
          legendProps={{
            layout: 'horizontal',
            wrapperStyle: {
              bottom: '40px',
              width: '100%',
            },
            formatter: (value: any, entry: any) => {
              return (
                <div className="inline-block ap-2">
                  <p className="text-sm text-neutral-500">{value}:</p>
                  <p className="font-bold text-neutral-900">{formatMoney(entry?.payload?.value)}</p>
                </div>
              );
            },
          }}
        />
      </RenderWhen>
    </Card>
  );
};

export default StatsTotalCostPieChart;
