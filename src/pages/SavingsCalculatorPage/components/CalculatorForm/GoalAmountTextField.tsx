import { useCalculatorFormController } from 'pages/SavingsCalculatorPage/hooks/useCalculatorForm';
import { ChangeEvent } from 'react';
import { TextField } from 'shared/ui/TextField';

export function GoalAmountTextField() {
  const { field, formState } = useCalculatorFormController({
    name: 'goalAmount',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // 숫자만 추출
    const rawValue = value.replace(/[^0-9]/g, '');

    if (rawValue === '') {
      field.onChange('');
      return;
    }

    field.onChange(Number(rawValue));
  };

  return (
    <TextField
      errorMessage={formState.errors.goalAmount?.message}
      label="목표 금액"
      placeholder="목표 금액을 입력하세요"
      suffix="원"
      value={field.value ? Number(field.value).toLocaleString('ko-KR') : ''}
      onChange={handleChange}
    />
  );
}
