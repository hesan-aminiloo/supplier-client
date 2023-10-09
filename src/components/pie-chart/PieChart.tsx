import React, { FC } from 'react';
import { PieChart as RechartsPieChart, Pie, ResponsiveContainer, Sector, Legend, Cell, Tooltip } from 'recharts';
import { CenterTextProps, PieChartCustomProps } from '@components/pie-chart/PieChart.types';

const renderActiveShape = (hasActiveShape: boolean, centerText?: CenterTextProps) => (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      {centerText && (
        <>
          {centerText.secondaryTitle && (
            <text
              x={cx}
              y={cy}
              dy={-8}
              textAnchor="middle"
              className="text-neutral-400 text-xs"
            >
              {centerText.secondaryTitle}
            </text>
          )}
          {centerText.title && (
            <text
              x={cx}
              y={cy}
              dy={12}
              textAnchor="middle"
              className="font-bold"
            >
              {centerText.title}
            </text>
          )}
        </>
      )}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius * (hasActiveShape ? 1.1 : 1)}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

export const PieChart: FC<PieChartCustomProps> = ({
  hideLegend,
  responseContainerProps,
  tooltipStyle,
  hasTooltip,
  centerText,
  hasActiveShape,
  ...rest
}) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      {...responseContainerProps}
    >
      <RechartsPieChart
        width={rest.width}
        height={rest.height}
      >
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape(!!hasActiveShape, centerText)}
          onMouseEnter={onPieEnter}
          {...rest}
        >
          {rest.data.map((entry, index) => (
            <Cell
              key={`cell-${entry.name}-${entry.value}`}
              fill={rest.colors[index % rest.colors.length]}
            />
          ))}
        </Pie>
        {hasTooltip && <Tooltip {...tooltipStyle} />}
        {!hideLegend && (
          <Legend
            layout="horizontal"
            align="center"
            verticalAlign="bottom"
            iconSize={10}
            iconType="circle"
            wrapperStyle={{ bottom: '45px', fontSize: '12px' }}
            {...rest.legendProps}
          />
        )}
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};
