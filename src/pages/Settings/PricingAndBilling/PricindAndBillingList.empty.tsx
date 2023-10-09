import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { PricingAndBillingEmptyImage } from './assets/PricingAndBillingEmptyImage';

const PricingAndBillingListEmpty: FC = () => {
  const { t } = useTranslation();
  return (
    <div className="mt-10 bg-white w-full h-full flex flex-col justify-center content-center py-28 rounded-2xl shadow-sm">
      <div className="mb-10 flex justify-center">
        <PricingAndBillingEmptyImage />
      </div>
      <div className="text-center max-w-[355px] mx-auto">
        <p className="text-neutral-500 font-bold mb-2 text-xl">
          {t('settings.pricing_billing.transaction_history_is_empty')}
        </p>
        <p className="text-neutral-500 text-sm">
          {t('settings.pricing_billing.transaction_history_is_empty_description')}
        </p>
      </div>
    </div>
  );
};
export default PricingAndBillingListEmpty;
