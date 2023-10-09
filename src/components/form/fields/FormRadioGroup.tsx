import { RadioGroup, RadioGroupProps } from '@src/components/selection-controls';
import { ForwardedRef, ReactElement, forwardRef, useMemo } from 'react';
import { FieldValues, useController, useFormContext } from 'react-hook-form';

import { FormRadioGroupProps } from './FormFields.types';

function ForwardedRefRadioGroup<TFieldValues extends FieldValues = FieldValues>(
  { children, name, helperText, control, ...restProps }: FormRadioGroupProps<TFieldValues>,
  ref: ForwardedRef<HTMLDivElement>
) {
  const context = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control: context?.control || control,
  });
  const groupState = useMemo<RadioGroupProps['state']>(() => {
    return error?.message ? 'error' : 'none';
  }, [error]);

  return (
    <div>
      <RadioGroup
        {...restProps}
        name={name}
        onChange={field.onChange}
        state={groupState}
        helperText={error?.message || helperText}
        ref={ref}
      >
        {children}
      </RadioGroup>
    </div>
  );
}
export const FormRadioGroup = forwardRef(ForwardedRefRadioGroup) as <TFieldValues extends FieldValues = FieldValues>(
  // eslint-disable-next-line no-use-before-define
  props: FormRadioGroupProps<TFieldValues> & { ref?: ForwardedRef<HTMLDivElement> }
) => ReactElement | null;
