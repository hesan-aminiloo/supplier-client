import { CSSProperties, ReactNode } from 'react';

export interface ICardProps {
  children: ReactNode;
  className?: string;
  header?: {
    icon?: ReactNode;
    title?: string | number;
    className?: string;
    secondaryTitle?: string;
  };
  style?: CSSProperties;
}
