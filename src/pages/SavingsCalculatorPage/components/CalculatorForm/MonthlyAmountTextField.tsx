import { useCalculatorFormController } from 'pages/SavingsCalculatorPage/hooks/useCalculatorForm';
import { ChangeEvent } from 'react';
import { TextField } from 'shared/ui/TextField';

export function MonthlyAmountTextField() {
  const { field, formState } = useCalculatorFormController({
    name: 'monthlyAmount',
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
      errorMessage={formState.errors.monthlyAmount?.message}
      value={field.value ? Number(field.value).toLocaleString('ko-KR') : ''}
      onChange={handleChange}
      label="월 납입액"
      placeholder="희망 월 납입액을 입력하세요"
      suffix="원"
    />
  );
}
