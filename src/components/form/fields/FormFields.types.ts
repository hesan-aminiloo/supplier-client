import { InputProps, PasswordProps, DropDownProps, DropDownOption } from '@components/text-fields';
import { CheckboxProps, SwitchProps, RadioGroupProps } from '@components/selection-controls';
import { Control, FieldValues } from 'react-hook-form';

// This kind of type is used because of control prop and the type restricts inherited by react-hook-form types
type FormFieldCommonProps<TFieldValues extends FieldValues = FieldValues> = {
  name: string;
  error?: boolean;
  control?: Control<TFieldValues>;
};

export type FormDropDownProps<TFieldValues extends FieldValues = FieldValues> = Omit<DropDownProps, 'children'> &
  FormFieldCommonProps<TFieldValues> & {
    options: DropDownOption[];
  };

export type FormInputProps<TFieldValues extends FieldValues = FieldValues> = Omit<InputProps, 'onChange' | 'onBlue'> &
  FormFieldCommonProps<TFieldValues> & {
    onChangeMiddleware?: (value: string) => string;
    onBlur?: (name: string) => void;
    defaultValue?: string;
  };

export type FormPasswordProps<TFieldValues extends FieldValues = FieldValues> = Omit<
  PasswordProps,
  'onChange' | 'onBlue'
> &
  FormFieldCommonProps<TFieldValues> & {
    onChangeMiddleware?: (value: string) => string;
    onBlur?: (name: string) => void;
    defaultValue?: string;
  };

export type FormCheckboxProps<TFieldValues extends FieldValues = FieldValues> = Omit<
  CheckboxProps,
  'onChange' | 'onBlur'
> &
  FormFieldCommonProps<TFieldValues>;

export type FormSwitchProps<TFieldValues extends FieldValues = FieldValues> = Omit<SwitchProps, 'onChange' | 'onBlur'> &
  FormFieldCommonProps<TFieldValues>;

export type FormRadioGroupProps<TFieldValues extends FieldValues = FieldValues> = Omit<RadioGroupProps, 'onChange'> &
  FormFieldCommonProps<TFieldValues>;
