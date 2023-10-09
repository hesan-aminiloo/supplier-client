import React, { FC, SyntheticEvent } from 'react';
// utils
import { useTranslation } from 'react-i18next';

// components
import { Button, Icon } from '@src/components';

// local components
import {
  CREATE_PART_FORM_ELEMENTS,
  getPartPrice,
  newPartDefaultValues,
  NewPartFormProps,
} from '@src/pages/Request/RequestDetails';

// styles
import { Theme } from '@src/style';
import colors from 'tailwindcss/colors';
import { formatMoney } from '@src/utils';

export const NewPartForm: FC<NewPartFormProps> = ({ methods }) => {
  const { t } = useTranslation();
  const newParts = methods.watch('extra') ?? [];

  const handleAddNewPart = (e: SyntheticEvent) => {
    e.preventDefault();
    methods.setValue('extra', [...newParts, { ...newPartDefaultValues, id: newParts.length }]);
  };

  const deleteNewPart = (partId: number) => () => {
    methods.setValue(
      'extra',
      newParts.filter((part) => part.id !== partId)
    );
  };
  return (
    <>
      {newParts.map((newPart, newPartIndex) => {
        return (
          <div
            key={newPart.id}
            className="w-full h-max border-b-2 border-stroke-4 grid grid-cols-12 gap-8 gap-y-6 pb-8 pt-4"
          >
            {CREATE_PART_FORM_ELEMENTS.map((input) => {
              if (input.name === 'lineTotal') {
                return (
                  <div
                    key={input.name}
                    className={input.className}
                  >
                    <input.component
                      control={methods.control}
                      placeholder={input.placeholder ? t(input.placeholder) : ''}
                      label={input.label ? t(input.label) : ''}
                      name={`extra.${newPartIndex}.${input.name}`}
                      type={input.type}
                      value={formatMoney(getPartPrice(newPart))}
                      options={input.options ?? []}
                      min={input.min}
                    />
                  </div>
                );
              }
              return (
                <div
                  key={input.name}
                  className={input.className}
                >
                  <input.component
                    control={methods.control}
                    placeholder={input.placeholder ? t(input.placeholder) : ''}
                    label={input.label ? t(input.label) : ''}
                    name={`extra.${newPartIndex}.${input.name}`}
                    type={input.type}
                    options={input.options ?? []}
                    min={input.min}
                  />
                </div>
              );
            })}
            <div className="col-span-1 flex items-end justify-end">
              <Button
                variant="solid"
                color="destructive"
                type="button"
                onClick={deleteNewPart(newPart.id)}
              >
                <Icon
                  name="trash"
                  size="sm"
                  color={Theme.colors.white}
                />
              </Button>
            </div>
          </div>
        );
      })}
      <div className="pt-8 w-full h-max border-b-2 border-stroke-4 grid grid-cols-12 gap-8 gap-y-6 pb-8">
        <div className="col-span-12 flex items-center">
          <Button
            color="primary"
            leftIcon={
              <Icon
                name="add"
                size="xs"
                color={colors.white}
              />
            }
            type="submit"
            className="flex items-center"
            onClick={handleAddNewPart}
          >
            {t('request_details.create_response.add_part')}
          </Button>
        </div>
      </div>
    </>
  );
};

export default NewPartForm;
