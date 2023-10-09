import React, { SyntheticEvent, useEffect, useState } from 'react';
import clsx from 'clsx';

import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { successToast } from '@src/utils';

import { Card, Button, ModalDrawer, DrawerHeader, DrawerPlacement, FormInput, Icon } from '@src/components';
import { Theme } from '@src/style';

import { FormProvider } from 'react-hook-form';
import phoneImage from '@src/assets/images/phone.png';

import PopUp from '@src/components/pop-up/PopUp';
import { useChangeUserStatus, useRemoveUserDevice, useUserDetailsDrawerForm } from '../GarageCustomerDetails.tools';
import { UserDetailsDrawerProps } from '../GarageCustomerDetails.types';

export const UserDetailsDrawer: React.FC<UserDetailsDrawerProps> = ({
  isOpen,
  userId,
  garageId,
  email,
  username,
  phone,
  status,
  onClose,
  device_name,
  firstLogin,
  lastLogin,
  location,
}) => {
  const { t } = useTranslation();
  const { methods, isLoading } = useUserDetailsDrawerForm();
  const [active, setActive] = useState<number>(status);
  const [isChangeStatusOpen, setChangeStatusOpen] = useState(false);
  const changeUserStatus = useChangeUserStatus();
  const removeUserDevice = useRemoveUserDevice();

  useEffect(() => {
    setActive(status);
  }, [status]);

  const handleStatusChange = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    changeUserStatus.mutateAsync({ garageId, id: userId, active: active === 1 ? 0 : 1 }).then(() => {
      setActive(active === 1 ? 0 : 1);
      setChangeStatusOpen(false);
    });
  };
  const handleRemoveUserDevice = (e: SyntheticEvent) => {
    e.preventDefault();
    removeUserDevice.mutateAsync({ garage: garageId, user: userId }).then(() => {
      successToast({ message: `${username ?? 'User'} device has been removed` });
      onClose(true);
    });
  };

  return (
    <ModalDrawer
      isOpen={isOpen}
      type="modal"
      placement={DrawerPlacement.Bottom}
      onClosed={() => onClose()}
      bodyClassName="border rounded-t-xl  bg-neutral-100 "
      // className="!h-min"
      // isFullHeight
    >
      <DrawerHeader
        title={t('garage_customer_details.user_details_modal.user_info')}
        onClose={() => onClose()}
      />

      {isLoading ? (
        <span>loading...</span>
      ) : (
        <div className="flex flex-col p-8">
          <div className="flex w-full gap-x-8 ">
            <Card
              className={clsx({
                'w-3/5': !!device_name,
                'w-full': !device_name,
              })}
            >
              <FormProvider {...methods}>
                <form className="h-full flex flex-col justify-between">
                  <div className="pb-8 grid grid-cols-3 2xl:grid-cols-4 gap-6">
                    <FormInput
                      control={methods.control}
                      label={t('settings.account_details.user_name')}
                      id="userName"
                      name="userName"
                      placeholder={t('settings.account_details.user_name')}
                      disabled
                      value={username}
                      leftIcon={
                        <Icon
                          name="user"
                          size="sm"
                        />
                      }
                    />
                    <FormInput
                      control={methods.control}
                      label={t('settings.account_details.phone')}
                      id="phone"
                      name="phone"
                      placeholder={t('settings.account_details.phone')}
                      disabled
                      value={phone}
                      leftIcon={
                        <Icon
                          name="mobile"
                          size="sm"
                        />
                      }
                    />
                    <FormInput
                      control={methods.control}
                      label={t('settings.account_details.email')}
                      id="email"
                      name="email"
                      placeholder={t('settings.account_details.email')}
                      disabled
                      value={email}
                      leftIcon={
                        <Icon
                          name="sms"
                          size="sm"
                        />
                      }
                    />
                  </div>
                  {/* <div className="mt-8   grid grid-cols-3 gap-6">
                    {PASSWORD_FIELDS.map(({ name, label, placeholder, leftIcon }) => (
                      <FormPassword
                        key={name}
                        // control={methods.control}
                        label={t(label)}
                        id={name}
                        name={name}
                        placeholder={t(placeholder)}
                        disabled
                        leftIcon={
                          <Icon
                            name={leftIcon}
                            size="sm"
                          />
                        }
                      />
                    ))}
                  </div> */}
                  <div className="mt-8 flex justify-between">
                    <Button
                      leftIcon={
                        <Icon
                          name="play-circle"
                          size="sm"
                          color={active === 1 ? Theme.colors.warning600 : Theme.colors.success600}
                        />
                      }
                      variant="secondary"
                      color={active === 1 ? 'warning' : 'success'}
                      className="flex gap-3"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setChangeStatusOpen(true);
                      }}
                    >
                      {active === 1
                        ? t('garage_customer_details.user_details_modal.suspend')
                        : t('garage_customer_details.user_details_modal.activate')}
                    </Button>
                  </div>
                </form>
              </FormProvider>
            </Card>
            {device_name ? (
              <Card className="w-2/5 flex flex-col">
                <div className="flex justify-between items-center mt-2">
                  <div className="flex gap-2 flex-col">
                    <span className="text-xl font-bold">{device_name}</span>
                    <span className="text-neutral-700">{location}</span>
                    <span className="text-neutral-700">
                      {lastLogin ? moment(lastLogin, 'DD.MM.YYYY - hh:mm').fromNow() : null}
                    </span>
                    <span className="text-neutral-700">
                      {t('garage_customer_details.user_details_modal.first_log')}: {moment(firstLogin).format('LL')}
                    </span>
                  </div>
                  <img
                    src={phoneImage}
                    alt="img"
                    className="w-36"
                  />
                </div>
                <Button
                  className="w-44 mt-20"
                  color="destructive"
                  onClick={handleRemoveUserDevice}
                  loading={removeUserDevice.isLoading}
                >
                  {t('garage_customer_details.user_details_modal.remove_device')}
                </Button>
              </Card>
            ) : null}
            <PopUp
              title={t('settings.system_users.modal.change_status')}
              description={t('settings.system_users.modal.change_status_description')}
              height="h-full"
              isOpen={isChangeStatusOpen}
              submit={handleStatusChange}
              isLoading={changeUserStatus.isLoading}
              onClose={() => setChangeStatusOpen(false)}
            />
          </div>
        </div>
      )}
    </ModalDrawer>
  );
};

export default UserDetailsDrawer;
