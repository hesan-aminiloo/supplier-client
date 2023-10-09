import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { Theme } from '@src/style';
import { Card, Icon } from '@src/components';
import { GarageContactInfoPropsI, GarageContactInfoStructureType } from '../GarageCustomerDetails.types';

export const GarageContactInfo: FC<GarageContactInfoPropsI> = ({ data }) => {
  const { t } = useTranslation();

  const { phone, email, address, postCode } = data;

  const STRUCTURE: GarageContactInfoStructureType = [
    {
      label: t('garage_customer_details.phone'),
      value: phone,
      icon: 'call-calling',
    },
    {
      label: t('garage_customer_details.email'),
      value: email,
      icon: 'sms',
    },
    {
      label: t('garage_customer_details.address'),
      value: address,
      icon: 'location',
    },
    {
      label: t('garage_customer_details.post_code'),
      value: postCode,
      icon: 'sign-post',
    },
  ];

  return (
    <Card className="mt-2 flex justify-between gap-x-6 rounded-t-sm border border-stroke-4 shadow-xs">
      {STRUCTURE.map(({ icon, label, value }, index: number) => (
        <div
          key={label}
          className={clsx('w-1/4 flex flex-col', {
            'pl-11': index === 3,
            '2xl:w-1/4 w-2/4': index === 1,
          })}
        >
          <Icon
            name={icon}
            size="md"
            color={Theme.colors.neutral500}
          />
          <span className="mt-4 text-sm">{label}</span>
          <span className="font-semibold text-neutral-700">{value}</span>
        </div>
      ))}
    </Card>
  );
};

export default GarageContactInfo;
