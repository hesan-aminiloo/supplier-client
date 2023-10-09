import { FC } from 'react';

// tools
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

// types
import { Items } from './ButtonTabs.types';

export const ButtonTabs: FC<Items> = ({ itemsList, activeTabId, onChange, className }) => {
  const { t } = useTranslation();

  return (
    <div className={clsx('p-1 rounded-xl flex gap-x-2 bg-neutral-200', className)}>
      {itemsList.map(({ id, label }) => {
        const activeTab = activeTabId === id;
        return (
          <button
            key={id}
            onClick={() => onChange({ id, label })}
            className={clsx('py-2 px-3 rounded-lg', activeTab ? 'bg-white text-neutral-800' : 'text-neutral-700')}
          >
            {t(label)}
          </button>
        );
      })}
    </div>
  );
};
