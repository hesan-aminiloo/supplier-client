import { Control, FieldValues } from 'react-hook-form';

export type IDatePickerProps<TFieldValues extends FieldValues = FieldValues> = {
  className?: string;
  setSelectedDate: (date: string) => void;
  error?: boolean;
  control?: Control<TFieldValues>;
  defaultValue?: string;
  required?: boolean;
  name: string;
};
