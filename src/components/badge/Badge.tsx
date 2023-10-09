import React, { FC } from 'react';
import { BadgeProps } from '@components/badge';
import clsx from 'clsx';
import { BADGE_COLORS, BADGE_SIZES } from '@components/badge/Badge.constants';

export const Badge: FC<BadgeProps> = ({
  children,
  className,
  size = 'md',
  variant = 'tertiary',
  color = 'primary',
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={clsx('inline-block rounded-lg p-2.5', BADGE_SIZES[size], BADGE_COLORS[variant][color], className)}
    >
      {children}
    </div>
  );
};
