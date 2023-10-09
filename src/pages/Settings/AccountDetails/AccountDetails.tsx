/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { MAX_IMAGE_SIZE, generateImageUrl } from '@src/utils';
// hooks
import { useTranslation } from 'react-i18next';

// Components
import { Button, Avatar, SettingsHeader, FormInput, FormPassword, Icon, FileUploader } from '@src/components';

// constants
import { Theme } from '@src/style';
import { ACCOUNT_FIELDS, PASSWORD_FIELDS } from './AccountDetails.constants';
import { useAccountDetailsForm } from './AccountDetails.tools';

const AccountDetails: React.FC = () => {
  const { t } = useTranslation();
  const { methods, onSubmit, isLoading } = useAccountDetailsForm();
  const { isDirty } = methods.formState;
  const [filePreview, setFilePreview] = useState('');
  const [logoSize, setLogoSize] = useState<number>(0);
  const [file, setFile] = useState<File | string>();
  const avatar = methods.getValues('avatar');
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (file) {
      methods.setValue('avatar', file);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return (
    <>
      <SettingsHeader
        className="pb-8 border-b border-stroke-12"
        canGoBack
      >
        {t('settings.account_details.account_details')}
      </SettingsHeader>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="py-12 border-b border-stroke-12">
            <div>
              {filePreview || avatar ? (
                <div className="">
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
                    <p className="text-destructive-600 py-4 ">{t('settings.account_details.error_image_size')}</p>
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
          </div>
          <div className="py-12 border-b border-stroke-12 grid grid-cols-4 gap-8">
            {ACCOUNT_FIELDS.map(({ name, label, placeholder, leftIcon, disabled, rightIcon }) => (
              <FormInput
                key={name}
                control={methods.control}
                label={t(label)}
                id={name}
                name={name}
                placeholder={t(placeholder)}
                disabled={disabled || isLoading}
                leftIcon={
                  <Icon
                    name={leftIcon}
                    size="sm"
                  />
                }
                rightIcon={rightIcon}
              />
            ))}
          </div>
          <div className="py-12 border-b border-stroke-12 grid grid-cols-3 2xl:grid-cols-4 gap-8">
            {PASSWORD_FIELDS.map(({ name, label, placeholder, leftIcon }) => (
              <FormPassword
                key={name}
                control={methods.control}
                label={t(label)}
                id={name}
                name={name}
                placeholder={t(placeholder)}
                disabled={isLoading}
                leftIcon={
                  <Icon
                    name={leftIcon}
                    size="sm"
                  />
                }
              />
            ))}
          </div>
          <div className="py-8">
            <Button
              type="submit"
              disabled={(!isDirty && !filePreview) || isLoading}
              loading={isLoading}
              className="w-40 font-semibold"
            >
              {t('settings.account_details.save_changes')}
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AccountDetails;
