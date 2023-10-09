import React, { forwardRef } from 'react';

// Utils
import clsx from 'clsx';

// Components
import { Button, Icon } from '@src/components';
import RenderWhen from './RenderWhen';

interface SideDrawerPropsI {
  isOpen: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
  onClose: () => void;
  title?: string | React.ReactNode;
  ref?: React.RefObject<HTMLDivElement>;
  bodyClassNames?: string;
  footerClassNames?: string;
}

const SideDrawer = forwardRef<HTMLDivElement, SideDrawerPropsI>((props, ref) => {
  const { isOpen, children, onClose, title, footer, bodyClassNames, footerClassNames } = props;
  return (
    <div
      ref={ref}
      className={clsx(
        'bg-white min-h-full !z-10 rounded-l-xl w-[600px] transition-transform duration-500',
        'fixed top-0 bottom-0 right-0 overflow-hidden border-l border-stroke-8 flex flex-col justify-between',
        {
          'translate-x-full': !isOpen,
          'translate-x-0': isOpen,
        }
      )}
    >
      <header className="bg-white flex justify-between items-center p-6 border-b border-stroke-8">
        <h6 className="font-bold text-xl">{title}</h6>
        <Button
          variant="tertiary"
          size="sm"
          className="border-0 "
          onClick={onClose}
        >
          <Icon name="close" />
        </Button>
      </header>

      <div className={clsx('p-6 bg-neutral-100 flex-grow', bodyClassNames)}>{children}</div>

      <RenderWhen is={!!footer}>
        <footer className={clsx('p-8 bg-neutral-100', footerClassNames)}>{footer}</footer>
      </RenderWhen>
    </div>
  );
});

export default SideDrawer;
