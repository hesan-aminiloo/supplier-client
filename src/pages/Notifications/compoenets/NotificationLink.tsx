import type { FC } from 'react';
import { NotificationItemDTO, NotificationTypesEnum } from '../Notifications.types';

const NotificationLink: FC<Partial<NotificationItemDTO>> = ({ type, data }) => {
  switch (type) {
    case NotificationTypesEnum.Request:
      return <a href={`https://suppapp.availcat.com/requests/${data?.data.request_id}`}>{data?.data.request_id}</a>;
    case NotificationTypesEnum.System:
      return <a>typp</a>;
    case NotificationTypesEnum.Massege:
      return <a href={`https://suppapp.availcat.com/requests/${data?.data.request_id}`}>{data?.data.request_id}</a>;
    case NotificationTypesEnum.User:
      return <a href={`https://suppapp.availcat.com/garage-customers/${data?.sender?.account_id}`}>msms</a>;
    default:
      return null;
  }
};

export default NotificationLink;
