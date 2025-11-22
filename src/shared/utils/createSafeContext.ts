import { createContext, useContext } from 'react';

export function createSafeContext<T>(contextName: string) {
  const context = createContext<T | null>(null);

  const useCustom = (consumerName: string) => {
    const value = useContext(context);
    if (value === null) {
      throw new Error(`${consumerName}은 ${contextName}안에서 사용되어야 합니다.`);
    }
    return value;
  };
  return [context.Provider, useCustom] as const;
}
