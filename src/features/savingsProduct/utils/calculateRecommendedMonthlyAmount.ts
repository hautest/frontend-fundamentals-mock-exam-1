interface CalculateRecommendedMonthlyAmountParams {
  targetAmount: number;
  term: number;
  interestRate: number;
}

/**
 * 목표 금액을 달성하기 위한 추천 월 납입 금액을 계산합니다.
 * @param params 계산에 필요한 파라미터
 * @param params.targetAmount 목표 금액
 * @param params.term 저축 기간 (개월)
 * @param params.interestRate 연이자율 (예: 3.2 = 3.2%)
 * @returns 추천 월 납입 금액 (1,000원 단위로 반올림)
 */
export function calculateRecommendedMonthlyAmount({
  targetAmount,
  term,
  interestRate,
}: CalculateRecommendedMonthlyAmountParams): number {
  const monthlyAmount = targetAmount / (term * (1 + (interestRate / 100) * 0.5));
  return Math.round(monthlyAmount / 1000) * 1000;
}
