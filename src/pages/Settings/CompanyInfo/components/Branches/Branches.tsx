// Hooks
import { Icon } from '@src/components';
import { Theme } from '@src/style';
import PopUp from '@src/components/pop-up/PopUp';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
// Local Components
import { useState } from 'react';
// import { customFetcher } from '@src/utils';
import BranchItem from './BranchItem';
import { NewBranchDrawer } from './NewBranchDrawer';
import { BranchItemType } from '../../CompanyInfo.types';
import { IBranchesProps } from './Branches.types';
import { useBranch } from '../../CompanyInfo.tools';
import { getBranchDefaultValues } from '../../CompanyInfo.constants';

export const Branches = ({ branches, onChangeBranches, setIsLoading }: IBranchesProps) => {
  const [branchDrawerOpen, setBranchDrawerOpen] = useState(false);
  const [branchInfo, setBranchInfo] = useState<BranchItemType>();
  const [branchId, setBranchId] = useState<BranchItemType['id']>();
  const [popupConfig, setPopupConfig] = useState({});
  const { onDelete, onRestore } = useBranch(getBranchDefaultValues(), onChangeBranches);

  const { t } = useTranslation();

  const handleDeleteBranch = () => {
    onDelete(branchId!);
  };

  const hendleConfirmPopup = (id: BranchItemType['id']) => {
    setBranchId(id);
    setPopupConfig({
      isOpen: true,
      title: 'Delete branch',
      description: 'This will permanently delete the selected branch. Are you sure ?',
    });
  };

  return (
    <div className="py-12 min-w-full">
      <h3 className="text-xl font-bold mb-6 text-neutral-800 flex justify-between items-center">
        {t('settings.company_info.branches')}
        <button
          className="text-primary-500 text-sm font-medium flex items-center"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setBranchInfo(undefined);
            setBranchDrawerOpen(true);
          }}
        >
          <span>
            <Icon
              name="add"
              color={Theme.colors.primary500}
              className="mr-2 inline-block"
            />
          </span>
          <span>{t('settings.company_info.add_branch')}</span>
        </button>
      </h3>

      {branches && branches?.length ? (
        <div className="pt-4 grid grid-cols-3 2xl:grid-cols-4">
          {branches.map((branch: BranchItemType) => (
            <BranchItem
              key={branch.id}
              {...branch}
              className="mr-8 mb-8"
              onClick={() => {
                setBranchInfo(branch);
                setBranchDrawerOpen(true);
              }}
              onDelete={hendleConfirmPopup}
              onRestore={onRestore}
              setIsLoading={setIsLoading}
            />
          ))}
        </div>
      ) : (
        <div
          className={clsx('bg-white border rounded-xl p-6 border-stroke-4 shadow-xs relative min-w-[340px] text-left')}
        >
          No branches found
        </div>
      )}

      <NewBranchDrawer
        isOpen={branchDrawerOpen}
        branchInfo={branchInfo}
        onClose={() => {
          setBranchDrawerOpen(false);
        }}
        callback={() => {
          onChangeBranches();
          setBranchDrawerOpen(false);
        }}
      />
      <PopUp
        {...popupConfig}
        submit={handleDeleteBranch}
        onClose={() => setPopupConfig({ isOpen: false })}
      />
    </div>
  );
};
