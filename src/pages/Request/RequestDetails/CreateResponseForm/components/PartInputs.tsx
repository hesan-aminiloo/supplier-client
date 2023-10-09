import React, { FC } from 'react';

// utils
import { useTranslation } from 'react-i18next';
import { UseFormReturn } from 'react-hook-form';

// types
import { CreateResponseFormTypes, getPartPrice, PART_FORM_ELEMENTS } from '@src/pages/Request/RequestDetails';
import { formatMoney } from '@src/utils';

export const PartInputs: FC<{ methods: UseFormReturn<CreateResponseFormTypes, any> }> = ({ methods }) => {
  const { t } = useTranslation();
  const responses = methods.watch('responses') ?? [];
  return (
    <div className="border-b-2 border-stroke-4 pt-8">
      <div className="w-full">
        <h3 className="text-xl font-bold mb-6 text-neutral-800 flex justify-between items-center">
          {t('request_details.create_response.response_details')}
        </h3>
      </div>
      {responses?.map((part, index) => {
        return (
          <div
            key={part.id}
            className="gap-x-8 gap-y-6"
          >
            <div className="w-full pb-8 grid grid-cols-10 gap-x-8 gap-y-2">
              <div className="col-span-10">
                <h4 className="text-lg text-neutral-600 flex justify-between items-center">{part.description}</h4>
              </div>
              {PART_FORM_ELEMENTS.map((input) => {
                const fieldName = `responses.${index}.${input.name}`;
                if (input.name === 'lineTotal') {
                  return (
                    <input.component
                      key={input.name}
                      control={methods.control}
                      label={t(input.label)}
                      labelClassName={input.labelClassName}
                      placeholder={input.placeholder ? t(input.placeholder) : ''}
                      name={fieldName}
                      type={input.type}
                      className={input.className}
                      readOnly={input.readOnly}
                      value={formatMoney(getPartPrice(part))}
                      options={input.options ?? []}
                      min={input.min}
                    />
                  );
                }
                return (
                  <input.component
                    key={input.name}
                    control={methods.control}
                    label={t(input.label)}
                    labelClassName={input.labelClassName}
                    placeholder={input.placeholder ? t(input.placeholder) : ''}
                    name={fieldName}
                    type={input.type}
                    className={input.className}
                    options={input.options ?? []}
                    readOnly={input.readOnly}
                    disabled={input.name !== 'inStock' && part.inStock.toString() === 'false'}
                    min={input.min}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PartInputs;
