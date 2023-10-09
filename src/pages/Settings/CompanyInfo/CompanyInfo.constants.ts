import { FormDropDown, FormInput } from '@src/components';
import {
  BranchFormValuesTypes,
  BranchItemType,
  CompanyDataType,
  FormElement,
  WorkingDaysEnums,
  WorkingHoursType,
} from './CompanyInfo.types';

export const SKELETON_ITEMS_COUNT = 4;
export const SKELETON_INPUTS_COUNT = 8;
export const workingHoursDefaultValue: WorkingHoursType[] = [
  { Mon: { start: '', finish: '' } },
  { Tue: { start: '', finish: '' } },
  { Wed: { start: '', finish: '' } },
  { Thu: { start: '', finish: '' } },
  { Fri: { start: '', finish: '' } },
  { Sat: { start: '', finish: '' } },
  { Sun: { start: '', finish: '' } },
];
export const getBranchDefaultValues = (branch?: BranchItemType): BranchFormValuesTypes => {
  return {
    email: branch?.email || '',
    name: branch?.name || '',
    phone: branch?.phone || '',
    address: branch?.address || '',
    city: branch?.city || '',
    postCode: branch?.postCode || '',
    countryId: branch?.countryId || '',
    active: branch?.active || false,
    workingHours: branch?.workingHours || workingHoursDefaultValue,
  };
};

export const COMPANY_INFO_FORM_INITIAL_VALUES: CompanyDataType = {
  name: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  postCode: '',
  countryId: '',
  logo: '',
};

export const FORM_ELEMENTS: FormElement[] = [
  {
    type: 'text',
    label: 'settings.company_info.form.company_name',
    leftIcon: 'home-hashtag',
    name: 'name',
    component: FormInput,
  },
  {
    type: 'text',
    label: 'settings.company_info.form.phone',
    leftIcon: 'call-calling',
    name: 'phone',
    placeholder: '01 234 567 89',
    component: FormInput,
  },
  {
    type: 'email',
    label: 'settings.company_info.form.email',
    leftIcon: 'sms',
    name: 'email',
    placeholder: 'David.anderson@gmail.com',
    component: FormInput,
  },
  {
    type: 'text',
    label: 'settings.company_info.form.address',
    leftIcon: 'location',
    name: 'address',
    placeholder: 'Street name and number',
    component: FormInput,
  },
  {
    type: 'text',
    label: 'settings.company_info.form.town_city',
    leftIcon: 'home-hashtag',
    placeholder: 'settings.company_info.form.street_name_and_number',
    name: 'city',
    component: FormInput,
  },
  {
    type: 'text',
    label: 'settings.company_info.form.post_code',
    leftIcon: 'sign-post',
    placeholder: 'settings.company_info.form.post_code',
    name: 'postCode',
    component: FormInput,
  },
  {
    type: 'text',
    label: 'settings.company_info.form.country',
    leftIcon: 'flag',
    name: 'countryId',
    component: FormDropDown,
  },
];

export const DAYS_OF_WEEKS: { value: WorkingDaysEnums; label: string }[] = [
  { value: WorkingDaysEnums.MON, label: 'Monday' },
  { value: WorkingDaysEnums.TUE, label: 'Tuesday' },
  { value: WorkingDaysEnums.WED, label: 'Wednesday' },
  { value: WorkingDaysEnums.THU, label: 'Thursday' },
  { value: WorkingDaysEnums.FRI, label: 'Friday' },
  { value: WorkingDaysEnums.SAT, label: 'Saturday' },
  { value: WorkingDaysEnums.SUN, label: 'Sunday' },
];
export const START_WORKING_TIME = [
  '07:00am',
  '07:30am',
  '08:00am',
  '08:30am',
  '09:00am',
  '09:30am',
  '10:00am',
  '10:30am',
  '11:00am',
  '11:30am',
  '12:00pm',
];
export const END_WORKING_TIME = [
  '12:00pm',
  '12:30pm',
  '01:00pm',
  '01:30pm',
  '02:00pm',
  '02:30pm',
  '03:00pm',
  '03:30pm',
  '04:00pm',
  '04:30pm',
  '05:00pm',
  '05:30pm',
  '06:00pm',
  '06:30pm',
  '07:00pm',
  '07:30pm',
  '08:00pm',
  '08:30pm',
  '09:00pm',
  '09:30pm',
];
