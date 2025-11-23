import { SavingsProductList } from 'features/savingsProduct/components/SavingsProductList';
import { getRecommendedProducts } from 'features/savingsProduct/utils/getRecommendedProducts';
import { useSavingsProductListSuspenseQuery } from 'pages/SavingsCalculatorPage/queries/useSavingsProductListQuery';
import { useMemo } from 'react';

interface RecommendedProductListSectionProps {
  selectedSavingsProductId: string;
  setSelectedSavingsProductId: (savingsProductId: string) => void;
  monthlyAmount: number;
  term: number;
}

export function RecommendedProductListSection({
  monthlyAmount,
  term,
  selectedSavingsProductId,
  setSelectedSavingsProductId,
}: RecommendedProductListSectionProps) {
  const { data } = useSavingsProductListSuspenseQuery();

  const filteredProducts = useMemo(
    () => getRecommendedProducts(data, { monthlyAmount, term }),
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
RecommendedProductListSection.Skeleton = SavingsProductList.Skeleton;
RecommendedProductListSection.Error = SavingsProductList.Error;
