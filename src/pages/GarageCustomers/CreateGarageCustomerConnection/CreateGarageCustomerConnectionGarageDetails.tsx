import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { Avatar, Button, Icon } from '@src/components';

// Styles
import styles from './CreateGarageCustomerConnection.module.scss';

// Types
import { SearchGarageDetails } from './CreateGarageCustomerConnection.types';

interface Props {
  isLoading: boolean;
  data: SearchGarageDetails;
  onSubmit: (branchId: number) => void;
}

export const CreateGarageCustomerConnectionGarageDetails: FC<Props> = ({ data, isLoading, onSubmit }) => {
  const { t } = useTranslation();
  const { branches, garage } = data;
  const [selectedBranch, setSelectedBranch] = useState<number | null>(Number(garage.branch));
  const handleSubmit = () => {
    if (selectedBranch) {
      onSubmit(selectedBranch);
    }
  };
  return (
    <div className="w-full rounded-xl h-full bg-white p-6">
      <div className="h-fit w-full flex justify-between items-center gap-4 pb-6 border-b-stroke-4 border-b-2">
        <div className="flex gap-x-4 items-center">
          <Avatar
            size="lg"
            userName={garage.name}
            src={garage.logo}
          />
          <p className="font-bold text-lg text-neutral-900">{garage.name}</p>
        </div>

        <div className="flex items-center gap-x-1">
          <p className="text-neutral-500">{t('garage_customer_details.connect_garage_customer.id_number')}</p>
          <p className="font-bold text-lg text-neutral-700">{garage.id}</p>
        </div>
      </div>

      <div className="h-fit w-full flex flex-wrap justify-between items-center gap-4 py-6 border-b-stroke-4 border-b-2">
        <div className="flex-1 flex flex-col gap-4">
          <p className="flex gap-x-3 items-center text-neutral-700">
            <Icon
              name="mobile"
              size="sm"
            />
            <span>{garage.contact.phone}</span>
          </p>
          <p className="flex gap-x-3 items-center text-neutral-700">
            <Icon
              name="sms"
              size="sm"
            />
            <span>{garage.contact.email}</span>
          </p>
        </div>
        <div className="flex-1 flex flex-col gap-4 pl-4 border-l-2  border-l-stroke-4">
          <p className="flex gap-x-3 items-center text-neutral-700">
            <Icon
              name="flag"
              size="sm"
            />
            <span>{garage.contact.city}</span>
          </p>
          <p className="flex gap-x-3 items-center text-neutral-700">
            <Icon
              name="location"
              size="sm"
            />
            <span className="w-40 text-ellipsis overflow-hidden whitespace-nowrap">{garage.contact.address}</span>
          </p>
        </div>
      </div>

      <div className="h-fit w-full pt-6">
        <div className="flex flex-col">
          <p className="font-bold text-neutral-800 text-xl">
            {t('garage_customer_details.connect_garage_customer.connect_customer_title')}
          </p>
          <p className="text-neutral-500 text-base">
            {t('garage_customer_details.connect_garage_customer.connect_customer_description')}
          </p>
        </div>

        <div
          className={clsx('flex mt-6 flex-col gap-y-4 overflow-y-auto relative pr-3 justify-between', styles.branches)}
        >
          <div className="flex flex-col gap-y-4">
            {branches.map((branch) => {
              const selected = branch.id === selectedBranch;
              return (
                // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                <div
                  key={branch.id}
                  onClick={() => setSelectedBranch(branch.id)}
                  onKeyDown={() => setSelectedBranch(branch.id)}
                  onKeyUp={() => setSelectedBranch(branch.id)}
                  className={clsx(
                    'w-full items-center h-24 rounded-xl border py-4 px-6 flex gap-x-4 transition-all cursor-pointer',
                    {
                      'border-primary-500': selected,
                      'border-stroke-4': !selected,
                    }
                  )}
                >
                  <div className="w-6 h-6 rounded-full border-2 border-primary-500 flex items-center justify-center">
                    <div
                      className={clsx('w-3 h-3 rounded-full transition-all', {
                        'bg-primary-500': selected,
                      })}
                    />
                  </div>
                  <div className="flex h-full flex-col justify-between gap-x-4">
                    <p className="font-bold text-neutral-800 text-xl">{branch.name}</p>
                    <p className="text-neutral-500">{branch.email ?? '-'}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="sticky bottom-0 py-2 w-full bg-white">
            <Button
              loading={isLoading}
              disabled={!selectedBranch || isLoading}
              className="w-full"
              onClick={handleSubmit}
            >
              {t('garage_customer_details.connect_garage_customer.submit')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGarageCustomerConnectionGarageDetails;
