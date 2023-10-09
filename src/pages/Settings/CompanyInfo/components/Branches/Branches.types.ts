import { BranchItemType, SupplierInfoResType } from '../../CompanyInfo.types';

export type BranchItemPropsI = BranchItemType & {
  className?: string;
  onDelete: (id: string) => void;
  onClick: (id: string) => void;
  onRestore: (id: string) => void;
  setIsLoading: () => void;
};

export interface IBranchesProps {
  branches: SupplierInfoResType['branches'];
  onChangeBranches: () => void;
  setIsLoading: () => void;
}
