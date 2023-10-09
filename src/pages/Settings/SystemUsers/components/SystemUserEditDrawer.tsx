/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import {
  FormPassword,
  Icon,
  ModalDrawer,
  DrawerHeader,
  DrawerFooter,
  DrawerPlacement,
  FileUploader,
  Avatar,
  FormMultiSelect,
  FormSwitch,
} from '@src/components';
import RenderWhen from '@src/components/RenderWhen';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Theme } from '@src/style';
import { MAX_IMAGE_SIZE, generateImageUrl } from '@src/utils';
import { useSystemUsersForm } from '../hooks/EditSystemUsers.tools';
import { SystemUserEditDrawerProps } from '../SystemUsers.types';
import { FORM_ELEMENTS } from './Form/Form.constants';
import { EnumRoles, FormElementProps } from './Form/Form.types';

const EditSystemUserDrawer: React.FC<SystemUserEditDrawerProps> = ({
  isOpen,
  onClose,
  setDeletePopupOpen,
  user,
  getSystemUsersList,
  branches,
}) => {
  const { t } = useTranslation();
  const { methods, onSubmit, isLoading } = useSystemUsersForm(onClose, getSystemUsersList, user.id, user);
  const [filePreview, setFilePreview] = useState('');
  const [file, setFile] = useState<File | string>();
  const [logoSize, setLogoSize] = useState<number>(0);
  const [role, setRole] = useState<string>('');
  const avatar = methods.getValues('avatar');
  const inputRef = React.useRef<HTMLInputElement>(null);
  const roleWatch = methods.watch('role');

  useEffect(() => {
    if (file) {
      methods.setValue('avatar', file);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  useEffect(() => {
    setRole(methods.getValues('role'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleWatch]);

  return (
    <ModalDrawer
      isOpen={isOpen}
      type="drawer"
      placement={DrawerPlacement.Right}
      onClosed={onClose}
    >
      <DrawerHeader
        title={t('settings.system_users.system_user_details')}
        onClose={onClose}
      />

      <div className="pt-6 px-6 bg-neutral-100 h-full">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex justify-between flex-col h-full"
          >
            <div>
              <div className="grid grid-cols-2 grid-rows-2 gap-6 !z-10">
                {FORM_ELEMENTS.map((input: FormElementProps) => (
                  <div key={input.name}>
                    <input.component
                      label={t(input.label)}
                      control={methods.control}
                      disabled={isLoading}
                      options={input.options ?? []}
                      id={`${input.name}-input`}
                      leftIcon={
                        <Icon
                          size="sm"
                          name={input.LeftIcon}
                        />
                      }
                      name={input.name}
                      placeholder={input.placeholder ? t(input.placeholder) : undefined}
                    />
                  </div>
                ))}
                <FormMultiSelect
                  label={t('settings.system_users.form.branch')}
                  name="branch"
                  leftIcon={
                    <Icon
                      size="sm"
                      name="building"
                    />
                  }
                  options={branches?.map((branch) => {
                    return {
                      label: branch.name,
                      value: branch.id,
                    };
                  })}
                />
                <RenderWhen is={role === EnumRoles.USER}>
                  <div>
                    <div className="flex justify-between items-center flex-1 h-[44px] mt-6 bg-white px-3 rounded-xl">
                      <span className="text-sm">{t('settings.system_users.form.permission_to_add_customers')}</span>
                      <FormSwitch
                        name="addCustomersPermission"
                        control={methods.control}
                      />
                    </div>
                  </div>
                </RenderWhen>
              </div>
              <div className="grid grid-cols-2 border-t border-b border-stroke-12 py-5 mt-10 gap-x-8">
                <FormPassword
                  label={t('settings.system_users.form.password')}
                  leftIcon={
                    <Icon
                      name="lock-1"
                      size="sm"
                    />
                  }
                  name="password"
                  id="password-input"
                  control={methods.control}
                  placeholder={t('settings.system_users.form.password')}
                  fullWidth
                  disabled={isLoading}
                />
                <FormPassword
                  label={t('settings.system_users.form.confirm_password')}
                  leftIcon={
                    <Icon
                      name="lock-1"
                      size="sm"
                    />
                  }
                  name="password_confirmation"
                  id="password_confirmation-input"
                  control={methods.control}
                  placeholder={t('settings.system_users.form.repeat_password')}
                  fullWidth
                  disabled={isLoading}
                />
              </div>
              <div className="py-4 border-b border-stroke-12">
                <div>
                  {filePreview || avatar ? (
                    <div className="py-4">
                      <Avatar
                        size="xhg"
                        src={filePreview || generateImageUrl(avatar as string)}
                        slot={
                          <>
                            <input
                              id="logo"
                              type="file"
                              className="hidden"
                              ref={inputRef}
                              accept="image/*"
                              onChange={() => {
                                const files = inputRef.current?.files;
                                if (files?.length) {
                                  if (files[0]) {
                                    const reader = new FileReader();
                                    reader.readAsDataURL(files[0]);
                                    reader.onload = () => {
                                      if (files[0].size < MAX_IMAGE_SIZE) {
                                        const objectUrl = URL.createObjectURL(files[0]);
                                        setFilePreview(objectUrl);
                                        setFile(files[0]);
                                      }
                                      setLogoSize(files[0].size);
                                    };
                                  }
                                }
                              }}
                            />
                            <div
                              role="button"
                              className="w-10 h-10 absolute bottom-0 right-0 rounded-full bg-white flex items-center justify-center border border-stroke-4 shadow-sm"
                              onClick={() => inputRef.current?.click()}
                            >
                              <Icon
                                name="edit-2"
                                size="sm"
                                color={Theme.colors.primary500}
                              />
                            </div>
                          </>
                        }
                      />
                      {logoSize > MAX_IMAGE_SIZE ? (
                        <p className="text-destructive-600 pt-2 ">{t('settings.account_details.error_image_size')}</p>
                      ) : null}
                    </div>
                  ) : (
                    <FileUploader
                      onSelectFile={(files: File[]) => {
                        const objectUrl = URL.createObjectURL(files[0]);
                        setFilePreview(objectUrl);
                        setFile(files[0]);
                      }}
                      control={methods.control}
                      name="avatar"
                    />
                  )}
                </div>
                {logoSize > MAX_IMAGE_SIZE ? (
                  <p className="text-destructive-600 ">{t('settings.company_info.error_image_size')}</p>
                ) : null}
              </div>
            </div>
            <DrawerFooter
              title={t('settings.system_users.save_changes')}
              hasDelete
              onDelete={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onClose();
                setDeletePopupOpen(true);
              }}
              onSubmit={methods.handleSubmit(onSubmit)}
            />
          </form>
        </FormProvider>
      </div>
    </ModalDrawer>
  );
};

export default EditSystemUserDrawer;
