import { MouseEventHandler } from 'react';

export type ImageSize =
  | 'xs' // 24px
  | 'sm' // 32px
  | 'md' // 40px
  | 'lg' // 48px
  | 'xl' // 56px
  | 'xxl' // 64px
  | 'hg' // 96px
  | 'xhg'; // 128px

export interface ImageProps {
  size: ImageSize;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  alt?: string;
  src?: string;
}
