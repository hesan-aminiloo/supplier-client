import { IBranchItem } from '@src/types';

export interface UserSystemsFilterData {
  branchId?: number | string;
  page?: number;
}

export interface UserSystemsFiltersType {
  branchId: string | number;
}

export interface SystemUsersFilterProps extends UserSystemsFiltersType {
  onSelect: (id: number) => void;
  branches: IBranchItem[];
}
