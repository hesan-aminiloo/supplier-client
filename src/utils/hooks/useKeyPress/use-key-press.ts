/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import { UseKeyPress } from './use-key-press.types';

export const useKeyPress: UseKeyPress = (callback, keys = [], disable = false) => {
  const handleKeyPress = (e: KeyboardEvent): void => {
    const { code, key } = e;
    const lowerCaseKeys: string[] = keys.map((k) => k?.toLowerCase());
    const noExist = !lowerCaseKeys.includes(key?.toLowerCase()) && !lowerCaseKeys.includes(code?.toLowerCase());

    if (noExist) return;
    callback({ code, key });
  };

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    !disable && document.addEventListener('keyup', handleKeyPress);

    return () => {
      document.removeEventListener('keyup', handleKeyPress);
    };
  }, [disable]);
};
