import React from 'react';

// components
import { Card, Table } from '@src/components';

// constants
import { CUSTOMER_ACTIVITY_TABLE_COLUMNS } from '@src/pages/Stats/Stats.constants';
import { generateCustomerActivityTableRows } from '@src/pages/Stats/Stats.tools';
import { CustomerActivityTableProps } from '@src/pages/Stats/Stats.types';
import { useTranslation } from 'react-i18next';
import RenderWhen from '@components/RenderWhen';
import { ChartEmptyState } from '@src/pages/Stats/assets';

export const StatsCustomerActivityTable: React.FC<CustomerActivityTableProps> = ({ data }) => {
  const { t } = useTranslation();
  return (
    <Card
      header={{
        title: t('stats.customers_activity'),
        className: '!border-b-0 !py-0',
      }}
      className="bg-white col-span-2 rounded-xl h-auto p-6"
    >
      <RenderWhen is={data.length === 0}>
        <div className="flex w-full h-full items-center justify-center">
          <ChartEmptyState />
        </div>
      </RenderWhen>
      <RenderWhen is={data.length > 0}>
        <Table
          columns={CUSTOMER_ACTIVITY_TABLE_COLUMNS}
          rows={generateCustomerActivityTableRows({ data })}
          className="border-collapse table-auto w-full text-sm"
          thClassName="!border-0"
        />
      </RenderWhen>
    </Card>
  );
};

export default StatsCustomerActivityTable;
