import React, { useState } from 'react';

// hooks
import { useTranslation } from 'react-i18next';

// Components
import SettingsHeader from '@components/SettingsHeader';
import { Card } from '@src/components';

import { NOTIFICATION_SETTINGS_OPTIONS } from './NotificationSettings.constants';
import { NotificationSettingsItem } from './NotificationSettingsItem';
import { NotificationSettingsItemProps } from './NotificationSettings.types';
import { groupByColumn } from './NotificationSettings.tools';

export const NotificationSettings: React.FC = () => {
  const [items, setItems] = useState(NOTIFICATION_SETTINGS_OPTIONS);
  const { t } = useTranslation();

  const handleCheckboxChange: NotificationSettingsItemProps['onChange'] = (id, value) => {
    setItems((prev) => {
      return prev.map((option) => {
        if (option.id === id) option.checked = value;
        return option;
      });
    });
  };

  return (
    <>
      <SettingsHeader
        className="pb-8 border-b border-stroke-12"
        canGoBack
      >
        {t('notifications.notifications')}
      </SettingsHeader>

      <div className="pt-12 flex justify-between gap-8">
        {}

        {Object.entries(groupByColumn(items)).map(([col, options]) => (
          <Card
            key={col}
            className="w-full"
          >
            {options.map((option) => (
              <NotificationSettingsItem
                key={option.id}
                {...option}
                onChange={handleCheckboxChange}
              />
            ))}
          </Card>
        ))}
      </div>
    </>
  );
};

export default NotificationSettings;
