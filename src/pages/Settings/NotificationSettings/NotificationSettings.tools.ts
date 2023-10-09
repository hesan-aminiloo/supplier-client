import { NotificationSettingsOption } from './NotificationSettings.types';

export function groupByColumn(arr: Array<NotificationSettingsOption & { column: 'right' | 'left' }>) {
  const result: Record<string, NotificationSettingsOption[]> = {};
  arr.forEach((item) => {
    if (!result[item.column]) {
      result[item.column] = [];
    }
    result[item.column].push(item);
  });
  return result;
}
