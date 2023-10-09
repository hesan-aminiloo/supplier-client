import type { FC } from 'react';
import { NotificationTypesEnum } from '../Notifications.types';
import { BagIcon, DangerIcon, MessageIcon, UserIcon } from '../assets';

interface AvatarStatusProps {
  type: NotificationTypesEnum;
  status?: string;
}
const AvatarStatus: FC<AvatarStatusProps> = ({ type, status }) => {
  switch (type) {
    case NotificationTypesEnum.Request:
      return (
        <div className="absolute bottom-0 left-0 bg-primary-600 rounded-full p-1 w-6 h-6 border-2 border-neutral-50 flex items-center justify-center">
          <BagIcon />
        </div>
      );
    case NotificationTypesEnum.System:
      return (
        <div className="absolute bottom-0 left-0 bg-warning-600 rounded-full p-1 w-6 h-6 border-2 border-neutral-50 flex items-center justify-center">
          <DangerIcon />
        </div>
      );
    case NotificationTypesEnum.Massege:
      return (
        <div className="absolute bottom-0 left-0 bg-neutral-600 rounded-full p-1 w-6 h-6 border-2 border-neutral-50 flex items-center justify-center">
          <MessageIcon />
        </div>
      );
    case NotificationTypesEnum.User:
      if (status === 'suspended' || status === 'activated')
        return (
          <div className="absolute bottom-0 left-0 bg-warning-600 rounded-full p-1 w-6 h-6 border-2 border-neutral-50 flex items-center justify-center">
            <DangerIcon />
          </div>
        );
      return (
        <div className="absolute bottom-0 left-0 bg-success-600 rounded-full p-1 w-6 h-6 border-2 border-neutral-50 flex items-center justify-center">
          <UserIcon />
        </div>
      );
    default:
      return null;
  }
};

export default AvatarStatus;
