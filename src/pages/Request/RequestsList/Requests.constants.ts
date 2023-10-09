import { FormDropDown, FormInput, FormMultiSelect } from '@src/components';
import { RequestFiltersInputItem } from './Requests.types';

const now = new Date();
const firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 1));
const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
const firstDayOfYear = new Date(now.getFullYear(), 0, 1);

export const REQUEST_FILTER_DEFAULT_VALUES = {
  filters: {
    status: ['response_required', 'response_sent', 'confirmed', 'dispatched'],
    type: '',
    time: '',
    search: '',
    value: '',
    branch: '',
  },
  sort: [],
  page: 1,
};

export const REQUEST_STATUS_LIST = [
  {
    label: 'All',
    value: '',
  },
  {
    label: 'Response Required',
    value: 'response_required',
  },
  {
    label: 'Response Sent',
    value: 'response_sent',
  },
  {
    label: 'Confirmed',
    value: 'confirmed',
  },
  {
    label: 'Cancelled',
    value: 'canceled',
  },
  {
    label: 'Missed Quote',
    value: 'missed_quote',
  },
  {
    label: 'Dispatched',
    value: 'dispatched',
  },
];

export const REQUESTS_FILTER_INPUTS: RequestFiltersInputItem[] = [
  {
    id: 'status-input',
    name: 'filters.status',
    label: 'requests.request_status',
    leftIcon: 'status',
    options: REQUEST_STATUS_LIST,
    component: FormMultiSelect,
  },
  {
    id: 'type-input',
    name: 'filters.type',
    label: 'requests.request_type',
    leftIcon: 'document-copy',
    options: [
      {
        label: 'Quote',
        value: 'quote',
      },
      {
        label: 'All',
        value: '',
      },
      {
        label: 'Order',
        value: 'order',
      },
    ],
    component: FormDropDown,
  },
  {
    id: 'time-input',
    name: 'filters.time',
    label: 'requests.time',
    leftIcon: 'calendar-1',
    options: [
      {
        label: 'Today',
        value: 'today',
      },
      {
        label: 'This Week',
        value: firstDayOfWeek.toISOString(),
      },
      {
        label: 'Last Week',
        value: 'last week',
      },
      {
        label: 'This Month',
        value: firstDayOfMonth.toISOString(),
      },
      {
        label: 'Last Month',
        value: 'last month',
      },
      {
        label: 'This Year',
        value: firstDayOfYear.toISOString(),
      },
      {
        label: 'All Time',
        value: '',
      },
    ],
    component: FormDropDown,
  },
  {
    id: 'value-input',
    name: 'filters.search',
    label: 'requests.search',
    placeholder: 'requests.reg_number_or_vin_code',
    leftIcon: 'search-normal-1',
    component: FormInput,
  },
];

export const GARAGE_REQUESTS_FILTER_INPUTS: RequestFiltersInputItem[] = [
  {
    id: 'status-input',
    name: 'filters.status',
    label: 'requests.request_status',
    leftIcon: 'status',
    className: '!w-[320px]',
    options: REQUEST_STATUS_LIST,
    component: FormMultiSelect,
  },
];

export const REQUEST_LIST_LABELS = [
  {
    name: 'requests.doc',
    className: 'pl-2 w-16',
  },
  {
    name: 'requests.type',
    className: 'w-20',
  },
  {
    name: 'requests.garage',
    className: 'w-56',
  },
  {
    name: 'requests.reg-or-vin',
    className: 'w-36',
  },
  {
    name: 'requests.status',
    className: 'w-44',
  },
  {
    name: 'requests.date',
    className: 'w-36',
  },
  {
    name: 'requests.more',
    className: 'w-56',
  },
];

export const SKELETON_ITEMS_COUNT = 7;
export const SKELETON_INPUTS_COUNT = 5;
