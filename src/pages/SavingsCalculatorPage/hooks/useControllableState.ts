import { useCallback, useState } from 'react';

export interface UseControllableStateProps<T> {
  value?: T;
  onChange?: (value: T) => void;
  defaultValue?: T;
}

export function useControllableState<T>(props: UseControllableStateProps<T>) {
  const { value, onChange, defaultValue } = props;

  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : uncontrolledValue;

  const setValue = useCallback(
    (_value: T) => {
      if (!isControlled) {
        setUncontrolledValue(_value);
      }
      onChange?.(_value);
    },
    [isControlled, onChange]
  );

  return [currentValue, setValue] as const;
}
