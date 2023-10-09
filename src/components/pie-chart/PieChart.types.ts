// @ts-ignore
import { PieChartProps } from '@types/recharts';
// @ts-ignore
import { BoxSize, LegendProps, ResponsiveContainerProps, TooltipProps } from 'recharts';

export interface CenterTextProps {
  secondaryTitle?: string | number;
  title?: string | number;
}

export interface PieChartCustomProps extends PieChartProps {
  responseContainerProps?: Omit<ResponsiveContainerProps, 'children'>;
  data: {
    name: string;
    value: number;
  }[];
  fill: string;
  dataKey: string;
  colors: string[];
  legendProps?: LegendProps & BoxSize;
  hideLegend?: boolean;
  centerText?: CenterTextProps;
  hasTooltip?: boolean;
  hasActiveShape?: boolean;
  tooltipStyle?: TooltipProps<any, any>;
}
