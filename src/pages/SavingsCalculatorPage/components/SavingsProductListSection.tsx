import { SavingsProductList } from 'features/savingsProduct/components/SavingsProductList';
import { useSavingsProductListSuspenseQuery } from '../queries/useSavingsProductListQuery';
import { useMemo } from 'react';
import { filterSavingsProducts } from 'features/savingsProduct/utils/filterSavingsProducts';

interface SavingsProductListSectionProps {
  selectedSavingsProductId: string;
  setSelectedSavingsProductId: (savingsProductId: string) => void;
  monthlyAmount: number;
  term: number;
}

export function SavingsProductListSection({
  selectedSavingsProductId,
  setSelectedSavingsProductId,
  monthlyAmount,
  term,
}: SavingsProductListSectionProps) {
  const { data } = useSavingsProductListSuspenseQuery();

  const filteredProducts = useMemo(
    () => filterSavingsProducts(data, { monthlyAmount, term }),
    [data, monthlyAmount, term]
  );

  return (
    <SavingsProductList
      selectedSavingsProductId={selectedSavingsProductId}
      onSelectSavingsProduct={setSelectedSavingsProductId}
      products={filteredProducts}
    />
  );
}
SavingsProductListSection.Skeleton = SavingsProductList.Skeleton;
SavingsProductListSection.Error = SavingsProductList.Error;
