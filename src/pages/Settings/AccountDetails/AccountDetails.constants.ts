import type { IconNames } from '@src/components/icon';
import type { fieldNames } from './AccountDetails.types';

export interface FormElement {
  name: fieldNames;
  label: string;
  placeholder: string;
  leftIcon: IconNames;
  rightIcon?: IconNames | string; // todo - string for Phone field's rightIcon, under question (?delete string)
  disabled?: boolean;
  rightIconOnClick?: () => void;
}

export const ACCOUNT_FIELDS: FormElement[] = [
  {
    name: 'firstName',
    label: 'settings.account_details.first_name',
    placeholder: 'settings.account_details.first_name',
    leftIcon: 'user',
  },
  {
    name: 'lastName',
    label: 'settings.account_details.last_name',
    placeholder: 'settings.account_details.last_name',
    leftIcon: 'user',
  },
  {
    name: 'username',
    label: 'settings.account_details.user_name',
    placeholder: 'settings.account_details.user_name',
    leftIcon: 'user',
  },
  {
    name: 'role',
    label: 'settings.account_details.role',
    placeholder: 'settings.account_details.role',
    leftIcon: 'user-octagon',
    disabled: true,
  },
  {
    name: 'phone',
    label: 'settings.account_details.phone',
    placeholder: 'settings.account_details.phone',
    leftIcon: 'mobile',
  },
  {
    name: 'email',
    label: 'settings.account_details.email',
    placeholder: 'settings.account_details.email',
    leftIcon: 'sms',
  },
  {
    name: 'branch',
    label: 'settings.account_details.branch',
    placeholder: 'settings.account_details.branch',
    disabled: true,
    leftIcon: 'building',
  },
];

export const PASSWORD_FIELDS: FormElement[] = [
  {
    name: 'currentPassword',
    label: 'settings.account_details.current_password',
    placeholder: 'settings.account_details.current_password',
    leftIcon: 'lock-1',
  },
  {
    name: 'password',
    label: 'settings.account_details.new_password',
    placeholder: 'settings.account_details.new_password',
    leftIcon: 'lock-1',
  },
  {
    name: 'password_confirmation',
    label: 'settings.account_details.confirm_new_password',
    placeholder: 'settings.account_details.confirm_new_password',
    leftIcon: 'lock-1',
  },
];
