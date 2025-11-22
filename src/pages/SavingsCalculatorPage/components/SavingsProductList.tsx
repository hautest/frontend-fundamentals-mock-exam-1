import { Assets, colors, ListRow, Flex } from 'tosslib';
import { useSavingsProductListSuspenseQuery } from '../queries/useSavingsProductListQuery';
import { css } from '@emotion/react';
import { Skeleton } from 'shared/ui/Skeleton';

export function SavingsProductList() {
  const { data: savingsProducts } = useSavingsProductListSuspenseQuery();

  if (savingsProducts.length === 0) {
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
        현재 적금 상품이 없습니다.
      </Flex>
    );
  }

  return (
    <ul>
      {savingsProducts.map(savingsProduct => (
        <ListRow
          key={savingsProduct.id}
          contents={
            <ListRow.Texts
              type="3RowTypeA"
              top={savingsProduct.name}
              topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
              middle={`연 이자율: ${savingsProduct.annualRate}%`}
              middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
              bottom={`${savingsProduct.minMonthlyAmount.toLocaleString()}원 ~ ${savingsProduct.maxMonthlyAmount.toLocaleString()}원 | ${savingsProduct.availableTerms}개월`}
              bottomProps={{ fontSize: 13, color: colors.grey600 }}
            />
          }
          right={<Assets.Icon name="icon-check-circle-green" />}
          onClick={() => {}}
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
