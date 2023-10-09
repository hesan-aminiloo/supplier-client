import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FormProvider } from 'react-hook-form';
import clsx from 'clsx';
import { useStore } from 'zustand';
import { coreStore } from '@src/store/core';

// components
import { Icon } from '@src/components';
import { DropDownOption } from '@components/text-fields';
// styles
import { Theme } from '@src/style';

// local components
import { useActiveBranches } from '@src/pages/GarageCustomers/GarageCustomers.tools';
import { StatsFiltersProps } from './Stats.types';

// constants
import { STATS_FILTER_INPUTS } from './Stats.constants';

// tools
import { useStatsFiltersForm } from './Stats.tools';

export const StatsFilters: FC<StatsFiltersProps> = ({ onSubmit, filters }) => {
  const { methods } = useStatsFiltersForm(filters, onSubmit);
  const { t } = useTranslation();
  const { data: branches } = useActiveBranches();
  const { user } = useStore(coreStore);

  let branchesOptions: DropDownOption[] = [
    ...(branches?.data.map((branch) => ({ value: branch.id, label: branch.name })) ?? []),
  ];
  if (user && (user?.role === 'administrator' || user.branch?.length > 1)) {
    branchesOptions = [{ value: '', label: 'All branches' }, ...branchesOptions];
  }
  const data = methods.watch();

  useEffect(() => {
    if (methods.formState.isValid && !methods.formState.isValidating) {
      onSubmit(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [methods.formState, data, methods.formState.isValidating]);
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex justify-end w[450px]"
      >
        <div className="flex gap-x-8 justify-end w-full">
          {STATS_FILTER_INPUTS(user?.role ?? '', user?.branch.length ?? 0).map((input) => (
            <input.component
              key={input.id}
              className={clsx('', input.className)}
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
              options={input.name === 'branchId' ? branchesOptions : input.options ?? []}
              placeholder={input.placeholder ? t(input.placeholder) : undefined}
            />
          ))}
        </div>
      </form>
    </FormProvider>
  );
};
