import { InputProps } from '@components/text-fields/input';

export type PasswordProps = Omit<InputProps, 'rightIcon'> & {
  locked?: boolean;
};
