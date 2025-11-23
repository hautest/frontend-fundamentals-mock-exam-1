import { Assets, colors, ListRow, Flex, Text, Button } from 'tosslib';
import { useSavingsProductListSuspenseQuery } from '../queries/useSavingsProductListQuery';
import { css } from '@emotion/react';
import { Skeleton } from 'shared/ui/Skeleton';
import { ErrorBoundaryFallbackProps } from '@suspensive/react';
import { SavingsProduct } from 'entities/savingsProduct/savingsProduct';
import { useMemo } from 'react';

interface SavingsProductListProps {
  onSelectSavingsProduct: (savingsProductId: string) => void;
  selectedSavingsProductId: string;
  processItems?: (savingsProducts: SavingsProduct[]) => SavingsProduct[];
}

export function SavingsProductList({
  selectedSavingsProductId,
  onSelectSavingsProduct,
  processItems,
}: SavingsProductListProps) {
  const { data: savingsProducts } = useSavingsProductListSuspenseQuery();

  const filteredSavingsProducts = useMemo(() => {
    return processItems ? processItems(savingsProducts) : savingsProducts;
  }, [savingsProducts, processItems]);

  if (filteredSavingsProducts.length === 0) {
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
        현재 적금 상품이 없습니다. 조건을 수정해 주세요.
      </Flex>
    );
  }

  return (
    <ul css={{ margin: 0, padding: 0 }}>
      {filteredSavingsProducts.map(savingsProduct => (
        <ListRow
          key={savingsProduct.id}
          contents={
            <ListRow.Texts
              type="3RowTypeA"
              top={savingsProduct.name}
              topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
              middle={`연 이자율: ${savingsProduct.annualRate}%`}
              middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
              bottom={`${savingsProduct.minMonthlyAmount.toLocaleString('ko-KR')}원 ~ ${savingsProduct.maxMonthlyAmount.toLocaleString('ko-KR')}원 | ${savingsProduct.availableTerms}개월`}
              bottomProps={{ fontSize: 13, color: colors.grey600 }}
            />
          }
          right={selectedSavingsProductId === savingsProduct.id && <Assets.Icon name="icon-check-circle-green" />}
          onClick={() => {
            onSelectSavingsProduct(savingsProduct.id);
          }}
        />
      ))}
    </ul>
  );
}

function SavingsProductListSkeleton() {
  return (
    <ul
      css={css`
        display: flex;
        flex-direction: column;
        list-style: none;
      `}
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <li
          css={css`
            padding: 16px 24px;
          `}
          key={index}
        >
          <Skeleton
            css={css`
              height: 64.5px;
            `}
          />
        </li>
      ))}
    </ul>
  );
}
SavingsProductList.Skeleton = SavingsProductListSkeleton;

function SavingsProductListError({ error, reset }: ErrorBoundaryFallbackProps) {
  return (
    <Flex
      as="p"
      direction="column"
      alignItems="center"
      justifyContent="center"
      css={css`
        width: 100%;
        padding: 40px 24px;
      `}
      gap={8}
    >
      <Text>{error.message}</Text>
      <Button size="medium" onClick={() => reset()}>
        재시도
      </Button>
    </Flex>
  );
}
SavingsProductList.Error = SavingsProductListError;
