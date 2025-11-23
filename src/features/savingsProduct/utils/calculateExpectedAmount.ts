interface CalculateExpectedAmountParams {
  monthlyAmount: number;
  term: number;
  interestRate: number;
}

/**
 * 예상 수익 금액을 계산합니다.
 * @param params 계산에 필요한 파라미터
 * @param params.monthlyAmount 월 납입액
 * @param params.term 저축 기간 (개월)
 * @param params.interestRate 연이자율 (예: 3.2 = 3.2%)
 * @returns 최종 금액
 */
export function calculateExpectedAmount({ monthlyAmount, term, interestRate }: CalculateExpectedAmountParams): number {
  return monthlyAmount * term * (1 + (interestRate / 100) * 0.5);
}
