import { DrawerHeader, ModalDrawer, DrawerPlacement, Button, Icon } from '@src/components';
import { Theme } from '@src/style';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface ConfirmationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  handleDeleteUser: (userId: number | string[]) => void;
  userId: number | string[];
}

const ConfirmationDrawer: React.FC<ConfirmationDrawerProps> = ({ isOpen, userId, onClose, handleDeleteUser }) => {
  const { t } = useTranslation();
  console.log(onClose);

  return (
    <ModalDrawer
      isOpen={isOpen}
      type="modal"
      placement={DrawerPlacement.Top}
      onClosed={onClose}
      className="w-[444px] "
    >
      <DrawerHeader
        onClose={onClose}
        className="border-none !bg-neutral-100"
      />
      <div className="flex flex-col justify-center items-center -translate-y-14">
        <Button
          variant="tertiary"
          leftIcon={
            <Icon
              name="message-question"
              color={Theme.colors.destructive500}
            />
          }
          className="w-12 h-12"
        />
        <h4 className="text-neutral-800 mt-5 text-xl text-center font-bold flex-grow">
          {t('settings.system_users.modal.delete_users')}
        </h4>
        <p className="text-center px-3 mt-2  text-neutral-500">{t('settings.system_users.modal.are_you_sure')}</p>
      </div>

      <div className="flex w-full px-5 mb-4 justify-between">
        <Button
          variant="tertiary"
          className="w-[189px]"
        >
          {t('settings.system_users.modal.back')}
        </Button>
        <Button
          className="w-[189px]"
          color="destructive"
          onClick={() => handleDeleteUser(userId)}
        >
          {t('settings.system_users.modal.continue')}
        </Button>
      </div>
    </ModalDrawer>
  );
};

export default ConfirmationDrawer;
