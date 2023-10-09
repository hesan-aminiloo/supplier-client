import React, { FC } from 'react';

// Utilities
import clsx from 'clsx';

// Components
import RenderWhen from './RenderWhen';
import BackButton from './BackButton';

export interface SettingsHeaderPropsI {
  className?: string;
  children: React.ReactNode;
  canGoBack?: boolean;
  rightContent?: React.ReactNode;
}

export const SettingsHeader: FC<SettingsHeaderPropsI> = ({ children, className, canGoBack, rightContent }) => {
  return (
    <header className={clsx('flex justify-between', className)}>
      <h1 className="flex text-4xl font-extrabold text-neutral-900">
        <RenderWhen is={canGoBack}>
          <span className="mr-4">
            <BackButton />
          </span>
        </RenderWhen>
        <span className="first-letter:capitalize">{children}</span>
      </h1>
      {rightContent ? <>{rightContent}</> : null}
    </header>
  );
};

export default SettingsHeader;
