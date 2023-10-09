import clsx from 'clsx';

// Components
import { FC, useMemo, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import RenderWhen from '@components/RenderWhen';
import Loading from '@components/Loading';

// Hooks
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RequestsListProps } from '@src/pages/Request/RequestsList/Requests.types';
import { RequestsTableSkeleton } from '@src/pages/Request/RequestsList/Requests.skeleton';
import { RequestsListEmptyState } from '@src/pages/Request/RequestsList/RequestsListEmptyState';
import { REQUESTS_PAGE_PATH } from '@src/utils';

// Local components
import { RequestListItem } from './RequestListItem';

// Constants
import { REQUEST_LIST_LABELS } from './Requests.constants';

import styles from './Requests.module.scss';

export const RequestsList: FC<RequestsListProps> = ({ data, filters, isLoading, hasNextPage, fetchNextPage }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const upperScrollbar = useRef<HTMLDivElement>(null);
  const lowerScrollbar = useRef<any>(null);
  const handleRequestOnClick = (id: string | number) => {
    navigate(`${REQUESTS_PAGE_PATH}/${id}`);
  };
  const requests = useMemo(() => {
    const requestsPages = data?.pages.map((page) => page.data['supplier requests'].data) ?? [];
    return requestsPages?.reduce((acc, curr) => {
      return acc.concat(curr);
    }, []);
  }, [data]);
  const dataLength = requests.length;

  const handleUpperScroll = () => {
    if (lowerScrollbar.current && upperScrollbar.current) {
      lowerScrollbar.current.scrollLeft = upperScrollbar.current.scrollLeft;
    }
  };

  const handleLowerScroll = () => {
    if (lowerScrollbar.current && upperScrollbar.current) {
      upperScrollbar.current.scrollLeft = lowerScrollbar.current.scrollLeft;
    }
  };
  return (
    <>
      <RenderWhen is={!isLoading && requests.length === 0}>
        <RequestsListEmptyState />
      </RenderWhen>
      <RenderWhen is={isLoading && filters.page === 1}>
        <div className="flex relative flex-col w-full gap-y-3 mt-12">
          <RequestsTableSkeleton />
        </div>
      </RenderWhen>
      <RenderWhen is={requests && requests?.length && !(isLoading && filters.page === 1)}>
        <div
          className={clsx(styles['upper-scrollbar'], ' mt-16')}
          ref={upperScrollbar}
          onScroll={handleUpperScroll}
        >
          <div className={styles['request-list']}>.</div>
        </div>
        <div
          className={styles['lower-scrollbar']}
          ref={lowerScrollbar}
          onScroll={handleLowerScroll}
        >
          <InfiniteScroll
            dataLength={dataLength}
            hasMore={!!hasNextPage}
            next={() => fetchNextPage?.()}
            loader={<Loading />}
            className={styles['request-list']}
          >
            <table className={clsx('flex flex-col w-full justify-start items-start gap-y-3 ')}>
              <th className="flex w-full justify-between">
                {REQUEST_LIST_LABELS.map((label) => (
                  <td
                    key={label.name}
                    className={clsx('text-neutral-500 text-left', label.className)}
                  >
                    {t(label.name)}
                  </td>
                ))}
              </th>
              <tbody className="flex flex-col w-full justify-start items-start gap-y-3 mt-1">
                {requests.map((request) => (
                  <RequestListItem
                    key={request.id}
                    request={request}
                    onClick={() => handleRequestOnClick(request.id)}
                  />
                ))}
              </tbody>
            </table>
          </InfiniteScroll>
        </div>
      </RenderWhen>
    </>
  );
};
