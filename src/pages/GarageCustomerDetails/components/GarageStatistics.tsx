import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Button, Card, Icon, Table } from '@src/components';
import {
  GARAGE_STATISTICS_TABLE_COLUMNS,
  GARAGE_STATS_CARDS,
  YEARS,
} from '@src/pages/GarageCustomerDetails/GarageCustomerDetails.constants';
import { StatsCard } from '@src/pages/Stats';
import { generateGarageOverallRevenueRows } from '@src/pages/GarageCustomerDetails/GarageCustomerDetails.tools';
import GarageChart from '@src/pages/GarageCustomerDetails/components/GarageChart';
import { REQUESTS_PAGE_PATH } from '@src/utils';
import { DropDown } from '@src/components/text-fields';
import { Theme } from '@src/style';
import { StatisticsPropsI } from '../GarageCustomerDetails.types';

export const GarageStatistics: FC<StatisticsPropsI> = ({ title, monthlyIncomeYear, setMonthlyIncomeYear, ...rest }) => {
  const { t } = useTranslation();

  const handleSetMonthlyIncomeYear = (year: number) => () => {
    setMonthlyIncomeYear(year);
  };
  return (
    <div className="w-full flex flex-col">
      <span className="text-neutral-800 text-3xl font-bold">{title}</span>
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="col-span-1 flex flex-col gap-4 auto-rows-min">
          <div className="flex flex-wrap gap-4">
            {GARAGE_STATS_CARDS.map((card) => {
              return (
                <StatsCard
                  className="flex-1 !h-20"
                  value={`${card.preFix ?? ''}${
                    card.formatter ? card.formatter(rest?.[card.dataKey] ?? 0) : rest?.[card.dataKey] ?? 0
                  }`}
                  key={card.dataKey}
                  {...card}
                  title={t(card.title)}
                />
              );
            })}
          </div>
          <div className="w-full">
            <GarageChart data={rest.overalRevenue} />
          </div>
        </div>
        <Card className="col-span-1 flex flex-col auto-rows-min items-end">
          <div className="w-44 mb-4">
            <DropDown
              leftIcon={
                <Icon
                  name="calendar-1"
                  size="sm"
                  color={Theme.colors.neutral500}
                />
              }
              className="w-full"
              placeholder={t('placeholders.select')}
              labelClassName="sr-only"
              value={YEARS.find((item) => item.value === monthlyIncomeYear)?.label ?? ''}
            >
              {YEARS.map((year) => {
                const isSelected = year.value === monthlyIncomeYear;
                return (
                  <button
                    onClick={handleSetMonthlyIncomeYear(year.value)}
                    key={year.value.toString()}
                    className={clsx(
                      'w-full d-block cursor-pointer py-2 px-4 hover:bg-neutral-100 all-unset text-left',
                      {
                        'bg-neutral-100': isSelected,
                      }
                    )}
                  >
                    {year.label}
                  </button>
                );
              })}
            </DropDown>
          </div>
          <Table
            className="w-full"
            columns={GARAGE_STATISTICS_TABLE_COLUMNS}
            rows={generateGarageOverallRevenueRows(rest.monthlyIncome)}
          />
        </Card>
      </div>
    </div>
  );
};

export const getIncomeViewButton = (date: string) => {
  return (
    <Link to={REQUESTS_PAGE_PATH.replace('/', '').concat(`/${date}`)}>
      <Button>View</Button>
    </Link>
  );
};

export default GarageStatistics;
