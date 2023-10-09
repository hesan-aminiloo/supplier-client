import React, { useMemo, useState } from 'react';
import { Theme } from '@src/style';
import { Icon } from '@src/components';
import { useTranslation } from 'react-i18next';
import PricingAndBillingCard from './components/PricingAndBillingCard';
import PricingAndBillingList from './components/PricingAndBillingList';
import PricingCard from './components/PricingCard';
import PricingAndBillingHeader from './components/PricingAndBillingHeader';
import PricingAndBillingListEmpty from './PricindAndBillingList.empty';
import { usePricing } from './PricingAndBilling.tools';
import { CurrentMonthDataType, PricingType } from './PricingAndBilling.types';
import PricingAndBillingSkeleton from './PricingAndBilling.skeleton';

const PricingAndBilling: React.FC = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<string>();
  const { data, fetchNextPage, hasNextPage, isLoading } = usePricing(filter);
  const billings = useMemo(() => {
    const requestsPages = data?.pages.map((page) => page.data.billings.data) ?? [];
    return requestsPages?.reduce((acc, curr) => {
      return acc.concat(curr);
    }, []);
  }, [data]);
  const pricing: PricingType | {} = useMemo(() => {
    return data?.pages[0].data.pricing ?? {};
  }, [data]);

  const currentMonthData: Array<CurrentMonthDataType> = useMemo(() => {
    return data?.pages[0].data.currentMonthData || [];
  }, [data]);

  // @ts-ignore
  const { branch_cost = '', symbol = '', user_cost = '' } = pricing;
  const { branch_count = '', invoice_total = '', user_count = '' } = currentMonthData[0] || {};
  const onFilter = (value: string) => {
    setFilter(value);
  };

  const dataLength = billings.length;
  return (
    <>
      <PricingAndBillingHeader onFilter={onFilter} />
      {isLoading ? (
        <PricingAndBillingSkeleton />
      ) : (
        <>
          <div className="w-full flex flex-auto pt-8 pb-6 gap-6 border-b border-stroke-12">
            <PricingAndBillingCard
              title={t('settings.pricing_billing.month')}
              value={filter?.replace(' ', ', ')!}
            />
            <PricingAndBillingCard
              title={t('settings.pricing_billing.invoice_total')}
              value={`${symbol}${invoice_total}`}
            />
            <PricingAndBillingCard
              title={t('settings.pricing_billing.total_garage_users')}
              value={user_count}
            />
            <PricingAndBillingCard
              title={t('settings.pricing_billing.total_branches')}
              value={branch_count}
            />
          </div>
          <div className="py-10 border-b border-stroke-12">
            <h1 className="text-3xl font-bold">{t('settings.pricing_billing.pricing')}</h1>
            <div className="flex gap-8 mt-8 items-center">
              <PricingCard
                title={t('settings.pricing_billing.branch_cost').toLowerCase()}
                value={`${symbol}${branch_cost}`}
                iconProps={{
                  name: 'building',
                  color: Theme.colors.analogousIndigo600,
                }}
                badgeProps={{
                  color: 'analogousIndigo',
                }}
              />
              <div className="flex bg-white w-12 h-12 rounded-full items-center justify-center">
                <Icon
                  name="add"
                  color={Theme.colors.neutral500}
                />
              </div>
              <PricingCard
                title={t('settings.pricing_billing.per_garage_user')}
                value={`${symbol}${user_cost}`}
                iconProps={{
                  name: 'profile-2user',
                  color: Theme.colors.primary500,
                }}
                badgeProps={{
                  color: 'primary',
                }}
              />
            </div>
          </div>
          {billings.length ? (
            <PricingAndBillingList
              billings={billings}
              userCost={user_cost}
              dataLength={dataLength}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
            />
          ) : (
            <PricingAndBillingListEmpty />
          )}
        </>
      )}
    </>
  );
};

export default PricingAndBilling;
