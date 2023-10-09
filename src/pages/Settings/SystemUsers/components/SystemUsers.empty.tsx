import { useTranslation } from 'react-i18next';
import { Button, Icon } from '@src/components';
import { Theme } from '@src/style';
import { SystemUsersEmptyImage } from '../assets/SystemUsersEmtyImage';

export const SystemUsersEmptyState = ({ onAddSystemUsers }: { onAddSystemUsers: () => void }) => {
  const { t } = useTranslation();
  return (
    <div className="mt-4 bg-white w-full h-full flex flex-col justify-center content-center py-28 rounded-2xl shadow-sm">
      <div className="mb-10 flex justify-center">
        <SystemUsersEmptyImage />
      </div>
      <div className="text-center max-w-[355px] mx-auto">
        <p className="text-neutral-500 font-bold mb-2 text-xl">
          {t('settings.system_users.you_dont_have_any_system_user')}
        </p>
        <p className="text-neutral-500 text-sm">{t('settings.system_users.to_add_your_user_and_util')}</p>
      </div>
      <div className="flex justify-center mt-8">
        <Button
          className="h-11 flex items-center justify-center w-52"
          onClick={onAddSystemUsers}
          leftIcon={
            <Icon
              name="add"
              color={Theme.colors.white}
              className="mr-1"
            />
          }
        >
          {t('settings.system_users.add_new_user')}
        </Button>
      </div>
    </div>
  );
};
