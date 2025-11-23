import { calculateExpectedAmount } from 'features/savingsProduct/ulits/calculateExpectedAmount';
import { calculateRecommendedMonthlyAmount } from 'features/savingsProduct/ulits/calculateRecommendedMonthlyAmount';
import { Border, colors, Flex, ListHeader, ListRow, Spacing } from 'tosslib';
import { useSavingsProductListQuery } from '../queries/useSavingsProductListQuery';
import { QueryErrorBoundary } from 'shared/components/QueryErrorBoundary';
import { SavingsProductList } from './SavingsProductList';
import { Suspense } from '@suspensive/react';
import { SavingsProduct } from 'entities/savingsProduct/savingsProduct';
import { css } from '@emotion/react';

interface CalculatorResultProps {
  monthlyAmount: number;
  term: number;
  goalAmount: number;
  selectedSavingsProductId: string;
  setSelectedSavingsProductId: (savingsProductId: string) => void;
  processRecommendedProducts?: (products: SavingsProduct[]) => SavingsProduct[];
}

export function CalculatorResult({
  setSelectedSavingsProductId,
  monthlyAmount,
  term,
  goalAmount,
  selectedSavingsProductId,
  processRecommendedProducts,
}: CalculatorResultProps) {
  const { data: savingsProducts } = useSavingsProductListQuery();

  const selectedSavingsProduct = savingsProducts?.find(product => product.id === selectedSavingsProductId);

  const expectedAmount = calculateExpectedAmount({
    monthlyAmount,
    term,
    interestRate: selectedSavingsProduct?.annualRate ?? 0,
  });
  const difference = goalAmount - expectedAmount;
  const recommendedMonthlyAmount = calculateRecommendedMonthlyAmount({
    targetAmount: goalAmount,
    term,
    interestRate: selectedSavingsProduct?.annualRate ?? 0,
  });

  if (!selectedSavingsProduct) {
    return (
      <Flex
        as="p"
        css={css`
          justify-content: center;
          align-items: center;
          padding: 16px 24px;
          color: ${colors.grey600};
        `}
      >
        상품을 선택해주세요.
      </Flex>
    );
  }

  return (
    <>
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="예상 수익 금액"
            topProps={{ color: colors.grey600 }}
            bottom={expectedAmount.toLocaleString('ko-KR')}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="목표 금액과의 차이"
            topProps={{ color: colors.grey600 }}
            bottom={`${difference.toLocaleString('ko-KR')}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="추천 월 납입 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`${recommendedMonthlyAmount.toLocaleString('ko-KR')}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />

      <Spacing size={8} />
      <Border height={16} />
      <Spacing size={8} />

      <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />
      <Spacing size={12} />

      <QueryErrorBoundary fallback={({ error, reset }) => <SavingsProductList.Error error={error} reset={reset} />}>
        <Suspense fallback={<SavingsProductList.Skeleton />}>
          <SavingsProductList
            selectedSavingsProductId={selectedSavingsProductId}
            onSelectSavingsProduct={setSelectedSavingsProductId}
            processItems={processRecommendedProducts}
          />
        </Suspense>
      </QueryErrorBoundary>
    </>
  );
}
