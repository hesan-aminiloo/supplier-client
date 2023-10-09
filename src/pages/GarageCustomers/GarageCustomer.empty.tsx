import { useTranslation } from 'react-i18next';
import { Button, Icon } from '@src/components';
import { Theme } from '@src/style';
import { GarageCustomerImage } from './assets/GarageCustomerImage';

export const GarageCustomersEmptyState = ({ onAddGarageCustomers }: { onAddGarageCustomers: () => void }) => {
  const { t } = useTranslation();
  return (
    <div className="mt-4 bg-white w-full h-[calc(100vh-215px)] flex flex-col justify-center content-center py-28 rounded-2xl shadow-sm">
      <div className="mb-10 flex justify-center">
        <GarageCustomerImage />
      </div>
      <div className="text-center max-w-[355px] mx-auto">
        <p className="text-neutral-500 font-bold mb-2 text-xl">
          {t('garage_customers.you_dont_have_any_garage_customer')}
        </p>
        <p className="text-neutral-500 text-sm">{t('garage_customers.to_add_your_customer_and_util')}</p>
      </div>
      <div className="flex justify-center mt-8">
        <Button
          className="h-11 flex items-center justify-center w-52"
          onClick={onAddGarageCustomers}
          leftIcon={
            <Icon
              name="add"
              color={Theme.colors.white}
              className="mr-1"
            />
          }
        >
          {t('garage_customers.add_new_customer')}
        </Button>
      </div>
    </div>
  );
};
