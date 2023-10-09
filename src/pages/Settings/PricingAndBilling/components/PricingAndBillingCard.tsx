import { Card } from '@src/components';
import React from 'react';

export interface PricingAndBillingCardProps {
  title: string;
  value: string | number;
}
const PricingAndBillingCard: React.FC<PricingAndBillingCardProps> = ({ title, value }) => {
  return (
    <Card
      header={{
        className: '!border-b-0 !py-0 text-center !m-0',
      }}
      className="w-auto bg-white flex-1 !p-6"
    >
      <h2 className="text-neutral-500">{title}</h2>
      <p className="font-bold mt-2 text-[20px] lg:text-[15px]">{value || '--'}</p>
    </Card>
  );
};

export default PricingAndBillingCard;
