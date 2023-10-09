import { PropsWithChildren } from 'react';

export type PortalProps = PropsWithChildren<{
  target?: string; // must be css selector
}>;
