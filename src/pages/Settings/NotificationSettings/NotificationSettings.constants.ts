import { NotificationSettingsOption } from './NotificationSettings.types';

export const NOTIFICATION_SETTINGS_OPTIONS: Array<NotificationSettingsOption & { column: 'right' | 'left' }> = [
  { id: '0', label: 'settings.notification_settings.push_notifications', checked: true, column: 'left' },
  { id: '1', label: 'settings.notification_settings.email_notifications', checked: true, column: 'left' },
  { id: '2', label: 'settings.notification_settings.order_quote_updates', checked: true, column: 'right' },
  { id: '3', label: 'settings.notification_settings.messages', checked: true, column: 'right' },
];
