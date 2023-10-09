import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Content } from '@src/layouts/Content';
import { GetRequestsBody, RequestFiltersData } from '@src/pages/Request/RequestsList/Requests.types';
import { useRequests } from '@src/pages/Request/RequestsList/RequestsList.tools';
import { useFilter } from '@src/utils';
import { useSearchParams } from 'react-router-dom';
import PusherSingleton from '@utils/pusher';
import Pusher from 'pusher-js';
import { useStore } from 'zustand';
import { coreStore } from '@src/store/core';
import { REQUEST_FILTER_DEFAULT_VALUES } from './Requests.constants';
import { RequestsList } from './RequestsList';
import { RequestFilters } from './RequestFilters';
import RequestBranchFilter from './RequestBranchFilter';

const Requests: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useFilter<RequestFiltersData>({
    search: searchParams.get('search') || REQUEST_FILTER_DEFAULT_VALUES.filters.search,
    status: searchParams.getAll('status').length
      ? searchParams.getAll('status')
      : REQUEST_FILTER_DEFAULT_VALUES.filters.status,
    time: searchParams.get('time') || REQUEST_FILTER_DEFAULT_VALUES.filters.time,
    type: searchParams.get('type') || REQUEST_FILTER_DEFAULT_VALUES.filters.type,
    value: searchParams.get('value') || REQUEST_FILTER_DEFAULT_VALUES.filters.value,
    branch: searchParams.get('branch') || REQUEST_FILTER_DEFAULT_VALUES.filters.branch,
  });
  const [page, setPage] = React.useState<number>(REQUEST_FILTER_DEFAULT_VALUES.page);
  const { t } = useTranslation();
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
      pageTitle={t('requests.requests')}
      rightContent={
        user && (user?.role === 'administrator' || user?.branch?.length > 1) ? (
          <RequestBranchFilter
            filters={{ filters, page }}
            onSubmit={handleSearch(true)}
          />
        ) : null
      }
    >
      <RequestFilters
        filters={{ filters, page }}
        onSubmit={handleSearch(false)}
      />
      <RequestsList
        filters={{ filters, page }}
        data={data}
        isLoading={isLoading || isRefetching}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      />
    </Content>
  );
};

export default Requests;
