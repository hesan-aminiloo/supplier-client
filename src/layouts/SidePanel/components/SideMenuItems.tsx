import { useTranslation } from 'react-i18next';
import { coreStore } from '@src/store/core';
import { useStore } from 'zustand';
import { SideMenuItem } from './SideMenuItem';
import { SideMenuItemPropsI } from '../SidePanel.types';
import { MENU_ITEMS } from '../SidePanel.constants';

// TODO: replace any
export const SideMenuItems = ({ isOpen }: any) => {
  const { t } = useTranslation();
  const { notifs } = useStore(coreStore);

  return (
    <div className="h-full flex items-start">
      <div className="w-full">
        {MENU_ITEMS.map(({ id, label, to, icon }: SideMenuItemPropsI) => (
          <SideMenuItem
            key={id}
            id={id}
            label={t(label)}
            isOpen={isOpen}
            icon={icon}
            to={to} // navigation path
            textClassName={id === 'logout' ? 'text-destructive-600' : ''}
            // TODO: Handle notification count
            notifs={id === 'notifications' ? notifs || 0 : 0}
          />
        ))}
      </div>
    </div>
  );
};
