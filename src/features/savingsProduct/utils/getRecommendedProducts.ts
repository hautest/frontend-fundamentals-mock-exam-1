import { SavingsProduct } from 'entities/savingsProduct/savingsProduct';
import { filterSavingsProducts, SavingsProductFilterCriteria } from './filterSavingsProducts';

export interface RecommendedProductsOptions extends SavingsProductFilterCriteria {
  limit?: number;
}

/**
 * 추천 적금 상품 목록을 반환합니다.
 * 조건에 맞는 상품 중 연이자율이 높은 순으로 정렬하여 반환합니다.
 *
 * @param products 전체 적금 상품 목록
 * @param options 추천 상품 조회 옵션
 * @param options.monthlyAmount 월 납입액
 * @param options.term 저축 기간 (개월)
 * @param options.limit 반환할 상품 개수 (기본값: 2)
 * @returns 추천 적금 상품 목록
 */
export function getRecommendedProducts(
  products: SavingsProduct[],
  options: RecommendedProductsOptions
): SavingsProduct[] {
  const { limit = 2, ...filterCriteria } = options;

  // 먼저 조건에 맞는 상품 필터링
  const filteredProducts = filterSavingsProducts(products, filterCriteria);

  // 연이자율 높은 순으로 정렬 후 limit만큼만 반환
  return filteredProducts
    .sort((a, b) => b.annualRate - a.annualRate)
    .slice(0, limit);
}
