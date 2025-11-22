import { Flex, Spacing } from 'tosslib';
import { GoalAmountTextField } from './GoalAmountTextField';
import { MonthlyAmountTextField } from './MonthlyAmountTextField';
import { TermSelect } from '../TermSelect';

export function CalculatorForm() {
  return (
    <Flex direction="column">
      <GoalAmountTextField />
      <Spacing size={16} />
      <MonthlyAmountTextField />
      <Spacing size={16} />
      <TermSelect />
    </Flex>
  );
}
