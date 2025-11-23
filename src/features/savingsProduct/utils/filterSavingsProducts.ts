import { SavingsProduct } from 'entities/savingsProduct/savingsProduct';

export interface SavingsProductFilterCriteria {
  monthlyAmount?: number;
  term?: number;
}

/**
 * 적금 상품을 필터링합니다.
 * @param products 전체 적금 상품 목록
 * @param criteria 필터링 기준
 * @returns 필터링된 적금 상품 목록
 */
export function filterSavingsProducts(
  products: SavingsProduct[],
  criteria: SavingsProductFilterCriteria
): SavingsProduct[] {
  const { monthlyAmount, term } = criteria;

  // 조건이 없으면 전체 상품 반환
  if (!monthlyAmount || !term) {
    return products;
  }

  return products.filter(
    product =>
      product.minMonthlyAmount <= monthlyAmount &&
      product.maxMonthlyAmount >= monthlyAmount &&
      product.availableTerms === term
  );
}
