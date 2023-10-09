import { GarageCustomersFilterProps, IGarageCustomerForm, StepsEnum } from './GarageCustomers.types';

export const SKELETON_ITEMS_COUNT = 6;

export const createGarageCustomerDefaultValues: IGarageCustomerForm = {
  logo: null,
  name: '',
  step: StepsEnum.CUSTOMER,
  branchId: '',
  users: [
    {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      phone: '',
      password: '',
      role: 'administrator',
    },
  ],
  contact: {
    city: '',
    email: '',
    countryId: null,
    phone: '',
    address: '',
    postCode: '',
  },
};

export const GarageFiltersInitialValues: GarageCustomersFilterProps = {
  search: '',
  page: 1,
  sort: '',
  branchId: '',
};

export const GARAGE_CUSTOMER_SORT_OPTIONS = [
  {
    label: 'A-Z sort',
    value: 'alphabet_asc',
  },
  {
    label: 'Z-A sort',
    value: 'alphabet_desc',
  },
  {
    label: 'Newest first',
    value: 'newest',
  },
  {
    label: 'Oldest first',
    value: 'oldest',
  },
];
