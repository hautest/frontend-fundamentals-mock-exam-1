import { useQuery, UseQueryOptions, useSuspenseQuery, UseSuspenseQueryOptions } from '@tanstack/react-query';
import { SavingsProduct } from 'entities/savingsProduct/savingsProduct';
import { http, HttpError } from 'tosslib';

const queryKey = ['saving-product-list'];

export const useSavingsProductListSuspenseQuery = (
  options?: Omit<UseSuspenseQueryOptions<SavingsProduct[], HttpError>, 'queryKey' | 'queryFn'>
) => {
  return useSuspenseQuery({
    queryKey,
    queryFn: () => {
      return http.get<SavingsProduct[]>('/api/savings-products');
    },
    ...options,
  });
};

export const useSavingsProductListQuery = (
  options?: Omit<UseQueryOptions<SavingsProduct[], HttpError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey,
    queryFn: () => {
      return http.get<SavingsProduct[]>('/api/savings-products');
    },
    ...options,
  });
};
