import { ReactNode } from 'react';

export type Size =
  | 'xs' // 24px
  | 'sm' // 32px
  | 'md' // 40px
  | 'lg' // 48px
  | 'xl' // 56px
  | 'xxl' // 64px
  | 'hg' // 96px
  | 'xhg'; // 128px

export type SizeObject = Record<Size, string | number>;

export type AvatarIndicator = 'online' | 'offline' | 'notification' | 'none';

export interface IAvatarProps {
  size: Size;
  className?: string;
  indicator?: AvatarIndicator;
  onClick?: () => void;
  userName?: string;
  alt?: string;
  src?: string;
  slot?: ReactNode | null;
}
