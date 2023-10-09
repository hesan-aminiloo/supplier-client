import { IconNames } from '@src/components';
import { SettingsModules } from '@src/types';

export interface SettingsItemProps {
  id: SettingsModules;
  title: string;
  to: SettingsModules;
  description?: string;
  icon: IconNames;
  isHidden?: boolean;
}
