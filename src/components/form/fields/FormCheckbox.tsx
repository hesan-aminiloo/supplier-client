import { Checkbox } from '@src/components/selection-controls';
import { FC } from 'react';
import { FieldValues, useController, useFormContext } from 'react-hook-form';

import { FormCheckboxProps } from './FormFields.types';

export function FormCheckbox<TFieldValues extends FieldValues = FieldValues>({
  name,
  id,
  control,
  ...restProps
}: FormCheckboxProps<TFieldValues>): ReturnType<FC<FormCheckboxProps<TFieldValues>>> {
  const context = useFormContext();
  const { field } = useController({
    name,
    control: context?.control || control,
  });

  return (
    <Checkbox
      {...restProps}
      id={id}
      onChange={field.onChange}
    />
  );
}
