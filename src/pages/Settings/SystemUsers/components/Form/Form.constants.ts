import { FormDropDown, FormInput } from '@src/components';
import type { UserData, FormElementProps } from './Form.types';

export const formInitialValues: UserData = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  username: '',
  role: '',
  branch: [],
  password: '',
  password_confirmation: '',
  avatar: '',
  addCustomersPermission: false,
};

export const FORM_ELEMENTS: FormElementProps[] = [
  {
    label: 'settings.system_users.form.first_name',
    LeftIcon: 'user',
    name: 'firstName',
    placeholder: 'settings.system_users.form.first_name',
    component: FormInput,
  },
  {
    label: 'settings.system_users.form.last_name',
    LeftIcon: 'user',
    name: 'lastName',
    placeholder: 'settings.system_users.form.last_name',
    component: FormInput,
  },
  {
    label: 'settings.system_users.form.email',
    LeftIcon: 'sms',
    name: 'email',
    placeholder: 'settings.system_users.form.email',
    component: FormInput,
  },
  {
    label: 'settings.system_users.form.phone',
    LeftIcon: 'mobile',
    name: 'phone',
    placeholder: 'settings.system_users.form.phone_number',
    component: FormInput,
  },
  {
    label: 'settings.system_users.form.username',
    LeftIcon: 'user',
    name: 'username',
    placeholder: 'settings.system_users.form.username',
    component: FormInput,
  },
  {
    label: 'settings.system_users.form.role',
    LeftIcon: 'user-octagon',
    placeholder: 'settings.system_users.form.select',
    name: 'role',
    component: FormDropDown,
    options: [
      {
        label: 'Administrator',
        value: 'administrator',
      },
      {
        label: 'Standard User',
        value: 'user',
      },
    ],
  },
];
