import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Components
import { SettingsHeader } from '@src/components';

// Local Components
import axios from 'axios';
import { getLocalStorage } from '@src/utils/storage';
import { SITE_CONFIGS } from '@src/configs';
import { YEARS } from '@src/pages/GarageCustomerDetails/GarageCustomerDetails.constants';
import { GarageCard, GarageContactInfo, GarageStatistics, GarageUsers } from './components';
import { useGarageDetails } from './GarageCustomerDetails.tools';
import { GarageCustomerDetailsSkeleton } from './GarageCustomerDetails.skeleton';

// constants
axios.defaults.headers.common.Authorization = `Bearer ${getLocalStorage(SITE_CONFIGS.TOKEN_COOKIE_KEY!)}`;

const GarageCustomerDetails: FC = () => {
  const { t } = useTranslation();
  const { isLoading, garageDetails, fetchGarageDetails } = useGarageDetails();
  const [monthlyIncomeYear, setMonthlyIncomeYear] = useState(YEARS[0].value);

  if (isLoading) {
    return <GarageCustomerDetailsSkeleton />;
  }

  if (!garageDetails) {
    return null;
  }

  const {
    logo,
    name: garageName,
    branch,
    contact,
    users,
    totalOrders,
    totalIncome,
    totalQuotes,
    monthlyIncome,
    overalRevenue,
  } = garageDetails!;
  const { phone, address, email, postCode } = contact;

  return (
    <>
      <SettingsHeader
        className="pb-8"
        canGoBack
      >
        {t('garage_customer_details.garage_customer')}
      </SettingsHeader>

      <GarageCard data={{ logo, garageName, branch }} />
      <GarageContactInfo data={{ phone, email, address, postCode }} />

      <GarageUsers
        users={users}
        refetchGarage={fetchGarageDetails}
      />

      <div className="mt-16">
        <GarageStatistics
          title={t('garage_customer_details.statistics')}
          totalOrders={totalOrders as string}
          totalQuotes={totalQuotes as string}
          overalRevenue={overalRevenue}
          monthlyIncome={monthlyIncome.filter((item) => item.year === monthlyIncomeYear)}
          monthlyIncomeYear={monthlyIncomeYear}
          setMonthlyIncomeYear={setMonthlyIncomeYear}
          totalIncome={totalIncome as string}
        />
      </div>
    </>
  );
};

export default GarageCustomerDetails;
