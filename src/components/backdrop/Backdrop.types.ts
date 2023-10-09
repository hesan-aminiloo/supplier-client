import { ComponentPropsWithoutRef } from 'react';

export type BackdropProps = ComponentPropsWithoutRef<'div'> & {
  color?: string;
  isActive: boolean;
  isFixed?: boolean;
  onClick?: () => void;
};
