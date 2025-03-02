import { useState } from 'react';

export const useFetching = (
  callback: () => Promise<void>
): [() => Promise<void>, boolean, string | null] => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  const fetching = async () => {
    try {
      setIsLoading(true);
      await callback();
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
        console.error(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error];
};
