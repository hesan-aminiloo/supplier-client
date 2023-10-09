import React from 'react';

// components
import { BarChart, Card } from '@src/components';
import { Theme } from '@src/style';
import { BarProps } from 'recharts';
import { CustomerActivityBarChartProps } from '@src/pages/Stats/Stats.types';
import { useTranslation } from 'react-i18next';
import { generateMonthName } from '@src/utils';
import RenderWhen from '@components/RenderWhen';
import { ChartEmptyState } from '@src/pages/Stats/assets';

const bars: BarProps[] = [
  {
    name: 'Quote',
    dataKey: 'quotes',
    fill: Theme.colors.success600,
  },
  {
    name: 'Order',
    dataKey: 'orders',
    fill: Theme.colors.primary600,
  },
];

const getPath = (
  x: number,
  y: number,
  width: number,
  height: number,
  topLeftRadius: number,
  topRightRadius: number,
  bottomLeftRadius: number,
  bottomRightRadius: number
) => {
  const curveTopLeft = Math.min(width / 2, height / 2, topLeftRadius);
  const curveTopRight = Math.min(width / 2, height / 2, topRightRadius);
  const curveBottomLeft = Math.min(width / 2, height / 2, bottomLeftRadius);
  const curveBottomRight = Math.min(width / 2, height / 2, bottomRightRadius);
  return `M ${x + curveTopLeft} ${y}
          L ${x + width - curveTopRight} ${y}
          Q ${x + width} ${y} ${x + width} ${y + curveTopRight}
          L ${x + width} ${y + height - curveBottomRight}
          Q ${x + width} ${y + height} ${x + width - curveBottomRight} ${y + height}
          L ${x + curveBottomLeft} ${y + height}
          Q ${x} ${y + height} ${x} ${y + height - curveBottomLeft}
          L ${x} ${y + curveTopLeft}
          Q ${x} ${y} ${x + curveTopLeft} ${y}
          Z`;
};

const RoundedRect = (props: any) => {
  const { fill, x, y, width, height } = props;
  return (
    <path
      d={getPath(x, y, width / 4, height, 12, 12, 0, 0)}
      stroke="none"
      fill={fill}
    />
  );
};

export const StatsCustomerActivityBarChart: React.FC<CustomerActivityBarChartProps> = ({ data }) => {
  const { t } = useTranslation();
  const customerTotalActivity: number = data
    .map((item) => Number(item.quotes ?? 0) + Number(item.orders ?? 0))
    .reduce((a, b) => a + b, 0);
  return (
    <Card
      header={{
        title: customerTotalActivity,
        secondaryTitle: t('stats.customers_activity'),
        className: '!border-b-0 !py-0 !mb-0',
      }}
      className="bg-white col-span-2 rounded-xl h-80 p-6 capitalize"
    >
      <RenderWhen is={data.length === 0}>
        <div className="flex w-full  h-48 items-center justify-center">
          <ChartEmptyState />
        </div>
      </RenderWhen>
      <RenderWhen is={data.length > 0}>
        <BarChart
          bars={bars}
          data={data.map((item) => ({
            name: `${generateMonthName(item.month)} ${item.year}`,
            bars: {
              quotes: Number(item.quotes ?? 0),
              orders: Number(item.orders ?? 0),
            },
          }))}
          width={600}
          height={239}
          shape={<RoundedRect />}
        />
      </RenderWhen>
    </Card>
  );
};

export default StatsCustomerActivityBarChart;
