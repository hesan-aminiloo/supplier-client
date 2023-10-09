import React from 'react';

// components
import { PieChart, Card } from '@src/components';
import { SalesByBranchesProps } from '@src/pages/Stats/Stats.types';
import { useTranslation } from 'react-i18next';
import RenderWhen from '@components/RenderWhen';
import { ChartEmptyState } from '@src/pages/Stats/assets';
import { formatMoney, generateColors } from '@src/utils';

export const StatsSalesByBranchesPieChart: React.FC<SalesByBranchesProps> = ({ data }) => {
  const { t } = useTranslation();
  const colors = generateColors(data.length);
  return (
    <Card
      header={{
        secondaryTitle: t('stats.statistics'),
        title: t('stats.sales_by_branches'),
        className: '!border-b-0 !py-0 !mb-0',
      }}
      className="bg-white rounded-xl p-6"
      style={{ height: `${400 + data.length * 30}px`, maxHeight: 'max-content' }}
    >
      <RenderWhen is={data.length === 0}>
        <div className="flex w-full h-full items-center justify-center">
          <ChartEmptyState />
        </div>
      </RenderWhen>
      <RenderWhen is={data.length > 0}>
        <PieChart
          colors={colors}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          hasTooltip
          tooltipStyle={{
            formatter: (value: any, entry: any, payload: any) => {
              return (
                <div className="w-full flex flex-col justify-between">
                  <p>{formatMoney(value)}</p>
                  <p>{payload?.payload?.percent ? `${payload?.payload?.percent.toFixed(2)}%` : ''}</p>
                </div>
              );
            },
          }}
          legendProps={{
            layout: 'vertical',
            wrapperStyle: {
              bottom: '40px',
              width: '100%',
              fontWeight: 'bold',
            },
            iconSize: 0,
            formatter: (value: any, entry: any, index: any) => {
              return (
                <div className="w-full flex justify-between !text-black">
                  <p className="flex gap-2 items-center">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: colors[index] }}
                    />
                    <span>{value}:</span>
                  </p>
                  <p>{`${entry?.payload?.percent.toFixed(2)}%`}</p>
                </div>
              );
            },
          }}
        />
      </RenderWhen>
    </Card>
  );
};

export default StatsSalesByBranchesPieChart;
