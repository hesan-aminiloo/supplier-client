import React from 'react';

// Local Components
import SettingsHeader from '@components/SettingsHeader';
import { BaseProps } from './Content.types';

export const Content: React.FC<BaseProps> = ({ children, canGoBack, pageTitle, className, rightContent }) => {
  return (
    <>
      <SettingsHeader
        className={className}
        canGoBack={canGoBack}
        rightContent={rightContent}
      >
        {pageTitle}
      </SettingsHeader>
      <div className="py-12">{children}</div>
    </>
  );
};
