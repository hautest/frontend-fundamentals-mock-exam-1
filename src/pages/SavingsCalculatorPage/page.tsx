import { SavingsProductList } from './components/SavingsProductList';
import { Border, NavigationBar, Spacing } from 'tosslib';
import { Suspense } from '@suspensive/react';
import { QueryErrorBoundary } from 'shared/components/QueryErrorBoundary';
import { CalculatorForm } from './components/CalculatorForm/CalculatorForm';
import { useCalculatorForm } from './hooks/useCalculatorForm';
import { FormProvider } from 'react-hook-form';
import { useToast } from 'shared/ui/Toast';
import { useEffect, useState } from 'react';
import { Tab } from 'shared/ui/Tab';
import { CalculatorResult } from './components/CalculatorResult';
import { SavingsProduct } from 'entities/savingsProduct/savingsProduct';

const TAB_VALUES = {
  PRODUCTS: 'products',
  RESULTS: 'results',
} as const;
type TabValue = (typeof TAB_VALUES)[keyof typeof TAB_VALUES];

export function SavingsCalculatorPage() {
  const form = useCalculatorForm();

  const { monthlyAmount, term, goalAmount } = form.watch();

  const [tabValue, setTabValue] = useState<TabValue>(TAB_VALUES.PRODUCTS);

  const [selectedSavingsProductId, setSelectedSavingsProductId] = useState('');

  const { openToast } = useToast();

  useEffect(() => {
    // 조건이 변경되면 선택한 상품을 해지하고 토스트를 띄웁니다.
    form.subscribe({
      name: ['term', 'monthlyAmount'],
      callback: () => {
        if (selectedSavingsProductId) {
          setSelectedSavingsProductId('');
          openToast({
            message: '조건이 변경되어 선택한 상품을 해지합니다. 다시 상품을 선택해 주세요.',
          });
          setTabValue(TAB_VALUES.PRODUCTS);
        }
      },
    });
  }, [form, openToast, selectedSavingsProductId]);

  const processSavingsProducts = (products: SavingsProduct[]) =>
    monthlyAmount && term
      ? products.filter(
          product =>
            product.minMonthlyAmount <= monthlyAmount &&
            product.maxMonthlyAmount >= monthlyAmount &&
            product.availableTerms === term
        )
      : products;

  const processRecommendedProducts = (products: SavingsProduct[]) =>
    products
      .filter(
        product =>
          monthlyAmount &&
          term &&
          product.minMonthlyAmount <= monthlyAmount &&
          product.maxMonthlyAmount >= monthlyAmount &&
          product.availableTerms === term
      )
      .sort((a, b) => b.annualRate - a.annualRate)
      .slice(0, 2);

  return (
    <>
      <NavigationBar title="적금 계산기" />

      <Spacing size={16} />

      <FormProvider {...form}>
        <CalculatorForm />
      </FormProvider>

      <Spacing size={24} />
      <Border height={16} />
      <Spacing size={8} />

      <Tab value={tabValue} onChange={value => setTabValue(value)}>
        <Tab.List>
          <Tab.Item value={TAB_VALUES.PRODUCTS}>적금 상품</Tab.Item>
          <Tab.Item value={TAB_VALUES.RESULTS}>계산 결과</Tab.Item>
        </Tab.List>
        <Tab.Content value={TAB_VALUES.PRODUCTS}>
          <QueryErrorBoundary fallback={({ error, reset }) => <SavingsProductList.Error error={error} reset={reset} />}>
            <Suspense fallback={<SavingsProductList.Skeleton />}>
              <SavingsProductList
                selectedSavingsProductId={selectedSavingsProductId}
                onSelectSavingsProduct={setSelectedSavingsProductId}
                processItems={processSavingsProducts}
              />
            </Suspense>
          </QueryErrorBoundary>
        </Tab.Content>
        <Tab.Content value={TAB_VALUES.RESULTS}>
          <Spacing size={8} />
          <CalculatorResult
            selectedSavingsProductId={selectedSavingsProductId}
            setSelectedSavingsProductId={setSelectedSavingsProductId}
            monthlyAmount={monthlyAmount}
            term={term}
            goalAmount={goalAmount}
            processRecommendedProducts={processRecommendedProducts}
          />
        </Tab.Content>
      </Tab>

      <Spacing size={40} />
    </>
  );
}
