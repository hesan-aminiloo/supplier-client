import React, { useRef } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useReactToPrint } from 'react-to-print';
import moment from 'moment';
import { Button, Icon } from '@src/components';
import { Theme } from '@src/style';
import { StatementListType } from '../PricingAndBilling.types';
import { STATEMENT_LIST_LABELS } from '../PricingAndBilling.constant';
import styles from './StatementModal.module.scss';

export interface StatementModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  statement?: StatementListType;
  userCost: number;
  currency?: string;
  name?: string;
  create_date?: string;
}
const StatementModal: React.FC<StatementModalProps> = ({
  isOpen,
  onClose,
  statement,
  userCost,
  currency,
  name,
  create_date,
}) => {
  const { t } = useTranslation();
  const tableRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });

  const statement_date = moment(create_date).format('YYYY MMMM DD');

  return (
    <>
      {isOpen ? (
        <div
          id="StatementModal-modal"
          className="z-50 fixed top-0 left-0 right-0 flex w-100 min-h-screen	 justify-center items-center"
          style={{ backgroundColor: '#00000030' }}
        >
          <div className="p-4 relative   bg-white rounded-xl shadow w-[749px] ">
            <div className="p-4">
              <div className="flex justify-between items-center pb-4 border-b">
                <p className="text-xl font-bold">
                  {name} {t('settings.pricing_billing.statement')}
                </p>
                <Button
                  variant="text"
                  onClick={onClose}
                >
                  <Icon
                    name="close"
                    color={Theme.colors.neutral500}
                  />
                </Button>
              </div>
              <div className="flex justify-between pt-8">
                <div>
                  <p className="text-sm text-neutral-500 mb-1">{t('settings.pricing_billing.date')}:</p>
                  <p>{statement_date}</p>
                </div>
                <Button
                  variant="solid"
                  size="sm"
                  onClick={handlePrint}
                >
                  {t('settings.pricing_billing.print_statement')}
                </Button>
              </div>
              <div className="mt-11 block max-h-[500px] overflow-scroll scrollbar-hide">
                <table
                  className="w-full"
                  ref={tableRef}
                >
                  <thead className=" w-100">
                    <tr className="w-full">
                      {STATEMENT_LIST_LABELS.map((label) => (
                        <th
                          className="p-4 w-[200px] text-left text-sm text-neutral-500 font-normal border-b border-neutral-900"
                          key={label}
                        >
                          {t(label)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className={clsx(styles['table-of-content'])}>
                    {statement?.map((item) => (
                      <tr key={item.id}>
                        <td className="p-4 w-[200px]">{item.garage.name}</td>
                        <td className="p-4 w-[200px]">
                          {currency}
                          {userCost}
                        </td>
                        <td className="p-4 w-[200px]">{item.users_count}</td>
                        <td className="p-4 w-[200px]">
                          {currency}
                          {item.users_count * userCost}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default StatementModal;
