import React, { useEffect } from 'react';
import moment from 'moment';
import { useGarageDetails } from '@src/pages/GarageCustomerDetails/GarageCustomerDetails.tools';
import { Content } from '@src/layouts/Content';
import { GetRequestsBody, RequestFiltersData } from '@src/pages/Request/RequestsList/Requests.types';
import { useRequests } from '@src/pages/Request/RequestsList/RequestsList.tools';
import { useFilter } from '@src/utils';
import { useParams, useSearchParams } from 'react-router-dom';
import PusherSingleton from '@utils/pusher';
import Pusher from 'pusher-js';
import { useStore } from 'zustand';
import { coreStore } from '@src/store/core';
import { REQUEST_FILTER_DEFAULT_VALUES } from '../Requests.constants';
import { RequestsList } from '../RequestsList';
import { RequestFilters } from '../RequestFilters';

const Requests: React.FC = () => {
  const { isLoading: isLoadingGarage, garageDetails } = useGarageDetails();
  const { time, garageId } = useParams();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useFilter<RequestFiltersData>({
    search: searchParams.get('search') || REQUEST_FILTER_DEFAULT_VALUES.filters.search,
    status: searchParams.getAll('status').length
      ? searchParams.getAll('status')
      : REQUEST_FILTER_DEFAULT_VALUES.filters.status,
    time: time || REQUEST_FILTER_DEFAULT_VALUES.filters.time,
    type: REQUEST_FILTER_DEFAULT_VALUES.filters.type,
    value: REQUEST_FILTER_DEFAULT_VALUES.filters.value,
    branch: REQUEST_FILTER_DEFAULT_VALUES.filters.branch,
    garageId: garageId ?? '0',
  });
  const [page, setPage] = React.useState<number>(REQUEST_FILTER_DEFAULT_VALUES.page);
  const { data, fetchNextPage, isLoading, hasNextPage, refetch, isRefetching } = useRequests({ filters, page });
  const { user, token } = useStore(coreStore);

  const handleSearch = (filterBranch?: boolean) => (newFilters: GetRequestsBody) => {
    const allFilters = { filters, page };
    if (allFilters !== newFilters) {
      setPage(newFilters.page);
      setFilters.changeFilters({
        ...newFilters.filters,
        branch: filterBranch ? newFilters.filters.branch : filters.branch,
      });
    } else {
      refetch();
    }
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (token) {
      const pusher = PusherSingleton.getInstance(token);
      const channel = pusher?.subscribe(`private-channel-notify.${user?.room}`);
      channel?.bind('App\\Events\\NotificationEvent', (event: { data: { type: 'request' } }) => {
        if (event.data.type === 'request') {
          refetch();
        }
      });
      Pusher.logToConsole = true;
      return () => {
        pusher?.unsubscribe(`private-channel-notify.${user?.room})`);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return (
    <Content
      pageTitle={garageDetails ? `${garageDetails.name}'s Requests on ${moment(filters.time).format('MMM yyyy')}` : ''}
      canGoBack
    >
      <RequestFilters
        filters={{ filters, page }}
        onSubmit={handleSearch(false)}
        isGarageRequestsPage
      />
      <RequestsList
        filters={{ filters, page }}
        data={data}
        isLoading={isLoading || isRefetching || isLoadingGarage}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      />
    </Content>
  );
};

export default Requests;
