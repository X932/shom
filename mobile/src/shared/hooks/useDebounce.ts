import { useEffect, useState } from 'react';

export const useDebounce = (value = '', delayInMilliseconds = 500): string => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    const handler: number = setTimeout(() => {
      setDebouncedValue(value);
    }, delayInMilliseconds);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delayInMilliseconds]);

  return debouncedValue;
};
