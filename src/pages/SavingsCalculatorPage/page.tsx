import { Border, NavigationBar, Spacing } from 'tosslib';
import { Suspense } from '@suspensive/react';
import { QueryErrorBoundary } from 'shared/components/QueryErrorBoundary';
import { CalculatorForm } from './components/CalculatorForm/CalculatorForm';
import { useCalculatorForm } from './hooks/useCalculatorForm';
import { FormProvider } from 'react-hook-form';
import { useToast } from 'shared/ui/Toast';
import { useEffect, useState } from 'react';
import { Tab } from 'shared/ui/Tab';
import { CalculatorResult } from './components/CalculatorResult/CalculatorResult';
import { SavingsProductListSection } from './components/SavingsProductListSection';

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
    const unsubscribe = form.subscribe({
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

    return () => unsubscribe();
  }, [form, openToast, selectedSavingsProductId]);

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
          <QueryErrorBoundary
            fallback={({ error, reset }) => <SavingsProductListSection.Error error={error} reset={reset} />}
          >
            <Suspense fallback={<SavingsProductListSection.Skeleton />}>
              <SavingsProductListSection
                selectedSavingsProductId={selectedSavingsProductId}
                setSelectedSavingsProductId={setSelectedSavingsProductId}
                monthlyAmount={monthlyAmount}
                term={term}
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
          />
        </Tab.Content>
      </Tab>

      <Spacing size={40} />
    </>
  );
}
