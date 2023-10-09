import React from 'react';

// hooks
import { useTranslation } from 'react-i18next';
import { useStore } from 'zustand';
import { coreStore } from '@src/store/core';

// Components
import SettingsHeader from '@components/SettingsHeader';
import { SettingsItem } from './SettingsItem';
import { SETTINGS_ITEMS } from './SettingsLanding.constants';

export const SettingsLanding: React.FC = () => {
  const { t } = useTranslation();
  const { permissions } = useStore(coreStore);
  return (
    <>
      <SettingsHeader className="mb-12">{t('settings.landing.settings')}</SettingsHeader>
      <div className="grid lg:grid-cols-3 grid-rows-2 gap-8">
        {SETTINGS_ITEMS.map((props) => (
          <SettingsItem
            key={props.id}
            {...props}
            isHidden={permissions ? !permissions?.[props.id]?.view : false}
          />
        ))}
      </div>
    </>
  );
};

export default SettingsLanding;
