import { DropDown, DropDownProps } from '@components/text-fields';
import { ForwardedRef, forwardRef, ReactElement, useMemo } from 'react';
import { FieldValues, useController, useFormContext, useWatch } from 'react-hook-form';
import { FormDropDownProps, Checkbox } from '@src/components';

export function ForwardedRefFormMultiSelect<TFieldValues extends FieldValues = FieldValues>(
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

  const handleChangeValue = (selectedValue?: string | number | boolean) => {
    let newSelects = [];
    if (field.value?.includes(selectedValue)) {
      newSelects = field?.value.filter((val: any) => val !== selectedValue);
    } else if (field?.value.length) {
      newSelects = [...field.value, selectedValue];
    } else {
      newSelects = [selectedValue];
    }
    if (!selectedValue) {
      newSelects = options.map((option) => option.value);
    }
    field.onChange(newSelects);
  };

  return (
    <DropDown
      {...field}
      {...restProps}
      ref={ref}
      status={dropDownState}
      error={error?.message}
      type="multi-select"
      placeholder="Select"
      helperText={error?.message || helperText}
      value={`${options?.find((option) => option.value === field.value[0])?.label ?? ''}${
        field.value.length > 1 && !field.value.includes('') ? ` + ${field.value.length - 1} options` : ''
      }`}
    >
      {options?.map((option) => (
        <button
          onClick={() => handleChangeValue(option.value)}
          className="w-full flex cursor-pointer py-2 px-2 justify-between"
          key={option.value.toString()}
          type="button"
        >
          <span className="text-sm text-left">{option.label}</span>
          {option.value && (
            <Checkbox
              size="md"
              className="flex"
              name="checked"
              value=""
              checked={field.value.includes(option.value)}
            />
          )}
        </button>
      ))}
    </DropDown>
  );
}

export const FormMultiSelect = forwardRef(ForwardedRefFormMultiSelect) as <
  TFieldValues extends FieldValues = FieldValues
>(
  // eslint-disable-next-line no-use-before-define
  props: FormDropDownProps<TFieldValues> & { ref?: ForwardedRef<HTMLTextAreaElement> }
) => ReactElement | null;
