/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import { Avatar, DrawerFooter, FileUploader, FormDropDown, FormInput, Icon } from '@src/components';
import { Theme } from '@src/style';
import { UseFormReturn } from 'react-hook-form';
import { useState } from 'react';
import { useStore } from 'zustand';
import { DropDownOption } from '@src/components/text-fields';
import { coreStore } from '@src/store/core';
import { useActiveBranches } from '@src/pages/GarageCustomers/GarageCustomers.tools';
import { IGarageCustomerForm } from './GarageCustomers.types';
import { EnumRoles } from '../Settings/SystemUsers/components/Form/Form.types';

export const GarageCustomerContactForm = ({
  onSubmit,
  methods,
}: {
  methods: UseFormReturn<IGarageCustomerForm, any>;
  onSubmit: () => void;
}) => {
  const logo = methods.getValues('logo') as File;
  const [filePreview, setFilePreview] = useState(logo ? URL.createObjectURL(logo) : '');
  const { countries, user } = useStore(coreStore);
  const { data: branches } = useActiveBranches();
  const allBranches = user?.role === EnumRoles.USER ? user.branch : branches?.data;
  return (
    <div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <FormInput
            label="Garage name"
            placeholder="Garage name"
            type="text"
            leftIcon={
              <Icon
                name="home-hashtag"
                size="sm"
                color={Theme.colors.neutral500}
              />
            }
            name="name"
            control={methods.control}
          />
        </div>

        <div>
          <FormDropDown
            label="Branch"
            placeholder="Select"
            options={(allBranches ?? []).map((item) => ({
              label: item.name,
              value: (item.id ?? 0).toString?.(),
            }))}
            leftIcon={
              <Icon
                name="building"
                size="sm"
                color={Theme.colors.neutral500}
              />
            }
            name="branchId"
            control={methods.control}
            onBlur={(e) => e.preventDefault()}
          />
        </div>
        <div>
          <FormInput
            label="Phone"
            type="phone"
            leftIcon={
              <Icon
                name="mobile"
                size="sm"
                color={Theme.colors.neutral500}
              />
            }
            name="contact.phone"
            placeholder="Phone number"
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
            name="contact.email"
            placeholder="Email address"
            control={methods.control}
          />
        </div>
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
            name="contact.address"
            placeholder="Street name and number"
            control={methods.control}
          />
        </div>
        <div>
          <FormInput
            label="City"
            type="text"
            leftIcon={
              <Icon
                name="location"
                size="sm"
                color={Theme.colors.neutral500}
              />
            }
            placeholder="City"
            name="contact.city"
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
            name="contact.postCode"
            placeholder="Post code"
            control={methods.control}
          />
        </div>
        <div>
          <FormDropDown
            label="Country"
            placeholder="Select"
            type="text"
            options={
              countries?.map((item) => ({
                value: item.id?.toString?.(),
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
            name="contact.countryId"
            control={methods.control}
            onBlur={(e) => e.preventDefault()}
          />
        </div>
      </div>
      <div>
        {filePreview ? (
          <div className="py-4">
            <Avatar
              size="xhg"
              src={filePreview}
              slot={
                <>
                  <div
                    role="button"
                    className="w-10 h-10 absolute bottom-0 right-0 rounded-full bg-white flex items-center justify-center border border-stroke-4 shadow-sm"
                    onClick={() => setFilePreview('')}
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
          </div>
        ) : (
          <FileUploader
            onSelectFile={(files: File[]) => {
              const objectUrl = URL.createObjectURL(files[0]);
              setFilePreview(objectUrl);
              methods.setValue('logo', files[0]);
            }}
          />
        )}
      </div>
      <DrawerFooter
        title="Next"
        className="absolute left-0 bottom-0 right-0"
        disabled={!methods.formState.isValid}
        onSubmit={onSubmit}
      />
    </div>
  );
};
