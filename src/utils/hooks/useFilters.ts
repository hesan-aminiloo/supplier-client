import React from 'react';
import { useSearchParams } from 'react-router-dom';

export function useFilter<T>(initialState: T) {
  const [, setSearchParams] = useSearchParams();
  const [state, setState] = React.useState<T>(initialState);
  const handlers = React.useMemo(
    () => ({
      changeFilters: (filters: any) => {
        setState({
          ...state,
          ...(filters as T),
        });
        setSearchParams({
          ...state,
          ...filters,
        });
      },
      reset: () => {
        setState(initialState);
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [initialState]
  );

  return [state, handlers] as const;
}
