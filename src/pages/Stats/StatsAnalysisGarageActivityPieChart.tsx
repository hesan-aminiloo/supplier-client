import React from 'react';

// components
import { PieChart, Card } from '@src/components';
import { Theme } from '@src/style';
import { GarageActivityPieChartProps } from '@src/pages/Stats/Stats.types';
import { useTranslation } from 'react-i18next';
import RenderWhen from '@components/RenderWhen';
import { ChartEmptyState } from '@src/pages/Stats/assets';

const colors = [Theme.colors.analogousIndigo500, Theme.colors.neutral100];
const maximumRange = 100;

export const StatsAnalysisGarageActivityPieChart: React.FC<GarageActivityPieChartProps> = ({ analysisOfGarages }) => {
  const { t } = useTranslation();
  return (
    <Card
      header={{
        title: t('stats.analysis_of_garage_activity'),
        className: '!border-b-0 !py-0 text-center',
      }}
      className="bg-white col-span-1 rounded-xl h-80 p-6"
    >
      <RenderWhen is={analysisOfGarages === 0}>
        <div className="flex w-full h-40 items-center justify-center">
          <ChartEmptyState />
        </div>
      </RenderWhen>
      <RenderWhen is={analysisOfGarages > 0}>
        <PieChart
          responseContainerProps={{
            width: '100%',
            height: '50%',
          }}
          colors={colors}
          data={[
            {
              name: '',
              value: analysisOfGarages >= maximumRange ? maximumRange : analysisOfGarages,
            },
            {
              name: '',
              value: analysisOfGarages >= maximumRange ? 0 : maximumRange - analysisOfGarages,
            },
          ]}
          cx="50%"
          cy="90%"
          innerRadius={40}
          outerRadius={80}
          startAngle={180}
          endAngle={0}
          fill="#8884d8"
          dataKey="value"
          hideLegend
          centerText={{
            title: `${analysisOfGarages}%`,
          }}
        />
        <p className="mt-4 text-neutral-500 text-sm text-center">
          {t('stats.analysis_of_garage_activity_description')}
        </p>
      </RenderWhen>
    </Card>
  );
};

export default StatsAnalysisGarageActivityPieChart;
