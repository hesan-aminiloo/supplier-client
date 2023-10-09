import { ComponentPropsWithoutRef, ReactElement } from 'react';

export type RadioGroupProps = ComponentPropsWithoutRef<'div'> & {
  name?: string;
  vertical?: boolean;
  children?: ReactElement[];
  onChange?: (value: string) => void;
  helperText?: string;
  state?: 'error' | 'none';
};
