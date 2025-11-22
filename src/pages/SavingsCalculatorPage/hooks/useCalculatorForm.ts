import { zodResolver } from '@hookform/resolvers/zod';
import { useController, UseControllerProps, useForm, useFormContext } from 'react-hook-form';
import z from 'zod';

const calculateSchema = z.object({
  goalAmount: z.number({
    error: '목표 금액을 입력해주세요.',
  }),
  monthlyAmount: z.number({
    error: '월 납입액을 입력해주세요.',
  }),
  term: z.number({
    error: '저축 기간을 선택해주세요.',
  }),
});

export const useCalculatorForm = () =>
  useForm<z.infer<typeof calculateSchema>>({
    resolver: zodResolver(calculateSchema),
    mode: 'onChange',
    defaultValues: {
      term: 12,
    },
  });

export const useCalculatorFormContext = () => useFormContext<z.infer<typeof calculateSchema>>();

export const useCalculatorFormController = (
  props: Omit<UseControllerProps<z.infer<typeof calculateSchema>>, 'control'>
) => {
  const { control } = useCalculatorFormContext();

  return useController({
    control,
    ...props,
  });
};
