import Loading from '@src/components/Loading';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PRICING_AND_BILLING_LABELS } from '../PricingAndBilling.constant';
import { BillingItemsType, StatementListType } from '../PricingAndBilling.types';
import PricingAndBillingItem from './PricingAndBillingItem';
import StatementModal from './StatementModal';

interface PricingAndBillingListProps {
  billings: Array<BillingItemsType>;
  userCost: number;
  dataLength: number;
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
}

interface StatementModalType {
  isOpen: boolean;
  name?: string;
  create_date?: string;
}

const PricingAndBillingList: React.FC<PricingAndBillingListProps> = ({
  billings,
  userCost,
  dataLength,
  hasNextPage,
  fetchNextPage,
}) => {
  const { t } = useTranslation();
  const [statementModalProps, setStatementModalProps] = useState<StatementModalType>({ isOpen: false });
  const [statement, setStatment] = useState<StatementListType>();
  const [currency, setCurrency] = useState<string>();
  return (
    <div className="py-8">
      <div className="flex w-full justify-between">
        {PRICING_AND_BILLING_LABELS.map((label) => (
          <p
            key={label}
            className="flex-1 text-neutral-500 ml-4 first:ml-6"
          >
            {t(label)}
          </p>
        ))}
      </div>

      <div className="flex flex-col gap-4 mt-4">
        <InfiniteScroll
          dataLength={dataLength}
          hasMore={!!hasNextPage}
          next={() => fetchNextPage?.()}
          loader={dataLength ? <Loading /> : ''}
        >
          {billings?.map((item) => (
            <PricingAndBillingItem
              key={item.id}
              item={item}
              OpenStatementModal={(statementList: StatementListType, symbol: string) => {
                setStatementModalProps({ isOpen: true, name: item.name, create_date: item.create_date });
                setStatment(statementList);
                setCurrency(symbol);
              }}
              userCost={userCost}
            />
          ))}
        </InfiniteScroll>
      </div>
      <StatementModal
        {...statementModalProps}
        onClose={() => setStatementModalProps({ isOpen: false })}
        statement={statement}
        userCost={userCost}
        currency={currency}
      />
    </div>
  );
};
export default PricingAndBillingList;
