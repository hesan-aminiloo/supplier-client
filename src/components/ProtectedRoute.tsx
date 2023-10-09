import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useNumberOfNtification } from '@src/pages/Notifications/Notifications.tools';
import { useStore } from 'zustand';
import { coreStore } from '@src/store/core';

export function ProtectedRoute({ condition, children }: { condition: boolean; children: React.ReactNode }) {
  const { getUnreadNotifications } = useNumberOfNtification();
  const { token } = useStore(coreStore);

  useEffect(() => {
    getUnreadNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (!condition) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }
  return <>{children}</>;
}
