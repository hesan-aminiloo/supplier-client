import { NotificationTypesEnum } from './Notifications.types';

const getNotificationLink = (type: NotificationTypesEnum, accountId?: number, requestId?: number): string => {
  switch (type) {
    case NotificationTypesEnum.Request:
      return `/requests/${requestId}`;
    case NotificationTypesEnum.Massege:
      return `/requests/${requestId}?chat=1`;
    case NotificationTypesEnum.User:
      return `/garage-customers/${accountId}`;
    default:
      return '';
  }
};

export default getNotificationLink;
