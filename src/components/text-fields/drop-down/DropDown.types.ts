import { InputProps } from '../input';

export type DropDownProps = Omit<InputProps, 'onChange' | 'ref'> & {
  open?: boolean;
  deviceType?: 'mobile' | 'desktop';
  delay?: string;
  hideRightIcon?: boolean;
  contentClassNames?: string;
};

export type DropDownOption = {
  value: string | number | boolean;
  label: string | number;
};
