import React from 'react';

// Components
import { Icon } from '@src/components';

// Utils
import clsx from 'clsx';

// Interfaces
import { Link, useLocation } from 'react-router-dom';
import { Theme } from '@src/style';
import { SideMenuItemPropsI } from '../SidePanel.types';

export const SideMenuItem: React.FC<SideMenuItemPropsI & { textClassName?: string }> = ({
  label,
  onClick,
  isOpen,
  icon,
  notifs,
  to,
  textClassName,
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const handleNavigation = () => {
    if (isActive) return;
    onClick?.();
  };

  return (
    <Link
      className={clsx(
        'w-full p-4 mb-0 2xl:mb-2 flex items-center relative transition-colors rounded-xl overflow-hidden',
        {
          'bg-primary-50 hover:bg-primary-50': isActive,
          'hover:bg-neutral-50': !isActive,
        }
      )}
      to={to}
      onClick={handleNavigation}
    >
      <span className={clsx({ 'mr-4': isOpen })}>
        <Icon
          name={icon}
          color={isActive ? Theme.colors.primary500 : Theme.colors.neutral500}
        />
        {!isOpen && notifs && notifs > 0 ? (
          <span
            className="absolute top-1 right-1 bg-destructive-500 border border-stroke-2
                shadow-xs text-white text-xs py-0.5 px-1.5 rounded-full font-medium"
          >
            {notifs}
          </span>
        ) : null}
      </span>

      {isOpen && (
        <div className="flex justify-between items-center w-full">
          <span
            className={clsx('text-base', textClassName, {
              'text-primary-700 font-semibold': isActive,
              'text-neutral-700': !isActive && !textClassName,
            })}
          >
            {label}
          </span>
          {notifs && notifs > 0 ? (
            <span
              className="bg-destructive-500 border border-stroke-4
                shadow-sm text-white text-xs py-1 px-2 rounded-full font-medium"
            >
              {notifs}
            </span>
          ) : null}
        </div>
      )}
    </Link>
  );
};
