import { ComponentPropsWithoutRef, ReactNode, MouseEvent } from 'react';

export type ButtonSizeType = 'sm' | 'md' | 'lg';

export type ButtonColors =
  | 'primary'
  | 'neutral'
  | 'indigo'
  | 'teal'
  | 'destructive'
  | 'warning'
  | 'success'
  | 'analogousIndigo';

export type ButtonVariants = 'solid' | 'secondary' | 'tertiary' | 'text' | 'outline';

export enum ButtonRadius {
  sm = 7,
  md = 11,
  lg = 13,
}

export type IButtonProps = ComponentPropsWithoutRef<'button'> & {
  className?: string;
  loading?: boolean;
  size?: ButtonSizeType;
  isClickableOnDisabled?: boolean;
  fullWidth?: boolean;
  variant?: ButtonVariants;
  color?: ButtonColors;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onClick?: (e: MouseEvent, ...args: any) => void;
};
