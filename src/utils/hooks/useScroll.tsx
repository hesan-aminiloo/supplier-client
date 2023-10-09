import React from 'react';

export const useScrollToTop = (initialState?: any) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [initialState]);
};
