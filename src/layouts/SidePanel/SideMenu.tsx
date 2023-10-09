import React, { memo } from 'react';

// Hooks
import { useTranslation } from 'react-i18next';

// Utils
import clsx from 'clsx';

// Components
import { Icon, Avatar } from '@src/components';
import { generateImageUrl } from '@src/utils';
import { Theme } from '@src/style';
import { useStore } from 'zustand';
import { coreStore } from '@src/store/core';
import { SideMenuItems } from './components/SideMenuItems';
import { SideMenuPropsI } from './SidePanel.types';
import tempImg from './logo.png';

const SideMenu: React.FC<SideMenuPropsI> = ({ isOpen, onToggle }) => {
  const { t } = useTranslation();
  const { user } = useStore(coreStore);

  return (
    <div
      className="rounded-xl p-8 h-full bg-white border flex flex-col min-h-[600px]"
      style={{
        width: clsx({
          'var(--side-menu-width-opened)': isOpen,
          'var(--side-menu-width-closed)': !isOpen,
        }),
      }}
    >
      <div className="pb-6 border-b border-stroke-8 flex md:mb-4 mb-6">
        <button
          className="p-3 h-12 w-12 rounded-xl border border-neutral-100 bg-neutral-50"
          onClick={onToggle}
        >
          <Icon
            name="menu-1"
            color={Theme.colors.neutral500}
          />
        </button>
        {isOpen && (
          <div className="flex items-center gap-4 ml-4">
            <Avatar
              size="lg"
              src={user?.account.logo ? generateImageUrl(user?.account.logo as string) : ''}
              userName={`${user!.account.name}`}
            />
            <p className="font-semibold">{user!.account.name}</p>
          </div>
        )}
      </div>
      {isOpen && (
        <div className="flex justify-center border-b border-stroke-8 md:pb-4 md:mb-2 pb-6 mb-3">
          <img
            className="h-[70px] 2xl:h-[80px]"
            src={tempImg}
            alt=""
          />
        </div>
      )}

      <SideMenuItems isOpen={isOpen} />

      <div className="w-full border-t border-stroke-8 2xl:pt-8 pt-3">
        <div className="flex items-center">
          <div>
            <Avatar
              size="lg"
              src={user?.avatar ? generateImageUrl(user?.avatar as string) : ''}
              userName={`${user!.firstName} ${user!.lastName}`}
            />
          </div>
          {isOpen && (
            <div className="ml-4 overflow-hidden">
              {/* TODO: Use translation */}
              <p className="text-neutral-500">{t('shared.hello')}</p>
              <h4 className="text-neutral-900 text-base font-semibold">{`${user!.firstName} ${user!.lastName}`}</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(SideMenu);
