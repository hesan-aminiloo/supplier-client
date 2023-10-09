import { Theme } from '@src/style';
import RenderWhen from '@components/RenderWhen';
import clsx from 'clsx';
import { FC } from 'react';
import { Icon } from '../icon';

import { DrawerHeaderProps } from './DrawerHeader.types';

export const DrawerHeader: FC<DrawerHeaderProps> = ({ title, secondaryTitle, hasClose = true, onClose, className }) => {
  return (
    <div className={clsx('w-full bg-white p-6 border-b border-solid border-stroke-8 flex justify-between', className)}>
      <div className="flex flex-col gap-1">
        <h4 className="text-neutral-800 text-xl font-bold flex-grow first-letter:capitalize">{title}</h4>
        <RenderWhen is={!!secondaryTitle}>
          <p className="text-neutral-500 text-sm">{secondaryTitle}</p>
        </RenderWhen>
      </div>

      {hasClose ? (
        <button
          type="button"
          onClick={onClose}
        >
          <Icon
            name="close"
            size="md"
            color={Theme.colors.neutral500}
          />
        </button>
      ) : null}
    </div>
  );
};
