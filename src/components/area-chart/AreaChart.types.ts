// @ts-ignore
import { AreaChartProps } from '@types/recharts';
import { YAxisProps, AreaProps, TooltipProps, ResponsiveContainerProps } from 'recharts';

export interface AreaChartCustomProps extends AreaChartProps {
  responseContainerProps?: Omit<ResponsiveContainerProps, 'children'>;
  data: {
    name: string;
    areas: {
      [key: string]: number;
    };
  }[];
  areas: AreaProps[];
  yAxisProps?: YAxisProps;
  hideLegend?: boolean;
  tooltipStyle?: TooltipProps<any, any>;
}
