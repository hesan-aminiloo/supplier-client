import React, { FC } from 'react';
import { BarChartCustomProps } from '@components/bar-chart/BarChart.types';
import {
  BarChart as RechartsBarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export const BarChart: FC<BarChartCustomProps> = ({
  data,
  responseContainerProps,
  tooltipProps,
  hideLegend,
  shape,
  ...rest
}) => {
  return (
    <ResponsiveContainer
      width="100%"
      height="90%"
      {...responseContainerProps}
    >
      <RechartsBarChart
        {...rest}
        data={data.map((item) => ({ ...item, ...item.bars }))}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis {...rest.yAxisProps} />
        <Tooltip {...tooltipProps} />
        {hideLegend ? null : (
          <Legend
            align="right"
            verticalAlign="top"
            wrapperStyle={{ top: '-45px' }}
            iconSize={10}
            iconType="circle"
          />
        )}
        {rest.bars.map((bar) => (
          // @ts-ignore
          <Bar
            key={bar.dataKey.toString()}
            {...bar}
            shape={shape}
          >
            {data.map((entry) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={bar.fill}
              />
            ))}
          </Bar>
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};
