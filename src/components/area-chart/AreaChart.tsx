import React, { FC } from 'react';
import {
  AreaChart as RechartsAreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
} from 'recharts';
import { AreaChartCustomProps } from '@components/area-chart/AreaChart.types';

export const AreaChart: FC<AreaChartCustomProps> = ({
  data,
  responseContainerProps,
  tooltipStyle,
  hideLegend,
  ...rest
}) => {
  return (
    <ResponsiveContainer
      width="100%"
      height="80%"
      {...responseContainerProps}
    >
      <RechartsAreaChart
        {...rest}
        data={data.map((item) => ({ ...item, ...item.areas }))}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis {...rest.yAxisProps} />
        <Tooltip {...tooltipStyle} />
        {hideLegend ? null : (
          <Legend
            align="right"
            verticalAlign="top"
            wrapperStyle={{ top: '-45px' }}
            iconSize={10}
            iconType="circle"
          />
        )}
        {rest.areas.map((area) => (
          // @ts-ignore
          <Area
            key={area.name}
            {...area}
          />
        ))}
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
};
