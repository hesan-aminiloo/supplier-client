/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from 'react';
import {
  ModalDrawer,
  DrawerHeader,
  DrawerPlacement,
  FormInput,
  Icon,
  DrawerFooter,
  FormDropDown,
  FormSwitch,
} from '@src/components';
import { FormProvider } from 'react-hook-form';
import { Theme } from '@src/style';
import { useTranslation } from 'react-i18next';
import { useStore } from 'zustand';
import { coreStore } from '@src/store/core';
import { DropDownOption } from '@src/components/text-fields';
import { DAYS_OF_WEEKS, getBranchDefaultValues } from '../../CompanyInfo.constants';
import { useBranch } from '../../CompanyInfo.tools';
import { BranchItemType } from '../../CompanyInfo.types';
import { WorkingHours } from '../WorkingHours/WorkingHours';

type NewBranchDrawerProps = {
  branchInfo?: BranchItemType;
  isOpen?: boolean;
  onClose: () => void;
  callback: () => void;
};

export const NewBranchDrawer: FC<NewBranchDrawerProps> = ({ branchInfo, isOpen, onClose, callback }) => {
  const { t } = useTranslation();
  const { onSubmit, methods, isLoading } = useBranch(getBranchDefaultValues(branchInfo), callback, branchInfo?.id);
  const { countries } = useStore(coreStore);

  return (
    <ModalDrawer
      type="drawer"
      placement={DrawerPlacement.Right}
      isOpen={isOpen}
      onClosed={onClose}
    >
      <DrawerHeader
        title={t(`settings.company_info.${branchInfo ? 'update_branch' : 'add_branch'}`)}
        onClose={onClose}
      />
      <FormProvider {...methods}>
        <form
          className="bg-gray-100 h-full flex flex-col gap-4 justify-between relative"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div className="p-6">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <FormInput
                  label="Branch name"
                  type="text"
                  placeholder="Branch name"
                  leftIcon={
                    <Icon
                      name="home-hashtag"
                      size="sm"
                      color={Theme.colors.neutral500}
                    />
                  }
                  name="name"
                  control={methods.control}
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <FormInput
                  label="Phone"
                  type="phone"
                  leftIcon={
                    <Icon
                      name="call-calling"
                      size="sm"
                      color={Theme.colors.neutral500}
                    />
                  }
                  name="phone"
                  placeholder="01 234 567 89"
                  control={methods.control}
                />
              </div>
              <div>
                <FormInput
                  label="Email"
                  type="email"
                  leftIcon={
                    <Icon
                      name="sms"
                      size="sm"
                      color={Theme.colors.neutral500}
                    />
                  }
                  name="email"
                  placeholder="David.anderson@gmail.com"
                  control={methods.control}
                />
              </div>
            </div>
            <div className="my-6 bg-stroke-12 h-[1px] w-full mb-4" />
            <div className="grid grid-cols-2 gap-6">
              <div>
                <FormInput
                  label="Address"
                  type="text"
                  leftIcon={
                    <Icon
                      name="location"
                      size="sm"
                      color={Theme.colors.neutral500}
                    />
                  }
                  name="address"
                  placeholder="Street name and number"
                  control={methods.control}
                />
              </div>
              <div>
                <FormInput
                  label="Town/City"
                  type="text"
                  leftIcon={
                    <Icon
                      name="location"
                      size="sm"
                      color={Theme.colors.neutral500}
                    />
                  }
                  placeholder="Street name and number"
                  name="city"
                  control={methods.control}
                />
              </div>
              <div>
                <FormInput
                  label="Post code"
                  type="text"
                  leftIcon={
                    <Icon
                      name="sign-post"
                      size="sm"
                      color={Theme.colors.neutral500}
                    />
                  }
                  name="postCode"
                  placeholder="Post code"
                  control={methods.control}
                />
              </div>
              <div>
                <FormDropDown
                  label="Country"
                  options={
                    countries?.map((item) => ({
                      value: item.id,
                      label: item.name,
                    })) as DropDownOption[]
                  }
                  leftIcon={
                    <Icon
                      name="flag"
                      size="sm"
                      color={Theme.colors.neutral500}
                    />
                  }
                  placeholder="Select"
                  name="countryId"
                  control={methods.control}
                />
              </div>
              <div>
                <div className="flex justify-between items-center flex-1 h-[44px] mt-6 bg-white px-3 rounded-xl">
                  <span className="text-sm">Active branch </span>
                  <FormSwitch
                    name="active"
                    control={methods.control}
                  />
                </div>
              </div>
            </div>
            <div className="my-6 bg-stroke-12 h-[1px] w-full mb-4" />
            <div className="mb-48">
              <p>{t('settings.company_info.form.opening_times')}</p>
              <div className="bg-white mt-2 rounded-xl border border-stroke-8 px-4 py-2">
                {DAYS_OF_WEEKS.map((day, dayIndex) => (
                  <WorkingHours
                    key={day.value}
                    methods={methods}
                    dayIndex={dayIndex}
                    day={day}
                  />
                ))}
              </div>
            </div>
          </div>

          <DrawerFooter
            title={t(`settings.company_info.${branchInfo ? 'update_branch' : 'add_branch'}`)}
            className="sticky bottom-0 z-10"
            loading={isLoading}
            onSubmit={methods.handleSubmit(onSubmit)}
          />
        </form>
      </FormProvider>
    </ModalDrawer>
  );
};
