import { FormDropDown, FormInput, IconNames } from '@src/components';
import { IRequestListItem, Pagination, PaginationResponse, RequestStatus } from '@src/types';
import { DropDownOption } from '@components/text-fields';
import { InfiniteData } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { FormMultiSelect } from '@src/components/form/fields/FormMultiSelect';

export type RequestBaseProps = {
  id: string;
};

export type RequestFiltersInputItem = RequestBaseProps & {
  label: string;
  leftIcon: IconNames;
  placeholder?: string;
  name: string;
  options?: DropDownOption[];
  component: typeof FormDropDown | typeof FormInput | typeof FormMultiSelect;
  className?: string;
};

export type RequestFiltersData = {
  status: string[];
  type: string;
  value: string;
  time: string;
  search: string;
  branch: string;
  garageId?: string;
};

export interface GetRequestsBody extends Pagination {
  filters: RequestFiltersData;
  sort?: string[];
}

export type RequestListItem = RequestBaseProps & {
  doc: string;
  type: string;
  garage: string;
  branch: string;
  reg: string;
  status: RequestStatus;
  date: string;
  vin: string;
};

export interface RequestItemPropsI {
  request: IRequestListItem;
  onClick: () => void;
  className?: string;
}

export interface RequestsResponse {
  'supplier requests': {
    data: IRequestListItem[];
  } & PaginationResponse;
}

export interface RequestsListProps {
  filters: GetRequestsBody;
  data?: InfiniteData<AxiosResponse<RequestsResponse, any>> | undefined;
  isLoading: boolean;
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
}

export interface RequestFiltersProps {
  onSubmit: (filters: GetRequestsBody) => void;
  filters: GetRequestsBody;
  isGarageRequestsPage?: boolean;
}

export interface RequestBranchFilterProps {
  onSubmit: (filters: GetRequestsBody) => void;
  filters: GetRequestsBody;
}
