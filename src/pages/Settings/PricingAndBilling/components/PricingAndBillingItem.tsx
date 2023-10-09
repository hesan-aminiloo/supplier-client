import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { BillingItemsType, StatementListType } from '../PricingAndBilling.types';

interface PricingAndBillingItemProps {
  item: BillingItemsType;
  userCost: number;
  OpenStatementModal: (value: StatementListType, currency: string) => void;
}
const PricingAndBillingItem: React.FC<PricingAndBillingItemProps> = ({ item, OpenStatementModal, userCost }) => {
  const { branch_seats, name, users_seats, statment, currency } = item;
  const { t } = useTranslation();

  return (
    <div
      className="flex w-full p-6 text-sm bg-white items-center
  border rounded-xl border-stroke-4 justify-between"
    >
      <p className="flex-1 ml-1">{name}</p>
      <p className="flex-1 ml-10">{users_seats / userCost}</p>
      <p className="flex-1 ml-10">
        {currency}
        {users_seats}
      </p>
      <p className="flex-1 ml-10">
        {currency}
        {branch_seats}
      </p>
      <p className="flex-1 ml-8">
        <button
          type="button"
          onClick={() => OpenStatementModal(statment, currency)}
          disabled={!statment.length}
        >
          <p
            className={clsx('ext-center', {
              'text-primary-500': statment.length,
              'text-neutral-500': !statment.length,
            })}
          >
            {t('settings.pricing_billing.view_statement')}
          </p>
        </button>
      </p>
    </div>
  );
};

export default PricingAndBillingItem;
