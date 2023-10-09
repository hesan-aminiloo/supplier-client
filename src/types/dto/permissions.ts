export interface PermissionItem {
  view: boolean;
  update: boolean;
  delete: boolean;
  create: boolean;
}

export type SettingsModules =
  | 'account-details'
  | 'company-info'
  | 'notification-settings'
  | 'pricing-and-billings'
  | 'system-users';

export interface Permissions extends Record<SettingsModules, PermissionItem> {}
