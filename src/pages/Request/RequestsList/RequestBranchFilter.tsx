/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useMemo } from 'react';
import { Icon } from '@src/components';
import { DropDown } from '@src/components/text-fields';
import { Theme } from '@src/style';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useBranches } from './RequestBranchFilter.tools';
import { RequestBranchFilterProps } from './Requests.types';

const RequestBranchFilter: FC<RequestBranchFilterProps> = ({ filters, onSubmit }) => {
  const { data } = useBranches();
  const { t } = useTranslation();

  const branches = useMemo(() => {
    const options =
      data?.data.data.map((branch: { name: string; id: number }) => {
        return branch;
      }) || [];
    return [{ id: '', name: `${t('requests.all_branches')}` }, ...options];
  }, [data]);

  const onSelect = (branchId: string) => {
    const newFilter = { ...filters.filters, branch: branchId };
    onSubmit({
      ...{ filters: newFilter },
      page: 1,
    });
  };

  return (
    <div className="w-44">
      <DropDown
        leftIcon={
          <Icon
            name="building"
            size="sm"
            color={Theme.colors.neutral500}
          />
        }
        className="w-full"
        placeholder={t('placeholders.select')}
        labelClassName="sr-only"
        value={branches.find((item) => item.id === filters.filters.branch)?.name ?? ''}
      >
        {branches.map((branch) => {
          const isSelected = branch.id === filters.filters.branch;
          return (
            <button
              onClick={() => onSelect(branch.id)}
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
  );
};

export default RequestBranchFilter;
