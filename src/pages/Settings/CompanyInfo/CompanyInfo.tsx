/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, FileUploader, Icon } from '@src/components';
import { generateImageUrl } from '@src/utils';
import { useStore } from 'zustand';
import { coreStore } from '@src/store/core';
import { Theme } from '@src/style';
import SettingsHeader from '@components/SettingsHeader';
import { FormProvider } from 'react-hook-form';
import { DropDownOption } from '@src/components/text-fields';
// Local Components
import { Branches } from './components';
import { useCompanyInfoForm } from './CompanyInfo.tools';
import { FormElement } from './CompanyInfo.types';
import { FORM_ELEMENTS } from './CompanyInfo.constants';
import { CompanyInfoSkeleton } from './CompanyInfo.skeleton';

const CompanyInfo: React.FC = () => {
  const { supplierInfo, methods, isLoading, loading, onSubmit, getSupplierInfo, setIsLoading } = useCompanyInfoForm();
  const { countries } = useStore(coreStore);
  const { t } = useTranslation();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [filePreview, setFilePreview] = useState<string>();
  const [file, setFile] = useState<File>();
  const logo = methods.getValues('logo');
  const { isDirty, errors } = methods.formState;
  const { clearErrors } = methods;

  useEffect(() => {
    if (file) {
      methods.setValue('logo', file);
    }
  }, [file]);

  if (isLoading) {
    return <CompanyInfoSkeleton />;
  }

  return (
    <>
      <SettingsHeader
        className="pb-8 border-b border-stroke-12"
        canGoBack
      >
        {t('settings.company_info.company_details')}
      </SettingsHeader>

      <FormProvider {...methods}>
        {/* @ts-ignore */}
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="py-6 border-b border-stroke-12">
            {filePreview || logo ? (
              <div className="py-4">
                <div
                  className="
        bg-white rounded-xl border border-stroke-4 py-2 text-center shadow-xs max-w-[340px] relative min-h-[138px]
        "
                >
                  <img
                    src={filePreview || generateImageUrl(logo as string)}
                    alt=""
                    className="max-w-[268px] max-h-[120px] m-auto"
                  />
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
                            const objectUrl = URL.createObjectURL(files[0]);
                            setFilePreview(objectUrl);
                            setFile(files[0]);
                            clearErrors('logo');
                          };
                        }
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="solid"
                    color="primary"
                    size="sm"
                    className="absolute -top-2 -right-2"
                    onClick={(e) => {
                      e.preventDefault();
                      inputRef.current?.click();
                    }}
                  >
                    <Icon
                      name="edit-2"
                      color={Theme.colors.white}
                      size="sm"
                    />
                  </Button>
                </div>
                {errors.logo?.message ? <p className="text-destructive-600 py-4">{errors.logo?.message}</p> : null}
              </div>
            ) : (
              <FileUploader
                onSelectFile={(files: File[]) => {
                  const objectUrl = URL.createObjectURL(files[0]);
                  setFilePreview(objectUrl);
                  setFile(files[0]);
                }}
                control={methods.control}
                name="logo"
              />
            )}
          </div>

          <div className="grid grid-cols-4 grid-rows-2 gap-8 border-b border-stroke-8 py-12 min-w-full ">
            {FORM_ELEMENTS.map((input: FormElement) => {
              return (
                <div key={input.name}>
                  <input.component
                    type={input.type}
                    label={t(input.label)}
                    name={input.name}
                    disabled={isLoading}
                    control={methods.control}
                    // Note: this will work for only countries input
                    options={
                      countries?.map((item) => ({
                        value: item.id,
                        label: item.name,
                      })) as DropDownOption[]
                    }
                    leftIcon={
                      <Icon
                        name={input.leftIcon}
                        color={Theme.colors.neutral500}
                        size="sm"
                      />
                    }
                    rightIcon={
                      input.rightIcon ? (
                        <button
                          type="button"
                          className="flex items-center"
                        >
                          <Icon
                            name={input.rightIcon}
                            color={Theme.colors.primary600}
                            size="sm"
                          />
                        </button>
                      ) : null
                    }
                    placeholder={input.placeholder ? t(input.placeholder) : undefined}
                  />
                </div>
              );
            })}
          </div>

          <div className="border-b border-stroke-8 mb-6 min-w-full">
            <Branches
              onChangeBranches={getSupplierInfo}
              branches={supplierInfo?.branches.length ? supplierInfo.branches : []}
              setIsLoading={() => setIsLoading(true)}
            />
          </div>

          <Button
            type="submit"
            variant="solid"
            color="primary"
            className="w-40"
            disabled={!isDirty && !filePreview}
            loading={loading}
          >
            Save Changes
          </Button>
        </form>
      </FormProvider>
    </>
  );
};

export default CompanyInfo;
