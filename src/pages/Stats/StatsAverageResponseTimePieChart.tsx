import React from 'react';

// components
import { PieChart, Card } from '@src/components';
import { Theme } from '@src/style';
import { AverageResponseTimeProps } from '@src/pages/Stats/Stats.types';
import { useTranslation } from 'react-i18next';
import RenderWhen from '@components/RenderWhen';
import { ChartEmptyState } from '@src/pages/Stats/assets';
import { generateMinutesToHours } from '@src/utils';

const colors = (minutes: number) => {
  if (minutes < 5) {
    return [Theme.colors.success600, Theme.colors.neutral200];
  }
  if (minutes >= 5 && minutes <= 10) {
    return [Theme.colors.warning500, Theme.colors.neutral200];
  }
  return [Theme.colors.destructive500, Theme.colors.neutral200];
};

const chartRange = 30;
const slowResponseMaxNumber = chartRange - 5;

const legends = [
  {
    name: 'Fast',
    description: '0-5 minutes',
    color: 'success',
  },
  {
    name: 'Moderate',
    description: '6-10 minutes',
    color: 'warning',
  },
  {
    name: 'Slow',
    description: '10 > minutes',
    color: 'destructive',
  },
];

export const StatsAverageResponseTimePieChart: React.FC<AverageResponseTimeProps> = ({ responseTime }) => {
  const { t } = useTranslation();
  const minutes = Number(responseTime?.minutes ?? 0);
  const responseTimeVisualRange = minutes >= chartRange ? slowResponseMaxNumber : minutes;
  return (
    <Card
      header={{
        title: t('stats.average_supplier_response_time'),
        className: '!pt-0 text-center mb-4',
      }}
      className="bg-white rounded-xl h-80 p-6 overflow-hidden"
    >
      <RenderWhen is={responseTime?.total === 0}>
        <div className="flex w-full h-full items-center justify-center">
          <ChartEmptyState />
        </div>
      </RenderWhen>
      <RenderWhen is={Number(responseTime?.total ?? 0) > 0}>
        <div className="w-full grid grid-cols-3">
          {legends.map((legend) => (
            <div
              className="flex flex-col items-center ap-2"
              key={legend.name}
            >
              <p className={`text-sm text-${legend.color}-500`}>{legend.name}:</p>
              <p className="font-thin text-xs text-neutral-900">{legend.description}</p>
            </div>
          ))}
        </div>
        <PieChart
          centerText={{
            secondaryTitle: t('stats.average_time'),
            title: generateMinutesToHours(Number(responseTime?.minutes ?? 0)),
          }}
          colors={colors(responseTimeVisualRange)}
          width={220}
          height={200}
          data={[
            {
              name: 'Response Time',
              value: responseTimeVisualRange,
            },
            {
              name: '',
              value: chartRange - responseTimeVisualRange,
            },
          ]}
          cx="50%"
          cy="45%"
          innerRadius={80}
          outerRadius={100}
          startAngle={180}
          endAngle={0}
          fill="#8884d8"
          dataKey="value"
          hasTooltip={false}
          hideLegend={false}
        />
      </RenderWhen>
    </Card>
  );
};

export default StatsAverageResponseTimePieChart;
