import React from 'react';

// components
import { Card } from '@src/components';
import { useTranslation } from 'react-i18next';
import RenderWhen from '@components/RenderWhen';
import { ChartEmptyState } from '@src/pages/Stats/assets';
import { ILostQuotes } from '@src/types';

const calculatePercentage = (missed: number, total: number) => {
  return Math.round((missed / total) * 100);
};

export const StatsLostOrders: React.FC<ILostQuotes> = ({ missed, total }) => {
  const { t } = useTranslation();
  return (
    <Card
      header={{
        secondaryTitle: t('stats.missed_opportunities'),
        title: t('stats.lost_orders'),
        className: '!border-b-0 !py-0 !mb-0',
      }}
      className="bg-white col-span-1 rounded-xl  p-6"
    >
      <RenderWhen is={total === 0}>
        <div className="flex w-full h-min py-10 items-center justify-center">
          <ChartEmptyState />
        </div>
      </RenderWhen>
      <RenderWhen is={total > 0}>
        <div className="w-full flex justify-between gap-2 mt-6">
          <div className="flex gap-2 w-full items-center">
            Quotes
            <abbr
              title={missed.toString()}
              className="w-full bg-neutral-100 rounded-r-full h-3"
            >
              <div
                className="w-1/2 bg-destructive-600 rounded-r-full h-full"
                style={{ width: `${calculatePercentage(missed, total)}%` }}
              />
            </abbr>
          </div>

          <div>{total}</div>
        </div>
        <p className="text-neutral-400 text-sm text-center mt-6">{t('stats.lost_orders_description', { total })}</p>
      </RenderWhen>
    </Card>
  );
};

export default StatsLostOrders;
