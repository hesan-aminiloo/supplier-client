import { FC, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { PortalProps } from './Portal.types';

export const Portal: FC<PortalProps> = ({ children, target = '#root' }) => {
  const ref = useRef<Element | null>(null);

  useEffect(() => {
    ref.current = document.querySelector(target) || document.body;
  }, [target]);

  return ref.current ? createPortal(children, ref.current) : null;
};
