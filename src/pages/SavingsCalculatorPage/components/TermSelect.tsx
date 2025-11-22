import { SelectBottomSheet } from 'tosslib';
import { useCalculatorFormController } from '../hooks/useCalculatorForm';

export function TermSelect() {
  const { field } = useCalculatorFormController({
    name: 'term',
  });

  return (
    <SelectBottomSheet label="저축 기간" title="저축 기간을 선택해주세요" value={field.value} onChange={field.onChange}>
      <SelectBottomSheet.Option value={6}>6개월</SelectBottomSheet.Option>
      <SelectBottomSheet.Option value={12}>12개월</SelectBottomSheet.Option>
      <SelectBottomSheet.Option value={24}>24개월</SelectBottomSheet.Option>
    </SelectBottomSheet>
  );
}
