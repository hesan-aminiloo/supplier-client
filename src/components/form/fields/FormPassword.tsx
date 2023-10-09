import { PasswordInput, PasswordProps } from '@components/text-fields';
import { ForwardedRef, ReactElement, forwardRef, useMemo } from 'react';
import { FieldValues, useController, useFormContext } from 'react-hook-form';

import { FormPasswordProps } from './FormFields.types';

function ForwardedRefFormPassword<TFieldValues extends FieldValues = FieldValues>(
  {
    name,
    onChangeMiddleware,
    onBlur: customOnBlur,
    required,
    defaultValue = '',
    error: hasError,
    helperText,
    control,
    ...restProps
  }: FormPasswordProps<TFieldValues>,
  ref: ForwardedRef<HTMLInputElement>
) {
  const context = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control: context?.control || control,
    rules: { required },
    defaultValue,
  });

  const onChange: PasswordProps['onChange'] = (value) => {
    if (onChangeMiddleware) {
      value = onChangeMiddleware(value);
    }
    value = value.slice(0, restProps.maxLength);
    field.onChange(value);
  };

  const onBlur: PasswordProps['onBlur'] = (event) => {
    field.onBlur();

    customOnBlur?.(event.target.name);
  };

  const inputState = useMemo<PasswordProps['status']>(() => {
    return hasError || error?.message ? 'error' : 'none';
  }, [error, hasError]);

  return (
    <PasswordInput
      {...field}
      {...restProps}
      status={inputState}
      error={error?.message}
      helperText={error?.message || helperText}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      ref={ref}
    />
  );
}

export const FormPassword = forwardRef(ForwardedRefFormPassword) as <TFieldValues extends FieldValues = FieldValues>(
  // eslint-disable-next-line no-use-before-define
  props: FormPasswordProps<TFieldValues> & { ref?: ForwardedRef<HTMLInputElement> }
) => ReactElement | null;
