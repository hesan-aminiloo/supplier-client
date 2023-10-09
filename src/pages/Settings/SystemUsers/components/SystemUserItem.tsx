// Local components
import Avatar from '@src/components/avatar/Avatar';
import { Button } from '@src/components/button';
import { Checkbox, Switch, Icon } from '@src/components';
import { Theme } from '@src/style';
import { customFetcher, errorToast, generateImageUrl, successToast } from '@src/utils';
import { useState } from 'react';
import { IMessageResponse } from '@src/types/dto/systemUsers';
import { useTranslation } from 'react-i18next';
import PopUp from '@src/components/pop-up/PopUp';
// Types
import type { UserItemPropsI } from '../SystemUsers.types';
import EditSystemUserDrawer from './SystemUserEditDrawer';

const SystemUserItem: React.FC<UserItemPropsI> = ({
  user,
  checkedUsersArray,
  onDeleteMultipleUsers,
  getSystemUsersList,
  branches,
}) => {
  const [activeStatus, setActiveStatus] = useState<boolean>(Boolean(user.active));
  const [editSystemUserOpen, setEditSystemUserOpen] = useState<boolean>(false);
  const [isStatusLoading, setIsStatusLoading] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [isChangeStatusOpen, setChangeStatusOpen] = useState(false);

  const { t } = useTranslation();

  const handleDeleteUser = (userId: number) => {
    customFetcher<IMessageResponse>(`system/user/${userId}`, {
      method: 'DELETE',
      body: null,
    })
      .then(() => {
        successToast({ message: t('settings.system_users.form.user_deleted') });
        setIsDeleteLoading(false);
        getSystemUsersList();
      })
      .catch(() => {
        errorToast({ message: t('settings.system_users.form.something_wrong') });
      });
    setDeletePopupOpen(false);
  };

  const handleChangeStatus = (userId: number) => {
    setIsStatusLoading(true);

    customFetcher<IMessageResponse>(`system/user/status`, {
      method: 'POST',
      body: JSON.stringify({ id: userId, active: !activeStatus }),
    })
      .then(() => {
        successToast({ message: t('settings.system_users.form.status_changed') });
        setIsStatusLoading(false);
        setActiveStatus((prev) => !prev);
      })
      .catch(() => {
        errorToast({ message: t('settings.system_users.form.something_wrong') });
      });
    setChangeStatusOpen(false);
  };

  const handleOpenEditModal = () => {
    setEditSystemUserOpen(true);
  };

  const handleCloseEditDrawer = () => {
    setEditSystemUserOpen(false);
  };

  return (
    <>
      <div
        onClick={handleOpenEditModal}
        role="button"
        onKeyUp={handleOpenEditModal}
        tabIndex={0}
        className="flex w-full py-4 my-4 text-sm bg-white items-center
       px-6 border rounded-xl border-stroke-4"
      >
        <Checkbox
          size="md"
          className="flex hidden"
          name="checked"
          value=""
          id={user.id.toString()}
          checked={Boolean(checkedUsersArray?.includes(`${user.id}`))}
          onClick={(e) => {
            e.stopPropagation();
            onDeleteMultipleUsers(user.id.toString());
          }}
        />
        <div className="flex flex-1 ml-4 items-center">
          <Avatar
            size="md"
            src={generateImageUrl(user.avatar as string)}
            userName={`${user.firstName} ${user.lastName}`}
          />
          <div className="ml-3">
            <p>
              <span className="mr-1 font-medium">{user.firstName}</span>
              <span>{user.lastName}</span>
            </p>
            <p className="text-neutral-500">{user.branch[0]?.name}</p>
          </div>
        </div>
        <p className="flex-1 font-medium">{user.email}</p>
        <p className="flex-1 font-medium">{user.phone}</p>
        <p className="flex-1 font-medium capitalize">{user.role === 'user' ? 'Standard user' : user.role}</p>
        <Switch
          id={user.id.toString()}
          name="status"
          className="mr-3"
          checked={activeStatus}
          disabled={isStatusLoading}
          onClick={(e) => {
            e.stopPropagation();
            setChangeStatusOpen(true);
          }}
        />
        <Button
          leftIcon={
            <Icon
              name="trash"
              color={Theme.colors.destructive500}
              size="sm"
            />
          }
          className="shadow-xs ml-7 w-10 h-10 flex  !border-destructive-100 !bg-destructive-50 p-1.5 items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            setDeletePopupOpen(true);
          }}
          variant="outline"
          disabled={isDeleteLoading}
        />
      </div>
      <PopUp
        title={t('settings.system_users.modal.delete_users')}
        description={t('settings.system_users.modal.are_you_sure')}
        isOpen={isDeletePopupOpen}
        submit={() => handleDeleteUser(user.id)}
        onClose={() => setDeletePopupOpen(false)}
      />
      <EditSystemUserDrawer
        isOpen={editSystemUserOpen}
        onClose={handleCloseEditDrawer}
        handleDeleteUser={() => handleDeleteUser(user.id)}
        user={user}
        getSystemUsersList={getSystemUsersList}
        branches={branches}
        setDeletePopupOpen={setDeletePopupOpen}
      />
      <PopUp
        title={t('settings.system_users.modal.change_status')}
        description={t('settings.system_users.modal.change_status_description')}
        isOpen={isChangeStatusOpen}
        submit={() => handleChangeStatus(user.id)}
        onClose={() => setChangeStatusOpen(false)}
      />
    </>
  );
};

export default SystemUserItem;
