import React, { ReactNode } from 'react';
import { Badge, BadgeProps, Icon, IconProps } from '@src/components';
import clsx from 'clsx';

export interface StatsCardProps {
  iconProps: IconProps;
  badgeProps: BadgeProps;
  title: string;
  value: string | number | ReactNode;
  className?: string;
  preFix?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ iconProps, badgeProps, className, title, value }) => {
  return (
    <div className={clsx('bg-white rounded-xl h-28 flex gap-3 items-center px-4 2xl:px-6 2xl:gap-6', className)}>
      <Badge {...badgeProps}>
        <Icon {...iconProps} />
      </Badge>
      <div className="flex flex-col gap-1">
        <div className="text-neutral-500 text-sm">{title}</div>
        <div className="text-gray-900 text-lg font-bold">{value}</div>
      </div>
    </div>
  );
};

export default StatsCard;
