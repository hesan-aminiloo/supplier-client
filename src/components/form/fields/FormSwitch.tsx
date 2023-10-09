import { Switch } from '@components/selection-controls';
import { FC } from 'react';
import { FieldValues, useController, useFormContext } from 'react-hook-form';

import { FormSwitchProps } from './FormFields.types';

export function FormSwitch<TFieldValues extends FieldValues = FieldValues>({
  name,
  id,
  size,
  control,
  ...restProps
}: FormSwitchProps<TFieldValues>): ReturnType<FC<FormSwitchProps<TFieldValues>>> {
  const context = useFormContext();
  const { field } = useController({
    name,
    control: context?.control || control,
  });

  return (
    <Switch
      {...restProps}
      {...field}
      checked={Boolean(field.value)}
      id={id}
      size={size}
      onChange={field.onChange}
    />
  );
}
