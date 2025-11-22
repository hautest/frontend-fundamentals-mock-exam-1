import { useSuspenseQuery, UseSuspenseQueryOptions } from '@tanstack/react-query';
import { SavingsProduct } from 'entities/savingsProduct/savingsProduct';
import { http } from 'tosslib';

const queryKey = ['saving-product-list'];

export const useSavingsProductListSuspenseQuery = (options?: UseSuspenseQueryOptions<SavingsProduct[]>) => {
  return useSuspenseQuery({
    queryKey,
    queryFn: () => {
      return http.get<SavingsProduct[]>('/api/savings-products');
    },
    ...options,
  });
};
