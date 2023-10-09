import { Switch } from '@src/components';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { NotificationSettingsItemProps } from './NotificationSettings.types';

import styles from './NotificationSettings.module.scss';

export const NotificationSettingsItem = (props: NotificationSettingsItemProps) => {
  const { className, label, onChange, checked, id } = props;
  const { t } = useTranslation();

  return (
    <div
      className={clsx(
        'pb-6 flex justify-between items-center',
        styles['notification-settings__notification-item'],
        className
      )}
    >
      <span className="text-neutral-700 flex-grow">{t(label)}</span>
      <span>
        <Switch
          value={id}
          checked={checked}
          name="notification-item"
          onChange={(value) => {
            onChange(id, value);
          }}
        />
      </span>
    </div>
  );
};
