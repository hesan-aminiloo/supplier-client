import { SidePanel } from '@src/layouts/SidePanel';
import { FC, Suspense } from 'react';
import { WithSuspenseProps } from './WithSuspense.types';

export const WithSuspense: FC<WithSuspenseProps> = ({ children, loading }) => (
  <SidePanel>
    <Suspense fallback={loading}>{children}</Suspense>
  </SidePanel>
);
