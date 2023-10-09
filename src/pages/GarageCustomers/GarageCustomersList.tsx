import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import Loading from '@components/Loading';
import { Button, Card, Avatar } from '@src/components';
import { scrollToTop } from '@src/utils/helpers';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { GARAGE_CUSTOMERS_PAGE_PATH, generateImageUrl } from '@src/utils';
import clsx from 'clsx';
import { SKELETON_ITEMS_COUNT } from './GarageCustomers.constants';
import { IGarageItem } from './GarageCustomers.types';

interface Props {
  data: any;
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  loading: boolean;
}

export const GarageCustomersList = ({ data, fetchNextPage, hasNextPage, loading }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    scrollToTop();
  }, []);
  if (loading) {
    const SKELETONS = new Array(SKELETON_ITEMS_COUNT).fill('sk');
    return (
      <div className="relative grid grid-cols-3 2xl:grid-cols-4 grid-rows-2 gap-8 overflow-hidden">
        {SKELETONS.map((_, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className="relative flex flex-col bg-white border h-72 border-stroke-4 rounded-xl shadow-xs"
          >
            <div className="skeleton-effect overflow-hidden">
              <div className="w-24 mt-4 h-24 !rounded-full overflow-hidden absolute top-4 left-1/2 -translate-x-1/2" />
              <div className="w-36 mt-8 h-4 rounded-sm absolute top-2 left-1/2 -translate-x-1/2" />
              <div className="w-52 mt-3 h-4 rounded-sm absolute top-1 left-1/2 -translate-x-1/2" />
              <div className="w-full mt-3 h-16 rounded-sm absolute -bottom-7 left-0" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <InfiniteScroll
      dataLength={data.length}
      hasMore={!!hasNextPage}
      next={() => fetchNextPage?.()}
      loader={<Loading classNames="col-span-3" />}
      className="grid gap-8 grid-cols-3 2xl:grid-cols-4"
    >
      {data?.map((customer: IGarageItem) => (
        <Card
          key={customer.id}
          className={clsx('h-80 flex relative flex-col items-center', {
            'border-2 border-stroke-12': !customer.active,
          })}
        >
          <Avatar
            size="hg"
            src={customer.logo ? generateImageUrl(customer.logo) : ''}
            userName={customer.name}
            alt={customer.name}
            className={clsx('mt-6', {
              grayscale: !customer.active,
            })}
          />
          <div className="mt-5 flex flex-col items-center">
            <p
              className={clsx('text-xl font-bold mb-1', {
                'text-neutral-900': customer.active,
                'text-neutral-600': !customer.active,
              })}
            >
              {' '}
              {customer.name}{' '}
            </p>
            <p
              className={clsx('text-xs', { 'text-neutral-500': customer.active, 'text-neutral-400': !customer.active })}
            >
              {' '}
              {customer.branch_name}{' '}
            </p>
          </div>
          <Button
            className={clsx('absolute bottom-0 text-white h-14 !rounded-t-none rounded-b-xl w-full', {
              'bg-primary-900': customer.active,
              'bg-neutral-400': !customer.active,
            })}
            disabled={!customer.active}
            onClick={() => navigate(`${GARAGE_CUSTOMERS_PAGE_PATH}/${customer.id}`)}
          >
            {t('garage_customers.view_more')}
          </Button>
        </Card>
      ))}
    </InfiniteScroll>
  );
};
