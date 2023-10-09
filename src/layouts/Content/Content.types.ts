import { ReactNode } from 'react';
import { SettingsHeaderPropsI } from '@src/components';

export interface BaseProps extends SettingsHeaderPropsI {
  children: ReactNode;
  pageTitle: string;
}
