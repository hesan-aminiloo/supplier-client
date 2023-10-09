import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { IconNames } from '@src/components';

export type BaseProps = {
  children: ReactNode;
};

export interface SideMenuPropsI {
  isOpen: boolean;
  onToggle: () => void;
}

export type SideMenuItemPropsI = ComponentPropsWithoutRef<'div'> & {
  id: string | number;
  label: string;
  to: string | '';
  icon: IconNames;
  isOpen?: boolean;
  isActive?: boolean;
  notifs?: number;
  onClick?: () => void;
};
