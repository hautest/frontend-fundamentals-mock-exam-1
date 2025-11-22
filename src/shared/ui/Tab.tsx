import {
  Children,
  cloneElement,
  ComponentProps,
  isValidElement,
  ReactElement,
  ReactNode,
  useMemo,
  useState,
} from 'react';
import { createSafeContext } from 'shared/utils/createSafeContext';
import { Tab as TosslibTab } from 'tosslib';

type TabItemElement = ReactElement<ComponentProps<typeof TosslibTab.Item>>;

interface TabContext {
  value: string;
  onChange: (value: string) => void;
}

const [TabProvider, useTabContext] = createSafeContext<TabContext>('TabProvider');

interface TabProps {
  children: ReactNode;
  defaultValue?: string;
}

/**
 *
 * @example
 * <Tab>
 *   <Tab.List>
 *     <Tab.Item value="products">적금 상품</Tab.Item>
 *     <Tab.Item value="results">계산 결과</Tab.Item>
 *   </Tab.List>
 *   <Tab.Content value="products">
 *     <SavingsProductList />
 *   </Tab.Content>
 *   <Tab.Content value="results">
 *     <SavingsResult />
 *   </Tab.Content>
 * </Tab>
 */
export function Tab({ children, defaultValue = '' }: TabProps) {
  const [tabValue, setTabValue] = useState(defaultValue);

  return (
    <TabProvider value={useMemo(() => ({ value: tabValue, onChange: setTabValue }), [tabValue])}>
      {children}
    </TabProvider>
  );
}

interface TabListProps {
  children: TabItemElement | TabItemElement[];
}

function TabList({ children }: TabListProps) {
  const { onChange, value: selectedValue } = useTabContext('TabList');

  // TosslibTab은 children의 props.selected를 보고 초기 선택된 탭과 indicator 위치를 결정합니다.
  // 따라서 children에 selected prop을 추가해서 전달해야 합니다.
  const childrenWithSelected = useMemo(
    () =>
      Children.map(children, child => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            selected: child.props.value === selectedValue,
          });
        }
        return child;
      }),
    [children, selectedValue]
  );

  return <TosslibTab onChange={onChange}>{childrenWithSelected}</TosslibTab>;
}
Tab.List = TabList;

interface TabItemProps extends Omit<ComponentProps<typeof TosslibTab.Item>, 'selected'> {
  children: ReactNode;
  value: string;
}

function TabItem({ children, value, ...rest }: TabItemProps) {
  const { value: selectedValue } = useTabContext('TabItem');

  return (
    <TosslibTab.Item value={value} selected={selectedValue === value} {...rest}>
      {children}
    </TosslibTab.Item>
  );
}
Tab.Item = TabItem;

interface TabContentProps {
  children: ReactNode;
  value: string;
}

function TabContent({ children, value }: TabContentProps) {
  const { value: selectedValue } = useTabContext('TabContent');

  return selectedValue === value ? children : null;
}
Tab.Content = TabContent;
