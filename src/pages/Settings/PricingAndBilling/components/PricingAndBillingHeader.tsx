import { FormDropDown, SettingsHeader } from '@src/components';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { usePricingForm } from '../PricingAndBilling.tools';
import { getMonthsAndYearsBetweenDates } from '../PricingAndBillingPage.utils';

export interface PricingAndBillingHeaderProps {
  onFilter: (value: string) => void;
}
const PricingAndBillingHeader: FC<PricingAndBillingHeaderProps> = ({ onFilter }) => {
  const { t } = useTranslation();
  const { methods } = usePricingForm();
  const dates = getMonthsAndYearsBetweenDates();
  const { watch, getValues } = methods;
  const watchMonth = watch('monthId');

  useEffect(() => {
    const { monthId } = getValues();
    if (monthId) {
      onFilter(monthId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchMonth]);

  return (
    <div className="flex items-center justify-between pb-8 border-b border-stroke-12">
      <SettingsHeader canGoBack>{t('settings.pricing_billing.pricing_billing')}</SettingsHeader>
      <div className="w-40">
        <FormDropDown
          options={dates}
          name="monthId"
          control={methods.control}
          defaultValue={dates[dates.length - 1].value}
          className="text-sm"
        />
      </div>
    </div>
  );
};

export default PricingAndBillingHeader;
