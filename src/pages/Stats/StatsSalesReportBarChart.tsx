import React from 'react';

// components
import { BarChart, Card } from '@src/components';
import { Theme } from '@src/style';
import { BarProps } from 'recharts';
import { SalesReportProps } from '@src/pages/Stats/Stats.types';
import { useTranslation } from 'react-i18next';
import { generateMonthName } from '@src/utils';
import RenderWhen from '@components/RenderWhen';
import { ChartEmptyState } from '@src/pages/Stats/assets';

const bars: BarProps[] = [
  {
    name: 'Quotes',
    dataKey: 'quotes',
    fill: Theme.colors.success600,
  },
  {
    name: 'Orders',
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

export const StatsSalesReportBarChart: React.FC<SalesReportProps> = ({ data }) => {
  const { t } = useTranslation();
  return (
    <Card
      header={{
        secondaryTitle: t('stats.compare_orders_and_quotes'),
        title: t('stats.sales_report'),
        className: '!border-b-0 !py-0 !mb-0',
      }}
      className="bg-white col-span-2 rounded-xl h-80 p-6"
    >
      <RenderWhen is={data.length === 0}>
        <div className="flex w-full h-40 items-center justify-center">
          <ChartEmptyState />
        </div>
      </RenderWhen>
      <RenderWhen is={data.length > 0}>
        <BarChart
          yAxisProps={{
            unit: 'K',
          }}
          bars={bars}
          data={data.map((item) => ({
            name: `${generateMonthName(item.month)} ${item.year}`,
            bars: {
              quotes: Number(item.quotes),
              orders: Number(item.orders),
            },
          }))}
          width={200}
          height={150}
          shape={<RoundedRect />}
        />
      </RenderWhen>
    </Card>
  );
};

export default StatsSalesReportBarChart;
