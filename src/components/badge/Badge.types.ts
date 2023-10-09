import { ComponentPropsWithoutRef } from 'react';

export type BadgeSizeType = 'sm' | 'md' | 'lg';

export type BadgeColors =
  | 'primary'
  | 'destructive'
  | 'warning'
  | 'success'
  | 'analogousIndigo'
  | 'neutral'
  | 'analogousTeal';

export type BadgeVariants = 'tertiary' | 'secondary';

export type BadgeProps = ComponentPropsWithoutRef<'div'> & {
  className?: string;
  size?: BadgeSizeType;
  color?: BadgeColors;
  variant?: BadgeVariants;
};
