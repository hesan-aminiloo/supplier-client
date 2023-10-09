import { ComponentPropsWithoutRef } from 'react';
import { Size } from '../types';

export type RadioProps = Omit<ComponentPropsWithoutRef<'input'>, 'size'> & {
  label?: string;
  value: string;
  size?: Size;
};
