import { ComponentPropsWithoutRef } from 'react';
import { Size } from '../types';

export type CheckboxProps = Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'onChange' | 'value' | 'id'> & {
  id?: string;
  label?: string;
  value: string;
  onChange?: (value: boolean) => void;
  size?: Size;
};
