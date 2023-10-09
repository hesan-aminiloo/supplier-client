import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FormProvider } from 'react-hook-form';
import clsx from 'clsx';

// components
import { Button, Icon } from '@src/components';

// local components
import { GetRequestsBody, RequestFiltersProps } from '@src/pages/Request/RequestsList/Requests.types';

// styles
import { Theme } from '@src/style';
import styles from './Requests.module.scss';

// constants
import { GARAGE_REQUESTS_FILTER_INPUTS, REQUESTS_FILTER_INPUTS } from './Requests.constants';

// tools
import { useRequestFiltersForm } from './Requests.tools';

export const RequestFilters: FC<RequestFiltersProps> = ({ onSubmit, filters, isGarageRequestsPage }) => {
  const { methods } = useRequestFiltersForm(filters);
  const { t } = useTranslation();

  const handleSubmit = (values: GetRequestsBody) => {
    onSubmit({
      ...values,
      page: 1,
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmit)}
        className="border-t pt-6 flex items-end"
      >
        <div
          className={clsx('flex gap-x-8 items-end', {
            'w-fit': isGarageRequestsPage,
            'w-full': !isGarageRequestsPage,
          })}
        >
          {(isGarageRequestsPage ? GARAGE_REQUESTS_FILTER_INPUTS : REQUESTS_FILTER_INPUTS).map((input) => (
            <input.component
              key={input.id}
              className={clsx('w-full', input.className)}
              leftIcon={
                <Icon
                  size="sm"
                  color={Theme.colors.neutral500}
                  name={input.leftIcon}
                />
              }
              control={methods.control}
              id={input.id}
              name={input.name}
              label={t(input.label)}
              labelClassName="text-neutral-500"
              options={input.options ?? []}
              placeholder={input.placeholder ? t(input.placeholder) : undefined}
            />
          ))}
        </div>
        <div className="ml-8">
          <Button className={clsx(styles['request-filters__search-button'], 'm-0S')}>{t('requests.search')}</Button>
        </div>
      </form>
    </FormProvider>
  );
};
