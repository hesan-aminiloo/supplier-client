// @ts-ignore
import { BarChartProps, ContentRenderer } from '@types/recharts';
import * as React from 'react';
import { BarProps, RectangleProps, ResponsiveContainerProps, TooltipProps, YAxisProps } from 'recharts';

export interface BarChartCustomProps extends BarChartProps {
  responseContainerProps?: Omit<ResponsiveContainerProps, 'children'>;
  data: {
    name: string;
    bars: {
      [key: string]: number;
    };
  }[];
  bars: BarProps[];
  shape?: React.ReactElement | ContentRenderer<RectangleProps> | any;
  yAxisProps?: YAxisProps;
  hideLegend?: boolean;
  tooltipProps?: TooltipProps<any, any>;
}
