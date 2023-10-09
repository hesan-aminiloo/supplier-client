import { SizeObject, AvatarIndicator } from './Avatar.types';

export const AVATAR_TEXT_SIZE: SizeObject = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  xxl: 'text-2xl',
  hg: 'text-4xl',
  xhg: 'text-[56px]',
};

export const AVATAR_INDICATOR_COLOR: Record<AvatarIndicator, string> = {
  online: 'bg-success-500',
  offline: 'bg-destructive-500',
  notification: 'bg-primary-500',
  none: 'bg-transparent',
};
