import React, { useMemo, useState } from 'react';

// Hooks
import { useTranslation } from 'react-i18next';

// Local components
import { customFetcher, errorToast, successToast } from '@src/utils';
import { Button, Icon, SettingsHeader } from '@src/components';
import Loading from '@src/components/Loading';
import { Theme } from '@src/style';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IMessageResponse } from '@src/types/dto/systemUsers';
import PopUp from '@src/components/pop-up/PopUp';
import SystemUserItem from './SystemUserItem';

// Constants
import { USER_LIST_LABELS } from '../SystemUsers.constants';

import { SystemUsersItem } from '../SystemUsers.types';
import { SystemUsersSkeleton } from '../SystemUsers.skeleton';
import SystemUserAddDrawer from './SystemUserAddDrawer';
import { SystemUsersEmptyState } from './SystemUsers.empty';
import { useBranches, useUserSystems } from './SystemUserList.tools';
import SystemUsersFilter from './SystemUsersFilter';

const SystemUserList = () => {
  const [checkedUsersArray, setCheckedUsersArray] = useState<string[]>([]);
  const [addSystemUserOpen, setAddSystemUserOpen] = useState<boolean>(false);
  const [branchId, setBranchId] = useState<string | number>('');
  const [isPopupOpen, setPopupOpen] = useState(false);
  const { data, fetchNextPage, hasNextPage, isLoading, refetch } = useUserSystems(branchId);
  const { data: dataBranches } = useBranches();
  const branches = useMemo(() => {
    return (
      dataBranches?.data.data.map((branch: { name: string; id: number }) => {
        return branch;
      }) || []
    );
  }, [dataBranches]);
  const systemUsers = useMemo(() => {
    const requestsPages = data?.pages.map((page) => page.data.users) ?? [];
    return requestsPages?.reduce((acc, curr) => {
      return acc.concat(curr);
    }, []);
  }, [data]);

  const { t } = useTranslation();

  const handleCheckedUsers = (checkedUserId: string) => {
    if (checkedUsersArray.includes(checkedUserId)) {
      setCheckedUsersArray(checkedUsersArray.filter((userId) => userId !== checkedUserId));
    } else {
      setCheckedUsersArray([...checkedUsersArray, checkedUserId]);
    }
  };

  const handleDeleteMultipleUsers = (users: string[]) => {
    customFetcher<IMessageResponse>('system/user/delete_all', {
      method: 'POST',
      body: JSON.stringify({ ids: users }),
    })
      .then(() => {
        successToast({ message: t('settings.system_users.form.user_deleted') });
        setCheckedUsersArray([]);
        refetch();
      })
      .catch(() => {
        errorToast({ message: t('shared.something_wrong') });
      });
    setPopupOpen(false);
  };

  const dataLength = systemUsers.length;

  return (
    <>
      <div className="flex items-center justify-between ">
        <SettingsHeader canGoBack>{t('settings.system_users.system_users')}</SettingsHeader>
        <div className="flex gap-4">
          {systemUsers?.length ? (
            <Button
              leftIcon={
                <Icon
                  name="add"
                  color={Theme.colors.white}
                />
              }
              onClick={() => setAddSystemUserOpen(true)}
              className="h-11 rounded-xl flex items-center text-sm justify-center
           text-white w-52"
            >
              {t('settings.system_users.add_new_user')}
            </Button>
          ) : null}
          <SystemUsersFilter
            branches={branches}
            branchId={branchId}
            onSelect={(id: number) => {
              setBranchId(id);
            }}
          />
        </div>
      </div>
      {!isLoading ? (
        <div>
          <div>
            {!systemUsers?.length ? (
              <SystemUsersEmptyState onAddSystemUsers={() => setAddSystemUserOpen(true)} />
            ) : null}

            {systemUsers?.length ? (
              <div className="flex flex-col w-full gap-y-3 mt-12 pt-12  border-t border-stroke-12">
                <div className="flex w-full ">
                  {USER_LIST_LABELS.map((label) => (
                    <p
                      key={label}
                      className="flex-1 text-neutral-500 ml-10 last:flex-none last:w-20 last:mr-14"
                    >
                      {t(label)}
                    </p>
                  ))}
                </div>
                {checkedUsersArray.length ? (
                  <div className="flex w-full justify-between py-5 border-y border-y-neutral-200 hidden">
                    <span className="text-neutral-500 flex items-center">
                      {`You have selected ${checkedUsersArray.length} ${
                        checkedUsersArray.length > 1 ? 'users' : 'user'
                      }`}
                    </span>
                    <Button
                      color="destructive"
                      onClick={() => setPopupOpen(true)}
                      leftIcon={
                        <Icon
                          name="trash"
                          color={Theme.colors.white}
                        />
                      }
                      className="w-10 h-10 !p-0 flex justify-center items-center"
                    />
                  </div>
                ) : null}
                <InfiniteScroll
                  dataLength={dataLength}
                  hasMore={!!hasNextPage}
                  next={() => fetchNextPage?.()}
                  loader={<Loading />}
                >
                  {systemUsers.map((user: SystemUsersItem) => (
                    <SystemUserItem
                      key={user.id}
                      user={user}
                      onDeleteMultipleUsers={handleCheckedUsers}
                      checkedUsersArray={checkedUsersArray}
                      getSystemUsersList={refetch}
                      branches={branches}
                    />
                  ))}
                </InfiniteScroll>
              </div>
            ) : null}
          </div>
          <SystemUserAddDrawer
            isOpen={addSystemUserOpen}
            onClose={() => setAddSystemUserOpen(false)}
            getSystemUsersList={refetch}
            branches={branches}
          />
          <PopUp
            title={t('settings.system_users.modal.delete_users')}
            description={t('settings.system_users.modal.are_you_sure')}
            isOpen={isPopupOpen}
            submit={() => handleDeleteMultipleUsers(checkedUsersArray)}
            onClose={() => setPopupOpen(false)}
          />
        </div>
      ) : null}
      {isLoading ? <SystemUsersSkeleton /> : null}
    </>
  );
};
export default SystemUserList;
