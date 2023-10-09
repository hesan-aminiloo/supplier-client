/* eslint-disable react/no-danger */
import { type FC, useState, MouseEvent } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { generateImageUrl } from '@src/utils';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Avatar, Button } from '@src/components';
import { useTranslation } from 'react-i18next';
import { NotificationItemDTO } from './Notifications.types';
import AvatarStatus from './compoenets/NotificationAvatarStatus';
import DropDownNotificationCard from './compoenets/DropDown';
import getNotificationLink from './Notifications.utils';

interface NotificationCardProps extends Partial<NotificationItemDTO> {
  onDelete: (id: number) => void;
  onChangeStatus: (id: number, isread: number) => void;
}

const NotificationCard: FC<NotificationCardProps> = ({
  data,
  created_at,
  is_read,
  type,
  id,
  onDelete,
  onChangeStatus,
}) => {
  const isRead = Number(is_read);
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const { t } = useTranslation();
  const { data: notifyData, sender } = data || {};
  const navigate = useNavigate();
  const handleReadAndNavigate = (e: MouseEvent) => {
    const element = e.target as HTMLElement;
    if (element.tagName === 'SPAN') {
      if (!isRead) {
        onChangeStatus(id!, 1);
      }
      navigate(getNotificationLink(type!, sender?.account_id, notifyData?.request_id));
    }
  };

  return (
    <Card className="flex justify-between items-center my-4">
      <div className={clsx('flex  items-center', isRead ? 'pl-7' : 'ml-0')}>
        {!isRead && <div className="bg-primary-700 w-2.5 h-2.5 rounded-full mr-4" />}
        <Avatar
          src={generateImageUrl(`/storage/Logo/${sender?.account_logo}`) || ''}
          size="lg"
          slot={
            <AvatarStatus
              type={type!}
              status={notifyData?.status}
            />
          }
          userName={sender?.account_name}
        />
        <div className="flex flex-col ml-3">
          <span className={clsx('text-sm', !isRead ? 'text-primary-700' : 'text-neutral-500')}>
            {moment(created_at).fromNow()}
          </span>
          <span
            className="text-lg text-neutral-900 font-bold first-letter:capitalize"
            dangerouslySetInnerHTML={{
              __html: t(`notifications.${type}.${notifyData?.status}.title`, {
                garageName: sender?.account_name,
                type: notifyData?.type || 'Order',
              }),
            }}
          />
          <button onClick={handleReadAndNavigate}>
            <p
              className="text-base text-neutral-700 first-letter:capitalize"
              dangerouslySetInnerHTML={{
                __html: t(`notifications.${type}.${notifyData?.status}.description`, {
                  garageName: sender?.account_name,
                  requestType: notifyData?.type,
                  name: notifyData?.username,
                  requestId: notifyData?.request_id,
                  type: notifyData?.type || 'order',
                }),
              }}
            />
          </button>
        </div>
      </div>
      <div className="flex gap-4">
        <Button
          size="md"
          className="py-0"
          onClick={() => {
            if (!isRead) onChangeStatus(id!, 1);
          }}
        >
          <Link
            to={getNotificationLink(type!, sender?.account_id, notifyData?.request_id)}
            className="text-sm px-2 font-normal"
          >
            View
          </Link>
        </Button>
        <DropDownNotificationCard
          isOpen={isOpenDropDown}
          toggle={() => setIsOpenDropDown(!isOpenDropDown)}
          onClose={() => setIsOpenDropDown(false)}
        >
          <Card className="w-[123px] absolute flex flex-col top-5 z-10 right-5 shadow-md px-2 py-2">
            {isRead ? (
              <Button
                variant="tertiary"
                size="sm"
                className="text-left px-2 py-2 border-0 hover:bg-neutral-50"
                onClick={() => onChangeStatus(id!, 0)}
              >
                Mark as unread
              </Button>
            ) : (
              <Button
                variant="tertiary"
                size="sm"
                className="text-left px-2 py-2 border-0 hover:bg-neutral-50"
                onClick={() => onChangeStatus(id!, 1)}
              >
                Mark as read
              </Button>
            )}
            <Button
              variant="tertiary"
              size="sm"
              className="text-left px-2 py-2 border-0 hover:bg-neutral-50"
              onClick={() => onDelete(id!)}
            >
              Delete
            </Button>
          </Card>
        </DropDownNotificationCard>
      </div>
    </Card>
  );
};

export default NotificationCard;
