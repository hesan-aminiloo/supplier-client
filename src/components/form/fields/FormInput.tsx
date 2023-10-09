import { Input, InputProps } from '@components/text-fields/input';
import { ForwardedRef, ReactElement, forwardRef, useMemo } from 'react';
import { FieldValues, useController, useFormContext, useWatch } from 'react-hook-form';
import { FormInputProps } from './FormFields.types';

function ForwardedRefFormInput<TFieldValues extends FieldValues = FieldValues>(
  {
    name,
    onChangeMiddleware,
    onBlur: customOnBlur,
    required,
    error: hasError,
    helperText,
    defaultValue = '',
    control,
    ...restProps
  }: FormInputProps<TFieldValues>,
  ref: ForwardedRef<HTMLInputElement>
) {
  const context = useFormContext();
  const {
    field,
    fieldState: { error, isTouched },
  } = useController({
    name,
    control: context?.control || control,
    rules: { required },
    defaultValue,
  });

  const value = useWatch({ control: context?.control || control, name });

  const onChange: InputProps['onChange'] = (val) => {
    if (onChangeMiddleware) {
      val = onChangeMiddleware(val);
    }
    if (restProps.type === 'phone') {
      val = val.replaceAll(' ', '');
      val = val.replaceAll('-', '');
    }
    val = val.slice(0, restProps.maxLength);
    field.onChange(val);
  };

  const onBlur: InputProps['onBlur'] = (event) => {
    field.onBlur();

    customOnBlur?.(event.target.name);
  };

  const inputState = useMemo<InputProps['status']>(() => {
    if (hasError || error?.message) return 'error';

    return isTouched && value ? 'valid' : 'none';
  }, [value, error, hasError, isTouched]);

  return (
    <Input
      {...field}
      {...restProps}
      ref={ref}
      status={inputState}
      error={error?.message}
      helperText={error?.message || helperText}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}

export const FormInput = forwardRef(ForwardedRefFormInput) as <TFieldValues extends FieldValues = FieldValues>(
  // eslint-disable-next-line no-use-before-define
  props: FormInputProps<TFieldValues> & { ref?: ForwardedRef<HTMLInputElement> }
) => ReactElement;
