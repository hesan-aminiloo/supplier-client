/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from 'react';
import { Icon } from '@src/components';
import { DropDown } from '@src/components/text-fields';
import { Theme } from '@src/style';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { SystemUsersFilterProps } from './SystemUserList.types';

const SystemUsersFilter: FC<SystemUsersFilterProps> = ({ branchId, onSelect, branches }) => {
  const { t } = useTranslation();
  const branchesList = [{ id: '', name: `${t('requests.all_branches')}` }, ...branches];
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
        value={branchesList.find((item) => item.id === branchId)?.name ?? ''}
      >
        {branchesList.map((branch) => {
          const isSelected = branch.id === branchId;
          return (
            <button
              onClick={() => onSelect(branch.id as number)}
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

export default SystemUsersFilter;
