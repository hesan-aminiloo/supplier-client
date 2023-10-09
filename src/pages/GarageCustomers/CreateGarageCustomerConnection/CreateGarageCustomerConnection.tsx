import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { DrawerHeader, DrawerPlacement, ModalDrawer } from '@src/components';
import RenderWhen from '@components/RenderWhen';
import { useConnectGarage, useSearchGarageForm } from './CreateGarageCustomerConnection.tools';
import CreateGarageCustomerConnectionSearch from './CreateGarageCustomerConnectionSearch';
import CreateGarageCustomerConnectionDefaultState from './DefaultState';
import CreateGarageCustomerConnectionNotFoundState from './NotFoundState';
import CreateGarageCustomerConnectionGarageDetails from './CreateGarageCustomerConnectionGarageDetails';
import { ICreateGarageConnection } from './CreateGarageCustomerConnection.types';

// Styles
import styles from './CreateGarageCustomerConnection.module.scss';

export const CreateGarageCustomerConnection = ({ isOpen, onClose }: ICreateGarageConnection) => {
  const { t } = useTranslation();
  const { methods, onSubmit, isError, isLoading, data, reset } = useSearchGarageForm();
  const connectGarage = useConnectGarage(() => {
    onClose(true);
    methods.reset();
  });

  const handleConnectGarage = (branchId: number) => {
    if (data) {
      connectGarage.mutateAsync({ garageId: data?.garage.id, branchId }).then(reset);
    }
  };
  return (
    <ModalDrawer
      type="drawer"
      placement={DrawerPlacement.Right}
      isOpen={isOpen}
      onClosed={() => {
        onClose(false);
      }}
    >
      <div className="h-full bg-neutral-100 overflow-auto">
        <DrawerHeader
          title={t('garage_customer_details.connect_garage_customer.title')}
          onClose={() => {
            onClose(false);
            methods.reset();
          }}
        />
        <div className="px-6 border-b-2 border-b-stroke-4">
          <CreateGarageCustomerConnectionSearch
            onSubmit={onSubmit}
            methods={methods}
            isLoading={isLoading}
          />
        </div>
        <div className={clsx('p-6 flex items-center justify-center', styles.connection)}>
          <RenderWhen is={isError}>
            <CreateGarageCustomerConnectionNotFoundState />
          </RenderWhen>
          <RenderWhen is={!data && !isError}>
            <CreateGarageCustomerConnectionDefaultState />
          </RenderWhen>
          {data && !isError && !isLoading ? (
            <CreateGarageCustomerConnectionGarageDetails
              isLoading={connectGarage.isLoading}
              onSubmit={handleConnectGarage}
              data={data}
            />
          ) : null}
        </div>
      </div>
    </ModalDrawer>
  );
};

export default CreateGarageCustomerConnection;
