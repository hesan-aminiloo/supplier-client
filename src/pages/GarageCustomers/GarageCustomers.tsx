import { useTranslation } from 'react-i18next';
import { Button, Icon } from '@src/components';
import { Theme } from '@src/style';
import { useState } from 'react';
import { useStore } from 'zustand';
import { coreStore } from '@src/store/core';
import { convertJsonToQueryString, useBoolean } from '@src/utils';
import axios from 'axios';
import { GarageCustomersNotFoundState } from '@src/pages/GarageCustomers/GarageCustomer.404';
import GarageCustomersFilters from '@src/pages/GarageCustomers/GarageCustomersFilters';
import { GarageFiltersInitialValues } from '@src/pages/GarageCustomers/GarageCustomers.constants';
import { GarageCustomersList } from './GarageCustomersList';
import { GarageCustomersCreateDrawer } from './GarageCustomersCreate';
import { GarageCustomerListType, GarageCustomersFilterProps, IGarageItem } from './GarageCustomers.types';
import { GarageCustomersEmptyState } from './GarageCustomer.empty';
import CreateGarageCustomerConnection from './CreateGarageCustomerConnection';

// TODO: REFACTOR THIS COMPONENT PROPERLY

const GarageCustomers: React.FC = () => {
  const { t } = useTranslation();
  const [result, setResult] = useState<GarageCustomerListType | null>();
  const [garages, setGarages] = useState<Array<IGarageItem>>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [addGarageCustomerModalOpen, setAddGarageCustomerModalOpen] = useState(false);
  const [isConnectGarageModalOpen, setIsConnectGarageModalOpen] = useBoolean(false);
  const [filters, setFilters] = useState<GarageCustomersFilterProps>(GarageFiltersInitialValues);
  const { user } = useStore(coreStore);

  const openAddGarageCustomerModal = () => setAddGarageCustomerModalOpen(true);

  const getGarageCustomersList = (newFilter: Partial<GarageCustomersFilterProps>) => {
    setFilters({ ...filters, ...newFilter });
    setLoading(true);
    axios
      .get(`customer?${convertJsonToQueryString({ ...filters, ...newFilter })}`)
      .then(({ data }) => {
        setLoading(false);
        setResult(data as GarageCustomerListType);
        const { garages: garageData } = data;

        if (newFilter.page === 1) {
          setGarages(garageData.data);
        } else {
          setGarages([...garages, ...garageData.data]);
        }

        setHasNextPage(garageData.pagination.current_page !== garageData.pagination.total_pages);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const closeAddGarageCustomerModal = (needsReload?: boolean) => {
    setAddGarageCustomerModalOpen(false);
    if (needsReload) getGarageCustomersList({ page: 1 });
  };

  const closeConnectGarageCustomerModal = (needsReload?: boolean) => {
    setIsConnectGarageModalOpen.setFalse();
    if (needsReload) getGarageCustomersList({ page: 1 });
  };

  const fetchNextPage = () => {
    if (result) {
      if (result.garages.pagination.current_page !== result.garages.pagination.last_page) {
        getGarageCustomersList({ page: result.garages.pagination.current_page + 1 });
      }
    }
  };

  return (
    <>
      <div className="flex flex-col gap-y-6">
        <p className="text-4xl font-bold">{t('garage_customers.title')}</p>
        <div className="flex justify-between items-center">
          {user?.role === 'administrator' || user?.addCustomersPermission ? (
            <div className="gap-x-6 flex">
              <Button
                className="h-11 flex items-center justify-center w-52"
                onClick={openAddGarageCustomerModal}
                leftIcon={
                  <Icon
                    name="add"
                    color={Theme.colors.white}
                    className="mr-2"
                  />
                }
              >
                {t('garage_customers.add_new_customer')}
              </Button>

              <Button
                className="h-11 w-44 mr-4 flex items-center justify-center"
                onClick={setIsConnectGarageModalOpen.setTrue}
                color="analogousIndigo"
                variant="solid"
                leftIcon={
                  <Icon
                    size="sm"
                    name="profile-2user"
                    color={Theme.colors.white}
                    className="mr-2"
                  />
                }
              >
                {t('garage_customers.connect_to_customer')}
              </Button>
            </div>
          ) : null}

          <GarageCustomersFilters
            setFilters={getGarageCustomersList}
            filters={filters}
          />
        </div>

        {garages.length === 0 && !loading && filters.search === '' && filters.branchId === '' ? (
          <GarageCustomersEmptyState onAddGarageCustomers={openAddGarageCustomerModal} />
        ) : null}

        {garages.length === 0 && !loading && (filters.search !== '' || filters.branchId !== '') ? (
          <GarageCustomersNotFoundState />
        ) : null}

        <GarageCustomersCreateDrawer
          isOpen={addGarageCustomerModalOpen}
          onClose={closeAddGarageCustomerModal}
        />

        <CreateGarageCustomerConnection
          isOpen={isConnectGarageModalOpen}
          onClose={closeConnectGarageCustomerModal}
        />
        <GarageCustomersList
          data={garages}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          loading={loading}
        />
      </div>
    </>
  );
};

export default GarageCustomers;
