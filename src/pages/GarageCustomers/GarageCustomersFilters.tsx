import { Input } from '@components/text-fields/input';
import { useTranslation } from 'react-i18next';
import { Icon } from '@src/components';
import { Theme } from '@src/style';
import { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';
import { GarageCustomersFilterProps } from '@src/pages/GarageCustomers/GarageCustomers.types';
import { DropDown } from '@components/text-fields';
import { useActiveBranches } from '@src/pages/GarageCustomers/GarageCustomers.tools';
import { GARAGE_CUSTOMER_SORT_OPTIONS } from '@src/pages/GarageCustomers/GarageCustomers.constants';
import clsx from 'clsx';
import { useStore } from 'zustand';
import { coreStore } from '@src/store/core';

interface Props {
  setFilters: (filters: GarageCustomersFilterProps) => void;
  filters: GarageCustomersFilterProps;
}

const GarageCustomersFilters: React.FC<Props> = ({ setFilters, filters }) => {
  const { t } = useTranslation();
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
  const { data: branches } = useActiveBranches();
  const [search, setSearch] = useState<string>(filters.search ?? '');
  const { user } = useStore(coreStore);

  let branchesOptions = [...(branches?.data ?? [])];
  if (user && (user?.role === 'administrator' || user?.branch?.length > 1)) {
    branchesOptions = [{ id: '', name: 'All branches' }, ...branchesOptions];
  }

  useDebounce(
    () => {
      setDebouncedSearchTerm(search);
    },
    500,
    [search]
  );

  useEffect(() => {
    setFilters({ ...filters, search });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  const setBranchId = (branchId: string) => () => {
    setFilters({ ...filters, branchId, page: 1 });
  };

  const setSort = (sort: string) => () => {
    setFilters({ ...filters, sort, page: 1 });
  };
  return (
    <div className="flex gap-x-4 items-center flex-1 justify-end">
      {user?.role === 'administrator' || (user?.branch ?? [])?.length > 1 ? (
        <div className="w-52">
          <DropDown
            value={branchesOptions.find((item) => item.id.toString() === filters.branchId)?.name ?? ''}
            placeholder={t('placeholders.select')}
            labelClassName="sr-only"
            leftIcon={
              <Icon
                name="building"
                size="sm"
                color={Theme.colors.neutral500}
              />
            }
          >
            {branchesOptions.map((branch) => {
              const isSelected = branch.id.toString() === filters.branchId;
              return (
                <button
                  onClick={setBranchId(branch.id.toString())}
                  key={branch.id.toString()}
                  className={clsx('w-full d-block cursor-pointer py-2 px-4 hover:bg-neutral-100 all-unset text-left', {
                    'bg-neutral-100': isSelected,
                  })}
                >
                  {branch.name}
                </button>
              );
            })}
          </DropDown>
        </div>
      ) : null}

      <div className="w-70">
        <Input
          className="w-72 "
          labelClassName="sr-only"
          value={search}
          onChange={setSearch}
          leftIcon={
            <Icon
              name="search-normal-1"
              size="sm"
              color={Theme.colors.neutral500}
            />
          }
          type="text"
          placeholder={t('placeholders.search')}
        />
      </div>
      <div className="!w-12">
        <DropDown
          leftIcon={
            <Icon
              name="sort"
              size="sm"
              color={Theme.colors.neutral500}
            />
          }
          hideRightIcon
          className="!w-12"
          contentClassNames="w-36 transform -translate-x-24"
          labelClassName="sr-only"
        >
          {GARAGE_CUSTOMER_SORT_OPTIONS.map((item) => {
            const isSelected = filters.sort === item.value;
            return (
              <button
                onClick={setSort(item.value)}
                key={item.value}
                className="w-full d-block cursor-pointer p-2 hover:bg-neutral-100 all-unset text-left"
              >
                <div className="flex flex-nowrap justify-between items-center w-full">
                  <p>{item.label}</p>
                  {isSelected && (
                    <Icon
                      name="check"
                      size="sm"
                      color={Theme.colors.primary500}
                    />
                  )}
                </div>
              </button>
            );
          })}
        </DropDown>
      </div>
    </div>
  );
};

export default GarageCustomersFilters;
