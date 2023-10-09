import { ReactNode } from 'react';

import { BasicInputProps } from '../basic';

export type InputStatus = 'error' | 'none' | 'valid';

export type InputProps = Omit<BasicInputProps, 'onChange'> & {
  label?: string;
  id?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  status?: InputStatus;
  fullWidth?: boolean;
  error?: string;
  onChange?: (value: string) => void;
  helperText?: string;
  labelClassName?: string;
  inputClassName?: string;
};
