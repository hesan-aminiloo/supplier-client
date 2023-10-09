import React, { useState } from 'react';

// Helpers
import { getLocalStorage, setLocalStorage } from '@src/utils/storage';
import clsx from 'clsx';

// Local Components
import SideMenu from './SideMenu';
import { BaseProps } from './SidePanel.types';

export const SidePanel: React.FC<BaseProps> = ({ children }) => {
  const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(getLocalStorage('isSideMenuOpen') || false);
  return (
    <>
      <div className="flex h-full">
        <div className="fixed top-0 bottom-0 left-0 p-8">
          <SideMenu
            isOpen={sideMenuOpen}
            onToggle={() => {
              setSideMenuOpen((open) => {
                setLocalStorage('isSideMenuOpen', !open);
                return !open;
              });
            }}
          />
        </div>

        <div
          className="p-8 relative min-w-[800px]"
          style={{
            left: clsx({
              'var(--side-menu-width-opened)': sideMenuOpen,
              'var(--side-menu-width-closed)': !sideMenuOpen,
            }),
            width: clsx({
              'calc(100% - var(--side-menu-width-opened))': sideMenuOpen,
              'calc(100% - var(--side-menu-width-closed))': !sideMenuOpen,
            }),
          }}
        >
          <div className="ml-8 flex-grow">{children}</div>
        </div>
      </div>
    </>
  );
};
