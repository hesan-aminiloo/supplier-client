import React, { ReactNode } from 'react';
import { Badge, BadgeProps, Icon, IconProps } from '@src/components';
import clsx from 'clsx';

export interface PricingCardProps {
  iconProps: IconProps;
  badgeProps: BadgeProps;
  title: string;
  value: string | number | ReactNode;
  className?: string;
}

export const PricingCard: React.FC<PricingCardProps> = ({ iconProps, badgeProps, className, title, value }) => {
  return (
    <div className={clsx('bg-white rounded-xl h-24 flex gap-4 items-center px-6', className)}>
      <Badge {...badgeProps}>
        <Icon {...iconProps} />
      </Badge>
      <div className="flex flex-col gap-1">
        <div className="text-gray-900 text-lg font-bold">{value}</div>
        <div className="text-neutral-500 text-sm first-letter:capitalize">{title}</div>
      </div>
    </div>
  );
};

export default PricingCard;
