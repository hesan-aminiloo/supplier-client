import { FC } from 'react';

// hooks
import { useTranslation } from 'react-i18next';

// Components
import { Button } from '@src/components/button';
import { Icon, SettingsHeader } from '@src/components';
import { Theme } from '@src/style';

const SystemUserHeader: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between pb-8 border-b border-stroke-12">
      <SettingsHeader canGoBack>{t('settings.system_users.system_users')}</SettingsHeader>

      <Button
        leftIcon={
          <Icon
            name="add"
            color={Theme.colors.white}
          />
        }
        className="h-11 rounded-xl flex items-center text-sm justify-center
             text-white w-52"
      >
        {t('settings.system_users.add_new_user')}
      </Button>
    </div>
  );
};

export default SystemUserHeader;
