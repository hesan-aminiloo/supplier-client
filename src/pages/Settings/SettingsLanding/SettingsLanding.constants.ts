import { SettingsItemProps } from './SettingsLanding.types';

export const SKELETON_ITEMS_COUNT = 5;

export const SETTINGS_ITEMS: SettingsItemProps[] = [
  {
    id: 'company-info',
    to: 'company-info',
    title: 'settings.landing.company_details',
    description: 'settings.landing.add_your_company_details_and_any_additional_branches',
    icon: 'building',
  },
  {
    id: 'system-users',
    to: 'system-users',
    title: 'settings.landing.system_users',
    description: 'settings.landing.add_additional_users_that_can_access_your_dashboard',
    icon: 'people',
  },
  {
    id: 'account-details',
    to: 'account-details',
    title: 'settings.landing.account_details',
    description: 'settings.landing.change_your_details_including_your_password',
    icon: 'frame-1',
  },
  {
    id: 'notification-settings',
    to: 'notification-settings',
    title: 'settings.landing.notification_settings',
    description: 'settings.landing.what_notifications_you_want_to_receive_and_how',
    icon: 'notification-1',
  },
  {
    id: 'pricing-and-billings',
    to: 'pricing-and-billings',
    title: 'settings.landing.pricing_billing',
    description: 'settings.landing.costs_incured_for_use_of_the_system',
    icon: 'receipt-item',
  },
];
