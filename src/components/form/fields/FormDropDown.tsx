import { DropDown, DropDownProps } from '@components/text-fields';
import { ForwardedRef, forwardRef, ReactElement, SyntheticEvent, useMemo } from 'react';
import { FieldValues, useController, useFormContext, useWatch } from 'react-hook-form';
import { FormDropDownProps } from '@src/components';

export function ForwardedRefFormDropDown<TFieldValues extends FieldValues = FieldValues>(
  {
    name,
    required,
    error: hasError,
    helperText,
    defaultValue = '',
    control,
    options,
    ...restProps
  }: FormDropDownProps<TFieldValues>,
  ref: ForwardedRef<HTMLTextAreaElement>
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

  const dropDownState = useMemo<DropDownProps['status']>(() => {
    if (hasError || error?.message) return 'error';

    return isTouched && value ? 'valid' : 'none';
  }, [value, error, hasError, isTouched]);

  const handleChangeValue = (selectedValue: string | number | boolean) => (e: SyntheticEvent) => {
    e.preventDefault();
    field.onChange(selectedValue);
  };

  return (
    <DropDown
      {...field}
      {...restProps}
      ref={ref}
      status={dropDownState}
      error={error?.message}
      helperText={error?.message || helperText}
      value={options?.find((option) => option.value === field.value)?.label ?? ''}
    >
      {options?.map((option) => (
        <button
          onClick={handleChangeValue(option.value)}
          key={option.value.toString()}
          className="w-full d-block cursor-pointer py-2 px-4 hover:bg-neutral-100 all-unset text-left"
        >
          {option.label}
        </button>
      ))}
    </DropDown>
  );
}

export const FormDropDown = forwardRef(ForwardedRefFormDropDown) as <TFieldValues extends FieldValues = FieldValues>(
  // eslint-disable-next-line no-use-before-define
  props: FormDropDownProps<TFieldValues> & { ref?: ForwardedRef<HTMLTextAreaElement> }
) => ReactElement | null;
