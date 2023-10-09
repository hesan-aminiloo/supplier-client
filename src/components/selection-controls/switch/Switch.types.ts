import { ComponentPropsWithoutRef } from 'react';
import { Size } from '../types';

export type SwitchProps = Omit<ComponentPropsWithoutRef<'input'>, 'onChange' | 'size'> & {
  id?: string;
  size?: Size;
  onChange?: (value: boolean) => void;
  labelClassName?: string;
  label?: string;
};
