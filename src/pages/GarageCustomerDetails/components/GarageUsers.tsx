import { useState } from 'react';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Theme } from '@src/style';
import { Card, Icon, Button, Badge } from '@src/components';
import { IGarageUser } from '../GarageCustomerDetails.types';
import UserDetailsDrawer from './UserDetailsDrawer';
import { useGarageUsers } from '../GarageCustomerDetails.tools';

export const GarageUsers = ({
  users,
  refetchGarage,
}: {
  users: Array<IGarageUser>;
  refetchGarage: (garageId: string, refetchWithoutLoading?: boolean) => void;
}) => {
  const { t } = useTranslation();
  const { acceptUser, declineUser, loadingAcceptingUsers, loadingDecliningUsers } = useGarageUsers();
  const { garageId = '' } = useParams();
  const [viewMoreModal, setViewMoreModal] = useState({
    display: false,
    userId: '',
  });

  const handleCloseModal = (needsReload?: boolean) => {
    setViewMoreModal({ userId: '', display: false });
    if (needsReload) {
      refetchGarage(garageId);
    } else {
      refetchGarage(garageId, true);
    }
  };

  return (
    <>
      <div className="mt-8 grid grid-cols-3 2xl:grid-cols-4 gap-8">
        <UserDetailsDrawer
          isOpen={viewMoreModal.display}
          onClose={handleCloseModal}
          userId={Number(viewMoreModal.userId)}
          garageId={garageId}
          email={users.find((user) => viewMoreModal.userId === user.id)?.email || ''}
          phone={users.find((user) => viewMoreModal.userId === user.id)?.phone || ''}
          status={users.find((user) => viewMoreModal.userId === user.id)?.status ?? 0}
          username={users.find((user) => viewMoreModal.userId === user.id)?.username || ''}
          firstLogin={users.find((user) => viewMoreModal.userId === user.id)?.firstLogin || ''}
          lastLogin={users.find((user) => viewMoreModal.userId === user.id)?.lastLogin || ''}
          location={users.find((user) => viewMoreModal.userId === user.id)?.location || ''}
          device_name={users.find((user) => viewMoreModal.userId === user.id)?.device_name || ''}
        />

        {users.map(({ id, email, phone, role, status, username }) => {
          return (
            <Card
              key={id}
              className={clsx('w-full flex flex-col', {
                'border-2 border-warning-300': status === 0 || !status,
                'border-2 border-analogous-teal-300': status === 2,
              })}
            >
              <div className="flex w-full  justify-between">
                <Icon
                  name={role === 'administrator' ? 'user-octagon' : 'user'}
                  size="md"
                  color={Theme.colors.primary400}
                />

                {status === 0 || !status ? (
                  <Badge
                    color="warning"
                    variant="secondary"
                    size="sm"
                    className="flex gap-x-2 items-center cursor-pointer"
                    onClick={() => acceptUser(id as string, refetchGarage)}
                  >
                    <Icon
                      name="pause-circle"
                      color={Theme.colors.warning700}
                      size="sm"
                    />
                    <span className="text-warning-600 text-sm">
                      {loadingAcceptingUsers.includes(id as string) ? 'Loading...' : 'Suspended'}
                    </span>
                  </Badge>
                ) : null}
              </div>
              <div
                title={username}
                className="mt-3 text-xl text-neutral-900 font-bold h-full truncate overflow-hidden"
              >
                {username}
              </div>
              {status !== 2 ? (
                <div className="mt-4 flex gap-4 justify-between flex-1">
                  <div className="flex gap-4">
                    <a href={`tel:${phone}`}>
                      <Button
                        variant="secondary"
                        color="primary"
                      >
                        <Icon
                          name="call-calling"
                          size="sm"
                          color={Theme.colors.primary500}
                        />
                      </Button>
                    </a>
                    <a href={`mailto:${email}`}>
                      <Button
                        variant="secondary"
                        color="primary"
                      >
                        <Icon
                          name="sms"
                          size="sm"
                          color={Theme.colors.primary500}
                        />
                      </Button>
                    </a>
                  </div>
                  <div className="w-44 flex-2">
                    <Button
                      color="indigo"
                      variant="secondary"
                      className="self-end w-full"
                      onClick={() => setViewMoreModal({ userId: id as string, display: true })}
                    >
                      {t('garage_customer_details.view')}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="mt-4 flex gap-4">
                  <Button
                    color="success"
                    variant="secondary"
                    onClick={() => acceptUser(id as string, refetchGarage)}
                    fullWidth
                    disabled={loadingDecliningUsers.includes(id as string)}
                    loading={loadingAcceptingUsers.includes(id as string)}
                  >
                    {t('garage_customer_details.confirm')}
                  </Button>
                  <Button
                    color="warning"
                    variant="secondary"
                    onClick={() => declineUser(id as string, refetchGarage)}
                    fullWidth
                    disabled={loadingAcceptingUsers.includes(id as string)}
                    loading={loadingDecliningUsers.includes(id as string)}
                  >
                    {t('garage_customer_details.decline')}
                  </Button>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default GarageUsers;
