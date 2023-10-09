import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface PricingAndBillingStatusProps {
  status: number;
}
const PricingAndBillingStatus: FC<PricingAndBillingStatusProps> = ({ status }) => {
  const { t } = useTranslation();
  switch (status) {
    case 0:
      return (
        <div className="px-2 w-14 py-1 justify-center items-center rounded-full bg-success-50 text-analogous-teal-500">
          {t('settings.pricing_billing.paid')}
        </div>
      );

    default:
      return (
        <div className="px-2 flex justify-center items-center w-14 py-1 rounded-full bg-success-50 text-analogous-teal-500">
          {t('settings.pricing_billing.paid')}
        </div>
      );
  }
};

export default PricingAndBillingStatus;
