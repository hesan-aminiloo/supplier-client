export const getAllNotificationsEndPoint = '/notifications';
export const changeStatusNotificationEndPoint = (notificationId: number, isRead: number) =>
  `notifications/status-read/${notificationId}/${isRead}`;
export const deletNotificationEndPoint = (notificationId: number) => `notifications/${notificationId}`;
export const readAllNotification = 'notifications/set-all-read';
